-- 1. UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Profiles Table & Policies
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid references auth.users not null primary key,
  email text unique,
  full_name text,
  avatar_url text,
  is_admin boolean default false,
  stripe_customer_id text,
  privacy_policy_accepted boolean default false,
  privacy_policy_accepted_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- 3. Auth Trigger (Fix Signup)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email, avatar_url, privacy_policy_accepted, privacy_policy_accepted_at)
  VALUES (
    new.id, 
    COALESCE(new.raw_user_meta_data->>'full_name', ''), 
    new.email,
    COALESCE(new.raw_user_meta_data->>'avatar_url', ''),
    (COALESCE(new.raw_user_meta_data->>'privacy_policy_accepted', 'false'))::boolean,
    NULLIF(new.raw_user_meta_data->>'privacy_policy_accepted_at', '')::timestamptz
  )
  ON CONFLICT (id) DO UPDATE SET email = EXCLUDED.email;
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 4. Products Table & Policies
CREATE TABLE IF NOT EXISTS public.products (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  description text,
  price_cents integer default 0,
  currency text default 'usd',
  image_url text,
  category text,
  active boolean default true,
  created_at timestamptz default now()
);

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can view active products" ON public.products;
CREATE POLICY "Public can view active products" ON public.products FOR SELECT USING (active = true);

-- 5. Orders Table & Policies
CREATE TABLE IF NOT EXISTS public.orders (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles(id),
  purchase_id text unique,
  total_amount_cents integer not null,
  currency text default 'usd',
  payment_status text default 'pending',
  shipping_status text default 'pending',
  recurring text default 'none',
  created_at timestamptz default now()
);

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users see own orders" ON public.orders;
CREATE POLICY "Users see own orders" ON public.orders FOR SELECT USING (auth.uid() = user_id);

-- 6. Order Items Table & Policies
CREATE TABLE IF NOT EXISTS public.order_items (
  id uuid primary key default uuid_generate_v4(),
  order_id uuid references public.orders(id) ON DELETE CASCADE,
  product_id uuid references public.products(id),
  product_name_snapshot text,
  unit_price_cents integer,
  quantity integer,
  line_total_cents integer
);

ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users see own items" ON public.order_items;
CREATE POLICY "Users see own items" ON public.order_items FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid())
);

-- 7. Storage Bucket
INSERT INTO storage.buckets (id, name, public) VALUES ('order_tracking_images', 'order_tracking_images', true) ON CONFLICT DO NOTHING;
DROP POLICY IF EXISTS "Public View Tracking" ON storage.objects;
CREATE POLICY "Public View Tracking" ON storage.objects FOR SELECT TO public USING (bucket_id = 'order_tracking_images');
