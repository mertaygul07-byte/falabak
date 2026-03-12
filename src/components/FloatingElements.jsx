import React from 'react';
import { CreditCard, Coffee } from 'lucide-react';

const FloatingElements = () => {
    return (
        <div className="floating-elements-container">
            {/* Tarot Cards */}
            <div className="floating-item card-1">
                <div className="tarot-card-inner">
                    <div className="tarot-pattern"></div>
                </div>
            </div>
            <div className="floating-item card-2">
                <div className="tarot-card-inner">
                    <div className="tarot-pattern"></div>
                </div>
            </div>
            <div className="floating-item card-3">
                <div className="tarot-card-inner">
                    <div className="tarot-pattern"></div>
                </div>
            </div>

            {/* Coffee Grounds / Small Elements */}
            <div className="floating-item coffee-1">
                <div className="coffee-spot"></div>
            </div>
            <div className="floating-item coffee-2">
                <div className="coffee-spot"></div>
            </div>
            <div className="floating-item coffee-3">
                <div className="coffee-spot"></div>
            </div>
        </div>
    );
};

export default FloatingElements;
