import React, { useEffect } from 'react';
import './LegalModal.css';
import { X } from 'lucide-react';

const LegalModal = ({ type, onClose }) => {
    // Prevent scrolling when modal is open
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    const isTerms = type === 'terms';

    return (
        <div className="legal-modal-overlay" onClick={onClose}>
            <div className="legal-modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="legal-modal-close" onClick={onClose}>
                    <X size={24} />
                </button>

                <div className="legal-modal-scroll-area">
                    {isTerms ? (
                        <div className="legal-text-container">
                            <h2>FalaBak Kullanım Şartları (Terms of Use)</h2>
                            <p className="last-updated">Son Güncelleme Tarihi: 09 Mart 2026</p>

                            <h3>1. Taraflar ve Kabul</h3>
                            <p>Bu Kullanım Şartları, FalaBak web sitesini ve mobil uygulamasını (bundan böyle &quot;Platform&quot; olarak anılacaktır) kullanan kişi (&quot;Kullanıcı&quot;) ile FalaBak (&quot;Şirket&quot;) arasında düzenlenmiştir. Platformu kullanarak bu şartları kabul etmiş sayılırsınız. Şartları kabul etmiyorsanız, lütfen Platformu kullanmayınız.</p>

                            <h3>2. Hizmetin Doğası (Eğlence Amacı)</h3>
                            <ul>
                                <li>FalaBak, kullanıcılarına kahve falı, tarot, astroloji ve benzeri mistik yorumlar sunan bir eğlence platformudur.</li>
                                <li>Platformda sunulan yorumlar, tahminler ve analizler tamamen algoritmik ve kurgusal olup, gerçekliği garanti edilemez.</li>
                                <li>Sunulan içerikler hiçbir koşulda psikolojik, tıbbi, hukuki, finansal veya profesyonel bir tavsiye niteliği taşımaz. Kullanıcıların, bu yorumlara dayanarak alacakları kararlardan FalaBak ve çalışanları sorumlu tutulamaz.</li>
                            </ul>

                            <h3>3. Kullanıcı Yükümlülükleri</h3>
                            <ul>
                                <li><strong>Yaş Sınırı:</strong> FalaBak hizmetlerinden yararlanabilmek için en az 18 yaşında olmanız gerekmektedir.</li>
                                <li><strong>İçerik Yükleme:</strong> Fal yorumlanması için yüklediğiniz fotoğrafların (fincan, el vb.) üçüncü şahısların gizliliğini ihlal etmediğinden, müstehcen veya yasadışı unsurlar içermediğinden emin olmalısınız.</li>
                                <li><strong>Hesap Güvenliği:</strong> Hesap bilgilerinizin gizliliğini korumak sizin sorumluluğunuzdadır.</li>
                            </ul>

                            <h3>4. Ücretlendirme ve İadeler</h3>
                            <p>Platformdaki bazı hizmetler (özel yorumcular, VIP fal vb.) ücrete veya uygulama içi kredi sistemine tabi olabilir. Satın alınan dijital içerikler ve krediler anında ifa edildiği için, yasal cayma hakkı kapsamı dışındadır ve kural olarak iade edilmez.</p>

                            <h3>5. Fikri Mülkiyet</h3>
                            <p>FalaBak'ın isim hakkı, logosu, tasarımı, metinleri ve algoritmaları Şirketimize aittir ve telif hakları yasaları ile korunmaktadır. İzinsiz kopyalanamaz veya çoğaltılamaz.</p>

                            <h3>6. Değişiklikler</h3>
                            <p>FalaBak, bu Kullanım Şartları'nı dilediği zaman değiştirme hakkını saklı tutar. Yapılan değişiklikler Platformda yayınlandığı andan itibaren geçerli olur.</p>
                        </div>
                    ) : (
                        <div className="legal-text-container">
                            <h2>FalaBak Gizlilik Politikası ve KVKK Aydınlatma Metni</h2>
                            <p className="last-updated">Son Güncelleme Tarihi: 09 Mart 2026</p>

                            <h3>1. Hangi Verileri Topluyoruz?</h3>
                            <p>Size en iyi deneyimi sunabilmek için aşağıdaki verilerinizi işliyoruz:</p>
                            <ul>
                                <li><strong>Kimlik ve İletişim Verileri:</strong> Adınız, soyadınız, e-posta adresiniz, telefon numaranız (kayıt olduysanız).</li>
                                <li><strong>Profil Verileri:</strong> Doğum tarihiniz, burcunuz, cinsiyetiniz (Astroloji ve fal yorumlarının kişiselleştirilmesi için gereklidir).</li>
                                <li><strong>Kullanım Verileri:</strong> Platforma yüklediğiniz fotoğraflar (kahve fincanı, vb.), uygulama içi hareketleriniz ve tercihleriniz.</li>
                                <li><strong>Cihaz Verileri:</strong> IP adresiniz, cihaz modeliniz, işletim sisteminiz.</li>
                            </ul>

                            <h3>2. Verilerinizi Hangi Amaçlarla İşliyoruz?</h3>
                            <p>Topladığımız kişisel veriler, 6698 sayılı Kişisel Verilerin Korunması Kanunu'na (KVKK) uygun olarak şu amaçlarla işlenmektedir:</p>
                            <ul>
                                <li>Fal, astroloji ve yorum hizmetlerinin size özel olarak sunulması,</li>
                                <li>Kullanıcı hesabı oluşturulması ve yönetilmesi,</li>
                                <li>Uygulama içi satın alma süreçlerinin yürütülmesi,</li>
                                <li>Hizmet kalitesini artırmak ve algoritmalarımızı geliştirmek (anonimleştirilerek),</li>
                                <li>Gerektiğinde size teknik destek sağlanması.</li>
                            </ul>

                            <h3>3. Verilerin Paylaşımı</h3>
                            <p>Kişisel verileriniz, izniniz olmadan üçüncü şahıslara veya şirketlere satılmaz. Verileriniz yalnızca şu durumlarda paylaşılabilir:</p>
                            <ul>
                                <li>Yasal bir zorunluluk veya yetkili mercilerin resmi talebi halinde,</li>
                                <li>Hizmetin sunulabilmesi için teknik altyapı sağlayan iş ortaklarımızla (örn: bulut sunucu hizmetleri, ödeme altyapıları) gizlilik sözleşmeleri çerçevesinde.</li>
                            </ul>

                            <h3>4. Veri Güvenliği</h3>
                            <p>Verilerinizi yetkisiz erişime, kaybolmaya veya değiştirilmeye karşı korumak için sektör standartlarında güvenlik önlemleri (SSL şifreleme vb.) alıyoruz. Ancak, internet üzerinden yapılan hiçbir veri aktarımının %100 güvenli olamayacağını hatırlatmak isteriz.</p>

                            <h3>5. Çerezler (Cookies)</h3>
                            <p>Web sitemiz, kullanıcı deneyimini iyileştirmek ve site trafiğini analiz etmek için çerezler kullanmaktadır. Çerez tercihlerinizi tarayıcı ayarlarınızdan değiştirebilirsiniz.</p>

                            <h3>6. Kullanıcı Hakları (KVKK Madde 11)</h3>
                            <p>Kullanıcılar olarak;</p>
                            <ul>
                                <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme,</li>
                                <li>Verileriniz işlenmişse bilgi talep etme,</li>
                                <li>Verilerinizin eksik veya yanlış olması halinde düzeltilmesini isteme,</li>
                                <li>Hesabınızın ve kişisel verilerinizin silinmesini talep etme hakkına sahipsiniz.</li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LegalModal;
