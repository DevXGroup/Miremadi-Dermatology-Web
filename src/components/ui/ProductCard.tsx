import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Heart } from 'lucide-react';
import { Product } from '../../types';
import { useShopStore } from '../../store/useStore';
import { cn, formatPrice } from '../../lib/utils'; // Assuming formatPrice exists or I'll inline it

interface ProductCardProps {
    product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const { addToCart, toggleWishlist, wishlist } = useShopStore();
    const isWishlisted = wishlist.includes(product.id);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="group relative bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 dark:border-slate-700"
        >
            {/* Image Container */}
            <div className="aspect-[4/5] overflow-hidden bg-slate-100 dark:bg-slate-900 relative">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 z-10">
                    <button
                        onClick={() => toggleWishlist(product.id)}
                        className="p-2 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm text-slate-400 hover:text-red-500 transition-colors"
                    >
                        <Heart className={cn("w-5 h-5", isWishlisted && "fill-current text-red-500")} />
                    </button>
                </div>

                {/* Quick Add Overlay */}
                <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <button
                        onClick={() => addToCart(product)}
                        className="w-full py-3 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-medium rounded-xl shadow-lg flex items-center justify-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800"
                    >
                        <ShoppingBag className="w-4 h-4" /> Add to Cart
                    </button>
                </div>
            </div>

            {/* Info */}
            <div className="p-5">
                <p className="text-xs font-semibold text-secondary-DEFAULT mb-1 uppercase tracking-wide">{product.category}</p>
                <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">{product.name}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-2 mb-4">{product.description}</p>
                <div className="flex items-center justify-between">
                    <span className="text-xl font-display font-medium text-slate-900 dark:text-white">${product.price}</span>
                </div>
            </div>
        </motion.div>
    );
};
