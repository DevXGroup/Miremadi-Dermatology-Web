# Miremadi Dermatology & Web Store

Website for Dr. Arjang Miremadi's dermatology practice. Vite + React + TypeScript,
Tailwind v4, Supabase backend, Stripe payments.

Read `BRIEF.md` first, then `../BACKLOG.md` for open items and the client-relationship
status.

## Production status

The live site serves the informational version only: practice info, services, blog.
An e-commerce layer (product catalog, cart, Stripe checkout, Supabase-backed admin
fulfillment dashboard) is built into this codebase but switched off in production, per
the client's request, pending legal and regulatory clearance to sell skincare products
online.

## Stack

- Vite + React 19 + TypeScript
- Tailwind v4
- Zustand (cart state)
- Supabase (auth, database, storage, edge functions in Deno)
- Stripe (checkout, currently test mode / inactive in prod)
- Framer Motion
- Google Analytics 4 (`react-ga4`)

## Run it

```bash
npm install
npm run dev       # http://localhost:5173
npm run build      # production build
npm run preview    # preview the build
```

## Where things live

- `src/`, app code (components, pages, store, lib)
- `supabase/`, schema, migrations, edge functions (`stripe-webhook`,
  `create-checkout-session`, `admin-api`, `process-barcode-ocr`)
- `DOCS/SYSTEM_ARCHITECTURE.md`, how the frontend, edge functions, and Stripe connect
- `DOCS/PRODUCTION_DEPLOYMENT_GUIDE.md`, deploy steps
- `DOCS/IMPLEMENTATION_PLAN.md`, build history and roadmap
