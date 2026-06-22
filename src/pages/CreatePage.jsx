import React, { useEffect, useState } from 'react';
import { BookOpen, Gamepad2, Mail, Sparkles, ArrowRight, HeartHandshake, Share2, RotateCcw, WifiOff } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import CocoonVisual from '../components/cocoon/CocoonVisual';
import ShareDialog from '../components/ShareDialog';
import ExperienceWizard from '../components/create/ExperienceWizard';
import { useStory } from '../context/StoryContext';
import { useUser } from '../context/UserContext';
import { useUI } from '../context/UIContext';
import { generateContent } from '../lib/ai';
import { detectCrisis } from '../utils/safety';
import { CONTENT_TYPES, SAFETY_DISCLAIMER } from '../config/constants';
import { fireConfetti } from '../lib/confetti';
import { cn } from '../utils/helpers';

const TYPES = [
    { id: 'story', icon: BookOpen, title: 'Hikâye', desc: 'Deneyimin, kahramanı sen olan 10 sayfalık edebi bir hikâyeye dönüşür.' },
    { id: 'game', icon: Gamepad2, title: 'Oyun', desc: 'Benzer durumlarla başa çıkmayı 3 bölümlük interaktif senaryoda prova edersin.' },
    { id: 'letter', icon: Mail, title: 'Mektup', desc: '5 yıl sonraki senden, bugünkü sana yazılmış umut dolu bir mektup alırsın.' },
];

const LOADING_LINES = [
    'Deneyimin nazikçe okunuyor…',
    'Anlatı Terapisi ilkeleri uygulanıyor…',
    'Sen bir kahraman olarak yeniden çiziliyorsun…',
    'Sayfalar tek tek dokunuyor…',
    'Kanatlar şekilleniyor…',
    'Son ışıltılar ekleniyor…',
];

/* ---------- Üretim sırasında tam ekran sahne ---------- */
const GenerationOverlay = () => {
    const [tick, setTick] = useState(0);
    useEffect(() => {
        const t = setInterval(() => setTick((v) => v + 1), 2400);
        return () => clearInterval(t);
    }, []);
    return (
        <div className="fixed inset-0 z-[80] flex flex-col items-center justify-center bg-neutral-50/95 backdrop-blur-md animate-fade-in" role="status" aria-live="polite">
            <CocoonVisual stage={(tick % 7) + 1} size={230} />
            <p key={tick} className="mt-2 text-base font-extrabold text-neutral-700 animate-rise-in">
                {LOADING_LINES[tick % LOADING_LINES.length]}
            </p>
            <p className="mt-2 text-[12px] font-bold text-neutral-400">Bu işlem yaklaşık 30–60 saniye sürer · Sayfadan ayrılma</p>
        </div>
    );
};

/* ---------- Kriz durumu kartı ---------- */
const CrisisCard = ({ onOpenSupport }) => (
    <Card className="border-danger-100 bg-danger-50/50 p-7 text-center animate-scale-in">
        <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-danger-100 text-danger-600">
            <HeartHandshake size={26} />
        </span>
        <h3 className="mb-2 text-lg font-extrabold text-neutral-900">Önce sen önemlisin</h3>
        <p className="mx-auto mb-6 max-w-md text-sm leading-relaxed text-neutral-600">
            Yazdıklarında, bir uygulamanın tek başına taşımaması gereken bir ağırlık fark ettik.
            Bu cümleleri bir hikâyeye değil, seni gerçekten dinleyecek birine emanet etmeliyiz.
            Yalnız değilsin — gerçek destek bir dokunuş uzağında.
        </p>
        <Button onClick={onOpenSupport} icon={HeartHandshake}>Destek Kaynaklarını Gör</Button>
    </Card>
);

const CreatePage = () => {
    const { route, navigate, addToast, openModal } = useUI();
    const { saveCreation } = useStory();
    const { registerCreation } = useUser();

    const initialType = ['story', 'game', 'letter'].includes(route.param) ? route.param : 'story';
    const [type, setType] = useState(initialType);
    const [crisis, setCrisis] = useState(false);
    const [generating, setGenerating] = useState(false);
    const [result, setResult] = useState(null);
    const [shareOpen, setShareOpen] = useState(false);
    const [wizardKey, setWizardKey] = useState(0);

    useEffect(() => {
        if (['story', 'game', 'letter'].includes(route.param)) setType(route.param);
    }, [route.param]);

    const handleGenerate = async (structured, raw) => {
        setCrisis(false);

        if (detectCrisis(raw).isCrisis) {
            setCrisis(true);
            return;
        }

        setGenerating(true);
        try {
            const content = await generateContent(type, structured);
            const saved = saveCreation(content, raw);
            registerCreation();
            setResult(saved);
            fireConfetti();
            if (content.source === 'local') {
                addToast('info', 'Çevrimdışı mod', 'Yapay zekâya ulaşılamadı; özenle hazırlanmış içerik sunuldu.');
            }
        } catch (e) {
            console.error('Üretim hatası:', e);
            addToast('error', 'Dönüşüm hatası', 'Bir sorun oluştu. Lütfen tekrar dene.');
        } finally {
            setGenerating(false);
        }
    };

    const resultMeta = result ? CONTENT_TYPES[result.type] : null;

    return (
        <div className="mx-auto max-w-2xl space-y-7">
            {generating && <GenerationOverlay />}

            {/* ---------- Sonuç ekranı ---------- */}
            {result ? (
                <div className="space-y-5 pt-4 text-center animate-scale-in">
                    <CocoonVisual stage={5} size={170} className="mx-auto" />
                    <div>
                        <Badge tone="primary" className="mb-3">{resultMeta.emoji} {resultMeta.label} hazır</Badge>
                        <h1 className="mb-2 text-3xl font-extrabold tracking-tight">{result.title}</h1>
                        {result.growthLesson && (
                            <p className="mx-auto max-w-md font-serif text-[15px] italic leading-relaxed text-neutral-500">
                                "{result.growthLesson}"
                            </p>
                        )}
                        {result.source === 'local' && (
                            <p className="mt-2 inline-flex items-center gap-1.5 text-[12px] font-bold text-neutral-400">
                                <WifiOff size={12} /> Çevrimdışı içerik
                            </p>
                        )}
                    </div>
                    <div className="flex flex-col justify-center gap-3 sm:flex-row">
                        <Button size="lg" iconRight={ArrowRight} onClick={() => navigate(`icerik/${result.id}`)}>
                            {result.type === 'story' ? 'Hikâyeni Oku' : result.type === 'game' ? 'Oyununu Oyna' : 'Mektubunu Aç'}
                        </Button>
                        <Button size="lg" variant="secondary" icon={Share2} onClick={() => setShareOpen(true)}>
                            Toplulukla Paylaş
                        </Button>
                    </div>
                    <button
                        onClick={() => { setResult(null); setCrisis(false); setWizardKey(k => k + 1); }}
                        className="mx-auto flex items-center gap-1.5 text-[13px] font-bold text-neutral-400 transition-colors hover:text-neutral-700"
                    >
                        <RotateCcw size={13} /> Yeni bir dönüşüm yap
                    </button>
                    <ShareDialog creation={result} open={shareOpen} onClose={() => setShareOpen(false)} />
                </div>
            ) : (
                <>
                    {/* ---------- Başlık ---------- */}
                    <header className="pt-2 text-center animate-rise-in">
                        <Badge tone="primary" className="mb-4">
                            <Sparkles size={12} /> Anlatı Terapisi × Yapay Zekâ
                        </Badge>
                        <h1 className="mb-3 text-3xl font-extrabold tracking-tight sm:text-4xl">Deneyimini güce dönüştür</h1>
                        <p className="mx-auto max-w-md text-sm leading-relaxed text-neutral-500">
                            Yaşadığın zorluğu anlat. Onu, senin kahraman olduğun bir esere dönüştürelim.
                        </p>
                    </header>

                    {crisis ? (
                        <CrisisCard onOpenSupport={() => openModal('safety')} />
                    ) : (
                        <>
                            {/* ---------- Tür seçimi ---------- */}
                            <div className="grid gap-3 sm:grid-cols-3 animate-rise-in" style={{ animationDelay: '0.07s' }} role="radiogroup" aria-label="İçerik türü">
                                {TYPES.map((t) => (
                                    <button
                                        key={t.id}
                                        role="radio"
                                        aria-checked={type === t.id}
                                        onClick={() => { setType(t.id); setWizardKey(k => k + 1); }}
                                        className={cn(
                                            'card p-5 text-left transition-all duration-300',
                                            type === t.id
                                                ? 'border-primary-400 ring-4 ring-primary-100 shadow-card'
                                                : 'hover:border-neutral-300 hover:shadow-card'
                                        )}
                                    >
                                        <span className={cn(
                                            'mb-3 flex h-10 w-10 items-center justify-center rounded-xl transition-colors',
                                            type === t.id ? 'bg-primary-600 text-white' : 'bg-neutral-100 text-neutral-500'
                                        )}>
                                            <t.icon size={19} strokeWidth={2.2} />
                                        </span>
                                        <span className="mb-1 flex items-center gap-2 font-extrabold text-neutral-900">
                                            {t.title}
                                            <span className="text-[11px] font-bold text-accent-600">+{CONTENT_TYPES[t.id].oz} ÖZ</span>
                                        </span>
                                        <span className="block text-[12px] leading-relaxed text-neutral-500">{t.desc}</span>
                                    </button>
                                ))}
                            </div>

                            {/* ---------- Deneyim sihirbazı ---------- */}
                            <div className="card p-6 animate-rise-in" style={{ animationDelay: '0.14s' }}>
                                <ExperienceWizard
                                    key={wizardKey}
                                    onComplete={handleGenerate}
                                />
                            </div>
                        </>
                    )}

                    <p className="pb-4 text-center text-[11px] font-bold leading-relaxed text-neutral-300">
                        🔔 {SAFETY_DISCLAIMER}
                    </p>
                </>
            )}
        </div>
    );
};

export default CreatePage;
