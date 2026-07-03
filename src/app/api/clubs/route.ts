import { NextResponse } from 'next/server';
import { generateSupabaseJWT } from '@/lib/jwt';

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const apiKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  try {
    // Generate valid service_role JWT
    const bearerToken = await generateSupabaseJWT('service_role');

    const res = await fetch(
      `${supabaseUrl}/rest/v1/clubs?select=id,name&deleted_at=is.null&order=name`,
      {
        headers: {
          'apikey': apiKey,
          'Authorization': `Bearer ${bearerToken}`,
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
      }
    );

    if (!res.ok) {
      const text = await res.text();
      console.error('Supabase clubs fetch failed:', res.status, text);
      return NextResponse.json({ error: 'Failed to fetch clubs', details: text }, { status: 500 });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err: any) {
    console.error('API /api/clubs error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
