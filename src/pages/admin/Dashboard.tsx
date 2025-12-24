import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useShopStore } from '../../store/useStore';
import { Search, Package, CheckCircle, Clock, ExternalLink, Loader2, DollarSign } from 'lucide-react';
import { FulfillOrderModal } from '../../components/admin/FulfillOrderModal';
import { toast } from 'sonner';

export const Dashboard = () => {
    const [stats, setStats] = useState({ pending: 0, completedToday: 0 });
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'pending' | 'completed'>('pending');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedOrder, setSelectedOrder] = useState<any>(null);

    // Fetch Stats
    const fetchStats = async () => {
        try {
            const { data, error } = await supabase.functions.invoke('admin-api?action=stats');
            if (!error && data) {
                setStats(data);
            }
        } catch (e) {
            console.error(e);
        }
    };

    // Fetch Orders
    const fetchOrders = async () => {
        setLoading(true);
        try {
            let endpoint = `admin-api?action=list&status=${activeTab}`;
            if (searchQuery) {
                endpoint = `admin-api?action=search&query=${searchQuery}`;
            }

            const { data, error } = await supabase.functions.invoke(endpoint);

            if (error) throw error;
            if (data?.data) {
                setOrders(data.data);
            }
        } catch (err: any) {
            console.error(err);
            toast.error('Failed to load orders');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStats();
    }, []);

    useEffect(() => {
        const timeout = setTimeout(() => {
            fetchOrders();
        }, 300); // Debounce search
        return () => clearTimeout(timeout);
    }, [activeTab, searchQuery]);

    const handleFulfillSuccess = () => {
        setSelectedOrder(null);
        fetchOrders();
        fetchStats();
    };

    return (
        <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-lg">
                            <Clock className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Pending Orders</p>
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{stats.pending}</h3>
                        </div>
                    </div>
                </div>
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg">
                            <CheckCircle className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Completed Today</p>
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{stats.completedToday}</h3>
                        </div>
                    </div>
                </div>
                {/* Placeholder for Revenue */}
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg">
                            <DollarSign className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Revenue (Today)</p>
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">-</h3>
                        </div>
                    </div>
                </div>
            </div>

            {/* Controls */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
                <div className="flex p-1 bg-slate-100 dark:bg-slate-900 rounded-lg w-full sm:w-auto">
                    <button
                        onClick={() => setActiveTab('pending')}
                        className={`flex-1 sm:flex-none px-4 py-2 text-sm font-medium rounded-md transition-all ${activeTab === 'pending'
                                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm'
                                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                            }`}
                    >
                        Pending Orders
                    </button>
                    <button
                        onClick={() => setActiveTab('completed')}
                        className={`flex-1 sm:flex-none px-4 py-2 text-sm font-medium rounded-md transition-all ${activeTab === 'completed'
                                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm'
                                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                            }`}
                    >
                        Completed
                    </button>
                </div>

                <div className="relative w-full sm:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search orders..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                    />
                </div>
            </div>

            {/* Order List */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 font-medium">
                            <tr>
                                <th className="px-6 py-4">Order ID</th>
                                <th className="px-6 py-4">Customer</th>
                                <th className="px-6 py-4">Total</th>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {loading ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-8 text-center text-slate-500">
                                        <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2" />
                                        Loading orders...
                                    </td>
                                </tr>
                            ) : orders.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-8 text-center text-slate-500">
                                        No orders found.
                                    </td>
                                </tr>
                            ) : (
                                orders.map((order) => (
                                    <tr key={order.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                        <td className="px-6 py-4 font-mono text-slate-600 dark:text-slate-400">
                                            {order.purchase_id || order.id.slice(0, 8)}
                                        </td>
                                        <td className="px-6 py-4 text-slate-900 dark:text-white font-medium">
                                            {order.profiles?.full_name || 'Guest/Unknown'}
                                            <div className="text-xs text-slate-500 font-normal">{order.profiles?.email}</div>
                                        </td>
                                        <td className="px-6 py-4 text-slate-900 dark:text-white">
                                            ${(order.total_amount_cents / 100).toFixed(2)}
                                        </td>
                                        <td className="px-6 py-4 text-slate-500 dark:text-slate-400">
                                            {new Date(order.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${order.status === 'completed'
                                                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                                                    : 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400'
                                                }`}>
                                                {order.status || 'pending'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            {order.status !== 'completed' && (
                                                <button
                                                    onClick={() => setSelectedOrder(order)}
                                                    className="text-primary hover:text-primary-dark font-medium text-sm"
                                                >
                                                    Fulfill
                                                </button>
                                            )}
                                            {order.status === 'completed' && (
                                                <div className="flex flex-col items-end gap-1">
                                                    {order.tracking_number && (
                                                        <span className="text-xs text-slate-500">
                                                            Tracking: {order.tracking_number}
                                                        </span>
                                                    )}
                                                    {order.tracking_image_url && (
                                                        <a
                                                            href={order.tracking_image_url}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            className="text-xs text-blue-500 hover:underline flex items-center gap-1"
                                                        >
                                                            View Label <ExternalLink className="w-3 h-3" />
                                                        </a>
                                                    )}
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {selectedOrder && (
                <FulfillOrderModal
                    order={selectedOrder}
                    onClose={() => setSelectedOrder(null)}
                    onSuccess={handleFulfillSuccess}
                />
            )}
        </div>
    );
};
