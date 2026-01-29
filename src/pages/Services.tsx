import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Activity, Heart, ShieldCheck, Sun } from 'lucide-react';

export const Services = () => {
    return (
        <div className="pt-24 min-h-screen bg-white dark:bg-slate-950 pb-12 md:pb-24">

            {/* Hero Section */}
            <section className="relative py-16 overflow-hidden">
                <div className="absolute inset-0 bg-slate-50 dark:bg-slate-900/20 -z-10" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-5xl md:text-6xl font-display font-medium text-slate-900 dark:text-white mb-4">
                            Advanced Dermatological <span className="text-primary">Solutions</span>
                        </h1>
                        <p className="text-xl text-slate-500 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
                            Experience the pinnacle of skin health and aesthetics with our comprehensive range of treatments, featuring the cutting-edge Venus concept technology.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Cosmetic Section */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="text-primary font-semibold tracking-wider uppercase text-sm">Cosmetic Dermatology</span>
                        <motion.h2
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-3xl md:text-4xl font-display font-medium text-slate-900 dark:text-white mt-2"
                        >
                            Advanced Aesthetic Solutions
                        </motion.h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                        <ServiceCard
                            title="Venus Bliss"
                            description="Non-invasive laser lipolysis for body contouring, targeting fat reduction in the abdomen and flanks with no downtime."
                            image="https://device-trade.com/cdn/shop/files/Bliss2_grande.jpg?v=1723847298"
                            tags={['Fat Reduction', 'Body Contouring']}
                        />
                        <ServiceCard
                            title="Venus Viva MD"
                            description="NanoFractional RF skin resurfacing treatment for scars, rosacea, texture, enlarged pores, and pigmentation with minimal downtime."
                            image="https://bimedis.com/img/vimg/241426/big"
                            tags={['Acne Scars', 'Resurfacing']}
                        />
                        <ServiceCard
                            title="Venus Freeze"
                            description="FDA-approved treatment for cellulite and loose skin using magnetic pulses to stimulate collagen."
                            image="https://www.medprolasers.com/wp-content/uploads/2020/11/IMG_3184-rotated.jpg"
                            tags={['Cellulite', 'Skin Tightening']}
                        />
                        <ServiceCard
                            title="Botox & Fillers"
                            description="Reduce fine lines and wrinkles and restore volume for a youthful, refreshed appearance."
                            image="/images/services/botox_fillers.png"
                            tags={['Anti-Aging', 'Volume']}
                        />
                        <ServiceCard
                            title="Laser Hair Removal"
                            description="Safe and effective hair reduction for all skin types using the latest medical-grade laser technology."
                            image="/images/services/laser_hair_removal.png"
                            tags={['Hair Reduction', 'Smooth Skin']}
                        />
                        <ServiceCard
                            title="Chemical Peels"
                            description="Exfoliating treatments to improve skin texture, tone, and clarity by removing damaged outer layers."
                            image="https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&q=80&w=400"
                            tags={['Exfoliation', 'Rejuvenation']}
                        />
                        <ServiceCard
                            title="Vein Therapy"
                            description="Fast disappearance of noticeable veins through specialized laser and clinical techniques."
                            image="/images/services/vein_therapy.png"
                            tags={['Vascular', 'Laser Treatment']}
                        />
                    </div>
                </div>
            </section>

            {/* Injectables Section */}
            <section className="py-16 bg-slate-50 dark:bg-slate-900/40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <span className="text-primary font-semibold tracking-wider uppercase text-sm">Injectables</span>
                            <motion.h2
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="text-3xl md:text-4xl font-display font-medium text-slate-900 dark:text-white mt-2 mb-6"
                            >
                                Restore & Rejuvenate
                            </motion.h2>
                            <p className="text-slate-500 dark:text-slate-400 mb-8 leading-relaxed">
                                Our expert cosmetic injectors use a combination of neuromodulators, fillers, and boosters to achieve natural, youthful results tailored to your unique facial structure.
                            </p>

                            <div className="space-y-6">
                                <TreatmentRow
                                    title="Botox & Neuromodulators"
                                    description="Smooth fine lines and dynamic wrinkles for a refreshed look."
                                    image="/images/services/botox_treatment.png"
                                />
                                <TreatmentRow
                                    title="Dermal Fillers"
                                    description="Restore lost volume and contour features with premium fillers."
                                    image="/images/services/dermal_fillers.png"
                                />
                                <TreatmentRow
                                    title="Collagen Boosters"
                                    description="Injectable treatments that stimulate your own collagen production."
                                    image="/images/services/collagen_boosters.png"
                                />
                            </div>
                        </div>
                        <div className="h-full min-h-[350px] lg:min-h-[500px] rounded-3xl overflow-hidden shadow-xl">
                            <img src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=1200" alt="Injectables" className="w-full h-full object-cover" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Hair Growth Section */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="relative order-last lg:order-first">
                            <ScannerCircle />
                        </div>
                        <div>
                            <span className="text-primary font-semibold tracking-wider uppercase text-sm">Hair Growth</span>
                            <motion.h2
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="text-3xl md:text-4xl font-display font-medium text-slate-900 dark:text-white mt-2 mb-6"
                            >
                                Advanced Hair Solutions
                            </motion.h2>
                            <div className="space-y-8">
                                <TreatmentRow
                                    title="Hair Filler (Injectable)"
                                    description="Non-surgical scalp treatments designed to revitalize hair follicles, stimulate growth, and increase hair thickness."
                                    image="/images/services/hair_filler.png"
                                />
                                <TreatmentRow
                                    title="Peptides (Hair Drops)"
                                    description="Targeted topical peptide therapy to support follicle health and promote active growth phases."
                                    image="/images/services/peptide_scalp_application.webp"
                                />
                                <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                                    <p className="text-sm font-medium text-slate-900 dark:text-white mb-4">Comprehensive Care For:</p>
                                    <div className="grid gap-4">
                                        <TreatmentRow
                                            title="Male Pattern Baldness"
                                            description="Medical treatments using peptides, prescription medications, and injectable therapies to halt hair loss and stimulate regrowth."
                                            image="https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&q=80&w=400"
                                        />
                                        <TreatmentRow
                                            title="Female Hair Thinning"
                                            description="Customized solutions addressing hormonal and stress-related thinning."
                                            image="/images/services/female_hair_thinning.png"
                                        />
                                        <TreatmentRow
                                            title="Alopecia Areata"
                                            description="Medical management for autoimmune hair loss conditions."
                                            image="/images/services/hair_treatment.png"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* General Medical Section */}
            <section className="py-16 bg-slate-50 dark:bg-slate-900/40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="text-primary font-semibold tracking-wider uppercase text-sm">Medical Dermatology</span>
                        <motion.h2
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-3xl md:text-4xl font-display font-medium text-slate-900 dark:text-white mt-2"
                        >
                            Expert Medical Care
                        </motion.h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <ServiceCard
                            title="General Dermatology"
                            description="Diagnosis and treatment of all skin, hair, and nail conditions. From rashes to chronic diseases, we provide expert medical management."
                            image="/images/services/general_dermatology.png"
                            tags={['Skin', 'Hair', 'Nails']}
                        />
                        <ServiceCard
                            title="Acne Treatment"
                            description="Customized plans involving topicals, lasers, and lifestyle changes to clear skin and prevent scarring."
                            image="/images/services/acne_treatment_new.png"
                            tags={['Clear Skin', 'Therapy']}
                        />
                        <ServiceCard
                            title="Skin Cancer Screening"
                            description="Comprehensive full-body exams for early detection using advanced dermoscopy for accuracy."
                            image="/images/services/skin_cancer_screening.png"
                            tags={['Prevention', 'Early Detection']}
                        />
                        <ServiceCard
                            title="Skin Cancer Surgery"
                            description="Precise surgical removal of cancerous lesions with a focus on medical cure and optimal cosmetic outcomes."
                            image="/images/services/skin_cancer_surgery.webp"
                            tags={['Surgery', 'Treatment']}
                        />
                        <ServiceCard
                            title="Psoriasis Care"
                            description="Advanced biologic and topical therapies for managing chronic psoriasis and improving quality of life."
                            image="/images/services/psoriasis_care.png"
                            tags={['Medical', 'Therapy']}
                        />
                        <ServiceCard
                            title="Earlobe Repair"
                            description="Surgical correction for torn, stretched, or gauged earlobes to restore a natural appearance."
                            image="/images/services/earlobe_repair.png"
                            tags={['Repair', 'Surgery']}
                        />
                    </div>
                </div>
            </section>
        </div>
    );
};

const ScannerCircle = () => {
    const slides = [
        {
            image: "/images/services/hair_density_restoration_consult.webp",
            position: "object-center",
            text: "Restore Density"
        },
        {
            image: "/images/services/peptide_injection_therapy.webp",
            position: "object-center",
            text: "Peptide Therapy"
        },
        {
            image: "/images/services/female_hair_thinning.png",
            position: "object-center",
            text: "Real Results"
        },
        {
            image: "/images/services/hair_treatment.png",
            position: "object-center",
            text: "Expert Care"
        }
    ];

    const [index, setIndex] = React.useState(0);

    React.useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % slides.length);
        }, 3500);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="aspect-square rounded-full overflow-hidden border-8 border-white dark:border-slate-800 shadow-2xl relative bg-slate-100 group cursor-default">
            <AnimatePresence mode='wait'>
                <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    className="absolute inset-0 w-full h-full"
                >
                    <img
                        src={slides[index].image}
                        className={`w-full h-full object-cover ${slides[index].position}`}
                        alt="Hair Restoration"
                    />
                    <div className="absolute inset-0 bg-black/20" />
                </motion.div>
            </AnimatePresence>

            {/* Animated Text Overlay - Bottom Banner */}
            <div className="absolute bottom-6 left-0 right-0 z-20 flex justify-center w-full">
                <AnimatePresence mode='wait'>
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.4 }}
                        className="bg-white/95 dark:bg-slate-950/90 backdrop-blur-md py-3 w-full text-center border-y border-white/20 shadow-sm"
                    >
                        <span className="font-display font-medium text-slate-900 dark:text-white text-sm tracking-wider uppercase">
                            {slides[index].text}
                        </span>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Scanner Line */}
            <motion.div
                animate={{ top: ['0%', '100%', '0%'] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent z-10 shadow-[0_0_15px_rgba(var(--primary-rgb),0.5)] opacity-60"
            />

            {/* Overlay Gradient for professionalism */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-slate-900/10 pointer-events-none" />
        </div>
    );
};

const ServiceCard = ({ title, description, image, tags }: { title: string, description: string, image: string, tags: string[] }) => (
    <motion.div
        whileHover={{ y: -8, transition: { duration: 0.3, ease: "easeOut" } }}
        className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-100 dark:border-slate-800 group transition-all duration-300"
    >
        <div className="aspect-[4/5] relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10" />
            <img
                src={image}
                alt={title}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
            />
            <div className="absolute top-4 right-4 z-20 flex flex-wrap gap-2 justify-end">
                {tags.map((tag, i) => (
                    <span key={i} className="text-[10px] uppercase tracking-wider font-bold text-slate-900 bg-primary-light/95 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg border border-white/20">
                        {tag}
                    </span>
                ))}
            </div>
        </div>
        <div className="p-6 relative">
            <h3 className="text-xl font-display font-medium text-slate-900 dark:text-white mb-3 group-hover:text-primary transition-colors">
                {title}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-4 line-clamp-3">
                {description}
            </p>
        </div>
    </motion.div>
);

const TreatmentRow = ({ title, description, image }: { title: string, description: string, image?: string }) => (
    <div className="flex gap-6 items-start group p-4 -mx-4 rounded-2xl hover:bg-white dark:hover:bg-slate-900/50 hover:shadow-sm transition-all duration-300">
        {image ? (
            <div className="w-24 h-24 shrink-0 rounded-2xl overflow-hidden transition-all duration-500 shadow-md group-hover:shadow-lg border border-white dark:border-slate-800">
                <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            </div>
        ) : (
            <div className="w-24 h-24 shrink-0 flex items-center justify-center rounded-2xl bg-primary/5 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                <div className="w-3 h-3 rounded-full bg-current" />
            </div>
        )}
        <div className="flex-1">
            <h4 className="text-lg font-medium text-slate-900 dark:text-white mb-2 group-hover:text-primary transition-colors font-display">{title}</h4>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{description}</p>
        </div>
    </div>
);
