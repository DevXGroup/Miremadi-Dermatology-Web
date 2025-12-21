import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { Blog } from './pages/Blog';
import { About, Services, Contact } from './pages/Placeholders';

// Skeleton for loading states
const PageLoader = () => (
    <div className="flex items-center justify-center h-screen bg-white dark:bg-slate-900">
        <div className="w-8 h-8 border-4 border-primary-DEFAULT border-t-transparent rounded-full animate-spin" />
    </div>
);

function App() {
    return (
        <Router>
            <div className="min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-sans selection:bg-secondary-light selection:text-secondary-dark">
                <Navbar />
                <Suspense fallback={<PageLoader />}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/shop" element={<Shop />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/checkout" element={<Checkout />} />
                        <Route path="/blog" element={<Blog />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/services" element={<Services />} />
                        <Route path="/contact" element={<Contact />} />
                        {/* Fallback */}
                        <Route path="*" element={<Home />} />
                    </Routes>
                </Suspense>
            </div>
        </Router>
    );
}

export default App;
