import React, { useMemo, useState } from 'react';
import {
    BarChart3, ShieldCheck, TrendingUp, TrendingDown, Minus, Users, Heart,
    Handshake, AlertTriangle, Lightbulb, FlaskConical, Lock,
} from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import EmptyState from '../components/ui/EmptyState';
import { useUser } from '../context/UserContext';
import { useStory } from '../context/StoryContext';
import { useUI } from '../context/UIContext';
import { CATEGORIES, CATEGORY_KEYS } from '../config/constants';
import { cn } from '../utils/helpers';

/* ---------------- Demo veri (panelin değerini boş okulda da gösterir) ---------------- */
const DEMO_WEEKS = ['4 hf önce', '3 hf önce', '2 hf önce', 'Geçen hf', 'Bu hafta'];

const buildDemoData = () => ({
    demo: true,
    totalShares: 47,
    totalHearts: 312,
    totalHugs: 158,
    categories: { alay: 14, dislanma: 11, siber: 9, soylenti: 6, fiziksel: 4, tehdit: 2, diger: 1 },
    weekly: [
        { hafta: DEMO_WEEKS[0], adet: 6 },
        { hafta: DEMO_WEEKS[1], adet: 8 },
        { hafta: DEMO_WEEKS[2], adet: 9 },
        { hafta: DEMO_WEEKS[3], adet: 13 },
        { hafta: DEMO_WEEKS[4], adet: 11 },
    ],
    risingCategory: 'siber',
});

/* ---------------- Gerçek topluluk verisinden anonim istatistik ---------------- */
const aggregate = (community) => {
    if (!community.length) return null;
    const categories = {};
    CATEGORY_KEYS.forEach((k) => (categories[k] = 0));
    let totalHearts = 0;
    let totalHugs = 0;

    const weekMs = 7 * 86_400_000;
    const now = Date.now();
    const weekly = DEMO_WEEKS.map((hafta) => ({ hafta, adet: 0 }));

    community.forEach((item) => {
        categories[item.category in categories ? item.category : 'diger'] += 1;
        totalHearts += item.hearts || 0;
        totalHugs += item.hugs || 0;
        const created = item.createdAt?.toDate ? item.createdAt.toDate() : new Date(item.createdAt || now);
        const weeksAgo = Math.floor((now - created.getTime()) / weekMs);
        if (weeksAgo >= 0 && weeksAgo <= 4) weekly[4 - weeksAgo].adet += 1;
    });

    const risingCategory = Object.entries(categories).sort((a, b) => b[1] - a[1])[0]?.[0] || 'diger';
    return { demo: false, totalShares: community.length, totalHearts, totalHugs, categories, weekly, risingCategory };
};

/* ---------------- Mini grafik bileşenleri (saf SVG/CSS) ---------------- */
const CategoryBars = ({ categories }) => {
    const entries = CATEGORY_KEYS.map((k) => [k, categories[k] || 0]).filter(([, v]) => v > 0).sort((a, b) => b[1] - a[1]);
    const max = Math.max(...entries.map(([, v]) => v), 1);
    return (
        <div className="space-y-3.5">
            {entries.map(([key, value]) => (
                <div key={key}>
                    <div className="mb-1 flex items-center justify-between text-[12px] font-extrabold">
                        <span className="text-neutral-600">{CATEGORIES[key].label}</span>
                        <span className="tabular-nums text-neutral-400">{value}</span>
                    </div>
                    <div className="h-2.5 overflow-hidden rounded-full bg-neutral-100">
                        <div
                            className="h-full rounded-full transition-[width] duration-1000 ease-out"
                            style={{ width: `${(value / max) * 100}%`, background: CATEGORIES[key].color }}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
};

const WeeklyChart = ({ weekly }) => {
    const max = Math.max(...weekly.map((w) => w.adet), 1);
    return (
        <div className="flex h-44 items-end justify-between gap-3 px-1">
            {weekly.map((w, i) => (
                <div key={w.hafta} className="flex flex-1 flex-col items-center gap-2">
                    <span className="text-[12px] font-extrabold tabular-nums text-neutral-500">{w.adet}</span>
                    <div
                        className={cn(
                            'w-full max-w-[44px] rounded-t-xl transition-[height] duration-1000 ease-out',
                            i === weekly.length - 1 ? 'bg-primary-500' : 'bg-primary-200'
                        )}
                        style={{ height: `${Math.max((w.adet / max) * 120, 6)}px` }}
                    />
                    <span className="text-[10px] font-bold text-neutral-400">{w.hafta}</span>
                </div>
            ))}
        </div>
    );
};

const StatCard = ({ icon: Icon, label, value, tone }) => (
    <Card className="flex items-center gap-3.5 p-5">
        <span className={cn('flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl', tone)}>
            <Icon size={21} strokeWidth={2.2} />
        </span>
        <span>
            <span className="block text-2xl font-extrabold tabular-nums text-neutral-900">{value}</span>
            <span className="block text-[11px] font-extrabold uppercase tracking-wide text-neutral-400">{label}</span>
        </span>
    </Card>
);

/* ---------------- Öneri motoru ---------------- */
const RECOMMENDATIONS = {
    siber: 'Siber zorbalık eğilimi öne çıkıyor. Dijital ayak izi ve ekran görüntüsüyle kanıt saklama konulu bir sınıf etkinliği planlayabilirsiniz.',
    alay: 'Alay etme/lakap takma öne çıkıyor. "Kozanın içinde ne var?" empati atölyesi — öğrencilerin görünmeyen hikâyeleri keşfettiği bir oturum — etkili olabilir.',
    dislanma: 'Dışlanma eğilimi öne çıkıyor. Teneffüs ve yemekhane gibi yapılandırılmamış zamanlarda kapsayıcı grup etkinlikleri düzenlemeyi değerlendirin.',
    soylenti: 'Söylenti yayma eğilimi öne çıkıyor. "Bilgi mi, dedikodu mu?" temalı medya okuryazarlığı etkinliği planlanabilir.',
    fiziksel: 'Fiziksel zorbalık bildirimi mevcut. Riskli bölgelerin (koridor, bahçe köşeleri) gözetimini artırmayı ve bireysel görüşmeleri öne almayı değerlendirin.',
    tehdit: 'Tehdit/korkutma içerikli paylaşımlar mevcut. Okul yönetimiyle koordineli bireysel destek planı önceliklendirilmelidir.',
    diger: 'Paylaşımlar çeşitli kategorilere dağılıyor. Genel bir akran zorbalığı farkındalık haftası planlamak iyi bir başlangıç olabilir.',
};

const CounselorPage = () => {
    const { isCounselor } = useUser();
    const { community } = useStory();
    const { navigate } = useUI();
    const [demoMode, setDemoMode] = useState(false);

    const realData = useMemo(() => aggregate(community), [community]);
    const data = demoMode ? buildDemoData() : realData;

    /* ---------- Erişim koruması ---------- */
    if (!isCounselor) {
        return (
            <div className="mx-auto max-w-md pt-10">
                <Card className="animate-rise-in">
                    <EmptyState
                        icon={Lock}
                        title="Bu panel rehber öğretmenlere özel"
                        description="KOZA Okul planına sahip kurumların rehber öğretmenleri, Profil sayfasından erişim kodu girerek bu panele ulaşabilir."
                        action={<Button onClick={() => navigate('profil')}>Profil'e Git</Button>}
                    />
                </Card>
            </div>
        );
    }

    const trendDelta = data ? data.weekly[4].adet - data.weekly[3].adet : 0;
    const TrendIcon = trendDelta > 0 ? TrendingUp : trendDelta < 0 ? TrendingDown : Minus;

    return (
        <div className="space-y-6">
            <header className="flex flex-wrap items-end justify-between gap-4 animate-rise-in">
                <div>
                    <div className="mb-2 flex items-center gap-2">
                        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Okul Analiz Paneli</h1>
                        {data?.demo && <Badge tone="accent"><FlaskConical size={11} /> Demo veri</Badge>}
                    </div>
                    <p className="max-w-xl text-sm font-bold leading-relaxed text-neutral-400">
                        Öğrencilerin anonim paylaşımlarından türetilen eğilimler. Veri odaklı önleyici strateji için.
                    </p>
                </div>
                {realData && demoMode && (
                    <Button size="sm" variant="secondary" onClick={() => setDemoMode(false)}>Gerçek veriye dön</Button>
                )}
            </header>

            {/* ---------- Gizlilik garantisi ---------- */}
            <Card className="flex items-start gap-3.5 border-success-200 bg-success-50/50 p-5 animate-rise-in" style={{ animationDelay: '0.05s' }}>
                <ShieldCheck size={20} className="mt-0.5 shrink-0 text-success-600" />
                <p className="text-[13px] font-bold leading-relaxed text-success-700">
                    Bu panel <strong>tamamen kimliksizleştirilmiş</strong> veriler gösterir. Hangi öğrencinin ne yazdığı,
                    kim olduğu veya hangi sınıfta olduğu hiçbir koşulda görünmez — yalnızca toplu eğilimler.
                </p>
            </Card>

            {!data ? (
                <Card className="animate-rise-in" style={{ animationDelay: '0.1s' }}>
                    <EmptyState
                        icon={BarChart3}
                        title="Henüz analiz edilecek veri yok"
                        description="Öğrenciler eserlerini toplulukla paylaştıkça burada anonim eğilimler oluşacak. Paneli keşfetmek için demo verileri yükleyebilirsiniz."
                        action={<Button icon={FlaskConical} onClick={() => setDemoMode(true)}>Demo Verilerle Keşfet</Button>}
                    />
                </Card>
            ) : (
                <>
                    {/* ---------- Özet kartları ---------- */}
                    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 stagger-children">
                        <StatCard icon={Users} label="Anonim paylaşım" value={data.totalShares} tone="bg-primary-50 text-primary-600" />
                        <StatCard icon={Heart} label="Verilen kalp" value={data.totalHearts} tone="bg-danger-50 text-danger-500" />
                        <StatCard icon={Handshake} label='"Hemhal" tepkisi' value={data.totalHugs} tone="bg-accent-50 text-accent-600" />
                        <Card className="flex items-center gap-3.5 p-5">
                            <span className={cn(
                                'flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl',
                                trendDelta > 0 ? 'bg-danger-50 text-danger-500' : trendDelta < 0 ? 'bg-success-50 text-success-600' : 'bg-neutral-100 text-neutral-500'
                            )}>
                                <TrendIcon size={21} strokeWidth={2.2} />
                            </span>
                            <span>
                                <span className="block text-2xl font-extrabold tabular-nums text-neutral-900">
                                    {trendDelta > 0 ? `+${trendDelta}` : trendDelta}
                                </span>
                                <span className="block text-[11px] font-extrabold uppercase tracking-wide text-neutral-400">Haftalık değişim</span>
                            </span>
                        </Card>
                    </div>

                    <div className="grid gap-5 lg:grid-cols-2">
                        {/* ---------- Kategori dağılımı ---------- */}
                        <Card className="p-6 animate-rise-in sm:p-7" style={{ animationDelay: '0.12s' }}>
                            <h2 className="mb-1 font-extrabold text-neutral-900">Zorbalık türü dağılımı</h2>
                            <p className="mb-6 text-[12px] font-bold text-neutral-400">Paylaşımların yapay zekâ ile sınıflandırılmış kategorileri</p>
                            <CategoryBars categories={data.categories} />
                        </Card>

                        {/* ---------- Haftalık eğilim ---------- */}
                        <Card className="p-6 animate-rise-in sm:p-7" style={{ animationDelay: '0.18s' }}>
                            <h2 className="mb-1 font-extrabold text-neutral-900">Haftalık paylaşım eğilimi</h2>
                            <p className="mb-6 text-[12px] font-bold text-neutral-400">Son 5 haftadaki anonim paylaşım hacmi</p>
                            <WeeklyChart weekly={data.weekly} />
                        </Card>
                    </div>

                    {/* ---------- Dikkat + öneri ---------- */}
                    <div className="grid gap-5 lg:grid-cols-2">
                        <Card className="border-accent-200 bg-accent-50/40 p-6 animate-rise-in sm:p-7" style={{ animationDelay: '0.24s' }}>
                            <div className="mb-3 flex items-center gap-2.5">
                                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-100 text-accent-700">
                                    <AlertTriangle size={18} />
                                </span>
                                <h2 className="font-extrabold text-neutral-900">Dikkat gerektiren eğilim</h2>
                            </div>
                            <p className="text-sm font-bold leading-relaxed text-neutral-600">
                                Bu dönem en yoğun kategori:{' '}
                                <span style={{ color: CATEGORIES[data.risingCategory].color }} className="font-extrabold">
                                    {CATEGORIES[data.risingCategory].label}
                                </span>
                                {' '}({data.categories[data.risingCategory]} paylaşım).
                            </p>
                        </Card>

                        <Card className="border-info-100 bg-info-50/40 p-6 animate-rise-in sm:p-7" style={{ animationDelay: '0.3s' }}>
                            <div className="mb-3 flex items-center gap-2.5">
                                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-info-100 text-info-600">
                                    <Lightbulb size={18} />
                                </span>
                                <h2 className="font-extrabold text-neutral-900">Önleyici strateji önerisi</h2>
                            </div>
                            <p className="text-sm font-bold leading-relaxed text-neutral-600">
                                {RECOMMENDATIONS[data.risingCategory] || RECOMMENDATIONS.diger}
                            </p>
                        </Card>
                    </div>

                    {!data.demo && data.totalShares < 5 && (
                        <p className="text-center text-[12px] font-bold text-neutral-400">
                            Not: Veri hacmi henüz düşük; eğilimler zamanla netleşecektir.{' '}
                            <button className="text-primary-600 hover:underline" onClick={() => setDemoMode(true)}>
                                Demo verilerle paneli keşfet →
                            </button>
                        </p>
                    )}
                </>
            )}
        </div>
    );
};

export default CounselorPage;
