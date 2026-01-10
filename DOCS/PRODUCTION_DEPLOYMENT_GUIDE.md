# 🚀 Production & Deployment Guide: Miremadi Dermatology Web

Follow these steps to move the application from **Test/Sandbox** mode to **Live Production**. Use this checklist once you have finished developing and are ready to take real payments.

---

## 1. Supabase Database Sync
Ensure the production database has the exact same structure as your local MacBook version.

- [ ] **Run Final Migrations**
  In your project terminal, run:
  ```bash
  npx supabase db push
  ```
  *This ensures the `orders`, `profiles`, and `products` tables are up to date with the latest columns (like OCR tracking).*

---

## 2. Supabase Edge Functions
Your "Logic" needs to be sent to the live cloud servers.

- [ ] **Deploy All Functions**
  ```bash
  npx supabase functions deploy create-checkout-session
  npx supabase functions deploy stripe-webhook
  npx supabase functions deploy admin-api
  npx supabase functions deploy process-barcode-ocr
  ```

---

## 3. Stripe: Switch to Live Mode
Log in to your [Stripe Dashboard](https://dashboard.stripe.com/).

- [ ] **Activate Account**: Ensure your Stripe account is fully activated for live transactions.
- [ ] **Toggle "Test Mode" to OFF**: Switch the toggle in the top-right corner to **Live**.
- [ ] **Get API Keys**: 
  - Copy your **Secret Key** (`sk_live_...`)
  - Copy your **Publishable Key** (`pk_live_...`)
- [ ] **Create Live Webhook**:
  - Go to **Developers > Webhooks > Add Endpoint**.
  - **URL**: `https://[YOUR_SUPABASE_PROJECT_ID].supabase.co/functions/v1/stripe-webhook`
  - **Events to listen for**: `checkout.session.completed`
  - **Signing Secret**: Click "Reveal" to get the `whsec_...` key.

---

## 4. Set Production Secrets (CLI)
You must update the "Cloud Secrets" in Supabase so the Edge Functions use real Stripe credentials.

- [ ] **Update Stripe Secret Key**
  ```bash
  npx supabase secrets set STRIPE_SECRET_KEY=sk_live_your_actual_key_here
  ```
- [ ] **Update Webhook Secret**
  ```bash
  npx supabase secrets set STRIPE_WEBHOOK_SECRET=whsec_your_live_webhook_secret_here
  ```
- [ ] **Verify Auto-Secrets**:
  Confirm that `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are already managed by Supabase (you don't need to set them manually).

---

## 5. Frontend Environment Variables
Update your production hosting environment (e.g., your `.env.production` file or Vercel/Netlify settings).

- [ ] **Update Supabase Keys**
  - `VITE_SUPABASE_URL`: (Stays the same)
  - `VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY`: (Starts with `sb_publishable_` or `eyJ...`)
- [ ] **Update Stripe Key**
  - `VITE_STRIPE_PUBLISHABLE_KEY`: Use the **Live** version starting with `pk_live_...`.

---

## 6. Final "Live" Verification
Perform these checks to ensure zero-downtime and zero-error launch.

- [ ] **Signup Test**: Create a real account with a real email. Confirm the record appears in the `profiles` table.
- [ ] **Small Purchase Test**: Make a small real purchase (e.g., $5) to ensure:
    - Stripe Checkout opens successfully.
    - Webhook triggers after payment.
    - Order appears in your **Order History** page.
- [ ] **OCR Admin Test**: 
    - Go to the Admin Dashboard.
    - Upload a real USPS barcode to the order.
    - Confirm the order status changes to "Shipped" and the tracking link works.

---

## 🆘 Troubleshooting Contacts
- **Database Errors?** Check Supabase SQL Editor for table structure.
- **Payment Errors?** Check Supabase Edge Function **Logs** for `create-checkout-session`.
- **Order Not Appearing?** Check Supabase Edge Function **Logs** for `stripe-webhook`.
