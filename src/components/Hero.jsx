import React, { useEffect, useState } from 'react';
import { Sparkles, Moon, Star, Wand2 } from 'lucide-react';
import './Hero.css';

const Hero = () => {
    const [stars, setStars] = useState([]);

    useEffect(() => {
        // Generate random stars for background
        const newStars = Array.from({ length: 40 }).map((_, i) => ({
            id: i,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            size: `${Math.random() * 3 + 1}px`,
            duration: `${Math.random() * 3 + 2}s`,
        }));
        setStars(newStars);
    }, []);

    return (
        <section id="hizmetler" className="hero">
            <div className="stars-container">
                {stars.map((star) => (
                    <div
                        key={star.id}
                        className="star"
                        style={{
                            left: star.left,
                            top: star.top,
                            width: star.size,
                            height: star.size,
                            '--duration': star.duration,
                        }}
                    />
                ))}
            </div>

            <div className="zodiac-wheel-container">
                <div className="zodiac-wheel"></div>
            </div>

            <div className="hero-content">
                <div className="hero-badge glass floating">
                    <Sparkles size={16} className="text-gold" />
                    <span>Mistik Dünyaya Hoş Geldiniz</span>
                </div>

                <h1 className="hero-title brand-font text-gradient">
                    Geleceğin Sırlarını <br /> Keşfetmeye Hazır Mısın?
                </h1>

                <p className="hero-subtitle">
                    FalaBak ile kahve falı, tarot ve yıldıznamenin mistik dünyasına adım at. Gerçek yorumcularla geleceğine ışık tut.
                </p>

                <div className="hero-buttons">
                    <a href="#fala-bak" className="btn-primary glowing-gold brand-font" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Wand2 size={20} />
                        Hemen Fal Baktır
                    </a>
                    <a href="#nasil-calisir" className="btn-secondary glass brand-font" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        Nasıl Çalışır?
                    </a>
                </div>
            </div>

            <div className="hero-decorations">
                <Moon className="decor-moon text-gold floating" size={64} />
                <Star className="decor-star text-rose-gold floating-delayed" size={48} />
            </div>
        </section>
    );
};

export default Hero;
