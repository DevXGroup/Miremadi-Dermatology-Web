import React from 'react';
import { motion } from 'framer-motion';
import { FAQ } from '../components/sections/FAQ';
import { Credentials } from '../components/ui/Credentials';
import { SERVICE_DATA } from '../lib/data';

export const Home = () => {
    return (
        <div className="pt-24 min-h-screen">
            {/* Hero Section */}
            <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-20">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="flex items-center mb-6 text-left">
                            <span className="text-sm font-bold text-secondary-dark uppercase tracking-[0.2em]">55+ Years of Medical Leadership</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-display font-medium leading-tight mb-6">
                            Meticulous <span className="italic font-light text-primary-DEFAULT">Care</span> <br />
                            for Your Skin.
                        </h1>

                        <div className="relative mb-8 pl-6 border-l-4 border-slate-200 dark:border-slate-700">
                            <p className="text-xl italic text-slate-600 dark:text-slate-300 font-display">
                                "Skin is the largest organ of the body which needs a meticulous care"
                            </p>
                            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mt-2">— Arjang K. Miremadi, M.D.</p>
                        </div>

                        <div className="flex gap-4">
                            <button className="px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full font-medium hover:scale-105 transition-transform uppercase tracking-wider text-sm">
                                Start Your Beauty Journey
                            </button>
                            <button className="px-8 py-4 border border-slate-200 dark:border-slate-700 rounded-full font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors uppercase tracking-wider text-sm">
                                Explore Services
                            </button>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative h-[600px] bg-slate-100 dark:bg-slate-800 rounded-[2.5rem] overflow-hidden border-8 border-white dark:border-slate-800 shadow-2xl"
                    >
                        {/* Using the image from the old Hero component directly */}
                        <img
                            src="/dr-miremadi.jpg"
                            alt="Dr. Arjang K. Miremadi"
                            className="w-full h-full object-cover"
                        />

                        {/* Floating Expert Badge */}
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute bottom-10 -left-6 p-6 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 max-w-[200px]"
                        >
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Dermatopathologist</p>
                            <p className="text-sm font-bold text-slate-900 dark:text-white leading-tight">Triple-Certified Specialist</p>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Quick Services Preview */}
            <section className="bg-slate-50 dark:bg-slate-900/50 py-24 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 px-2">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <span className="w-10 h-[2px] bg-secondary-DEFAULT"></span>
                                <span className="text-xs font-bold text-secondary-DEFAULT uppercase tracking-[0.4em]">Clinical Excellence</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-display font-medium mb-6">
                                Our Medical & <br className="hidden md:block" />
                                <span className="italic font-light text-slate-400">Cosmetic Services</span>
                            </h2>
                            <div className="mt-8">
                                <Credentials />
                            </div>
                        </div>
                        <p className="text-slate-500 max-w-md text-right hidden md:block leading-relaxed">
                            Our boutique practice combines 40 years of pathology and dermatology expertise for precision results. Hablamos Español.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {SERVICE_DATA.map((service, i) => (
                            <div key={i} className="group bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300">
                                <div className="relative aspect-square rounded-2xl overflow-hidden mb-6 bg-slate-100">
                                    <img
                                        src={service.img}
                                        alt={service.title}
                                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span className="px-3 py-1 bg-white/90 dark:bg-slate-900/90 backdrop-blur rounded-full text-[10px] font-bold uppercase tracking-widest text-slate-900 dark:text-white">
                                            {service.type}
                                        </span>
                                    </div>
                                </div>
                                <h3 className="text-xl font-medium mb-3 group-hover:text-secondary-DEFAULT transition-colors">{service.title}</h3>
                                <p className="text-slate-500 text-sm leading-relaxed mb-4 line-clamp-3">
                                    {service.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <FAQ />
        </div>
    );
};
