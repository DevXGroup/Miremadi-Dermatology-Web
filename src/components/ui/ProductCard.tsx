import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Heart } from 'lucide-react';
import { Product } from '../../types';
import { useShopStore } from '../../store/useStore';
import { cn } from '../../lib/utils';
import { toast } from 'sonner';

interface ProductCardProps {
    product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const { addToCart, toggleWishlist, wishlist, openCart } = useShopStore();
    const isWishlisted = wishlist.includes(product.id);

    const handleAddToCart = () => {
        addToCart(product);
        toast.success(`${product.name} added to cart!`, {
            description: "View your cart to checkout.",
            action: {
                label: "View Cart",
                onClick: () => openCart()
            }
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="group relative flex flex-col bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-primary/10 dark:hover:shadow-black/50 transition-all duration-300 border border-slate-100 dark:border-slate-800 h-full"
        >
            {/* Image Container */}
            <div className="aspect-[4/5] overflow-hidden bg-slate-100 dark:bg-slate-900/50 relative">
                <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                />

                {/* Wishlist Button */}
                <div className="absolute top-3 right-3 z-10">
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toggleWishlist(product.id);
                        }}
                        className="p-2.5 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-sm text-slate-400 hover:text-red-500 hover:bg-white dark:hover:bg-slate-900 transition-all duration-200 cursor-pointer"
                    >
                        <Heart className={cn("w-4 h-4", isWishlisted && "fill-current text-red-500")} />
                    </button>
                </div>
            </div>

            {/* Info */}
            <div className="p-5 flex flex-col flex-grow">
                <div className="mb-4 flex-grow min-h-[140px] flex flex-col">
                    <span className="inline-block text-[10px] font-bold text-slate-900 bg-secondary-light/90 px-3 py-1 rounded-full mb-3 uppercase tracking-widest shadow-sm">
                        {product.category}
                    </span>
                    <h3 className="text-lg font-display font-medium text-slate-900 dark:text-white mb-2 leading-tight group-hover:text-primary transition-colors">
                        {product.name.split(' ').map((word, i) =>
                            word === 'Mirage' ? <span key={i} className="text-primary">{word} </span> : word + ' '
                        )}
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-2 leading-relaxed">
                        {product.description}
                    </p>
                </div>

                <div className="flex flex-col gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                        Please call our office at <span className="text-secondary-DEFAULT">(858) 456-1840</span> to place your order.
                    </p>
                    <button
                        onClick={() => window.location.href = 'tel:8584561840'}
                        className="w-full px-4 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-semibold rounded-lg hover:bg-white dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white border border-slate-900 dark:border-white transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer active:scale-95 shadow-sm hover:shadow-xl"
                    >
                        Call to Order
                    </button>
                </div>
            </div>
        </motion.div>
    );
};
