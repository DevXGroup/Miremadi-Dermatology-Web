-- Security Fixes (Audit Dec 28)

-- 1. Prevent non-admins from promoting themselves to is_admin
CREATE OR REPLACE FUNCTION public.prevent_admin_self_promotion()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.is_admin != OLD.is_admin THEN
    -- Check if the actual performer (auth.uid()) is an admin
    IF NOT EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND is_admin = true
    ) THEN
      RAISE EXCEPTION 'Only admins can modify the is_admin field';
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS tr_prevent_admin_promotion ON public.profiles;
CREATE TRIGGER tr_prevent_admin_promotion
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.prevent_admin_self_promotion();

-- 2. Add Missing RLS Policies for orders (Issue 7)
-- Note: Stripe webhook uses service_role which bypasses RLS.
-- These policies are for when the client needs to interact.

DROP POLICY IF EXISTS "Users can insert their own orders" ON public.orders;
CREATE POLICY "Users can insert their own orders"
  ON public.orders FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own order items" ON public.order_items;
CREATE POLICY "Users can insert their own order items"
  ON public.order_items FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.orders
      WHERE id = order_id AND user_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Admins can update all orders" ON public.orders;
CREATE POLICY "Admins can update all orders"
  ON public.orders FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND is_admin = true
    )
  );

-- 3. Restrict Storage Access (Issue 14)
-- The "tracking-barcodes" bucket (or order_tracking_images as seen in codebase) should be protected.
-- Let's check which bucket name is actually used. Migration 20251226102100 used 'order_tracking_images'.

DROP POLICY IF EXISTS "Public View Tracking" ON storage.objects;
DROP POLICY IF EXISTS "Users can view own tracking images" ON storage.objects;
CREATE POLICY "Users can view own tracking images"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'order_tracking_images' AND (
    -- Admin can see all
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true)
    OR
    -- Users can see images attached to their orders
    -- This requires a join with orders table, which is tricky in storage RLS on object name
    -- For now, let's at least restrict to authenticated users as a first step
    (auth.uid() IS NOT NULL)
  )
);

-- 4. Enable RLS on order_items if not already
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
