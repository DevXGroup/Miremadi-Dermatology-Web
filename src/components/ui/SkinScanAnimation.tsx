import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Service highlights that rotate ---
const SERVICES = [
    { icon: '🩺', label: 'Skin Cancer Screening', detail: 'Free in San Diego County' },
    { icon: '✨', label: 'The Miremadi System', detail: 'Signature rejuvenation treatment' },
    { icon: '🔬', label: 'Dermatopathology', detail: 'Triple board-certified diagnostics' },
    { icon: '💊', label: 'Medical Dermatology', detail: 'Adult & pediatric care' },
];

// --- Floating service card ---
const ServiceCarousel: React.FC<{ isDark: boolean }> = ({ isDark }) => {
    const [active, setActive] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActive(prev => (prev + 1) % SERVICES.length);
        }, 3500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="absolute bottom-8 left-8 right-8 z-20">
            <AnimatePresence mode="wait">
                <motion.div
                    key={active}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center gap-4 px-6 py-4 rounded-2xl backdrop-blur-xl"
                    style={{
                        background: isDark ? 'rgba(15,23,42,0.75)' : 'rgba(255,255,255,0.8)',
                        border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}`,
                    }}
                >
                    <span className="text-2xl">{SERVICES[active].icon}</span>
                    <div>
                        <p className={`font-semibold text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            {SERVICES[active].label}
                        </p>
                        <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                            {SERVICES[active].detail}
                        </p>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Progress dots */}
            <div className="flex justify-center gap-2 mt-3">
                {SERVICES.map((_, i) => (
                    <div
                        key={i}
                        className="rounded-full transition-all duration-500"
                        style={{
                            width: i === active ? 20 : 6,
                            height: 6,
                            backgroundColor: i === active
                                ? (isDark ? '#15b9c8' : '#6300db')
                                : (isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)'),
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

// --- Animated health icons floating in background ---
const FloatingIcons: React.FC<{ isDark: boolean }> = ({ isDark }) => {
    const icons = [
        { symbol: '🫀', x: '15%', y: '12%', delay: 0, size: 28 },
        { symbol: '🧬', x: '75%', y: '8%', delay: 1.5, size: 24 },
        { symbol: '🩻', x: '85%', y: '45%', delay: 0.8, size: 22 },
        { symbol: '💉', x: '10%', y: '55%', delay: 2.2, size: 20 },
        { symbol: '🧴', x: '60%', y: '25%', delay: 3, size: 22 },
        { symbol: '☀️', x: '30%', y: '35%', delay: 1, size: 26 },
        { symbol: '🛡️', x: '50%', y: '60%', delay: 2.5, size: 20 },
        { symbol: '💧', x: '80%', y: '70%', delay: 0.5, size: 22 },
    ];

    return (
        <>
            {icons.map((icon, i) => (
                <motion.div
                    key={i}
                    className="absolute pointer-events-none select-none"
                    style={{
                        left: icon.x,
                        top: icon.y,
                        fontSize: icon.size,
                        filter: 'grayscale(0.3)',
                        opacity: 0,
                    }}
                    animate={{
                        y: [0, -12, 0],
                        opacity: [0.15, 0.35, 0.15],
                    }}
                    transition={{
                        duration: 5 + i * 0.5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: icon.delay,
                    }}
                />
            ))}
        </>
    );
};

// --- Gentle pulse rings (like a heartbeat / wellness pulse) ---
const WellnessPulse: React.FC<{ isDark: boolean }> = ({ isDark }) => {
    const color = isDark ? 'rgba(21,185,200,0.12)' : 'rgba(99,0,219,0.08)';

    return (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {[0, 1, 2].map(i => (
                <motion.div
                    key={i}
                    className="absolute rounded-full"
                    style={{
                        width: 200 + i * 120,
                        height: 200 + i * 120,
                        border: `1px solid ${color}`,
                    }}
                    animate={{
                        scale: [1, 1.15, 1],
                        opacity: [0.6, 0.2, 0.6],
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: i * 0.8,
                    }}
                />
            ))}
            {/* Center medical cross */}
            <motion.div
                className="relative z-10"
                animate={{ scale: [1, 1.05, 1], opacity: [0.6, 0.9, 0.6] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                    <rect
                        x="18" y="8" width="12" height="32" rx="3"
                        fill={isDark ? 'rgba(21,185,200,0.2)' : 'rgba(99,0,219,0.12)'}
                    />
                    <rect
                        x="8" y="18" width="32" height="12" rx="3"
                        fill={isDark ? 'rgba(21,185,200,0.2)' : 'rgba(99,0,219,0.12)'}
                    />
                </svg>
            </motion.div>
        </div>
    );
};

// --- Skin layer cross-section illustration ---
const SkinLayerDiagram: React.FC<{ isDark: boolean }> = ({ isDark }) => {
    const [activeLayer, setActiveLayer] = useState(0);
    const layers = [
        { name: 'Epidermis', color: isDark ? '#f8d7b0' : '#f5c89a', desc: 'Protective outer layer' },
        { name: 'Dermis', color: isDark ? '#e8a87c' : '#dea07a', desc: 'Collagen & elastin network' },
        { name: 'Hypodermis', color: isDark ? '#d4845a' : '#c87850', desc: 'Insulating fat layer' },
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveLayer(prev => (prev + 1) % layers.length);
        }, 2800);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="absolute top-6 right-6 z-20">
            <div
                className="px-5 py-4 rounded-2xl backdrop-blur-xl"
                style={{
                    background: isDark ? 'rgba(15,23,42,0.7)' : 'rgba(255,255,255,0.75)',
                    border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}`,
                    minWidth: 170,
                }}
            >
                <p
                    className="text-[9px] font-bold uppercase tracking-[0.2em] mb-3"
                    style={{ color: isDark ? 'rgba(148,163,184,0.6)' : 'rgba(100,116,139,0.5)' }}
                >
                    Skin Layers
                </p>
                <div className="space-y-1.5">
                    {layers.map((layer, i) => (
                        <motion.div
                            key={layer.name}
                            className="flex items-center gap-3"
                            animate={{ opacity: i === activeLayer ? 1 : 0.4 }}
                            transition={{ duration: 0.4 }}
                        >
                            <motion.div
                                className="rounded-sm flex-shrink-0"
                                style={{
                                    width: 28,
                                    height: i === activeLayer ? 14 : 8,
                                    backgroundColor: layer.color,
                                    opacity: i === activeLayer ? 0.9 : 0.4,
                                    transition: 'all 0.4s ease',
                                    borderRadius: 4,
                                }}
                            />
                            <div>
                                <p className={`text-xs font-medium leading-tight ${isDark ? 'text-white' : 'text-slate-800'}`}>
                                    {layer.name}
                                </p>
                                {i === activeLayer && (
                                    <motion.p
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        className={`text-[10px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}
                                    >
                                        {layer.desc}
                                    </motion.p>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// --- Main component ---
export const SkinScanAnimation: React.FC<{ isDark?: boolean }> = ({ isDark: isDarkProp }) => {
    const [isDarkState, setIsDarkState] = useState(() => {
        if (typeof isDarkProp === 'boolean') return isDarkProp;
        if (typeof window === 'undefined') return true;
        return document.documentElement.classList.contains('dark');
    });

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

    const isDark = isDarkState;

    return (
        <div
            className="relative w-full h-[500px] md:h-[650px] overflow-hidden"
            style={{
                borderRadius: '2.5rem',
                background: isDark
                    ? 'linear-gradient(160deg, #0c1525 0%, #162033 40%, #0f1a2e 100%)'
                    : 'linear-gradient(160deg, #faf8f6 0%, #f5efe8 40%, #f0ebe4 100%)',
                border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
            }}
        >
            {/* Warm organic gradient blobs */}
            <motion.div
                className="absolute rounded-full pointer-events-none"
                style={{
                    width: 350,
                    height: 350,
                    top: '-5%',
                    left: '-10%',
                    background: isDark
                        ? 'radial-gradient(circle, rgba(21,185,200,0.08) 0%, transparent 70%)'
                        : 'radial-gradient(circle, rgba(99,0,219,0.06) 0%, transparent 70%)',
                    filter: 'blur(40px)',
                }}
                animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
                transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
                className="absolute rounded-full pointer-events-none"
                style={{
                    width: 300,
                    height: 300,
                    bottom: '5%',
                    right: '-5%',
                    background: isDark
                        ? 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)'
                        : 'radial-gradient(circle, rgba(236,72,153,0.06) 0%, transparent 70%)',
                    filter: 'blur(40px)',
                }}
                animate={{ x: [0, -20, 0], y: [0, -15, 0] }}
                transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            />
            <motion.div
                className="absolute rounded-full pointer-events-none"
                style={{
                    width: 250,
                    height: 250,
                    top: '40%',
                    left: '30%',
                    background: isDark
                        ? 'radial-gradient(circle, rgba(251,191,146,0.05) 0%, transparent 70%)'
                        : 'radial-gradient(circle, rgba(251,191,146,0.08) 0%, transparent 70%)',
                    filter: 'blur(30px)',
                }}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            />

            {/* Floating health icons */}
            <FloatingIcons isDark={isDark} />

            {/* Gentle wellness pulse rings */}
            <WellnessPulse isDark={isDark} />

            {/* Skin layer diagram card */}
            <SkinLayerDiagram isDark={isDark} />

            {/* Service carousel at bottom */}
            <ServiceCarousel isDark={isDark} />

            {/* Top-left clinic label */}
            <div className="absolute top-6 left-6 z-20">
                <div
                    className="px-4 py-3 rounded-xl backdrop-blur-xl"
                    style={{
                        background: isDark ? 'rgba(15,23,42,0.7)' : 'rgba(255,255,255,0.75)',
                        border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}`,
                    }}
                >
                    <p
                        className="text-[9px] font-bold uppercase tracking-[0.25em]"
                        style={{ color: isDark ? '#15b9c8' : '#6300db' }}
                    >
                        Miremadi Dermatology
                    </p>
                    <p className={`text-[11px] mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                        La Jolla, California
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SkinScanAnimation;
