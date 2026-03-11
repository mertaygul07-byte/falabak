import React, { useState, useEffect } from 'react';
import { Instagram, Menu, X } from 'lucide-react';
import './Navbar.css';

const Navbar = ({ onOpenLegal }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`navbar ${isScrolled ? 'scrolled glass' : ''}`}>
            <div className="navbar-container">
                {/* Logo */}
                <a href="/" className="navbar-logo">
                    <img src="/logo.jpeg" alt="FalaBak Logo" className="navbar-logo-img" />
                </a>

                {/* Desktop Links */}
                <div className="navbar-links">
                    <a href="#hizmetler">Hizmetler</a>
                    <a href="#nasil-calisir">Nasıl Çalışır?</a>
                    <a href="#yorumlar">Kullanıcı Yorumları</a>
                    <button onClick={() => onOpenLegal('terms')} className="navbar-legal-btn">Kullanım Şartları</button>
                    <button onClick={() => onOpenLegal('privacy')} className="navbar-legal-btn">Gizlilik Politikası</button>
                </div>

                {/* Action Buttons */}
                <div className="navbar-actions">
                    <a
                        href="https://www.instagram.com/falabak.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="instagram-link"
                    >
                        <Instagram size={28} />
                        <span>Bizi Takip Et</span>
                    </a>
                    <button className="download-btn glowing-gold brand-font">
                        Uygulamayı İndir
                    </button>

                    <button
                        className="mobile-menu-toggle"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="mobile-menu glass">
                    <a href="#hizmetler" onClick={() => setIsMobileMenuOpen(false)}>Hizmetler</a>
                    <a href="#nasil-calisir" onClick={() => setIsMobileMenuOpen(false)}>Nasıl Çalışır?</a>
                    <a href="#yorumlar" onClick={() => setIsMobileMenuOpen(false)}>Kullanıcı Yorumları</a>
                    <button onClick={() => { onOpenLegal('terms'); setIsMobileMenuOpen(false); }} className="mobile-menu-btn">Kullanım Şartları</button>
                    <button onClick={() => { onOpenLegal('privacy'); setIsMobileMenuOpen(false); }} className="mobile-menu-btn">Gizlilik Politikası</button>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
