import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag, User, Sun, Moon, Search } from 'lucide-react';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from '../ui/Logo';

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isDark, setIsDark] = useState(false); // Mock state for now
    const location = useLocation();

    const toggleDark = () => {
        setIsDark(!isDark);
        document.documentElement.classList.toggle('dark');
    };

    const navLinks = [
        { name: 'Services', path: '/services' },
        { name: 'Shop', path: '/shop' },
        { name: 'About', path: '/about' },
        { name: 'Blog', path: '/blog' },
        { name: 'Contact', path: '/contact' },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">

                    {/* Logo */}
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 group">
                        <Logo className="w-14 h-14 group-hover:scale-105 transition-transform" />
                        <div className="flex flex-col justify-center -space-y-0.5">
                            <span className="text-xl font-display font-bold text-slate-900 dark:text-white leading-tight tracking-tight">
                                Miremadi
                            </span>
                            <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-widest leading-tight">
                                Dermatology Medical Clinic
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={cn(
                                    "text-sm font-medium transition-colors hover:text-secondary-DEFAULT",
                                    location.pathname === link.path
                                        ? "text-secondary-DEFAULT"
                                        : "text-slate-600 dark:text-slate-300"
                                )}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Actions */}
                    <div className="hidden md:flex items-center space-x-4">
                        <button
                            onClick={() => { }}
                            className="p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
                        >
                            <Search className="w-5 h-5" />
                        </button>
                        <button
                            onClick={toggleDark}
                            className="p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
                        >
                            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        </button>
                        <Link to="/cart" className="relative p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">
                            <ShoppingBag className="w-5 h-5" />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-primary-DEFAULT rounded-full" />
                        </Link>
                        <Link to="/login" className="p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">
                            <User className="w-5 h-5" />
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 text-slate-600 dark:text-slate-300"
                        >
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800"
                    >
                        <div className="px-4 pt-2 pb-6 space-y-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className="block py-3 text-base font-medium text-slate-600 dark:text-slate-300 hover:text-secondary-DEFAULT dark:hover:text-secondary-DEFAULT transition-colors"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className="flex items-center space-x-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                                <button onClick={toggleDark} className="p-2 text-slate-500 dark:text-slate-400">
                                    {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                                </button>
                                <Link to="/cart" className="p-2 text-slate-500 dark:text-slate-400">
                                    <ShoppingBag className="w-5 h-5" />
                                </Link>
                                <Link to="/login" className="p-2 text-slate-500 dark:text-slate-400">
                                    <User className="w-5 h-5" />
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};
