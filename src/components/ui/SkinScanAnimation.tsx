import React, { useEffect, useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';

// --- Sparkle component ---
const Sparkle: React.FC<{ style: React.CSSProperties; delay: number }> = ({ style, delay }) => (
    <motion.div
        className="absolute pointer-events-none"
        style={style}
        initial={{ opacity: 0, scale: 0 }}
        animate={{
            opacity: [0, 1, 1, 0],
            scale: [0, 1, 1.2, 0],
            rotate: [0, 90, 180],
        }}
        transition={{
            duration: 1.8,
            delay,
            repeat: Infinity,
            repeatDelay: 4 + Math.random() * 3,
            ease: 'easeInOut',
        }}
    >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
                d="M8 0L9.4 6.6L16 8L9.4 9.4L8 16L6.6 9.4L0 8L6.6 6.6L8 0Z"
                fill="white"
                fillOpacity="0.9"
            />
        </svg>
    </motion.div>
);

const SkinSparkles: React.FC = () => {
    const sparkles = [
        { top: '22%', left: '55%', delay: 0, size: 14 },
        { top: '30%', left: '38%', delay: 2.5, size: 10 },
        { top: '18%', left: '48%', delay: 5, size: 12 },
        { top: '35%', left: '62%', delay: 1.5, size: 8 },
        { top: '26%', left: '44%', delay: 3.8, size: 16 },
        { top: '40%', left: '52%', delay: 6.5, size: 10 },
        { top: '20%', left: '58%', delay: 4.2, size: 11 },
        { top: '33%', left: '35%', delay: 7, size: 9 },
    ];

    return (
        <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden" style={{ borderRadius: 'inherit' }}>
            {sparkles.map((s, i) => (
                <Sparkle
                    key={i}
                    delay={s.delay}
                    style={{
                        top: s.top,
                        left: s.left,
                        width: s.size,
                        height: s.size,
                    }}
                />
            ))}
        </div>
    );
};

// --- Rotating taglines ---
const TAGLINES = [
    'Reclaim Your Confidence',
    'Radiance Meets Science',
    'Your Skin, Perfected',
    'Beauty Beyond Compare',
];

// --- Main component ---
export const SkinScanAnimation: React.FC<{ isDark?: boolean }> = ({ isDark: isDarkProp }) => {
    const [isDarkState, setIsDarkState] = useState(() => {
        if (typeof isDarkProp === 'boolean') return isDarkProp;
        if (typeof window === 'undefined') return true;
        return document.documentElement.classList.contains('dark');
    });
    const [taglineIdx, setTaglineIdx] = useState(0);

    useEffect(() => {
        if (typeof isDarkProp === 'boolean') {
            setIsDarkState(isDarkProp);
            return;
        }
        const observer = new MutationObserver(() => {
            setIsDarkState(document.documentElement.classList.contains('dark'));
        });
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
        return () => observer.disconnect();
    }, [isDarkProp]);

    useEffect(() => {
        const interval = setInterval(() => {
            setTaglineIdx(prev => (prev + 1) % TAGLINES.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    const isDark = isDarkState;
    const accent = isDark ? '#15b9c8' : '#6300db';

    // Scroll-driven zoom into eyes
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start 0.15', 'end start'],
    });

    // Ultra-smooth spring for silky cinematic zoom
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 30,
        damping: 30,
        restDelta: 0.0001,
    });

    // Scale from 1 to 3.5 for a tight close-up on the left eye
    const scale = useTransform(smoothProgress, [0, 0.65], [1, 3.5]);
    // Pan to center the left eye in frame as zoom progresses
    const y = useTransform(smoothProgress, [0, 0.65], ['0%', '12%']);
    const x = useTransform(smoothProgress, [0, 0.65], ['0%', '-5%']);
    // Fade out overlays as we zoom in for clarity
    const overlayOpacity = useTransform(smoothProgress, [0, 0.3, 0.65], [1, 0.5, 0]);

    return (
        <div
            ref={containerRef}
            className="relative w-full aspect-[4/3] md:aspect-[8/5] overflow-hidden"
            style={{
                borderRadius: '2.5rem',
                border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
                backgroundColor: '#d4b5a0',
            }}
        >
            {/* Background image with scroll-driven zoom into left eye */}
            <motion.div
                className="absolute inset-0 will-change-transform"
                style={{
                    scale,
                    y,
                    x,
                    transformOrigin: '58% 38%',
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                    opacity: { duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] },
                }}
            >
                <img
                    src="/images/hero-beauty.webp"
                    alt="Beautiful radiant skin"
                    loading="eager"
                    decoding="async"
                    fetchPriority="high"
                    className="w-full h-full object-cover object-center"
                />
            </motion.div>

            {/* Skin sparkle/shine effects */}
            <SkinSparkles />

            {/* Gradient overlays for text readability - fade out on scroll zoom */}
            <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                    opacity: overlayOpacity,
                    background: isDark
                        ? 'linear-gradient(to top, rgba(2,6,18,0.85) 0%, rgba(2,6,18,0.3) 40%, rgba(2,6,18,0.1) 70%, transparent 100%)'
                        : 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.15) 40%, rgba(0,0,0,0.02) 70%, transparent 100%)',
                }}
            />
            {/* Side gradient for depth */}
            <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                    opacity: overlayOpacity,
                    background: isDark
                        ? 'linear-gradient(to right, rgba(2,6,18,0.4) 0%, transparent 50%)'
                        : 'linear-gradient(to right, rgba(0,0,0,0.15) 0%, transparent 50%)',
                }}
            />

            {/* Soft glow accent behind face */}
            <motion.div
                className="absolute pointer-events-none"
                style={{
                    width: '60%',
                    height: '50%',
                    top: '15%',
                    left: '20%',
                    background: isDark
                        ? 'radial-gradient(circle, rgba(21,185,200,0.06) 0%, transparent 70%)'
                        : 'radial-gradient(circle, rgba(99,0,219,0.04) 0%, transparent 70%)',
                    filter: 'blur(60px)',
                }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Top-left clinic badge */}
            <motion.div
                className="absolute top-6 left-6 z-20"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.7, ease: 'easeOut' }}
                style={{ opacity: overlayOpacity }}
            >
                <div
                    className="px-4 py-3 rounded-xl backdrop-blur-xl"
                    style={{
                        background: isDark ? 'rgba(15,23,42,0.6)' : 'rgba(255,255,255,0.7)',
                        border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.06)'}`,
                    }}
                >
                    <p
                        className="text-[9px] font-bold uppercase tracking-[0.25em]"
                        style={{ color: accent }}
                    >
                        Miremadi Dermatology
                    </p>
                    <p className="text-[11px] mt-0.5 text-white/70">
                        La Jolla, California
                    </p>
                </div>
            </motion.div>

            {/* Bottom content area */}
            <motion.div className="absolute bottom-0 left-0 right-0 z-20 px-6 pb-6" style={{ opacity: overlayOpacity }}>
                {/* Animated rotating tagline */}
                <div className="mb-3 h-[40px] md:h-[48px] overflow-hidden">
                    <AnimatePresence mode="wait">
                        <motion.h3
                            key={taglineIdx}
                            className="text-2xl md:text-3xl font-display font-medium text-white leading-tight"
                            initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
                            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, y: -20, filter: 'blur(6px)' }}
                            transition={{
                                duration: 0.8,
                                ease: [0.25, 0.1, 0.25, 1],
                            }}
                        >
                            {TAGLINES[taglineIdx]}
                        </motion.h3>
                    </AnimatePresence>
                </div>

                {/* Thin accent line */}
                <motion.div
                    className="mb-3 rounded-full"
                    style={{ height: 2, backgroundColor: accent }}
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 80, opacity: 0.7 }}
                    transition={{ delay: 1.2, duration: 1, ease: 'easeOut' }}
                />

                {/* Subtitle text with staggered word reveal */}
                <motion.p
                    className="text-sm md:text-base text-white/70 max-w-sm leading-relaxed"
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: { staggerChildren: 0.04, delayChildren: 1.5 },
                        },
                    }}
                >
                    {('Expert dermatology care with 57+ years of medical excellence. Where science meets beauty.').split(' ').map((word, i) => (
                        <motion.span
                            key={i}
                            className="inline-block mr-[0.3em]"
                            variants={{
                                hidden: { opacity: 0, y: 8 },
                                visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
                            }}
                        >
                            {word}
                        </motion.span>
                    ))}
                </motion.p>

                {/* Service pills */}
                <motion.div
                    className="flex flex-wrap gap-2 mt-4"
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: { staggerChildren: 0.1, delayChildren: 2.2 },
                        },
                    }}
                >
                    {['Skin Cancer Screening', 'Rejuvenation', 'Dermatopathology', 'Medical Care'].map((service, i) => (
                        <motion.span
                            key={i}
                            className="px-3 py-1.5 rounded-full text-[10px] font-semibold uppercase tracking-wider"
                            style={{
                                background: isDark ? 'rgba(21,185,200,0.12)' : 'rgba(255,255,255,0.2)',
                                color: isDark ? '#15b9c8' : 'rgba(255,255,255,0.9)',
                                border: `1px solid ${isDark ? 'rgba(21,185,200,0.2)' : 'rgba(255,255,255,0.2)'}`,
                                backdropFilter: 'blur(8px)',
                            }}
                            variants={{
                                hidden: { opacity: 0, scale: 0.8, y: 10 },
                                visible: {
                                    opacity: 1,
                                    scale: 1,
                                    y: 0,
                                    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
                                },
                            }}
                        >
                            {service}
                        </motion.span>
                    ))}
                </motion.div>
            </motion.div>
        </div>
    );
};

export default SkinScanAnimation;
