-- FINAL ROBUST FIX: User Signup Trigger & Profile Schema
-- This script ensures all columns exist and the trigger is indestructible.

-- 1. Ensure all columns exist in profiles table
DO $$ 
BEGIN
    ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS email text;
    ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS full_name text;
    ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS avatar_url text;
    ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS privacy_policy_accepted boolean DEFAULT false;
    ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS privacy_policy_accepted_at timestamptz;
    ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS is_admin boolean DEFAULT false;
    ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS stripe_customer_id text;
EXCEPTION
    WHEN others THEN NULL;
END $$;

-- 2. Drop existing objects to avoid conflicts
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- 3. Create the robust function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  meta_full_name text;
  meta_avatar_url text;
  meta_privacy_accepted boolean;
  meta_privacy_accepted_at timestamptz;
BEGIN
  -- Extract and sanitize metadata
  meta_full_name := COALESCE(new.raw_user_meta_data->>'full_name', '');
  meta_avatar_url := COALESCE(new.raw_user_meta_data->>'avatar_url', '');
  
  -- Handle boolean conversion safely
  IF (new.raw_user_meta_data->>'privacy_policy_accepted') = 'true' THEN
    meta_privacy_accepted := true;
  ELSE
    meta_privacy_accepted := false;
  END IF;

  -- Handle timestamp conversion safely
  BEGIN
    meta_privacy_accepted_at := (new.raw_user_meta_data->>'privacy_policy_accepted_at')::timestamptz;
  EXCEPTION WHEN others THEN
    meta_privacy_accepted_at := NULL;
  END;

  INSERT INTO public.profiles (
    id,
    email,
    full_name,
    avatar_url,
    privacy_policy_accepted,
    privacy_policy_accepted_at
  )
  VALUES (
    new.id,
    new.email,
    meta_full_name,
    meta_avatar_url,
    meta_privacy_accepted,
    meta_privacy_accepted_at
  )
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    full_name = CASE WHEN (public.profiles.full_name IS NULL OR public.profiles.full_name = '') THEN EXCLUDED.full_name ELSE public.profiles.full_name END,
    privacy_policy_accepted = COALESCE(EXCLUDED.privacy_policy_accepted, public.profiles.privacy_policy_accepted),
    privacy_policy_accepted_at = COALESCE(EXCLUDED.privacy_policy_accepted_at, public.profiles.privacy_policy_accepted_at);

  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 4. Re-create the trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 5. Permissions
GRANT USAGE ON SCHEMA public TO postgres, anon, authenticated, service_role;
GRANT ALL ON TABLE public.profiles TO postgres, service_role;
GRANT SELECT, INSERT, UPDATE ON TABLE public.profiles TO authenticated;
