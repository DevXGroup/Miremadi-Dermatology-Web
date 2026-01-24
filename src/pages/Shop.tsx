import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useShopStore } from '../store/useStore';
import { ProductCard } from '../components/ui/ProductCard';
import { Product } from '../types';

const CATEGORIES = ['All', 'Moisturizers', 'Rejuvenation', 'Cleansers'];

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
                <div className="relative rounded-[2.5rem] overflow-hidden mb-16 h-[300px] md:h-[450px] flex items-center shadow-2xl group">
                    <div className="absolute inset-0">
                        <img
                            src="/images/promo/mirage_promo.png"
                            alt="The Mirage Collection"
                            className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-1000"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/40 to-transparent" />
                        <div className="absolute inset-0 bg-slate-950/20" />
                    </div>
                    <div className="relative px-6 md:px-12 max-w-2xl">
                        <span className="text-blue-300 font-bold tracking-[0.5em] uppercase text-[10px] mb-4 block">Dermatologist Formulated</span>
                        <h1 className="text-5xl md:text-6xl font-display font-medium text-white mb-6 leading-[1.1]">
                            The <span className="italic font-light text-white">Mirage</span> <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-100">Collection</span>
                        </h1>
                        <p className="text-slate-200 text-lg leading-relaxed font-light max-w-lg">
                            Dermatologist-formulated precision meet luxury. Professional-grade results, expertly crafted for your unique skin health and radiance.
                        </p>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div>
                        <h2 className="text-3xl font-display font-medium text-slate-900 dark:text-white mb-2">
                            Curated Skincare
                        </h2>
                        <p className="text-slate-500 dark:text-slate-400 max-w-xl leading-relaxed">
                            Discover the perfect balance of science and luxury.
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
                        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
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
