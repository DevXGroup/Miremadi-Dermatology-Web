import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useShopStore } from '../store/useStore';
import { formatPrice } from '../lib/utils'; // You might need to make sure this is exported/moved to utils properly

export const Cart = () => {
    const { cart, removeFromCart, updateQuantity } = useShopStore();

    const subtotal = cart.reduce((acc, item) => acc + (item.price_cents / 100) * item.quantity, 0);
    const shipping = subtotal > 100 ? 0 : 15;
    const total = subtotal + shipping;

    if (cart.length === 0) {
        return (
            <div className="min-h-screen pt-24 flex flex-col items-center justify-center text-center px-4">
                <h2 className="text-2xl font-display font-medium mb-4">Your cart is empty</h2>
                <p className="text-slate-500 mb-8">Looks like you haven't added any treatments yet.</p>
                <Link to="/shop" className="px-6 py-3 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-full hover:bg-slate-800 dark:hover:bg-white transition-all shadow-lg shadow-slate-900/10 hover:scale-[1.02] active:scale-[0.98]">Explore Shop</Link>
            </div>
        );
    }

    return (
        <div className="pt-24 min-h-screen bg-slate-50 dark:bg-slate-950">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h1 className="text-3xl font-display font-medium mb-8">Shopping Cart ({cart.length})</h1>

                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-6">
                        <AnimatePresence>
                            {cart.map((item) => (
                                <motion.div
                                    key={item.id}
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm flex gap-6 items-center"
                                >
                                    <div className="w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center">
                                        {item.image_url ? (
                                            <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <ShoppingBag className="w-10 h-10 text-slate-400" />
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-medium text-lg dark:text-white">{item.name}</h3>
                                                <p className="text-sm text-slate-500">{item.category}</p>
                                            </div>
                                            <p className="font-medium text-lg dark:text-white">{formatPrice(item.price_cents / 100)}</p>
                                        </div>

                                        <div className="flex items-center justify-between mt-4">
                                            <div className="flex items-center gap-3 bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="p-1 hover:bg-white dark:hover:bg-slate-700 rounded-md transition-colors"
                                                >
                                                    <Minus className="w-4 h-4" />
                                                </button>
                                                <span className="text-sm w-4 text-center dark:text-white">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="p-1 hover:bg-white dark:hover:bg-slate-700 rounded-md transition-colors"
                                                >
                                                    <Plus className="w-4 h-4" />
                                                </button>
                                            </div>
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="text-slate-400 hover:text-red-500 transition-colors"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm sticky top-28">
                            <h3 className="text-xl font-medium mb-6">Order Summary</h3>
                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between text-slate-500">
                                    <span>Subtotal</span>
                                    <span>{formatPrice(subtotal)}</span>
                                </div>
                                <div className="flex justify-between text-slate-500">
                                    <span>Shipping</span>
                                    <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
                                </div>
                                <div className="border-t border-slate-100 dark:border-slate-800 pt-4 flex justify-between font-medium text-lg">
                                    <span>Total</span>
                                    <span>{formatPrice(total)}</span>
                                </div>
                            </div>

                            <Link to="/checkout" className="w-full py-4 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 dark:hover:bg-white hover:scale-[1.01] active:scale-[0.99] transition-all border border-transparent shadow-lg shadow-slate-900/10">
                                Proceed to Payment <ArrowRight className="w-5 h-5" />
                            </Link>
                            <div className="mt-4 flex gap-2 justify-center">
                                {/* Payment Icons */}
                                <div className="h-6 w-10 bg-slate-200 rounded" />
                                <div className="h-6 w-10 bg-slate-200 rounded" />
                                <div className="h-6 w-10 bg-slate-200 rounded" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
