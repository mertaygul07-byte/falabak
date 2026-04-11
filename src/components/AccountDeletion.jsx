import React, { useState } from 'react';
import { Trash2, AlertTriangle, CheckCircle2, Mail, ChevronDown, ChevronUp, Send, ArrowLeft } from 'lucide-react';
import './AccountDeletion.css';

const AccountDeletion = () => {
    const [openFaq, setOpenFaq] = useState(null);
    const [confirmed, setConfirmed] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');

    const faqs = [
        {
            q: "Hesabımı sildikten sonra verilerim ne olur?",
            a: "Hesabınızı silmenizden itibaren 30 gün içinde tüm kişisel verileriniz (profil bilgileri, yüklenen fotoğraflar, fal geçmişi) kalıcı olarak silinir. Bu süre zarfında hesabınızı geri yükleyebilirsiniz."
        },
        {
            q: "Aktif aboneliğim varsa ne olur?",
            a: "Hesabınızı silmeden önce aktif aboneliğinizi iptal etmenizi öneririz. Abonelik iptali için App Store veya Google Play hesabınızdan iptal edebilirsiniz."
        },
        {
            q: "Hesap silme işlemi geri alınabilir mi?",
            a: "Silme talebinden sonraki 30 günlük süre içinde uygulamaya tekrar giriş yaparak hesabınızı kurtarabilirsiniz. Bu süre geçtikten sonra işlem kalıcı hale gelir ve geri alınamaz."
        },
        {
            q: "Ne kadar sürede hesabım silinir?",
            a: "Talebiniz alındıktan sonra 30 gün içinde hesabınız ve tüm ilgili veriler sistemimizden kalıcı olarak silinir. İşlem tamamlandığında e-posta ile bilgilendirme yapılır."
        }
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email) {
            setError('Lütfen kayıtlı e-posta adresinizi girin.');
            return;
        }
        if (!confirmed) {
            setError('Devam edebilmek için onay kutusunu işaretlemeniz gerekiyor.');
            return;
        }
        setError('');

        const subject = encodeURIComponent('Hesap Silme Talebi - FalTanat');
        const body = encodeURIComponent(
            `Merhaba,\n\nAşağıdaki hesabımı silmenizi talep ediyorum.\n\nE-posta: ${email}\nNeden: ${reason || 'Belirtilmedi'}\n\nBu talepten itibaren 30 gün içinde hesabım ve tüm verilerim kalıcı olarak silinsin.\n\nSaygılarımla.`
        );

        window.location.href = `mailto:destek@faltanat.com?subject=${subject}&body=${body}`;
        setSubmitted(true);
    };

    return (
        <section id="hesap-sil" className="account-deletion-section">
            <div className="account-deletion-container">
                {/* Header */}
                <div className="ad-header">
                    <div className="ad-icon-wrapper">
                        <Trash2 size={32} className="ad-icon" />
                    </div>
                    <h2 className="brand-font text-gradient">Hesap Silme Talebi</h2>
                    <p className="ad-subtitle">
                        Hesabınızı silmek için aşağıdaki formu doldurun. Talebiniz 2 iş günü içinde işleme alınır.
                    </p>
                </div>

                {/* Warning Box */}
                <div className="ad-warning">
                    <AlertTriangle size={22} className="ad-warning-icon" />
                    <div>
                        <strong>Önemli Uyarı:</strong> Hesap silme işlemi kalıcıdır. Tüm fal geçmişiniz, profil
                        bilgileriniz ve satın aldığınız içerikler kalıcı olarak silinir ve geri alınamaz.
                    </div>
                </div>

                {submitted ? (
                    /* Success State */
                    <div className="ad-success glass">
                        <CheckCircle2 size={48} className="ad-success-icon" />
                        <h3 className="brand-font">E-posta Uygulamanız Açıldı</h3>
                        <p>
                            Hesap silme talebiniz için cihazınızdaki varsayılan e-posta uygulaması açılıyor.
                            Lütfen bilgilerinizi doldurup e-postayı <strong>faltanatsupport@gmail.com</strong> adresine gönderin.
                        </p>
                        <p className="ad-success-note">
                            E-postanız bize ulaştıktan sonra, talebiniz 2 iş günü içinde işleme alınacak ve ilgili hesap 30 gün içinde tamamen silinecektir.
                        </p>
                        <button className="ad-back-btn" onClick={() => setSubmitted(false)}>
                            <ArrowLeft size={16} />
                            Geri Dön
                        </button>
                    </div>
                ) : (
                    /* Deletion Form Box */
                    <div className="ad-form glass">
                        <h3 className="brand-font ad-form-title">
                            <Mail size={20} />
                            Silme Talebi Oluştur
                        </h3>

                        <p className="ad-text-instruction">
                            Hesabınızı ve tüm verilerinizi platformumuzdan kalıcı olarak silmek istiyorsanız,
                            lütfen sisteme <strong>kayıt olduğunuz e-posta adresi</strong> üzerinden aşağıdaki adrese bir e-posta gönderin.
                        </p>

                        <div className="ad-direct-email">
                            <span className="ad-direct-email-label">E-posta Gönderilecek Adres:</span>
                            <a href="mailto:faltanatsupport@gmail.com" className="ad-direct-email-link">
                                faltanatsupport@gmail.com
                            </a>
                        </div>
                        
                         <p style={{marginTop: '1rem', color: 'var(--color-text-muted)', fontSize: '0.95rem'}}>
                            Aşağıdaki butona tıklayarak otomatik doldurulmuş bir e-posta taslağı oluşturabilirsiniz.
                        </p>

                        <label className="ad-checkbox-label" style={{marginTop: '0.5rem', marginBottom: '1rem'}}>
                            <input
                                type="checkbox"
                                checked={confirmed}
                                onChange={(e) => setConfirmed(e.target.checked)}
                                className="ad-checkbox"
                            />
                            <span>
                                Hesabımı ve tüm verilerimi kalıcı olarak silmek istediğimi onaylıyorum.
                                Bu işlemin geri alınamayacağını anlıyorum.
                            </span>
                        </label>

                        {error && (
                            <div className="ad-error">
                                <AlertTriangle size={16} />
                                {error}
                            </div>
                        )}

                        <button onClick={(e) => {
                             e.preventDefault();
                             if (!confirmed) {
                                 setError('Devam edebilmek için onay kutusunu işaretlemeniz gerekiyor.');
                                 return;
                             }
                             setError('');
                             const subject = encodeURIComponent('Hesap Silme Talebi - FalTanat');
                             const body = encodeURIComponent(
                                 'Merhaba,\n\FalTanat uygulamasına kayıtlı aşağıdaki hesabımın ve tüm verilerimin kalıcı olarak silinmesini talep ediyorum.\n\nKayıtlı E-posta Adresim: [LÜTFEN BURAYA KAYITLI E-POSTANIZI YAZIN]\nUygulama İçi Kullanıcı Adım (varsa): [BURAYA YAZIN]\n\nBu talepten itibaren 30 gün içinde hesabım ve tüm verilerim kalıcı olarak silinsin.\n\nSaygılarımla.'
                             );
                     
                             window.location.href = `mailto:faltanatsupport@gmail.com?subject=${subject}&body=${body}`;
                             setSubmitted(true);
                        }} className="ad-submit-btn btn-primary glowing-gold brand-font">
                            <Send size={18} />
                            Faltanat Support'a Mail Gönder (Uygulamayı Aç)
                        </button>
                    </div>
                )}

                {/* FAQ */}
                <div className="ad-faq">
                    <h3 className="brand-font ad-faq-title">Sık Sorulan Sorular</h3>
                    {faqs.map((faq, i) => (
                        <div
                            key={i}
                            className={`ad-faq-item glass ${openFaq === i ? 'open' : ''}`}
                        >
                            <button
                                className="ad-faq-question"
                                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                            >
                                <span>{faq.q}</span>
                                {openFaq === i ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                            </button>
                            {openFaq === i && (
                                <div className="ad-faq-answer">
                                    <p>{faq.a}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AccountDeletion;
