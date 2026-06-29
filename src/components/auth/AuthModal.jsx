import React, { useState } from 'react';
import { VenetianMask, Mail, ChevronDown } from 'lucide-react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import { Input } from '../ui/Field';
import { ButterflyMark } from '../ui/Logo';
import { useAuth } from '../../context/AuthContext';
import { cn } from '../../utils/helpers';

const GoogleIcon = () => (
    <svg viewBox="0 0 48 48" width="17" height="17" aria-hidden>
        <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303C33.654 32.657 29.223 36 24 36c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" />
        <path fill="#FF3D00" d="m6.306 14.691 6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" />
        <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" />
        <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z" />
    </svg>
);

const AuthModal = ({ open, onClose }) => {
    const { signInAnon, signInGoogle, signInEmail, registerEmail } = useAuth();
    const [showEmail, setShowEmail] = useState(false);
    const [isRegister, setIsRegister] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [busy, setBusy] = useState(null); // 'anon' | 'google' | 'email'

    const run = async (key, fn) => {
        setBusy(key);
        setError(null);
        const result = await fn();
        setBusy(null);
        if (!result.ok) setError(result.error);
    };

    const submitEmail = (e) => {
        e.preventDefault();
        run('email', () => (isRegister ? registerEmail(email, password) : signInEmail(email, password)));
    };

    return (
        <Modal open={open} onClose={onClose} size="sm" labelledBy="auth-title">
            <div className="px-7 pb-8 pt-10 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-b from-primary-50 to-primary-100 shadow-[0_4px_16px_-4px_rgba(106,82,220,0.25)]">
                    <ButterflyMark size={40} className="text-primary-600" />
                </div>
                <h2 id="auth-title" className="mb-1.5 text-2xl font-extrabold">Güvenli alana hoş geldin</h2>
                <p className="mb-7 text-sm text-neutral-500">Kim olduğunu söylemene gerek yok. Burada hikâyen konuşur, kimliğin değil.</p>

                <Button className="w-full" size="lg" icon={VenetianMask} loading={busy === 'anon'} onClick={() => run('anon', signInAnon)}>
                    Anonim Olarak Başla
                </Button>
                <p className="mt-2.5 text-[11px] font-bold text-neutral-400">Önerilen · Kayıt gerektirmez · Saniyeler sürer</p>

                <div className="my-6 flex items-center gap-3 text-[11px] font-bold text-neutral-300">
                    <span className="h-px flex-1 bg-neutral-200" />
                    İLERLEMENİ TAŞIMAK İSTERSEN
                    <span className="h-px flex-1 bg-neutral-200" />
                </div>

                <div className="space-y-2.5">
                    <Button variant="secondary" className="w-full" loading={busy === 'google'} onClick={() => run('google', signInGoogle)}>
                        <GoogleIcon />
                        Google ile devam et
                    </Button>

                    <button
                        onClick={() => setShowEmail((v) => !v)}
                        className="flex w-full items-center justify-center gap-2 py-2 text-[13px] font-bold text-neutral-400 transition-colors hover:text-neutral-700"
                        aria-expanded={showEmail}
                    >
                        <Mail size={14} />
                        E-posta ile {isRegister ? 'kayıt ol' : 'giriş yap'}
                        <ChevronDown size={14} className={cn('transition-transform duration-300', showEmail && 'rotate-180')} />
                    </button>

                    {showEmail && (
                        <form onSubmit={submitEmail} className="space-y-3 rounded-2xl bg-neutral-50 p-4 text-left animate-rise-in">
                            <Input type="email" placeholder="E-posta" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" />
                            <Input
                                type="password"
                                placeholder="Şifre"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                minLength={6}
                                autoComplete={isRegister ? 'new-password' : 'current-password'}
                            />
                            <Button type="submit" className="w-full" loading={busy === 'email'}>
                                {isRegister ? 'Kayıt Ol' : 'Giriş Yap'}
                            </Button>
                            <p className="text-center text-[12px] font-bold text-neutral-400">
                                {isRegister ? 'Zaten hesabın var mı?' : 'Hesabın yok mu?'}{' '}
                                <button type="button" className="text-primary-600 hover:underline" onClick={() => setIsRegister((v) => !v)}>
                                    {isRegister ? 'Giriş yap' : 'Kayıt ol'}
                                </button>
                            </p>
                        </form>
                    )}
                </div>

                {error && (
                    <p role="alert" className="mt-4 rounded-xl bg-danger-50 px-4 py-2.5 text-[13px] font-bold text-danger-600 animate-rise-in">
                        {error}
                    </p>
                )}
            </div>
        </Modal>
    );
};

export default AuthModal;
