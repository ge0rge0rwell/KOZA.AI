import React, { useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, HeartHandshake, Trophy, Sparkles } from 'lucide-react';
import Button from '../ui/Button';
import ProgressBar from '../ui/ProgressBar';
import Badge from '../ui/Badge';
import { fireCelebration } from '../../lib/confetti';
import { cn } from '../../utils/helpers';

/**
 * İçsel Güç Labirenti — 3 bölümlük karar oyunu.
 * Yanlış cevap cezalandırmaz; şefkatle öğretir ve tekrar denetir.
 */
const GamePlayer = ({ game, onBack, footerActions, onFinish }) => {
    const levels = useMemo(() => game.levels || [], [game.levels]);
    const theme = game.themeColor || '#6A52DC';
    const [levelIndex, setLevelIndex] = useState(0);
    const [selected, setSelected] = useState(null);
    const [firstTry, setFirstTry] = useState(0);
    const [attempted, setAttempted] = useState(false);
    const [completed, setCompleted] = useState(false);

    const level = levels[levelIndex];
    const selectedOption = selected !== null ? level?.options[selected] : null;
    const isCorrect = selectedOption?.isCorrect;

    const choose = (i) => {
        if (isCorrect) return; // doğru bulunduysa kilitle
        setSelected(i);
        if (level.options[i].isCorrect) {
            if (!attempted) setFirstTry((c) => c + 1);
        } else {
            setAttempted(true);
        }
    };

    const advance = () => {
        if (levelIndex < levels.length - 1) {
            setLevelIndex((i) => i + 1);
            setSelected(null);
            setAttempted(false);
        } else {
            setCompleted(true);
            fireCelebration();
            onFinish?.();
        }
    };

    return (
        <div className="fixed inset-0 z-[70] flex flex-col bg-neutral-50">
            <div className="ambient-bg" aria-hidden />
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
                    <p className="truncate text-sm font-extrabold text-neutral-900">{game.title}</p>
                    <p className="text-[11px] font-bold text-neutral-400">
                        {completed ? 'Tamamlandı' : `Bölüm ${levelIndex + 1} / ${levels.length}`}
                    </p>
                </div>
                <div className="w-20 sm:w-28">
                    <ProgressBar value={((completed ? levels.length : levelIndex) / levels.length) * 100} color={theme} height={6} />
                </div>
            </header>

            {/* ---------- İçerik ---------- */}
            <main className="relative z-10 flex flex-1 items-start justify-center overflow-y-auto px-4 py-4 sm:items-center sm:px-8">
                {!completed ? (
                    <div key={levelIndex} className="w-full max-w-2xl animate-page-turn">
                        <div className="mb-5 text-center">
                            <Badge tone="primary" className="mb-3">{level?.name || `Bölüm ${levelIndex + 1}`}</Badge>
                            <div className="card p-6 text-left sm:p-8">
                                <p className="reader-prose !text-[17px] sm:!text-lg">{level?.scenario}</p>
                            </div>
                        </div>

                        <p className="mb-3 text-center text-[12px] font-extrabold uppercase tracking-widest text-neutral-400">Sen olsan ne yaparsın?</p>

                        <div className="space-y-3">
                            {level?.options.map((opt, i) => {
                                const isSelected = selected === i;
                                const showState = isSelected;
                                return (
                                    <button
                                        key={i}
                                        onClick={() => choose(i)}
                                        disabled={isCorrect && !isSelected}
                                        aria-pressed={isSelected}
                                        className={cn(
                                            'card w-full p-5 text-left transition-all duration-300',
                                            showState && opt.isCorrect && 'border-success-500 bg-success-50/60 ring-4 ring-success-100',
                                            showState && !opt.isCorrect && 'border-accent-300 bg-accent-50/50 ring-4 ring-accent-100',
                                            !showState && 'hover:border-neutral-300 hover:shadow-card',
                                            isCorrect && !isSelected && 'opacity-50'
                                        )}
                                    >
                                        <div className="flex items-start gap-3.5">
                                            <span
                                                className={cn(
                                                    'mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-sm font-extrabold transition-colors',
                                                    showState && opt.isCorrect ? 'bg-success-500 text-white' :
                                                        showState ? 'bg-accent-400 text-white' : 'bg-neutral-100 text-neutral-500'
                                                )}
                                            >
                                                {showState && opt.isCorrect ? <CheckCircle2 size={17} /> : showState ? <HeartHandshake size={16} /> : String.fromCharCode(65 + i)}
                                            </span>
                                            <div className="flex-1">
                                                <p className="text-[15px] font-bold leading-relaxed text-neutral-800">{opt.text}</p>
                                                {showState && (
                                                    <div className={cn(
                                                        'mt-3 rounded-xl px-4 py-3 text-[13px] font-bold leading-relaxed animate-rise-in',
                                                        opt.isCorrect ? 'bg-success-100/70 text-success-700' : 'bg-accent-100/70 text-accent-800'
                                                    )}>
                                                        {opt.feedback}
                                                        {!opt.isCorrect && <span className="mt-1 block text-[12px] opacity-80">Sorun değil — başka bir yol dene 💛</span>}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>

                        {isCorrect && (
                            <div className="mt-6 flex justify-center animate-rise-in">
                                <Button size="lg" iconRight={ArrowRight} onClick={advance} style={{ background: theme }}>
                                    {levelIndex < levels.length - 1 ? 'Sonraki Bölüm' : 'Yolculuğu Tamamla'}
                                </Button>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="w-full max-w-xl space-y-5 animate-scale-in">
                        <div className="card grain relative overflow-hidden p-9 text-center sm:p-12" style={{ background: `linear-gradient(150deg, ${theme}10, #fff 55%)` }}>
                            <span className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-accent-100 text-accent-600">
                                <Trophy size={28} />
                            </span>
                            <h2 className="mb-2 text-2xl font-extrabold sm:text-3xl">Labirenti tamamladın!</h2>
                            <p className="mb-6 text-sm font-bold text-neutral-500">
                                {firstTry === levels.length
                                    ? 'Üstelik her bölümü ilk denemede çözdün. Olağanüstü bir sezgi! 🌟'
                                    : `${levels.length} bölümün hepsinde doğru yolu buldun.`}
                            </p>
                            {game.growthLesson && (
                                <p className="mx-auto mb-6 max-w-md font-serif text-lg italic leading-relaxed text-neutral-700">
                                    "{game.growthLesson}"
                                </p>
                            )}
                            {game.reflectionQuestion && (
                                <div className="mx-auto max-w-md rounded-2xl border border-neutral-200 bg-white/80 p-5 text-left">
                                    <p className="mb-1 text-[11px] font-extrabold uppercase tracking-widest text-neutral-400">Düşünmek için</p>
                                    <p className="text-[15px] font-bold leading-relaxed text-neutral-800">{game.reflectionQuestion}</p>
                                </div>
                            )}
                        </div>
                        {footerActions && <div className="flex flex-col justify-center gap-3 sm:flex-row">{footerActions}</div>}
                    </div>
                )}
            </main>
        </div>
    );
};

export default GamePlayer;
