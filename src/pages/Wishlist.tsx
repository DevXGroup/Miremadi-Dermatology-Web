import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useShopStore } from '../store/useStore';
import { Product } from '../types';

export const Wishlist = () => {
    const { wishlist, products, addToCart, toggleWishlist } = useShopStore();

    // Filter products that are in the wishlist
    const wishlistProducts = products.filter(p => wishlist.includes(p.id));

    return (
        <div className="pt-24 min-h-screen bg-slate-50 dark:bg-slate-950 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="mb-12">
                    <h1 className="text-4xl font-display font-medium text-slate-900 dark:text-white mb-4">Your Wishlist</h1>
                    <p className="text-slate-500 dark:text-slate-400 text-lg">
                        Manage your curated skincare favorites.
                    </p>
                </div>

                {wishlistProducts.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-24 text-center">
                        <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-400 mb-6">
                            <span className="text-3xl">♥</span>
                        </div>
                        <h2 className="text-2xl font-medium text-slate-900 dark:text-white mb-2">Your wishlist is empty</h2>
                        <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-md">
                            Save items you love to your wishlist to revisit them later.
                        </p>
                        <Link
                            to="/shop"
                            className="px-8 py-3 bg-secondary-DEFAULT hover:bg-secondary-dark text-white rounded-full font-medium transition-colors"
                        >
                            Explore Products
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {wishlistProducts.map(product => (
                            <div key={product.id} className="group bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 hover:shadow-xl transition-shadow">
                                <Link to={`/shop?id=${product.id}`} className="block relative aspect-[4/5] overflow-hidden bg-slate-100">
                                    <img
                                        src={product.image_url}
                                        alt={product.name}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            toggleWishlist(product.id);
                                        }}
                                        className="absolute top-3 right-3 p-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur rounded-full text-red-500 hover:bg-white dark:hover:bg-slate-900 transition-colors z-10"
                                    >
                                        <span className="w-4 h-4 block text-center leading-none">♥</span>
                                    </button>
                                </Link>
                                <div className="p-5">
                                    <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1">{product.category}</p>
                                    <h3 className="text-lg font-display font-medium text-slate-900 dark:text-white mb-2 line-clamp-1">{product.name}</h3>
                                    <div className="flex items-center justify-between mt-4">
                                        <span className="text-lg font-medium text-slate-900 dark:text-white">${product.price}</span>
                                        <button
                                            onClick={() => addToCart(product)}
                                            className="px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold uppercase tracking-wider rounded-lg hover:opacity-90 transition-opacity"
                                        >
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
