import React, { useEffect, useState } from 'react';
import { ArrowLeft, Volume2, VolumeX, Sparkles } from 'lucide-react';
import useSpeech from '../../hooks/useSpeech';
import { fireCelebration } from '../../lib/confetti';
import { cn } from '../../utils/helpers';

/** Gelecekten mektup — zarftan açılan, el yazısı sıcaklığında okuma deneyimi. */
const LetterReader = ({ letter: creation, onBack, footerActions, onFinish }) => {
    const letter = creation.letter || {};
    const theme = creation.themeColor || '#6A52DC';
    const [opened, setOpened] = useState(false);
    const { toggle, isSpeaking, supported } = useSpeech();

    const fullText = [letter.greeting, ...(letter.paragraphs || []), letter.signature, letter.ps].filter(Boolean).join(' ');

    useEffect(() => {
        if (opened) {
            fireCelebration();
            onFinish?.();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [opened]);

    return (
        <div className="fixed inset-0 z-[70] flex flex-col bg-neutral-50">
            <div className="ambient-bg" aria-hidden />
            <div
                aria-hidden
                className="pointer-events-none fixed inset-x-0 top-0 h-72 opacity-[0.16]"
                style={{ background: `radial-gradient(60% 100% at 50% 0%, ${theme}, transparent)` }}
            />

            <header className="relative z-10 flex h-16 shrink-0 items-center justify-between gap-3 px-4 sm:px-6">
                <button
                    onClick={onBack}
                    className="flex h-10 items-center gap-2 rounded-full border border-neutral-200 bg-white/80 px-4 text-sm font-bold text-neutral-600 backdrop-blur transition-colors hover:bg-white"
                >
                    <ArrowLeft size={16} />
                    <span className="hidden sm:inline">Geri</span>
                </button>
                <p className="min-w-0 truncate text-sm font-extrabold text-neutral-900">{creation.title}</p>
                {supported && opened ? (
                    <button
                        onClick={() => toggle(fullText)}
                        aria-pressed={isSpeaking}
                        className={cn(
                            'flex h-10 items-center gap-2 rounded-full px-4 text-sm font-bold transition-all',
                            isSpeaking ? 'bg-primary-600 text-white shadow-card' : 'border border-neutral-200 bg-white/80 text-neutral-600 backdrop-blur hover:bg-white'
                        )}
                    >
                        {isSpeaking ? <VolumeX size={16} /> : <Volume2 size={16} />}
                        <span className="hidden sm:inline">{isSpeaking ? 'Durdur' : 'Dinle'}</span>
                    </button>
                ) : (
                    <span className="w-10" />
                )}
            </header>

            <main className="relative z-10 flex flex-1 items-center justify-center overflow-y-auto px-4 py-6 sm:px-8">
                {!opened ? (
                    /* ---------- Zarf ---------- */
                    <button onClick={() => setOpened(true)} className="group text-center animate-scale-in" aria-label="Mektubu aç">
                        <div className="relative mx-auto mb-7 h-44 w-64 transition-transform duration-500 group-hover:scale-105 sm:h-52 sm:w-80">
                            <div className="absolute inset-0 rounded-2xl bg-white shadow-lift" />
                            <div
                                className="absolute inset-x-0 top-0 h-1/2 rounded-t-2xl"
                                style={{ background: `linear-gradient(160deg, ${theme}25, ${theme}0d)`, clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}
                            />
                            <span
                                className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-white shadow-card animate-float-soft"
                                style={{ background: theme }}
                            >
                                <Sparkles size={20} />
                            </span>
                        </div>
                        <h2 className="mb-1.5 text-xl font-extrabold text-neutral-900">Sana bir mektup var</h2>
                        <p className="text-sm font-bold text-neutral-400">5 yıl sonraki senden · Açmak için dokun</p>
                    </button>
                ) : (
                    /* ---------- Mektup ---------- */
                    <div className="w-full max-w-xl space-y-5">
                        <article className="card grain relative overflow-hidden p-8 animate-rise-in-lg sm:p-12" style={{ background: 'linear-gradient(165deg, #FFFDF8, #fff)' }}>
                            <span aria-hidden className="absolute inset-x-0 top-0 h-1" style={{ background: theme }} />
                            <p className="mb-7 font-serif text-xl font-medium italic" style={{ color: theme }}>{letter.greeting}</p>
                            <div className="space-y-5">
                                {(letter.paragraphs || []).map((p, i) => (
                                    <p key={i} className="reader-prose !text-[16px] sm:!text-[17px]" style={{ animationDelay: `${i * 0.1}s` }}>
                                        {p}
                                    </p>
                                ))}
                            </div>
                            <p className="mt-9 text-right font-serif text-lg font-medium italic text-neutral-700">{letter.signature}</p>
                            {letter.ps && <p className="mt-4 font-serif text-[14px] italic text-neutral-400">{letter.ps}</p>}
                        </article>

                        {creation.reflectionQuestion && (
                            <div className="card p-5 animate-rise-in" style={{ animationDelay: '0.25s' }}>
                                <p className="mb-1 text-[11px] font-extrabold uppercase tracking-widest text-neutral-400">Düşünmek için</p>
                                <p className="text-[15px] font-bold leading-relaxed text-neutral-800">{creation.reflectionQuestion}</p>
                            </div>
                        )}

                        {footerActions && (
                            <div className="flex flex-col justify-center gap-3 pb-6 sm:flex-row animate-rise-in" style={{ animationDelay: '0.35s' }}>
                                {footerActions}
                            </div>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
};

export default LetterReader;
