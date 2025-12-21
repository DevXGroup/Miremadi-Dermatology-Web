import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, CartItem, User, Order } from '../types';

// Mock Data
const MOCK_PRODUCTS: Product[] = [
    {
        id: '1',
        name: 'Hydrating Silk Cream',
        description: 'Expertly formulated daily moisturizer for deep hydration.',
        price: 85,
        category: 'Moisturizers',
        image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=800',
        tags: ['Best Seller', 'Hydrating'],
        inventory: 50
    },
    {
        id: '2',
        name: 'Vitamin C Serum',
        description: 'Brightening serum to even out skin tone and texture.',
        price: 120,
        category: 'Serums',
        image: 'https://images.unsplash.com/photo-1620916297397-a4a5402a3c6c?auto=format&fit=crop&q=80&w=800',
        tags: ['Brightening', 'Anti-aging'],
        inventory: 35
    },
    {
        id: '3',
        name: 'Gentle Foaming Cleanser',
        description: 'Removes impurities without stripping natural oils.',
        price: 45,
        category: 'Cleansers',
        image: 'https://images.unsplash.com/photo-1556228720-1957be919ba1?auto=format&fit=crop&q=80&w=800',
        tags: ['Daily Use'],
        inventory: 100
    },
    {
        id: '4',
        name: 'Retinol Night Repair',
        description: 'Powerful night treatment for skin renewal.',
        price: 150,
        category: 'Treatments',
        image: 'https://images.unsplash.com/photo-1611080541599-8c6dbde6edb8?auto=format&fit=crop&q=80&w=800',
        tags: ['Night Care', 'Anti-aging'],
        inventory: 20
    }
];

interface ShopState {
    products: Product[];
    cart: CartItem[];
    user: User | null;
    wishlist: string[]; // Product IDs

    // Actions
    addToCart: (product: Product) => void;
    removeFromCart: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
    toggleWishlist: (productId: string) => void;
    login: (email: string) => void; // Mock login
    logout: () => void;
}

export const useShopStore = create<ShopState>()(
    persist(
        (set, get) => ({
            products: MOCK_PRODUCTS,
            cart: [],
            user: null,
            wishlist: [],

            addToCart: (product) => {
                const cart = get().cart;
                const existing = cart.find(item => item.id === product.id);

                if (existing) {
                    set({
                        cart: cart.map(item =>
                            item.id === product.id
                                ? { ...item, quantity: item.quantity + 1 }
                                : item
                        )
                    });
                } else {
                    set({ cart: [...cart, { ...product, quantity: 1 }] });
                }
            },

            removeFromCart: (productId) => {
                set({ cart: get().cart.filter(item => item.id !== productId) });
            },

            updateQuantity: (productId, quantity) => {
                if (quantity <= 0) {
                    get().removeFromCart(productId);
                    return;
                }
                set({
                    cart: get().cart.map(item =>
                        item.id === productId ? { ...item, quantity } : item
                    )
                });
            },

            clearCart: () => set({ cart: [] }),

            toggleWishlist: (productId) => {
                const current = get().wishlist;
                if (current.includes(productId)) {
                    set({ wishlist: current.filter(id => id !== productId) });
                } else {
                    set({ wishlist: [...current, productId] });
                }
            },

            login: (email) => {
                set({
                    user: {
                        id: 'u_123',
                        name: 'Demo User',
                        email,
                        orders: []
                    }
                });
            },

            logout: () => set({ user: null })
        }),
        {
            name: 'miremadi-shop-storage',
        }
    )
);
