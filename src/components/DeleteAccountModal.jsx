import React, { useState, useEffect } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, deleteUser, GoogleAuthProvider, OAuthProvider, signInWithPopup } from 'firebase/auth';
import { X, Trash2, AlertTriangle, CheckCircle, Loader } from 'lucide-react';
import './DeleteAccountModal.css';

const DeleteAccountModal = ({ onClose }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [step, setStep] = useState('form'); // 'form' | 'confirm' | 'deleting' | 'success' | 'error'
    const [errorMessage, setErrorMessage] = useState('');
    const [pendingUser, setPendingUser] = useState(null);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email || !password) {
            setErrorMessage('Lütfen e-posta ve şifrenizi girin.');
            return;
        }
        setErrorMessage('');
        setPendingUser(null);
        setStep('confirm');
    };

    const handleSocialLogin = async (provider) => {
        try {
            const result = await signInWithPopup(auth, provider);
            setPendingUser(result.user);
            setErrorMessage('');
            setStep('confirm');
        } catch (error) {
            console.error('Social login error:', error.code, error.message);
            let msg = 'Giriş yapılırken bir hata oluştu.';
            if (error.code === 'auth/popup-closed-by-user') {
                msg = 'Giriş penceresi kapatıldı. Lütfen tekrar deneyin.';
            } else if (error.code === 'auth/cancelled-popup-request') {
                return;
            } else if (error.code === 'auth/operation-not-allowed') {
                msg = 'Bu giriş yöntemi şu anda etkin değil. Lütfen başka bir yöntem deneyin.';
            } else if (error.code === 'auth/popup-blocked') {
                msg = 'Tarayıcınız açılır pencereyi engelledi. Lütfen izin verin ve tekrar deneyin.';
            } else if (error.code === 'auth/unauthorized-domain') {
                msg = 'Bu alan adı yetkilendirilmemiş. Lütfen Firebase Console\'dan alan adını ekleyin.';
            }
            setErrorMessage(msg);
            setStep('error');
        }
    };

    const handleGoogleLogin = () => {
        const provider = new GoogleAuthProvider();
        handleSocialLogin(provider);
    };

    const handleAppleLogin = () => {
        const provider = new OAuthProvider('apple.com');
        provider.addScope('email');
        provider.addScope('name');
        handleSocialLogin(provider);
    };

    const handleConfirmDelete = async () => {
        setStep('deleting');
        try {
            let user = pendingUser;
            if (!user) {
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                user = userCredential.user;
            }
            await deleteUser(user);
            setStep('success');
        } catch (error) {
            let msg = 'Hesap silinirken bir hata oluştu.';
            if (error.code === 'auth/invalid-credential' || error.code === 'auth/wrong-password') {
                msg = 'E-posta veya şifre hatalı. Lütfen tekrar deneyin.';
            } else if (error.code === 'auth/user-not-found') {
                msg = 'Bu e-posta adresiyle kayıtlı bir hesap bulunamadı.';
            } else if (error.code === 'auth/too-many-requests') {
                msg = 'Çok fazla deneme yaptınız. Lütfen daha sonra tekrar deneyin.';
            } else if (error.code === 'auth/invalid-email') {
                msg = 'Geçersiz e-posta adresi.';
            }
            setErrorMessage(msg);
            setStep('error');
        }
    };

    return (
        <div className="delete-modal-overlay" onClick={onClose}>
            <div className="delete-modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="delete-modal-close" onClick={onClose}>
                    <X size={24} />
                </button>

                {step === 'form' && (
                    <div className="delete-modal-body">
                        <div className="delete-modal-icon">
                            <Trash2 size={48} />
                        </div>
                        <h2>Hesap Silme</h2>
                        <p className="delete-modal-desc">
                            Hesabınızı kalıcı olarak silmek için giriş yapın.
                        </p>

                        <div className="delete-social-buttons">
                            <button type="button" className="delete-social-btn google" onClick={handleGoogleLogin}>
                                <svg viewBox="0 0 24 24" width="20" height="20">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                                </svg>
                                Google ile Giriş Yap
                            </button>
                            <button type="button" className="delete-social-btn apple" onClick={handleAppleLogin}>
                                <svg viewBox="0 0 24 24" width="20" height="20" fill="white">
                                    <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                                </svg>
                                Apple ile Giriş Yap
                            </button>
                        </div>

                        <div className="delete-divider">
                            <span>veya e-posta ile</span>
                        </div>

                        <form onSubmit={handleSubmit} className="delete-form">
                            <div className="delete-input-group">
                                <label htmlFor="delete-email">E-posta</label>
                                <input
                                    id="delete-email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="ornek@email.com"
                                    autoComplete="email"
                                />
                            </div>
                            <div className="delete-input-group">
                                <label htmlFor="delete-password">Şifre</label>
                                <input
                                    id="delete-password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    autoComplete="current-password"
                                />
                            </div>
                            {errorMessage && (
                                <p className="delete-error">{errorMessage}</p>
                            )}
                            <button type="submit" className="delete-submit-btn">
                                Devam Et
                            </button>
                        </form>
                    </div>
                )}

                {step === 'confirm' && (
                    <div className="delete-modal-body">
                        <div className="delete-modal-icon warning">
                            <AlertTriangle size={48} />
                        </div>
                        <h2>Emin misiniz?</h2>
                        <p className="delete-modal-desc">
                            Bu işlem geri alınamaz. Hesabınız ve tüm verileriniz kalıcı olarak silinecektir.
                        </p>
                        <div className="delete-confirm-buttons">
                            <button className="delete-cancel-btn" onClick={() => { setStep('form'); setPendingUser(null); }}>
                                Vazgeç
                            </button>
                            <button className="delete-confirm-btn" onClick={handleConfirmDelete}>
                                Evet, Hesabımı Sil
                            </button>
                        </div>
                    </div>
                )}

                {step === 'deleting' && (
                    <div className="delete-modal-body">
                        <div className="delete-modal-icon loading">
                            <Loader size={48} className="spinner" />
                        </div>
                        <h2>Hesabınız Siliniyor...</h2>
                        <p className="delete-modal-desc">Lütfen bekleyin.</p>
                    </div>
                )}

                {step === 'success' && (
                    <div className="delete-modal-body">
                        <div className="delete-modal-icon success">
                            <CheckCircle size={48} />
                        </div>
                        <h2>Hesabınız Silindi</h2>
                        <p className="delete-modal-desc">
                            Hesabınız başarıyla silindi. FalaBak'ı tercih ettiğiniz için teşekkür ederiz.
                        </p>
                        <button className="delete-submit-btn" onClick={onClose}>
                            Kapat
                        </button>
                    </div>
                )}

                {step === 'error' && (
                    <div className="delete-modal-body">
                        <div className="delete-modal-icon warning">
                            <AlertTriangle size={48} />
                        </div>
                        <h2>Hata Oluştu</h2>
                        <p className="delete-modal-desc">{errorMessage}</p>
                        <button className="delete-submit-btn" onClick={() => { setStep('form'); setErrorMessage(''); setPendingUser(null); }}>
                            Tekrar Dene
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DeleteAccountModal;
