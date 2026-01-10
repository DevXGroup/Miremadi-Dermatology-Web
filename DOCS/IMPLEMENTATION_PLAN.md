# Dr. Arjang Miremadi - Dermatology Web App Implementation Plan

## Project Overview
A modern, clean, and fast web application for Dr. Arjang Miremadi, a dermatologist and pathologist with 55+ years of experience. The app will showcase services and allow users to purchase cosmetic products.

## Technology Stack
- **Frontend Framework**: Vite + React
- **Styling**: TailwindCSS (Custom configuration for specific color palette)
- **Database & Authentication**: Supabase
- **Payments**: Stripe
- **Deployment**: Vercel

## Design Requirements
- **Aesthetics**: Super modern, clean, premium.
- **Color Palette**: 
  - Light Pink
  - White
  - Turquoise Blue
- **Typography**: 
  - Large, readable fonts (prioritizing accessibility for older users).
  - Modern sans-serif fonts (e.g., Inter, Outfit).
- **Visuals**: 
  - High-quality images.
  - Animations and video components.
  - Clean layout, avoiding clutter.

## Extended Features (Phase 3+)
- **E-Commerce Deep Dive**:
  - Full Checkout with Stripe.
  - Gift Cards & Discount Codes.
  - Order Management & Tracking.
  - Multi-currency support.
- **Content & Community**:
  - Rich Blog System (Markdown/CMS).
  - Comments & User Interaction.
- **Admin Dashboard**:
  - Product/Order/Blog management.
  - Analytics overview.
- **Advanced Tech**:
  - PWA (Offline mode, Service Workers).
  - Multi-language (i18n).
  - Dark/Light mode toggle.
  - Advanced Animations (Custom cursor, tracking).

## Core Features
### 1. General UI/UX
- Responsive design (Mobile, Tablet, Desktop).
- "Wow" factor with animations (Framer Motion).
- Easy navigation with overlays.
- Custom cursor & micro-interactions.

### 2. Services Showcase
- Display services with simple descriptions.
- Use video and animations.
- "Before & After" or illustrative images.

### 3. E-Commerce (Shop)
- Product listing (Creams, etc.).
- Product details overlay/page.
- Shopping Cart functionality.
- Stripe Checkout integration.
- Wishlist & Order History.

### 4. User System
- Authentication via Supabase (Google OAuth, Email/Password).
- User Profile: Name, Address.
- Order History (Payment history).
- **Strict rule**: NO medical records stored in this system.

## Implementation Steps
### Phase 1: Foundation & Design System (COMPLETED)
- [x] Install dependencies (Router, Framer Motion, Zustand, Stripe, i18n).
- [x] Configure Tailwind with new palette & Dark Mode support.
- [x] Set up Folder Structure & Navigation (Router).

### Phase 2: Core Components & Layout (COMPLETED)
- [x] **Navbar**: Mega-menu, Dark mode toggle, Cart icon.
- [x] **Hero**: High-impact visuals, animations.
- [x] **Blog**: Blog listing and article view UI.
- [x] **Components**: Buttons, Cards, Inputs with "Attio" style linear aesthetics.

### Phase 3: Backend Integration (COMPLETED)
- [x] **Supabase Setup**: 
  - [x] Create Project (User Action Required).
  - [x] Add keys to `.env.local` (File created, User to fill).
  - [x] Initialize Supabase client (`src/lib/supabase.ts`).
- [x] **Database Schema**:
  - [x] Create `products` table (SQL provided in `supabase/schema.sql`).
  - [x] Create `profiles` table (SQL provided in `supabase/schema.sql`).
  - [x] Create `orders` table (SQL provided in `supabase/schema.sql`).
- [x] **Authentication**:
  - [x] Build Login/Signup Pages (Replaced with specific Auth Modal).
  - [x] Connect Supabase Auth to Zustand store.
- [x] **Store Logic**:
  - [x] Refactor `useShopStore` to fetch from Supabase.
  - [x] Add Cart and User logic.

### Phase 4: Payments & Admin (IN PROGRESS)
- [ ] **Payments (Stripe)**:
  - [ ] Set up Stripe account & keys.
  - [x] Create Payment & Billing UI (`/billing`).
  - [ ] Integrate `<PaymentElement />` in Checkout (Placeholder created).
- [ ] **Admin Dashboard**:
  - [ ] Create protected `/admin` route.
  - [ ] Build "Add Product" form.
  - [ ] Build "Order List" view.
- [ ] **SEO & Performance**:
  - [ ] Add dynamic meta tags (Helmet/Head).
  - [ ] Optimize images (WebP).

## Assets checklist
- [ ] Get final SVG Logo.
- [ ] Collect real product images.
- [ ] Write initial blog posts (markdown).


