import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User as UserIcon, Loader2, AlertCircle } from 'lucide-react';
import { useShopStore } from '../../store/useStore';
import { supabase } from '../../lib/supabase';

export const AuthModal = () => {
    const { isAuthModalOpen, closeAuthModal, login } = useShopStore();
    const [mode, setMode] = useState<'login' | 'signup'>('login');
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
        closeAuthModal();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (mode === 'signup') {
                if (!agreedToPrivacy) {
                    setError('You must agree to the Privacy Policy to create an account.');
                    setLoading(false);
                    return;
                }
                const { data, error: signUpError } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        data: {
                            full_name: fullName,
                            privacy_policy_accepted: true,
                            privacy_policy_accepted_at: new Date().toISOString(),
                        },
                    },
                });

                if (signUpError) throw signUpError;

                if (data.session) {
                    // Auto login if session is returned (email confirmation disabled or not required)
                    // Login state sync is handled by App.tsx subscription
                    handleClose();
                } else {
                    // Email confirmation likely required
                    setError('Please check your email to confirm your account.');
                }

            } else {
                const { error: signInError } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });

                if (signInError) throw signInError;
                handleClose();
            }
        } catch (err: any) {
            setError(err.message || 'An unexpected error occurred');
        } finally {
            setLoading(false);
        }
    };

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
                            className="bg-white dark:bg-slate-900 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden pointer-events-auto border border-slate-200 dark:border-slate-800"
                        >
                            {/* Header */}
                            <div className="relative px-6 pt-6 pb-2 text-center">
                                <button
                                    onClick={handleClose}
                                    className="absolute right-4 top-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                                <h2 className="text-2xl font-display font-bold text-slate-900 dark:text-white">
                                    {mode === 'login' ? 'Welcome Back' : 'Create Account'}
                                </h2>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                                    {mode === 'login'
                                        ? 'Access your curated skincare routine'
                                        : 'Join us for personalized dermatology care'}
                                </p>
                            </div>

                            {/* Tabs */}
                            <div className="flex border-b border-slate-200 dark:border-slate-800 mt-4">
                                <button
                                    onClick={() => { setMode('login'); resetForm(); }}
                                    className={`flex-1 py-3 text-sm font-medium transition-colors relative ${mode === 'login'
                                        ? 'text-primary-DEFAULT'
                                        : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
                                        }`}
                                >
                                    Log In
                                    {mode === 'login' && (
                                        <motion.div
                                            layoutId="activeTab"
                                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-DEFAULT"
                                        />
                                    )}
                                </button>
                                <button
                                    onClick={() => { setMode('signup'); resetForm(); }}
                                    className={`flex-1 py-3 text-sm font-medium transition-colors relative ${mode === 'signup'
                                        ? 'text-primary-DEFAULT'
                                        : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
                                        }`}
                                >
                                    Sign Up
                                    {mode === 'signup' && (
                                        <motion.div
                                            layoutId="activeTab"
                                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-DEFAULT"
                                        />
                                    )}
                                </button>
                            </div>

                            {/* Form */}
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
                                                className="w-full pl-9 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-primary-DEFAULT/20 focus:border-primary-DEFAULT outline-none transition-all"
                                                placeholder="Dr. Arjang Miremadi"
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
                                            className="w-full pl-9 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-primary-DEFAULT/20 focus:border-primary-DEFAULT outline-none transition-all"
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
                                            className="w-full pl-9 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-primary-DEFAULT/20 focus:border-primary-DEFAULT outline-none transition-all"
                                            placeholder="••••••••"
                                            minLength={6}
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
                                            I agree to the <a href="/privacy" target="_blank" className="underline hover:text-slate-800 dark:hover:text-slate-200">Privacy Policy</a> and <a href="/terms" target="_blank" className="underline hover:text-slate-800 dark:hover:text-slate-200">Terms of Service</a>.
                                        </label>
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-3 px-4 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 font-medium rounded-xl transition-all shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-6"
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
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
};
