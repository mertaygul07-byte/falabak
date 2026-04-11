import React from 'react';
import { Smartphone, Sparkles, Gift, Coins } from 'lucide-react';
import './HowItWorks.css';

const HowItWorks = () => {
    const steps = [
        {
            id: 1,
            icon: <Smartphone size={32} />,
            title: "Uygulamayı İndir",
            description: "Mobil uygulamamızı indirerek kahvenizi yudumladıktan sonra falınızı hemen gönderebilirsiniz."
        },
        {
            id: 2,
            icon: <Sparkles size={32} />,
            title: "Premium Falcılar",
            description: "Alanında uzman, gerçek ve premium falcılarımız içinden dilediğinizi seçerek en doğru yorumları alın."
        },
        {
            id: 3,
            icon: <Gift size={32} />,
            title: "Günlük Bedava Kredi",
            description: "Her gün uygulamaya giriş yapın, bedava kredilerinizi toplayın ve ücretsiz fallarınızın keyfini çıkarın!"
        },
        {
            id: 4,
            icon: <Coins size={32} />,
            title: "Sınırsız Fal Deneyimi",
            description: "İsterseniz jeton satın alarak beklemeden dilediğiniz kadar fal baktırın. Sınırları siz belirleyin."
        }
    ];

    return (
        <section id="nasil-calisir" className="how-it-works-section">
            <div className="section-header">
                <h2 className="brand-font text-gradient">Nasıl Çalışır?</h2>
                <p className="subtitle">FalTanat deneyimini keşfetmek sadece birkaç adım uzağınızda.</p>
            </div>

            <div className="cards-container">
                {steps.map((step) => (
                    <div key={step.id} className="how-card glass">
                        <div className="icon-wrapper glowing-gold">
                            {step.icon}
                        </div>
                        <h3 className="card-title brand-font">{step.title}</h3>
                        <p className="card-desc">{step.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default HowItWorks;
