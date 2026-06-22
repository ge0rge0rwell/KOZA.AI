import React, { useState } from 'react';
import { Dices, BarChart3, LogOut, Download, ShieldCheck, KeyRound, Check, Cloud, CloudOff } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Avatar from '../components/ui/Avatar';
import { Input } from '../components/ui/Field';
import { useAuth } from '../context/AuthContext';
import { useUser } from '../context/UserContext';
import { useStory } from '../context/StoryContext';
import { useUI } from '../context/UIContext';
import { generatePseudonym, AVATAR_EMOJIS, AVATAR_COLORS } from '../utils/pseudonyms';
import { validateUsername, USERNAME_LIMITS } from '../utils/validation';
import { COUNSELOR_ACCESS_CODE, SAFETY_DISCLAIMER, APP } from '../config/constants';
import { cn, formatDate } from '../utils/helpers';

const Section = ({ title, children, tone }) => (
    <section>
        <h2 className={cn('mb-3 text-[12px] font-extrabold uppercase tracking-widest', tone || 'text-neutral-400')}>{title}</h2>
        {children}
    </section>
);

const ProfilePage = () => {
    const { user: authUser, signOut } = useAuth();
    const { profile, applyUpdate, isCounselor, cloudSynced } = useUser();
    const { creations } = useStory();
    const { addToast, navigate } = useUI();
    const [code, setCode] = useState('');
    const [codeError, setCodeError] = useState(null);
    const [nameDraft, setNameDraft] = useState(profile.pseudonym || '');
    const [nameError, setNameError] = useState(null);

    const updateIdentity = (patch) => applyUpdate(patch, { silent: true });

    const onNameChange = (e) => {
        setNameDraft(e.target.value);
        if (nameError) setNameError(null);
    };

    const suggestName = () => {
        setNameDraft(generatePseudonym());
        setNameError(null);
    };

    const saveName = () => {
        const result = validateUsername(nameDraft);
        if (!result.ok) {
            setNameError(result.error);
            return;
        }
        setNameDraft(result.value);
        setNameError(null);
        if (result.value === profile.pseudonym) return;
        updateIdentity({ pseudonym: result.value });
        addToast('success', 'Takma adın güncellendi', `Artık ${result.value} olarak tanınıyorsun. 🦋`);
    };

    const submitCode = (e) => {
        e.preventDefault();
        if (code.trim().toUpperCase() === COUNSELOR_ACCESS_CODE) {
            applyUpdate({ role: 'counselor', plan: 'school' });
            setCodeError(null);
            setCode('');
            addToast('success', 'Okul Paneli açıldı', 'Rehberlik analiz paneline artık erişebilirsin.');
        } else {
            setCodeError('Kod tanınamadı. Okul yöneticinden aldığın kodu kontrol et.');
        }
    };

    const exportData = () => {
        const blob = new Blob(
            [JSON.stringify({ profile, creations, exportedAt: new Date().toISOString() }, null, 2)],
            { type: 'application/json' }
        );
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'koza-verilerim.json';
        a.click();
        URL.revokeObjectURL(url);
        addToast('success', 'Veriler indirildi', 'Tüm verilerin sana ait — her zaman.');
    };

    return (
        <div className="mx-auto max-w-2xl space-y-8">
            <header className="animate-rise-in">
                <h1 className="mb-1 text-3xl font-extrabold tracking-tight sm:text-4xl">Profilim</h1>
                <p className="text-sm font-bold text-neutral-400">Kimliğin, planın ve verilerin — hepsi senin kontrolünde.</p>
            </header>

            {/* ---------- Anonim kimlik ---------- */}
            <Section title="Anonim kimliğin">
                <Card className="p-6 animate-rise-in">
                    <div className="mb-5 flex items-center gap-4">
                        <Avatar emoji={profile.emoji} color={profile.color} size={56} ring />
                        <div className="min-w-0 flex-1">
                            <p className="truncate text-xl font-extrabold text-neutral-900">{profile.pseudonym || 'Gezgin'}</p>
                            <p className="text-[12px] font-bold text-neutral-400">
                                {formatDate(profile.joinedAt)} tarihinden beri kozada
                            </p>
                        </div>
                    </div>

                    <p className="mb-2 text-[12px] font-extrabold uppercase tracking-wider text-neutral-400">Takma adın</p>
                    <Input
                        value={nameDraft}
                        onChange={onNameChange}
                        onKeyDown={(e) => e.key === 'Enter' && saveName()}
                        placeholder="Kendi takma adını yaz"
                        maxLength={USERNAME_LIMITS.MAX}
                        error={nameError}
                        hint="Gerçek adını değil, sana özel bir takma ad kullan."
                    />
                    <div className="mb-5 mt-2.5 flex gap-2">
                        <button
                            onClick={suggestName}
                            className="flex items-center gap-1.5 rounded-full bg-primary-50 px-3.5 py-2 text-[12px] font-extrabold text-primary-700 transition-transform hover:scale-105 active:scale-95"
                        >
                            <Dices size={14} /> Rastgele öner
                        </button>
                        <Button
                            size="sm"
                            onClick={saveName}
                            disabled={nameDraft.trim().replace(/\s+/g, ' ') === (profile.pseudonym || '')}
                        >
                            Kaydet
                        </Button>
                    </div>

                    <p className="mb-2 text-[12px] font-extrabold uppercase tracking-wider text-neutral-400">Simge</p>
                    <div className="mb-5 grid grid-cols-6 gap-2 sm:grid-cols-12">
                        {AVATAR_EMOJIS.map((e) => (
                            <button
                                key={e}
                                onClick={() => updateIdentity({ emoji: e })}
                                aria-pressed={profile.emoji === e}
                                className={cn(
                                    'flex h-10 items-center justify-center rounded-xl text-lg transition-all',
                                    profile.emoji === e ? 'bg-primary-100 ring-2 ring-primary-400' : 'bg-neutral-50 hover:bg-neutral-100'
                                )}
                            >
                                {e}
                            </button>
                        ))}
                    </div>

                    <p className="mb-2 text-[12px] font-extrabold uppercase tracking-wider text-neutral-400">Renk</p>
                    <div className="flex gap-2.5">
                        {AVATAR_COLORS.map((c) => (
                            <button
                                key={c}
                                onClick={() => updateIdentity({ color: c })}
                                aria-label={`Renk ${c}`}
                                aria-pressed={profile.color === c}
                                style={{ background: c }}
                                className={cn('h-8 w-8 rounded-full transition-all', profile.color === c ? 'ring-4 ring-offset-2 ring-neutral-300 scale-110' : 'hover:scale-110')}
                            />
                        ))}
                    </div>
                </Card>
            </Section>

            {/* ---------- Okul paneli erişimi ---------- */}
            <Section title="Rehber öğretmen misin?">
                <Card className="p-6 animate-rise-in">
                    {isCounselor ? (
                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <div className="flex items-center gap-3.5">
                                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-success-50 text-success-600">
                                    <Check size={22} />
                                </span>
                                <div>
                                    <p className="font-extrabold text-neutral-900">Okul Paneli erişimin açık</p>
                                    <p className="text-[13px] font-bold text-neutral-400">Kimliksizleştirilmiş okul analizlerini görüntüle</p>
                                </div>
                            </div>
                            <Button size="sm" variant="secondary" icon={BarChart3} onClick={() => navigate('rehber')}>Paneli Aç</Button>
                        </div>
                    ) : (
                        <form onSubmit={submitCode}>
                            <div className="mb-4 flex items-start gap-3.5">
                                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-info-50 text-info-600">
                                    <KeyRound size={20} />
                                </span>
                                <p className="text-[13px] font-bold leading-relaxed text-neutral-500">
                                    KOZA Okul planına sahip kurumların rehber öğretmenleri, erişim koduyla
                                    anonim analiz paneline ulaşabilir.
                                </p>
                            </div>
                            <div className="flex gap-2.5">
                                <Input
                                    placeholder="Erişim kodu (ör. KOZA-OKUL-…)"
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                    error={codeError}
                                    className="flex-1"
                                />
                                <Button type="submit" variant="secondary" className="shrink-0">Doğrula</Button>
                            </div>
                        </form>
                    )}
                </Card>
            </Section>

            {/* ---------- Hesap & veri ---------- */}
            <Section title="Hesap ve verilerin">
                <Card className="divide-y divide-neutral-100 animate-rise-in">
                    <div className="flex items-center justify-between gap-4 p-5">
                        <div className="flex items-center gap-3.5">
                            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-100 text-neutral-500">
                                {cloudSynced ? <Cloud size={18} /> : <CloudOff size={18} />}
                            </span>
                            <div>
                                <p className="text-sm font-extrabold text-neutral-900">
                                    {authUser?.isAnonymous ? 'Anonim hesap' : authUser?.email || 'Hesap'}
                                </p>
                                <p className="text-[12px] font-bold text-neutral-400">
                                    {cloudSynced ? 'Bulutla eşitleniyor' : 'Yalnızca bu cihazda saklanıyor'}
                                </p>
                            </div>
                        </div>
                        {authUser?.isAnonymous && <Badge tone="primary">Gizli mod</Badge>}
                    </div>

                    <button onClick={exportData} className="flex w-full items-center gap-3.5 p-5 text-left transition-colors hover:bg-neutral-50">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-100 text-neutral-500">
                            <Download size={18} />
                        </span>
                        <div className="flex-1">
                            <p className="text-sm font-extrabold text-neutral-900">Verilerimi indir</p>
                            <p className="text-[12px] font-bold text-neutral-400">Tüm eserlerini ve ilerlemeni JSON olarak al</p>
                        </div>
                    </button>

                    <button
                        onClick={signOut}
                        className="flex w-full items-center gap-3.5 p-5 text-left text-danger-600 transition-colors hover:bg-danger-50/50"
                    >
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-danger-50 text-danger-500">
                            <LogOut size={18} />
                        </span>
                        <p className="text-sm font-extrabold">Oturumu kapat</p>
                    </button>
                </Card>
            </Section>

            <footer className="flex flex-col items-center gap-2 pb-6 pt-2 text-center">
                <p className="flex items-center gap-1.5 text-[11px] font-bold text-neutral-300">
                    <ShieldCheck size={12} /> {SAFETY_DISCLAIMER}
                </p>
                <p className="text-[11px] font-bold text-neutral-300">KOZA v{APP.version} · TEKNOFEST 2026 · Hemhal Takımı</p>
            </footer>
        </div>
    );
};

export default ProfilePage;
