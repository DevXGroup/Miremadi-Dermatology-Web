import React from 'react';
import { motion } from 'framer-motion';
import { Star, Award, Shield, Stethoscope } from 'lucide-react';
import { Link } from 'react-router-dom';

export const About = () => {
    return (
        <div className="pt-24 min-h-screen bg-white dark:bg-slate-950 pb-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-5xl md:text-6xl font-display font-medium text-slate-900 dark:text-white mb-6">
                            Arjang K. Miremadi, MD, FAAD
                        </h1>
                        <p className="text-xl text-slate-500 dark:text-slate-400">
                            Board Certified Dermatologist & Pathologist • 55+ Years of Experience
                        </p>
                    </motion.div>
                </div>

                {/* Main Content Grid */}
                <div className="grid lg:grid-cols-12 gap-16 items-start">

                    {/* Left: Image & Quick Stats */}
                    <div className="lg:col-span-5 space-y-8">
                        {/* Profile Image Placeholder - In real app, this would be the doctor's photo */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="aspect-[4/5] bg-slate-100 dark:bg-slate-900 rounded-3xl overflow-hidden shadow-2xl relative"
                        >
                            {/* You can replace this src with the actual image URL if available, or keep it as placeholder/upload later */}
                            <img
                                src="/dr-miremadi.jpg"
                                alt="Dr. Arjang Miremadi"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                                <div className="text-white">
                                    <div className="flex items-center gap-1 mb-2">
                                        {[1, 2, 3, 4, 5].map((s) => (
                                            <Star key={s} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                        ))}
                                    </div>
                                    <p className="font-medium">5 Star Rating</p>
                                    <p className="text-sm text-white/80">Based on verified reviews</p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Badges */}
                        <div className="grid grid-cols-2 gap-4">
                            <Badge icon={Award} label="Board Certified" sub="Dermatology & Pathology" />
                            <Badge icon={Shield} label="Naval Medical Corp" sub="Retired Captain" />
                            <Badge icon={Stethoscope} label="Cancer Screening" sub="Only Provider in SD County" />
                            <Badge icon={Star} label="55+ Years" sub="Medical Experience" />
                        </div>
                    </div>

                    {/* Right: Biography */}
                    <div className="lg:col-span-7 space-y-8">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                            className="prose prose-lg prose-slate dark:prose-invert max-w-none"
                        >
                            <h3 className="text-3xl font-display font-medium text-slate-900 dark:text-white mb-6">Biography</h3>

                            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                                Dr. Arjang K. Miremadi is a board certified Dermatologist and Pathologist (AP-CP) and a certified dermatopathologist who maintains an active practice as well as a teaching status in both Dermatology and Pathology. His <strong>38 years of experience</strong> in the medical field brings patients the finest in skin treatment, correction, and care.
                            </p>

                            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                                Dr. Miremadi serves the Dermatological needs of both adults and children in his <strong>La Jolla and El Centro, California</strong> practices. Realizing a universal desire for beautiful, healthy, clear skin, Dr. Miremadi spent several years evaluating all methods of skin rejuvenation and the latest technology to create the <strong>Miremadi System</strong>.
                            </p>

                            <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border-l-4 border-secondary-DEFAULT my-8">
                                <p className="italic text-slate-700 dark:text-slate-200 m-0">
                                    "The Miremadi System literally 'peels' away the years, along with wrinkles and unwanted spots. The dramatic results possible with this treatment brings radiant, younger looking skin to all patients regardless of age, race, color, or ethnic group."
                                </p>
                            </div>

                            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                                As an advocate for skin cancer prevention, Dr. Miremadi is the <strong>only provider of free skin cancer screening for the American Cancer Society in San Diego County</strong>.
                            </p>

                            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                                Dr. Miremadi completed his residency in Pathology at the University of Maryland Hospital and his residency in Dermatology at the National Naval Hospital in Bethesda, Maryland. As a <strong>retired Captain of the United States Navy Medical Corp</strong>, Dr. Miremadi shares his extensive knowledge with the Dermatology residents at the Naval Medical Center in San Diego, CA.
                            </p>
                        </motion.div>

                        <div className="pt-8 flex flex-wrap gap-4">
                            <Link
                                to="/contact"
                                className="px-8 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full font-medium hover:opacity-90 transition-opacity"
                            >
                                Schedule Consultation
                            </Link>
                            <Link
                                to="/services"
                                className="px-8 py-3 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-full font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                            >
                                View Services
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Badge = ({ icon: Icon, label, sub }: { icon: any, label: string, sub: string }) => (
    <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 flex flex-col items-center text-center gap-2 hover:border-secondary-DEFAULT/50 transition-colors cursor-default group">
        <div className="p-2 bg-white dark:bg-slate-800 rounded-full shadow-sm text-secondary-DEFAULT group-hover:scale-110 transition-transform">
            <Icon className="w-5 h-5" />
        </div>
        <div>
            <p className="font-bold text-slate-900 dark:text-white text-sm">{label}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">{sub}</p>
        </div>
    </div>
);
