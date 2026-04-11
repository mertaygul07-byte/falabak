import React from 'react';
import { Star } from 'lucide-react';
import './Reviews.css';

const Reviews = () => {
    const testimonials = [
        {
            id: 1,
            name: "Ayşe K.",
            review: "FalTanat'taki yorumcular gerçekten harika! Söyledikleri her şey teker teker çıktı. Artık kahvemi içtikten sonra ilk işim buraya falımı göndermek.",
            rating: 5
        },
        {
            id: 2,
            name: "Mehmet D.",
            review: "Uygulamanın arayüzü çok şık ve kullanımı kolay. Verdiği günlük kredilerle bile kaliteli yorumlar alabiliyorsunuz. Kesinlikle tavsiye ederim.",
            rating: 5
        },
        {
            id: 3,
            name: "Zeynep T.",
            review: "Seçtiğim yorumcu o kadar detaylı anlattı ki şok oldum. Premium falcıların kalitesi tartışılmaz. En iyi fal deneyimimi burada yaşadım.",
            rating: 4
        }
    ];

    return (
        <section id="yorumlar" className="reviews-section">
            <div className="section-header">
                <h2 className="brand-font text-gradient">Kullanıcı Yorumları</h2>
                <p className="subtitle">Mistik dünyamızı keşfeden kullanıcılarımızın deneyimlerine göz atın.</p>
            </div>

            <div className="reviews-container">
                {testimonials.map((item) => (
                    <div key={item.id} className="review-card glass">
                        <div className="stars">
                            {[...Array(item.rating)].map((_, i) => (
                                <Star key={i} size={20} fill="var(--color-gold)" color="var(--color-gold)" />
                            ))}
                        </div>
                        <p className="review-text">"{item.review}"</p>
                        <h4 className="reviewer-name brand-font">- {item.name}</h4>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Reviews;
