import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Clock } from 'lucide-react';
import { FAQ } from '../components/sections/FAQ';

export const Contact = () => {
    const [formState, setFormState] = React.useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormState('loading');

        const formData = new FormData(e.currentTarget);

        // Basic Sanitization: Strip any potential script tags from names and messages
        const sanitize = (str: string) => str.replace(/<script.*?>.*?<\/script>/gi, '').trim();

        const data = {
            name: sanitize(formData.get('name') as string),
            email: formData.get('email'),
            phone: formData.get('phone'),
            message: sanitize(formData.get('message') as string),
        };

        try {
            const response = await fetch('https://formspree.io/f/xvgzpyod', { // Using a temporary ID or email endpoint
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...data,
                    _to: 'miremadidermatology@gmail.com',
                    _subject: `New Contact Form Submission from ${data.name}`
                }),
            });

            if (response.ok) {
                setFormState('success');
                (e.target as HTMLFormElement).reset();
            } else {
                setFormState('error');
            }
        } catch (err) {
            setFormState('error');
        }
    };

    return (
        <div className="pt-24 min-h-screen bg-white dark:bg-slate-950">
            {/* Header */}
            <div className="bg-slate-50 dark:bg-slate-900/50 py-12 border-b border-slate-100 dark:border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-display font-medium text-slate-900 dark:text-white mb-4"
                    >
                        Contact Us
                    </motion.h1>
                    <p className="text-xl text-slate-50 max-w-2xl mx-auto">
                        We look forward to welcoming you to Miremadi Dermatology. Please use the form below or call us to schedule your appointment.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="grid lg:grid-cols-2 gap-16">

                    {/* Left: Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-white dark:bg-slate-900 rounded-3xl p-8 md:p-10 shadow-xl border border-slate-100 dark:border-slate-800"
                    >
                        <h2 className="text-2xl font-display font-bold text-slate-900 dark:text-white mb-6">Send us a Message</h2>

                        {formState === 'success' ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-green-50 dark:bg-green-900/20 p-8 rounded-2xl text-center border border-green-100 dark:border-green-800"
                            >
                                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white">
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                </div>
                                <h3 className="text-xl font-bold text-green-900 dark:text-green-400 mb-2">Message Sent!</h3>
                                <p className="text-green-700 dark:text-green-500">Thank you for reaching out. Our team will get back to you shortly.</p>
                                <button
                                    onClick={() => setFormState('idle')}
                                    className="mt-6 text-sm font-bold text-green-700 underline"
                                >
                                    Send another message
                                </button>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Full Name</label>
                                        <input
                                            required
                                            name="name"
                                            type="text"
                                            placeholder="John Doe"
                                            className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-secondary-DEFAULT outline-none transition-all dark:text-white"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Email Address</label>
                                        <input
                                            required
                                            name="email"
                                            type="email"
                                            placeholder="john@example.com"
                                            className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-secondary-DEFAULT outline-none transition-all dark:text-white"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Phone Number</label>
                                    <input
                                        name="phone"
                                        type="tel"
                                        placeholder="(858) 555-0123"
                                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-secondary-DEFAULT outline-none transition-all dark:text-white"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">How can we help?</label>
                                    <textarea
                                        required
                                        name="message"
                                        rows={4}
                                        placeholder="Tell us about your concern..."
                                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-secondary-DEFAULT outline-none transition-all dark:text-white resize-none"
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    disabled={formState === 'loading'}
                                    className="w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold text-lg hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                                >
                                    {formState === 'loading' ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                            Sending...
                                        </>
                                    ) : 'Send Message'}
                                </button>

                                {formState === 'error' && (
                                    <p className="text-red-500 text-sm font-medium text-center">Something went wrong. Please try again or call us directly.</p>
                                )}

                                <p className="text-[10px] text-slate-400 text-center uppercase tracking-widest mt-4">
                                    Your data is handled securely & protected by Formspree
                                </p>
                            </form>
                        )}
                    </motion.div>

                    {/* Right: Contact Details & Map */}
                    <div className="space-y-12">
                        <div className="grid gap-6">
                            <ContactCard
                                icon={Phone}
                                title="Call or Fax"
                                content={
                                    <div className="space-y-1">
                                        <p><span className="text-slate-400 w-12 inline-block font-bold">Tel:</span> <a href="tel:8584561840" className="hover:text-secondary-DEFAULT transition-colors font-semibold">(858) 456-1840</a></p>
                                        <p><span className="text-slate-400 w-12 inline-block font-bold">Fax:</span> (858) 456-9341</p>
                                    </div>
                                }
                            />

                            <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-100 dark:border-slate-800">
                                <div className="flex items-center gap-2 mb-4">
                                    <Clock className="w-5 h-5 text-secondary-DEFAULT" />
                                    <h3 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-xs">Office Hours</h3>
                                </div>
                                <div className="grid grid-cols-2 gap-y-2 text-sm">
                                    <span className="text-slate-500">Mon - Fri</span>
                                    <span className="text-right text-slate-900 dark:text-white font-medium">9:00 AM - 5:00 PM</span>
                                    <span className="text-slate-500">Sat - Sun</span>
                                    <span className="text-right text-slate-400 font-medium italic text-xs">Closed</span>
                                </div>
                            </div>

                            <ContactCard
                                icon={MapPin}
                                title="Physical Address"
                                content={
                                    <address className="not-italic leading-relaxed">
                                        7702-4 Ivanhoe Ave.<br />
                                        La Jolla, CA 92037
                                    </address>
                                }
                            />
                        </div>

                        {/* Map Widget */}
                        <div className="h-[250px] bg-slate-100 dark:bg-slate-900 rounded-3xl overflow-hidden relative border border-slate-200 dark:border-slate-800 shadow-inner">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3350.563826017254!2d-117.2735!3d32.7831!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80dc03e0a1234567%3A0xabcdef0123456789!2s7702%20Ivanhoe%20Ave%2C%20La%20Jolla%2C%20CA%2092037!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                title="Google Maps"
                                className="absolute inset-0 grayscale contrast-125 opacity-80 hover:grayscale-0 transition-all duration-500"
                            />
                            <div className="absolute bottom-4 left-4 right-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm p-3 rounded-xl shadow-lg flex justify-between items-center">
                                <p className="text-[10px] font-bold text-slate-900 dark:text-white">7702-4 Ivanhoe Ave, La Jolla</p>
                                <a
                                    href="https://maps.google.com/?q=7702+Ivanhoe+Ave+La+Jolla+CA+92037"
                                    target="_blank"
                                    className="text-[10px] text-secondary-DEFAULT font-bold uppercase tracking-wider hover:underline"
                                >
                                    Directions →
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <FAQ />
        </div>
    );
};

const ContactCard = ({ icon: Icon, title, content }: { icon: any, title: string, content: React.ReactNode }) => (
    <div className="flex items-start gap-4 p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800">
        <div className="p-3 bg-white dark:bg-slate-800 rounded-xl text-secondary-DEFAULT shadow-sm">
            <Icon className="w-5 h-5" />
        </div>
        <div>
            <h3 className="font-bold text-slate-900 dark:text-white mb-1 uppercase tracking-widest text-[10px] opacity-70">{title}</h3>
            <div className="text-slate-700 dark:text-slate-300 text-sm">{content}</div>
        </div>
    </div>
);
