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
    const [scrolled, setScrolled] = useState(false);
    const [isDark, setIsDark] = useState(() => {
        if (typeof window === 'undefined') return true;
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') return false;
        return true;
    });

    const location = useLocation();
    const { } = useShopStore();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

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
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
                scrolled
                    ? "bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl backdrop-saturate-150 border-b border-white/20 dark:border-slate-700/30 shadow-[0_1px_3px_rgba(0,0,0,0.05)]"
                    : "bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border-b border-transparent"
            )}
        >
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

                    {/* Desktop Nav & Actions (Right Aligned) */}
                    <div className="hidden md:flex items-center space-x-8">
                        <div className="flex items-center space-x-8">
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

                        <div className="flex items-center pl-4 border-l border-slate-200 dark:border-slate-800">
                            <button
                                onClick={toggleDark}
                                className="p-2 text-slate-500 hover:text-primary dark:text-slate-400 dark:hover:text-primary transition-colors cursor-pointer"
                            >
                                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                            </button>
                        </div>
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
                        animate={{ opacity: 1, height: 'calc(100vh - 4rem)' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 overflow-hidden"
                    >
                        <div className="flex flex-col h-full px-6 pt-8 pb-8">
                            <div className="flex-1 space-y-6">
                                {navLinks.map((link) => {
                                    const active = location.pathname === link.path ||
                                        (link.path !== '/' && location.pathname.startsWith(link.path));
                                    return (
                                        <Link
                                            key={link.name}
                                            to={link.path}
                                            className={cn(
                                                "block text-2xl font-display font-medium transition-all cursor-pointer",
                                                active
                                                    ? "text-primary translate-x-2"
                                                    : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                                            )}
                                            onClick={() => setIsOpen(false)}
                                        >
                                            {link.name}
                                        </Link>
                                    );
                                })}
                            </div>

                            <div className="pt-8 mt-auto border-t border-slate-100 dark:border-slate-800">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-slate-400 font-medium tracking-wider uppercase">Appearance</span>
                                    <button
                                        onClick={toggleDark}
                                        className="p-3 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                                    >
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
