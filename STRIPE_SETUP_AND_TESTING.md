# Stripe Setup & End-to-End Testing Guide

Follow these steps in order to fully activate and test the secure ecommerce and admin dashboard features.

## 1. Stripe Account Setup
1. **Create Account**: Go to [Stripe.com](https://stripe.com) and sign up (or log in).
2. **Developer Dashboard**: Toggle "Test Mode" on (top right) so you don't process real money.
3. **API Keys**:
   - Go to **Developers > API keys**.
   - Copy the **Publishable Key** (`pk_test_...`).
   - Copy the **Secret Key** (`sk_test_...`).
4. **Webhook Setup** (You will need your Supabase Function URL first):
   - For now, just note where this is: **Developers > Webhooks**.
   - You will create an endpoint pointing to `https://<YOUR_PROJECT_REF>.supabase.co/functions/v1/stripe-webhook`.
   - Select events to listen for:
     - `checkout.session.completed`
     - `invoice.paid` (if using subscriptions)
   - After creating, copy the **Signing Secret** (`whsec_...`).

## 2. Supabase Database Migration
1. **Login to Supabase**: Go to your project dashboard.
2. **SQL Editor**: Open the SQL Editor (sidebar icon).
3. **Run Migration**:
   - Open the file `supabase/migrations/update_schema_for_admin.sql` in your local editor.
   - Copy the entire content.
   - Paste it into the Supabase SQL Editor and click **Run**.
   - *Result*: This creates the `is_admin` column, `order_tracking_images` bucket, and sets up security policies.

## 3. Environment Variables
You need to set keys in two places: **Frontend** (local) and **Backend** (Supabase Edge Functions).

### A. Frontend (`.env.local`)
Update your local `.env.local` file:
```bash
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...  # <--- Add your Stripe Publishable Key
```

### B. Backend (Supabase Dashboard)
Go to **Settings > Edge Functions** in Supabase and add the following secrets:
- `STRIPE_SECRET_KEY`: `sk_test_...` (Your Stripe Secret Key)
- `STRIPE_WEBHOOK_SECRET`: `whsec_...` (Your Webhook Signing Secret)
- `STRIPE_PRICE_WEEKLY`: (Optional, Stripe Price ID for weekly sub)
- `STRIPE_PRICE_MONTHLY`: (Optional, Stripe Price ID for monthly sub)
- `SUPABASE_URL`: (Usually auto-injected, but good to ensure)
- `SUPABASE_ANON_KEY`: (Usually auto-injected)

*Note: You can also set these via CLI:*
```bash
npx supabase secrets set STRIPE_SECRET_KEY=sk_test_... STRIPE_WEBHOOK_SECRET=whsec_...
```

## 4. Deploy Edge Functions
You need to deploy the server-side logic to Supabase.
1. **Install CLI** (if not installed): `npm install -g supabase` or use `npx`.
2. **Login**: `npx supabase login`
3. **Deploy**:
   Run the following commands in your terminal:
   ```bash
   npx supabase functions deploy create-checkout-session --no-verify-jwt
   npx supabase functions deploy stripe-webhook --no-verify-jwt
   npx supabase functions deploy admin-api --no-verify-jwt
   ```
   *Note: `--no-verify-jwt` is used for the webhook so Stripe can call it without a Supabase user token. The other functions handle auth internally.*

## 5. End-to-End Testing Checklist

### Test 1: Patient Checkout
1.  **Register/Login**: Open your app (`npm run dev`) and sign up a new user (e.g., `patient@test.com`).
2.  **Add to Cart**: Go to "Shop", add items to the cart.
3.  **Checkout**: Click "Checkout". You should be redirected to a Stripe hosted page.
4.  **Pay**: Use Stripe test card numbers (e.g., `4242 4242 4242 4242`, any future date, any CVC).
5.  **Success**: Verify you are redirected back to `/checkout/success`.
6.  **Verify DB**: Check the `orders` table in Supabase. You should see a new row with `status: 'paid'` and a `purchase_id`.

### Test 2: Admin Dashboard Access
1.  **Make Yourself Admin**:
    - Go to Supabase Table Editor > `profiles`.
    - Find your user row.
    - Manually check the `is_admin` box (set to `TRUE`).
2.  **Access Dashboard**:
    - In the app app, refresh the page.
    - Open the User Menu (top right). You should see "**Admin Dashboard**".
    - Click it. You should see the Stats cards and your new order in the "Pending" list.

### Test 3: Order Fulfillment
1.  **Fulfill Order**:
    - In the Admin Dashboard, find the order you just made.
    - Click **"Fulfill"**.
    - Enter a fake tracking number (e.g., `TRACK123`).
    - Upload a dummy image (e.g., deep screenshot).
    - Click **"Complete Order"**.
2.  **Verify**:
    - The order should disappear from "Pending" and appear in "Completed".
    - Click the "View Label" link to ensure the image checks out.

## Troubleshooting
-   **Webhook 400 Errors**: Check the `stripe-webhook` logs in Supabase Dashboard > Edge Functions. It usually means the `STRIPE_WEBHOOK_SECRET` is wrong or the signature verification failed.
-   **"User not found"**: Ensure the `create-checkout-session` function has `SUPABASE_URL` and `SUPABASE_ANON_KEY` access.
-   **Admin Access Denied**: Ensure you updated the RLS policies by running the migration SQL.
