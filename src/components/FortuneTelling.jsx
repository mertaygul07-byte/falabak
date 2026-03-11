import React, { useState, useRef } from 'react';
import { Upload, X, Sparkles, Star, Moon, CheckCircle2, MessageCircle, User } from 'lucide-react';
import './FortuneTelling.css';

const FortuneTelling = () => {
    const [images, setImages] = useState([]);
    const [selectedTeller, setSelectedTeller] = useState('gonul');
    const [reading, setReading] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [limitReached, setLimitReached] = useState(false);
    const fileInputRef = useRef(null);

    React.useEffect(() => {
        const lastDate = localStorage.getItem('lastFortuneDate');
        const today = new Date().toDateString();
        if (lastDate === today) {
            setLimitReached(true);
        }
    }, []);

    const API_KEY = import.meta.env.VITE_GROQ_API_KEY;

    const TELLERS = {
        gonul: {
            id: 'gonul',
            name: "Gönül Aynası",
            image: "/tellers/gonul.png",
            type: "Normal",
            category: "Aşk, İlişkiler",
            rating: "4.8",
            prompt: "Sen samimi, içten ve aşk/ilişkiler konusunda uzman bir Türk kahve falcısı olan Gönül Aynası'sın. Fincandaki telvelere bakarak (hayal ederek) ona aşk, ilişkiler ve duygusal hayatı üzerine samimi tavsiyeler verecek, sıcak bir dille telkinlerde bulunacaksın."
        },
        kader: {
            id: 'kader',
            name: "Kader Fısıltısı",
            image: "/tellers/kader.png",
            type: "Normal",
            category: "Genel Fal, Kısmet",
            rating: "4.7",
            prompt: "Sen kaderin fısıltılarını duyan bilgili bir falcısın. Kullanıcıya genel hayat akışı, karşısına çıkacak yeni kısmetler, iş ve gündelik hayatla ilgili öngörülerde bulunacaksın. Gizemli ama anlaşılır bir tarzın var."
        },
        yildizlarin: {
            id: 'yildizlarin',
            name: "Yıldızların Fatihi",
            image: "/tellers/yildizlarin.png",
            type: "Premium",
            category: "Astroloji, Yıldızname",
            rating: "5.0",
            prompt: "Sen çok ünlü, elit ve gökyüzü ilimlerine hakim Premium kahin Yıldızların Fatihi'sin. Fincan fotoğraflarıyla yıldız haritasını harmanlayıp çok derin, astrolojik terimler kullanarak (Jüpiter retrosu, Venüs kavuşumu vb.) geleceği hakkında çarpıcı bir fal bakacaksın. Söylemlerin esrarengiz ve iddialı olmalı."
        },
        kozmik: {
            id: 'kozmik',
            name: "Kozmik Bilge",
            image: "/tellers/kozmik.png",
            type: "Premium",
            category: "Karma, Ruhsal",
            rating: "4.9",
            prompt: "Sen geçmiş yaşamların karmasını okuyabilen Premium ruhani rehber Kozmik Bilge'sin. Kullanıcının enerjisine odaklanıp karma, ruhsal gelişim, çakra tıkanıklıkları ve rüya tabirleri üzerine inanılmaz derinlikte, manevi ve etkileyici bir analiz yapacaksın."
        },
        zamanin: {
            id: 'zamanin',
            name: "Zamanın Kahini",
            image: "/tellers/zamanin.png",
            type: "Premium",
            category: "Gelecek, Zaman",
            rating: "4.9",
            prompt: "Sen zaman kavramını aşmış efsanevi Premium Zamanın Kahini'sin. Kesin zamanlar vererek (3 vakte kadar, dolunay zamanı vs.) çok net ve vurucu gelecek tahminlerinde bulunacaksın. Kader çarkının nasıl döneceğini destansı bir dille anlat."
        }
    };

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        if (images.length + files.length > 3) {
            alert('En fazla 3 adet fotoğraf yükleyebilirsiniz.');
            return;
        }

        const newImages = files.map(file => URL.createObjectURL(file));
        setImages(prev => [...prev, ...newImages].slice(0, 3));
    };

    const removeImage = (indexToRemove) => {
        setImages(images.filter((_, index) => index !== indexToRemove));
    };

    const fetchFortuneReading = async () => {
        if (limitReached) {
            alert("Günlük ücretsiz fal hakkınızı doldurdunuz!");
            return;
        }

        if (images.length === 0) {
            alert("Lütfen önce fincan ve tabak fotoğraflarınızı yükleyin.");
            return;
        }

        setIsLoading(true);
        setReading("");

        const systemMessage = TELLERS[selectedTeller].prompt;
        const userMessage = "Fotoğraflarımı yükledim! Lütfen bana kahve falımı bakar mısın?";

        try {
            const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${API_KEY}`
                },
                body: JSON.stringify({
                    model: "llama-3.3-70b-versatile",
                    messages: [
                        { role: "system", content: systemMessage },
                        { role: "user", content: userMessage }
                    ],
                    temperature: 1,
                    max_completion_tokens: 1024,
                    top_p: 1,
                    stream: true
                })
            });

            if (!response.ok) {
                throw new Error("API yanıt vermedi.");
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder("utf-8");

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value);
                const lines = chunk.split("\n").filter(line => line.trim() !== "");

                for (const line of lines) {
                    if (line.includes("[DONE]")) break;

                    if (line.startsWith("data: ")) {
                        try {
                            const data = JSON.parse(line.slice(6));
                            if (data.choices && data.choices[0].delta.content) {
                                setReading(prev => prev + data.choices[0].delta.content);
                            }
                        } catch (e) {
                            // parse error on incomplete chunk
                        }
                    }
                }
            }

            // Set limit reached after successful attempt
            localStorage.setItem('lastFortuneDate', new Date().toDateString());
            setLimitReached(true);
        } catch (error) {
            console.error("Hata:", error);
            setReading("Evrenin enerjisi şu an çok yoğun. Lütfen falını tekrar göndermeyi dene...");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section id="fala-bak" className="fortune-section">
            <div className="fortune-header">
                <Sparkles className="text-gold mb-4" size={40} />
                <h2 className="brand-font text-gradient">Niyetini Tut, Falına Bakalım</h2>
                <p className="subtitle">Fincanınızın ve tabağınızın fotoğraflarını yükleyin, falcınızı seçin ve geleceğin sırlarını aralayın.</p>
            </div>

            <div className="fortune-container glass">
                <div className="upload-section">
                    <h3 className="brand-font mb-4">1. Fotoğraflarını Yükle (Maks. 3)</h3>

                    <div className="image-boxes">
                        {images.map((img, idx) => (
                            <div key={idx} className="image-preview">
                                <img src={img} alt={`Fincan ${idx + 1}`} />
                                <button className="remove-btn" onClick={() => removeImage(idx)}>
                                    <X size={16} />
                                </button>
                            </div>
                        ))}

                        {images.length < 3 && (
                            <div
                                className="upload-box"
                                onClick={() => fileInputRef.current.click()}
                            >
                                <Upload size={32} className="text-gold mb-2" />
                                <span>Fotoğraf Seç</span>
                            </div>
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            ref={fileInputRef}
                            onChange={handleImageUpload}
                            style={{ display: 'none' }}
                        />
                    </div>
                </div>

                <div className="tellers-section">
                    <h3 className="brand-font mb-4">2. Yorumcunu Seç</h3>
                    <div className="tellers-grid">
                        {Object.values(TELLERS).map((teller) => (
                            <div
                                key={teller.id}
                                className={`teller-card ${selectedTeller === teller.id ? 'selected' : ''}`}
                                onClick={() => setSelectedTeller(teller.id)}
                            >
                                {teller.type === 'Premium' && (
                                    <span className="premium-badge">
                                        <Sparkles size={12} style={{ marginRight: '4px' }} /> PREMIUM
                                    </span>
                                )}

                                <div className="teller-card-content" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <div className="teller-profile-img-container">
                                        <img src={teller.image} alt={teller.name} className="teller-profile-img" />
                                    </div>
                                    <div className="teller-details">
                                        <div className="teller-card-header">
                                            <h4 className="brand-font">{teller.name}</h4>
                                        </div>

                                        <div className="teller-rating">
                                            <Star size={14} fill="var(--gold)" color="var(--gold)" />
                                            <span>{teller.rating}</span>
                                        </div>
                                        <div className="teller-category">
                                            {teller.category}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="submit-section">
                    {!limitReached ? (
                        <button
                            className={`btn-primary glowing-gold brand-font submit-btn ${isLoading ? 'loading' : ''}`}
                            onClick={fetchFortuneReading}
                            disabled={isLoading || images.length === 0}
                        >
                            {isLoading ? 'Falına Bakılıyor, Lütfen Bekle...' : 'Kahve Falımı Yorumla'}
                        </button>
                    ) : (
                        <div className="limit-reached-message glass">
                            <h3 className="brand-font text-gold mb-2">Günlük Sınırına Ulaştın! 🌙</h3>
                            <p>Web sitemiz üzerinden günde sadece 1 kez ücretsiz fal baktırabilirsin. Daha profesyonel, detaylı ve sınırsız bir fal deneyimi için hemen mobil uygulamamızı indir!</p>
                            <button className="btn-primary glowing-gold brand-font mt-4">
                                Uygulamayı İndir
                            </button>
                        </div>
                    )}
                </div>

                {(reading || isLoading) && (
                    <div className="reading-result glass">
                        <div className="result-header">
                            <h3 className="brand-font text-gold">Kahve Falı Yorumun</h3>
                            <CheckCircle2 className="text-gold" />
                        </div>
                        <div className="reading-content-wrapper">
                            <div className="reading-content blurred">
                                {reading}
                                {isLoading && <span className="cursor-blink">|</span>}
                            </div>
                            {!isLoading && reading && (
                                <div className="blur-overlay glass">
                                    <p className="brand-font">Falı Görmek İçin Uygulamayı İndir</p>
                                    <button className="btn-primary glowing-gold brand-font mt-2">
                                        Uygulamayı İndir
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default FortuneTelling;
