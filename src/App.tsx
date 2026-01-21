import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Home } from './pages/Home';
import { supabase } from './lib/supabase';
import { useShopStore } from './store/useStore';
import { Shop } from './pages/Shop';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { CheckoutSuccess } from './pages/CheckoutSuccess';
import { Blog } from './pages/Blog';
import { Account } from './pages/Account';
import { Wishlist } from './pages/Wishlist';
import { PrivacyPolicy } from './pages/legal/PrivacyPolicy';
import { TermsConditions } from './pages/legal/TermsConditions';
import { Sitemap } from './pages/Sitemap';
import { AuthModal } from './components/auth/AuthModal';
import { Footer } from './components/layout/Footer';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Services } from './pages/Services';
import { Toaster } from 'sonner';
import { AdminLayout } from './pages/admin/AdminLayout';
import { Dashboard } from './pages/admin/Dashboard';
import { OrderHistory } from './pages/OrderHistory';

// Skeleton for loading states
const PageLoader = () => (
    <div className="flex items-center justify-center h-screen bg-white dark:bg-slate-900">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
);

// Protected Route Component
const ProtectedRoute = ({ children, requireAdmin = false }: { children: React.ReactNode; requireAdmin?: boolean }) => {
    const { user, isInitialized } = useShopStore();

    // While we are still determining the auth state, don't redirect
    if (!isInitialized) {
        return <PageLoader />;
    }

    if (!user) {
        return <Navigate to="/" replace />;
    }

    if (requireAdmin && !user.is_admin) {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
};

function App() {
    const { user, login, logout, setInitialized } = useShopStore();

    React.useEffect(() => {
        // Helper to map session to user profile
        const syncUser = async (session: any) => {
            if (session?.user) {
                // Fetch full profile from DB
                const { data: profile } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', session.user.id)
                    .single();

                const userProfile = {
                    id: session.user.id,
                    email: session.user.email || '',
                    full_name: profile?.full_name || session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'User',
                    created_at: session.user.created_at,
                    photo_url: profile?.photo_url || session.user.user_metadata?.avatar_url,
                    phone_number: profile?.phone_number,
                    address: profile?.address,
                    privacy_policy_accepted: session.user.user_metadata?.privacy_policy_accepted,
                    privacy_policy_accepted_at: session.user.user_metadata?.privacy_policy_accepted_at,
                    is_admin: profile?.is_admin
                };
                login(userProfile);
            }
            setInitialized(true);
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
                setInitialized(true);
            }
        });

        return () => subscription.unsubscribe();
    }, [login, logout]);

    return (
        <Router>
            <div className="min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-sans transition-colors duration-300">
                <Navbar />
                <Suspense fallback={<PageLoader />}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/shop" element={<Shop />} />
                        <Route path="/cart" element={<Navigate to="/" replace />} />
                        <Route path="/checkout" element={<Navigate to="/" replace />} />
                        <Route path="/checkout/success" element={<Navigate to="/" replace />} />
                        <Route path="/blog" element={<Blog />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/services" element={<Services />} />
                        <Route path="/contact" element={<Contact />} />

                        {/* Auth Routes */}
                        <Route path="/account" element={<ProtectedRoute><Account /></ProtectedRoute>} />
                        <Route path="/orders" element={<ProtectedRoute><OrderHistory /></ProtectedRoute>} />
                        <Route path="/wishlist" element={<ProtectedRoute><Wishlist /></ProtectedRoute>} />

                        {/* Admin Routes */}
                        <Route path="/admin" element={<ProtectedRoute requireAdmin><AdminLayout /></ProtectedRoute>}>
                            <Route index element={<Dashboard />} />
                            <Route path="dashboard" element={<Dashboard />} />
                        </Route>

                        {/* Legal */}
                        <Route path="/legal/privacy-policy" element={<PrivacyPolicy />} />
                        <Route path="/legal/terms-conditions" element={<TermsConditions />} />
                        <Route path="/sitemap" element={<Sitemap />} />

                        {/* Legacy Redirects */}
                        <Route path="/login" element={<Navigate to="/" replace />} />
                        <Route path="/signup" element={<Navigate to="/" replace />} />

                        {/* Fallback */}
                        <Route path="*" element={<Home />} />
                    </Routes>
                </Suspense>
                <Footer />
                <AuthModal />
                {/* CartDrawer removed for prod */}
                <Toaster position="top-center" richColors duration={3000} />
            </div>
        </Router>
    );
}

export default App;
