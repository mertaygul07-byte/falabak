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
                            <h2>Faltanat Kullanım Şartları</h2>
                            <p className="last-updated">Son Güncelleme Tarihi: 05 Nisan 2026</p>

                            <h3>1. Taraflar ve Kabul</h3>
                            <p>Bu Kullanım Şartları, FalaBak mobil uygulamasını ve web sitesini (bundan böyle &quot;Platform&quot; olarak anılacaktır) kullanan kişi (&quot;Kullanıcı&quot;) ile FalaBak (&quot;Şirket&quot;) arasında düzenlenmiştir. Platformu kullanarak bu şartları kabul etmiş sayılırsınız. Şartları kabul etmiyorsanız, lütfen Platformu kullanmayınız.</p>

                            <h3>2. Hizmetin Doğası (Eğlence ve Yapay Zeka)</h3>
                            <ul>
                                <li>Faltanat, kullanıcılarına kahve falı, tarot, astroloji ve benzeri mistik yorumlar sunan bir eğlence platformudur.</li>
                                <li><strong>Yapay Zeka Bildirimi:</strong> Platformda sunulan yorumlar, tahminler ve analizler gelişmiş Yapay Zeka (AI) algoritmaları tarafından kurgusal olarak üretilmektedir ve hiçbir gerçekliği, doğruluğu veya geleceği bilme iddiası yoktur.</li>
                                <li>Sunulan içerikler hiçbir koşulda psikolojik, tıbbi, hukuki, finansal veya profesyonel bir tavsiye niteliği taşımaz. Kullanıcıların, bu yorumlara dayanarak alacakları kararlardan ve sonuçlardan Faltanat ve çalışanları sorumlu tutulamaz.</li>
                            </ul>

                            <h3>3. Kullanıcı Yükümlülükleri</h3>
                            <ul>
                                <li><strong>Yaş Sınırı:</strong> Faltanat hizmetlerinden yararlanabilmek ve uygulama içi satın alım yapabilmek için en az 18 yaşında olmanız gerekmektedir. Platformu kullanarak 18 yaşından büyük olduğunuzu beyan etmiş olursunuz.</li>
                                <li><strong>İçerik Yükleme:</strong> Fal yorumlanması için yüklediğiniz fotoğrafların (kahve fincanı vb.) üçüncü şahısların gizliliğini ihlal etmediğinden, yüz veya kimlik bilgisi barındırmadığından, müstehcen veya yasadışı unsurlar içermediğinden emin olmalısınız.</li>
                                <li><strong>Hesap Güvenliği:</strong> Hesap bilgilerinizin gizliliğini korumak sizin sorumluluğunuzdadır. Hesabınız üzerinden yapılan tüm işlemlerden bizzat sorumlu olduğunuzu kabul edersiniz.</li>
                            </ul>

                            <h3>4. Ücretlendirme, Abonelikler ve İadeler</h3>
                            <p>Platformdaki bazı hizmetler (Premium üyelik, mücevher/kredi sistemi vb.) ücrete tabidir. Satın alınan dijital içerikler ve krediler anında ifa edildiği için, yasal cayma hakkı kapsamı dışındadır.</p>
                            <p><strong>Mağaza Kuralları ve İadeler:</strong> Tüm satın alma işlemleri ve abonelikler, cihazınızın işletim sistemine bağlı olarak Apple App Store veya Google Play Store hesabınız üzerinden gerçekleşir. Bu nedenle abonelik iptalleri, yenilemeler ve iade talepleri doğrudan satın alımın yapıldığı platformun (Apple veya Google) kurallarına ve iade politikalarına tabidir. Şirketimiz, bu mağazalar üzerinden yapılan alışverişlere doğrudan müdahale edemez ve kendi inisiyatifiyle iade yapma yetkisine sahip değildir.</p>
                            <p>Abonelik iptallerini cihazınızın hesap ayarlarındaki &quot;Abonelikler&quot; menüsünden bizzat yapmanız gerekmektedir. İptal işlemi yapılmadığı sürece abonelikler otomatik olarak yenilenir.</p>

                            <h3>5. Fikri Mülkiyet</h3>
                            <p>Faltanat'ın isim hakkı, logosu, tasarımı, metinleri ve algoritmaları Şirketimize aittir ve telif hakları yasaları ile korunmaktadır. Önceden yazılı izin alınmaksızın hiçbir içerik kopyalanamaz, çoğaltılamaz veya ticari amaçla kullanılamaz.</p>

                            <h3>6. Değişiklikler</h3>
                            <p>Faltanat, bu Kullanım Şartları'nı dilediği zaman, önceden haber vermeksizin değiştirme hakkını saklı tutar. Yapılan değişiklikler Platformda yayınlandığı andan itibaren geçerli olur. Platformu kullanmaya devam etmeniz, güncel şartları kabul ettiğiniz anlamına gelir.</p>
                        </div>
                    ) : (
                        <div className="legal-text-container">
                            <h2>Faltanat Gizlilik Politikası ve KVKK Aydınlatma Metni</h2>
                            <p className="last-updated">Son Güncelleme Tarihi: 05 Nisan 2026</p>
                            <p>Faltanat olarak, kişisel verilerinizin güvenliği ve gizliliği bizim için en öncelikli konudur. Bu metin, mobil uygulamamızı kullanırken hangi verilerinizin toplandığını, nasıl işlendiğini ve nasıl korunduğunu şeffaf bir şekilde açıklamak amacıyla hazırlanmıştır.</p>

                            <h3>1. Hangi Verileri Topluyoruz?</h3>
                            <p>Hizmetlerimizi sunabilmek ve deneyiminizi kişiselleştirmek adına aşağıdaki verileri topluyoruz:</p>
                            <ul>
                                <li><strong>Kimlik ve İletişim Verileri:</strong> Kayıt yönteminize bağlı olarak e-posta adresiniz ve takma adınız (nickname).</li>
                                <li><strong>Profil Verileri:</strong> Doğum tarihiniz, doğum saatiniz, cinsiyetiniz, burcunuz ve ilişki durumunuz (Bu veriler, AI tabanlı yorumların size özel üretilmesi için gereklidir).</li>
                                <li><strong>Kullanım Verileri:</strong> Platforma yüklediğiniz fotoğraflar (kahve fincanı, el falı vb.), uygulama içi tercihleriniz ve dijital kredi (mücevher) bakiyeniz.</li>
                                <li><strong>Cihaz ve Günlük Verileri:</strong> IP adresiniz, cihaz modeliniz, işletim sistemi sürümünüz ve reklam tanımlayıcılarınız (IDFA/AAID).</li>
                            </ul>

                            <h3>2. Verilerin İşlenme Amaçları</h3>
                            <p>Topladığımız veriler, 6698 sayılı KVKK ve ilgili mevzuat uyarınca şu amaçlarla işlenir:</p>
                            <ul>
                                <li>Yapay zeka (AI) destekli fal, astroloji ve mistik yorum hizmetlerinin sağlanması.</li>
                                <li>Kullanıcı hesabı yönetimi ve uygulama içi satın alımların doğrulanması.</li>
                                <li>Siber güvenliğin sağlanması ve kötü niyetli girişimlerin (bot saldırıları vb.) engellenmesi.</li>
                                <li>Ödüllü reklamlar aracılığıyla ücretsiz içerik sunulması ve uygulama performansının analizi.</li>
                            </ul>

                            <h3>3. Verilerin Paylaşımı ve Üçüncü Taraf Servisler</h3>
                            <p>Verileriniz, yalnızca hizmetin ifası için gerekli olan aşağıdaki güvenilir altyapı sağlayıcılarımızla, gizlilik sözleşmeleri çerçevesinde paylaşılmaktadır:</p>
                            <ul>
                                <li><strong>Bulut ve Veritabanı Sağlayıcıları:</strong> Verileriniz güvenli bir şekilde Google Firebase ve Cloudflare sunucularında saklanmaktadır.</li>
                                <li><strong>Yapay Zeka İşleyicileri:</strong> Yüklediğiniz fotoğraflar, fal yorumu üretilmesi amacıyla şifreli bir kanal üzerinden AI servis sağlayıcılarına iletilir. Bu fotoğraflar yorum üretildikten sonra kalıcı olarak saklanmaz ve yapay zeka modellerini eğitmek için kullanılmaz.</li>
                                <li><strong>Ödeme ve Abonelik Yönetimi:</strong> Satın alma süreçlerinin takibi için RevenueCat, Apple ve Google sistemleri kullanılır.</li>
                                <li><strong>Reklam Ağları:</strong> Uygulama içi reklam gösterimleri için cihaz tanımlayıcılarınız reklam iş ortaklarıyla paylaşılabilir.</li>
                            </ul>

                            <h3>4. Veri Güvenliği</h3>
                            <p>Faltanat, verilerinizi yetkisiz erişime, kaybolmaya veya manipülasyona karşı korumak için endüstri standardı olan SSL/TLS şifreleme ve App Check güvenlik protokollerini kullanmaktadır. Verileriniz şifrelenmiş sunucularda barındırılmaktadır.</p>

                            <h3>5. Hesap ve Veri Silme Hakları</h3>
                            <p>Kullanıcılar olarak verileriniz üzerinde tam kontrol sahibisiniz. Hesabınızı ve tüm verilerinizi kalıcı olarak silmek için:</p>
                            <ul>
                                <li>Uygulama içerisindeki &quot;Ayarlar/Profil &gt; Hesabı Sil&quot; seçeneğini kullanarak tüm verilerinizi saniyeler içinde kalıcı olarak silebilirsiniz.</li>
                                <li>Uygulamaya erişim sağlayamadığınız durumlarda, faltanatsupport@gmail.com adresine kayıtlı e-postanızdan talep göndererek verilerinizin silinmesini isteyebilirsiniz. Talebiniz yasal süreler içinde işleme alınacaktır.</li>
                            </ul>
                            <p><strong>Not:</strong> Hesap silme işlemi geri alınamaz ve silinen mücevher/kredi bakiyeleri iade edilemez.</p>

                            <h3>6. Çerezler ve Takip Teknolojileri</h3>
                            <p>Uygulamamız, kullanıcı oturumlarını yönetmek ve tercihleri hatırlamak için gerekli teknik takip teknolojilerini kullanmaktadır. Reklam tercihlerinizi cihazınızın gizlilik ayarlarından dilediğiniz zaman yönetebilirsiniz.</p>

                            <h3>7. İletişim</h3>
                            <p>Bu politika hakkındaki sorularınız veya KVKK kapsamındaki talepleriniz için bizimle iletişime geçebilirsiniz:</p>
                            <p>E-posta: faltanatsupport@gmail.com</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LegalModal;
