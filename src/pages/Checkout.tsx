import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, CreditCard, ShoppingBag, ArrowRight } from 'lucide-react';
import { useShopStore } from '../store/useStore';
import { formatPrice } from '../lib/utils';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export const Checkout = () => {
    const { cart, user, openAuthModal } = useShopStore();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [recurringType, setRecurringType] = useState<'none' | 'weekly' | 'monthly'>('none');

    const subtotal = cart.reduce((acc, item) => acc + (item.price_cents / 100) * item.quantity, 0);
    const total = subtotal; // Add shipping logic if needed

    const handleCheckout = async () => {
        if (!user) {
            openAuthModal();
            return;
        }

        setLoading(true);
        try {
            // Convert cart items to format expected by backend (cents)
            const cartItems = cart.map(item => ({
                name: item.name,
                image_url: item.image_url,
                price_cents: item.price_cents,
                quantity: item.quantity
            }));

            const { data, error } = await supabase.functions.invoke('create-checkout-session', {
                body: { cartItems, recurringType }
            });

            if (error) throw error;
            if (data?.url) {
                window.location.href = data.url;
            } else {
                throw new Error('No checkout URL returned');
            }
        } catch (err: any) {
            console.error('Checkout error:', err);
            alert(`Checkout failed: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    if (cart.length === 0) {
        return (
            <div className="pt-32 pb-20 min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center">
                <ShoppingBag className="w-16 h-16 text-slate-300 mb-4" />
                <h2 className="text-2xl font-display text-slate-900 dark:text-white mb-4">Your cart is empty</h2>
                <button
                    onClick={() => navigate('/shop')}
                    className="px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full font-medium"
                >
                    Continue Shopping
                </button>
            </div>
        );
    }

    return (
        <div className="pt-24 min-h-screen bg-slate-50 dark:bg-slate-950">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h1 className="text-3xl md:text-4xl font-display font-medium text-slate-900 dark:text-white mb-8">Checkout</h1>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Left: Review & Options */}
                    <div className="space-y-8">

                        {/* Auth Check */}
                        {!user && (
                            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 p-6 rounded-2xl flex items-center justify-between">
                                <div>
                                    <h3 className="text-amber-800 dark:text-amber-200 font-medium">Have an account?</h3>
                                    <p className="text-sm text-amber-600 dark:text-amber-400">Log in to save your order to your history.</p>
                                </div>
                                <button
                                    onClick={openAuthModal}
                                    className="px-4 py-2 bg-amber-100 dark:bg-amber-800 text-amber-900 dark:text-white rounded-lg text-sm font-bold"
                                >
                                    Log In
                                </button>
                            </div>
                        )}

                        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
                            <h2 className="text-xl font-medium mb-6">Review Items</h2>
                            <div className="space-y-6">
                                {cart.map((item) => (
                                    <div key={item.id} className="flex gap-4">
                                        <div className="w-20 h-20 bg-slate-100 rounded-xl overflow-hidden shrink-0">
                                            <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-medium text-slate-900 dark:text-white">{item.name}</h3>
                                            <p className="text-sm text-slate-500">{item.category}</p>
                                            <div className="mt-2 flex items-center justify-between">
                                                <p className="text-sm text-slate-500">Qty: {item.quantity}</p>
                                                <p className="font-medium">{formatPrice(item.price_cents / 100 * item.quantity)}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Subscription Option */}
                        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
                            <h2 className="text-xl font-medium mb-6">Delivery Frequency</h2>
                            <div className="grid sm:grid-cols-3 gap-4">
                                <button
                                    onClick={() => setRecurringType('none')}
                                    className={`p-4 rounded-xl border text-left transition-all ${recurringType === 'none'
                                        ? 'border-secondary-DEFAULT bg-secondary-DEFAULT/5 ring-1 ring-secondary-DEFAULT'
                                        : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
                                        }`}
                                >
                                    <span className="block font-bold text-slate-900 dark:text-white">One-time</span>
                                    <span className="text-xs text-slate-500">Standard purchase</span>
                                </button>
                                <button
                                    onClick={() => setRecurringType('monthly')}
                                    className={`p-4 rounded-xl border text-left transition-all ${recurringType === 'monthly'
                                        ? 'border-secondary-DEFAULT bg-secondary-DEFAULT/5 ring-1 ring-secondary-DEFAULT'
                                        : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
                                        }`}
                                >
                                    <span className="block font-bold text-slate-900 dark:text-white">Monthly</span>
                                    <span className="text-xs text-secondary-DEFAULT font-medium">Save 10%</span>
                                </button>
                                <button
                                    onClick={() => setRecurringType('weekly')}
                                    className={`p-4 rounded-xl border text-left transition-all ${recurringType === 'weekly'
                                        ? 'border-secondary-DEFAULT bg-secondary-DEFAULT/5 ring-1 ring-secondary-DEFAULT'
                                        : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
                                        }`}
                                >
                                    <span className="block font-bold text-slate-900 dark:text-white">Weekly</span>
                                    <span className="text-xs text-secondary-DEFAULT font-medium">Save 15%</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right: Summary & Pay */}
                    <div className="h-fit space-y-6">
                        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
                            <h2 className="text-xl font-medium mb-6">Order Summary</h2>

                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between text-slate-500">
                                    <span>Subtotal</span>
                                    <span>{formatPrice(subtotal)}</span>
                                </div>
                                <div className="flex justify-between text-slate-500">
                                    <span>Shipping</span>
                                    <span className="text-green-600 font-medium">Free</span>
                                </div>
                                {recurringType !== 'none' && (
                                    <div className="flex justify-between text-secondary-DEFAULT">
                                        <span>Subscription Discount</span>
                                        <span>-{recurringType === 'monthly' ? '10%' : '15%'}</span>
                                    </div>
                                )}
                                <div className="border-t border-slate-100 dark:border-slate-800 pt-4 flex justify-between">
                                    <span className="text-lg font-bold text-slate-900 dark:text-white">Total</span>
                                    <span className="text-lg font-bold text-slate-900 dark:text-white">
                                        {formatPrice(total)}
                                        {recurringType !== 'none' && <span className="text-xs font-normal text-slate-500 block text-right">/{recurringType}</span>}
                                    </span>
                                </div>
                            </div>

                            <button
                                onClick={handleCheckout}
                                disabled={loading || !user}
                                className="w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    'Redirecting to Stripe...'
                                ) : (
                                    <>
                                        Proceed to Payment <ArrowRight className="w-5 h-5" />
                                    </>
                                )}
                            </button>

                            <div className="mt-6 flex items-start gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                                <Lock className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                                <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed uppercase tracking-wider">
                                    By proceeding, you agree to our <Link to="/legal/privacy-policy" target="_blank" className="hover:text-secondary-DEFAULT underline underline-offset-2">Privacy Policy</Link> & <Link to="/legal/terms-conditions" target="_blank" className="hover:text-secondary-DEFAULT underline underline-offset-2">Terms</Link>.<br />
                                    All cosmetic products are <strong className="text-slate-900 dark:text-white">Final Sale</strong>.
                                </p>
                            </div>

                            <div className="mt-8 flex items-center justify-center gap-2 text-slate-400 text-[10px] uppercase tracking-widest font-medium opacity-50">
                                <Lock className="w-3 h-3" />
                                <span>Payments secured by Stripe</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
