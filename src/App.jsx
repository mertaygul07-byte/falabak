import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FortuneTelling from './components/FortuneTelling';
import HowItWorks from './components/HowItWorks';
import Reviews from './components/Reviews';
import Footer from './components/Footer';
import LegalModal from './components/LegalModal';

function App() {
    const [legalModalContent, setLegalModalContent] = useState(null);

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
