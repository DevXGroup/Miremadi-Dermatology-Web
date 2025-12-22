import React from 'react';
import { LegalLayout } from '../components/layout/LegalLayout';
import { Link } from 'react-router-dom';

export const Sitemap = () => {
    return (
        <LegalLayout title="Sitemap">
            <div className="grid md:grid-cols-2 gap-8">
                <div>
                    <h3 className="font-display text-xl mb-4">Main Pages</h3>
                    <ul className="space-y-2">
                        <li><Link to="/" className="text-secondary-DEFAULT hover:underline">Home</Link></li>
                        <li><Link to="/about" className="text-secondary-DEFAULT hover:underline">About Us</Link></li>
                        <li><Link to="/services" className="text-secondary-DEFAULT hover:underline">Services</Link></li>
                        <li><Link to="/contact" className="text-secondary-DEFAULT hover:underline">Contact</Link></li>
                        <li><Link to="/blog" className="text-secondary-DEFAULT hover:underline">Blog</Link></li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-display text-xl mb-4">Shop</h3>
                    <ul className="space-y-2">
                        <li><Link to="/shop" className="text-secondary-DEFAULT hover:underline">Shop All</Link></li>
                        <li><Link to="/cart" className="text-secondary-DEFAULT hover:underline">Cart</Link></li>
                        <li><Link to="/checkout" className="text-secondary-DEFAULT hover:underline">Checkout</Link></li>
                        <li><Link to="/wishlist" className="text-secondary-DEFAULT hover:underline">Wishlist</Link></li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-display text-xl mb-4">Account</h3>
                    <ul className="space-y-2">
                        <li><Link to="/account" className="text-secondary-DEFAULT hover:underline">My Account</Link></li>
                        <li><Link to="/billing" className="text-secondary-DEFAULT hover:underline">Billing & Payments</Link></li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-display text-xl mb-4">Legal</h3>
                    <ul className="space-y-2">
                        <li><Link to="/legal/privacy-policy" className="text-secondary-DEFAULT hover:underline">Privacy Policy</Link></li>
                        <li><Link to="/legal/terms-conditions" className="text-secondary-DEFAULT hover:underline">Terms & Conditions</Link></li>
                    </ul>
                </div>
            </div>
        </LegalLayout>
    );
};
