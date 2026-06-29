import React from 'react';
import { Sparkles, BookOpen, Gamepad2, Mail, Heart, Handshake, Flame, Lock, Check, ChevronRight } from 'lucide-react';
import Card from '../components/ui/Card';
import ProgressBar from '../components/ui/ProgressBar';
import CocoonVisual from '../components/cocoon/CocoonVisual';
import { useUser } from '../context/UserContext';
import { useUI } from '../context/UIContext';
import { STAGES } from '../config/constants';
import { ACHIEVEMENTS } from '../utils/achievements';
import { stageFor, stageProgress, ozToNext, nextStage } from '../utils/stages';
import { cn } from '../utils/helpers';

const StatTile = ({ icon: Icon, label, value, tone = 'text-primary-600 bg-primary-50' }) => (
    <Card className="flex items-center gap-3.5 p-4">
        <span className={cn('flex h-11 w-11 shrink-0 items-center justify-center rounded-xl', tone)}>
            <Icon size={19} strokeWidth={2.2} />
        </span>
        <span>
            <span className="block text-xl font-extrabold tabular-nums text-neutral-900">{value}</span>
            <span className="block text-[11px] font-extrabold uppercase tracking-wide text-neutral-400">{label}</span>
        </span>
    </Card>
);

/** İstatistikten bir rozet için ilerleme metni üretir. */
const progressHint = (a, profile) => {
    if (a.check(profile)) return null;
    if (a.id === 'ilk_hikaye') return `${profile.storiesCreated}/1 hikâye`;
    if (a.id === 'ilk_oyun') return `${profile.gamesCreated}/1 oyun`;
    if (a.id === 'ilk_mektup') return `${profile.lettersCreated}/1 mektup`;
    if (a.id === 'hikaye_ustasi') return `${profile.storiesCreated}/5 hikâye`;
    if (a.id === 'paylasimci') return `${profile.sharesCount}/1 paylaşım`;
    if (a.id === 'kasif') return `${profile.worksExplored}/5 eser`;
    if (a.id === 'destekci') return `${profile.heartsGiven}/10 kalp`;
    if (a.id === 'hemhal') return `${profile.hugsGiven}/1 hemhal`;
    if (a.id === 'seri_3') return `${profile.dailyStreak}/3 gün`;
    if (a.id === 'seri_7') return `${profile.dailyStreak}/7 gün`;
    if (a.id === 'caprak_catladi') return `${profile.totalOz}/500 ÖZ`;
    if (a.id === 'kelebek') return `${profile.totalOz}/8000 ÖZ`;
    return null;
};

const JourneyPage = () => {
    const { profile } = useUser();
    const { navigate } = useUI();
    const stage = stageFor(profile.totalOz);
    const next = nextStage(profile.totalOz);
    const unlockedCount = profile.achievements.length;

    const nextUpAchievements = ACHIEVEMENTS
        .filter((a) => !profile.achievements.includes(a.id) && progressHint(a, profile) !== null)
        .slice(0, 3);

    return (
        <div className="space-y-8">
            <header className="animate-rise-in">
                <h1 className="mb-1 text-3xl font-extrabold tracking-tight sm:text-4xl">Metamorfoz Yolculuğun</h1>
                <p className="text-sm font-bold text-neutral-400">Her ÖZ puanı, kozanın biraz daha açılması demek.</p>
            </header>

            {/* ---------- Mevcut aşama ---------- */}
            <Card className="overflow-hidden animate-rise-in" style={{ animationDelay: '0.06s' }}>
                <div className="grain relative bg-gradient-to-b from-primary-50/70 to-transparent px-6 pb-2 pt-8 text-center">
                    <CocoonVisual stage={stage.n} size={210} className="mx-auto" />
                </div>
                <div className="px-7 pb-8 pt-2 text-center">
                    <p className="mb-1 text-[12px] font-extrabold uppercase tracking-widest text-neutral-400">Aşama {stage.n} / 7</p>
                    <h2 className="mb-2 text-3xl font-extrabold" style={{ color: stage.color }}>{stage.name}</h2>
                    <p className="mx-auto mb-6 max-w-md text-sm leading-relaxed text-neutral-500">{stage.blurb}</p>
                    <div className="mx-auto max-w-md">
                        <ProgressBar value={stageProgress(profile.totalOz)} height={12} />
                        <div className="mt-2.5 flex items-center justify-between text-[12px] font-extrabold">
                            <span className="flex items-center gap-1 text-accent-600">
                                <Sparkles size={13} /> {profile.totalOz.toLocaleString('tr-TR')} ÖZ
                            </span>
                            {next ? (
                                <span className="text-neutral-400">{next.name} → {ozToNext(profile.totalOz)} ÖZ kaldı</span>
                            ) : (
                                <span className="text-accent-600">Zirvedesin 🦋</span>
                            )}
                        </div>
                    </div>
                </div>
            </Card>

            {/* ---------- Aşama haritası ---------- */}
            <section className="animate-rise-in" style={{ animationDelay: '0.12s' }}>
                <h2 className="mb-4 text-lg font-extrabold">Dönüşüm haritası</h2>
                <div className="relative space-y-0">
                    {STAGES.map((s, i) => {
                        const reached = profile.totalOz >= s.min;
                        const isCurrent = stage.n === s.n;
                        const isLast = i === STAGES.length - 1;
                        return (
                            <div key={s.n} className="relative flex gap-4 pb-1">
                                {!isLast && (
                                    <span
                                        className={cn('absolute left-[19px] top-10 h-[calc(100%-24px)] w-0.5 rounded', reached && profile.totalOz >= STAGES[i + 1].min ? 'bg-primary-300' : 'bg-neutral-200')}
                                        aria-hidden
                                    />
                                )}
                                <span
                                    className={cn(
                                        'relative z-10 mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 text-sm font-extrabold transition-all',
                                        isCurrent
                                            ? 'border-primary-400 bg-gradient-to-b from-primary-500 to-primary-700 text-white shadow-glow animate-pulse-soft'
                                            : reached
                                                ? 'border-primary-300 bg-primary-100 text-primary-700'
                                                : 'border-neutral-200 bg-white text-neutral-300'
                                    )}
                                >
                                    {reached && !isCurrent ? <Check size={16} strokeWidth={3} /> : s.n}
                                </span>
                                <div className={cn('mb-4 flex-1 rounded-2xl border p-4 transition-all', isCurrent ? 'card border-primary-200 bg-primary-50/40' : reached ? 'border-transparent' : 'border-transparent opacity-50')}>
                                    <div className="flex flex-wrap items-center justify-between gap-2">
                                        <h3 className="font-extrabold text-neutral-900">{s.name}</h3>
                                        <span className="text-[11px] font-extrabold text-neutral-400">{s.min.toLocaleString('tr-TR')}+ ÖZ</span>
                                    </div>
                                    <p className="mt-0.5 text-[13px] leading-relaxed text-neutral-500">{s.blurb}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* ---------- Sıradaki rozetler ---------- */}
            {nextUpAchievements.length > 0 && (
                <section className="animate-rise-in" style={{ animationDelay: '0.18s' }}>
                    <h2 className="mb-4 text-lg font-extrabold">Sıradaki hedeflerin</h2>
                    <div className="space-y-3">
                        {nextUpAchievements.map((a) => {
                            const hint = progressHint(a, profile);
                            const [current, target] = hint.split('/').map((s) => parseFloat(s));
                            const pct = Math.min(100, Math.round((current / target) * 100));
                            return (
                                <Card key={a.id} className="flex items-center gap-4 p-5">
                                    <span className="text-3xl shrink-0" aria-hidden>{a.icon}</span>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between gap-2 mb-1.5">
                                            <p className="font-extrabold text-neutral-900">{a.name}</p>
                                            <span className="text-[11px] font-extrabold text-neutral-400 shrink-0">{hint}</span>
                                        </div>
                                        <ProgressBar value={pct} height={7} />
                                        <p className="mt-1 text-[12px] text-neutral-400">{a.desc}</p>
                                    </div>
                                    <span className="text-[12px] font-extrabold text-accent-600 shrink-0">+{a.oz} ÖZ</span>
                                </Card>
                            );
                        })}
                    </div>
                    <button
                        onClick={() => navigate('olustur')}
                        className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl border border-primary-200 bg-primary-50 px-4 py-3 text-sm font-bold text-primary-700 transition-colors hover:bg-primary-100"
                    >
                        Hedefe bir adım yaklaş <ChevronRight size={15} />
                    </button>
                </section>
            )}

            {/* ---------- İstatistikler ---------- */}
            <section className="animate-rise-in" style={{ animationDelay: '0.3s' }}>
                <h2 className="mb-4 text-lg font-extrabold">Sayılarla yolculuğun</h2>
                <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                    <StatTile icon={BookOpen} label="Hikâye" value={profile.storiesCreated} />
                    <StatTile icon={Gamepad2} label="Oyun" value={profile.gamesCreated} />
                    <StatTile icon={Mail} label="Mektup" value={profile.lettersCreated} />
                    <StatTile icon={Flame} label="En uzun seri" value={`${profile.dailyStreak} gün`} tone="text-accent-600 bg-accent-50" />
                    <StatTile icon={Heart} label="Gönderilen kalp" value={profile.heartsGiven} tone="text-danger-500 bg-danger-50" />
                    <StatTile icon={Handshake} label="Hemhal" value={profile.hugsGiven} tone="text-primary-600 bg-primary-50" />
                    <StatTile icon={Sparkles} label="Toplam ÖZ" value={profile.totalOz.toLocaleString('tr-TR')} tone="text-accent-600 bg-accent-50" />
                    <StatTile icon={BookOpen} label="Keşfedilen eser" value={profile.worksExplored} tone="text-success-600 bg-success-50" />
                </div>
            </section>

            {/* ---------- Rozetler ---------- */}
            <section className="animate-rise-in" style={{ animationDelay: '0.36s' }}>
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-lg font-extrabold">Rozetler</h2>
                    <span className="text-[13px] font-extrabold text-neutral-400">{unlockedCount}/{ACHIEVEMENTS.length}</span>
                </div>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                    {ACHIEVEMENTS.map((a) => {
                        const unlocked = profile.achievements.includes(a.id);
                        return (
                            <Card
                                key={a.id}
                                className={cn(
                                    'relative p-4 text-center transition-all',
                                    unlocked
                                        ? 'border-accent-200 shadow-[var(--shadow-soft),0_0_0_3px_rgba(226,154,40,0.1)]'
                                        : 'opacity-50 grayscale'
                                )}
                            >
                                {!unlocked && <Lock size={12} className="absolute right-3 top-3 text-neutral-300" />}
                                <span className="mb-2 block text-3xl" aria-hidden>{a.icon}</span>
                                <p className="text-[13px] font-extrabold text-neutral-900">{a.name}</p>
                                <p className="mt-0.5 text-[11px] font-bold leading-snug text-neutral-400">{a.desc}</p>
                                <p className={cn('mt-1.5 text-[11px] font-extrabold', unlocked ? 'text-accent-600' : 'text-neutral-300')}>
                                    +{a.oz} ÖZ
                                </p>
                            </Card>
                        );
                    })}
                </div>
            </section>
        </div>
    );
};

export default JourneyPage;
