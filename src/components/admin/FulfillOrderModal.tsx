import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { X, Upload, Loader2, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

interface FulfillOrderModalProps {
    order: any;
    onClose: () => void;
    onSuccess: () => void;
}

export const FulfillOrderModal = ({ order, onClose, onSuccess }: FulfillOrderModalProps) => {
    const [trackingNumber, setTrackingNumber] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!trackingNumber || !file) {
            toast.error('Please provide both tracking number and image');
            return;
        }

        setLoading(true);

        try {
            // We use the Edge Function for the complete atomic operation 
            // OR we upload from client if RLS allows. 
            // Project requirements said: "Backend endpoint... Steps: Upload the image... Update orders"
            // So we send file to Edge Function via FormData.

            const formData = new FormData();
            formData.append('orderId', order.id);
            formData.append('trackingNumber', trackingNumber);
            formData.append('image', file);

            // Note: invoke expects 'body' to be FormData if you want multipart.
            // But supabase-js might default to JSON. explicitly set body.
            const { data, error } = await supabase.functions.invoke('admin-api?action=complete', {
                body: formData,
                // Supabase-js automatically handles content-type for FormData?
                // Usually yes, let's try.
            });

            if (error) throw error;
            if (data?.error) throw new Error(data.error);

            toast.success('Order fulfilled successfully');
            onSuccess();
        } catch (err: any) {
            console.error(err);
            toast.error('Failed to fulfill order: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white dark:bg-slate-800 rounded-xl max-w-md w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-700">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                        Fulfill Order
                    </h3>
                    <button onClick={onClose} className="text-slate-500 hover:text-slate-700 dark:text-slate-400">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="mb-4 text-sm text-slate-600 dark:text-slate-300">
                    <p><span className="font-semibold">Order:</span> {order.purchase_id || order.id.slice(0, 8)}</p>
                    <p><span className="font-semibold">Customer:</span> {order.profiles?.full_name || 'N/A'}</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                            Tracking Number
                        </label>
                        <input
                            type="text"
                            value={trackingNumber}
                            onChange={(e) => setTrackingNumber(e.target.value)}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg dark:bg-slate-900 dark:border-slate-700 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                            placeholder="e.g. 1Z999..."
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                            Tracking Image (Label)
                        </label>
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 dark:border-slate-600 border-dashed rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
                            <div className="space-y-1 text-center">
                                {file ? (
                                    <div className="flex flex-col items-center text-green-500">
                                        <CheckCircle className="w-8 h-8 mb-2" />
                                        <p className="text-sm">{file.name}</p>
                                        <button
                                            type="button"
                                            onClick={() => setFile(null)}
                                            className="text-xs text-red-500 mt-2 hover:underline"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        <Upload className="mx-auto h-12 w-12 text-slate-400" />
                                        <div className="flex text-sm text-slate-600 dark:text-slate-400">
                                            <label className="relative cursor-pointer rounded-md font-medium text-primary hover:text-primary-dark">
                                                <span>Upload a file</span>
                                                <input
                                                    type="file"
                                                    className="sr-only"
                                                    accept="image/*"
                                                    onChange={(e) => {
                                                        const selectedFile = e.target.files?.[0];
                                                        if (!selectedFile) return;

                                                        // Validation
                                                        if (selectedFile.size > 5 * 1024 * 1024) {
                                                            toast.error('File size must be less than 5MB');
                                                            return;
                                                        }

                                                        if (!selectedFile.type.startsWith('image/')) {
                                                            toast.error('Only image files are allowed');
                                                            return;
                                                        }

                                                        setFile(selectedFile);
                                                    }}
                                                />
                                            </label>
                                        </div>
                                        <p className="text-xs text-slate-500">PNG, JPG, GIF up to 5MB</p>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Complete Order'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
