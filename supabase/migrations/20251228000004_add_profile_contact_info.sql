-- Migration 20251228000004_add_profile_contact_info.sql
-- Description: Add phone, address, and additional profile fields to the profiles table.

DO $$ 
BEGIN
    -- Add phone number field
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'profiles' AND column_name = 'phone_number') THEN
        ALTER TABLE public.profiles ADD COLUMN phone_number text;
    END IF;

    -- Add address as JSONB to store line1, line2, city, state, postal_code, country
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'profiles' AND column_name = 'address') THEN
        ALTER TABLE public.profiles ADD COLUMN address jsonb DEFAULT '{}'::jsonb;
    END IF;

    -- Add photo_url for profile pictures
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'profiles' AND column_name = 'photo_url') THEN
        ALTER TABLE public.profiles ADD COLUMN photo_url text;
    END IF;

    -- Add cosmetic/medical profile fields
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'profiles' AND column_name = 'skin_type') THEN
        ALTER TABLE public.profiles ADD COLUMN skin_type text;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'profiles' AND column_name = 'skin_goals') THEN
        ALTER TABLE public.profiles ADD COLUMN skin_goals text;
    END IF;

EXCEPTION
    WHEN others THEN 
        RAISE NOTICE 'Error adding columns to profiles: %', SQLERRM;
END $$;

-- Update the handle_new_user function to handle these if they come from metadata
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  meta_full_name text;
  meta_avatar_url text;
  meta_phone_number text;
  meta_address jsonb;
  meta_privacy_accepted boolean;
  meta_privacy_accepted_at timestamptz;
BEGIN
  -- Extract and sanitize metadata
  meta_full_name := COALESCE(new.raw_user_meta_data->>'full_name', '');
  meta_avatar_url := COALESCE(new.raw_user_meta_data->>'avatar_url', '');
  meta_phone_number := COALESCE(new.raw_user_meta_data->>'phone_number', NULL);
  
  -- Handle address if present in metadata
  IF new.raw_user_meta_data->'address' IS NOT NULL THEN
    meta_address := (new.raw_user_meta_data->'address')::jsonb;
  ELSE
    meta_address := '{}'::jsonb;
  END IF;
  
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
    phone_number,
    address,
    privacy_policy_accepted,
    privacy_policy_accepted_at
  )
  VALUES (
    new.id,
    new.email,
    meta_full_name,
    meta_avatar_url,
    meta_phone_number,
    meta_address,
    meta_privacy_accepted,
    meta_privacy_accepted_at
  )
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    full_name = CASE WHEN (public.profiles.full_name IS NULL OR public.profiles.full_name = '') THEN EXCLUDED.full_name ELSE public.profiles.full_name END,
    phone_number = COALESCE(public.profiles.phone_number, EXCLUDED.phone_number),
    address = CASE WHEN (public.profiles.address IS NULL OR public.profiles.address = '{}'::jsonb) THEN EXCLUDED.address ELSE public.profiles.address END,
    privacy_policy_accepted = COALESCE(EXCLUDED.privacy_policy_accepted, public.profiles.privacy_policy_accepted),
    privacy_policy_accepted_at = COALESCE(EXCLUDED.privacy_policy_accepted_at, public.profiles.privacy_policy_accepted_at);

  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
