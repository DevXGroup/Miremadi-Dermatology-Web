import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Data Points that cycle during scanning ---
const SCAN_DATA = [
    { label: 'Epidermis Analysis', value: 'Scanning...', status: 'active' },
    { label: 'Melanin Distribution', value: 'Uniform', status: 'normal' },
    { label: 'UV Exposure Index', value: 'Minimal', status: 'normal' },
    { label: 'Dermal Thickness', value: '1.2mm', status: 'normal' },
    { label: 'Collagen Density', value: 'Optimal', status: 'normal' },
    { label: 'Cellular Integrity', value: '98.4%', status: 'normal' },
    { label: 'Hydration Level', value: 'Balanced', status: 'normal' },
    { label: 'Lesion Detection', value: 'Clear', status: 'normal' },
];

// --- Skin cell pattern rendered on canvas ---
const SkinCellCanvas: React.FC<{ isDark: boolean }> = ({ isDark }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animRef = useRef<number>(0);
    const timeRef = useRef(0);

    const draw = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const dpr = window.devicePixelRatio || 1;
        const w = canvas.clientWidth;
        const h = canvas.clientHeight;
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        ctx.scale(dpr, dpr);

        timeRef.current += 0.003;
        const t = timeRef.current;

        // Background
        ctx.fillStyle = isDark ? '#0a0f1a' : '#f0f2f5';
        ctx.fillRect(0, 0, w, h);

        const primary = isDark ? [21, 185, 200] : [99, 0, 219]; // #15b9c8 / #6300db
        const secondary = isDark ? [139, 92, 246] : [21, 185, 200];

        // Draw organic cell-like pattern (Voronoi-ish)
        const cellCount = 40;
        const cells: { x: number; y: number }[] = [];
        for (let i = 0; i < cellCount; i++) {
            const seed1 = Math.sin(i * 127.1 + 311.7) * 43758.5453;
            const seed2 = Math.sin(i * 269.5 + 183.3) * 43758.5453;
            const bx = ((seed1 - Math.floor(seed1)) * w);
            const by = ((seed2 - Math.floor(seed2)) * h);
            const ox = Math.sin(t * 2 + i * 0.7) * 8;
            const oy = Math.cos(t * 2 + i * 0.5) * 8;
            cells.push({ x: bx + ox, y: by + oy });
        }

        // Draw cell membranes
        for (let i = 0; i < cells.length; i++) {
            const c = cells[i];
            // Find nearest neighbors for organic connections
            const distances = cells
                .map((other, j) => ({ idx: j, dist: Math.hypot(c.x - other.x, c.y - other.y) }))
                .filter(d => d.idx !== i)
                .sort((a, b) => a.dist - b.dist);

            const nearest = distances.slice(0, 3);

            for (const n of nearest) {
                const other = cells[n.idx];
                const alpha = Math.max(0, 0.15 - n.dist / (w * 2));
                ctx.beginPath();
                ctx.moveTo(c.x, c.y);
                const mx = (c.x + other.x) / 2 + Math.sin(t + i) * 10;
                const my = (c.y + other.y) / 2 + Math.cos(t + i) * 10;
                ctx.quadraticCurveTo(mx, my, other.x, other.y);
                ctx.strokeStyle = `rgba(${primary[0]}, ${primary[1]}, ${primary[2]}, ${alpha})`;
                ctx.lineWidth = 1;
                ctx.stroke();
            }

            // Cell nucleus
            const pulseR = 3 + Math.sin(t * 3 + i * 0.8) * 1.5;
            const gradient = ctx.createRadialGradient(c.x, c.y, 0, c.x, c.y, pulseR * 3);
            gradient.addColorStop(0, `rgba(${secondary[0]}, ${secondary[1]}, ${secondary[2]}, 0.3)`);
            gradient.addColorStop(1, `rgba(${secondary[0]}, ${secondary[1]}, ${secondary[2]}, 0)`);
            ctx.beginPath();
            ctx.arc(c.x, c.y, pulseR * 3, 0, Math.PI * 2);
            ctx.fillStyle = gradient;
            ctx.fill();

            ctx.beginPath();
            ctx.arc(c.x, c.y, pulseR, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${primary[0]}, ${primary[1]}, ${primary[2]}, ${0.4 + Math.sin(t * 2 + i) * 0.2})`;
            ctx.fill();
        }

        // Scanning beam (horizontal sweep)
        const scanY = ((Math.sin(t * 0.8) + 1) / 2) * h;
        const beamGrad = ctx.createLinearGradient(0, scanY - 40, 0, scanY + 40);
        beamGrad.addColorStop(0, `rgba(${primary[0]}, ${primary[1]}, ${primary[2]}, 0)`);
        beamGrad.addColorStop(0.4, `rgba(${primary[0]}, ${primary[1]}, ${primary[2]}, 0.06)`);
        beamGrad.addColorStop(0.5, `rgba(${primary[0]}, ${primary[1]}, ${primary[2]}, 0.15)`);
        beamGrad.addColorStop(0.6, `rgba(${primary[0]}, ${primary[1]}, ${primary[2]}, 0.06)`);
        beamGrad.addColorStop(1, `rgba(${primary[0]}, ${primary[1]}, ${primary[2]}, 0)`);
        ctx.fillStyle = beamGrad;
        ctx.fillRect(0, scanY - 40, w, 80);

        // Thin bright scan line
        ctx.beginPath();
        ctx.moveTo(0, scanY);
        ctx.lineTo(w, scanY);
        ctx.strokeStyle = `rgba(${primary[0]}, ${primary[1]}, ${primary[2]}, 0.5)`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Grid overlay (very subtle)
        ctx.strokeStyle = isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.03)';
        ctx.lineWidth = 0.5;
        const gridSize = 50;
        for (let x = 0; x < w; x += gridSize) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, h);
            ctx.stroke();
        }
        for (let y = 0; y < h; y += gridSize) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(w, y);
            ctx.stroke();
        }

        animRef.current = requestAnimationFrame(draw);
    }, [isDark]);

    useEffect(() => {
        animRef.current = requestAnimationFrame(draw);
        return () => cancelAnimationFrame(animRef.current);
    }, [draw]);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
            style={{ borderRadius: 'inherit' }}
        />
    );
};

// --- Dermoscope viewport overlay ---
const DermoscopeViewport: React.FC<{ isDark: boolean }> = ({ isDark }) => {
    const primary = isDark ? '#15b9c8' : '#6300db';

    return (
        <motion.div
            className="absolute"
            style={{
                width: 180,
                height: 180,
                right: '12%',
                top: '18%',
            }}
            animate={{
                x: [0, 15, -10, 5, 0],
                y: [0, -10, 8, -5, 0],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        >
            {/* Outer ring */}
            <div
                className="absolute inset-0 rounded-full"
                style={{
                    border: `2px solid ${primary}`,
                    opacity: 0.4,
                    boxShadow: `0 0 30px ${primary}33, inset 0 0 30px ${primary}11`,
                }}
            />

            {/* Inner scanning ring with rotation */}
            <motion.div
                className="absolute rounded-full"
                style={{
                    inset: 8,
                    border: `1px solid ${primary}`,
                    opacity: 0.6,
                    borderTopColor: 'transparent',
                    borderRightColor: 'transparent',
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            />

            {/* Crosshair */}
            <div className="absolute inset-0 flex items-center justify-center" style={{ opacity: 0.25 }}>
                <div style={{ width: 1, height: '60%', backgroundColor: primary, position: 'absolute' }} />
                <div style={{ width: '60%', height: 1, backgroundColor: primary, position: 'absolute' }} />
            </div>

            {/* Center dot */}
            <motion.div
                className="absolute rounded-full"
                style={{
                    width: 6,
                    height: 6,
                    backgroundColor: primary,
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                }}
                animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.5, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Label */}
            <motion.div
                className="absolute whitespace-nowrap"
                style={{
                    bottom: -28,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    fontSize: 9,
                    fontFamily: "'SF Mono', 'Fira Code', monospace",
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: primary,
                    opacity: 0.7,
                }}
            >
                Dermoscope Active
            </motion.div>
        </motion.div>
    );
};

// --- Floating data readout ---
const DataReadout: React.FC<{ isDark: boolean }> = ({ isDark }) => {
    const [activeIdx, setActiveIdx] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIdx(prev => (prev + 1) % SCAN_DATA.length);
        }, 2400);
        return () => clearInterval(interval);
    }, []);

    const primary = isDark ? '#15b9c8' : '#6300db';
    const textMuted = isDark ? 'rgba(148,163,184,0.8)' : 'rgba(100,116,139,0.8)';

    return (
        <div
            className="absolute left-6 top-6 z-10"
            style={{
                fontFamily: "'SF Mono', 'Fira Code', 'Cascadia Code', monospace",
                fontSize: 10,
                width: 200,
            }}
        >
            {/* Status header */}
            <div className="flex items-center gap-2 mb-3" style={{ color: primary, opacity: 0.8 }}>
                <motion.div
                    className="rounded-full"
                    style={{ width: 6, height: 6, backgroundColor: primary }}
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                />
                <span style={{ letterSpacing: '0.2em', textTransform: 'uppercase', fontSize: 9 }}>
                    Live Analysis
                </span>
            </div>

            {/* Data lines */}
            <div className="space-y-1.5">
                <AnimatePresence mode="popLayout">
                    {SCAN_DATA.slice(activeIdx, activeIdx + 4).map((item, i) => (
                        <motion.div
                            key={`${item.label}-${activeIdx}`}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            transition={{ delay: i * 0.05, duration: 0.3 }}
                            className="flex justify-between items-center"
                            style={{
                                padding: '3px 0',
                                borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)'}`,
                            }}
                        >
                            <span style={{ color: textMuted, letterSpacing: '0.05em' }}>
                                {item.label}
                            </span>
                            <span
                                style={{
                                    color: i === 0 ? primary : (isDark ? 'rgba(226,232,240,0.7)' : 'rgba(30,41,59,0.7)'),
                                    fontWeight: 600,
                                }}
                            >
                                {item.value}
                            </span>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
};

// --- Depth layer indicator (right side) ---
const LayerIndicator: React.FC<{ isDark: boolean }> = ({ isDark }) => {
    const [activeLayer, setActiveLayer] = useState(0);
    const layers = ['Stratum Corneum', 'Epidermis', 'Dermis', 'Hypodermis'];
    const primary = isDark ? '#15b9c8' : '#6300db';

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveLayer(prev => (prev + 1) % layers.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div
            className="absolute right-6 bottom-8 z-10"
            style={{
                fontFamily: "'SF Mono', 'Fira Code', monospace",
                fontSize: 9,
            }}
        >
            <div
                className="mb-2"
                style={{
                    color: isDark ? 'rgba(148,163,184,0.5)' : 'rgba(100,116,139,0.5)',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    textAlign: 'right',
                }}
            >
                Skin Layer Depth
            </div>
            <div className="space-y-1">
                {layers.map((layer, i) => (
                    <motion.div
                        key={layer}
                        className="flex items-center gap-2 justify-end"
                        animate={{
                            opacity: i === activeLayer ? 1 : 0.3,
                        }}
                        transition={{ duration: 0.5 }}
                    >
                        <span style={{
                            color: i === activeLayer ? primary : (isDark ? 'rgba(148,163,184,0.4)' : 'rgba(100,116,139,0.4)'),
                            letterSpacing: '0.05em',
                        }}>
                            {layer}
                        </span>
                        <div
                            style={{
                                width: i === activeLayer ? 24 : 12,
                                height: 2,
                                backgroundColor: i === activeLayer ? primary : (isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'),
                                borderRadius: 1,
                                transition: 'all 0.5s ease',
                            }}
                        />
                    </motion.div>
                ))}
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
    const primary = isDark ? '#15b9c8' : '#6300db';

    return (
        <div
            className="relative w-full h-[500px] md:h-[650px] overflow-hidden"
            style={{
                borderRadius: '2.5rem',
                background: isDark
                    ? 'linear-gradient(135deg, #0a0f1a 0%, #0f1729 50%, #0a1520 100%)'
                    : 'linear-gradient(135deg, #f0f2f5 0%, #e8eaf0 50%, #f5f3f8 100%)',
                border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
            }}
        >
            {/* Cell pattern canvas */}
            <SkinCellCanvas isDark={isDark} />

            {/* Vignette overlay */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    borderRadius: 'inherit',
                    background: isDark
                        ? 'radial-gradient(ellipse at center, transparent 30%, rgba(10,15,26,0.7) 100%)'
                        : 'radial-gradient(ellipse at center, transparent 30%, rgba(240,242,245,0.7) 100%)',
                }}
            />

            {/* Dermoscope viewport */}
            <DermoscopeViewport isDark={isDark} />

            {/* Data readout */}
            <DataReadout isDark={isDark} />

            {/* Layer indicator */}
            <LayerIndicator isDark={isDark} />

            {/* Bottom status bar */}
            <div
                className="absolute bottom-0 left-0 right-0 z-10 flex items-center justify-between px-6 py-3"
                style={{
                    background: isDark
                        ? 'linear-gradient(to top, rgba(10,15,26,0.9) 0%, transparent 100%)'
                        : 'linear-gradient(to top, rgba(240,242,245,0.9) 0%, transparent 100%)',
                    fontFamily: "'SF Mono', 'Fira Code', monospace",
                    fontSize: 9,
                    letterSpacing: '0.1em',
                    color: isDark ? 'rgba(148,163,184,0.5)' : 'rgba(100,116,139,0.5)',
                }}
            >
                <span>Miremadi Dermatology Imaging</span>
                <div className="flex items-center gap-3">
                    <span>RES: 4K</span>
                    <span>|</span>
                    <div className="flex items-center gap-1.5">
                        <motion.div
                            style={{ width: 5, height: 5, borderRadius: '50%', backgroundColor: '#22c55e' }}
                            animate={{ opacity: [1, 0.4, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                        <span>Connected</span>
                    </div>
                </div>
            </div>

            {/* Corner accents */}
            <svg className="absolute top-4 left-4 w-6 h-6 opacity-20" viewBox="0 0 24 24" fill="none">
                <path d="M0 8V0h8" stroke={primary} strokeWidth="1.5" />
            </svg>
            <svg className="absolute top-4 right-4 w-6 h-6 opacity-20" viewBox="0 0 24 24" fill="none">
                <path d="M24 8V0h-8" stroke={primary} strokeWidth="1.5" />
            </svg>
            <svg className="absolute bottom-4 left-4 w-6 h-6 opacity-20" viewBox="0 0 24 24" fill="none">
                <path d="M0 16v8h8" stroke={primary} strokeWidth="1.5" />
            </svg>
            <svg className="absolute bottom-4 right-4 w-6 h-6 opacity-20" viewBox="0 0 24 24" fill="none">
                <path d="M24 16v8h-8" stroke={primary} strokeWidth="1.5" />
            </svg>
        </div>
    );
};

export default SkinScanAnimation;
