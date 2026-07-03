import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database.types';
import { generateSupabaseJWT } from '@/lib/jwt';

// ==========================================
// Server-side Supabase client (service role)
// ==========================================
/**
 * Creates a Supabase client using a freshly-signed service_role JWT
 * generated from the SUPABASE_JWT_SECRET. This bypasses Row Level 
 * Security (RLS) and should ONLY be used in server-side code 
 * (API routes, server components, repositories, services).
 *
 * We generate the JWT on every call because the self-hosted PostgREST
 * instance requires JWTs signed with the actual JWT secret, not the
 * pre-built demo service role key.
 */
export async function createServerSupabaseClient() {
  const serviceRoleJWT = await generateSupabaseJWT('service_role');

  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
      global: {
        headers: {
          Authorization: `Bearer ${serviceRoleJWT}`,
        },
      },
    }
  );
}
