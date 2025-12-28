-- FIX: Robust User Signup Trigger
-- This script replaces the existing trigger with a version that:
-- 1. Handles missing metadata gracefully
-- 2. Uses ON CONFLICT DO NOTHING to prevent crashing on duplicate inserts
-- 3. Grants necessary permissions

-- 1. Drop existing trigger and function to ensure clean slate
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- 2. Re-create the function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
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
    -- Handle potentially missing metadata fields safely
    COALESCE(new.raw_user_meta_data->>'full_name', ''),
    COALESCE(new.raw_user_meta_data->>'avatar_url', ''),
    (COALESCE(new.raw_user_meta_data->>'privacy_policy_accepted', 'false'))::boolean,
    CASE 
      WHEN new.raw_user_meta_data->>'privacy_policy_accepted_at' IS NULL THEN NULL 
      ELSE (new.raw_user_meta_data->>'privacy_policy_accepted_at')::timestamptz 
    END
  )
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    -- Only update full_name if it's currently empty
    full_name = CASE WHEN public.profiles.full_name = '' THEN EXCLUDED.full_name ELSE public.profiles.full_name END;

  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER; -- runs as superuser/creator

-- 3. Re-create the trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 4. Ensure Permissions
-- Grant usage on public schema
GRANT USAGE ON SCHEMA public TO postgres, anon, authenticated, service_role;
-- Grant access to profiles table (trigger runs as definer, but good practice for RLS)
GRANT ALL ON TABLE public.profiles TO postgres, service_role;
GRANT SELECT, INSERT, UPDATE ON TABLE public.profiles TO authenticated;
-- Not granting write to anon for profiles, usually not needed if trigger handles it
