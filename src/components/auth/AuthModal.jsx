import React, { useState } from 'react';
import { VenetianMask, Mail, ChevronDown, Shield, CheckCircle2 } from 'lucide-react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import { Input } from '../ui/Field';
import { ButterflyMark } from '../ui/Logo';
import { useAuth } from '../../context/AuthContext';
import { cn } from '../../utils/helpers';

const KVKK_KEY = 'koza-kvkk-v1';

const GoogleIcon = () => (
    <svg viewBox="0 0 48 48" width="17" height="17" aria-hidden>
        <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303C33.654 32.657 29.223 36 24 36c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" />
        <path fill="#FF3D00" d="m6.306 14.691 6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" />
        <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" />
        <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z" />
    </svg>
);

const KvkkStep = ({ onAccept }) => {
    const [checked, setChecked] = useState(false);

    return (
        <div className="px-7 pb-8 pt-10">
            <div className="mb-5 flex flex-col items-center text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-b from-primary-50 to-primary-100 shadow-[0_4px_16px_-4px_rgba(106,82,220,0.25)]">
                    <Shield size={32} className="text-primary-600" />
                </div>
                <h2 className="mb-1.5 text-2xl font-extrabold">Gizlilik ve Güvenlik</h2>
                <p className="text-sm text-neutral-500">KOZA'yı kullanmadan önce lütfen aydınlatma metnini oku.</p>
            </div>

            <div className="mb-5 max-h-72 overflow-y-auto rounded-2xl border border-neutral-200 bg-neutral-50 p-5 text-[13px] leading-relaxed text-neutral-700 scrollbar-thin">
                <p className="mb-3 font-bold text-neutral-800">KİŞİSEL VERİLERİN KORUNMASI KANUNU (KVKK) KAPSAMINDA AYDINLATMA METNİ</p>

                <p className="mb-2 font-semibold">Veri Sorumlusu</p>
                <p className="mb-4">KOZA uygulaması ("Hemhal Takımı", TEKNOFEST 2026), 6698 sayılı Kişisel Verilerin Korunması Kanunu uyarınca veri sorumlusu sıfatıyla hareket etmektedir. İletişim: <span className="font-medium">kozateknofest@gmail.com</span></p>

                <p className="mb-2 font-semibold">Hangi Veriler İşlenir?</p>
                <ul className="mb-4 list-disc pl-4 space-y-1">
                    <li>Anonim giriş tercih eden kullanıcılar için <strong>hiçbir kimlik bilgisi</strong> toplanmaz; yalnızca rastgele üretilmiş bir oturum kimliği oluşturulur.</li>
                    <li>Google veya e-posta ile giriş yapılması hâlinde <strong>e-posta adresi</strong> Firebase Authentication tarafından saklanır.</li>
                    <li>Uygulama içinde oluşturulan hikâye, oyun ve mektuplar; kazanılan ÖZ puanları ve rozet bilgileri.</li>
                    <li>Toplulukta paylaşılan eserler <strong>yalnızca takma adla</strong> (kelebek adı) görünür; gerçek kimliğinle ilişkilendirilmez.</li>
                    <li>Anonim kullanım istatistikleri (Google Analytics 4 — IP adresi gizlenerek).</li>
                </ul>

                <p className="mb-2 font-semibold">Veriler Neden İşlenir?</p>
                <ul className="mb-4 list-disc pl-4 space-y-1">
                    <li>Uygulamanın temel işlevlerini (içerik oluşturma, ÖZ ekonomisi, topluluk) sunmak.</li>
                    <li>Rehber öğretmenlere kimliksizleştirilmiş eğilim analizleri sağlamak.</li>
                    <li>Uygulamayı geliştirmek ve güvenliğini sağlamak.</li>
                </ul>

                <p className="mb-2 font-semibold">Veriler Kimlerle Paylaşılır?</p>
                <ul className="mb-4 list-disc pl-4 space-y-1">
                    <li><strong>Firebase (Google LLC)</strong> — kimlik doğrulama ve veritabanı hizmeti.</li>
                    <li><strong>OpenRouter</strong> — yapay zekâ içerik üretimi (yalnızca girilen deneyim metni, geçici olarak; saklanmaz).</li>
                    <li><strong>Google Analytics 4</strong> — anonim kullanım istatistiği.</li>
                    <li>Üçüncü şahıslarla ticari amaçla paylaşım <strong>yapılmaz</strong>.</li>
                </ul>

                <p className="mb-2 font-semibold">Hakların</p>
                <ul className="mb-4 list-disc pl-4 space-y-1">
                    <li>Verilerine erişme, düzeltme veya silme hakkına sahipsin.</li>
                    <li>Hesabını silmek için Profil sayfasındaki "Verilerimi İndir / Hesabı Sil" seçeneğini kullanabilirsin.</li>
                    <li>Her türlü soru için: <span className="font-medium">kozateknofest@gmail.com</span></li>
                </ul>

                <p className="mb-2 font-semibold">Güvenlik</p>
                <p className="mb-4">Veriler Firebase güvenlik kurallarıyla korunur; yalnızca hesabın sahibi kendi verisine erişebilir. Ham deneyim metnin <strong>asla</strong> toplulukla paylaşılmaz — yalnızca yapay zekânın dönüştürdüğü eser görünür.</p>

                <p className="text-[11px] text-neutral-400">Son güncelleme: Haziran 2026 · Bu metin KVKK Madde 10 kapsamında hazırlanmıştır.</p>
            </div>

            <label className="mb-5 flex cursor-pointer items-start gap-3 rounded-xl border border-neutral-200 bg-white p-4 transition-colors hover:border-primary-300 hover:bg-primary-50/30">
                <div className="relative mt-0.5 flex-shrink-0">
                    <input
                        type="checkbox"
                        className="sr-only"
                        checked={checked}
                        onChange={(e) => setChecked(e.target.checked)}
                    />
                    <div className={cn(
                        'flex h-5 w-5 items-center justify-center rounded-md border-2 transition-all',
                        checked
                            ? 'border-primary-600 bg-primary-600 text-white'
                            : 'border-neutral-300 bg-white'
                    )}>
                        {checked && <CheckCircle2 size={14} strokeWidth={2.5} />}
                    </div>
                </div>
                <span className="text-[13px] font-medium leading-relaxed text-neutral-700">
                    Yukarıdaki aydınlatma metnini okudum ve anladım. Kişisel verilerimin belirtilen amaçlarla işlenmesine onay veriyorum.
                </span>
            </label>

            <Button
                className="w-full"
                size="lg"
                disabled={!checked}
                onClick={() => {
                    if (!checked) return;
                    localStorage.setItem(KVKK_KEY, new Date().toISOString());
                    onAccept();
                }}
            >
                Devam Et
            </Button>
        </div>
    );
};

const AuthModal = ({ open, onClose }) => {
    const { signInAnon, signInGoogle, signInEmail, registerEmail } = useAuth();
    const [showEmail, setShowEmail] = useState(false);
    const [isRegister, setIsRegister] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [busy, setBusy] = useState(null); // 'anon' | 'google' | 'email'
    const [kvkkDone, setKvkkDone] = useState(() => !!localStorage.getItem(KVKK_KEY));

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

    // Modal kapanınca state sıfırlanmasın — ama yeniden açılınca KVKK zaten localStorage'da
    const handleClose = () => {
        setError(null);
        onClose?.();
    };

    return (
        <Modal open={open} onClose={handleClose} size="sm" labelledBy="auth-title">
            {!kvkkDone ? (
                <KvkkStep onAccept={() => setKvkkDone(true)} />
            ) : (
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
            )}
        </Modal>
    );
};

export default AuthModal;
