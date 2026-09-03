# Miremadi-Dermatology-Web, in one page

> This is the code repo. The project-level brief and backlog live one level up, at
> `../BRIEF.md` and `../BACKLOG.md` — read those first for the client relationship and
> priorities. This file covers what lives in this repo specifically. Deeper docs:
> `README.md` for setup, `DOCS/SYSTEM_ARCHITECTURE.md` for architecture,
> `DOCS/PRODUCTION_DEPLOYMENT_GUIDE.md` for deploys.

## What this is

The Vite + React + TypeScript codebase for Dr. Arjang Miremadi's dermatology practice
site. It contains two things in one codebase: a live informational site (practice info,
services, blog) and a built-but-dormant e-commerce layer (product catalog, cart, Stripe
checkout, Supabase-backed admin fulfillment dashboard).

## Who it is for

Dr. Miremadi's patients and prospective patients browse the live site. Dr. Miremadi is
the client; DevX Group built and maintains this repo for him.

## Why it exists

A dermatology practice needs a credible, fast-loading site. This repo was built to cover
both what the practice needs now (informational) and what it may want later (a shop),
so turning on e-commerce is a config and Stripe-key flip, not a rebuild.

## How it makes money

Client-billed, not a DevX product. The engagement terms are not recorded in this repo.
See `../BRIEF.md` for the open question on whether the engagement is still active.

## Where things stand (2026-09-02)

`git log` shows real history back through dependency-security fixes (`eb55a85`), the
branch is `prod`, tracking `origin/prod`, and `git status` is clean. `package.json`
reports version `1.2.8`. The README documents e-commerce (Stripe, Supabase edge
functions, admin dashboard) as built but deliberately deactivated in production per the
client's request, pending legal/regulatory clearance to sell skincare products online.

**The repo is healthy and version-controlled; the only open question is the business
relationship behind it, tracked in `../BACKLOG.md`.**

## What happens next, in order

1. Confirm with Dr. Miremadi whether the engagement is active (owner: Max, tracked in
   `../BACKLOG.md`).
2. If active, run a basic health check: uptime, dependency freshness, TLS certificate.
3. If the client wants e-commerce turned on, treat it as a deliberate activation:
   resolve the legal/regulatory question on selling skincare online first, then flip
   Stripe from test to live mode.

## Map

| Question | Where |
|---|---|
| Is this engagement active, what's the priority list? | `../BACKLOG.md` |
| Stack, setup, feature list | `README.md` |
| System architecture (frontend, Supabase edge functions, Stripe flow) | `DOCS/SYSTEM_ARCHITECTURE.md` |
| How to deploy | `DOCS/PRODUCTION_DEPLOYMENT_GUIDE.md` |
| Build/roadmap history | `DOCS/IMPLEMENTATION_PLAN.md` |
| Agent instructions | `CLAUDE.md`, `AGENTS.md` |
