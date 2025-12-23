import React from 'react';
import { motion } from 'framer-motion';

const pages = [
    { title: 'About Us', path: '/about', content: 'Learn about our 57+ years of history and commitment to dermatological excellence.' },
    { title: 'Services', path: '/services', content: 'Explore our comprehensive range of medical and cosmetic skin treatments.' },
    { title: 'Contact', path: '/contact', content: 'Get in touch with us to schedule your consultation.' },
];

export const PlaceholderPage = ({ title, content }: { title: string, content: string }) => (
    <div className="pt-24 min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center px-4 max-w-2xl"
        >
            <h1 className="text-4xl md:text-5xl font-display font-medium text-slate-900 dark:text-white mb-6">
                {title}
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
                {content}
            </p>
            <div className="p-8 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
                <span className="text-slate-400 font-medium">Coming Soon</span>
            </div>
        </motion.div>
    </div>
);

export const About = () => <PlaceholderPage title={pages[0].title} content={pages[0].content} />;
export const Services = () => <PlaceholderPage title={pages[1].title} content={pages[1].content} />;
export const Contact = () => <PlaceholderPage title={pages[2].title} content={pages[2].content} />;
