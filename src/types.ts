export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    image: string;
    tags: string[];
    inventory: number;
}

export interface CartItem extends Product {
    quantity: number;
}

export interface User {
    id: string;
    email: string;
    name: string;
    orders: Order[];
}

export interface Order {
    id: string;
    date: string;
    total: number;
    status: 'pending' | 'processing' | 'shipped' | 'delivered';
    items: CartItem[];
}
