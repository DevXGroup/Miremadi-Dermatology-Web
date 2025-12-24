import React from 'react';
import { motion } from 'framer-motion';
import { Scale, ShieldCheck, Truck, CreditCard, AlertTriangle, Stethoscope, RotateCcw, Gavel, FileText, CheckCircle, UserX, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export const TermsConditions = () => {
    return (
        <div className="pt-24 min-h-screen bg-slate-50 dark:bg-slate-950 pb-24">

            {/* Header */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="inline-flex items-center justify-center p-3 bg-white dark:bg-slate-900 rounded-2xl shadow-sm mb-6 border border-slate-100 dark:border-slate-800">
                        <Scale className="w-8 h-8 text-secondary-DEFAULT" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-display font-medium text-slate-900 dark:text-white mb-6">
                        Terms & Conditions
                    </h1>
                    <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
                        Please read these terms carefully before using our services or purchasing products. They protect both you and Miremadi Dermatology.
                    </p>
                    <p className="mt-4 text-sm font-medium text-slate-400 uppercase tracking-widest">
                        Last Updated: December 22, 2025
                    </p>
                </motion.div>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

                {/* THE RED BOX - PRESERVED & INTEGRATED */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 p-6 md:p-8 rounded-3xl shadow-sm relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <AlertTriangle className="w-24 h-24 text-red-600" />
                    </div>
                    <div className="relative z-10 flex flex-col md:flex-row gap-6 items-start md:items-center">
                        <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-xl text-red-600 dark:text-red-400 shrink-0">
                            <AlertTriangle className="w-6 h-6" />
                        </div>
                        <div>
                            <h4 className="text-xl font-bold text-red-700 dark:text-red-400 mb-2">IMPORTANT: FINAL SALE POLICY</h4>
                            <p className="text-red-700/80 dark:text-red-400/80 mb-0 font-medium text-base leading-relaxed">
                                Due to the hygienic nature and perishable quality of our cosmetic and skincare products, <strong>ALL ONLINE SALES ARE FINAL</strong>.
                                Once a product has been opened or used, it is non-usable for any other patient and cannot be returned or exchanged.
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Medical & Liability Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                    <PolicyCard
                        icon={Stethoscope}
                        title="No Medical Advice"
                        content="The content on this site is for informational purposes only. It is NOT a substitute for professional medical advice, diagnosis, or treatment. Never ignore professional medical advice because of something you have read here."
                        accent="blue"
                    />
                    <PolicyCard
                        icon={UserX}
                        title="No Doctor-Patient Relation"
                        content="Using this website, reading our blog, or purchasing non-prescription products does NOT establish a doctor-patient relationship between you and Dr. Miremadi. Such a relationship is only formed through an official in-office or telehealth consultation."
                        accent="purple"
                    />
                </div>

                {/* Main Terms Content */}
                <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100 dark:border-slate-800">
                    <h2 className="text-2xl font-display font-medium text-slate-900 dark:text-white mb-8 flex items-center gap-3">
                        <FileText className="w-6 h-6 text-secondary-DEFAULT" />
                        Comprehensive Terms
                    </h2>

                    <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-400">
                        <p className="lead text-lg mb-8">
                            By accessing Miremadi Dermatology online, you agree to comply with the following terms regarding your use of our platform and purchase of skincare formulations.
                        </p>

                        <div className="grid gap-8">
                            <TermSection
                                title="1. Product Efficacy & Results"
                                icon={Sparkles}
                            >
                                <p>
                                    Skincare outcomes vary by individual due to skin type, adherence to regimen, and environmental factors. We do not guarantee specific results.
                                    Testimonials and before/after photos represent typical results but are not a warranty of performance for every user.
                                </p>
                            </TermSection>

                            <TermSection
                                title="2. Purchases & Payment"
                                icon={CreditCard}
                            >
                                <p>
                                    We reserve the right to refuse any order you place with us. We may, in our sole discretion, limit or cancel quantities purchased per person or per order.
                                    You agree to provide current, complete, and accurate purchase and account information for all purchases made at our store.
                                </p>
                            </TermSection>

                            <TermSection
                                title="3. Shipping & Risk of Loss"
                                icon={Truck}
                            >
                                <p>
                                    All items purchased from Miremadi Dermatology are made pursuant to a shipment contract. This means that the risk of loss and title for such items pass to you upon our delivery to the carrier.
                                    While we assist with tracking, we are not liable for lost or stolen packages once marked as delivered.
                                </p>
                            </TermSection>

                            <TermSection
                                title="4. Damaged or Defective Items"
                                icon={RotateCcw}
                            >
                                <p>
                                    While we have a strict no-return policy on open goods, if your product arrives <b>damaged</b> or <b>defective</b>, you must notify us within 48 hours of delivery.
                                    We may require photo evidence of the damage. In such verified cases, we will provide a replacement at no cost.
                                </p>
                            </TermSection>

                            <TermSection
                                title="5. Governing Law"
                                icon={Gavel}
                            >
                                <p>
                                    These Terms shall be governed by and construed in accordance with the laws of the State of California, United States.
                                    Any dispute arising from these terms or your use of the services shall be resolved exclusively in the state or federal courts located in San Diego County, California.
                                </p>
                            </TermSection>
                        </div>
                    </div>
                </div>

                {/* Footer Section */}
                <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 md:p-10 shadow-sm border border-slate-100 dark:border-slate-800 text-center">
                    <h3 className="text-xl font-medium text-slate-900 dark:text-white mb-4">Questions about our Terms?</h3>
                    <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-md mx-auto">
                        If you have unclear situations regarding a return or product usage, please reach out to our team before purchasing.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Link to="/contact" className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-medium hover:opacity-90 transition-opacity">
                            Contact Support
                        </Link>
                        <Link to="/legal/privacy-policy" className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                            View Privacy Policy
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    );
};

// Sub-components re-implemented locally to match Privacy Policy style

const PolicyCard = ({ icon: Icon, title, content, accent }: { icon: any, title: string, content: string, accent: 'blue' | 'purple' }) => {
    const colors = {
        blue: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 border-blue-100 dark:border-blue-900/30',
        purple: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400 border-indigo-100 dark:border-indigo-900/30'
    };

    return (
        <div className={`p-6 md:p-8 rounded-3xl border ${colors[accent]} h-full`}>
            <div className="flex items-center gap-3 mb-4">
                <Icon className="w-6 h-6" />
                <h3 className="font-bold text-lg">{title}</h3>
            </div>
            <p className="text-sm md:text-base leading-relaxed opacity-90 font-medium">
                {content}
            </p>
        </div>
    );
};

const TermSection = ({ title, icon: Icon, children }: { title: string, icon: any, children: React.ReactNode }) => {
    return (
        <div className="flex gap-4 md:gap-6 pb-8 border-b border-slate-100 dark:border-slate-800 last:border-0 last:pb-0">
            <div className="hidden md:flex flex-shrink-0 mt-1">
                <div className="w-10 h-10 rounded-full bg-secondary-DEFAULT/10 flex items-center justify-center text-secondary-DEFAULT">
                    <Icon className="w-5 h-5" />
                </div>
            </div>
            <div>
                <div className="flex items-center gap-3 md:hidden mb-3">
                    <div className="w-8 h-8 rounded-full bg-secondary-DEFAULT/10 flex items-center justify-center text-secondary-DEFAULT">
                        <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white">{title}</h3>
                </div>
                <h3 className="hidden md:block font-bold text-lg text-slate-900 dark:text-white mb-3">{title}</h3>
                <div className="text-slate-600 dark:text-slate-400 text-base leading-relaxed">
                    {children}
                </div>
            </div>
        </div>
    );
};
