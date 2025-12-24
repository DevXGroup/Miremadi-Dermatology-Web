-- 1. PROFILES: Add is_admin
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS is_admin boolean default false;

-- 2. ORDERS: Add tracking columns and purchase_id
ALTER TABLE public.orders 
ADD COLUMN IF NOT EXISTS tracking_image_url text,
ADD COLUMN IF NOT EXISTS purchase_id text,
ADD COLUMN IF NOT EXISTS tracking_number text, -- Might already exist
ADD COLUMN IF NOT EXISTS completed_at timestamptz;

-- Ensure purchase_id is unique
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'orders_purchase_id_key') THEN
        ALTER TABLE public.orders ADD CONSTRAINT orders_purchase_id_key UNIQUE (purchase_id);
    END IF;
END $$;

-- 3. STORAGE: Create bucket for tracking images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('order_tracking_images', 'order_tracking_images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage Policy: Admin can upload
CREATE POLICY "Admins can upload tracking images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
    (SELECT is_admin FROM public.profiles WHERE id = auth.uid()) = true
    AND bucket_id = 'order_tracking_images'
);

-- Storage Policy: Public (or authenticated) can view
CREATE POLICY "Anyone can view tracking images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'order_tracking_images');

-- 4. RLS: Admin Access Rules

-- Admin View All Orders
CREATE POLICY "Admins can view all orders"
ON public.orders FOR SELECT
TO authenticated
USING (
    (SELECT is_admin FROM public.profiles WHERE id = auth.uid()) = true
);

-- Admin Update All Orders
CREATE POLICY "Admins can update all orders"
ON public.orders FOR UPDATE
TO authenticated
USING (
    (SELECT is_admin FROM public.profiles WHERE id = auth.uid()) = true
);

-- Admin View All Order Items
CREATE POLICY "Admins can view all order items"
ON public.order_items FOR SELECT
TO authenticated
USING (
    (SELECT is_admin FROM public.profiles WHERE id = auth.uid()) = true
);

-- Admin View All Profiles (to see names)
CREATE POLICY "Admins can view all profiles"
ON public.profiles FOR SELECT
TO authenticated
USING (
    (SELECT is_admin FROM public.profiles WHERE id = auth.uid()) = true
);
