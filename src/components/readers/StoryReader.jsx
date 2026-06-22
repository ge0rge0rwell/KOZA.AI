import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight, Volume2, VolumeX, Printer, BookOpen, Sparkles } from 'lucide-react';
import Button from '../ui/Button';
import ProgressBar from '../ui/ProgressBar';
import useSpeech from '../../hooks/useSpeech';
import { fireCelebration } from '../../lib/confetti';
import { cn } from '../../utils/helpers';

/**
 * Hikâye okuyucu — tek sayfa odaklı, mobil öncelikli kitap deneyimi.
 * Son sayfada yansıma sorusu + büyüme dersi ile kapanış.
 */
const StoryReader = ({ story, onBack, footerActions, onFinish }) => {
    const pages = useMemo(() => story.pages || [], [story.pages]);
    const total = pages.length;
    const [index, setIndex] = useState(0); // total === son: kapanış sayfası
    const isEnd = index >= total;
    const page = pages[index];
    const theme = story.themeColor || '#6A52DC';
    const { toggle, stop, isSpeaking, supported } = useSpeech();
    const finishedRef = useRef(false);

    const next = useCallback(() => {
        if (index === total - 1 && !finishedRef.current) {
            finishedRef.current = true;
            fireCelebration();
            onFinish?.();
        }
        setIndex((i) => Math.min(i + 1, total));
    }, [index, total, onFinish]);
    const prev = useCallback(() => setIndex((i) => Math.max(i - 1, 0)), []);

    useEffect(() => stop(), [index, stop]);

    useEffect(() => {
        const onKey = (e) => {
            if (e.key === 'ArrowRight') next();
            if (e.key === 'ArrowLeft') prev();
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [next, prev]);

    return (
        <div className="fixed inset-0 z-[70] flex flex-col bg-neutral-50">
            <div className="ambient-bg" aria-hidden />
            {/* Tema renkli ışık */}
            <div
                aria-hidden
                className="pointer-events-none fixed inset-x-0 top-0 h-72 opacity-[0.16]"
                style={{ background: `radial-gradient(60% 100% at 50% 0%, ${theme}, transparent)` }}
            />

            {/* ---------- Üst bar ---------- */}
            <header className="relative z-10 flex h-16 shrink-0 items-center justify-between gap-3 px-4 sm:px-6">
                <button
                    onClick={onBack}
                    className="flex h-10 items-center gap-2 rounded-full border border-neutral-200 bg-white/80 px-4 text-sm font-bold text-neutral-600 backdrop-blur transition-colors hover:bg-white"
                >
                    <ArrowLeft size={16} />
                    <span className="hidden sm:inline">Geri</span>
                </button>
                <div className="min-w-0 text-center">
                    <p className="truncate text-sm font-extrabold text-neutral-900">{story.title}</p>
                    <p className="text-[11px] font-bold tabular-nums text-neutral-400">
                        {isEnd ? 'Son' : `Sayfa ${index + 1} / ${total}`}
                    </p>
                </div>
                <div className="flex items-center gap-1.5">
                    <button
                        onClick={() => window.print()}
                        title="Yazdır / PDF"
                        aria-label="Yazdır"
                        className="hidden h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-white/80 text-neutral-500 backdrop-blur transition-colors hover:bg-white sm:flex"
                    >
                        <Printer size={16} />
                    </button>
                    {supported && !isEnd && (
                        <button
                            onClick={() => toggle(page ? `${page.title}. ${page.content}` : '')}
                            aria-pressed={isSpeaking}
                            className={cn(
                                'flex h-10 items-center gap-2 rounded-full px-4 text-sm font-bold transition-all',
                                isSpeaking
                                    ? 'bg-primary-600 text-white shadow-card'
                                    : 'border border-neutral-200 bg-white/80 text-neutral-600 backdrop-blur hover:bg-white'
                            )}
                        >
                            {isSpeaking ? <VolumeX size={16} /> : <Volume2 size={16} />}
                            <span className="hidden sm:inline">{isSpeaking ? 'Durdur' : 'Dinle'}</span>
                        </button>
                    )}
                </div>
            </header>

            {/* ---------- Sayfa ---------- */}
            <main className="relative z-10 flex flex-1 items-center justify-center overflow-y-auto px-4 py-4 sm:px-8">
                {!isEnd ? (
                    <article key={index} className="card animate-page-turn relative w-full max-w-2xl overflow-hidden p-8 sm:p-12">
                        <span aria-hidden className="absolute inset-x-0 top-0 h-1" style={{ background: theme }} />
                        <p className="mb-2 text-[11px] font-extrabold uppercase tracking-[0.22em]" style={{ color: theme }}>
                            {String(index + 1).padStart(2, '0')} · {page?.title}
                        </p>
                        <div className="reader-prose mt-5 max-h-[52dvh] overflow-y-auto pr-1 scrollbar-thin sm:max-h-[56dvh]">
                            <p>{page?.content}</p>
                        </div>
                        <p className="mt-8 text-center text-[11px] font-bold tracking-[0.3em] text-neutral-300">KOZA</p>
                    </article>
                ) : (
                    <div className="w-full max-w-2xl space-y-5 animate-scale-in">
                        <div className="card grain relative overflow-hidden p-9 text-center sm:p-12" style={{ background: `linear-gradient(150deg, ${theme}10, #fff 55%)` }}>
                            <span className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full" style={{ background: `${theme}1a`, color: theme }}>
                                <Sparkles size={28} />
                            </span>
                            <h2 className="mb-3 text-2xl font-extrabold sm:text-3xl">Hikâye tamamlandı</h2>
                            {story.growthLesson && (
                                <p className="mx-auto mb-6 max-w-md font-serif text-lg italic leading-relaxed text-neutral-700">
                                    "{story.growthLesson}"
                                </p>
                            )}
                            {story.reflectionQuestion && (
                                <div className="mx-auto max-w-md rounded-2xl border border-neutral-200 bg-white/80 p-5 text-left">
                                    <p className="mb-1 text-[11px] font-extrabold uppercase tracking-widest text-neutral-400">Düşünmek için</p>
                                    <p className="text-[15px] font-bold leading-relaxed text-neutral-800">{story.reflectionQuestion}</p>
                                </div>
                            )}
                        </div>
                        {footerActions && <div className="flex flex-col justify-center gap-3 sm:flex-row">{footerActions}</div>}
                    </div>
                )}
            </main>

            {/* ---------- Alt gezinme ---------- */}
            <footer className="relative z-10 shrink-0 px-4 pb-6 pt-2 sm:px-8">
                <div className="mx-auto flex max-w-2xl items-center gap-4">
                    <Button variant="secondary" size="sm" icon={ChevronLeft} onClick={prev} disabled={index === 0} aria-label="Önceki sayfa" />
                    <ProgressBar value={((Math.min(index, total)) / total) * 100} color={theme} className="flex-1" height={6} />
                    <Button size="sm" iconRight={ChevronRight} onClick={next} disabled={isEnd} aria-label="Sonraki sayfa" style={{ background: theme }}>
                        {index === total - 1 ? 'Bitir' : ''}
                    </Button>
                </div>
            </footer>

            {/* ---------- Yazdırma görünümü ---------- */}
            <div className="print-area hidden print:block">
                <h1 style={{ fontFamily: 'Lora, serif' }}>{story.title}</h1>
                {pages.map((p, i) => (
                    <div key={i} style={{ pageBreakInside: 'avoid', marginBottom: '1.5cm' }}>
                        <h3 style={{ fontFamily: 'Lora, serif' }}>{i + 1}. {p.title}</h3>
                        <p style={{ fontFamily: 'Lora, serif', lineHeight: 1.8 }}>{p.content}</p>
                    </div>
                ))}
                <p style={{ marginTop: '1cm', fontStyle: 'italic' }}>{story.growthLesson}</p>
                <p style={{ fontSize: 10, color: '#888' }}>KOZA ile oluşturuldu · koza.app</p>
            </div>
        </div>
    );
};

export default StoryReader;
