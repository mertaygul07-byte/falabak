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
                    <span className="footer-separator" style={{ display: 'none' }}>•</span>
                    <a className="footer-link" href="http://falabak.app/app-ads.txt" target="_blank" rel="noopener noreferrer" style={{ display: 'none' }}>
                        <FileText size={16} />
                        app-ads.txt
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
