# Miremadi Dermatology & Web Store

A premium, high-performance web application for Dr. Arjang Miremadi, combining a dermatology service showcase with a full-featured e-commerce store. Built with modern web technologies to ensure speed, accessibility, and a stunning "Attio-style" aesthetic.

## 🚀 Features

### Core Experience
- **Premium UI/UX**: Linear design system, glassmorphism, and micro-interactions powered by `framer-motion`.
- **Dark/Light Mode**: Fully supported dynamic theming.
- **PWA Support**: Installable on mobile devices with offline capabilities.
- **Responsive**: Mobile-first design that scales perfectly to desktop.

### E-Commerce (Shop)
- **Product Management**: Grid view with filtering and search.
- **Cart System**: High-performance cart state management using `zustand`.
- **Wishlist**: Save favorite products (persisted locally).
- **Checkout Flow**: Multi-step checkout UI ready for Stripe integration.

### Content
- **Blog Engine**: A rich journal section for dermatology insights.
- **Service Showcase**: Animated presentation of medical and cosmetic services.

## 🛠 Tech Stack

- **Framework**: [Vite](https://vitejs.dev/) + [React](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [TailwindCSS](https://tailwindcss.com/) (v4) + Custom Design System
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Routing**: [React Router](https://reactrouter.com/)
- **PWA**: [Vite PWA](https://vite-pwa-org.netlify.app/)

## 🏃‍♂️ Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd Miremadi-Dermatology-Web
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```
   Visit `http://localhost:5173` to view the app.

4. **Build for Production**
   ```bash
   npm run build
   ```

## 📍 Next Steps (Immediate Action Items)

The frontend foundation is complete. The next phase focuses on backend integration and "real" data.

### 1. Backend Setup (Phase 3)
- [ ] **Connect Supabase**: Set up Supabase project for specific Auth and Database needs.
- [ ] **Database Schema**: Create tables for `products`, `users`, `orders`, and `blog_posts` to replace mock data.
- [ ] **Authentication**: Implement real Sign-up/Login flow in the frontend.

### 2. Payments
- [ ] **Stripe Integration**: Replace the mock checkout form with Stripe Elements.
- [ ] **Server Functions**: Set up Edge Functions (via Supabase) to handle secure payment intents.

### 3. Admin Dashboard
- [ ] **Admin Routes**: Create a protected `/admin` area.
- [ ] **Management UI**: Build forms to add/edit products and blog posts without coding.
