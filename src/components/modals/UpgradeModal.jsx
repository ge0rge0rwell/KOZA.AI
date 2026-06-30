import React, { useState } from 'react';
import { Check, School, Copy, ArrowLeft } from 'lucide-react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import { Input } from '../ui/Field';
import { useUI } from '../../context/UIContext';
import { PLANS, COUNSELOR_ACCESS_CODE, SCHOOL_EMAIL_SUFFIX } from '../../config/constants';
import { fireConfetti } from '../../lib/confetti';

/**
 * KOZA Okul — ücretsiz etkinleştirme.
 * Akış: tanıtım → resmî okul e-postası (k12 uzantılı) ile talep → erişim kodu teslimi.
 * Rehber öğretmen kodu Profil'den girerek panele ulaşır.
 */
const UpgradeModal = () => {
    const { activeModal, closeModal, addToast } = useUI();
    const [step, setStep] = useState('intro'); // 'intro' | 'claim'
    const [schoolEmail, setSchoolEmail] = useState('');
    const [emailError, setEmailError] = useState(null);
    const [processing, setProcessing] = useState(false);
    const [schoolCode, setSchoolCode] = useState(null);
    const open = activeModal === 'upgrade';

    const claim = (e) => {
        e.preventDefault();
        const email = schoolEmail.trim().toLowerCase();
        const validEmail = /\S+@\S+\.\S+/.test(email) && email.endsWith(SCHOOL_EMAIL_SUFFIX);
        if (!validEmail) {
            setEmailError(`Resmî okul e-postanı gir (${SCHOOL_EMAIL_SUFFIX} ile bitmeli).`);
            return;
        }
        setEmailError(null);
        setProcessing(true);
        // Kısa doğrulama animasyonu
        setTimeout(() => {
            setProcessing(false);
            setSchoolCode(COUNSELOR_ACCESS_CODE);
            fireConfetti();
        }, 900);
    };

    const copyCode = async () => {
        try {
            await navigator.clipboard.writeText(schoolCode);
            addToast('success', 'Kod kopyalandı', 'Rehber öğretmenlerinizle paylaşabilirsiniz.');
        } catch {
            addToast('info', 'Kod', schoolCode);
        }
    };

    const close = () => {
        setStep('intro');
        setSchoolEmail('');
        setEmailError(null);
        setSchoolCode(null);
        closeModal();
    };

    return (
        <Modal open={open} onClose={close} size="lg" labelledBy="upgrade-title">
            <div className="px-7 pb-8 pt-10">
                {schoolCode ? (
                    /* ---------- 3) Okul kodu teslimi ---------- */
                    <div className="text-center animate-scale-in">
                        <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-success-50 text-success-600">
                            <Check size={26} strokeWidth={2.5} />
                        </span>
                        <h2 className="mb-2 text-2xl font-extrabold">KOZA Okul aktif!</h2>
                        <p className="mx-auto mb-6 max-w-md text-sm leading-relaxed text-neutral-500">
                            Rehber öğretmenleriniz aşağıdaki erişim kodunu <strong>Profil → Rehber öğretmen misin?</strong> bölümüne
                            girerek anonim analiz paneline ulaşabilir.
                        </p>
                        <button
                            onClick={copyCode}
                            className="mx-auto mb-7 flex items-center gap-3 rounded-2xl border-2 border-dashed border-primary-300 bg-primary-50 px-6 py-4 font-mono text-lg font-extrabold tracking-widest text-primary-700 transition-transform hover:scale-[1.02] active:scale-95"
                        >
                            {schoolCode}
                            <Copy size={16} />
                        </button>
                        <Button onClick={close}>Tamam</Button>
                    </div>
                ) : step === 'claim' ? (
                    /* ---------- 2) Resmî okul e-postası ile talep ---------- */
                    <>
                        <button
                            onClick={() => { setStep('intro'); setEmailError(null); }}
                            className="mb-4 flex items-center gap-1.5 text-[13px] font-bold text-neutral-400 transition-colors hover:text-neutral-700"
                        >
                            <ArrowLeft size={14} /> Geri
                        </button>
                        <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-500 text-white">
                            <School size={26} />
                        </span>
                        <h2 id="upgrade-title" className="mb-1.5 text-center text-2xl font-extrabold">Okulunu doğrula</h2>
                        <p className="mx-auto mb-7 max-w-md text-center text-sm leading-relaxed text-neutral-500">
                            KOZA Okul ücretsizdir. Talep etmek için resmî okul e-postanı ({SCHOOL_EMAIL_SUFFIX} uzantılı) gir;
                            erişim kodunu hemen oluşturalım.
                        </p>
                        <form onSubmit={claim} className="mx-auto max-w-md space-y-3">
                            <Input
                                type="email"
                                placeholder={`Okul e-postan (ör. okul${SCHOOL_EMAIL_SUFFIX})`}
                                value={schoolEmail}
                                onChange={(e) => setSchoolEmail(e.target.value)}
                                error={emailError}
                            />
                            <Button size="lg" type="submit" className="w-full" icon={School} loading={processing}>
                                Erişim Kodumu Oluştur
                            </Button>
                        </form>
                    </>
                ) : (
                    /* ---------- 1) Tanıtım ---------- */
                    <>
                        <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-500 text-white">
                            <School size={26} />
                        </span>
                        <h2 id="upgrade-title" className="mb-1.5 text-center text-2xl font-extrabold">KOZA Okul</h2>
                        <p className="mx-auto mb-7 max-w-md text-center text-sm leading-relaxed text-neutral-500">
                            KOZA her zaman ücretsiz. Okullar için rehberlik servisine anonim analiz paneli getiren
                            KOZA Okul ile sınıflarındaki eğilimleri kimliksizleştirilmiş olarak görebilirsiniz.
                        </p>

                        <div className="mb-6 rounded-3xl border-2 border-accent-200 bg-accent-50/40 p-6">
                            <p className="mb-1 font-extrabold text-neutral-900">{PLANS.school.name}</p>
                            <p className="mb-4 text-[13px] font-extrabold text-accent-600">{PLANS.school.priceLabel}</p>
                            <ul className="space-y-1.5">
                                {PLANS.school.features.map((f) => (
                                    <li key={f} className="flex items-start gap-2 text-[13px] font-bold leading-snug text-neutral-600">
                                        <Check size={14} strokeWidth={3} className="mt-0.5 shrink-0 text-accent-500" />
                                        {f}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <Button size="lg" className="w-full" icon={School} onClick={() => setStep('claim')}>
                            Okulum İçin Etkinleştir
                        </Button>
                        <p className="mt-3 text-center text-[11px] font-bold text-neutral-300">
                            Tamamen ücretsiz · Resmî okul e-postası ile doğrulanır
                        </p>
                    </>
                )}
            </div>
        </Modal>
    );
};

export default UpgradeModal;
