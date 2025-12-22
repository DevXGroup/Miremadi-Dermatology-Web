import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, FileText, AlertTriangle, Truck, Megaphone, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export const PrivacyPolicy = () => {
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
                        <Shield className="w-8 h-8 text-secondary-DEFAULT" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-display font-medium text-slate-900 dark:text-white mb-6">
                        Privacy Policy & Liability
                    </h1>
                    <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
                        We value your trust. This policy outlines how we handle your data, our liability limitations, and the terms of your purchase participation.
                    </p>
                    <p className="mt-4 text-sm font-medium text-slate-400 uppercase tracking-widest">
                        Last Updated: December 22, 2025
                    </p>
                </motion.div>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

                {/* Critical Disclaimers Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                    <PolicyCard
                        icon={AlertTriangle}
                        title="Non-Medical Platform"
                        content="We do NOT collect any medical patient information on this website. This platform is strictly for retail purposes. No doctor-patient relationship is established through your use of this site or purchase of products."
                        accent="amber"
                    />
                    <PolicyCard
                        icon={SparklesIcon}
                        title="Cosmetic Use Only"
                        content="All products sold on this website are purely for cosmetic reasons. We do NOT sell prescription medications online. Any result claims are for cosmetic improvement and not medical treatment."
                        accent="purple"
                    />
                </div>

                {/* Main Content Card */}
                <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100 dark:border-slate-800">
                    <h2 className="text-2xl font-display font-medium text-slate-900 dark:text-white mb-8 flex items-center gap-3">
                        <CheckCircle className="w-6 h-6 text-secondary-DEFAULT" />
                        Consent & Liability Release
                    </h2>

                    <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-400">
                        <p className="lead text-lg mb-6">
                            By checking the agreement box and completing your purchase, you explicitly acknowledge and agree to the following terms:
                        </p>

                        <div className="grid gap-6 mb-8">
                            <AgreementPoint
                                title="Voluntary Data Provision"
                                text="You are willingly providing your name, shipping address, phone number, and email address. You understand this information is required strictly for shipping purposes and order communication."
                            />
                            <AgreementPoint
                                title="Liability Release"
                                text="You hereby release Miremadi Dermatology, Dr. Arjang K. Miremadi, and all associated staff from any liability regarding the use of these cosmetic products. You understand that the doctor's office is not liable for adverse reactions or dissatisfaction with cosmetic results."
                            />
                            <AgreementPoint
                                title="Use of Information"
                                text="You authorize us to use your provided contact information for the specific purposes of shipping your cosmetic products and delivering relevant advertising or promotional materials regarding our services."
                            />
                        </div>

                        <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700">
                            <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">Final Sale Policy</h3>
                            <p className="text-sm m-0">
                                Please refer to our <Link to="/legal/terms-conditions" className="text-secondary-DEFAULT font-medium hover:underline">Terms & Conditions</Link>. <b>All sales of cosmetic products are final.</b> Due to hygiene standards, we cannot accept returns on opened items. By purchasing, you waive the right to return these goods based on personal preference.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Data Handling Sections */}
                <div className="grid md:grid-cols-3 gap-6">
                    <InfoCard
                        icon={Truck}
                        title="Shipping Execution"
                        content="Your address is used solely to generate shipping labels and ensure your products arrive safely. We share this distinct data with trusted carriers (e.g., USPS, UPS)."
                    />
                    <InfoCard
                        icon={Megaphone}
                        title="Marketing & Ads"
                        content="We may use your email or purchase history to personalize advertising, keeping you informed about new skincare arrivals and exclusive clinic offers."
                    />
                    <InfoCard
                        icon={Lock}
                        title="Security First"
                        content="We implement industry-standard security measures. We do not sell your personal data to third-party data brokers."
                    />
                </div>

                {/* California Rights */}
                <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 md:p-10 shadow-sm border border-slate-100 dark:border-slate-800">
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl text-blue-600 dark:text-blue-400">
                            <FileText className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-xl font-medium text-slate-900 dark:text-white mb-2">California Privacy Rights (CCPA/CPRA)</h3>
                            <p className="text-slate-600 dark:text-slate-400 mb-4">
                                Residents of California have specific rights regarding their personal data, including the right to access, delete, and opt-out of data sharing.
                            </p>
                            <Link to="/contact" className="text-sm font-medium text-secondary-DEFAULT hover:underline">
                                Contact us to exercise your rights &rarr;
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Contact Footer */}
                <div className="text-center pt-8 border-t border-slate-200 dark:border-slate-800">
                    <p className="text-slate-500 dark:text-slate-400">
                        Questions about this policy? Contact our Privacy Officer at <a href="mailto:info@drmiremadi.com" className="text-secondary-DEFAULT hover:underline">info@drmiremadi.com</a>
                    </p>
                </div>

            </div>
        </div>
    );
};

// Components

const PolicyCard = ({ icon: Icon, title, content, accent }: { icon: any, title: string, content: string, accent: 'amber' | 'purple' }) => {
    const colors = {
        amber: 'bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400 border-amber-100 dark:border-amber-900/30',
        purple: 'bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400 border-purple-100 dark:border-purple-900/30'
    };

    return (
        <div className={`p-6 rounded-2xl border ${colors[accent]}`}>
            <div className="flex items-center gap-3 mb-3">
                <Icon className="w-6 h-6" />
                <h3 className="font-bold text-lg">{title}</h3>
            </div>
            <p className="text-sm leading-relaxed opacity-90 font-medium">
                {content}
            </p>
        </div>
    );
};

const AgreementPoint = ({ title, text }: { title: string, text: string }) => (
    <div className="flex gap-4">
        <div className="mt-1 flex-shrink-0">
            <div className="w-6 h-6 rounded-full bg-secondary-DEFAULT/10 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-secondary-DEFAULT" />
            </div>
        </div>
        <div>
            <h4 className="font-bold text-slate-900 dark:text-white text-sm uppercase tracking-wide mb-1">{title}</h4>
            <p className="text-base text-slate-600 dark:text-slate-400 bg-transparent m-0">
                {text}
            </p>
        </div>
    </div>
);

const InfoCard = ({ icon: Icon, title, content }: { icon: any, title: string, content: string }) => (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover:border-secondary-DEFAULT/30 transition-colors">
        <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl w-fit text-slate-900 dark:text-white mb-4">
            <Icon className="w-5 h-5" />
        </div>
        <h4 className="font-medium text-slate-900 dark:text-white mb-2">{title}</h4>
        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            {content}
        </p>
    </div>
);

const SparklesIcon = ({ className }: { className?: string }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9-9 9-9-1.8-9-9 1.8-9 9-9" />
        <path d="M12 8a4 4 0 1 0 0 8 4 4 0 1 0 0-8" />
        <path d="m9 12 2 2 4-4" />
    </svg>
);
