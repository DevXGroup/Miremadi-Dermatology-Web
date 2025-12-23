import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Trash2, Plus, Minus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useShopStore } from '../../store/useStore';

export const CartDrawer = () => {
    const { isCartOpen, closeCart, cart, updateQuantity, removeFromCart } = useShopStore();

    const subtotal = cart.reduce((sum, item) => sum + ((item.price_cents / 100) * item.quantity), 0);

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeCart}
                        className="fixed inset-0 z-[60] bg-slate-900/60 backdrop-blur-sm"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="fixed inset-y-0 right-0 z-[70] w-full max-w-md bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800">
                            <h2 className="text-xl font-display font-medium text-slate-900 dark:text-white flex items-center gap-2">
                                <ShoppingBag className="w-5 h-5" />
                                Your Cart ({cart.length})
                            </h2>
                            <button
                                onClick={closeCart}
                                className="p-2 text-slate-400 hover:text-primary dark:hover:text-primary transition-all bg-secondary-DEFAULT/5 dark:bg-slate-800 rounded-full cursor-pointer"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Items */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            {cart.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                                    <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-400">
                                        <ShoppingBag className="w-8 h-8" />
                                    </div>
                                    <div>
                                        <p className="text-lg font-medium text-slate-900 dark:text-white">Your cart is empty</p>
                                        <p className="text-slate-500 text-sm mt-1">Looks like you haven't added anything yet.</p>
                                    </div>
                                    <button
                                        onClick={closeCart}
                                        className="mt-4 px-6 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-medium hover:bg-primary dark:hover:bg-primary dark:hover:text-white transition-all cursor-pointer"
                                    >
                                        Start Shopping
                                    </button>
                                </div>
                            ) : (
                                cart.map(item => (
                                    <motion.div
                                        layout
                                        key={item.id}
                                        className="flex gap-4"
                                    >
                                        <div className="w-20 h-24 bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden shrink-0">
                                            <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1 flex flex-col justify-between py-1">
                                            <div>
                                                <h3 className="text-sm font-medium text-slate-900 dark:text-white line-clamp-2">
                                                    {item.name}
                                                </h3>
                                                <p className="text-xs text-slate-500 mt-1 uppercase tracking-wider">{item.category}</p>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="font-medium dark:text-white">${((item.price_cents / 100) * item.quantity).toFixed(2)}</span>
                                                <div className="flex items-center gap-3">
                                                    <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                            className="p-1 hover:text-red-500 transition-colors"
                                                        >
                                                            <Minus className="w-3 h-3" />
                                                        </button>
                                                        <span className="text-xs font-medium w-4 text-center dark:text-white">{item.quantity}</span>
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                            className="p-1 hover:text-green-500 transition-colors"
                                                        >
                                                            <Plus className="w-3 h-3" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </div>

                        {/* Footer */}
                        {cart.length > 0 && (
                            <div className="p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                                <div className="space-y-3 mb-6">
                                    <div className="flex justify-between text-slate-500 dark:text-slate-400">
                                        <span>Subtotal</span>
                                        <span>${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-slate-500 dark:text-slate-400 text-sm">
                                        <span>Shipping</span>
                                        <span>Calculated at checkout</span>
                                    </div>
                                    <div className="flex justify-between text-lg font-medium text-slate-900 dark:text-white pt-3 border-t border-slate-200 dark:border-slate-700">
                                        <span>Total</span>
                                        <span>${subtotal.toFixed(2)}</span>
                                    </div>
                                </div>
                                <Link
                                    to="/checkout"
                                    onClick={closeCart}
                                    className="block w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold text-center shadow-lg shadow-slate-900/10 dark:shadow-none hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-all cursor-pointer"
                                >
                                    Proceed to Payment
                                </Link>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
