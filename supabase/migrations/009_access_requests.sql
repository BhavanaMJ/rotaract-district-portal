-- 009_access_requests.sql
-- Creates the access_requests table, adds RLS policies for audit_logs, and configures the auth trigger.

-- 1. Create access_requests table
CREATE TABLE IF NOT EXISTS public.access_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    club_id UUID NOT NULL REFERENCES public.clubs(id) ON DELETE CASCADE,
    requested_role VARCHAR(50) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    status VARCHAR(50) NOT NULL DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'APPROVED', 'REJECTED')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMPTZ
);

-- Trigger for access_requests updated_at
DROP TRIGGER IF EXISTS set_access_requests_updated_at ON public.access_requests;
CREATE TRIGGER set_access_requests_updated_at 
  BEFORE UPDATE ON public.access_requests 
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- 2. Enable RLS on access_requests
ALTER TABLE public.access_requests ENABLE ROW LEVEL SECURITY;

-- 3. Define RLS Policies for access_requests
DROP POLICY IF EXISTS "Public insert requests" ON public.access_requests;
CREATE POLICY "Public insert requests" ON public.access_requests 
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Admins read requests" ON public.access_requests;
CREATE POLICY "Admins read requests" ON public.access_requests 
  FOR SELECT TO authenticated 
  USING (public.auth_has_role('District Admin', 'Super Admin') AND deleted_at IS NULL);

DROP POLICY IF EXISTS "Admins update requests" ON public.access_requests;
CREATE POLICY "Admins update requests" ON public.access_requests 
  FOR UPDATE TO authenticated 
  USING (public.auth_has_role('District Admin', 'Super Admin'));

-- 4. Define RLS Policies for audit_logs
DROP POLICY IF EXISTS "Authenticated insert audit logs" ON public.audit_logs;
CREATE POLICY "Authenticated insert audit logs" ON public.audit_logs 
  FOR INSERT TO authenticated 
  WITH CHECK (true);

DROP POLICY IF EXISTS "Admins read audit logs" ON public.audit_logs;
CREATE POLICY "Admins read audit logs" ON public.audit_logs 
  FOR SELECT TO authenticated 
  USING (public.auth_has_role('District Admin', 'Super Admin', 'Reporting Team') AND deleted_at IS NULL);

-- 5. Create Auth Trigger Function for User Syncing
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
DECLARE
  v_profile_id uuid;
BEGIN
  -- Check if a profile with the email already exists (pre-created via access request approval)
  SELECT id INTO v_profile_id
  FROM public.member_profiles
  WHERE email = NEW.email;

  IF v_profile_id IS NOT NULL THEN
    -- Update the existing profile with the real auth_id from auth.users
    UPDATE public.member_profiles
    SET auth_id = NEW.id::text,
        updated_at = NOW()
    WHERE id = v_profile_id;
  ELSE
    -- Create a brand new profile
    INSERT INTO public.member_profiles (auth_id, first_name, last_name, email, club_id)
    VALUES (
      NEW.id::text,
      COALESCE(NEW.raw_user_meta_data->>'first_name', split_part(NEW.email, '@', 1)),
      COALESCE(NEW.raw_user_meta_data->>'last_name', ''),
      NEW.email,
      (NEW.raw_user_meta_data->>'club_id')::uuid
    );
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Bind the trigger function to auth.users AFTER INSERT
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
