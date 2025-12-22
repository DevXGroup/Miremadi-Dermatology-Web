import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { User, Shield, Smartphone, Save, X, Loader2, AlertCircle } from 'lucide-react';
import { useShopStore } from '../store/useStore';
import { supabase } from '../lib/supabase';

export const Account = () => {
    const { user, login } = useShopStore(); // We use login to update the local user state
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    // Profile Form State
    const [formData, setFormData] = useState({
        full_name: user?.full_name || '',
        email: user?.email || '',
        phone_number: user?.phone_number || '',
        address: user?.address || { line1: '', city: '', postal_code: '', state: '', country: '' },
        agreed_to_terms: user?.agreed_to_terms || false,
        terms_agreed_at: user?.terms_agreed_at || '',
        skin_type: user?.skin_type || 'Normal',
        skin_goals: user?.skin_goals || '',
    });

    // Password State
    const [passwords, setPasswords] = useState({
        current: '',
        new: '',
        confirm: ''
    });

    const handleProfileUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;
        setLoading(true);
        setMessage(null);

        try {
            // Update Supabase Profile
            const { error } = await supabase
                .from('profiles')
                .upsert({
                    id: user.id,
                    full_name: formData.full_name,
                    phone_number: formData.phone_number,
                    address: formData.address,
                    agreed_to_terms: formData.agreed_to_terms,
                    terms_agreed_at: formData.terms_agreed_at,
                    skin_type: formData.skin_type,
                    skin_goals: formData.skin_goals,
                    updated_at: new Date().toISOString(),
                });

            if (error) throw error;

            // Update local state is tricky without re-fetching, 
            // but we can optimistic update or use the 'login' action to patch
            login({ ...user, ...formData } as any);

            setMessage({ type: 'success', text: 'Profile updated successfully.' });
        } catch (err: any) {
            setMessage({ type: 'error', text: err.message });
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        if (passwords.new !== passwords.confirm) {
            setMessage({ type: 'error', text: 'New passwords do not match.' });
            setLoading(false);
            return;
        }

        try {
            const { error } = await supabase.auth.updateUser({
                password: passwords.new
            });

            if (error) throw error;
            setMessage({ type: 'success', text: 'Password updated successfully.' });
            setPasswords({ current: '', new: '', confirm: '' });
        } catch (err: any) {
            setMessage({ type: 'error', text: err.message });
        } finally {
            setLoading(false);
        }
    };

    if (!user) return <div className="pt-24 text-center">Please log in to view account settings.</div>;

    return (
        <div className="pt-24 min-h-screen bg-slate-50 dark:bg-slate-950 pb-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="mb-8">
                    <h1 className="text-3xl font-display font-medium text-slate-900 dark:text-white">Account Settings</h1>
                    <p className="text-slate-500 dark:text-slate-400">Manage your profile, security, and preferences.</p>
                </div>

                {message && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`mb-6 p-4 rounded-xl flex items-center gap-3 ${message.type === 'success'
                            ? 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300'
                            : 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-300'
                            }`}
                    >
                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                        {message.text}
                    </motion.div>
                )}

                <div className="grid gap-8">
                    {/* Profile Section */}
                    <section className="bg-white dark:bg-slate-900 rounded-2xl p-6 md:p-8 shadow-sm border border-slate-100 dark:border-slate-800">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-secondary-DEFAULT/10 rounded-lg text-secondary-DEFAULT">
                                <User className="w-5 h-5" />
                            </div>
                            <h2 className="text-xl font-medium text-slate-900 dark:text-white">Profile Details</h2>
                        </div>

                        <form onSubmit={handleProfileUpdate} className="space-y-6 max-w-2xl">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
                                    <input
                                        type="text"
                                        value={formData.full_name}
                                        onChange={e => setFormData({ ...formData, full_name: e.target.value })}
                                        className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-secondary-DEFAULT/20 focus:border-secondary-DEFAULT outline-none transition-all dark:text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email</label>
                                    <input
                                        type="email"
                                        disabled
                                        value={formData.email}
                                        className="w-full px-4 py-2 bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-500 cursor-not-allowed"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Phone Number</label>
                                    <input
                                        type="tel"
                                        value={formData.phone_number}
                                        onChange={e => setFormData({ ...formData, phone_number: e.target.value })}
                                        placeholder="+1 (555) 000-0000"
                                        className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-secondary-DEFAULT/20 focus:border-secondary-DEFAULT outline-none transition-all dark:text-white"
                                    />
                                </div>
                            </div>

                            {/* Address Section Inputs */}
                            <div className="border-t border-slate-100 dark:border-slate-800 pt-6">
                                <h3 className="text-sm font-medium text-slate-900 dark:text-white mb-4">Shipping Address</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-xs font-medium text-slate-500 mb-1">Street Address</label>
                                        <input
                                            type="text"
                                            value={formData.address?.line1 || ''}
                                            onChange={e => setFormData({ ...formData, address: { ...formData.address!, line1: e.target.value } })}
                                            className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg outline-none text-sm dark:text-white"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-medium text-slate-500 mb-1">City</label>
                                            <input
                                                type="text"
                                                value={formData.address?.city || ''}
                                                onChange={e => setFormData({ ...formData, address: { ...formData.address!, city: e.target.value } })}
                                                className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg outline-none text-sm dark:text-white"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-slate-500 mb-1">Postal Code</label>
                                            <input
                                                type="text"
                                                value={formData.address?.postal_code || ''}
                                                onChange={e => setFormData({ ...formData, address: { ...formData.address!, postal_code: e.target.value } })}
                                                className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg outline-none text-sm dark:text-white"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Legal Agreement */}
                            <div className="border-t border-slate-100 dark:border-slate-800 pt-6">
                                <h3 className="text-sm font-medium text-slate-900 dark:text-white mb-4">Legal Agreement</h3>
                                <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
                                    <label className="flex items-start gap-3 cursor-pointer group">
                                        <div className="relative flex items-center pt-1">
                                            <input
                                                type="checkbox"
                                                checked={formData.agreed_to_terms}
                                                // disabled={user?.agreed_to_terms} // Allow re-agreeing if terms changed, but generally keep editable.
                                                onChange={e => setFormData({
                                                    ...formData,
                                                    agreed_to_terms: e.target.checked,
                                                    terms_agreed_at: e.target.checked ? new Date().toISOString() : ''
                                                })}
                                                className="w-4 h-4 text-secondary-DEFAULT border-slate-300 rounded focus:ring-secondary-DEFAULT"
                                            />
                                        </div>
                                        <div className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                            I have read and agree to the <Link to="/legal/privacy-policy" target="_blank" className="text-secondary-DEFAULT hover:underline">Privacy Policy</Link> and <Link to="/legal/terms-conditions" target="_blank" className="text-secondary-DEFAULT hover:underline">Terms & Conditions</Link>, including the <strong>Final Sale Policy</strong> for cosmetic products.
                                        </div>
                                    </label>
                                    {user?.agreed_to_terms && (
                                        <p className="mt-2 text-xs text-green-600 dark:text-green-400 pl-7">
                                            ✓ Accepted on {new Date(user.terms_agreed_at!).toLocaleDateString()}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Skin Type</label>
                                    <select
                                        value={formData.skin_type}
                                        onChange={e => setFormData({ ...formData, skin_type: e.target.value as any })}
                                        className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-secondary-DEFAULT/20 focus:border-secondary-DEFAULT outline-none transition-all dark:text-white"
                                    >
                                        {['Normal', 'Dry', 'Oily', 'Combination', 'Sensitive'].map(t => (
                                            <option key={t} value={t}>{t}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Skin Goals</label>
                                <textarea
                                    value={formData.skin_goals}
                                    onChange={e => setFormData({ ...formData, skin_goals: e.target.value })}
                                    rows={3}
                                    className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-secondary-DEFAULT/20 focus:border-secondary-DEFAULT outline-none transition-all dark:text-white resize-none"
                                    placeholder="e.g. Reduce redness, improve texture..."
                                />
                            </div>

                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="px-6 py-2 bg-secondary-DEFAULT hover:bg-secondary-dark text-white rounded-lg font-medium transition-colors flex items-center gap-2 disabled:opacity-50"
                                >
                                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </section>

                    {/* Security Section */}
                    <section className="bg-white dark:bg-slate-900 rounded-2xl p-6 md:p-8 shadow-sm border border-slate-100 dark:border-slate-800">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-400">
                                <Shield className="w-5 h-5" />
                            </div>
                            <h2 className="text-xl font-medium text-slate-900 dark:text-white">Security</h2>
                        </div>

                        <form onSubmit={handlePasswordUpdate} className="max-w-xl space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">New Password</label>
                                <input
                                    type="password"
                                    value={passwords.new}
                                    onChange={e => setPasswords({ ...passwords, new: e.target.value })}
                                    className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-secondary-DEFAULT/20 focus:border-secondary-DEFAULT outline-none transition-all dark:text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Confirm New Password</label>
                                <input
                                    type="password"
                                    value={passwords.confirm}
                                    onChange={e => setPasswords({ ...passwords, confirm: e.target.value })}
                                    className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-secondary-DEFAULT/20 focus:border-secondary-DEFAULT outline-none transition-all dark:text-white"
                                />
                            </div>
                            <div className="pt-2">
                                <button
                                    type="submit"
                                    disabled={loading || !passwords.new}
                                    className="px-4 py-2 text-sm bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg font-medium transition-colors hover:bg-slate-800 dark:hover:bg-slate-200 disabled:opacity-50"
                                >
                                    Update Password
                                </button>
                            </div>
                        </form>
                    </section>

                    {/* Sessions Section */}
                    <section className="bg-white dark:bg-slate-900 rounded-2xl p-6 md:p-8 shadow-sm border border-slate-100 dark:border-slate-800">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-400">
                                <Smartphone className="w-5 h-5" />
                            </div>
                            <h2 className="text-xl font-medium text-slate-900 dark:text-white">Sessions</h2>
                        </div>
                        <p className="text-sm text-slate-500 mb-4">You are currently logged in on this device.</p>
                        <button className="text-sm text-red-600 hover:text-red-700 font-medium border border-red-200 bg-red-50 px-4 py-2 rounded-lg">
                            Log out of all devices
                        </button>
                    </section>
                </div>
            </div>
        </div>
    );
};
