import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, CartItem, UserProfile } from '../types';
import { supabase } from '../lib/supabase';

// Mock Data
export const MOCK_PRODUCTS: Product[] = [
    {
        id: 'mirage-gentle-wash',
        name: 'Mirage Silky Gentle Wash',
        description: 'A luxurious, ultra-gentle cleansing formula designed for sensitive skin. Infused with botanical extracts to remove impurities while leaving a silky, hydrated finish without stripping essential moisture.',
        price_cents: 12000,
        currency: 'usd',
        category: 'Cleansers',
        image_url: '/images/products/silky_gentle_wash.png',
        active: true
    },
    {
        id: 'mirage-facial-wash',
        name: 'Mirage Silky Facial Wash',
        description: 'A sophisticated daily facial cleanser that utilizes micro-cleansing technology to refine pores and refresh the complexion. Perfectly balanced for all skin types to maintain a healthy pH level.',
        price_cents: 12000,
        currency: 'usd',
        category: 'Cleansers',
        image_url: '/images/products/silky_facial_wash.png',
        active: true
    },
    {
        id: 'mirage-c-reti',
        name: 'Mirage C Reti Cream',
        description: 'An intensive age-defying treatment combining the brightening power of stabilized Vitamin C with the regenerative benefits of Retinol. Stimulates collagen production and targets fine lines for a radiant glow.',
        price_cents: 12000,
        currency: 'usd',
        category: 'Rejuvenation',
        image_url: '/images/products/c_reti_cream.png',
        active: true
    },
    {
        id: 'mirage-night-cream',
        name: 'Mirage Collagen Night Cream',
        description: 'A rich, restorative nightly balm that works in harmony with the skin’s nocturnal repair cycle. Deeply mimics natural lipids to firm, plum, and eliminate signs of fatigue by morning.',
        price_cents: 12000,
        currency: 'usd',
        category: 'Moisturizers',
        image_url: '/images/products/collagen_night_cream.png',
        active: true
    },
    {
        id: 'mirage-day-cream',
        name: 'Mirage Collagen Day Cream',
        description: 'A high-performance daytime moisturizer that provides long-lasting hydration and environmental protection. Infused with marine collagen to improve skin elasticity and create a smooth, luminous base.',
        price_cents: 12000,
        currency: 'usd',
        category: 'Moisturizers',
        image_url: '/images/products/collagen_day_cream.png',
        active: true
    },
    {
        id: 'mirage-eye-cream',
        name: 'Mirage Collagen Eye Cream',
        description: 'A targeted clinical treatment for the delicate periocular area. Formulated with peptide complexes and collagen to visibly reduce dark circles, puffiness, and crow’s feet.',
        price_cents: 12000,
        currency: 'usd',
        category: 'Moisturizers',
        image_url: '/images/products/collagen_eye_cream.png',
        active: true
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
    isInitialized: boolean;

    // Actions
    fetchProducts: () => Promise<void>;
    setInitialized: (val: boolean) => void;
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
            isInitialized: false,

            fetchProducts: async () => {
                set({ loading: true });
                try {
                    const { data, error } = await supabase
                        .from('products')
                        .select('*')
                        .eq('active', true);

                    if (error) {
                        console.warn('Error fetching products from DB:', error);
                        set({ products: MOCK_PRODUCTS });
                    } else if (data && data.length > 0) {
                        const dbProducts: Product[] = data
                            .map((p: any) => ({
                                id: p.id,
                                name: p.name,
                                description: p.description,
                                price_cents: p.price_cents,
                                currency: p.currency || 'usd',
                                category: p.category,
                                image_url: p.image_url || '',
                                active: p.active
                            }))
                            .filter((p: Product) => {
                                // Filter out placeholders and empty products
                                const name = p.name?.toLowerCase() || '';
                                const isPlaceholder =
                                    name.includes('botox') ||
                                    name.includes('acne treatment') ||
                                    name.includes('chemical peel') ||
                                    name.includes('placeholder') ||
                                    !p.name ||
                                    !p.image_url;
                                return !isPlaceholder;
                            });

                        // Merge Mocks with DB products, ensuring ID uniqueness, favoring Mirage mocks
                        const combined = [...MOCK_PRODUCTS];
                        dbProducts.forEach(dbProd => {
                            if (!combined.find(m => m.id === dbProd.id)) {
                                combined.push(dbProd);
                            }
                        });
                        set({ products: combined });
                    } else {
                        set({ products: MOCK_PRODUCTS });
                    }
                } catch (e) {
                    set({ products: MOCK_PRODUCTS });
                }
                set({ loading: false });
            },

            setInitialized: (val) => set({ isInitialized: val }),

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
            logout: () => set({ user: null, wishlist: [], cart: [] }),

            openAuthModal: () => set({ isAuthModalOpen: true }),
            closeAuthModal: () => set({ isAuthModalOpen: false }),

            openCart: () => set({ isCartOpen: true }),
            closeCart: () => set({ isCartOpen: false }),
        }),
        {
            name: 'miremadi-shop-storage',
            partialize: (state) => ({
                cart: state.cart,
                wishlist: state.wishlist
            }) as any,
        }
    )
);
