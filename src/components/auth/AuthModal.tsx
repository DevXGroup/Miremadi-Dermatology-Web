import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User as UserIcon, Loader2, AlertCircle, ArrowLeft } from 'lucide-react';
import { useShopStore } from '../../store/useStore';
import { supabase } from '../../lib/supabase';

export const AuthModal = () => {
    const { isAuthModalOpen, closeAuthModal, login } = useShopStore();
    const [mode, setMode] = useState<'login' | 'signup' | 'terms' | 'privacy'>('login');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Form inputs
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [agreedToPrivacy, setAgreedToPrivacy] = useState(false);

    const resetForm = () => {
        setError(null);
        setEmail('');
        setPassword('');
        setFullName('');
        setAgreedToPrivacy(false);
    };

    const handleClose = () => {
        resetForm();
        setMode('login');
        closeAuthModal();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (mode === 'signup') {
                setError('Online registration is currently disabled. Please contact our office at (858) 456-1840 for assistance with your order or account.');
                setLoading(false);
                return;
            } else {
                const { error: signInError } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });

                if (signInError) throw signInError;
                handleClose();
            }
        } catch (err: any) {
            console.error('Auth Error:', err);
            if (err.status === 500 || err.message?.includes('Database error') || err.message?.includes('trigger')) {
                setError('A system error occurred. Our team has been notified. Please try again later.');
            } else {
                setError(err.message || 'An unexpected error occurred during authentication');
            }
        } finally {
            setLoading(false);
        }
    };

    const isLegalMode = mode === 'terms' || mode === 'privacy';

    return (
        <AnimatePresence>
            {isAuthModalOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="fixed inset-0 z-[60] bg-slate-900/60 backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-white dark:bg-slate-900 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden pointer-events-auto border border-slate-200 dark:border-slate-800 flex flex-col max-h-[85vh]"
                        >
                            {/* Header */}
                            <div className="relative px-6 pt-6 pb-2 text-center shrink-0">
                                {isLegalMode ? (
                                    <button
                                        onClick={() => setMode('signup')}
                                        className="absolute left-4 top-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                                    >
                                        <ArrowLeft className="w-5 h-5" />
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleClose}
                                        className="absolute right-4 top-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                )}

                                <h2 className="text-2xl font-display font-bold text-slate-900 dark:text-white">
                                    {mode === 'login' && 'Welcome Back'}
                                    {mode === 'signup' && 'Create Account'}
                                    {mode === 'terms' && 'Terms of Service'}
                                    {mode === 'privacy' && 'Privacy Policy'}
                                </h2>

                                {!isLegalMode && (
                                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                                        {mode === 'login'
                                            ? 'Access your curated skincare routine'
                                            : 'Join us for personalized dermatology care'}
                                    </p>
                                )}
                            </div>

                            {/* Tabs (only for login/signup) */}
                            {!isLegalMode && (
                                <div className="flex border-b border-slate-200 dark:border-slate-800 mt-4 shrink-0">
                                    <button
                                        onClick={() => { setMode('login'); resetForm(); }}
                                        className={`flex-1 py-3 text-sm font-medium transition-colors relative ${mode === 'login'
                                            ? 'text-primary'
                                            : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
                                            }`}
                                    >
                                        Log In
                                        {mode === 'login' && (
                                            <motion.div
                                                layoutId="activeTab"
                                                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                                            />
                                        )}
                                    </button>
                                    <button
                                        onClick={() => { setMode('signup'); resetForm(); }}
                                        className={`flex-1 py-3 text-sm font-medium transition-colors relative ${mode === 'signup'
                                            ? 'text-primary'
                                            : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
                                            }`}
                                    >
                                        Sign Up
                                        {mode === 'signup' && (
                                            <motion.div
                                                layoutId="activeTab"
                                                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                                            />
                                        )}
                                    </button>
                                </div>
                            )}

                            {/* Content Area */}
                            <div className="overflow-y-auto">
                                {!isLegalMode ? (
                                    <form onSubmit={handleSubmit} className="p-6 space-y-4">
                                        {error && (
                                            <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm rounded-lg flex items-center gap-2">
                                                <AlertCircle className="w-4 h-4 shrink-0" />
                                                {error}
                                            </div>
                                        )}

                                        {mode === 'signup' && (
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-medium text-slate-700 dark:text-slate-300 ml-1">
                                                    Full Name
                                                </label>
                                                <div className="relative">
                                                    <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                                    <input
                                                        type="text"
                                                        required
                                                        value={fullName}
                                                        onChange={(e) => setFullName(e.target.value)}
                                                        className="w-full pl-9 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                                        placeholder="John Doe"
                                                    />
                                                </div>
                                            </div>
                                        )}

                                        <div className="space-y-1.5">
                                            <label className="text-xs font-medium text-slate-700 dark:text-slate-300 ml-1">
                                                Email Address
                                            </label>
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                                <input
                                                    type="email"
                                                    required
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    className="w-full pl-9 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                                    placeholder="you@example.com"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-xs font-medium text-slate-700 dark:text-slate-300 ml-1">
                                                Password
                                            </label>
                                            <div className="relative">
                                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                                <input
                                                    type="password"
                                                    required
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    className="w-full pl-9 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                                    placeholder="••••••••"
                                                    minLength={12}
                                                />
                                            </div>
                                        </div>

                                        {mode === 'signup' && (
                                            <div className="flex items-start gap-2 pt-2">
                                                <div className="relative flex items-center h-5">
                                                    <input
                                                        id="privacy-policy"
                                                        type="checkbox"
                                                        checked={agreedToPrivacy}
                                                        onChange={(e) => setAgreedToPrivacy(e.target.checked)}
                                                        className="w-4 h-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900 dark:border-slate-600 dark:bg-slate-700 dark:focus:ring-slate-400 cursor-pointer"
                                                    />
                                                </div>
                                                <label htmlFor="privacy-policy" className="text-xs text-slate-500 dark:text-slate-400">
                                                    I agree to the <button type="button" onClick={() => setMode('privacy')} className="underline hover:text-slate-800 dark:hover:text-slate-200">Privacy Policy</button> and <button type="button" onClick={() => setMode('terms')} className="underline hover:text-slate-800 dark:hover:text-slate-200">Terms of Service</button>.
                                                </label>
                                            </div>
                                        )}

                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="w-full py-3 px-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-medium rounded-xl transition-all shadow-lg hover:bg-white dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white border border-slate-900 dark:border-white disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-6"
                                        >
                                            {loading ? (
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                            ) : (
                                                mode === 'login' ? 'Sign In' : 'Create Account'
                                            )}
                                        </button>

                                        {mode === 'login' && (
                                            <div className="text-center">
                                                <button type="button" className="text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-300 underline">
                                                    Forgot your password?
                                                </button>
                                            </div>
                                        )}
                                    </form>
                                ) : (
                                    <div className="p-6 space-y-6 text-sm text-slate-600 dark:text-slate-400">
                                        {mode === 'terms' ? (
                                            <>
                                                <div className="p-4 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-xl">
                                                    <h4 className="font-bold text-red-700 dark:text-red-400 mb-2">Final Sale Policy</h4>
                                                    <p className="text-red-700/80 dark:text-red-400/80 text-xs leading-relaxed">
                                                        Due to the hygienic nature and perishable quality of our cosmetic products, ALL ONLINE SALES ARE FINAL. Once opened or used, items cannot be returned.
                                                    </p>
                                                </div>
                                                <div className="space-y-4">
                                                    <div>
                                                        <h4 className="font-bold text-slate-900 dark:text-white mb-1">No Medical Advice</h4>
                                                        <p>The content on this site is for informational purposes only and is NOT a substitute for professional medical advice, diagnosis, or treatment.</p>
                                                    </div>
                                                    <div>
                                                        <h4 className="font-bold text-slate-900 dark:text-white mb-1">Product Results</h4>
                                                        <p>Skincare outcomes vary by individual. We do not guarantee specific results. Testimonials represent typical results but are not a warranty.</p>
                                                    </div>
                                                </div>
                                            </>
                                        ) : (
                                            // Privacy Mode
                                            <>
                                                <div className="space-y-4">
                                                    <div>
                                                        <h4 className="font-bold text-slate-900 dark:text-white mb-1">Non-Medical Platform</h4>
                                                        <p>We do NOT collect medical patient information on this website. This platform is strictly for retail purposes. No doctor-patient relationship is established here.</p>
                                                    </div>
                                                    <div>
                                                        <h4 className="font-bold text-slate-900 dark:text-white mb-1">Cosmetic Use Only</h4>
                                                        <p>All products sold are for cosmetic reasons only. We do NOT sell prescription medications online.</p>
                                                    </div>
                                                    <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
                                                        <h4 className="font-bold text-slate-900 dark:text-white mb-2">Consent & Release</h4>
                                                        <p className="text-xs leading-relaxed">
                                                            By purchasing, you release Miremadi Dermatology from liability regarding use of cosmetic products and understand that the office is not liable for dissatisfaction with cosmetic results.
                                                        </p>
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                        <div className="pt-4 text-center">
                                            <button
                                                onClick={() => setMode('signup')}
                                                className="text-secondary-DEFAULT font-medium hover:underline"
                                            >
                                                Back to Sign Up
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
};
