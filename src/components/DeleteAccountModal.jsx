import React, { useState, useEffect } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, deleteUser } from 'firebase/auth';
import { X, Trash2, AlertTriangle, CheckCircle, Loader } from 'lucide-react';
import './DeleteAccountModal.css';

const DeleteAccountModal = ({ onClose }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [step, setStep] = useState('form'); // 'form' | 'confirm' | 'deleting' | 'success' | 'error'
    const [errorMessage, setErrorMessage] = useState('');

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
        setStep('confirm');
    };

    const handleConfirmDelete = async () => {
        setStep('deleting');
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            await deleteUser(userCredential.user);
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
                            Hesabınızı kalıcı olarak silmek için lütfen e-posta adresinizi ve şifrenizi girin.
                        </p>
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
                            <button className="delete-cancel-btn" onClick={() => setStep('form')}>
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
                        <button className="delete-submit-btn" onClick={() => { setStep('form'); setErrorMessage(''); }}>
                            Tekrar Dene
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DeleteAccountModal;
