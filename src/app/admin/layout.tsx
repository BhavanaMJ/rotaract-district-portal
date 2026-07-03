import { auth, currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { generateSupabaseJWT } from '@/lib/jwt';
import AdminLayoutClient from './AdminLayoutClient';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();
  const userId = user?.id;

  if (!userId || !user) {
    redirect('/sign-in');
  }

  const email = user.emailAddresses[0]?.emailAddress;
  if (!email) {
    redirect('/portal/dashboard');
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const apiKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  const bearerToken = await generateSupabaseJWT('service_role');

  const headers = {
    'apikey': apiKey,
    'Authorization': `Bearer ${bearerToken}`,
    'Content-Type': 'application/json',
  };

  try {
    const resProfile = await fetch(`${supabaseUrl}/rest/v1/member_profiles?email=eq.${encodeURIComponent(email)}&select=id`, {
      headers,
      cache: 'no-store'
    });
    
    if (resProfile.ok) {
      const profiles = await resProfile.json();
      if (profiles && profiles.length > 0) {
        const resRoles = await fetch(`${supabaseUrl}/rest/v1/member_roles?member_id=eq.${profiles[0].id}&select=role`, {
          headers,
          cache: 'no-store'
        });
        
        if (resRoles.ok) {
          const roles = await resRoles.json();
          const roleStrings = roles.map((r: any) => r.role);
          
          if (
            roleStrings.includes('District Admin') || 
            roleStrings.includes('District Core Team') || 
            roleStrings.includes('Super Admin') || 
            roleStrings.includes('Admin')
          ) {
            return <AdminLayoutClient>{children}</AdminLayoutClient>;
          }
        }
      }
    }
  } catch (error) {
    console.error("Error verifying admin role:", error);
  }

  // If we reach here, they are not an admin
  redirect('/portal/dashboard');
}
