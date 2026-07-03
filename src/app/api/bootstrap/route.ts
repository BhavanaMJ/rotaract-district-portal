import { NextResponse } from 'next/server';
import { generateSupabaseJWT } from '@/lib/jwt';

export async function POST(req: Request) {
  try {
    const { email, firstName, lastName, authId } = await req.json();
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const apiKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    const bearerToken = await generateSupabaseJWT('service_role');
    
    const headers = {
      'apikey': apiKey,
      'Authorization': `Bearer ${bearerToken}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation'
    };

    // 1. Insert Profile
    const profileRes = await fetch(`${supabaseUrl}/rest/v1/member_profiles`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        email: email,
        auth_id: authId,
        phone: '1234567890'
      })
    });

    if (!profileRes.ok) {
      const err = await profileRes.text();
      return NextResponse.json({ error: 'Failed to create profile', details: err }, { status: 500 });
    }

    const profiles = await profileRes.json();
    const memberId = profiles[0].id;

    // 2. Insert Super Admin Role
    const roleRes = await fetch(`${supabaseUrl}/rest/v1/member_roles`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        member_id: memberId,
        role: 'Super Admin'
      })
    });

    if (!roleRes.ok) {
      const err = await roleRes.text();
      return NextResponse.json({ error: 'Failed to assign role', details: err }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Super Admin provisioned!' });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
