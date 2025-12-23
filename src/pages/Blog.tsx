import React from 'react';
import { motion } from 'framer-motion';

const POSTS = [
    {
        id: 1,
        title: 'The Science of Hydration',
        excerpt: 'Understanding how moisture retention works at a cellular level is key to glowing skin.',
        date: 'Oct 12, 2023',
        readTime: '5 min read',
        image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800',
        category: 'Science'
    },
    {
        id: 2,
        title: 'Autumn Skincare Routine',
        excerpt: 'As the seasons change, so should your routine. Here are our top tips for the cooler months.',
        date: 'Nov 03, 2023',
        readTime: '4 min read',
        image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&q=80&w=800',
        category: 'Lifestyle'
    },
    {
        id: 3,
        title: 'Understanding Retinoids',
        excerpt: 'Everything you need to know about the gold standard of anti-aging ingredients.',
        date: 'Dec 15, 2023',
        readTime: '8 min read',
        image: 'https://images.unsplash.com/photo-1552693673-1bf958298935?auto=format&fit=crop&q=80&w=800',
        category: 'Education'
    }
];

export const Blog = () => {
    return (
        <div className="pt-24 min-h-screen bg-white dark:bg-slate-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-display font-medium mb-6">The Journal</h1>
                    <p className="text-slate-500 max-w-2xl mx-auto">
                        Insights, advice, and updates from Dr. Miremadi and our team of experts.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {POSTS.map((post, index) => (
                        <motion.article
                            key={post.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="group cursor-pointer"
                        >
                            <div className="aspect-video overflow-hidden rounded-2xl mb-4 bg-slate-100">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>
                            <div className="flex items-center gap-4 text-xs font-medium uppercase tracking-wider text-slate-400 mb-3">
                                <span className="text-secondary-DEFAULT">{post.category}</span>
                                <span>•</span>
                                <span>{post.readTime}</span>
                            </div>
                            <h2 className="text-xl font-display font-medium mb-3 group-hover:text-primary transition-colors">
                                {post.title}
                            </h2>
                            <p className="text-slate-500 text-sm leading-relaxed mb-4">
                                {post.excerpt}
                            </p>
                            <button className="text-sm font-medium underline underline-offset-4 decoration-primary-light hover:decoration-primary transition-all">
                                Read Article
                            </button>
                        </motion.article>
                    ))}
                </div>
            </div>
        </div>
    );
};
