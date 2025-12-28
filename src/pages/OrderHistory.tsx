import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Package, Image as ImageIcon, Loader2, Search, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

interface Order {
    id: string;
    total_amount: number;
    status: string;
    tracking_number?: string;
    tracking_url?: string;
    barcode_image_url?: string;
    created_at: string;
    shipped_at?: string;
    items?: any[];
}

export const OrderHistory = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const { data: { user } } = await supabase.auth.getUser();
                if (!user) {
                    setError('Please sign in to view your order history.');
                    setLoading(false);
                    return;
                }

                const { data, error: fetchError } = await supabase
                    .from('orders')
                    .select('*')
                    .eq('user_id', user.id)
                    .order('created_at', { ascending: false });

                if (fetchError) throw fetchError;
                setOrders(data || []);
            } catch (err: any) {
                console.error('Error fetching orders:', err);
                setError(err.message || 'Failed to load order history');
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const getStatusBadge = (status: string) => {
        const styles = {
            pending: 'bg-yellow-100/80 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
            processing: 'bg-blue-100/80 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
            paid: 'bg-indigo-100/80 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400',
            shipped: 'bg-green-100/80 text-green-800 dark:bg-green-900/30 dark:text-green-400',
            delivered: 'bg-purple-100/80 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
            cancelled: 'bg-red-100/80 text-red-800 dark:bg-red-900/30 dark:text-red-400'
        };
        const style = styles[status as keyof typeof styles] || styles.pending;
        return (
            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${style}`}>
                {status}
            </span>
        );
    };

    if (loading) {
        return (
            <div className="pt-32 min-h-screen flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="pt-32 pb-24 min-h-screen bg-slate-50 dark:bg-slate-950">
            <div className="max-w-4xl mx-auto px-4">
                <div className="flex items-center gap-4 mb-8">
                    <Link to="/" className="p-2 hover:bg-white dark:hover:bg-slate-800 rounded-full transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <h1 className="text-4xl font-display font-medium">Order <span className="italic font-light text-primary">History</span></h1>
                </div>

                {error ? (
                    <div className="bg-white dark:bg-slate-900 p-12 rounded-[2rem] text-center border border-slate-200 dark:border-slate-800 shadow-xl">
                        <div className="w-16 h-16 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Search className="w-8 h-8 text-red-600" />
                        </div>
                        <p className="text-slate-600 dark:text-slate-400 mb-8">{error}</p>
                        <Link to="/" className="px-8 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full font-medium hover:scale-105 transition-all">
                            Back to Home
                        </Link>
                    </div>
                ) : orders.length === 0 ? (
                    <div className="bg-white dark:bg-slate-900 p-12 rounded-[2rem] text-center border border-slate-200 dark:border-slate-800 shadow-xl">
                        <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Package className="w-8 h-8 text-slate-400" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">No orders found</h3>
                        <p className="text-slate-500 dark:text-slate-400 mb-8">You haven't placed any orders yet.</p>
                        <Link to="/services" className="px-8 py-3 bg-primary text-white rounded-full font-medium hover:scale-105 transition-all inline-block">
                            Explore Services
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {orders.map((order, index) => (
                            <motion.div
                                key={order.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-md transition-shadow"
                            >
                                <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
                                    <div>
                                        <div className="flex items-center gap-3 mb-1">
                                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Order ID</p>
                                            <span className="font-mono text-xs text-slate-500">{order.id.slice(0, 8)}</span>
                                        </div>
                                        <p className="text-2xl font-bold text-slate-900 dark:text-white">
                                            ${(order.total_amount / 100).toFixed(2)}
                                        </p>
                                        <p className="text-xs text-slate-500 mt-1">
                                            Placed on {new Date(order.created_at).toLocaleDateString(undefined, {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </p>
                                    </div>
                                    {getStatusBadge(order.status)}
                                </div>

                                {/* Tracking Section */}
                                {order.status === 'shipped' && order.tracking_number && (
                                    <div className="mt-8 p-6 bg-primary/5 dark:bg-primary/10 rounded-2xl border border-primary/10 flex flex-col md:flex-row gap-6 items-center">
                                        {order.barcode_image_url && (
                                            <div className="w-full md:w-32 h-20 bg-white dark:bg-slate-800 rounded-lg p-2 border border-slate-200 dark:border-slate-700">
                                                <img
                                                    src={supabase.storage.from('tracking-barcodes').getPublicUrl(order.barcode_image_url).data.publicUrl}
                                                    alt="Barcode"
                                                    className="w-full h-full object-contain"
                                                />
                                            </div>
                                        )}
                                        <div className="flex-1 text-center md:text-left">
                                            <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                                                <Package className="w-4 h-4 text-primary" />
                                                <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Tracking Info ({order.carrier})</span>
                                            </div>
                                            <p className="font-mono text-lg font-bold text-slate-900 dark:text-white mb-4 md:mb-0">
                                                {order.tracking_number}
                                            </p>
                                        </div>
                                        <a
                                            href={order.tracking_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold text-xs uppercase tracking-widest flex items-center gap-2 hover:scale-105 transition-all shadow-lg"
                                        >
                                            <ExternalLink className="w-4 h-4" />
                                            Track Order
                                        </a>
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
