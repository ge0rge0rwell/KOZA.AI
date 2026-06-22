import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, Dices, ShieldCheck, Sparkles, VenetianMask } from 'lucide-react';
import Button from '../components/ui/Button';
import { Input } from '../components/ui/Field';
import CocoonVisual from '../components/cocoon/CocoonVisual';
import { ButterflyMark } from '../components/ui/Logo';
import { useUser } from '../context/UserContext';
import { generatePseudonym, AVATAR_EMOJIS, AVATAR_COLORS } from '../utils/pseudonyms';
import { validateUsername, USERNAME_LIMITS } from '../utils/validation';
import { fireConfetti } from '../lib/confetti';
import { cn, pickRandom } from '../utils/helpers';

const TOTAL_STEPS = 3;

const OnboardingPage = () => {
    const { completeOnboarding } = useUser();
    const [step, setStep] = useState(0);
    const [pseudonym, setPseudonym] = useState(generatePseudonym);
    const [nameError, setNameError] = useState(null);
    const [emoji, setEmoji] = useState('🦋');
    const [color, setColor] = useState(() => pickRandom(AVATAR_COLORS));

    const onNameChange = (e) => {
        setPseudonym(e.target.value);
        if (nameError) setNameError(null);
    };

    // Adım 1 → 2 geçişinde takma adı doğrula (uygunsuz ad engellenir).
    const confirmName = () => {
        const result = validateUsername(pseudonym);
        if (!result.ok) {
            setNameError(result.error);
            return;
        }
        setPseudonym(result.value);
        setNameError(null);
        setStep(2);
    };

    const finish = () => {
        completeOnboarding({ pseudonym, emoji, color });
        fireConfetti();
    };

    return (
        <div className="flex min-h-dvh flex-col items-center justify-center px-5 py-10">
            <div className="ambient-bg" aria-hidden />

            <div className="w-full max-w-md">
                {/* İlerleme */}
                <div className="mb-8 flex items-center justify-center gap-2" aria-label={`Adım ${step + 1} / ${TOTAL_STEPS}`}>
                    {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
                        <span
                            key={i}
                            className={cn(
                                'h-1.5 rounded-full transition-all duration-500',
                                i === step ? 'w-8 bg-primary-500' : i < step ? 'w-3 bg-primary-300' : 'w-3 bg-neutral-200'
                            )}
                        />
                    ))}
                </div>

                <div className="card overflow-hidden p-8 text-center sm:p-10" key={step}>
                    {step === 0 && (
                        <div className="animate-rise-in">
                            <div className="mx-auto mb-6 flex justify-center"><CocoonVisual stage={2} size={170} /></div>
                            <h1 className="mb-3 text-2xl font-extrabold sm:text-[28px]">Burası senin güvenli alanın</h1>
                            <p className="mb-5 text-sm leading-relaxed text-neutral-500">
                                Paylaşmak kolay değil — bunu biliyoruz. Yaşadığın şeyi kelimelerle anlatmak
                                cesaret ister. KOZA'da hiç kimse seni yargılamıyor; gerçek adın zaten yok burada.
                            </p>
                            <p className="mb-8 text-sm leading-relaxed text-neutral-500">
                                Sadece yazıyorsun. Yapay zekâ seni hikâyenin kahramanına dönüştürüyor.
                                Ne kadar paylaşacağına sen karar veriyorsun.
                            </p>
                            <ul className="mb-8 space-y-3 text-left">
                                {[
                                    [VenetianMask, 'Tamamen anonimsin — gerçek adın, fotoğrafın, okulun hiçbir yerde görünmez.'],
                                    [ShieldCheck, 'Yazdığın metin yalnızca senin için işlenir; sen izin vermeden hiçbir şey paylaşılmaz.'],
                                    [Sparkles, 'Her eserle ÖZ kazanır, kozandan kelebeğe 7 aşamalı dönüşümünü izlersin.'],
                                ].map(([Icon, text], i) => (
                                    <li key={i} className="flex items-center gap-3 rounded-2xl bg-neutral-50 px-4 py-3">
                                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                                            <Icon size={17} />
                                        </span>
                                        <span className="text-[13px] font-bold leading-snug text-neutral-700">{text}</span>
                                    </li>
                                ))}
                            </ul>
                            <Button className="w-full" size="lg" iconRight={ArrowRight} onClick={() => setStep(1)}>
                                Hazırım
                            </Button>
                        </div>
                    )}

                    {step === 1 && (
                        <div className="animate-rise-in">
                            <h1 className="mb-2 text-2xl font-extrabold sm:text-[28px]">Kelebek adını seç</h1>
                            <p className="mb-7 text-sm leading-relaxed text-neutral-500">
                                Toplulukta seni bu ad temsil edecek — gerçek adını asla kullanma.
                                Emojini seçerken düşün: hangi simge sende güç hissettiriyor?
                            </p>

                            <div className="mb-6 flex flex-col items-center gap-3">
                                <span
                                    className="flex h-16 w-16 items-center justify-center rounded-3xl text-3xl shadow-soft"
                                    style={{ background: `${color}1f` }}
                                    aria-hidden
                                >
                                    {emoji}
                                </span>
                                <Input
                                    value={pseudonym}
                                    onChange={onNameChange}
                                    onKeyDown={(e) => e.key === 'Enter' && confirmName()}
                                    placeholder="Kendi takma adını yaz"
                                    maxLength={USERNAME_LIMITS.MAX}
                                    error={nameError}
                                    aria-label="Takma adın"
                                    className="w-full"
                                />
                                <button
                                    onClick={() => { setPseudonym(generatePseudonym()); setNameError(null); }}
                                    className="inline-flex items-center gap-1.5 text-[13px] font-bold text-primary-600 transition-colors hover:text-primary-700"
                                >
                                    <Dices size={14} />
                                    Rastgele bir ad öner
                                </button>
                            </div>

                            <p className="mb-2.5 text-left text-[12px] font-extrabold uppercase tracking-wider text-neutral-400">Simgen</p>
                            <div className="mb-5 grid grid-cols-6 gap-2">
                                {AVATAR_EMOJIS.map((e) => (
                                    <button
                                        key={e}
                                        onClick={() => setEmoji(e)}
                                        aria-pressed={emoji === e}
                                        className={cn(
                                            'flex h-11 items-center justify-center rounded-xl text-xl transition-all duration-200',
                                            emoji === e ? 'bg-primary-100 ring-2 ring-primary-400 scale-105' : 'bg-neutral-50 hover:bg-neutral-100'
                                        )}
                                    >
                                        {e}
                                    </button>
                                ))}
                            </div>

                            <p className="mb-2.5 text-left text-[12px] font-extrabold uppercase tracking-wider text-neutral-400">Rengin</p>
                            <div className="mb-8 flex justify-between gap-2">
                                {AVATAR_COLORS.map((c) => (
                                    <button
                                        key={c}
                                        onClick={() => setColor(c)}
                                        aria-label={`Renk ${c}`}
                                        aria-pressed={color === c}
                                        style={{ background: c }}
                                        className={cn(
                                            'h-9 w-9 rounded-full transition-all duration-200',
                                            color === c ? 'ring-4 ring-offset-2 ring-neutral-300 scale-110' : 'hover:scale-110'
                                        )}
                                    />
                                ))}
                            </div>

                            <div className="flex gap-3">
                                <Button variant="secondary" icon={ArrowLeft} onClick={() => setStep(0)} aria-label="Geri" />
                                <Button className="flex-1" size="lg" iconRight={ArrowRight} onClick={confirmName}>
                                    Devam Et
                                </Button>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="animate-rise-in">
                            <ButterflyMark size={52} className="mx-auto mb-5" />
                            <h1 className="mb-3 text-2xl font-extrabold sm:text-[28px]">Hoş geldin, {pseudonym} 🦋</h1>
                            <p className="mb-5 text-sm leading-relaxed text-neutral-500">
                                Artık KOZA ailesinin bir parçasısın. Sıradaki adımın basit:
                            </p>
                            <ul className="mb-6 space-y-2 text-left text-sm leading-relaxed text-neutral-600">
                                <li className="flex items-start gap-2">
                                    <span className="mt-0.5 text-primary-500 font-extrabold">1.</span>
                                    <span><strong>Oluştur</strong> — yaşadığın zorluğu anlat; hikâyene, oyununa ya da mektubuna dönüştür.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="mt-0.5 text-primary-500 font-extrabold">2.</span>
                                    <span><strong>Keşfet</strong> — topluluktan başkalarının dönüşümlerine bak; "hemhal" butonuyla destek ver.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="mt-0.5 text-primary-500 font-extrabold">3.</span>
                                    <span><strong>Büyü</strong> — her adımda ÖZ biriktir, kozanı kırdıkça kelebeğe dönüş.</span>
                                </li>
                            </ul>
                            <div className="mb-8 rounded-2xl bg-accent-50 px-5 py-4 text-[13px] font-bold leading-relaxed text-accent-800">
                                🎁 Başlangıç hediyen: <strong>+50 ÖZ</strong> seni bekliyor — ilk adımı at ve kazan.
                            </div>
                            <div className="flex gap-3">
                                <Button variant="secondary" icon={ArrowLeft} onClick={() => setStep(1)} aria-label="Geri" />
                                <Button className="flex-1" size="lg" iconRight={Sparkles} onClick={finish}>
                                    Yolculuğa Başla
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OnboardingPage;
