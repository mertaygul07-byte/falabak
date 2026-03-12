import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FortuneTelling from './components/FortuneTelling';
import HowItWorks from './components/HowItWorks';
import Reviews from './components/Reviews';
import Footer from './components/Footer';
import LegalModal from './components/LegalModal';
import DeleteAccountModal from './components/DeleteAccountModal';

function App() {
    const [legalModalContent, setLegalModalContent] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    React.useEffect(() => {
        const path = window.location.pathname;
        if (path === '/privacy' || path === '/privacy/') {
            setLegalModalContent('privacy');
        } else if (path === '/terms' || path === '/terms/') {
            setLegalModalContent('terms');
        } else if (path === '/delete' || path === '/delete/') {
            setShowDeleteModal(true);
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
            </main>
            <Footer
                onOpenLegal={(type) => setLegalModalContent(type)}
                onOpenDeleteAccount={() => setShowDeleteModal(true)}
            />

            {legalModalContent && (
                <LegalModal
                    type={legalModalContent}
                    onClose={() => setLegalModalContent(null)}
                />
            )}

            {showDeleteModal && (
                <DeleteAccountModal
                    onClose={() => setShowDeleteModal(false)}
                />
            )}
        </div>
    );
}

export default App;
