import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, ChevronsRight, Lock } from 'lucide-react';
import Button from '../ui/Button';
import { cn } from '../../utils/helpers';

const EMOTION_CHIPS = [
    'Üzgün', 'Kızgın', 'Utanmış', 'Yalnız', 'Şaşkın',
    'Korkmuş', 'Hayal kırıklığı', 'Çaresiz', 'Güçsüz', 'Öfkeli',
];

const STEPS = [
    {
        key: 'what',
        emoji: '💬',
        wh: 'NE OLDU',
        heading: 'Ne oldu? Başından beri anlatır mısın?',
        sub: 'Hiçbir şeyi gizlemeye gerek yok — buradaki her şey yalnızca sana özeldir.',
        placeholder: 'Örneğin: "Geçen hafta sınıf grubunda benimle ilgili bir şey paylaşıldı ve herkes güldü. O günden beri okula gitmek istemiyorum…"',
        required: true,
        minLength: 30,
        minError: 'Biraz daha ayrıntı ekler misin? En az 30 karakter yeterli.',
        hasChips: false,
        rows: 5,
    },
    {
        key: 'who',
        emoji: '👤',
        wh: 'KİM',
        heading: 'Kim ya da kimler vardı orada?',
        sub: 'İsim yazmak zorunda değilsin — "bir sınıf arkadaşım", "bir grup" gibi yazabilirsin.',
        placeholder: 'Örneğin: "Sınıfımdan birkaç kişi ve bir öğretmen…"',
        required: false,
        hasChips: false,
        rows: 3,
    },
    {
        key: 'where',
        emoji: '📍',
        wh: 'NEREDE',
        heading: 'Bu nerede ve ne zaman yaşandı?',
        sub: 'Yer ve zaman ayrıntıları hikâyeni çok daha gerçek kılar.',
        placeholder: 'Örneğin: "Okul koridorunda, teneffüste…" ya da "Geçen ay, sosyal medyada…"',
        required: false,
        hasChips: false,
        rows: 3,
    },
    {
        key: 'feelings',
        emoji: '💜',
        wh: 'NASIL',
        heading: 'O an içinde neler hissettin?',
        sub: 'Kelimeler bulmak zor olabilir. Aşağıdan seçebilir ya da kendi cümlelerinle yazabilirsin.',
        placeholder: 'Duygularını kendi cümlelerinle de açıklayabilirsin…',
        required: true,
        minLength: 5,
        minError: 'En az birkaç kelimeyle anlatırsan çok yardımcı olur.',
        hasChips: true,
        rows: 3,
    },
    {
        key: 'why',
        emoji: '🤔',
        wh: 'NEDEN',
        heading: 'Bu deneyim neden bu kadar ağır geldi sana?',
        sub: 'Bazen bir şey ağır gelir çünkü bize önemli bir şeyi hatırlatır. Ne düşündürdü sana?',
        placeholder: 'Örneğin: "Çünkü o kişi benim için önemliydi…" ya da "Kimsenin görmemesi çok zordu…"',
        required: false,
        hasChips: false,
        rows: 3,
    },
    {
        key: 'strength',
        emoji: '✨',
        wh: 'GÜÇ',
        heading: 'Güçlü kaldığın bir an var mıydı? Bu eserden ne bekliyorsun?',
        sub: 'Ne kadar zor olsa da, o süreçte ayakta kalmayı başardın. Nasıl yaptın? Ve bu hikâye sana ne vermesini istiyorsun?',
        placeholder: 'Örneğin: "Müzik dinleyerek sakinleştim…" ya da "Bu hikâyenin beni güçlü hissettirmesini istiyorum."',
        required: false,
        hasChips: false,
        rows: 3,
    },
];

function buildStructuredContext(answers) {
    const parts = [];
    parts.push(`NE OLDU:\n${answers.what}`);
    if (answers.who?.trim()) parts.push(`KİM VARDI: ${answers.who.trim()}`);
    if (answers.where?.trim()) parts.push(`NEREDE/NE ZAMAN: ${answers.where.trim()}`);
    parts.push(`NASIL HİSSETTİRDİ:\n${answers.feelings}`);
    if (answers.why?.trim()) parts.push(`NEDEN ZOR GELDİ: ${answers.why.trim()}`);
    if (answers.strength?.trim()) parts.push(`GÜÇLÜ KALMA / BEKLENTI: ${answers.strength.trim()}`);
    return parts.join('\n\n');
}

const TEXTAREA_BASE =
    'w-full rounded-[14px] border border-neutral-200 bg-white px-4 py-3.5 text-[15px] text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-4 focus:border-primary-500 focus:ring-primary-100 hover:border-neutral-300 transition-all duration-200 resize-none leading-relaxed';

const ExperienceWizard = ({ onComplete }) => {
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState({ what: '', who: '', where: '', feelings: '', why: '', strength: '' });
    const [chips, setChips] = useState([]);
    const [error, setError] = useState(null);
    const [animKey, setAnimKey] = useState(0);

    const totalSteps = STEPS.length;
    const isReview = step === totalSteps;
    const progress = Math.round((step / totalSteps) * 100);

    const toggleChip = (chip) => {
        setChips(prev => prev.includes(chip) ? prev.filter(c => c !== chip) : [...prev, chip]);
        setError(null);
    };

    const getFeelingsFull = () => {
        const chipPart = chips.join(', ');
        const freePart = answers.feelings.trim();
        if (chipPart && freePart) return `${chipPart}. ${freePart}`;
        return chipPart || freePart;
    };

    const advance = () => {
        const s = STEPS[step];
        let value = s.key === 'feelings' ? getFeelingsFull() : answers[s.key];

        if (s.required) {
            if (!value?.trim()) { setError('Bu alan zorunlu — birkaç kelime bile yeterli!'); return; }
            if (s.minLength && value.trim().length < s.minLength) { setError(s.minError); return; }
        }

        // Bake combined feelings into answers before advancing
        if (s.key === 'feelings' && chips.length > 0) {
            setAnswers(prev => ({ ...prev, feelings: value }));
            setChips([]);
        }

        setError(null);
        setAnimKey(k => k + 1);
        setStep(s => s + 1);
    };

    const skip = () => { setError(null); setAnimKey(k => k + 1); setStep(s => s + 1); };
    const back = () => { setError(null); setAnimKey(k => k + 1); setStep(s => Math.max(0, s - 1)); };

    const complete = () => {
        const finalAnswers = { ...answers };
        if (chips.length > 0) finalAnswers.feelings = getFeelingsFull();
        const structured = buildStructuredContext(finalAnswers);
        const raw = Object.values(finalAnswers).filter(Boolean).join(' ');
        onComplete(structured, raw);
    };

    /* ── Review screen ─────────────────────────────────────────────────────── */
    if (isReview) {
        const filled = STEPS.filter(s => {
            const val = s.key === 'feelings' ? getFeelingsFull() : answers[s.key];
            return val?.trim();
        });

        return (
            <div className="space-y-5 animate-rise-in">
                <div className="text-center">
                    <span className="text-5xl">🦋</span>
                    <h2 className="mt-3 text-2xl font-extrabold text-neutral-900">Neredeyse hazır!</h2>
                    <p className="mt-1 text-sm leading-relaxed text-neutral-500">
                        Paylaştıklarını gözden geçir — sonra dönüştürmeye başlayalım.
                    </p>
                </div>

                <div className="space-y-3">
                    {STEPS.map((s, i) => {
                        const val = s.key === 'feelings' ? getFeelingsFull() : answers[s.key];
                        if (!val?.trim()) return null;
                        return (
                            <div key={s.key} className="card p-4">
                                <div className="mb-1.5 flex items-center justify-between">
                                    <span className="text-[11px] font-extrabold uppercase tracking-widest text-neutral-400">
                                        {s.emoji} {s.wh}
                                    </span>
                                    <button
                                        onClick={() => { setAnimKey(k => k + 1); setStep(i); }}
                                        className="text-[12px] font-bold text-primary-600 hover:underline"
                                    >
                                        Düzenle
                                    </button>
                                </div>
                                <p className="line-clamp-3 text-sm leading-relaxed text-neutral-700">{val}</p>
                            </div>
                        );
                    })}

                    {filled.length === 0 && (
                        <p className="text-center text-sm text-neutral-400">Henüz bir şey yazılmadı.</p>
                    )}
                </div>

                <Button size="lg" className="w-full" onClick={complete} disabled={!answers.what?.trim()}>
                    Dönüştür ✨
                </Button>
                <button
                    onClick={back}
                    className="mx-auto flex items-center gap-1.5 text-[13px] font-bold text-neutral-400 transition-colors hover:text-neutral-700"
                >
                    <ArrowLeft size={13} /> Geri Dön
                </button>
            </div>
        );
    }

    /* ── Answer step ───────────────────────────────────────────────────────── */
    const s = STEPS[step];

    return (
        <div className="space-y-6">
            {/* Progress bar */}
            <div>
                <div className="mb-2 flex items-center justify-between text-[12px] font-bold text-neutral-400">
                    <span>{step + 1} / {totalSteps} adım</span>
                    {!s.required && <span className="text-neutral-300">İsteğe bağlı — atlayabilirsin</span>}
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-neutral-100">
                    <div
                        className="h-full rounded-full bg-primary-500 transition-all duration-500 ease-out"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            {/* Step body */}
            <div key={animKey} className="space-y-4 animate-rise-in">
                <div className="flex items-center gap-3">
                    <span className="text-3xl">{s.emoji}</span>
                    <span className="rounded-full bg-primary-50 px-3 py-1 text-[12px] font-extrabold uppercase tracking-wider text-primary-700">
                        {s.wh}
                    </span>
                </div>

                <div>
                    <h2 className="mb-1 text-xl font-extrabold leading-snug text-neutral-900">{s.heading}</h2>
                    <p className="text-sm leading-relaxed text-neutral-500">{s.sub}</p>
                </div>

                {/* Emotion chips */}
                {s.hasChips && (
                    <div className="flex flex-wrap gap-2">
                        {EMOTION_CHIPS.map(chip => (
                            <button
                                key={chip}
                                type="button"
                                onClick={() => toggleChip(chip)}
                                className={cn(
                                    'rounded-full border px-3 py-1.5 text-[13px] font-bold transition-all duration-200',
                                    chips.includes(chip)
                                        ? 'border-primary-400 bg-primary-50 text-primary-700'
                                        : 'border-neutral-200 bg-white text-neutral-600 hover:border-primary-200 hover:text-primary-600'
                                )}
                            >
                                {chip}
                            </button>
                        ))}
                    </div>
                )}

                <textarea
                    value={answers[s.key]}
                    onChange={e => { setError(null); setAnswers(prev => ({ ...prev, [s.key]: e.target.value })); }}
                    placeholder={s.placeholder}
                    rows={s.rows}
                    className={TEXTAREA_BASE}
                    aria-label={s.heading}
                />

                {error && (
                    <p className="text-[13px] font-medium text-danger-600">{error}</p>
                )}
            </div>

            {/* Navigation */}
            <div className="flex items-center gap-3">
                {step > 0 && (
                    <Button variant="ghost" icon={ArrowLeft} onClick={back}>Geri</Button>
                )}
                <div className="flex flex-1 justify-end gap-3">
                    {!s.required && (
                        <Button variant="ghost" iconRight={ChevronsRight} onClick={skip}>Atla</Button>
                    )}
                    <Button iconRight={ArrowRight} onClick={advance}>
                        {step === totalSteps - 1 ? 'İncele' : 'Devam Et'}
                    </Button>
                </div>
            </div>

            <p className="flex items-center gap-1.5 text-[12px] font-bold text-neutral-300">
                <Lock size={11} /> Anlattıkların yalnızca sana özel — asla başkalarıyla paylaşılmaz.
            </p>
        </div>
    );
};

export default ExperienceWizard;
