# System Architecture & Flow Diagrams

This document outlines the architecture for the secure ecommerce and admin fulfillment system.

## 1. System Architecture Diagram

High-level overview of the components and their interactions.

```mermaid
graph TD
    subgraph Client ["Frontend (Vite + React)"]
        PatientUI[Patient UI<br/>(Shop, Cart, Checkout)]
        AdminUI[Admin Dashboard<br/>(Stats, Orders, Fulfillment)]
    end

    subgraph Backend ["Supabase Edge Functions"]
        CreateSession["create-checkout-session<br/>(Secure Session Creation)"]
        StripeWebhook["stripe-webhook<br/>(Async Order Processing)"]
        AdminAPI["admin-api<br/>(Secure Admin Actions)"]
    end

    subgraph Data ["Supabase Platform"]
        Auth[Supabase Auth]
        DB[(Postgres DB)]
        Storage[Supabase Storage]
    end

    subgraph External ["External Services"]
        Stripe[Stripe Payments]
    end

    %% Auth Flows
    PatientUI -->|Auth & RLS| Auth
    AdminUI -->|Auth & Role Check| Auth

    %% Checkout Flow
    PatientUI -->|POST /create-session| CreateSession
    CreateSession -->|Create Customer/Session| Stripe
    CreateSession -.->|Read Profile| DB
    PatientUI -->|Redirect| Stripe

    %% Webhook Flow
    Stripe -->|Webhook Event| StripeWebhook
    StripeWebhook -->|Verify Signature| Stripe
    StripeWebhook -->|Create Order & Items| DB

    %% Admin Flow
    AdminUI -->|GET Stats/Orders| AdminAPI
    AdminUI -->|POST Complete (w/ Image)| AdminAPI
    AdminAPI -->|Read/Write Data| DB
    AdminAPI -->|Upload Image| Storage
    
    %% Relationships
    DB <--> Storage
```

## 2. End-to-End Sequence Diagram

Detailed flow from the moment a patient initiates a purchase to when an admin fulfills the order.

```mermaid
sequenceDiagram
    autonumber
    actor Patient
    participant FE as Frontend (React)
    participant Edge as Edge Functions
    participant Stripe as Stripe API
    participant DB as Supabase DB
    participant Storage as Supabase Storage
    actor Admin

    box "Checkout Flow" #f9f9f9
        Patient->>FE: Click "Checkout"
        FE->>Edge: POST /create-checkout-session<br/>(Auth Token, Cart Items)
        Edge->>DB: Get User Profile (Stripe ID)
        Edge->>Stripe: Create Customer (if new)
        Edge->>Stripe: Create Checkout Session<br/>meta: {patient_id, purchase_id}
        Stripe-->>Edge: Session URL
        Edge-->>FE: Return URL
        FE->>Stripe: Redirect Patient to Payment Page
        Patient->>Stripe: Enter Card Details & Pay
        Stripe-->>FE: Redirect to Success Page
    end

    box "Async Processing" #e6f3ff
        Stripe->>Edge: POST /stripe-webhook<br/>(checkout.session.completed)
        Edge->>Stripe: Verify Signature
        Edge->>Edge: Extract Metadata (patient_id, purchase_id)
        Edge->>DB: INSERT INTO orders (status='paid')
        Edge->>DB: INSERT INTO order_items
        Edge-->>Stripe: 200 OK
    end

    box "Admin Fulfillment" #fff0f0
        Admin->>FE: Open Admin Dashboard
        FE->>Edge: GET /admin-api?action=stats
        Edge->>DB: Query Pending Orders & Revenue
        Edge-->>FE: Return Stats
        
        FE->>Edge: GET /admin-api?action=list&status=pending
        Edge->>DB: Query Pending Orders
        Edge-->>FE: Return Orders List
        
        Admin->>FE: Select Order -> "Fulfill"
        Admin->>FE: Enter Tracking # & Upload Label Image
        FE->>Edge: POST /admin-api?action=complete<br/>(FormData: image, tracking #)
        
        Edge->>Edge: Validate Admin Role
        Edge->>Storage: Upload Image File
        Storage-->>Edge: Return Public Image URL
        
        Edge->>DB: UPDATE orders<br/>SET status='completed', tracking_url=...
        Edge-->>FE: Return Success
        
        FE->>FE: Update UI (Move to Completed)
    end
```

## Key Security Features Highlighted

1.  **Metadata Trust**: The `patient_id` and `purchase_id` are generated/attached Server-Side during the Checkout Session creation. The Webhook relies *only* on this trusted metadata, ignoring client-side claims.
2.  **Edge Functions Middleman**: The Frontend never writes directly to `orders` during checkout. This prevents clients from creating fake "paid" orders.
3.  **Role Verification**: The `admin-api` strictly checks `is_admin` on the user profile before allowing any sensitive reads or writes.
4.  **Storage Policies**: Only admins can upload to the `order_tracking_images` bucket via RLS policies (or the server-side Edge Function bypasses RLS using the Service Role key).
