import React from 'react';

const ZodiacWheel = () => {
    return (
        <div className="zodiac-wheel-container">
            <svg viewBox="0 0 500 500" className="zodiac-wheel-svg">
                {/* Outer Ring with Symbols */}
                <circle cx="250" cy="250" r="240" fill="none" stroke="var(--color-gold)" strokeWidth="1" opacity="0.3" />
                <circle cx="250" cy="250" r="215" fill="none" stroke="var(--color-gold)" strokeWidth="1.5" opacity="0.5" />

                {/* Zodiac Sign Dividers */}
                {[...Array(12)].map((_, i) => {
                    const angle = (i * 30) * (Math.PI / 180);
                    const x1 = 250 + 215 * Math.cos(angle);
                    const y1 = 250 + 215 * Math.sin(angle);
                    const x2 = 250 + 240 * Math.cos(angle);
                    const y2 = 250 + 240 * Math.sin(angle);
                    return (
                        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--color-gold)" strokeWidth="1" opacity="0.4" />
                    );
                })}

                {/* Symbols (Using small representative paths/shapes to match complexity) */}
                {[...Array(12)].map((_, i) => {
                    const angle = (i * 30 + 15) * (Math.PI / 180);
                    const x = 250 + 227 * Math.cos(angle);
                    const y = 250 + 227 * Math.sin(angle);
                    return (
                        <g key={i} transform={`translate(${x}, ${y}) rotate(${i * 30 + 15})`}>
                            <circle r="3" fill="var(--color-gold)" opacity="0.6" />
                            <path d="M-5,0 L5,0 M0,-5 L0,5" stroke="var(--color-gold)" strokeWidth="0.5" opacity="0.3" />
                        </g>
                    );
                })}

                {/* Inner Ring with Constellations */}
                <circle cx="250" cy="250" r="185" fill="none" stroke="var(--color-gold)" strokeWidth="1" opacity="0.4" />
                <circle cx="250" cy="250" r="145" fill="none" stroke="var(--color-gold)" strokeWidth="0.5" opacity="0.2" />

                {/* Constellation Lines (Representative of the complex starry lines in the image) */}
                {[...Array(8)].map((_, i) => {
                    const angle1 = (i * 45 + Math.random() * 20) * (Math.PI / 180);
                    const angle2 = (angle1 + 0.5 + Math.random() * 1.5);
                    const r1 = 150 + Math.random() * 30;
                    const r2 = 150 + Math.random() * 30;
                    return (
                        <line
                            key={i}
                            x1={250 + r1 * Math.cos(angle1)}
                            y1={250 + r1 * Math.sin(angle1)}
                            x2={250 + r2 * Math.cos(angle2)}
                            y2={250 + r2 * Math.sin(angle2)}
                            stroke="var(--color-gold)"
                            strokeWidth="0.5"
                            opacity="0.3"
                        />
                    );
                })}

                {/* Main Center Circles */}
                <circle cx="250" cy="250" r="60" fill="none" stroke="var(--color-gold)" strokeWidth="2" opacity="0.5" />
                <circle cx="250" cy="250" r="50" fill="none" stroke="var(--color-rose-gold)" strokeWidth="0.5" opacity="0.2" />

                {/* Decorative Spikes */}
                {[...Array(36)].map((_, i) => {
                    const angle = (i * 10) * (Math.PI / 180);
                    const x1 = 250 + 185 * Math.cos(angle);
                    const y1 = 250 + 185 * Math.sin(angle);
                    const x2 = 250 + (i % 2 === 0 ? 195 : 190) * Math.cos(angle);
                    const y2 = 250 + (i % 2 === 0 ? 195 : 190) * Math.sin(angle);
                    return (
                        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--color-gold)" strokeWidth="0.5" opacity="0.2" />
                    );
                })}
            </svg>
        </div>
    );
};

export default ZodiacWheel;
