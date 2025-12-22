import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Loader2, ArrowRight } from 'lucide-react';
import { useClickAway } from 'react-use';
import { useShopStore } from '../../store/useStore';
import { Product } from '../../types';
import { Link } from 'react-router-dom';

interface SearchModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const SearchModal = ({ isOpen, onClose }: SearchModalProps) => {
    const { products } = useShopStore(); // Client-side search for now
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<Product[]>([]);

    const containerRef = useRef(null);
    useClickAway(containerRef, onClose);

    useEffect(() => {
        if (!isOpen) {
            setQuery('');
            setResults([]);
        }
    }, [isOpen]);

    useEffect(() => {
        if (query.trim() === '') {
            setResults([]);
            return;
        }

        const lowerQuery = query.toLowerCase();
        const filtered = products.filter(p =>
            p.name.toLowerCase().includes(lowerQuery) ||
            p.description.toLowerCase().includes(lowerQuery) ||
            p.category.toLowerCase().includes(lowerQuery)
        );
        setResults(filtered.slice(0, 5)); // Limit to 5
    }, [query, products]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] bg-slate-900/60 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="fixed inset-0 z-[70] flex items-start justify-center pt-24 px-4 pointer-events-none"
                    >
                        <div ref={containerRef} className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden pointer-events-auto border border-slate-200 dark:border-slate-800">
                            <div className="flex items-center p-4 border-b border-slate-100 dark:border-slate-800">
                                <Search className="w-5 h-5 text-slate-400 mr-3" />
                                <input
                                    type="text"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Search products, categories..."
                                    className="flex-1 bg-transparent border-none outline-none text-lg text-slate-900 dark:text-white placeholder:text-slate-400"
                                    autoFocus
                                />
                                <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="max-h-[60vh] overflow-y-auto">
                                {query && results.length === 0 ? (
                                    <div className="p-8 text-center text-slate-500">
                                        No results found for "{query}"
                                    </div>
                                ) : (
                                    <div className="p-2">
                                        {results.map(product => (
                                            <Link
                                                key={product.id}
                                                to={`/shop?id=${product.id}`} // Simple link for now
                                                onClick={onClose}
                                                className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group"
                                            >
                                                <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden flex-shrink-0">
                                                    <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="text-sm font-medium text-slate-900 dark:text-white truncate group-hover:text-secondary-DEFAULT transition-colors">
                                                        {product.name}
                                                    </h4>
                                                    <p className="text-xs text-slate-500 truncate">{product.category}</p>
                                                </div>
                                                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-secondary-DEFAULT -translate-x-2 group-hover:translate-x-0 transition-all opacity-0 group-hover:opacity-100" />
                                            </Link>
                                        ))}
                                    </div>
                                )}
                                {!query && (
                                    <div className="p-4">
                                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Popular Categories</p>
                                        <div className="flex flex-wrap gap-2">
                                            {['Moisturizers', 'Serums', 'Treatments'].map(cat => (
                                                <Link
                                                    key={cat}
                                                    to={`/shop?category=${cat}`}
                                                    onClick={onClose}
                                                    className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                                                >
                                                    {cat}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
