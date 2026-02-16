import React, { useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FAQ } from '../components/sections/FAQ';
import { Credentials } from '../components/ui/Credentials';
import { SERVICE_DATA } from '../lib/data';
import { MOCK_PRODUCTS } from '../store/useStore';
import { ProductCard } from '../components/ui/ProductCard';

import Antigravity from '../components/ui/Antigravity';
import { SkinScanAnimation } from '../components/ui/SkinScanAnimation';

const MirageSection = () => {
    const revealRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
        if (!revealRef.current) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const mask = `radial-gradient(circle 140px at ${x}px ${y}px, black 0%, black 60%, transparent 100%)`;
        revealRef.current.style.maskImage = mask;
        revealRef.current.style.webkitMaskImage = mask;
        revealRef.current.style.opacity = '1';
    }, []);

    const handleMouseLeave = useCallback(() => {
        if (revealRef.current) {
            revealRef.current.style.opacity = '0';
            revealRef.current.style.maskImage = '';
            revealRef.current.style.webkitMaskImage = '';
        }
    }, []);

    return (
        <section
            className="relative h-[500px] md:h-[650px] flex items-center overflow-hidden z-10"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {/* Layer 1: Blurred background image */}
            <div className="absolute inset-0">
                <img
                    src="/images/promo/mirage_promo.webp"
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover scale-105 blur-[6px]"
                />
            </div>

            {/* Layer 2: Sharp image revealed at cursor via radial mask — no React re-renders */}
            <div
                ref={revealRef}
                className="absolute inset-0 pointer-events-none transition-opacity duration-300 will-change-[mask-image]"
                style={{ opacity: 0 }}
            >
                <img
                    src="/images/promo/mirage_promo.webp"
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover scale-105"
                />
            </div>

            {/* Gradient overlays for text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/50 to-slate-900/20 pointer-events-none" />

            {/* Content */}
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
                        className="inline-block px-10 py-5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 border border-transparent hover:border-slate-900 dark:hover:border-white rounded-full font-bold uppercase tracking-widest text-sm hover:bg-white dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white transition-all transform hover:scale-105 cursor-pointer"
                    >
                        Shop the Collection
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

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
            <div className="absolute top-0 left-0 right-0 h-screen overflow-hidden" style={{ zIndex: 0 }}>
                <div className="absolute inset-0 opacity-100 dark:opacity-90">
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
                <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-white/0 via-white/20 to-white dark:from-slate-950/0 dark:via-slate-950/20 dark:to-slate-950 pointer-events-none" />
            </div>


            {/* Hero Section */}
            <section className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-[calc(100vh-6rem)] flex items-end pb-10 md:pb-16 pt-6 md:pt-10">
                <div className="grid md:grid-cols-2 gap-8 items-end w-full">
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

                        <h1 className="text-4xl md:text-6xl font-display font-medium leading-[1.1] mb-5 overflow-hidden">
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
                            className="relative mb-6 pl-6 border-l-4 border-slate-200 dark:border-slate-700"
                        >
                            <p className="text-lg italic text-slate-600 dark:text-slate-300 font-display">
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

                    <div className="relative md:max-h-[calc(100vh-12rem)]">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1 }}
                            className="relative z-10 md:max-h-[calc(100vh-12rem)]"
                        >
                            <SkinScanAnimation isDark={isDark} />
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
                                image: "/images/philosophy/patient_first.jpg"
                            },
                            {
                                title: "Holistic Approach",
                                desc: "We analyze lifestyle, nutrition, and environmental factors to address the root causes of skin concerns, promoting lasting wellness.",
                                image: "/images/philosophy/holistic.jpg"
                            },
                            {
                                title: "Cutting-Edge Tech",
                                desc: "Utilizing the latest FDA-approved lasers and medical-grade treatments to deliver safe, effective, and transformative results.",
                                image: "/images/philosophy/cutting_edge.jpg"
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
                                    <img src={item.image} alt={item.title} loading="lazy" decoding="async" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
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

                    {/* Meet Dr. Miremadi */}
                    <div className="mt-20 grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="relative"
                        >
                            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                                <img
                                    src="/dr-miremadi-portrait-new.webp"
                                    alt="Dr. Arjang K. Miremadi"
                                    loading="lazy"
                                    decoding="async"
                                    className="w-full h-[500px] md:h-[600px] object-cover object-top"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" />
                            </div>
                            {/* Floating credentials card */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.4, duration: 0.6 }}
                                className="absolute -bottom-6 -left-4 md:left-6 p-5 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 max-w-[240px]"
                            >
                                <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1.5">Dermatology, Pathology & Dermatopathology</p>
                                <p className="text-sm font-bold text-slate-900 dark:text-white leading-tight">Triple Board-Certified Specialist</p>
                                <div className="flex items-center gap-2 mt-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                                    <div className="w-2 h-2 rounded-full bg-green-500" />
                                    <p className="text-[10px] text-slate-500 dark:text-slate-400">57+ Years of Medical Excellence</p>
                                </div>
                            </motion.div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                        >
                            <span className="text-xs font-bold text-secondary-dark uppercase tracking-[0.2em] mb-4 block">Meet Your Doctor</span>
                            <h3 className="text-3xl md:text-4xl font-display font-medium text-slate-900 dark:text-white mb-6 leading-tight">
                                Arjang K. Miremadi, <span className="italic font-light text-slate-400">M.D., FAAD</span>
                            </h3>

                            <div className="relative mb-8 pl-6 border-l-4 border-primary/30">
                                <p className="text-lg italic text-slate-600 dark:text-slate-300 font-display leading-relaxed">
                                    "The Miremadi System literally 'peels' away the years, along with wrinkles and unwanted spots. The dramatic results possible with this treatment brings radiant, younger looking skin to all patients regardless of age, race, color, or ethnic group."
                                </p>
                                <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mt-3">— Dr. Miremadi</p>
                            </div>

                            <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
                                A board-certified Dermatologist and Pathologist with over five decades of experience, Dr. Miremadi is the only provider of free skin cancer screening for the American Cancer Society in San Diego County. As a retired Captain of the United States Navy Medical Corp, he brings unmatched precision and dedication to every patient.
                            </p>

                            <div className="flex flex-wrap gap-3 mb-8">
                                {[
                                    { label: 'Board Certified', sub: 'Dermatology & Pathology' },
                                    { label: 'U.S. Navy', sub: 'Retired Captain' },
                                    { label: 'Free Screening', sub: 'Only Provider in SD' },
                                ].map((badge, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.4 + i * 0.1 }}
                                        className="px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700"
                                    >
                                        <p className="text-xs font-bold text-slate-900 dark:text-white">{badge.label}</p>
                                        <p className="text-[10px] text-slate-500 dark:text-slate-400">{badge.sub}</p>
                                    </motion.div>
                                ))}
                            </div>

                            <Link
                                to="/about"
                                className="inline-block px-8 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full font-medium hover:scale-105 hover:bg-white dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white border border-slate-900 dark:border-white transition-all uppercase tracking-wider text-sm"
                            >
                                Read Full Biography
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Patient Reviews */}
            <section className="relative py-16 md:py-24 bg-slate-50 dark:bg-slate-900 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="text-xs font-bold text-primary uppercase tracking-[0.2em] mb-4 block">Patient Testimonials</span>
                        <motion.h2
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="text-4xl md:text-5xl font-display font-medium text-slate-900 dark:text-white mb-6"
                        >
                            What Our <span className="italic font-light text-slate-400">Patients Say</span>
                        </motion.h2>
                        <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed">
                            Real reviews from real patients on Yelp. We're proud of the trust our community places in us.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            {
                                name: "Sara A.",
                                location: "San Diego, CA",
                                date: "Aug 2017",
                                text: "Dr. Miremadi was highly recommended by a trusted friend. He is a Dermatologist with extensive experience. He is always transparent, you see the bottle he pulls from. He is such a kind hearted man and very professional and his experience is evident. I absolutely love him and am so happy to be his patient.",
                                initials: "SA",
                            },
                            {
                                name: "Donald O.",
                                location: "San Diego, CA",
                                date: "Mar 2021",
                                text: "Dr. Miremadi is by far one of the best doctors in town. He is very kind, gentle and knowledgeable about his practice. You get what you pay for in the skin care business and here you get the best of the best. Dr. M is very open, transparent and honest — a class act and a wonderful human.",
                                initials: "DO",
                            },
                            {
                                name: "Ashley A.",
                                location: "Spring Valley, CA",
                                date: "Jul 2019",
                                text: "He is a very kind and gentle doctor, knowledgeable about what will and won't be covered by insurance. He genuinely cares about patients and their health, takes his time with you and makes recommendations which accommodate your lifestyle. He's the best!",
                                initials: "AA",
                            },
                            {
                                name: "Tina B.",
                                location: "San Francisco, CA",
                                date: "Jan 2024",
                                text: "I have been seeing Dr. Miremadi for my skin care for the past few years and recently started receiving hair laser treatments as well. I can vouch how happy I've been with both. Dr. Miremadi himself is simply amazing at what he does! Definitely a 10 out of 10!",
                                initials: "TB",
                            },
                            {
                                name: "Emily M.",
                                location: "San Diego, CA",
                                date: "Jan 2024",
                                text: "I would recommend Dr. Miremadi to everyone. I've been his patient for years and so has my family. He is thorough and kind and knows what he's doing. He is highly respected by his peers and patients.",
                                initials: "EM",
                            },
                            {
                                name: "Mojgan K.",
                                location: "San Diego, CA",
                                date: "Nov 2025",
                                text: "Dr Miremadi is very knowledgeable and has a lot of experience. He is fantastic in diagnosing skin issues. His professional and kind demeanor is a great assurance that you are in good hands. I highly recommend him.",
                                initials: "MK",
                            },
                        ].map((review, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.08 }}
                                className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-100 dark:border-slate-700 flex flex-col"
                            >
                                <div className="flex items-center gap-1 mb-4">
                                    {[...Array(5)].map((_, s) => (
                                        <svg key={s} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed flex-grow mb-4">
                                    "{review.text}"
                                </p>
                                <div className="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-700">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/80 to-secondary-DEFAULT/80 flex items-center justify-center text-white text-xs font-bold">
                                        {review.initials}
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-slate-900 dark:text-white">{review.name}</p>
                                        <p className="text-[11px] text-slate-400">{review.location} · {review.date}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="text-center mt-10">
                        <a
                            href="https://www.yelp.com/biz/arjang-k-miremadi-md-miremadi-dermatology-medical-clinic-la-jolla"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full font-bold text-sm uppercase tracking-wider hover:scale-105 hover:bg-white dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white border border-slate-900 dark:border-white transition-all"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12.773 11.39c-.263-.054-1.464-.498-1.708-.576-.244-.08-.455-.104-.634.158-.18.263-.604.758-.752.918-.148.16-.263.17-.526.116-.263-.054-1.107-.419-2.1-1.306-.775-.698-1.296-1.558-1.447-1.82-.15-.264-.016-.404.113-.535.116-.116.263-.302.395-.453.13-.15.173-.256.263-.427.088-.17.044-.319-.022-.453-.066-.134-.634-1.494-.868-2.044-.229-.537-.461-.465-.634-.473-.163-.008-.353-.01-.543-.01-.19 0-.498.072-.76.354-.262.282-1 .978-1 2.385 0 1.407 1.024 2.766 1.167 2.957.143.19 2.015 3.077 4.884 4.313.683.295 1.216.47 1.631.603.685.218 1.31.187 1.803.113.55-.082 1.693-.692 1.932-1.36.24-.67.24-1.243.168-1.361-.07-.12-.262-.19-.526-.244zm-5.072 6.93L7.7 18.32c-.01-.004-3.452-1.426-4.583-5.396C2.028 9.205 3.87 5.618 7.466 3.86A9.57 9.57 0 0112.02 2.78c5.283 0 9.584 4.3 9.584 9.584 0 5.283-4.3 9.584-9.584 9.584a9.56 9.56 0 01-4.318-1.028v-.001z"/>
                            </svg>
                            Read All Reviews on Yelp
                        </a>
                    </div>
                </div>
            </section>

            {/* Mirage Collection Promo */}
            <MirageSection />

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
                                        loading="lazy"
                                        decoding="async"
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
