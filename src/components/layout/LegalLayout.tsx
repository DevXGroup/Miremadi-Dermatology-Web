import React from 'react';
import { Link } from 'react-router-dom';

export const LegalLayout = ({ title, children }: { title: string, children: React.ReactNode }) => {
    return (
        <div className="pt-32 pb-24 min-h-screen bg-slate-50 dark:bg-slate-950">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <nav className="mb-8 flex gap-2 text-sm text-slate-500">
                    <Link to="/" className="hover:underline">Home</Link>
                    <span>/</span>
                    <span>Legal</span>
                </nav>
                <h1 className="text-4xl font-display font-medium text-slate-900 dark:text-white mb-8">{title}</h1>
                <div className="prose prose-slate dark:prose-invert max-w-none bg-white dark:bg-slate-900/50 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    {children}
                </div>
            </div>
        </div>
    );
};
