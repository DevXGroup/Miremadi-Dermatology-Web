-- FIX SCRIPT: Run this to prevent duplicate emails and fix the signup trigger
-- 1. Ensure UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Add email column and unique constraint to profiles
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS email text;
ALTER TABLE public.profiles ADD CONSTRAINT profiles_email_key UNIQUE (email);
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS avatar_url text;

-- 3. Update the handle_new_user function to be robust
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email, avatar_url)
  VALUES (
    new.id, 
    COALESCE(new.raw_user_meta_data->>'full_name', ''), 
    new.email,
    COALESCE(new.raw_user_meta_data->>'avatar_url', '')
  )
  ON CONFLICT (id) DO UPDATE 
  SET email = EXCLUDED.email, full_name = EXCLUDED.full_name;
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
