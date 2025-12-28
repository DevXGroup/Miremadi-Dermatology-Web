-- OCR & TRACKING SYSTEM ENHANCEMENT
-- This script adds the necessary columns for OCR-based tracking.

-- 1. Update orders table with tracking details
DO $$ 
BEGIN
    ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS tracking_number text;
    ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS tracking_url text;
    ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS barcode_image_url text;
    ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS carrier text DEFAULT 'USPS';
    ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS shipped_at timestamptz;
    ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS delivered_at timestamptz;
EXCEPTION
    WHEN others THEN NULL;
END $$;

-- 2. Add indexes for faster lookups
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON public.orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_tracking_number ON public.orders(tracking_number);

-- 3. Ensure storage bucket for barcodes
INSERT INTO storage.buckets (id, name, public) 
VALUES ('tracking-barcodes', 'tracking-barcodes', true)
ON CONFLICT (id) DO NOTHING;

-- 4. Storage Policies for barcodes
CREATE POLICY "Admins can upload barcode images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
    (SELECT is_admin FROM public.profiles WHERE id = auth.uid()) = true
    AND bucket_id = 'tracking-barcodes'
);

CREATE POLICY "Anyone can view barcode images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'tracking-barcodes');
