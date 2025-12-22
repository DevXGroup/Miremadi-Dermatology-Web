// Product Interfaces
export interface Product {
    id: string;
    name: string;
    description: string;
    category: string;
    price: number;
    image_url: string;
    is_featured: boolean;
    inventory: number; // Keeping for internal logic
}

export interface CartItem extends Product {
    quantity: number;
}

// User & Auth Interfaces
export interface UserProfile {
    id: string;
    email: string;
    full_name: string;
    phone_number?: string;
    address?: {
        line1: string;
        line2?: string;
        city: string;
        state: string;
        postal_code: string;
        country: string;
    };
    agreed_to_terms?: boolean;
    terms_agreed_at?: string;
    privacy_policy_accepted?: boolean;
    privacy_policy_accepted_at?: string;
    photo_url?: string;
    skin_type?: 'Normal' | 'Dry' | 'Oily' | 'Combination' | 'Sensitive';
    skin_goals?: string;
    created_at: string;
}

// Payment & Billing Interfaces
export interface PaymentMethod {
    id: string;
    brand: string;
    last4: string;
    exp_month: number;
    exp_year: number;
    is_default: boolean;
}

export interface Subscription {
    id: string;
    status: 'active' | 'canceled' | 'past_due' | 'trialing';
    plan_name: string;
    current_period_end: string;
    cancel_at_period_end: boolean;
}

// Order History (Basic)
export interface Order {
    id: string;
    date: string;
    total: number;
    status: 'pending' | 'processing' | 'shipped' | 'delivered';
    items: CartItem[];
}
