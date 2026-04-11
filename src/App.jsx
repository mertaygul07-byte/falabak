import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FortuneTelling from './components/FortuneTelling';
import HowItWorks from './components/HowItWorks';
import Reviews from './components/Reviews';
import Footer from './components/Footer';
import LegalModal from './components/LegalModal';
import AccountDeletion from './components/AccountDeletion';

function App() {
    const [legalModalContent, setLegalModalContent] = useState(null);

    React.useEffect(() => {
        const path = window.location.pathname;
        if (path === '/privacy' || path === '/privacy/') {
            setLegalModalContent('privacy');
        } else if (path === '/terms' || path === '/terms/') {
            setLegalModalContent('terms');
        } else if (path === '/delete-account' || path === '/delete-account/') {
            // Scroll to account deletion section
            setTimeout(() => {
                const el = document.getElementById('hesap-sil');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
            }, 500);
        }
    }, []);

    return (
        <div className="app-container">
            {/* Animated Background Waves */}
            <div className="background-waves">
                <div className="wave wave1"></div>
                <div className="wave wave2"></div>
                <div className="wave wave3"></div>
            </div>

            <Navbar onOpenLegal={(type) => setLegalModalContent(type)} />
            <main>
                <Hero />
                <FortuneTelling />
                <HowItWorks />
                <Reviews />
                <AccountDeletion />
            </main>
            <Footer onOpenLegal={(type) => setLegalModalContent(type)} />

            {legalModalContent && (
                <LegalModal
                    type={legalModalContent}
                    onClose={() => setLegalModalContent(null)}
                />
            )}
        </div>
    );
}

export default App;
