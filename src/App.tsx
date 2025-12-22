import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Home } from './pages/Home';
import { supabase } from './lib/supabase';
import { useShopStore } from './store/useStore';
import { Shop } from './pages/Shop';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { Blog } from './pages/Blog';
import { Account } from './pages/Account';
import { Billing } from './pages/Billing';
import { Wishlist } from './pages/Wishlist';
import { PrivacyPolicy } from './pages/legal/PrivacyPolicy';
import { TermsConditions } from './pages/legal/TermsConditions';
import { Sitemap } from './pages/Sitemap';
import { SupabaseStatus } from './components/ui/SupabaseStatus';
import { AuthModal } from './components/auth/AuthModal';
import { CartDrawer } from './components/layout/CartDrawer';
import { Footer } from './components/layout/Footer';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Services } from './pages/Services';

// Skeleton for loading states
const PageLoader = () => (
    <div className="flex items-center justify-center h-screen bg-white dark:bg-slate-900">
        <div className="w-8 h-8 border-4 border-primary-DEFAULT border-t-transparent rounded-full animate-spin" />
    </div>
);

function App() {
    const { login, logout } = useShopStore();

    React.useEffect(() => {
        // Helper to map session to user profile
        const syncUser = async (session: any) => {
            if (session?.user) {
                // In a real app, we'd fetch the profile from the 'profiles' table here
                // For now, we'll derive it from the session metadata
                const userProfile = {
                    id: session.user.id,
                    email: session.user.email || '',
                    full_name: session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'User',
                    created_at: session.user.created_at,
                    photo_url: session.user.user_metadata?.avatar_url,
                    privacy_policy_accepted: session.user.user_metadata?.privacy_policy_accepted,
                    privacy_policy_accepted_at: session.user.user_metadata?.privacy_policy_accepted_at
                };
                login(userProfile);
            }
        };

        // Build-in session check
        supabase.auth.getSession().then(({ data: { session } }) => {
            syncUser(session);
        });

        // Listen for changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            if (session?.user) {
                syncUser(session);
            } else {
                logout();
            }
        });

        return () => subscription.unsubscribe();
    }, [login, logout]);

    return (
        <Router>
            <div className="min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-sans selection:bg-secondary-light selection:text-secondary-dark transition-colors duration-300">
                <Navbar />
                <Suspense fallback={<PageLoader />}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/shop" element={<Shop />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/checkout" element={<Checkout />} />
                        <Route path="/blog" element={<Blog />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/services" element={<Services />} />
                        <Route path="/contact" element={<Contact />} />

                        {/* Auth Routes */}
                        <Route path="/account" element={<Account />} />
                        <Route path="/billing" element={<Billing />} />
                        <Route path="/wishlist" element={<Wishlist />} />
                        <Route path="/wishlist" element={<Wishlist />} />
                        <Route path="/settings/payments" element={<Billing />} />

                        {/* Legal */}
                        <Route path="/legal/privacy-policy" element={<PrivacyPolicy />} />
                        <Route path="/legal/terms-conditions" element={<TermsConditions />} />
                        <Route path="/sitemap" element={<Sitemap />} />

                        {/* Legacy Redirects or Direct Links could trigger modal, but for now we just redirect home or show modal logic later if needed */}
                        <Route path="/login" element={<Navigate to="/" replace />} />
                        <Route path="/signup" element={<Navigate to="/" replace />} />

                        {/* Fallback */}
                        <Route path="*" element={<Home />} />
                    </Routes>
                </Suspense>
                <Footer />
                <SupabaseStatus />
                <AuthModal />
                <CartDrawer />
            </div>
        </Router>
    );
}

export default App;
