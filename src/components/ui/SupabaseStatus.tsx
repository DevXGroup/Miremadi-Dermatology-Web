import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Database, CheckCircle, XCircle, Loader2 } from 'lucide-react';

export const SupabaseStatus = () => {
    const [status, setStatus] = useState<'loading' | 'connected' | 'error'>('loading');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const checkConnection = async () => {
            try {
                // Test fetch from products table
                const { data, error } = await supabase.from('products').select('id').limit(1);

                if (error) {
                    setStatus('error');
                    setMessage(error.message);
                } else {
                    setStatus('connected');
                    setMessage('Successfully connected to Supabase');
                }
            } catch (err: any) {
                setStatus('error');
                setMessage(err.message || 'Unknown error');
            }
        };

        checkConnection();
    }, []);

    return (
        <div className="fixed bottom-4 right-4 z-[9999]">
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full border shadow-lg backdrop-blur-md transition-all ${status === 'loading' ? 'bg-slate-100/80 border-slate-200 text-slate-600' :
                status === 'connected' ? 'bg-green-50/80 border-green-200 text-green-600' :
                    'bg-red-50/80 border-red-200 text-red-600'
                }`}>
                {status === 'loading' && <Loader2 className="w-4 h-4 animate-spin" />}
                {status === 'connected' && <CheckCircle className="w-4 h-4" />}
                {status === 'error' && <XCircle className="w-4 h-4" />}
                <span className="text-xs font-semibold uppercase tracking-wider">
                    Supabase: {status}
                </span>

                {status === 'error' && (
                    <div className="absolute bottom-full right-0 mb-2 w-72 p-4 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-red-100 dark:border-red-900/30 text-xs leading-relaxed text-red-600 dark:text-red-400">
                        <div className="font-bold mb-1 flex items-center gap-2">
                            <XCircle className="w-3 h-3" /> Connection Failed
                        </div>
                        <p className="opacity-90">
                            {message.includes('401') || message.includes('JWT')
                                ? "Invalid API Key. You are using a Stripe key (starts with 'sb_') instead of a Supabase key (starts with 'eyJ')."
                                : message.includes('404')
                                    ? "Table not found. Make sure you ran the SQL schema in the Supabase editor."
                                    : message}
                        </p>
                        <div className="mt-2 pt-2 border-t border-red-50 dark:border-red-900/20 text-[10px] italic">
                            Check .env.local for VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
