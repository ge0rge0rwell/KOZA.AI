import React from 'react';
import { ArrowRight, Flame, Sparkles, BookOpen, Gamepad2, Mail, Heart, Handshake, PenLine } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import ProgressBar from '../components/ui/ProgressBar';
import Avatar from '../components/ui/Avatar';
import CocoonVisual from '../components/cocoon/CocoonVisual';
import { useUser } from '../context/UserContext';
import { useStory } from '../context/StoryContext';
import { useUI } from '../context/UIContext';
import { stageFor, stageProgress, ozToNext, nextStage } from '../utils/stages';
import { DAILY_PRACTICES, CONTENT_TYPES, CATEGORIES } from '../config/constants';
import { pickDaily, timeAgo, truncate } from '../utils/helpers';

const TYPE_ICONS = { story: BookOpen, game: Gamepad2, letter: Mail };

const greeting = () => {
    const h = new Date().getHours();
    if (h < 6) return 'İyi geceler';
    if (h < 12) return 'Günaydın';
    if (h < 18) return 'İyi günler';
    return 'İyi akşamlar';
};

const HomePage = () => {
    const { profile } = useUser();
    const { creations, community } = useStory();
    const { navigate } = useUI();

    const stage = stageFor(profile.totalOz);
    const next = nextStage(profile.totalOz);
    const practice = pickDaily(DAILY_PRACTICES);
    const recent = creations.slice(0, 3);
    const highlights = community.slice(0, 2);

    return (
        <div className="space-y-6">
            {/* ---------- Karşılama ---------- */}
            <header className="flex flex-wrap items-end justify-between gap-4 animate-rise-in">
                <div>
                    <p className="mb-1 text-sm font-bold text-neutral-400">{greeting()},</p>
                    <h1 className="text-[1.85rem] font-extrabold tracking-tight sm:text-4xl">{profile.pseudonym || 'Gezgin'} 👋</h1>
                </div>
                {profile.dailyStreak > 1 && (
                    <Badge tone="accent" className="!px-3.5 !py-2 !text-[13px]">
                        <Flame size={14} className="text-accent-600" />
                        {profile.dailyStreak} günlük seri
                    </Badge>
                )}
            </header>

            {/* ---------- Yolculuk kartı ---------- */}
            <button
                onClick={() => navigate('yolculuk')}
                className="card group relative w-full overflow-hidden p-0 text-left animate-rise-in"
                style={{ animationDelay: '0.06s' }}
                aria-label="Yolculuk sayfasına git"
            >
                {/* Stage-colored radial glow */}
                <div className="absolute inset-0 opacity-[0.08] transition-opacity duration-500 group-hover:opacity-[0.13]" style={{ background: `radial-gradient(ellipse at 80% 50%, ${stage.color} 0%, transparent 70%)` }} aria-hidden />
                <div className="relative flex flex-col items-center gap-5 px-7 py-7 sm:flex-row sm:gap-8 sm:px-9 sm:py-8">
                    {/* Visual with drop-shadow glow */}
                    <div className="shrink-0 transition-transform duration-500 group-hover:scale-105" style={{ filter: `drop-shadow(0 0 28px ${stage.color}55)` }}>
                        <CocoonVisual stage={stage.n} size={180} />
                    </div>
                    {/* Info */}
                    <div className="w-full flex-1 text-center sm:text-left">
                        <p className="mb-1 text-[11px] font-extrabold uppercase tracking-widest text-neutral-400">
                            Aşama {stage.n}/7 · Metamorfoz Yolculuğun
                        </p>
                        <h2 className="mb-2 text-[1.75rem] font-extrabold leading-tight tracking-tight" style={{ color: stage.color }}>{stage.name}</h2>
                        <p className="mb-5 text-sm leading-relaxed text-neutral-500">{stage.blurb}</p>
                        <ProgressBar value={stageProgress(profile.totalOz)} height={10} />
                        <div className="mt-3 flex items-center justify-between text-[12px] font-bold">
                            <span className="flex items-center gap-1.5 rounded-full border border-accent-200 bg-accent-50 px-2.5 py-1 text-accent-700">
                                <Sparkles size={12} />
                                {profile.totalOz.toLocaleString('tr-TR')} ÖZ
                            </span>
                            {next ? (
                                <span className="text-neutral-400">{ozToNext(profile.totalOz)} ÖZ → {next.name}</span>
                            ) : (
                                <span className="font-extrabold text-accent-600">Dönüşüm tamamlandı 🦋</span>
                            )}
                        </div>
                    </div>
                    <ArrowRight size={18} className="hidden shrink-0 text-neutral-300 transition-all duration-300 group-hover:translate-x-1 group-hover:text-primary-400 sm:block" />
                </div>
            </button>

            {/* ---------- Hızlı oluştur ---------- */}
            <section className="animate-rise-in" style={{ animationDelay: '0.12s' }}>
                <div className="mb-3 flex items-center justify-between">
                    <h2 className="text-xl font-extrabold">Bugün neyi dönüştürelim?</h2>
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                    {Object.entries(CONTENT_TYPES).map(([key, t]) => {
                        const Icon = TYPE_ICONS[key];
                        return (
                            <button
                                key={key}
                                onClick={() => navigate(`olustur/${key}`)}
                                className="card card-hover group flex items-center gap-4 p-5 text-left active:scale-[0.98]"
                            >
                                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-b from-primary-400 to-primary-600 text-white shadow-[0_2px_8px_-2px_rgba(106,82,220,0.45)] transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_4px_12px_-2px_rgba(106,82,220,0.55)]">
                                    <Icon size={21} strokeWidth={2.2} />
                                </span>
                                <span className="flex-1">
                                    <span className="block font-extrabold text-neutral-900">{t.label}</span>
                                    <span className="block text-[12px] font-extrabold text-accent-600">+{t.oz} ÖZ</span>
                                </span>
                                <ArrowRight size={17} className="text-neutral-300 transition-all duration-300 group-hover:translate-x-1 group-hover:text-primary-500" />
                            </button>
                        );
                    })}
                </div>
            </section>

            {/* ---------- Günün pratiği ---------- */}
            <Card className="grain relative overflow-hidden border border-accent-200/60 bg-gradient-to-br from-accent-50 via-amber-50/40 to-primary-50 p-6 shadow-[0_0_0_4px_rgba(226,154,40,0.06)] sm:p-7 animate-rise-in" style={{ animationDelay: '0.18s' }}>
                <div className="relative flex items-start gap-4">
                    <span className="text-3xl" aria-hidden>{practice.icon}</span>
                    <div>
                        <p className="mb-0.5 text-[11px] font-extrabold uppercase tracking-widest text-accent-700">Günün küçük pratiği</p>
                        <h3 className="mb-1 font-extrabold text-neutral-900">{practice.title}</h3>
                        <p className="text-sm leading-relaxed text-neutral-600">{practice.text}</p>
                    </div>
                </div>
            </Card>

            <div className="grid gap-6 lg:grid-cols-2">
                {/* ---------- Son eserlerin ---------- */}
                <section className="animate-rise-in" style={{ animationDelay: '0.24s' }}>
                    <div className="mb-3 flex items-center justify-between">
                        <h2 className="text-lg font-extrabold">Son eserlerin</h2>
                        {creations.length > 0 && (
                            <button onClick={() => navigate('kutuphane')} className="text-[13px] font-bold text-primary-600 hover:underline">
                                Tümü →
                            </button>
                        )}
                    </div>
                    {recent.length === 0 ? (
                        <Card className="flex flex-col items-center gap-3 p-8 text-center">
                            <span className="text-3xl" aria-hidden>🌱</span>
                            <p className="text-sm font-bold text-neutral-500">Henüz bir dönüşüm yapmadın.<br />İlk hikâyen seni bekliyor.</p>
                            <Button size="sm" icon={PenLine} onClick={() => navigate('olustur')}>İlk Dönüşümünü Yap</Button>
                        </Card>
                    ) : (
                        <div className="space-y-2.5">
                            {recent.map((c) => {
                                const Icon = TYPE_ICONS[c.type] || BookOpen;
                                return (
                                    <button
                                        key={c.id}
                                        onClick={() => navigate(`icerik/${c.id}`)}
                                        className="card card-hover group flex w-full items-center gap-4 p-4 text-left active:scale-[0.99]"
                                    >
                                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl" style={{ background: `${c.themeColor}14`, color: c.themeColor }}>
                                            <Icon size={19} />
                                        </span>
                                        <span className="min-w-0 flex-1">
                                            <span className="block truncate font-bold text-neutral-900">{c.title}</span>
                                            <span className="text-[12px] font-bold text-neutral-400">
                                                {CONTENT_TYPES[c.type]?.label} · {timeAgo(c.createdAt)}
                                            </span>
                                        </span>
                                        <ArrowRight size={16} className="shrink-0 text-neutral-300 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-primary-500" />
                                    </button>
                                );
                            })}
                        </div>
                    )}
                </section>

                {/* ---------- Topluluktan ---------- */}
                <section className="animate-rise-in" style={{ animationDelay: '0.3s' }}>
                    <div className="mb-3 flex items-center justify-between">
                        <h2 className="text-lg font-extrabold">Topluluktan yankılar</h2>
                        <button onClick={() => navigate('topluluk')} className="text-[13px] font-bold text-primary-600 hover:underline">
                            Keşfet →
                        </button>
                    </div>
                    {highlights.length === 0 ? (
                        <Card className="flex flex-col items-center gap-3 p-8 text-center">
                            <span className="text-3xl" aria-hidden>🕊️</span>
                            <p className="text-sm font-bold text-neutral-500">
                                Topluluk galerisi yeni filizleniyor.<br />İlk paylaşan sen olabilirsin.
                            </p>
                            <Button size="sm" onClick={() => navigate('topluluk')}>Topluluğu Keşfet</Button>
                        </Card>
                    ) : (
                        <div className="space-y-2.5">
                            {highlights.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => navigate(`topluluk/${item.id}`)}
                                    className="card card-hover w-full p-4 text-left active:scale-[0.99]"
                                >
                                    <div className="mb-2 flex items-center gap-2.5">
                                        <Avatar emoji={item.authorEmoji} color={item.authorColor} size={28} />
                                        <span className="text-[12px] font-extrabold text-neutral-500">{item.authorPseudonym}</span>
                                        <Badge tone="outline" className="ml-auto">{CATEGORIES[item.category]?.label || 'Diğer'}</Badge>
                                    </div>
                                    <p className="mb-1 font-bold text-neutral-900">{item.title}</p>
                                    <p className="mb-2.5 text-[13px] leading-relaxed text-neutral-500 line-clamp-snug">{truncate(item.preview, 110)}</p>
                                    <div className="flex items-center gap-4 text-[12px] font-bold text-neutral-400">
                                        <span className="flex items-center gap-1"><Heart size={13} /> {item.hearts || 0}</span>
                                        <span className="flex items-center gap-1"><Handshake size={13} /> {item.hugs || 0}</span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
};

export default HomePage;
