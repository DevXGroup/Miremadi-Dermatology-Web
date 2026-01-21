import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag, User, Sun, Moon, LogOut, Settings, Package } from 'lucide-react';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from '../ui/Logo';
import { useShopStore } from '../../store/useStore';
import { supabase } from '../../lib/supabase';
import { useClickAway } from 'react-use';


export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

    const [isDark, setIsDark] = useState(() => {
        if (typeof window === 'undefined') return false;
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) return savedTheme === 'dark';
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    });

    const location = useLocation();
    const { user, logout, openAuthModal, cart, openCart } = useShopStore();
    const userMenuRef = useRef(null);


    useEffect(() => {
        // Sync theme with DOM and persistence
        if (isDark) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDark]);

    useClickAway(userMenuRef, () => setIsUserMenuOpen(false));

    const handleLogout = async () => {
        await supabase.auth.signOut();
        logout();
        setIsUserMenuOpen(false);
    };

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



                        {/* User Menu */}
                        <div className="relative" ref={userMenuRef}>
                            {user ? (
                                <button
                                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                    className={cn(
                                        "p-1 flex items-center justify-center rounded-full border transition-all cursor-pointer",
                                        location.pathname === '/account' || location.pathname === '/wishlist'
                                            ? "border-primary bg-primary/5"
                                            : "border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:border-primary"
                                    )}
                                >
                                    {user.photo_url ? (
                                        <img src={user.photo_url} alt="Profile" className="w-8 h-8 rounded-full object-cover" />
                                    ) : (
                                        <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-medium text-xs">
                                            {user.full_name?.charAt(0) || user.email?.charAt(0)}
                                        </div>
                                    )}
                                </button>
                            ) : (
                                <button
                                    onClick={openAuthModal}
                                    className={cn(
                                        "p-2 transition-all cursor-pointer",
                                        location.pathname === '/login' || location.pathname === '/signup'
                                            ? "text-primary"
                                            : "text-slate-500 hover:text-primary dark:text-slate-400 dark:hover:text-primary"
                                    )}
                                >
                                    <User className="w-5 h-5" />
                                </button>
                            )}

                            {/* Dropdown */}
                            <AnimatePresence>
                                {isUserMenuOpen && user && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                                        className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-slate-200 dark:border-slate-800 py-2 overflow-hidden"
                                    >
                                        <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800 mb-1">
                                            <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
                                                {user.full_name}
                                            </p>
                                            <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                                                {user.email}
                                            </p>
                                        </div>
                                        <Link
                                            to="/account"
                                            className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                                            onClick={() => setIsUserMenuOpen(false)}
                                        >
                                            <Settings className="w-4 h-4" />
                                            Account Settings
                                        </Link>
                                        <Link
                                            to="/wishlist"
                                            className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                                            onClick={() => setIsUserMenuOpen(false)}
                                        >
                                            <span className="w-4 h-4 text-center">♥</span>
                                            Wishlist
                                        </Link>
                                        <Link
                                            to="/orders"
                                            className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                                            onClick={() => setIsUserMenuOpen(false)}
                                        >
                                            <Package className="w-4 h-4" />
                                            Order History
                                        </Link>
                                        {user.is_admin && (
                                            <Link
                                                to="/admin"
                                                className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                                                onClick={() => setIsUserMenuOpen(false)}
                                            >
                                                <span className="w-4 h-4 text-center">⚡</span>
                                                Admin Dashboard
                                            </Link>
                                        )}
                                        <div className="border-t border-slate-100 dark:border-slate-800 mt-1 pt-1">
                                            <button
                                                onClick={handleLogout}
                                                className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
                                            >
                                                <LogOut className="w-4 h-4" />
                                                Log Out
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
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

                                {user ? (
                                    <Link
                                        to="/account"
                                        onClick={() => setIsOpen(false)}
                                        className="flex items-center gap-2 p-2 text-primary font-medium"
                                    >
                                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs">
                                            {user.full_name?.charAt(0)}
                                        </div>
                                        {user.full_name}
                                    </Link>
                                ) : (
                                    <button
                                        onClick={() => {
                                            setIsOpen(false);
                                            openAuthModal();
                                        }}
                                        className="p-2 text-slate-500 dark:text-slate-400"
                                    >
                                        Log In
                                    </button>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>


        </nav>
    );
};
