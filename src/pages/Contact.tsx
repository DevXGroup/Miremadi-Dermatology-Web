import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Calendar } from 'lucide-react';
import { FAQ } from '../components/sections/FAQ';

export const Contact = () => {
    return (
        <div className="pt-24 min-h-screen bg-white dark:bg-slate-950">
            {/* Header */}
            <div className="bg-slate-50 dark:bg-slate-900/50 py-20 border-b border-slate-100 dark:border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-display font-medium text-slate-900 dark:text-white mb-6"
                    >
                        Get in Touch
                    </motion.h1>
                    <p className="text-xl text-slate-500 max-w-2xl mx-auto">
                        We look forward to welcoming you to Miremadi Dermatology. Please contact us to schedule your appointment.
                    </p>
                    <div className="mt-8 flex items-center justify-center gap-2">
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wide">English</span>
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold uppercase tracking-wide">Español</span>
                        <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-bold uppercase tracking-wide">Farsi</span>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                <div className="grid lg:grid-cols-2 gap-16">

                    {/* Contact Info */}
                    <div className="space-y-12">
                        <div>
                            <h2 className="text-2xl font-display font-medium text-slate-900 dark:text-white mb-8">Contact Information</h2>
                            <div className="grid gap-6">
                                <ContactCard
                                    icon={Phone}
                                    title="Phone & Fax"
                                    content={
                                        <div className="space-y-1">
                                            <p><span className="text-slate-400 w-12 inline-block">Tel:</span> <a href="tel:8584561840" className="hover:text-secondary-DEFAULT transition-colors">(858) 456-1840</a></p>
                                            <p><span className="text-slate-400 w-12 inline-block">Fax:</span> (858) 456-9341</p>
                                        </div>
                                    }
                                />
                                <ContactCard
                                    icon={Mail}
                                    title="Email"
                                    content={<a href="mailto:info@drmiremadi.com" className="hover:text-secondary-DEFAULT transition-colors">info@drmiremadi.com</a>}
                                />
                                <ContactCard
                                    icon={MapPin}
                                    title="La Jolla Office"
                                    content={
                                        <address className="not-italic">
                                            7702-4 Ivanhoe Ave.<br />
                                            La Jolla, CA 92037
                                        </address>
                                    }
                                />
                            </div>
                        </div>

                        <div>
                            <h2 className="text-2xl font-display font-medium text-slate-900 dark:text-white mb-8">Office Hours</h2>
                            <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-8 border border-slate-100 dark:border-slate-800">
                                <div className="space-y-4">
                                    <h3 className="font-medium text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-700 pb-2">La Jolla</h3>
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div className="text-slate-500">Monday</div>
                                        <div className="text-right text-slate-900 dark:text-white">9:00 AM - 5:00 PM</div>

                                        <div className="text-slate-500">Wednesday</div>
                                        <div className="text-right text-slate-900 dark:text-white">9:00 AM - 5:00 PM</div>

                                        <div className="text-slate-500">Thursday (Alt)</div>
                                        <div className="text-right text-slate-900 dark:text-white">9:00 AM - 5:00 PM</div>

                                        <div className="text-slate-500">Friday</div>
                                        <div className="text-right text-slate-900 dark:text-white">9:00 AM - 5:00 PM</div>
                                    </div>

                                    <div className="pt-4 mt-4 border-t border-slate-200 dark:border-slate-700">
                                        <p className="text-xs text-slate-400 italic text-center">
                                            * We also see patients in El Centro on Tuesdays and alternate Thursdays. Please call for details.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Map Placeholder */}
                    <div className="h-full min-h-[400px] bg-slate-100 dark:bg-slate-900 rounded-3xl overflow-hidden relative">
                        {/* This would be a Google Map embed in a real app */}
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3350.563826017254!2d-117.2735!3d32.7831!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80dc03e0a1234567%3A0xabcdef0123456789!2s7702%20Ivanhoe%20Ave%2C%20La%20Jolla%2C%20CA%2092037!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            className="absolute inset-0 grayscale contrast-125 opacity-80 hover:grayscale-0 transition-all duration-500"
                        />
                        <div className="absolute bottom-4 left-4 bg-white dark:bg-slate-900 p-4 rounded-xl shadow-lg max-w-xs">
                            <p className="font-bold text-slate-900 dark:text-white">Miremadi Dermatology</p>
                            <p className="text-xs text-slate-500 mt-1">7702-4 Ivanhoe Ave, La Jolla</p>
                            <a
                                href="https://maps.google.com/?q=7702+Ivanhoe+Ave+La+Jolla+CA+92037"
                                target="_blank"
                                className="text-xs text-secondary-DEFAULT font-medium mt-2 block hover:underline"
                            >
                                Get Directions →
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <FAQ />
        </div>
    );
};

const ContactCard = ({ icon: Icon, title, content }: { icon: any, title: string, content: React.ReactNode }) => (
    <div className="flex items-start gap-4 p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 transition-colors hover:border-secondary-DEFAULT/30">
        <div className="p-3 bg-white dark:bg-slate-800 rounded-xl text-secondary-DEFAULT shadow-sm">
            <Icon className="w-6 h-6" />
        </div>
        <div>
            <h3 className="font-medium text-slate-900 dark:text-white mb-1">{title}</h3>
            <div className="text-slate-500 dark:text-slate-400 text-sm">{content}</div>
        </div>
    </div>
);
