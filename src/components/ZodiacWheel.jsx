import React from 'react';

const ZodiacWheel = () => {
    return (
        <div className="zodiac-wheel-container">
            <svg viewBox="0 0 500 500" className="zodiac-wheel-svg">
                {/* Outer Ring with Symbols */}
                <circle cx="250" cy="250" r="235" fill="none" stroke="var(--color-gold)" strokeWidth="1.5" opacity="0.4" />
                <circle cx="250" cy="250" r="210" fill="none" stroke="var(--color-gold)" strokeWidth="1" opacity="0.6" />

                {/* Zodiac Sign Dividers */}
                {[...Array(12)].map((_, i) => {
                    const angle = (i * 30) * (Math.PI / 180);
                    const x1 = 250 + 210 * Math.cos(angle);
                    const y1 = 250 + 210 * Math.sin(angle);
                    const x2 = 250 + 235 * Math.cos(angle);
                    const y2 = 250 + 235 * Math.sin(angle);
                    return (
                        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--color-gold)" strokeWidth="1" opacity="0.5" />
                    );
                })}

                {/* Celestial Nodes */}
                {[...Array(12)].map((_, i) => {
                    const angle = (i * 30 + 15) * (Math.PI / 180);
                    const x = 250 + 222 * Math.cos(angle);
                    const y = 250 + 222 * Math.sin(angle);
                    return (
                        <g key={i} transform={`translate(${x}, ${y})`}>
                            <circle r="3" fill="var(--color-gold)" opacity="0.8" />
                            <circle r="6" fill="none" stroke="var(--color-gold)" strokeWidth="0.5" opacity="0.3" />
                        </g>
                    );
                })}

                {/* Complex Constellation Lines Grid */}
                {[...Array(24)].map((_, i) => {
                    const angle1 = (i * 15) * (Math.PI / 180);
                    const angle2 = ((i + 3) * 15) * (Math.PI / 180);
                    const r = 160;
                    return (
                        <line
                            key={i}
                            x1={250 + r * Math.cos(angle1)}
                            y1={250 + r * Math.sin(angle1)}
                            x2={250 + r * Math.cos(angle2)}
                            y2={250 + r * Math.sin(angle2)}
                            stroke="var(--color-gold)"
                            strokeWidth="0.5"
                            opacity="0.2"
                        />
                    );
                })}

                {/* Inner Decorative Rings */}
                <circle cx="250" cy="250" r="180" fill="none" stroke="var(--color-gold)" strokeWidth="1" opacity="0.3" />
                <circle cx="250" cy="250" r="150" fill="none" stroke="var(--color-gold)" strokeWidth="0.5" opacity="0.2" />

                {/* Center Solar Element */}
                <circle cx="250" cy="250" r="55" fill="none" stroke="var(--color-gold)" strokeWidth="2" opacity="0.7" />
                <circle cx="250" cy="250" r="45" fill="none" stroke="var(--color-gold)" strokeWidth="1" opacity="0.4" />
                {[...Array(8)].map((_, i) => {
                    const angle = (i * 45) * (Math.PI / 180);
                    return (
                        <line
                            key={i}
                            x1={250 + 45 * Math.cos(angle)}
                            y1={250 + 45 * Math.sin(angle)}
                            x2={250 + 65 * Math.cos(angle)}
                            y2={250 + 65 * Math.sin(angle)}
                            stroke="var(--color-gold)"
                            strokeWidth="1.5"
                            opacity="0.6"
                        />
                    );
                })}

                {/* Star Nodes in Constellations */}
                {[...Array(30)].map((_, i) => {
                    const r = 100 + Math.random() * 80;
                    const angle = Math.random() * Math.PI * 2;
                    return (
                        <circle
                            key={i}
                            cx={250 + r * Math.cos(angle)}
                            cy={250 + r * Math.sin(angle)}
                            r={Math.random() * 1.5 + 0.5}
                            fill="var(--color-light-gold)"
                            opacity={Math.random() * 0.7 + 0.3}
                        />
                    );
                })}
            </svg>
        </div>
    );
};

export default ZodiacWheel;
