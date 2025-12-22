import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useShopStore } from '../store/useStore';
import { ProductCard } from '../components/ui/ProductCard';
import { Product } from '../types';

const CATEGORIES = ['All', 'Moisturizers', 'Serums', 'Treatments', 'Cleansers'];

export const Shop = () => {
    const { products, fetchProducts, loading, user } = useShopStore();
    const [selectedCategory, setSelectedCategory] = useState('All');

    // Derived state for filtering
    const filteredProducts = selectedCategory === 'All'
        ? products
        : products.filter(p => p.category === selectedCategory);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    // Animation variants
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    return (
        <div className="pt-24 min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

                {/* Auth Greeting */}
                {user && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8 p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm"
                    >
                        <h2 className="text-2xl font-light text-slate-900 dark:text-white mb-1">
                            Hi, <span className="font-semibold text-secondary-DEFAULT">{user.full_name?.split(' ')[0] || 'there'}</span>
                        </h2>
                        <p className="text-slate-500 dark:text-slate-400">
                            Welcome back to your curated skincare routine.
                        </p>
                    </motion.div>
                )}

                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div>
                        <span className="text-secondary-DEFAULT font-medium tracking-wider uppercase text-sm mb-2 block">Shop Collection</span>
                        <h1 className="text-4xl md:text-5xl font-display font-medium text-slate-900 dark:text-white mb-4">
                            Curated Skincare
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400 max-w-xl text-lg leading-relaxed">
                            Discover our dermatologist-approved products designed to transform your skin health.
                        </p>
                    </div>

                    {/* Filter Chips */}
                    <div className="flex flex-wrap gap-2">
                        {CATEGORIES.map(category => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${selectedCategory === category
                                        ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-md transform scale-105'
                                        : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Product Grid */}
                {loading ? (
                    <div className="col-span-full flex justify-center py-24">
                        <div className="w-12 h-12 border-4 border-primary-DEFAULT border-t-transparent rounded-full animate-spin" />
                    </div>
                ) : (
                    <motion.div
                        variants={container}
                        initial="hidden"
                        animate="show"
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
                    >
                        <AnimatePresence mode='popLayout'>
                            {filteredProducts.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </AnimatePresence>

                        {filteredProducts.length === 0 && (
                            <div className="col-span-full text-center py-24">
                                <p className="text-slate-400">No products found in this category.</p>
                            </div>
                        )}
                    </motion.div>
                )}
            </div>
        </div>
    );
};
