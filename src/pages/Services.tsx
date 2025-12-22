import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Zap, Activity, Heart, ShieldCheck, Sun } from 'lucide-react';

export const Services = () => {
    return (
        <div className="pt-24 min-h-screen bg-white dark:bg-slate-950 pb-24">

            {/* Hero Section */}
            <section className="relative py-20 overflow-hidden">
                <div className="absolute inset-0 bg-slate-50 dark:bg-slate-900/20 -z-10" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-5xl md:text-6xl font-display font-medium text-slate-900 dark:text-white mb-6">
                            Advanced Dermatological <span className="text-secondary-DEFAULT">Solutions</span>
                        </h1>
                        <p className="text-xl text-slate-500 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
                            Experience the pinnacle of skin health and aesthetics with our comprehensive range of treatments, featuring the cutting-edge Venus concept technology.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Venus Treatments Grid - "The Circle of Services" */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="text-secondary-DEFAULT font-semibold tracking-wider uppercase text-sm">Our Technology</span>
                        <h2 className="text-3xl md:text-4xl font-display font-medium text-slate-900 dark:text-white mt-2">
                            Signature Venus Treatments
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <ServiceCard
                            title="Venus Bliss"
                            description="Non-invasive lipo and body contouring. Target stubborn fat and cellulite with effective laser technology for a slimmer silhouette."
                            image="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2940&auto=format&fit=crop"
                            tags={['Fat Reduction', 'Body Contouring']}
                        />
                        <ServiceCard
                            title="Venus Viva"
                            description="Advanced skin resurfacing using NanoFractional RF. Dramatically improves acne scars, wrinkles, enlarged pores, and uneven texture."
                            image="https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=2940&auto=format&fit=crop"
                            tags={['Acne Scars', 'Resurfacing']}
                        />
                        <ServiceCard
                            title="Venus Versa"
                            description="A versatile powerhouse for photofacials (IPL) to treat sun damage and discoloration, plus active acne treatments and skin rejuvenation."
                            image="https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=2940&auto=format&fit=crop"
                            tags={['IPL', 'Acne', 'Rejuvenation']}
                        />
                        <ServiceCard
                            title="Venus Freeze"
                            description="Anti-aging skin tightening that uses magnetic fields to boost collagen. Softens wrinkles and firms skin on the face, neck, and body."
                            image="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=2940&auto=format&fit=crop"
                            tags={['Anti-Aging', 'Skin Tightening']}
                        />
                    </div>
                </div>
            </section>

            {/* Hair Restoration Section */}
            <section className="py-20 bg-slate-50 dark:bg-slate-900/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <span className="text-secondary-DEFAULT font-semibold tracking-wider uppercase text-sm">Hair Restoration</span>
                            <h2 className="text-3xl md:text-4xl font-display font-medium text-slate-900 dark:text-white mt-2 mb-6">
                                Reclaim Your Confidence
                            </h2>
                            <div className="space-y-8">
                                <TreatmentRow
                                    title="Venus Artas Robotic Transplant"
                                    description="State-of-the-art robotic hair restoration using Artificial Intelligence. The ARTAS system identifies and extracts prime follicles for a precise, minimally invasive transplant with natural-looking results and no linear scarring."
                                />
                                <TreatmentRow
                                    title="Advanced Hair Fillers"
                                    description="Non-surgical scalp treatments designed to revitalize hair follicles, stimulate growth, and increase hair thickness for both men and women experiencing thinning."
                                />
                                <TreatmentRow
                                    title="Hair Treatment for Men & Women"
                                    description="Customized medical-grade protocols to address androgenic alopecia, stress-related loss, and scalp health, ensuring a holistic approach to hair wellness."
                                />
                            </div>
                        </div>
                        <div className="relative">
                            <div className="aspect-square rounded-full overflow-hidden border-8 border-white dark:border-slate-800 shadow-2xl">
                                <img
                                    src="https://images.unsplash.com/photo-1620331313123-6c26880bee7c?q=80&w=2940&auto=format&fit=crop"
                                    alt="Hair Restoration"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="absolute -bottom-6 -left-6 bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-xl max-w-xs">
                                <p className="font-medium text-slate-900 dark:text-white flex items-center gap-2">
                                    <Sparkles className="w-5 h-5 text-secondary-DEFAULT" />
                                    Advanced Robotics
                                </p>
                                <p className="text-sm text-slate-500 mt-2">Utilization of AI for precision and natural density.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Injectables & Skincare */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Injectables */}
                        <div className="bg-slate-50 dark:bg-slate-900 rounded-3xl p-8 md:p-12 relative overflow-hidden group">
                            <div className="relative z-10">
                                <div className="p-3 bg-white dark:bg-slate-800 rounded-xl w-fit mb-6 shadow-sm">
                                    <Zap className="w-6 h-6 text-secondary-DEFAULT" />
                                </div>
                                <h3 className="text-2xl font-display font-medium text-slate-900 dark:text-white mb-4">Injectables & Aesthetics</h3>
                                <p className="text-slate-500 dark:text-slate-400 mb-8 leading-relaxed">
                                    Refresh your look with our expert injectable treatments. We offer <strong>Botox</strong> to smooth fine lines and dynamic wrinkles, alongside a variety of dermal fillers to restore volume and contour the face naturally.
                                </p>
                                <ul className="space-y-3 mb-8">
                                    <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                                        <div className="w-1.5 h-1.5 rounded-full bg-secondary-DEFAULT" />
                                        Botox & Neuromodulators
                                    </li>
                                    <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                                        <div className="w-1.5 h-1.5 rounded-full bg-secondary-DEFAULT" />
                                        Dermal Fillers
                                    </li>
                                    <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                                        <div className="w-1.5 h-1.5 rounded-full bg-secondary-DEFAULT" />
                                        Facial Contouring
                                    </li>
                                </ul>
                                <Link to="/contact" className="inline-flex items-center gap-2 text-secondary-DEFAULT font-medium hover:gap-3 transition-all">
                                    Book Consult <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                            <img
                                src="https://images.unsplash.com/photo-1599305090598-fe179d501227?q=80&w=2788&auto=format&fit=crop"
                                alt="Injectables"
                                className="absolute top-0 right-0 w-1/2 h-full object-cover opacity-10 dark:opacity-20 group-hover:opacity-20 dark:group-hover:opacity-30 transition-opacity"
                            />
                        </div>

                        {/* Skincare */}
                        <div className="bg-slate-50 dark:bg-slate-900 rounded-3xl p-8 md:p-12 relative overflow-hidden group">
                            <div className="relative z-10">
                                <div className="p-3 bg-white dark:bg-slate-800 rounded-xl w-fit mb-6 shadow-sm">
                                    <Sun className="w-6 h-6 text-secondary-DEFAULT" />
                                </div>
                                <h3 className="text-2xl font-display font-medium text-slate-900 dark:text-white mb-4">Mirage Products</h3>
                                <p className="text-slate-500 dark:text-slate-400 mb-8 leading-relaxed">
                                    Discover our exclusive medical-grade skincare line, <strong>Mirage</strong>. Formulated with potent active ingredients, these products are designed to maintain your treatment results and promote long-term skin health at home.
                                </p>
                                <ul className="space-y-3 mb-8">
                                    <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                                        <div className="w-1.5 h-1.5 rounded-full bg-secondary-DEFAULT" />
                                        Medical-Grade Formulas
                                    </li>
                                    <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                                        <div className="w-1.5 h-1.5 rounded-full bg-secondary-DEFAULT" />
                                        Daily Maintenance Systems
                                    </li>
                                    <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                                        <div className="w-1.5 h-1.5 rounded-full bg-secondary-DEFAULT" />
                                        Anti-Aging Solutions
                                    </li>
                                </ul>
                                <Link to="/shop" className="inline-flex items-center gap-2 text-secondary-DEFAULT font-medium hover:gap-3 transition-all">
                                    Visit Shop <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                            <img
                                src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=2787&auto=format&fit=crop"
                                alt="Skincare"
                                className="absolute top-0 right-0 w-1/2 h-full object-cover opacity-10 dark:opacity-20 group-hover:opacity-20 dark:group-hover:opacity-30 transition-opacity"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

const ServiceCard = ({ title, description, image, tags }: { title: string, description: string, image: string, tags: string[] }) => (
    <motion.div
        whileHover={{ y: -5 }}
        className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-800 group"
    >
        <div className="aspect-square relative overflow-hidden">
            <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors z-10" />
            <img src={image} alt={title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
        </div>
        <div className="p-6">
            <div className="flex flex-wrap gap-2 mb-4">
                {tags.map((tag, i) => (
                    <span key={i} className="text-[10px] uppercase tracking-wider font-bold text-secondary-DEFAULT bg-secondary-DEFAULT/10 px-2 py-1 rounded-full">
                        {tag}
                    </span>
                ))}
            </div>
            <h3 className="text-xl font-display font-medium text-slate-900 dark:text-white mb-3 group-hover:text-secondary-DEFAULT transition-colors">
                {title}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                {description}
            </p>
        </div>
    </motion.div>
);

const TreatmentRow = ({ title, description }: { title: string, description: string }) => (
    <div className="flex gap-4">
        <div className="mt-1">
            <div className="w-8 h-8 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center text-secondary-DEFAULT shadow-sm">
                <Activity className="w-4 h-4" />
            </div>
        </div>
        <div>
            <h4 className="text-lg font-medium text-slate-900 dark:text-white mb-2">{title}</h4>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{description}</p>
        </div>
    </div>
);
