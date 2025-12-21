import React from 'react';

export const Credentials = () => {
    return (
        <div className="flex flex-wrap gap-8 items-center opacity-80 grayscale hover:grayscale-0 transition-all duration-500">
            {/* American Academy of Dermatology (AAD) Logo SVG */}
            <svg viewBox="0 0 300 100" className="h-16 w-auto" aria-labelledby="aad-title">
                <title id="aad-title">American Academy of Dermatology</title>
                <circle cx="50" cy="50" r="40" fill="none" stroke="#00529B" strokeWidth="4" strokeDasharray="8 4" />
                <text x="50" y="55" textAnchor="middle" fontSize="28" fontWeight="bold" fontFamily="Arial, sans-serif" fill="#000">AAD</text>
                <text x="100" y="40" fontSize="14" fontFamily="Arial, sans-serif" fill="#00529B">American</text>
                <text x="100" y="55" fontSize="14" fontFamily="Arial, sans-serif" fill="#00529B">Academy of</text>
                <text x="100" y="70" fontSize="14" fontFamily="Arial, sans-serif" fill="#000" fontWeight="bold">Dermatology</text>
                <text x="100" y="85" fontSize="12" fontFamily="Arial, sans-serif" fill="#00529B" letterSpacing="1">Association</text>
            </svg>

            {/* American Board of Dermatology (ABD) Logo SVG */}
            <svg viewBox="0 0 300 100" className="h-16 w-auto" aria-labelledby="abd-title">
                <title id="abd-title">American Board of Dermatology</title>
                <circle cx="50" cy="50" r="38" fill="none" stroke="#2D74B4" strokeWidth="2" />
                <circle cx="50" cy="50" r="32" fill="none" stroke="#2D74B4" strokeWidth="1" />
                <text x="50" y="60" textAnchor="middle" fontSize="32" fontFamily="Times New Roman, serif" fill="#2D74B4">ABD</text>
                <path d="M40 75 Q 50 85 60 75" fill="none" stroke="#2D74B4" strokeWidth="1" />
                <path d="M25 50 A 25 25 0 0 1 75 50" fill="none" stroke="none" id="curve" />
                <text fontSize="6" fill="#2D74B4" letterSpacing="1">
                    <textPath href="#curve" startOffset="50%" textAnchor="middle">FOUNDED 1932</textPath>
                </text>
                <text x="100" y="55" fontSize="14" fontFamily="Times New Roman, serif" fill="#2D74B4" fontWeight="bold">American Board of Dermatology</text>
            </svg>
        </div>
    );
};
