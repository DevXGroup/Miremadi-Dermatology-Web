import React from 'react';
import { useShopStore } from '../store/useStore';
import { ProductCard } from '../components/ui/ProductCard'; // Correct path

export const Shop = () => {
    const { products } = useShopStore();

    return (
        <div className="pt-24 min-h-screen bg-slate-50 dark:bg-slate-950">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                    <div>
                        <h1 className="text-4xl font-display font-medium text-slate-900 dark:text-white mb-4">
                            Curated Skincare
                        </h1>
                        <p className="text-slate-500 max-w-xl">
                            Discover our dermatologist-approved products designed to transform your skin health.
                        </p>
                    </div>
                    <div className="mt-4 md:mt-0 flex gap-2">
                        {['All', 'Moisturizers', 'Serums', 'Treatments'].map(filter => (
                            <button key={filter} className="px-4 py-2 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                {filter}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {products.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </div>
    );
};
