import React from 'react';

export const Credentials = () => {
    return (
        <div className="flex flex-wrap gap-6 items-center">
            {/* AAD Card */}
            <div className="group relative overflow-hidden rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-800 p-4 transition-all hover:border-primary/50 shadow-sm flex items-center gap-4">

                {/* American Academy of Dermatology (AAD) Logo SVG */}
                <svg viewBox="0 0 100 100" className="h-14 w-14 shrink-0" aria-labelledby="aad-title">
                    <title id="aad-title">American Academy of Dermatology</title>
                    <circle cx="50" cy="50" r="40" fill="none" className="stroke-blue-800 dark:stroke-blue-400" strokeWidth="4" strokeDasharray="8 4" />
                    <text x="50" y="55" textAnchor="middle" fontSize="28" fontWeight="bold" fontFamily="Arial, sans-serif" className="fill-slate-900 dark:fill-white">AAD</text>
                </svg>
                <div className="relative z-10 pr-2">
                    <p className="text-[10px] uppercase tracking-widest text-primary font-bold mb-1">American</p>
                    <p className="text-sm font-bold text-slate-900 dark:text-white leading-tight">Academy of Dermatology</p>
                    <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-tight font-medium">Association</p>
                </div>
            </div>

            {/* ABD Card */}
            <div className="group relative overflow-hidden rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-800 p-4 transition-all hover:border-primary/50 shadow-sm flex items-center gap-4">

                {/* American Board of Dermatology (ABD) Logo SVG */}
                <svg viewBox="0 0 100 100" className="h-14 w-14 shrink-0" aria-labelledby="abd-title">
                    <title id="abd-title">American Board of Dermatology</title>
                    <circle cx="50" cy="50" r="38" fill="none" className="stroke-blue-700 dark:stroke-blue-400" strokeWidth="2" />
                    <circle cx="50" cy="50" r="32" fill="none" className="stroke-blue-700 dark:stroke-blue-400" strokeWidth="1" />
                    <text x="50" y="60" textAnchor="middle" fontSize="32" fontFamily="Times New Roman, serif" className="fill-blue-700 dark:fill-blue-400">ABD</text>
                    <path d="M40 75 Q 50 85 60 75" fill="none" className="stroke-blue-700 dark:stroke-blue-400" strokeWidth="1" />
                    <path d="M25 50 A 25 25 0 0 1 75 50" fill="none" stroke="none" id="curve" />
                    <text fontSize="6" className="fill-blue-700 dark:fill-blue-400" letterSpacing="1">
                        <textPath href="#curve" startOffset="50%" textAnchor="middle">FOUNDED 1932</textPath>
                    </text>
                </svg>
                <div className="relative z-10">
                    <p className="text-[10px] uppercase tracking-widest text-primary font-bold mb-1">Verified Member</p>
                    <p className="text-sm font-bold text-slate-900 dark:text-white leading-tight">American Board <br /> of Dermatology</p>
                </div>
            </div>
        </div>
    );
};
