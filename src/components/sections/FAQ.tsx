import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import { cn } from '../../lib/utils';

const faqs = [
    {
        question: "What should I do if I have a skin emergency?",
        answer: "If you are experiencing a medical emergency, please call 911 immediately. For urgent dermatological concerns during business hours, please call our office directly. We prioritize urgent cases whenever possible."
    },
    {
        question: "Under what insurance plans do you accept?",
        answer: "We accept most major PPO and HMO insurance plans including Blue Cross, Blue Shield, Aetna, Cigna, and United Healthcare. We strongly advise that you call our office to verify your specific coverage and ensure your plan is accepted prior to scheduling your appointment. Please call your health insurance to verify if Dr. Miremadi is in network with your insurance policy to avoid unexpected out of pocket expenses prior scheduling your appointment."
    },
    {
        question: "What should I bring to my appointment?",
        answer: "Please bring your photo ID, current insurance card, and a list of any medications you are currently taking. If you are a new patient, you can fill out our intake forms online before your visit to save time."
    },
    {
        question: "Do I need a referral to see a dermatologist?",
        answer: "This depends on your specific insurance plan. HMO plans typically require a referral from your primary care physician, while most PPO plans do not. We recommend checking with your insurance provider."
    },
    {
        question: "What are your hours of operation?",
        answer: "We are open Monday through Friday from 9:00 AM to 5:00 PM. We are closed on weekends and major holidays."
    }
];

export const FAQ = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="relative z-10 py-24 bg-surface-light dark:bg-slate-950">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-12">
                <div className="lg:col-span-5">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-5xl font-display font-medium text-slate-900 dark:text-white mb-6">
                            Frequently <br />
                            Asked <br />
                            <span className="text-primary">Questions</span>
                        </h2>
                        <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed">
                            Everything you need to know about our clinic, services, and policies. Can't find the answer you're looking for? Please contact our team.
                        </p>
                    </motion.div>
                </div>

                <div className="lg:col-span-7 space-y-4">
                    {faqs.map((faq, index) => (
                        <FAQItem
                            key={index}
                            question={faq.question}
                            answer={faq.answer}
                            isOpen={openIndex === index}
                            onClick={() => setOpenIndex(openIndex === index ? null : index)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

const FAQItem = ({ question, answer, isOpen, onClick }: { question: string, answer: string, isOpen: boolean, onClick: () => void, key?: React.Key }) => {
    return (
        <div className="border-b border-slate-200 dark:border-slate-800">
            <button
                onClick={onClick}
                className="w-full py-6 flex items-center justify-between text-left focus:outline-none group bg-transparent"
            >
                <span className={cn(
                    "text-lg font-medium transition-all duration-300 transform translate-z-0 opacity-100",
                    isOpen ? "text-primary" : "text-slate-900 dark:text-white group-hover:text-primary"
                )}>
                    {question}
                </span>
                <span className={cn(
                    "ml-6 flex-shrink-0 transition-transform duration-300 flex items-center justify-center w-6 h-6",
                    isOpen ? "rotate-45" : ""
                )}>
                    <Plus className={cn("w-5 h-5 transition-colors", isOpen ? "text-primary" : "text-slate-400")} />
                </span>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <p className="pb-6 text-slate-500 dark:text-slate-400 leading-relaxed">
                            {answer}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
