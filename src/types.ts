// Product Interfaces
export interface Product {
    id: string;
    name: string;
    description?: string;
    category?: 'moisturizers' | 'serums' | 'cleansers' | 'treatments' | 'medical' | 'cosmetic' | string;
    price_cents: number;
    currency: string;
    image_url?: string;
    active: boolean;
    created_at?: string;
}

export interface CartItem extends Product {
    quantity: number;
}

// User & Auth Interfaces
export interface UserProfile {
    id: string;
    email: string;
    full_name: string;
    stripe_customer_id?: string;
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

// Order History
export type PaymentStatus = 'pending' | 'paid' | 'failed';
export type ShippingStatus = 'pending' | 'complete';
export type RecurringType = 'none' | 'weekly' | 'monthly';

export interface OrderItem {
    id: string;
    order_id: string;
    product_id: string;
    product_name_snapshot: string;
    unit_price_cents: number;
    quantity: number;
    line_total_cents: number;
}

export interface Order {
    id: string;
    user_id: string;
    total_amount_cents: number;
    currency: string;

    stripe_payment_intent_id?: string;
    stripe_invoice_id?: string;
    stripe_subscription_id?: string;

    payment_status: PaymentStatus;
    shipping_status: ShippingStatus;
    recurring: RecurringType;

    shipping_name?: string;
    shipping_address_line1?: string;
    shipping_address_line2?: string;
    shipping_city?: string;
    shipping_state?: string;
    shipping_postal_code?: string;
    shipping_country?: string;
    tracking_number?: string;
    shipped_at?: string;

    created_at: string;
    updated_at?: string;

    // Virtual field for frontend convenience if we join
    items?: OrderItem[];
}
