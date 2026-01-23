import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from '../ui/Logo';
import { useShopStore } from '../../store/useStore';
import { useClickAway } from 'react-use';


export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isDark, setIsDark] = useState(() => {
        if (typeof window === 'undefined') return false;
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) return savedTheme === 'dark';
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    });

    const location = useLocation();
    const { toggleDark: storeToggleDark } = useShopStore();

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDark]);

    const toggleDark = () => setIsDark(!isDark);

    const navLinks = [
        { name: 'Home', path: '/' },
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
                    <Link to="/" className="flex items-center gap-[7px] group">
                        <Logo className="h-[32px] w-auto group-hover:scale-105 transition-transform" />
                        <div className="flex flex-col justify-center -space-y-0.5 translate-y-[1px]">
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
                        {navLinks.map((link) => {
                            const active = location.pathname === link.path ||
                                (link.path !== '/' && location.pathname.startsWith(link.path));
                            return (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className={cn(
                                        "text-sm transition-all hover:text-primary cursor-pointer relative py-1",
                                        active
                                            ? "text-primary font-bold active-link"
                                            : "text-slate-600 dark:text-slate-300 font-medium"
                                    )}
                                >
                                    {link.name}
                                    {active && (
                                        <motion.div
                                            layoutId="nav-underline"
                                            className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                                        />
                                    )}
                                </Link>
                            );
                        })}
                    </div>

                    {/* Actions */}
                    <div className="hidden md:flex items-center space-x-4">
                        <button
                            onClick={toggleDark}
                            className="p-2 text-slate-500 hover:text-primary dark:text-slate-400 dark:hover:text-primary transition-colors cursor-pointer"
                        >
                            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        </button>
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
                        className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 overflow-hidden"
                    >
                        <div className="px-4 pt-2 pb-6 space-y-2 max-h-[calc(100vh-5rem)] overflow-y-auto">
                            {navLinks.map((link) => {
                                const active = location.pathname === link.path ||
                                    (link.path !== '/' && location.pathname.startsWith(link.path));
                                return (
                                    <Link
                                        key={link.name}
                                        to={link.path}
                                        className={cn(
                                            "block py-3 text-lg font-semibold transition-all cursor-pointer flex items-center justify-between",
                                            active
                                                ? "text-primary pl-2 border-l-4 border-primary bg-primary/5"
                                                : "text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary"
                                        )}
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <span>{link.name}</span>
                                        {active && <span className="w-1.5 h-1.5 rounded-full bg-primary" />}
                                    </Link>
                                );
                            })}

                            <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                                <div className="flex gap-4">
                                    <button onClick={toggleDark} className="p-2 text-slate-500 dark:text-slate-400">
                                        {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};
