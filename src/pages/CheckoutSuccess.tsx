import React, { useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { useShopStore } from '../store/useStore';
import { motion } from 'framer-motion';

export const CheckoutSuccess = () => {
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get('session_id');
    const { clearCart } = useShopStore();

    useEffect(() => {
        if (sessionId) {
            clearCart();
        }
    }, [sessionId, clearCart]);

    return (
        <div className="pt-32 pb-20 min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-md w-full mx-4 bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-xl text-center border border-slate-100 dark:border-slate-800"
            >
                <div className="w-20 h-20 bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10" />
                </div>

                <h1 className="text-3xl font-display font-medium text-slate-900 dark:text-white mb-4">
                    Order Confirmed!
                </h1>

                <p className="text-slate-500 dark:text-slate-400 mb-8 leading-relaxed">
                    Thank you for your purchase. We have received your order and are preparing it for shipment. You will receive a confirmation email shortly.
                </p>

                <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-4 mb-8 text-sm text-slate-500 truncate">
                    Order Ref: <span className="font-mono text-slate-700 dark:text-slate-300">{sessionId?.slice(-8) || '####'}</span>
                </div>

                <div className="space-y-3">
                    <Link
                        to="/account"
                        className="block w-full py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold hover:opacity-90 transition-opacity"
                    >
                        View My Orders
                    </Link>
                    <Link
                        to="/"
                        className="block w-full py-3 text-slate-600 dark:text-slate-300 font-medium hover:text-slate-900 dark:hover:text-white transition-colors"
                    >
                        Return Home
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};
