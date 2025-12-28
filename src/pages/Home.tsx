import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FAQ } from '../components/sections/FAQ';
import { Credentials } from '../components/ui/Credentials';
import { SERVICE_DATA } from '../lib/data';

export const Home = () => {
    return (
        <div className="pt-24 min-h-screen">
            {/* Hero Section */}
            <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-16">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="flex items-center mb-1 text-left">
                            <span className="text-sm font-bold text-secondary-dark uppercase tracking-[0.2em]">57+ Years of Medical Leadership</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-display font-medium leading-[1.1] mb-5">
                            Meticulous <span className="italic font-light text-primary">Care</span> <br />
                            for Your Skin.
                        </h1>

                        <div className="relative mb-6 pl-6 border-l-4 border-slate-200 dark:border-slate-700">
                            <p className="text-xl italic text-slate-600 dark:text-slate-300 font-display">
                                Your skin is the largest organ of the body which needs meticulous care
                            </p>
                            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mt-1.5">— Arjang K. Miremadi, M.D.</p>
                        </div>

                        <div className="flex gap-4">
                            <Link
                                to="/contact"
                                className="px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full font-medium hover:scale-105 hover:bg-primary dark:hover:bg-primary dark:hover:text-white transition-all uppercase tracking-wider text-sm cursor-pointer text-center"
                            >
                                Start Your Beauty Journey
                            </Link>
                            <Link
                                to="/services"
                                className="px-8 py-4 border border-slate-200 dark:border-slate-700 rounded-full font-medium hover:border-primary hover:text-primary dark:hover:hover:text-primary dark:hover:border-primary transition-all uppercase tracking-wider text-sm cursor-pointer text-center"
                            >
                                Explore Services
                            </Link>
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
                            src="/dr-miremadi-portrait-2.png"
                            alt="Dr. Arjang K. Miremadi"
                            className="w-full h-full object-cover object-top grayscale hover:grayscale-0 transition-all duration-700"
                        />

                        {/* Floating Expert Badge */}
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute bottom-10 -left-6 p-6 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 max-w-[200px] text-right"
                        >
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Dermatology, Pathology, & Dermatopathology</p>
                            <p className="text-sm font-bold text-slate-900 dark:text-white leading-tight">Triple-Certified Specialist</p>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Philosophy Section */}
            <section className="py-24 bg-white dark:bg-slate-950">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="text-xs font-bold text-primary uppercase tracking-[0.2em] mb-4 block">Our Philosophy</span>
                        <h2 className="text-4xl md:text-5xl font-display font-medium text-slate-900 dark:text-white mb-6">
                            Radiance Rooted in <span className="italic font-light text-slate-400">Science</span>
                        </h2>
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
                                className="group overflow-hidden rounded-3xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 hover:border-primary/30 transition-all hover:-translate-y-2"
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

            {/* Quick Services Preview */}
            <section className="bg-slate-50 dark:bg-slate-900/50 py-24 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-start mb-16">
                        <div>
                            <div className="flex items-center mb-4">
                                <span className="text-xs font-bold text-primary uppercase tracking-[0.4em] ml-[5px]">Clinical Excellence</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-display font-medium mb-6">
                                Our Medical & <br className="hidden md:block" />
                                <span className="italic font-light text-slate-400">Cosmetic Services</span>
                            </h2>
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
                            <div key={i} className="group bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300">
                                <div className="relative aspect-square rounded-2xl overflow-hidden mb-6 bg-slate-100">
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
                                <h3 className="text-xl font-medium mb-3 group-hover:text-primary transition-colors">{service.title}</h3>
                                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-4 line-clamp-3">
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
