import React from 'react';

const ZodiacWheel = () => {
    return (
        <div className="zodiac-wheel-container">
            <svg viewBox="0 0 500 500" className="zodiac-wheel-svg">
                {/* Main Circles */}
                <circle cx="250" cy="250" r="240" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3" />
                <circle cx="250" cy="250" r="210" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.5" />
                <circle cx="250" cy="250" r="180" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
                <circle cx="250" cy="250" r="140" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.4" />

                {/* Zodiac Sign Divisions */}
                {[...Array(12)].map((_, i) => (
                    <line
                        key={i}
                        x1="250"
                        y1="250"
                        x2={250 + 240 * Math.cos((i * 30 * Math.PI) / 180)}
                        y2={250 + 240 * Math.sin((i * 30 * Math.PI) / 180)}
                        stroke="currentColor"
                        strokeWidth="0.5"
                        opacity="0.2"
                    />
                ))}

                {/* Symbols Placeholder - using small decorative circles and lines for a complex feel */}
                {[...Array(12)].map((_, i) => {
                    const angle = (i * 30 + 15) * (Math.PI / 180);
                    const x = 250 + 225 * Math.cos(angle);
                    const y = 250 + 225 * Math.sin(angle);
                    return (
                        <g key={i} transform={`translate(${x}, ${y})`}>
                            <circle r="3" fill="currentColor" opacity="0.6" />
                        </g>
                    );
                })}

                {/* Middle Decorative Elements */}
                {[...Array(24)].map((_, i) => {
                    const angle = (i * 15) * (Math.PI / 180);
                    const x1 = 250 + 140 * Math.cos(angle);
                    const y1 = 250 + 140 * Math.sin(angle);
                    const x2 = 250 + 160 * Math.cos(angle);
                    const y2 = 250 + 160 * Math.sin(angle);
                    return (
                        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth="1" opacity="0.3" />
                    );
                })}
            </svg>
        </div>
    );
};

export default ZodiacWheel;
