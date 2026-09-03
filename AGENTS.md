# AGENTS.md

Vite + React + TypeScript site for Dr. Arjang Miremadi's dermatology practice, with a
built-but-dormant Stripe/Supabase e-commerce layer.

Read in this order: `BRIEF.md`, `../BACKLOG.md`, `CLAUDE.md`.

## Commands

```bash
npm install
npm run dev       # dev server, localhost:5173
npm run build     # production build
npm run preview   # preview the build
```

No test or lint script exists yet.

## Rules that bite

- This is a client project: no deploy, publish, or push without explicit sign-off.
- E-commerce (Stripe, cart, admin dashboard) stays disabled in production until the
  client clears the legal question on selling skincare online. Do not activate it.
- Never copy content from the raw client folders one level up (Yelp reviews, "DR
  MIREMADI FILES", asset dumps) into this repo. Reference them, don't ingest them.
