import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FAQ } from '../components/sections/FAQ';
import { Credentials } from '../components/ui/Credentials';
import { SERVICE_DATA } from '../lib/data';
import { MOCK_PRODUCTS } from '../store/useStore';
import { ProductCard } from '../components/ui/ProductCard';

import Antigravity from '../components/ui/Antigravity';
import { SkinScanAnimation } from '../components/ui/SkinScanAnimation';

export const Home = () => {
    // Simple state to force re-render on theme change if needed, or just let CSS handle background. 
    // For Canvas color, we need JS.
    const [isDark, setIsDark] = React.useState(() => {
        if (typeof window === 'undefined') return true;
        const savedTheme = localStorage.getItem('theme');
        // Default to dark mode if no theme is saved, or if it's explicitly 'dark'
        if (savedTheme === 'light') return false;
        return true;
    });

    React.useEffect(() => {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'class') {
                    setIsDark(document.documentElement.classList.contains('dark'));
                }
            });
        });
        observer.observe(document.documentElement, { attributes: true });
        return () => observer.disconnect();
    }, []);

    return (
        <div className="pt-24 min-h-screen relative overflow-x-hidden">
            {/* Background Animation Layer - Hero Only */}
            <div className="absolute top-0 left-0 right-0 h-[900px] overflow-hidden" style={{ zIndex: 0 }}>
                <div className="absolute left-0 right-0 top-[100px] h-full opacity-100 dark:opacity-80">
                    <Antigravity
                        count={633}
                        magnetRadius={20}
                        ringRadius={6}
                        waveSpeed={2.5}
                        waveAmplitude={4.1}
                        particleSize={0.8}
                        lerpSpeed={0.05}
                        color={isDark ? '#15b9c8' : '#6300db'}
                        autoAnimate={false}
                        particleVariance={1}
                        rotationSpeed={0}
                        depthFactor={1}
                        pulseSpeed={3}
                        particleShape="sphere"
                        fieldStrength={10}
                    />
                </div>
                {/* Soft Fade Overlay - Strictly contained to hero section */}
                <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-white/0 via-white/50 to-white dark:from-slate-950/0 dark:via-slate-950/50 dark:to-slate-950 pointer-events-none" />
            </div>


            {/* Hero Section */}
            <section className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-12 md:py-16">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        className="relative z-0"
                        variants={{
                            hidden: { opacity: 0 },
                            visible: {
                                opacity: 1,
                                transition: {
                                    staggerChildren: 0.1,
                                    delayChildren: 0.2
                                }
                            }
                        }}
                    >
                        <motion.div
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
                            }}
                            className="flex items-center mb-2 text-left"
                        >
                            <span className="text-sm font-bold text-secondary-dark uppercase tracking-[0.2em]">57+ Years of Medical Leadership</span>
                        </motion.div>

                        <h1 className="text-5xl md:text-7xl font-display font-medium leading-[1.1] mb-6 overflow-hidden">
                            <motion.span className="block" variants={{
                                hidden: { y: "100%" },
                                visible: { y: 0, transition: { duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] } }
                            }}>
                                Meticulous <span className="italic font-light text-primary">Care</span>
                            </motion.span>
                            <motion.span className="block" variants={{
                                hidden: { y: "100%" },
                                visible: { y: 0, transition: { duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] } }
                            }}>
                                for Your <span className="relative inline-block">
                                    <span className="relative inline-block">
                                        {"Skin.".split("").map((char, i) => (
                                            <motion.span
                                                key={i}
                                                className="inline-block"
                                                animate={{
                                                    color: isDark
                                                        ? ["#ffffff", "#f472b6", "#a78bfa", "#f472b6", "#ffffff"]
                                                        : ["#0f172a", "#ec4899", "#6366f1", "#ec4899", "#0f172a"],
                                                }}
                                                transition={{
                                                    duration: 4,
                                                    repeat: Infinity,
                                                    delay: i * 0.1,
                                                    ease: "easeInOut",
                                                }}
                                            >
                                                {char}
                                            </motion.span>
                                        ))}
                                    </span>
                                    <motion.div
                                        className="absolute inset-0 bg-pink-400/20 dark:bg-pink-300/10 blur-xl rounded-full -z-10"
                                        animate={{
                                            scale: [1, 1.2, 1],
                                            opacity: [0.2, 0.4, 0.2],
                                        }}
                                        transition={{
                                            duration: 3,
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                        }}
                                    />
                                    <motion.div
                                        className="absolute top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-pink-500/50 dark:via-pink-300/50 to-transparent shadow-[0_0_15px_rgba(236,72,153,0.3)]"
                                        animate={{
                                            left: ["-5%", "105%", "-5%"],
                                            opacity: [0, 1, 1, 0],
                                        }}
                                        transition={{
                                            duration: 4,
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                        }}
                                    />
                                </span>
                            </motion.span>
                        </h1>

                        <motion.div
                            variants={{
                                hidden: { opacity: 0, x: -20 },
                                visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
                            }}
                            className="relative mb-8 pl-6 border-l-4 border-slate-200 dark:border-slate-700"
                        >
                            <p className="text-xl italic text-slate-600 dark:text-slate-300 font-display">
                                Your skin is the largest organ of the body which needs meticulous care
                            </p>
                            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mt-1.5">— Arjang K. Miremadi, M.D.</p>
                        </motion.div>

                        <motion.div
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
                            }}
                            className="flex gap-4"
                        >
                            <Link
                                to="/contact"
                                className="px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full font-medium hover:scale-105 hover:bg-white dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white border border-slate-900 dark:border-white transition-all uppercase tracking-wider text-sm cursor-pointer text-center shadow-lg"
                            >
                                Start Your Beauty Journey
                            </Link>
                            <Link
                                to="/services"
                                className="px-8 py-4 border border-slate-200 dark:border-slate-700 rounded-full font-medium hover:bg-slate-900 dark:hover:bg-white hover:text-white dark:hover:text-slate-900 transition-all uppercase tracking-wider text-sm cursor-pointer text-center"
                            >
                                Explore Services
                            </Link>
                        </motion.div>
                    </motion.div>

                    <div className="relative">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1 }}
                            className="relative z-10"
                        >
                            <motion.div
                                animate={{ y: [0, -15, 0] }}
                                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                                className="will-change-transform"
                            >
                                <SkinScanAnimation isDark={isDark} />
                            </motion.div>

                            {/* Floating Expert Badge */}
                            <motion.div
                                animate={{ y: [0, -10, 0], rotate: [-1, 1, -1] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                className="absolute bottom-12 -left-6 p-6 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 max-w-[220px] text-right z-20"
                            >
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Advanced Skin Analysis</p>
                                <p className="text-sm font-bold text-slate-900 dark:text-white leading-tight">Precision Diagnostics</p>
                            </motion.div>
                        </motion.div>

                        {/* Decorative Background Element */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/5 rounded-full blur-3xl -z-10" />
                    </div>
                </div>
            </section>

            {/* Philosophy Section */}
            <section className="relative py-16 md:py-24 bg-white dark:bg-slate-950 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="text-xs font-bold text-primary uppercase tracking-[0.2em] mb-4 block">Our Philosophy</span>
                        <motion.h2
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="text-4xl md:text-5xl font-display font-medium text-slate-900 dark:text-white mb-6"
                        >
                            Radiance Rooted in <span className="italic font-light text-slate-400">Science</span>
                        </motion.h2>
                        <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed">
                            We believe in a holistic approach to skin health, combining cutting-edge technology with personalized care plans that treat the person, not just the symptom.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Patient-First Care",
                                desc: "Your comfort and long-term health are our top priorities. We co-author treatment plans with you to ensure they align with your lifestyle and goals.",
                                image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800"
                            },
                            {
                                title: "Holistic Approach",
                                desc: "We analyze lifestyle, nutrition, and environmental factors to address the root causes of skin concerns, promoting lasting wellness.",
                                image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800"
                            },
                            {
                                title: "Cutting-Edge Tech",
                                desc: "Utilizing the latest FDA-approved lasers and medical-grade treatments to deliver safe, effective, and transformative results.",
                                image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=800"
                            }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="group overflow-hidden rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:border-primary/30 transition-all hover:-translate-y-2 isolate"
                                style={{ WebkitBackfaceVisibility: 'hidden', WebkitTransform: 'translateZ(0)' }}
                            >
                                <div className="aspect-[16/10] overflow-hidden transition-all duration-500">
                                    <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                </div>
                                <div className="p-8">
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{item.title}</h3>
                                    <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm">
                                        {item.desc}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mirage Collection Promo */}
            <section className="relative h-[500px] md:h-[650px] flex items-center overflow-hidden group z-10">
                <div className="absolute inset-0">
                    <img
                        src="/images/promo/mirage_promo.png"
                        alt="Mirage Skincare Collection"
                        className="w-full h-full object-cover transition-all duration-1000 scale-105 group-hover:scale-110"
                    />
                    {/* Multi-layered gradient for depth and readability */}
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/60 to-slate-900/0" />
                    <div className="absolute inset-0 bg-slate-950/20" />
                </div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="max-w-2xl text-white"
                    >
                        <span className="text-xs font-bold uppercase tracking-[0.5em] mb-4 block text-blue-300">Premium Medical Grade</span>
                        <h2 className="text-4xl sm:text-5xl md:text-7xl font-display font-medium mb-6 leading-[1.1]">
                            The <span className="italic font-light text-white drop-shadow-sm">Mirage</span> <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-200">Collection</span>
                        </h2>
                        <p className="text-xl text-slate-200 mb-10 font-light leading-relaxed max-w-xl">
                            Experience the pinnacle of dermatological science with our new signature skincare line. Meticulously formulated for transformative results and professional-grade precision.
                        </p>
                        <Link
                            to="/shop"
                            className="inline-block px-10 py-5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 border border-transparent hover:border-slate-900 dark:hover:border-white rounded-full font-bold uppercase tracking-widest text-sm hover:bg-white dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white transition-all transform hover:scale-105"
                        >
                            Shop the Collection
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Curated Skincare Shelf */}
            <section className="relative py-16 md:py-24 bg-white dark:bg-slate-950 overflow-hidden z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <span className="text-xs font-bold text-primary uppercase tracking-[0.4em] mb-4 block">New Arrivals</span>
                            <motion.h2
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className="text-4xl font-display font-medium text-slate-900 dark:text-white"
                            >
                                Curated <span className="italic font-light text-slate-900 dark:text-white transition-colors duration-500 underline decoration-blue-500/30 underline-offset-8">Skincare</span>
                            </motion.h2>
                        </div>
                        <Link to="/shop" className="text-sm font-bold uppercase tracking-widest text-slate-400 hover:text-primary transition-colors">
                            View All Items →
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {MOCK_PRODUCTS.slice(0, 4).map((product, i) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="h-full"
                            >
                                <ProductCard product={product} />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Quick Services Preview */}
            <section className="relative bg-slate-50 dark:bg-slate-900 py-16 md:py-24 px-4 z-10">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-start mb-16">
                        <div>
                            <div className="flex items-center mb-4">
                                <span className="text-xs font-bold text-primary uppercase tracking-[0.4em] ml-[5px]">Clinical Excellence</span>
                            </div>
                            <motion.h2
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className="text-4xl md:text-5xl font-display font-medium mb-6"
                            >
                                Our Medical & <br className="hidden md:block" />
                                <span className="italic font-light text-slate-400">Cosmetic Services</span>
                            </motion.h2>
                            <div className="mt-8">
                                <Credentials />
                            </div>
                        </div>
                        <div className="flex flex-col gap-6 max-w-md text-right ml-auto">
                            <p className="text-slate-500 leading-relaxed text-sm md:text-base">
                                Our boutique practice combines 57+ years of pathology and dermatology expertise for precision results. We offer a wide range of services tailored to your specific needs, ensuring you receive the best care possible.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {SERVICE_DATA.map((service, i) => (
                            <div key={i} className="group bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                                <div className="relative aspect-square rounded-2xl overflow-hidden mb-6 bg-slate-100 flex-shrink-0">
                                    <img
                                        src={service.img}
                                        alt={service.title}
                                        className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span className="px-3 py-1 bg-white/90 dark:bg-slate-900/90 backdrop-blur rounded-full text-[10px] font-bold uppercase tracking-widest text-slate-900 dark:text-white">
                                            {service.type}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex flex-col flex-grow">
                                    <h3 className="text-xl font-medium mb-3 group-hover:text-primary transition-colors">{service.title}</h3>
                                    <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-4 line-clamp-3">
                                        {service.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="relative z-10 bg-white dark:bg-slate-950 py-24">
                <FAQ />
            </section>
        </div>
    );
};
