import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, CreditCard } from 'lucide-react';
import { useShopStore } from '../store/useStore';
import { formatPrice } from '../lib/utils';
import { useNavigate } from 'react-router-dom';

export const Checkout = () => {
    const { cart, clearCart } = useShopStore();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const total = subtotal > 100 ? subtotal : subtotal + 15;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Mock API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        clearCart();
        setLoading(false);
        // Redirect to success
        navigate('/');
        alert('Order Placed Successfully! (Mock)');
    };

    return (
        <div className="pt-24 min-h-screen bg-slate-50 dark:bg-slate-950">
            <div className="max-w-4xl mx-auto px-4 py-8">
                <div className="grid md:grid-cols-2 gap-12">
                    {/* Form */}
                    <div>
                        <h2 className="text-2xl font-display font-medium mb-6">Secure Checkout</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-4">
                                <h3 className="text-sm font-medium uppercase tracking-wide text-slate-500">Contact</h3>
                                <input type="email" placeholder="Email Address" required className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg focus:ring-2 focus:ring-secondary-DEFAULT outline-none" />
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-sm font-medium uppercase tracking-wide text-slate-500">Shipping Address</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <input type="text" placeholder="First Name" required className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg outline-none" />
                                    <input type="text" placeholder="Last Name" required className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg outline-none" />
                                </div>
                                <input type="text" placeholder="Address" required className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg outline-none" />
                                <div className="grid grid-cols-2 gap-4">
                                    <input type="text" placeholder="City" required className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg outline-none" />
                                    <input type="text" placeholder="Postal Code" required className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg outline-none" />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-sm font-medium uppercase tracking-wide text-slate-500">Payment</h3>
                                <div className="p-4 border border-slate-200 dark:border-slate-800 rounded-lg bg-white dark:bg-slate-900 flex items-center gap-3">
                                    <CreditCard className="w-5 h-5 text-slate-400" />
                                    <span className="text-slate-500">Card details (Stripe Element Placeholder)</span>
                                </div>
                            </div>

                            <button
                                disabled={loading}
                                type="submit"
                                className="w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
                            >
                                {loading ? 'Processing...' : `Pay ${formatPrice(total)}`} <Lock className="w-4 h-4" />
                            </button>
                        </form>
                    </div>

                    {/* Summary - Only visible on desktop or large screens usually, but here stacked */}
                    <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl h-fit">
                        <h3 className="text-lg font-medium mb-4">Order Summary</h3>
                        <div className="space-y-4">
                            {cart.map(item => (
                                <div key={item.id} className="flex gap-4">
                                    <img src={item.image} className="w-16 h-16 rounded-lg object-cover bg-slate-100" />
                                    <div className="flex-1">
                                        <p className="font-medium">{item.name}</p>
                                        <p className="text-sm text-slate-500">Qty: {item.quantity}</p>
                                    </div>
                                    <p className="font-medium">{formatPrice(item.price * item.quantity)}</p>
                                </div>
                            ))}
                            <div className="border-t border-slate-100 dark:border-slate-800 pt-4 flex justify-between font-bold">
                                <span>Total</span>
                                <span>{formatPrice(total)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
