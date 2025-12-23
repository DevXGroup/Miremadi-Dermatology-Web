import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../ui/Logo';
import { Facebook, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export const Footer = () => {
    return (
        <footer className="bg-slate-100 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="space-y-6">
                        <Link to="/" className="flex items-center gap-[7px] group">
                            <Logo className="h-[30px] w-auto group-hover:scale-105 transition-transform grayscale opacity-80" />
                            <div className="flex flex-col justify-center -space-y-0.5 translate-y-[1px]">
                                <span className="text-lg font-display font-bold text-slate-900 dark:text-white leading-tight tracking-tight">
                                    Miremadi
                                </span>
                                <span className="text-[9px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-widest leading-tight">
                                    Dermatology Medical Clinic
                                </span>
                            </div>
                        </Link>
                        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                            Providing over 57 years of exceptional dermatological care. Blending medical expertise with cosmetic innovation.
                        </p>
                        <div className="flex gap-4">
                            <SocialLink href="https://www.instagram.com/miremadi___dermatology/?hl=en" icon={Instagram} />
                            <SocialLink href="https://www.facebook.com/miremadidermatology/" icon={Facebook} />
                        </div>
                    </div>

                    {/* Quick Link */}
                    <div>
                        <h4 className="font-bold text-slate-900 dark:text-white mb-6">Quick Links</h4>
                        <ul className="space-y-4 text-sm text-slate-500 dark:text-slate-400">
                            <FooterLink to="/shop">Shop Skincare</FooterLink>
                            <FooterLink to="/services">Our Services</FooterLink>
                            <FooterLink to="/about">About Us</FooterLink>
                            <FooterLink to="/blog">Blog</FooterLink>
                            <FooterLink to="/contact">Contact</FooterLink>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="font-bold text-slate-900 dark:text-white mb-6">Legal & Help</h4>
                        <ul className="space-y-4 text-sm text-slate-500 dark:text-slate-400">
                            <FooterLink to="/legal/privacy-policy">Privacy Policy</FooterLink>
                            <FooterLink to="/legal/terms-conditions">Terms & Conditions</FooterLink>
                            <FooterLink to="/sitemap">Sitemap</FooterLink>
                            <FooterLink to="/account">My Account</FooterLink>
                            <FooterLink to="/billing">Billing</FooterLink>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-bold text-slate-900 dark:text-white mb-6">Contact</h4>
                        <ul className="space-y-4 text-sm text-slate-500 dark:text-slate-400">
                            <li className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 shrink-0" />
                                <span>7702-4 Ivanhoe Ave.<br />La Jolla, CA 92037</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="w-5 h-5 shrink-0" />
                                <span>(858) 456-1840</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="w-5 h-5 shrink-0" />
                                <span>info@drmiremadi.com</span>
                            </li>
                            <li className="pt-4 border-t border-slate-200 dark:border-slate-800 mt-2 space-y-3">
                                <div className="flex flex-wrap gap-2">
                                    <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-[10px] font-bold uppercase tracking-wide">English</span>
                                    <span className="px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-[10px] font-bold uppercase tracking-wide">Español</span>
                                    <span className="px-2 py-0.5 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-[10px] font-bold uppercase tracking-wide">Farsi</span>
                                </div>
                                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium tracking-wide">ما فارسی صحبت می‌کنیم</p>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-slate-200 dark:border-slate-800 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400">
                    <p>© {new Date().getFullYear()} Miremadi Dermatology. All rights reserved.</p>
                    <p>Designed for Excellence.</p>
                </div>
            </div>
        </footer>
    );
};

const FooterLink = ({ to, children }: { to: string, children: React.ReactNode }) => (
    <li>
        <Link to={to} className="hover:text-primary transition-all cursor-pointer">
            {children}
        </Link>
    </li>
);

const SocialLink = ({ href, icon: Icon }: { href: string, icon: any }) => (
    <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-500 hover:bg-primary hover:text-white transition-all transform hover:scale-110 cursor-pointer"
    >
        <Icon className="w-4 h-4" />
    </a>
);
