-- 1. USERS: Add Stripe linkage
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS stripe_customer_id text;

-- 2. PRODUCTS: Create products table
-- 2. PRODUCTS: Create products table if not exists, or update it
CREATE TABLE IF NOT EXISTS public.products (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  description text,
  created_at timestamptz default now()
);

-- Safely add columns if they don't exist (handle case where table existed but was different)
DO $$ BEGIN
    ALTER TABLE public.products ADD COLUMN active boolean not null default true;
EXCEPTION
    WHEN duplicate_column THEN null;
END $$;

DO $$ BEGIN
    ALTER TABLE public.products ADD COLUMN price_cents integer default 0;
EXCEPTION
    WHEN duplicate_column THEN null;
END $$;

DO $$ BEGIN
    ALTER TABLE public.products ADD COLUMN currency text default 'usd';
EXCEPTION
    WHEN duplicate_column THEN null;
END $$;

DO $$ BEGIN
    ALTER TABLE public.products ADD COLUMN category text;
EXCEPTION
    WHEN duplicate_column THEN null;
END $$;

DO $$ BEGIN
    ALTER TABLE public.products ADD COLUMN image_url text;
EXCEPTION
    WHEN duplicate_column THEN null;
END $$;

-- Update constraint safely
DO $$ BEGIN
    ALTER TABLE public.products DROP CONSTRAINT IF EXISTS products_category_check;
    ALTER TABLE public.products ADD CONSTRAINT products_category_check 
    CHECK (category in ('moisturizers','serums','cleansers','treatments','medical','cosmetic'));
EXCEPTION
    WHEN others THEN null;
END $$;

-- Enable RLS for products
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Allow public read access to active products
CREATE POLICY "Public can view active products" 
  ON public.products FOR SELECT 
  USING (active = true);

-- 3. ORDERS: Create enums and orders table
DO $$ BEGIN
    CREATE TYPE payment_status AS ENUM ('pending','paid','failed');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE shipping_status AS ENUM ('pending','complete');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE recurring_type AS ENUM ('none','weekly','monthly');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS public.orders (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.profiles(id),
  total_amount_cents integer not null,
  currency text not null default 'usd',

  -- Stripe linkage
  stripe_payment_intent_id text,
  stripe_invoice_id text,
  stripe_subscription_id text,

  -- statuses
  payment_status payment_status not null default 'pending',
  shipping_status shipping_status not null default 'pending',
  recurring recurring_type not null default 'none',

  -- basic shipping info (MVP)
  shipping_name text,
  shipping_address_line1 text,
  shipping_address_line2 text,
  shipping_city text,
  shipping_state text,
  shipping_postal_code text,
  shipping_country text,
  tracking_number text,
  shipped_at timestamptz,

  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Enable RLS for orders
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Users can view their own orders
CREATE POLICY "Users can view own orders" 
  ON public.orders FOR SELECT 
  USING (auth.uid() = user_id);

-- 4. ORDER ITEMS: Create order_items table
CREATE TABLE IF NOT EXISTS public.order_items (
  id uuid primary key default uuid_generate_v4(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid not null references public.products(id),
  product_name_snapshot text not null,    -- store name at time of purchase
  unit_price_cents integer not null,
  quantity integer not null,
  line_total_cents integer not null
);

-- Enable RLS for order_items
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- Users can view their own order items via the order
CREATE POLICY "Users can view own order items" 
  ON public.order_items FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.orders 
      WHERE orders.id = order_items.order_id 
      AND orders.user_id = auth.uid()
    )
  );

-- 5. Seed initial product data (optional, based on existing hardcoded data)
-- This is just an example seed, can be expanded
INSERT INTO public.products (name, category, price_cents, image_url, description)
VALUES 
('Acne Treatment', 'medical', 15000, 'https://images.unsplash.com/photo-1614859324967-bdaa6e2e8ce8?auto=format&fit=crop&q=80&w=400', 'Customized plans involving topicals, lasers, and lifestyle changes.'),
('Botox & Fillers', 'cosmetic', 30000, 'https://images.unsplash.com/photo-1620331713541-7f1912448896?auto=format&fit=crop&q=80&w=400', 'Reduce fine lines and wrinkles and restore volume.'),
('Chemical Peel', 'cosmetic', 12000, 'https://images.unsplash.com/photo-1512290901882-d42436d19f8d?auto=format&fit=crop&q=80&w=400', 'Exfoliating treatments to improve skin texture.')
ON CONFLICT DO NOTHING;
