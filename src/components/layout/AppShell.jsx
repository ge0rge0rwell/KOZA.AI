import React from 'react';
import { Home, Sparkles, BookMarked, Users, Compass, BarChart3, HeartHandshake, School, Plus, Lock } from 'lucide-react';
import { useUI } from '../../context/UIContext';
import { useUser } from '../../context/UserContext';
import Logo from '../ui/Logo';
import Avatar from '../ui/Avatar';
import { cn } from '../../utils/helpers';

const NAV = [
    { to: '', icon: Home, label: 'Panom' },
    { to: 'olustur', icon: Sparkles, label: 'Oluştur' },
    { to: 'kutuphane', icon: BookMarked, label: 'Kütüphanem' },
    { to: 'topluluk', icon: Users, label: 'Topluluk' },
    { to: 'yolculuk', icon: Compass, label: 'Yolculuğum' },
];

const NavItem = ({ icon: Icon, label, active, onClick, badge }) => (
    <button
        onClick={onClick}
        aria-current={active ? 'page' : undefined}
        className={cn(
            'group flex w-full items-center gap-3 rounded-2xl px-3.5 py-2.5 text-left text-sm font-bold transition-all duration-200',
            active ? 'bg-primary-50 text-primary-700' : 'text-neutral-500 hover:bg-neutral-100 hover:text-neutral-800'
        )}
    >
        <Icon size={19} strokeWidth={2.2} className={cn('transition-transform duration-300', !active && 'group-hover:scale-110')} />
        <span className="flex-1">{label}</span>
        {badge}
    </button>
);

const OzChip = ({ totalOz, onClick }) => (
    <button
        onClick={onClick}
        title="Toplam ÖZ puanın"
        className="flex items-center gap-1.5 rounded-full border border-accent-200 bg-accent-50 px-3 py-1.5 text-[13px] font-extrabold text-accent-700 transition-transform hover:scale-105 active:scale-95"
    >
        <Sparkles size={14} strokeWidth={2.4} />
        <span className="tabular-nums">{totalOz.toLocaleString('tr-TR')}</span>
        <span className="text-[10px] font-bold opacity-70">ÖZ</span>
    </button>
);

const AppShell = ({ children }) => {
    const { route, navigate, openModal } = useUI();
    const { profile, isCounselor } = useUser();

    const isActive = (to) => route.path === to;

    return (
        <div className="min-h-dvh">
            <div className="ambient-bg" aria-hidden />

            {/* ---------- Masaüstü kenar çubuğu ---------- */}
            <aside className="fixed inset-y-0 left-0 z-40 hidden w-[264px] flex-col border-r border-neutral-200/80 surface-tint lg:flex">
                <button onClick={() => navigate('')} className="flex h-[72px] items-center px-6">
                    <Logo size="md" />
                </button>

                <nav className="flex-1 space-y-1 overflow-y-auto px-3.5 py-2 scrollbar-thin" aria-label="Ana gezinme">
                    {NAV.map((item) => (
                        <NavItem key={item.to} {...item} active={isActive(item.to)} onClick={() => navigate(item.to)} />
                    ))}

                    <div className="!my-4 border-t border-neutral-200/80" />

                    <NavItem
                        to="rehber"
                        icon={BarChart3}
                        label="Okul Paneli"
                        active={isActive('rehber')}
                        onClick={() => (isCounselor ? navigate('rehber') : openModal('upgrade'))}
                        badge={!isCounselor && <Lock size={13} className="text-neutral-300" />}
                    />
                </nav>

                <div className="space-y-3 px-3.5 pb-5">
                    {profile.plan !== 'school' && (
                        <button
                            onClick={() => openModal('upgrade')}
                            className="group w-full overflow-hidden rounded-2xl bg-gradient-to-br from-primary-600 to-primary-800 p-4 text-left text-white shadow-card transition-transform hover:scale-[1.02] active:scale-[0.99]"
                        >
                            <div className="mb-1 flex items-center gap-2">
                                <School size={16} className="text-accent-300" />
                                <span className="text-sm font-extrabold">KOZA Okul</span>
                            </div>
                            <p className="text-xs leading-relaxed text-white/70">Rehberlik servisi için anonim analiz panelini okuluna getir.</p>
                        </button>
                    )}

                    <button
                        onClick={() => openModal('safety')}
                        className="flex w-full items-center gap-3 rounded-2xl border border-danger-100 bg-danger-50/60 px-3.5 py-2.5 text-sm font-bold text-danger-600 transition-colors hover:bg-danger-50"
                    >
                        <HeartHandshake size={18} strokeWidth={2.2} />
                        Destek Hattı
                    </button>

                    <button
                        onClick={() => navigate('profil')}
                        className={cn(
                            'flex w-full items-center gap-3 rounded-2xl border px-3 py-2.5 transition-colors',
                            isActive('profil') ? 'border-primary-200 bg-primary-50' : 'border-neutral-200 bg-white hover:bg-neutral-50'
                        )}
                    >
                        <Avatar emoji={profile.emoji} color={profile.color} size={36} />
                        <span className="min-w-0 flex-1 text-left">
                            <span className="block truncate text-sm font-bold text-neutral-900">{profile.pseudonym || 'Gezgin'}</span>
                            <span className="block text-[11px] font-bold text-accent-600">{profile.totalOz.toLocaleString('tr-TR')} ÖZ</span>
                        </span>
                    </button>
                </div>
            </aside>

            {/* ---------- Mobil üst bar ---------- */}
            <header className="fixed inset-x-0 top-0 z-40 flex h-[60px] items-center justify-between border-b border-neutral-200/70 px-4 surface-tint lg:hidden">
                <button onClick={() => navigate('')} aria-label="Ana sayfa">
                    <Logo size="sm" />
                </button>
                <div className="flex items-center gap-2">
                    <OzChip totalOz={profile.totalOz} onClick={() => navigate('yolculuk')} />
                    <button
                        onClick={() => openModal('safety')}
                        aria-label="Destek hattı"
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-danger-50 text-danger-500 transition-transform active:scale-90"
                    >
                        <HeartHandshake size={17} strokeWidth={2.2} />
                    </button>
                    <button onClick={() => navigate('profil')} aria-label="Profilim" className="transition-transform active:scale-90">
                        <Avatar emoji={profile.emoji} color={profile.color} size={36} ring />
                    </button>
                </div>
            </header>

            {/* ---------- İçerik ---------- */}
            <main className="px-4 pb-32 pt-[76px] sm:px-6 lg:ml-[264px] lg:px-10 lg:pb-16 lg:pt-10">
                <div className="mx-auto w-full max-w-5xl">{children}</div>
            </main>

            {/* ---------- Mobil alt sekme çubuğu ---------- */}
            <nav
                aria-label="Alt gezinme"
                className="fixed inset-x-0 bottom-0 z-40 border-t border-neutral-200/70 surface-tint pb-[env(safe-area-inset-bottom)] lg:hidden"
            >
                <div className="mx-auto grid h-[64px] max-w-md grid-cols-5 items-center px-2">
                    {[NAV[0], NAV[3]].map((item) => (
                        <TabButton key={item.to} {...item} active={isActive(item.to)} onClick={() => navigate(item.to)} />
                    ))}

                    <div className="relative flex justify-center">
                        <button
                            onClick={() => navigate('olustur')}
                            aria-label="Yeni dönüşüm oluştur"
                            className={cn(
                                'absolute -top-9 flex h-14 w-14 items-center justify-center rounded-full text-white shadow-lift transition-all active:scale-90',
                                'bg-gradient-to-br from-primary-500 to-primary-700',
                                isActive('olustur') && 'ring-4 ring-primary-200'
                            )}
                        >
                            <Plus size={26} strokeWidth={2.5} />
                        </button>
                        <span className="mt-9 text-[10px] font-bold text-neutral-400">Oluştur</span>
                    </div>

                    {[NAV[2], NAV[4]].map((item) => (
                        <TabButton key={item.to} {...item} active={isActive(item.to)} onClick={() => navigate(item.to)} />
                    ))}
                </div>
            </nav>
        </div>
    );
};

const TabButton = ({ icon: Icon, label, active, onClick }) => (
    <button
        onClick={onClick}
        aria-current={active ? 'page' : undefined}
        className={cn(
            'relative flex flex-col items-center gap-1 py-1.5 transition-all duration-200',
            active ? 'text-primary-600' : 'text-neutral-400 active:text-neutral-600'
        )}
    >
        <span className={cn('transition-transform duration-200', active ? 'scale-110' : '')}>
            <Icon size={21} strokeWidth={active ? 2.4 : 2} />
        </span>
        <span className={cn('text-[10px] transition-all duration-200', active ? 'font-extrabold' : 'font-bold')}>{label}</span>
        {active && <span className="absolute -top-0.5 h-1 w-4 rounded-full bg-primary-500" aria-hidden />}
    </button>
);

export default AppShell;
