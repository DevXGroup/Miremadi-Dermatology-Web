-- Add privacy policy columns to profiles table
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS privacy_policy_accepted BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS privacy_policy_accepted_at TIMESTAMP WITH TIME ZONE;

-- Update handle_new_user function to include privacy policy data
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (
    id, 
    full_name, 
    email, 
    avatar_url, 
    privacy_policy_accepted, 
    privacy_policy_accepted_at
  )
  VALUES (
    new.id, 
    COALESCE(new.raw_user_meta_data->>'full_name', ''), 
    new.email,
    COALESCE(new.raw_user_meta_data->>'avatar_url', ''),
    (COALESCE(new.raw_user_meta_data->>'privacy_policy_accepted', 'false'))::boolean,
    (new.raw_user_meta_data->>'privacy_policy_accepted_at')::timestamp with time zone
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
