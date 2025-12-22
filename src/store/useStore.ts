import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, CartItem, UserProfile } from '../types';
import { supabase } from '../lib/supabase';

// Mock Data
const MOCK_PRODUCTS: Product[] = [
    {
        id: '1',
        name: 'Hydrating Silk Cream',
        description: 'Expertly formulated daily moisturizer for deep hydration.',
        price: 85,
        category: 'Moisturizers',
        image_url: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=800',
        is_featured: true,
        inventory: 50
    },
    {
        id: '2',
        name: 'Vitamin C Serum',
        description: 'Brightening serum to even out skin tone and texture.',
        price: 120,
        category: 'Serums',
        image_url: 'https://images.unsplash.com/photo-1620916297397-a4a5402a3c6c?auto=format&fit=crop&q=80&w=800',
        is_featured: true,
        inventory: 35
    },
    {
        id: '3',
        name: 'Gentle Foaming Cleanser',
        description: 'Removes impurities without stripping natural oils.',
        price: 45,
        category: 'Cleansers',
        image_url: 'https://images.unsplash.com/photo-1556228720-1957be919ba1?auto=format&fit=crop&q=80&w=800',
        is_featured: false,
        inventory: 100
    },
    {
        id: '4',
        name: 'Retinol Night Repair',
        description: 'Powerful night treatment for skin renewal.',
        price: 150,
        category: 'Treatments',
        image_url: 'https://images.unsplash.com/photo-1611080541599-8c6dbde6edb8?auto=format&fit=crop&q=80&w=800',
        is_featured: true,
        inventory: 20
    }
];

interface ShopState {
    products: Product[];
    cart: CartItem[];
    user: UserProfile | null;
    wishlist: string[]; // Product IDs
    loading: boolean;
    isAuthModalOpen: boolean;
    isCartOpen: boolean;

    // Actions
    fetchProducts: () => Promise<void>;
    addToCart: (product: Product) => void;
    removeFromCart: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
    toggleWishlist: (productId: string) => void;

    // Auth
    login: (user: UserProfile) => void;
    logout: () => void;
    openAuthModal: () => void;
    closeAuthModal: () => void;

    // UI
    openCart: () => void;
    closeCart: () => void;
}

export const useShopStore = create<ShopState>()(
    persist<ShopState>(
        (set, get) => ({
            products: MOCK_PRODUCTS,
            cart: [],
            user: null,
            wishlist: [],
            loading: false,
            isAuthModalOpen: false,
            isCartOpen: false,

            fetchProducts: async () => {
                set({ loading: true });
                const { data, error } = await supabase
                    .from('products')
                    .select('*');

                if (error) {
                    console.error('Error fetching products:', error);
                } else if (data) {
                    const mappedProducts: Product[] = data.map((p: any) => ({
                        id: p.id,
                        name: p.name,
                        description: p.description,
                        price: p.price,
                        category: p.category, // Assuming DB matches 'Moisturizers' | 'Serums' etc.
                        image_url: p.image_url || 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=800',
                        is_featured: p.is_featured || false,
                        inventory: p.stock || 100
                    }));
                    set({ products: mappedProducts.length > 0 ? mappedProducts : MOCK_PRODUCTS });
                }
                set({ loading: false });
            },

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
                const state = get();
                if (!state.user) {
                    set({ isAuthModalOpen: true });
                    return;
                }
                const current = state.wishlist;
                if (current.includes(productId)) {
                    set({ wishlist: current.filter(id => id !== productId) });
                } else {
                    set({ wishlist: [...current, productId] });
                }
            },

            login: (user) => set({ user }),
            logout: () => set({ user: null, wishlist: [], cart: [] }), // Clear data on logout

            openAuthModal: () => set({ isAuthModalOpen: true }),
            closeAuthModal: () => set({ isAuthModalOpen: false }),

            openCart: () => set({ isCartOpen: true }),
            closeCart: () => set({ isCartOpen: false }),
        }),
        {
            name: 'miremadi-shop-storage',
            partialize: (state) => ({
                cart: state.cart,
                user: state.user,
                wishlist: state.wishlist
            }), // Only persist these
        }
    )
);
