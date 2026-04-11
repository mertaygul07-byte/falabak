import React from 'react';
import './Footer.css';
import { BookOpen, Shield, Trash2 } from 'lucide-react';

const Footer = ({ onOpenLegal }) => {
    return (
        <footer className="faltanat-footer">
            <div className="footer-content">
                <div className="footer-links">
                    <button className="footer-link" onClick={() => onOpenLegal('terms')}>
                        <BookOpen size={16} />
                        Kullanım Şartları
                    </button>
                    <span className="footer-separator">•</span>
                    <button className="footer-link" onClick={() => onOpenLegal('privacy')}>
                        <Shield size={16} />
                        Gizlilik Politikası
                    </button>
                    <span className="footer-separator">•</span>
                    <a className="footer-link footer-link-danger" href="#hesap-sil">
                        <Trash2 size={16} />
                        Hesap Sil
                    </a>
                    <a className="footer-link" href="https://faltanat.com.tr/privacy" style={{ display: 'none' }}>
                        Gizlilik Politikası (Hidden)
                    </a>
                    <a className="footer-link" href="https://faltanat.com.tr/terms" style={{ display: 'none' }}>
                        Kullanım Şartları (Hidden)
                    </a>
                    <a className="footer-link" href="https://www.faltanat.com.tr/app-ads.txt" style={{ display: 'none' }}>
                        App Ads (Hidden)
                    </a>
                </div>
                <div className="footer-copyright">
                    &copy; {new Date().getFullYear()} FalTanat. Tüm hakları saklıdır.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
