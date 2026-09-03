# Miremadi-Dermatology-Web: Claude Project Instructions

Client site for Dr. Arjang Miremadi's dermatology practice. Client engagement, not a
DevX product.

## Read order

1. `BRIEF.md` (this repo)
2. `../BACKLOG.md` (source of truth for engagement status and priorities)
3. `docs/DECISIONS.md` if it exists (it does not yet)
4. This file

## Stack

Vite + React 19 + TypeScript strict, Tailwind v4, Zustand, Supabase (auth, DB, storage,
Deno edge functions), Stripe, Framer Motion, `react-ga4`.

## Run / build

```bash
npm install
npm run dev
npm run build
npm run preview
```

No test or lint script is defined in `package.json`.

## Hard rules

- **This is a client project.** Never post, publish, deploy, or push without Max's
  explicit go. The global "push all always" autonomy rule for DevX's own projects does
  not apply here.
- **E-commerce stays off in production** (Stripe test mode, admin dashboard, checkout)
  until the client clears the legal/regulatory question on selling skincare online.
  Do not flip Stripe to live mode or re-enable the shop route without that clearance.
- **Raw client files in the parent folder** (`../Dr.MIREMADI REVIEWS YELP`,
  `../DR MIREMADI FILES`, `../Miremadi Web Assets`) are reference material only. Never
  copy their contents into this repo; read them only if directly relevant to a task.
- Do not invent engagement terms, pricing, or status. `../BACKLOG.md` and `../BRIEF.md`
  are the source of truth for the business relationship; this repo tracks code only.
