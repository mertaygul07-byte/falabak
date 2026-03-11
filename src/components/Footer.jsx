import React from 'react';
import './Footer.css';
import { BookOpen, Shield, FileText } from 'lucide-react';

const Footer = ({ onOpenLegal }) => {
    return (
        <footer className="falabak-footer">
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
                    <a className="footer-link" href="https://falabak.com.tr/privacy" style={{ display: 'none' }}>
                        Gizlilik Politikası (Hidden)
                    </a>
                    <a className="footer-link" href="https://www.falabak.com.tr/app-ads.txt" style={{ display: 'none' }}>
                        App Ads (Hidden)
                    </a>
                </div>
                <div className="footer-copyright">
                    &copy; {new Date().getFullYear()} FalaBak. Tüm hakları saklıdır.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
