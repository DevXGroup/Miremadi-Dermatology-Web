import React from 'react';
import { CreditCard, Calendar, Shield, Plus, Trash2 } from 'lucide-react';
import { useShopStore } from '../store/useStore';

// Mock Data for UI demonstration
const MOCK_SUBSCRIPTION = {
    plan: "Dermatology Essentials Plan",
    status: "active", // or 'none'
    next_billing: "Jan 22, 2026",
    amount: 49.00
};

const MOCK_CARDS = [
    { id: 'pm_1', brand: 'Visa', last4: '4242', exp_month: 12, exp_year: 2025, is_default: true },
    { id: 'pm_2', brand: 'Mastercard', last4: '8899', exp_month: 8, exp_year: 2026, is_default: false },
];

export const Billing = () => {
    const { user } = useShopStore();

    if (!user) return <div className="pt-24 text-center">Please log in to view billing settings.</div>;

    return (
        <div className="pt-24 min-h-screen bg-slate-50 dark:bg-slate-950 pb-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="mb-8">
                    <h1 className="text-3xl font-display font-medium text-slate-900 dark:text-white">Payment & Billing</h1>
                    <p className="text-slate-500 dark:text-slate-400">Manage your subscription, payment methods, and billing details.</p>
                </div>

                <div className="grid gap-8">

                    {/* Subscription Overview */}
                    <section className="bg-white dark:bg-slate-900 rounded-2xl p-6 md:p-8 shadow-sm border border-slate-100 dark:border-slate-800">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-secondary-DEFAULT/10 rounded-lg text-secondary-DEFAULT">
                                    <Calendar className="w-5 h-5" />
                                </div>
                                <h2 className="text-xl font-medium text-slate-900 dark:text-white">Subscription Status</h2>
                            </div>
                            <span className="px-3 py-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 text-xs font-semibold uppercase tracking-wide rounded-full">
                                {MOCK_SUBSCRIPTION.status}
                            </span>
                        </div>

                        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 border border-slate-100 dark:border-slate-700">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div>
                                    <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-1">{MOCK_SUBSCRIPTION.plan}</h3>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">
                                        Next billing on {MOCK_SUBSCRIPTION.next_billing} • ${MOCK_SUBSCRIPTION.amount}/mo
                                    </p>
                                </div>
                                <button className="px-5 py-2.5 text-sm bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-600 rounded-lg font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm">
                                    Manage Subscription
                                </button>
                            </div>
                        </div>
                    </section>

                    {/* Payment Methods */}
                    <section className="bg-white dark:bg-slate-900 rounded-2xl p-6 md:p-8 shadow-sm border border-slate-100 dark:border-slate-800">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-400">
                                    <CreditCard className="w-5 h-5" />
                                </div>
                                <h2 className="text-xl font-medium text-slate-900 dark:text-white">Payment Methods</h2>
                            </div>
                            <button className="flex items-center gap-2 text-sm text-secondary-DEFAULT font-medium hover:text-secondary-dark transition-colors">
                                <Plus className="w-4 h-4" /> Add Method
                            </button>
                        </div>

                        <div className="space-y-4">
                            {MOCK_CARDS.map(card => (
                                <div key={card.id} className="flex items-center justify-between p-4 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-slate-300 dark:hover:border-slate-600 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-8 bg-slate-100 dark:bg-slate-800 rounded flex items-center justify-center text-xs font-bold text-slate-500 uppercase">
                                            {card.brand}
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-slate-900 dark:text-white">
                                                •••• •••• •••• {card.last4}
                                            </p>
                                            <p className="text-xs text-slate-500">
                                                Expires {card.exp_month}/{card.exp_year}
                                                {card.is_default && <span className="ml-2 text-secondary-DEFAULT font-medium">(Default)</span>}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {!card.is_default && (
                                            <button className="text-xs text-slate-500 hover:text-slate-900 dark:hover:text-white px-3 py-1.5">
                                                Set Default
                                            </button>
                                        )}
                                        <button className="p-2 text-slate-400 hover:text-red-500 transition-colors">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Billing Details */}
                    <section className="bg-white dark:bg-slate-900 rounded-2xl p-6 md:p-8 shadow-sm border border-slate-100 dark:border-slate-800">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-400">
                                <Shield className="w-5 h-5" />
                            </div>
                            <h2 className="text-xl font-medium text-slate-900 dark:text-white">Billing Address</h2>
                        </div>

                        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Billing Name</label>
                                <input type="text" defaultValue={user.full_name} className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg dark:text-white" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Address Line 1</label>
                                <input type="text" className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg dark:text-white" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Address Line 2</label>
                                <input type="text" className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg dark:text-white" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">City</label>
                                <input type="text" className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg dark:text-white" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Postal Code</label>
                                <input type="text" className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg dark:text-white" />
                            </div>
                            <div className="md:col-span-2 flex justify-end mt-2">
                                <button type="button" className="px-6 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg font-medium">
                                    Save Billing Details
                                </button>
                            </div>
                        </form>
                    </section>
                </div>
            </div>
        </div>
    );
};
