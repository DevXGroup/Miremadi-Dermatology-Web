-- ENSURE ORDERS TABLE IS ROBUST AND COMPATIBLE WITH WEBHOOK & ORDER HISTORY
-- This script reconciles the potential conflicts between schema.sql and shopping_cart_schema.sql

-- 1. Ensure Enums exist
DO $$ BEGIN
    CREATE TYPE public.payment_status AS ENUM ('pending','paid','failed');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE public.shipping_status AS ENUM ('pending','complete');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE public.recurring_type AS ENUM ('none','weekly','monthly');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 2. Create or Update Orders Table
CREATE TABLE IF NOT EXISTS public.orders (
    id uuid primary key default uuid_generate_v4(),
    user_id uuid not null references public.profiles(id),
    created_at timestamptz default now()
);

-- Safely add all required columns
DO $$ BEGIN
    ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS status text DEFAULT 'pending';
    ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS purchase_id text UNIQUE;
    ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS total_amount_cents integer;
    ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS currency text DEFAULT 'usd';
    
    -- Stripe Identifiers
    ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS stripe_payment_intent_id text;
    ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS stripe_invoice_id text;
    ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS stripe_subscription_id text;
    ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS stripe_payment_id text;
    
    -- Status Enums (using casting if they were text)
    ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS payment_status public.payment_status DEFAULT 'pending';
    ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS shipping_status public.shipping_status DEFAULT 'pending';
    ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS recurring public.recurring_type DEFAULT 'none';
    
    -- Shipping Info
    ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS shipping_name text;
    ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS shipping_address_line1 text;
    ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS shipping_address_line2 text;
    ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS shipping_city text;
    ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS shipping_state text;
    ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS shipping_postal_code text;
    ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS shipping_country text;
    
    -- Tracking Enhancement
    ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS tracking_number text;
    ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS tracking_url text;
    ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS barcode_image_url text;
    ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS carrier text DEFAULT 'USPS';
    ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS shipped_at timestamptz;
    ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS delivered_at timestamptz;
    ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS tracking_image_url text;
    ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS completed_at timestamptz;
EXCEPTION
    WHEN others THEN 
        RAISE NOTICE 'Error updating orders table: %', SQLERRM;
END $$;

-- 3. Ensure Order Items Table
CREATE TABLE IF NOT EXISTS public.order_items (
    id uuid primary key default uuid_generate_v4(),
    order_id uuid not null references public.orders(id) on delete cascade,
    product_id uuid references public.products(id),
    product_name_snapshot text not null,
    unit_price_cents integer not null,
    quantity integer not null,
    line_total_cents integer not null,
    created_at timestamptz default now()
);

-- 4. Enable RLS
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- 5. Drop existing policies to avoid "already exists" errors, then recreate
DO $$ BEGIN
    DROP POLICY IF EXISTS "Users can view own orders" ON public.orders;
    DROP POLICY IF EXISTS "Admins can view all orders" ON public.orders;
    DROP POLICY IF EXISTS "Admins can update all orders" ON public.orders;
    DROP POLICY IF EXISTS "Users can view own order items" ON public.order_items;
    DROP POLICY IF EXISTS "Admins can view all order items" ON public.order_items;
EXCEPTION
    WHEN others THEN null;
END $$;

-- Recreate Policies
CREATE POLICY "Users can view own orders" ON public.orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins can view all orders" ON public.orders FOR SELECT TO authenticated USING ((SELECT is_admin FROM public.profiles WHERE id = auth.uid()) = true);
CREATE POLICY "Admins can update all orders" ON public.orders FOR UPDATE TO authenticated USING ((SELECT is_admin FROM public.profiles WHERE id = auth.uid()) = true);

CREATE POLICY "Users can view own order items" ON public.order_items FOR SELECT USING (EXISTS (SELECT 1 FROM public.orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid()));
CREATE POLICY "Admins can view all order items" ON public.order_items FOR SELECT TO authenticated USING ((SELECT is_admin FROM public.profiles WHERE id = auth.uid()) = true);
