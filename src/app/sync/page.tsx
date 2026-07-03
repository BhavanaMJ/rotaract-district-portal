import { auth, currentUser } from '@clerk/nextjs/server';
import { generateSupabaseJWT } from '@/lib/jwt';
import SyncRedirect from './SyncRedirect';

export const dynamic = 'force-dynamic';

export default async function SyncPage() {
  const user = await currentUser();
  const userId = user?.id;

  console.log('[SyncPage] userId:', userId);
  console.log('[SyncPage] user exists:', !!user);

  if (!userId || !user) {
    console.log('[SyncPage] redirecting back to /sign-in because userId or user is null');
    return <SyncRedirect targetUrl="/sign-in" />;
  }

  const email = user.emailAddresses[0]?.emailAddress;
  if (!email) {
    return <SyncRedirect targetUrl="/portal/dashboard" />;
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const apiKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  const bearerToken = await generateSupabaseJWT('service_role');

  const headers = {
    'apikey': apiKey,
    'Authorization': `Bearer ${bearerToken}`,
    'Content-Type': 'application/json',
  };

  let targetPath = '/portal/dashboard';

  try {
    // 1. Find member profile by email
    const resProfile = await fetch(`${supabaseUrl}/rest/v1/member_profiles?email=eq.${encodeURIComponent(email)}&select=id,auth_id`, {
      headers,
      cache: 'no-store'
    });
    
    if (resProfile.ok) {
      const profiles = await resProfile.json();
      if (profiles && profiles.length > 0) {
        const profile = profiles[0];
        
        // Update auth_id if it doesn't match the current Clerk userId
        if (profile.auth_id !== userId) {
          await fetch(`${supabaseUrl}/rest/v1/member_profiles?id=eq.${profile.id}`, {
            method: 'PATCH',
            headers,
            body: JSON.stringify({ auth_id: userId })
          });
        }

        // 2. Fetch roles (exclude soft-deleted)
        const resRoles = await fetch(`${supabaseUrl}/rest/v1/member_roles?member_id=eq.${profile.id}&select=role&deleted_at=is.null`, {
          headers,
          cache: 'no-store'
        });
        
        if (resRoles.ok) {
          const roles = await resRoles.json();
          const roleStrings = roles.map((r: any) => r.role);
          console.log('[SyncPage] roles found:', roleStrings);
          
          if (
            roleStrings.includes('District Admin') || 
            roleStrings.includes('District Core Team') || 
            roleStrings.includes('Super Admin') || 
            roleStrings.includes('Admin')
          ) {
            targetPath = '/admin/dashboard';
          } else {
            // Regular portal member (President, Secretary, etc.)
            targetPath = '/portal/dashboard';
          }
        } else {
          console.log('[SyncPage] roles fetch failed, defaulting to portal');
          targetPath = '/portal/dashboard';
        }
        console.log('[SyncPage] final targetPath:', targetPath);
      } else {
        // Auto-provision Super Admin for the first login (Demo Bootstrapping)
        console.log('[SyncPage] Auto-provisioning Super Admin for:', email);
        const nameParts = user.fullName ? user.fullName.split(' ') : ['Super', 'Admin'];
        
        const profileRes = await fetch(`${supabaseUrl}/rest/v1/member_profiles`, {
          method: 'POST',
          headers: { ...headers, 'Prefer': 'return=representation' },
          body: JSON.stringify({
            first_name: nameParts[0] || 'Super',
            last_name: nameParts.slice(1).join(' ') || 'Admin',
            email: email,
            auth_id: userId,
            phone: '0000000000'
          })
        });

        if (profileRes.ok) {
          const newProfiles = await profileRes.json();
          const memberId = newProfiles[0].id;
          
          await fetch(`${supabaseUrl}/rest/v1/member_roles`, {
            method: 'POST',
            headers,
            body: JSON.stringify({
              member_id: memberId,
              role: 'Super Admin'
            })
          });
          
          targetPath = '/admin/dashboard';
        } else {
          targetPath = '/login?error=unauthorized';
        }
      }
    } else {
      targetPath = '/login?error=unauthorized';
    }
  } catch (error: any) {
    console.error("Error during sync:", error);
    targetPath = '/login?error=unauthorized';
  }

  return <SyncRedirect targetUrl={targetPath} />;
}
