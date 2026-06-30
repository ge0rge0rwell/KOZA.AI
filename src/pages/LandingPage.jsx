import React, { useEffect, useState } from 'react';
import {
    ArrowRight, ShieldCheck, Sparkles, BookOpen, Gamepad2, Mail,
    Users, Compass, BarChart3, ChevronDown, Lock, HeartHandshake, VenetianMask,
    Heart, Handshake,
} from 'lucide-react';
import Logo, { ButterflyMark } from '../components/ui/Logo';
import Button from '../components/ui/Button';
import Avatar from '../components/ui/Avatar';
import Badge from '../components/ui/Badge';
import CocoonVisual from '../components/cocoon/CocoonVisual';
import AuthModal from '../components/auth/AuthModal';
import { SAFETY_DISCLAIMER, CATEGORIES } from '../config/constants';
import { SEED_COMMUNITY } from '../config/seedContent';
import { cn, truncate } from '../utils/helpers';

const DEMO_PAIRS = [
    {
        input: '"Sınıfta herkes güldü. Ben sadece anneme yardım etmek istemiştim..."',
        title: '"Koridordaki Kahraman"',
        sub: 'Bir sevginin en güçlü koza hâli 🦋',
    },
    {
        input: '"Grup sohbetine eklenmiyordum. Sanki yokmuşum gibi..."',
        title: '"Görünmezlik Kalkanı"',
        sub: 'Sessizliği güce dönüştüren yolculuk 💙',
    },
    {
        input: '"Bana lakap taktılar, okula gitmek istemiyorum artık..."',
        title: '"Lakabın Gölgesi"',
        sub: 'Kelimeler iz bırakır; kahraman güçlenir 🔮',
    },
    {
        input: '"Fotoğrafımı izinsiz paylaştılar, korku içindeyim..."',
        title: '"Ekranın Ötesi"',
        sub: 'Dijital karanlıkta açılan bir kanat ⚡',
    },
];

const TransformPreview = () => {
    const [idx, setIdx] = useState(0);
    const [visible, setVisible] = useState(true);
    useEffect(() => {
        let timeout;
        const t = setInterval(() => {
            setVisible(false);
            timeout = setTimeout(() => {
                setIdx((i) => (i + 1) % DEMO_PAIRS.length);
                setVisible(true);
            }, 380);
        }, 4200);
        return () => { clearInterval(t); clearTimeout(timeout); };
    }, []);
    const pair = DEMO_PAIRS[idx];
    return (
        <div className="flex items-center gap-2 rounded-2xl border border-neutral-200/80 bg-white/85 p-4 text-left backdrop-blur-md shadow-card">
            <div className="flex-1 min-w-0 rounded-xl bg-neutral-50 p-3 transition-opacity duration-[350ms]" style={{ opacity: visible ? 1 : 0 }}>
                <p className="mb-1 text-[10px] font-extrabold uppercase tracking-wider text-neutral-400">Deneyim</p>
                <p className="text-[12px] leading-relaxed text-neutral-600 italic">{pair.input}</p>
            </div>
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-b from-primary-400 to-primary-600 shadow-[0_2px_8px_-2px_rgba(106,82,220,0.45)] animate-pulse-soft">
                <Sparkles size={13} className="text-white" />
            </div>
            <div className="flex-1 min-w-0 rounded-xl bg-gradient-to-br from-primary-50 to-primary-100/60 p-3 transition-opacity duration-[350ms]" style={{ opacity: visible ? 1 : 0 }}>
                <p className="mb-1 text-[10px] font-extrabold uppercase tracking-wider text-primary-500">Dönüşüm</p>
                <p className="text-[13px] font-extrabold text-primary-900">{pair.title}</p>
                <p className="text-[12px] text-primary-500">{pair.sub}</p>
            </div>
        </div>
    );
};

/* ---------- Kahraman görseli: koza→kelebek döngüsü ---------- */
const HeroVisual = () => {
    const [stage, setStage] = useState(1);
    useEffect(() => {
        const t = setInterval(() => setStage((s) => (s >= 7 ? 1 : s + 1)), 2200);
        return () => clearInterval(t);
    }, []);
    return (
        <div className="relative mx-auto flex items-center justify-center aspect-square w-full max-w-[420px]">
            {/* Glow backdrop */}
            <div className="absolute inset-0 rounded-full" style={{ background: 'radial-gradient(circle at 50% 50%, rgba(132,112,232,0.22) 0%, rgba(226,154,40,0.10) 50%, transparent 72%)', filter: 'blur(24px)' }} aria-hidden />
            {/* Concentric rings */}
            <div className="absolute inset-6 rounded-full border border-primary-200/30" style={{ borderColor: 'rgba(132,112,232,0.18)' }} aria-hidden />
            <div className="absolute inset-14 rounded-full border" style={{ borderColor: 'rgba(132,112,232,0.12)' }} aria-hidden />
            <CocoonVisual stage={stage} size={400} className="relative w-full h-full transition-all duration-700" />
            <div className="absolute -bottom-2 left-1/2 flex -translate-x-1/2 gap-2">
                {Array.from({ length: 7 }).map((_, i) => (
                    <span
                        key={i}
                        className={cn(
                            'h-1.5 rounded-full transition-all duration-500',
                            i + 1 === stage ? 'w-7 bg-primary-500' : 'w-1.5 bg-neutral-200'
                        )}
                    />
                ))}
            </div>
        </div>
    );
};

const STEPS = [
    { n: '01', icon: Mail, title: 'Anlat', text: 'Yaşadığın zorluğu kendi cümlelerinle, tamamen anonim olarak yaz. Kimse kim olduğunu bilmez.' },
    { n: '02', icon: Sparkles, title: 'Dönüştür', text: 'Yapay zekâ, Anlatı Terapisi ilkeleriyle deneyimini sana özel bir hikâyeye, oyuna veya mektuba dönüştürür.' },
    { n: '03', icon: Compass, title: 'Güçlen', text: 'Kendi hikâyenin kahramanı olarak ÖZ puan topla, kozandan adım adım çık ve istersen başkalarına ilham ver.' },
];

const FEATURES = [
    { icon: BookOpen, title: 'Kişisel Hikâyeler', text: 'Deneyimin, Anlatı Terapisi ilkeleriyle seni mağdur değil kahraman olarak anlatan edebi bir hikâyeye dönüşür. Her sayfada kendi gücünü keşfedersin.' },
    { icon: Gamepad2, title: 'İnteraktif Oyunlar', text: 'Zor durumlarla başa çıkmayı gerçek hayatta denemeden önce güvenli senaryolar üzerinden prova edersin. Her karar seni bir adım daha güçlü kılar.' },
    { icon: Mail, title: 'Gelecekten Mektuplar', text: '5 yıl sonraki sen, bugünkü sana ne söylerdi? Yapay zekâ bu mektubu senin deneyiminden yola çıkarak, umutla ve güçle yazar.' },
    { icon: Users, title: 'Empati Topluluğu', text: 'Başkalarının dönüşüm hikâyelerine "ben de yaşadım" diyebileceğin anonim bir alan. Yalnız olmadığını hissetmek, kozanı kırar.' },
    { icon: Compass, title: 'Metamorfoz Yolculuğu', text: 'Her oluşturduğun eserle ÖZ kazanır, kozandan kelebeğe 7 aşamalı dönüşümünü adım adım izlersin. Rozetler ve anlık kutlamalar yolunu aydınlatır.' },
    { icon: BarChart3, title: 'Okul Analiz Paneli', text: 'Rehber öğretmenler, kimliği belirsizleştirilmiş toplu verileri görür: hangi tür zorluklar artıyor, hangi haftalarda yoğunluk var. Kimin ne yazdığı asla görünmez.' },
];

const PROBLEM_STATS = [
    { value: '1/3', label: 'ortaokul öğrencisi', sub: 'hayatının bir döneminde akran zorbalığına maruz kalıyor', source: 'UNICEF Küresel Raporu, 2023' },
    { value: '%64', label: 'öğrenci sessiz kalıyor', sub: 'yaşadığını hiçbir yetişkine bildirmiyor', source: 'UNESCO / Bullying Meta-analysis, 2022' },
    { value: '3×', label: 'daha yüksek risk', sub: 'müdahalesiz vakalarda uzun vadeli depresyon', source: 'WHO Ergen Ruh Sağlığı, 2024' },
    { value: '%78', label: 'etkili müdahale', sub: 'kanıta dayalı terapötik yaklaşımla gösterilen iyileşme oranı', source: 'Narrative Therapy Meta-analysis' },
];

const TESTIMONIALS = [
    {
        quote: 'İçimde ne hissettiğimi söyleyemiyordum. KOZA\'ya yazdım; benden güçlü bir kahraman çıktı. Artık o hikâye beni değil, ben onu taşıyorum.',
        name: 'Elif, 12 yaşında',
        role: 'Öğrenci — 7. sınıf, Ankara',
        emoji: '🦋',
    },
    {
        quote: 'Öğrencilerimin yaşadıklarını toplu eğilim olarak görünce önleyici çalışmalarımı zamanlayabiliyorum. Bu analitik olmadan körlüğe yürüyordum.',
        name: 'Zeynep Hanım',
        role: 'Rehber Öğretmen — İzmir',
        emoji: '📊',
    },
    {
        quote: 'Çocuğumun içini dökmesine güvenli bir zemin arıyordum. KOZA\'yı kullandıktan sonra haftalarca ilk kez benimle konuşmaya başladı.',
        name: 'Bir anne',
        role: 'Ebeveyn — İstanbul',
        emoji: '💜',
    },
];

const FAQS = [
    { q: 'KOZA gerçekten anonim mi?', a: 'Evet. Tek tıkla anonim hesap açabilirsin; gerçek adın hiçbir yerde görünmez. Toplulukta herkes "Mavi Kelebek" gibi takma adlar taşır ve yazdığın ham deneyim metni asla başkalarıyla paylaşılmaz — yalnızca dönüştürülmüş eser, sen istersen paylaşılır.' },
    { q: 'Yapay zekâ deneyimimle ne yapıyor?', a: 'Deneyimin, Anlatı Terapisi (White & Epston, 1990) ilkeleriyle çalışan modelimiz tarafından işlenir: seni mağdur olarak değil, zorluğun üstesinden gelen kahraman olarak merkeze alan içerikler üretilir. İçerikler güvenlik filtrelerinden geçer.' },
    { q: 'KOZA terapi yerine geçer mi?', a: `Hayır. ${SAFETY_DISCLAIMER} Zor bir durumdaysan uygulamadaki Destek Hattı bölümünden gerçek yardım kaynaklarına tek dokunuşla ulaşabilirsin.` },
    { q: 'Ücretli mi?', a: 'Hayır, KOZA tamamen ücretsizdir: sınırsız dönüşüm, topluluk ve yolculuk herkese açık. Okullar ise KOZA Okul ile rehberlik servisine anonim analiz paneli ekleyebilir.' },
    { q: 'Öğretmenler neyi görebilir?', a: 'Rehber öğretmenler yalnızca kimliksizleştirilmiş, toplu istatistikleri görür: hangi tür zorbalık eğilimi artıyor, hangi haftalar yoğun gibi. Kimin ne yazdığı asla görünmez.' },
    { q: 'Verilerim saklanıyor mu?', a: 'Oluşturduğun eserler ve profil bilgilerin yalnızca senin hesabında saklanır. İnternet bağlantısı olmadan da uygulama çalışır; veriler cihazında güvende kalır. Hesabını silersen tüm veriler kalıcı olarak silinir.' },
    { q: 'Yaşım kaç olmalı?', a: 'KOZA, 10–14 yaş ortaokul öğrencileri için tasarlandı. 18 yaşından küçük kullanıcıların bir veli veya öğretmen gözetiminde kullanması önerilir, ancak uygulama tamamen anonim olduğundan kimlik doğrulama yapılmaz.' },
    { q: 'İçerikler denetleniyor mu?', a: 'Tüm üretilen içerikler güvenlik filtrelerinden geçer. Tehlikeli veya zarar verici ifade kalıpları algılandığında üretim durur ve kullanıcı gerçek destek kaynaklarına yönlendirilir. Toplulukta paylaşılan eserler de bildirim sistemiyle korunur.' },
    { q: 'ÖZ puanı ne işe yarıyor?', a: 'ÖZ, kozanın içindeki dönüşüm enerjisi. Her hikâye, oyun ve mektup ÖZ kazandırır; ÖZ biriktikçe kelebek görseliniz 7 aşamada değişir ve rozetler kazanırsın. Sıralama veya rekabet yok — sadece kendi ilerlemenin kutlaması.' },
];

const FaqItem = ({ q, a, open, onToggle }) => (
    <div className="card overflow-hidden">
        <button onClick={onToggle} className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left" aria-expanded={open}>
            <span className="text-[15px] font-bold text-neutral-900">{q}</span>
            <ChevronDown size={18} className={cn('shrink-0 text-neutral-400 transition-transform duration-300', open && 'rotate-180')} />
        </button>
        <div className={cn('grid transition-all duration-300 ease-out', open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0')}>
            <div className="overflow-hidden">
                <p className="px-6 pb-5 text-sm leading-relaxed text-neutral-500">{a}</p>
            </div>
        </div>
    </div>
);

/* ---------- Placeholder QR Code ---------- */
const PlaceholderQR = ({ size = 180 }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 180 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="APK indirme QR kodu (yakında)"
        role="img"
    >
        <rect x="1" y="1" width="178" height="178" rx="12" fill="white" stroke="#E8E5DF" strokeWidth="2"/>
        {/* Top-left finder */}
        <rect x="14" y="14" width="48" height="48" rx="4" fill="#6A52DC"/>
        <rect x="22" y="22" width="32" height="32" rx="2" fill="white"/>
        <rect x="28" y="28" width="20" height="20" rx="1" fill="#6A52DC"/>
        {/* Top-right finder */}
        <rect x="118" y="14" width="48" height="48" rx="4" fill="#6A52DC"/>
        <rect x="126" y="22" width="32" height="32" rx="2" fill="white"/>
        <rect x="132" y="28" width="20" height="20" rx="1" fill="#6A52DC"/>
        {/* Bottom-left finder */}
        <rect x="14" y="118" width="48" height="48" rx="4" fill="#6A52DC"/>
        <rect x="22" y="126" width="32" height="32" rx="2" fill="white"/>
        <rect x="28" y="132" width="20" height="20" rx="1" fill="#6A52DC"/>
        {/* Data modules */}
        <rect x="76" y="14" width="8" height="8" rx="1" fill="#6A52DC"/>
        <rect x="88" y="14" width="8" height="8" rx="1" fill="#6A52DC"/>
        <rect x="100" y="14" width="8" height="8" rx="1" fill="#6A52DC"/>
        <rect x="76" y="26" width="8" height="8" rx="1" fill="#6A52DC"/>
        <rect x="100" y="26" width="8" height="8" rx="1" fill="#6A52DC"/>
        <rect x="88" y="38" width="8" height="8" rx="1" fill="#6A52DC"/>
        <rect x="76" y="50" width="8" height="8" rx="1" fill="#6A52DC"/>
        <rect x="88" y="50" width="8" height="8" rx="1" fill="#6A52DC"/>
        <rect x="100" y="50" width="8" height="8" rx="1" fill="#6A52DC"/>
        <rect x="14" y="76" width="8" height="8" rx="1" fill="#6A52DC"/>
        <rect x="26" y="76" width="8" height="8" rx="1" fill="#6A52DC"/>
        <rect x="50" y="76" width="8" height="8" rx="1" fill="#6A52DC"/>
        <rect x="14" y="88" width="8" height="8" rx="1" fill="#6A52DC"/>
        <rect x="38" y="88" width="8" height="8" rx="1" fill="#6A52DC"/>
        <rect x="50" y="88" width="8" height="8" rx="1" fill="#6A52DC"/>
        <rect x="26" y="100" width="8" height="8" rx="1" fill="#6A52DC"/>
        <rect x="38" y="100" width="8" height="8" rx="1" fill="#6A52DC"/>
        <rect x="76" y="76" width="8" height="8" rx="1" fill="#6A52DC"/>
        <rect x="88" y="76" width="8" height="8" rx="1" fill="#6A52DC"/>
        <rect x="100" y="76" width="8" height="8" rx="1" fill="#6A52DC"/>
        <rect x="112" y="76" width="8" height="8" rx="1" fill="#6A52DC"/>
        <rect x="76" y="88" width="8" height="8" rx="1" fill="#6A52DC"/>
        <rect x="100" y="88" width="8" height="8" rx="1" fill="#6A52DC"/>
        <rect x="112" y="88" width="8" height="8" rx="1" fill="#6A52DC"/>
        <rect x="88" y="100" width="8" height="8" rx="1" fill="#6A52DC"/>
        <rect x="112" y="100" width="8" height="8" rx="1" fill="#6A52DC"/>
        <rect x="118" y="76" width="8" height="8" rx="1" fill="#6A52DC"/>
        <rect x="130" y="76" width="8" height="8" rx="1" fill="#6A52DC"/>
        <rect x="154" y="76" width="8" height="8" rx="1" fill="#6A52DC"/>
        <rect x="118" y="88" width="8" height="8" rx="1" fill="#6A52DC"/>
        <rect x="142" y="88" width="8" height="8" rx="1" fill="#6A52DC"/>
        <rect x="154" y="88" width="8" height="8" rx="1" fill="#6A52DC"/>
        <rect x="130" y="100" width="8" height="8" rx="1" fill="#6A52DC"/>
        <rect x="142" y="100" width="8" height="8" rx="1" fill="#6A52DC"/>
        <rect x="76" y="118" width="8" height="8" rx="1" fill="#6A52DC"/>
        <rect x="100" y="118" width="8" height="8" rx="1" fill="#6A52DC"/>
        <rect x="112" y="118" width="8" height="8" rx="1" fill="#6A52DC"/>
        <rect x="88" y="130" width="8" height="8" rx="1" fill="#6A52DC"/>
        <rect x="100" y="130" width="8" height="8" rx="1" fill="#6A52DC"/>
        <rect x="76" y="142" width="8" height="8" rx="1" fill="#6A52DC"/>
        <rect x="112" y="142" width="8" height="8" rx="1" fill="#6A52DC"/>
        <rect x="88" y="154" width="8" height="8" rx="1" fill="#6A52DC"/>
        <rect x="100" y="154" width="8" height="8" rx="1" fill="#6A52DC"/>
        <rect x="118" y="118" width="8" height="8" rx="1" fill="#6A52DC"/>
        <rect x="130" y="118" width="8" height="8" rx="1" fill="#6A52DC"/>
        <rect x="154" y="118" width="8" height="8" rx="1" fill="#6A52DC"/>
        <rect x="118" y="130" width="8" height="8" rx="1" fill="#6A52DC"/>
        <rect x="142" y="130" width="8" height="8" rx="1" fill="#6A52DC"/>
        <rect x="154" y="130" width="8" height="8" rx="1" fill="#6A52DC"/>
        <rect x="130" y="142" width="8" height="8" rx="1" fill="#6A52DC"/>
        <rect x="142" y="142" width="8" height="8" rx="1" fill="#6A52DC"/>
        <rect x="118" y="154" width="8" height="8" rx="1" fill="#6A52DC"/>
        <rect x="154" y="154" width="8" height="8" rx="1" fill="#6A52DC"/>
        {/* Butterfly center mark */}
        <text x="90" y="96" textAnchor="middle" dominantBaseline="middle" fontSize="20">🦋</text>
    </svg>
);

/* ---------- Download Section ---------- */
const DownloadSection = () => (
    <section id="indir" className="px-5 py-20 bg-white/50">
        <div className="mx-auto max-w-6xl">
            <div className="card overflow-hidden md:grid md:grid-cols-2">
                <div className="p-10 sm:p-12 flex flex-col justify-center gap-6">
                    <div>
                        <p className="mb-2 text-[11px] font-extrabold uppercase tracking-[0.25em] text-primary-500">Mobil Uygulama</p>
                        <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl mb-3">
                            KOZA'yı cebine al
                        </h2>
                        <p className="text-sm leading-relaxed text-neutral-500">
                            Uygulamayı doğrudan Android cihazına indirebilirsin. QR kodu tara veya butona dokun — tek adımda yükle.
                        </p>
                    </div>
                    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                        <a
                            href="#indir"
                            onClick={(e) => e.preventDefault()}
                            className="inline-flex items-center gap-2.5 rounded-full bg-gradient-to-b from-neutral-800 to-neutral-900 px-5 py-3 text-sm font-extrabold text-white shadow-card transition-all hover:scale-105 hover:shadow-lift active:scale-95"
                            aria-label="Android APK indir"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                <path d="M17.523 0.976 L 2.477 8.924 A 1 1 0 0 0 2 9.8 V 14.2 A 1 1 0 0 0 2.477 15.076 L 17.523 23.024 A 1 1 0 0 0 19 22.15 V 1.85 A 1 1 0 0 0 17.523 0.976Z" style={{display:'none'}}/>
                                <path d="M6 18c0 .55.45 1 1 1h1v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h2v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h1c.55 0 1-.45 1-1V8H6v10zM3.5 8C2.67 8 2 8.67 2 9.5v7c0 .83.67 1.5 1.5 1.5S5 17.33 5 16.5v-7C5 8.67 4.33 8 3.5 8zm17 0c-.83 0-1.5.67-1.5 1.5v7c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-7c0-.83-.67-1.5-1.5-1.5zm-4.97-5.84l1.3-1.3c.2-.2.2-.51 0-.71-.2-.2-.51-.2-.71 0l-1.48 1.48C13.85 1.23 12.95 1 12 1c-.96 0-1.86.23-2.66.63L7.85.15c-.2-.2-.51-.2-.71 0-.2.2-.2.51 0 .71l1.31 1.31C6.97 3.26 6 5.01 6 7h12c0-1.99-.97-3.75-2.47-4.84zM10 5H9V4h1v1zm5 0h-1V4h1v1z"/>
                            </svg>
                            Android APK İndir
                        </a>
                        <span className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-50 px-5 py-3 text-sm font-bold text-neutral-400">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                            </svg>
                            iOS — Yakında
                        </span>
                    </div>
                    <p className="text-[11px] font-bold text-neutral-400">
                        * Beta APK. Google Play ve App Store yakında.
                    </p>
                </div>
                <div className="flex flex-col items-center justify-center gap-4 border-t border-neutral-100 bg-gradient-to-br from-primary-50/60 to-neutral-50 p-10 sm:p-12 md:border-l md:border-t-0">
                    <div className="rounded-2xl border-2 border-primary-100 bg-white p-4 shadow-card">
                        <PlaceholderQR size={164} />
                    </div>
                    <p className="text-center text-[12px] font-bold text-neutral-400">
                        QR kodu tara → APK indir
                    </p>
                    <span className="rounded-full border border-accent-200 bg-accent-50 px-3 py-1 text-[11px] font-extrabold text-accent-700">
                        🔄 Gerçek QR yakında güncelleniyor
                    </span>
                </div>
            </div>
        </div>
    </section>
);

const LandingPage = () => {
    const [showAuth, setShowAuth] = useState(false);
    const [openFaq, setOpenFaq] = useState(0);
    const [mobileNavOpen, setMobileNavOpen] = useState(false);

    return (
        <div className="min-h-dvh bg-neutral-50">
            <div className="ambient-bg" aria-hidden />

            {/* ---------- Üst bar ---------- */}
            <header className="fixed inset-x-0 top-0 z-50 border-b border-neutral-200/60 surface-tint"
                    style={{ paddingTop: 'env(safe-area-inset-top)' }}>
                <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
                    <Logo size="md" />
                    <nav className="hidden items-center gap-6 text-sm font-bold text-neutral-500 md:flex" aria-label="Sayfa içi">
                        <a href="#bilim" className="transition-colors hover:text-neutral-900">Bilim</a>
                        <a href="#nasil" className="transition-colors hover:text-neutral-900">Nasıl çalışır?</a>
                        <a href="#ozellikler" className="transition-colors hover:text-neutral-900">Özellikler</a>
                        <a href="#tankliklar" className="transition-colors hover:text-neutral-900">Tanıklıklar</a>
                        <a href="#guven" className="transition-colors hover:text-neutral-900">Güvenlik</a>
                        <a href="#sss" className="transition-colors hover:text-neutral-900">SSS</a>
                        <a href="#indir" className="transition-colors hover:text-neutral-900">İndir</a>
                    </nav>
                    <div className="flex items-center gap-2">
                        <Button size="sm" onClick={() => setShowAuth(true)}>Başla</Button>
                        <button
                            onClick={() => setMobileNavOpen((v) => !v)}
                            aria-label={mobileNavOpen ? 'Menüyü kapat' : 'Menüyü aç'}
                            aria-expanded={mobileNavOpen}
                            className="touch-target rounded-xl text-neutral-600 transition-colors hover:bg-neutral-100 md:hidden"
                        >
                            {mobileNavOpen ? (
                                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><line x1="4" y1="4" x2="18" y2="18"/><line x1="18" y1="4" x2="4" y2="18"/></svg>
                            ) : (
                                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><line x1="3" y1="6" x2="19" y2="6"/><line x1="3" y1="11" x2="19" y2="11"/><line x1="3" y1="16" x2="19" y2="16"/></svg>
                            )}
                        </button>
                    </div>
                </div>
                {mobileNavOpen && (
                    <nav
                        className="border-t border-neutral-200/60 bg-white/95 backdrop-blur-md px-5 py-4 md:hidden animate-rise-in"
                        aria-label="Mobil gezinme"
                        onClick={() => setMobileNavOpen(false)}
                    >
                        {[
                            ['#bilim', 'Bilim'],
                            ['#nasil', 'Nasıl çalışır?'],
                            ['#ozellikler', 'Özellikler'],
                            ['#tankliklar', 'Tanıklıklar'],
                            ['#guven', 'Güvenlik'],
                            ['#sss', 'SSS'],
                            ['#indir', 'Uygulamayı İndir 📲'],
                        ].map(([href, label]) => (
                            <a key={href} href={href} className="block py-3 text-sm font-bold text-neutral-700 border-b border-neutral-100 last:border-0 hover:text-primary-700">
                                {label}
                            </a>
                        ))}
                    </nav>
                )}
            </header>

            <main>
                {/* ---------- Kahraman ---------- */}
                <section className="relative overflow-hidden px-5 pb-24 pt-28 sm:pt-36">
                    {/* Dramatic hero background */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-primary-50/70 via-neutral-50/40 to-neutral-50" aria-hidden />
                    <div className="pointer-events-none absolute -top-40 left-1/2 h-[800px] w-[800px] -translate-x-1/2 rounded-full" style={{ background: 'radial-gradient(circle, rgba(132,112,232,0.12) 0%, transparent 65%)' }} aria-hidden />
                    <div className="mx-auto grid max-w-6xl items-center gap-8 lg:grid-cols-2">
                        <div className="text-center lg:text-left">
                            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary-200/80 bg-gradient-to-r from-primary-50 to-primary-100/60 px-4 py-1.5 text-[12px] font-extrabold text-primary-700 shadow-[0_0_0_4px_rgba(132,112,232,0.06)] animate-rise-in">
                                <VenetianMask size={14} className="text-primary-500" />
                                Anonim · Empati temelli · Ücretsiz
                                <span className="h-3 w-px bg-primary-300" aria-hidden />
                                <span className="rounded-full bg-primary-600 px-2 py-0.5 text-[10px] text-white">TEKNOFEST 2026</span>
                            </div>
                            <h1 className="mb-6 text-[1.85rem] font-extrabold leading-[1.08] tracking-tight text-neutral-900 sm:text-[2.6rem] md:text-5xl lg:text-[62px] animate-rise-in" style={{ animationDelay: '0.08s' }}>
                                Zorbalık hikâyenin sonu değil.{' '}
                                <span className="text-gradient">Sadece bir koza evresi.</span>
                            </h1>
                            <p className="mx-auto mb-9 max-w-xl text-base leading-relaxed text-neutral-500 sm:text-lg lg:mx-0 animate-rise-in" style={{ animationDelay: '0.16s' }}>
                                Yaşadığın zorluğu anlat; yapay zekâ onu seni güçlendiren kişisel bir hikâyeye,
                                oyuna veya gelecekten bir mektuba dönüştürsün. Kimliğin sana ait, gücün de.
                            </p>
                            <div className="flex flex-col items-center gap-3 sm:flex-row lg:justify-start sm:justify-center animate-rise-in" style={{ animationDelay: '0.24s' }}>
                                <Button size="lg" iconRight={ArrowRight} onClick={() => setShowAuth(true)}>
                                    Anonim Olarak Başla
                                </Button>
                                <Button size="lg" variant="secondary" onClick={() => document.getElementById('nasil')?.scrollIntoView({ behavior: 'smooth' })}>
                                    Nasıl çalışır?
                                </Button>
                            </div>
                            <div className="mt-5 animate-rise-in" style={{ animationDelay: '0.3s' }}>
                                <p className="text-[12px] font-bold text-neutral-400">
                                    Kayıt yok, e-posta yok — tek dokunuşla güvenli alandasın.
                                </p>
                                <p className="mt-1 text-[11px] font-extrabold uppercase tracking-widest text-neutral-300">
                                    📚 Anlatı Terapisi × Yapay Zekâ · Hemhal Takımı
                                </p>
                            </div>
                            {/* Canlı dönüşüm önizlemesi */}
                            <div className="mt-6 animate-rise-in" style={{ animationDelay: '0.38s' }}>
                                <TransformPreview />
                            </div>
                        </div>
                        <div className="animate-scale-in" style={{ animationDelay: '0.2s' }}>
                            <HeroVisual />
                        </div>
                    </div>
                </section>

                {/* ---------- Güven şeridi ---------- */}
                <section className="border-y border-neutral-200/70 bg-white/70 py-5 backdrop-blur-sm">
                    <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-5 text-[13px] font-extrabold text-neutral-500">
                        <span className="flex items-center gap-2 rounded-full px-3 py-1.5 transition-colors hover:bg-primary-50 hover:text-primary-700"><Lock size={14} className="text-primary-500" /> Anonim kimlik</span>
                        <span className="hidden sm:inline-block h-3.5 w-px bg-neutral-200" aria-hidden />
                        <span className="flex items-center gap-2 rounded-full px-3 py-1.5 transition-colors hover:bg-accent-50 hover:text-accent-700"><Sparkles size={14} className="text-accent-500" /> Anlatı Terapisi × Yapay Zekâ</span>
                        <span className="hidden sm:inline-block h-3.5 w-px bg-neutral-200" aria-hidden />
                        <span className="flex items-center gap-2 rounded-full px-3 py-1.5 transition-colors hover:bg-success-50 hover:text-success-700"><ShieldCheck size={14} className="text-success-500" /> Güvenli içerik filtreleri</span>
                        <span className="hidden sm:inline-block h-3.5 w-px bg-neutral-200" aria-hidden />
                        <span className="flex items-center gap-2 rounded-full px-3 py-1.5 transition-colors hover:bg-danger-50 hover:text-danger-600"><HeartHandshake size={14} className="text-danger-500" /> 7/24 destek kaynakları</span>
                    </div>
                </section>

                {/* ---------- Problem Büyüklüğü ---------- */}
                <section className="relative overflow-hidden bg-neutral-900 px-5 py-20">
                    <div className="dot-pattern absolute inset-0" aria-hidden />
                    <div className="relative mx-auto max-w-6xl">
                        <div className="mb-12 text-center">
                            <p className="mb-2 text-[11px] font-extrabold uppercase tracking-[0.25em] text-primary-400">Neden şimdi?</p>
                            <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">Türkiye'de akran zorbalığı gerçeği</h2>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 stagger-children">
                            {PROBLEM_STATS.map((s) => (
                                <div key={s.value} className="rounded-2xl border border-neutral-700/80 bg-neutral-800/50 p-7 text-center backdrop-blur-sm transition-all hover:border-primary-700/50 hover:bg-neutral-800/70">
                                    <p className="mb-1 text-4xl font-extrabold tracking-tight text-primary-400">{s.value}</p>
                                    <p className="mb-2 font-extrabold text-white text-[15px]">{s.label}</p>
                                    <p className="text-[13px] leading-relaxed text-neutral-400">{s.sub}</p>
                                    <p className="mt-4 border-t border-neutral-700/60 pt-3 text-[10px] font-extrabold uppercase tracking-widest text-neutral-600">{s.source}</p>
                                </div>
                            ))}
                        </div>
                        <p className="mt-8 text-center text-[13px] font-bold text-neutral-500">
                            Bu öğrencilerin büyük çoğunluğu yardım istemeden sessizce taşıyor.
                            KOZA, bu sessizliği güvenli bir terapötik dönüşüm alanına çeviriyor.
                        </p>
                    </div>
                </section>

                {/* ---------- Bilimsel Temel ---------- */}
                <section id="bilim" className="bg-white/60 px-5 py-20">
                    <div className="mx-auto max-w-6xl">
                        <div className="mb-12 text-center animate-rise-in">
                            <p className="mb-2 text-[11px] font-extrabold uppercase tracking-[0.25em] text-primary-500">Kanıta dayalı yaklaşım</p>
                            <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">Arkasındaki bilim</h2>
                        </div>
                        <div className="grid gap-5 md:grid-cols-3 stagger-children">
                            <div className="card card-hover p-7">
                                <h3 className="mb-2 font-extrabold text-neutral-900">Anlatı Terapisi</h3>
                                <p className="text-sm leading-relaxed text-neutral-500">White & Epston (1990) tarafından geliştirilen kanıta dayalı psikoterapi yaklaşımı. Zorbalık deneyimini "ben budur" olmaktan çıkarır; kahramanı mağdur değil, dönüşen özne olarak konumlar.</p>
                                <p className="mt-4 border-t border-neutral-100 pt-3 text-[11px] font-extrabold tracking-wider text-neutral-300">White & Epston, 1990</p>
                            </div>
                            <div className="card card-hover p-7">
                                <h3 className="mb-2 font-extrabold text-neutral-900">3 Aşamalı AI Hattı</h3>
                                <p className="text-sm leading-relaxed text-neutral-500">Mimari analiz → üretim → editoryal kontrol. Her eser üç bağımsız AI çağrısından geçer. Kriz tespiti üretimden önce çalışır; terapötik doğruluk algoritmik olarak güvence altında.</p>
                                <p className="mt-4 border-t border-neutral-100 pt-3 text-[11px] font-extrabold tracking-wider text-neutral-300">RAG + LLM pipeline sistemi</p>
                            </div>
                            <div className="card card-hover p-7">
                                <h3 className="mb-2 font-extrabold text-neutral-900">Metamorfoz Oyunlaştırma</h3>
                                <p className="text-sm leading-relaxed text-neutral-500">Self-determination theory (Deci & Ryan, 1985) temelinde 7 aşamalı ilerleme sistemi. Koza→kelebek metaforu, Anlatı Terapisi'nin "yeniden yazma" ilkesiyle birebir örtüşür.</p>
                                <p className="mt-4 border-t border-neutral-100 pt-3 text-[11px] font-extrabold tracking-wider text-neutral-300">Deci & Ryan, 1985</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ---------- Nasıl çalışır ---------- */}
                <section id="nasil" className="px-5 py-24">
                    <div className="mx-auto max-w-6xl">
                        <div className="mb-14 text-center">
                            <h2 className="mb-3 text-3xl font-extrabold tracking-tight sm:text-4xl">Üç adımda metamorfoz</h2>
                            <p className="mx-auto max-w-xl text-neutral-500">Karmaşık değil. Seni yormadan, seni anlayarak.</p>
                        </div>
                        <div className="grid gap-5 md:grid-cols-3 stagger-children">
                            {STEPS.map((s) => (
                                <div key={s.n} className="card card-hover relative overflow-hidden p-8">
                                    <span className="absolute -right-2 -top-4 select-none text-[88px] font-extrabold leading-none text-gradient opacity-20" aria-hidden>{s.n}</span>
                                    <div className="relative">
                                        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-b from-primary-400 to-primary-600 text-white shadow-[0_4px_12px_-4px_rgba(106,82,220,0.5),inset_0_1px_0_rgba(255,255,255,0.2)]">
                                            <s.icon size={22} strokeWidth={2.2} />
                                        </div>
                                        <h3 className="mb-2 text-lg font-extrabold">{s.title}</h3>
                                        <p className="text-sm leading-relaxed text-neutral-500">{s.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ---------- Özellikler ---------- */}
                <section id="ozellikler" className="px-5 py-24">
                    <div className="mx-auto max-w-6xl">
                        <div className="mb-14 text-center">
                            <h2 className="mb-3 text-3xl font-extrabold tracking-tight sm:text-4xl">Kanatlarını açman için her şey</h2>
                            <p className="mx-auto max-w-xl text-neutral-500">Bir uygulamadan fazlası: kendi hikâyene sahip çıkma alanın.</p>
                        </div>
                        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 stagger-children">
                            {FEATURES.map((f) => (
                                <div key={f.title} className="card card-hover p-7">
                                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-b from-accent-50 to-amber-100 text-accent-600 shadow-[0_2px_8px_-2px_rgba(226,154,40,0.25),inset_0_1px_0_rgba(255,255,255,0.9)]">
                                        <f.icon size={20} strokeWidth={2.2} />
                                    </div>
                                    <h3 className="mb-1.5 font-extrabold">{f.title}</h3>
                                    <p className="text-sm leading-relaxed text-neutral-500">{f.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ---------- Tanıklıklar ---------- */}
                <section id="tankliklar" className="px-5 py-20 bg-white/50">
                    <div className="mx-auto max-w-6xl">
                        <div className="mb-12 text-center">
                            <p className="mb-2 text-[11px] font-extrabold uppercase tracking-[0.25em] text-primary-500">Gerçek sesler</p>
                            <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">KOZA'nın değeri, kullananlar için</h2>
                        </div>
                        <div className="grid gap-5 md:grid-cols-3 stagger-children">
                            {TESTIMONIALS.map((t) => (
                                <div key={t.name} className="card flex flex-col p-7">
                                    <p className="mb-6 flex-1 font-serif text-[15px] italic leading-relaxed text-neutral-600">"{t.quote}"</p>
                                    <div className="border-t border-neutral-100 pt-4">
                                        <p className="font-extrabold text-neutral-900">{t.name}</p>
                                        <p className="text-[12px] font-bold text-neutral-400">{t.role}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ---------- Fark Nedir ---------- */}
                <section className="px-5 py-14">
                    <div className="mx-auto max-w-4xl">
                        <p className="mb-6 text-center text-[11px] font-extrabold uppercase tracking-[0.25em] text-neutral-400">Geleneksel yaklaşımlardan farkı</p>
                        <div className="card overflow-hidden">
                            <div className="overflow-x-auto scrollbar-thin" role="region" aria-label="Karşılaştırma tablosu" tabIndex={0}>
                            <p className="px-6 pt-3 text-[11px] font-bold text-neutral-400 sm:hidden">← Tabloyu kaydır →</p>
                            <div className="min-w-[520px]">
                                <div className="grid grid-cols-[90px_1fr_1fr] border-b border-neutral-100 bg-neutral-50/60 px-6 py-3 text-[11px] font-extrabold uppercase tracking-widest text-neutral-400">
                                    <span>Konu</span>
                                    <span className="text-neutral-300">Geleneksel</span>
                                    <span className="text-primary-600">KOZA</span>
                                </div>
                                {[
                                    ['Kimlik', 'Kayıt + isim zorunlu', 'Tek dokunuşla tam anonim'],
                                    ['Yöntem', 'Pasif şikayet formu', 'Aktif terapötik dönüşüm'],
                                    ['Motivasyon', 'Zorunlu kullanım', '7 aşamalı oyunlaştırma'],
                                    ['Rehber', 'Bireysel görüşmeye bağlı', 'Anonim eğilim analizi + öneri'],
                                    ['AI Kalite', 'Standart yanıt şablonu', '3 aşamalı pipeline'],
                                ].map(([topic, before, after]) => (
                                    <div key={topic} className="grid grid-cols-[90px_1fr_1fr] items-center gap-4 border-b border-neutral-100 px-6 py-4 last:border-0">
                                        <span className="text-[11px] font-extrabold uppercase tracking-wider text-neutral-400">{topic}</span>
                                        <span className="flex items-start gap-2 text-sm text-neutral-400">
                                            <span className="mt-px shrink-0 font-extrabold text-neutral-300" aria-hidden>✗</span> {before}
                                        </span>
                                        <span className="flex items-start gap-2 text-sm font-bold text-primary-700">
                                            <span className="mt-px shrink-0 font-extrabold text-success-500" aria-hidden>✓</span> {after}
                                        </span>
                                    </div>
                                ))}
                            </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ---------- Güvenlik ---------- */}
                <section id="guven" className="px-5 py-20">
                    <div className="mx-auto max-w-6xl">
                        <div className="card overflow-hidden md:grid md:grid-cols-2">
                            <div className="bg-gradient-to-br from-success-50 to-primary-50 p-10 sm:p-12">
                                <ShieldCheck size={36} className="mb-5 text-success-600" />
                                <h2 className="mb-3 text-2xl font-extrabold sm:text-3xl">Güven, tasarımın parçası</h2>
                                <p className="text-sm leading-relaxed text-neutral-600">
                                    KOZA çocuklar için tasarlandı; bu yüzden gizlilik bir ayar değil, varsayılandır.
                                </p>
                            </div>
                            <ul className="space-y-5 p-10 sm:p-12">
                                {[
                                    ['Anonim varsayılan', 'Gerçek isim, fotoğraf veya okul bilgisi istenmez. Herkes bir kelebek adı taşır.'],
                                    ['Ham deneyim asla paylaşılmaz', 'Yazdığın metin yalnızca dönüşüm için kullanılır; toplulukta sadece eser görünür.'],
                                    ['Kriz anında gerçek destek', 'Riskli bir ifade algılanırsa üretim durur ve seni gerçek yardım kaynaklarına yönlendiririz.'],
                                    ['Yetişkin gözetimi', 'Tüm içerik akışları, öğretmen denetiminden geçmiş güvenlik filtreleriyle korunur.'],
                                ].map(([t, d]) => (
                                    <li key={t} className="flex gap-3.5">
                                        <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-success-100 text-success-600">
                                            <ShieldCheck size={12} strokeWidth={3} />
                                        </span>
                                        <span>
                                            <strong className="block text-sm font-extrabold text-neutral-900">{t}</strong>
                                            <span className="text-[13px] leading-relaxed text-neutral-500">{d}</span>
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>

                {/* ---------- Örnek Eserler ---------- */}
                <section className="px-5 py-24 bg-white/40">
                    <div className="mx-auto max-w-6xl">
                        <div className="mb-14 text-center">
                            <h2 className="mb-3 text-3xl font-extrabold tracking-tight sm:text-4xl">Gerçek dönüşümler</h2>
                            <p className="mx-auto max-w-xl text-neutral-500">Topluluktan birkaç eser — hepsi anonim, hepsi gerçek.</p>
                        </div>
                        <div className="grid gap-5 md:grid-cols-3 stagger-children">
                            {SEED_COMMUNITY.slice(0, 3).map((item) => {
                                const TYPE_ICONS = { story: BookOpen, game: Gamepad2, letter: Mail };
                                const Icon = TYPE_ICONS[item.type] || BookOpen;
                                return (
                                    <div key={item.id} className="card p-6 flex flex-col gap-4">
                                        <div className="flex items-center gap-2.5">
                                            <Avatar emoji={item.authorEmoji} color={item.authorColor} size={30} />
                                            <span className="text-[12px] font-extrabold text-neutral-500">{item.authorPseudonym}</span>
                                            <Badge tone="outline" className="ml-auto">{CATEGORIES[item.category]?.label || 'Diğer'}</Badge>
                                        </div>
                                        <div>
                                            <div className="mb-1.5 flex items-center gap-2">
                                                <Icon size={14} className="shrink-0 text-neutral-400" strokeWidth={2.2} />
                                                <p className="font-extrabold text-neutral-900">{item.title}</p>
                                            </div>
                                            <p className="text-[13px] leading-relaxed text-neutral-500">{truncate(item.preview, 120)}</p>
                                        </div>
                                        <div className="mt-auto flex items-center gap-4 text-[12px] font-bold text-neutral-400 border-t border-neutral-100 pt-3">
                                            <span className="flex items-center gap-1"><Heart size={13} /> {item.hearts}</span>
                                            <span className="flex items-center gap-1"><Handshake size={13} /> {item.hugs}</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <p className="mt-8 text-center text-[13px] text-neutral-400">
                            Toplulukta daha fazlası seni bekliyor —{' '}
                            <button onClick={() => setShowAuth(true)} className="font-bold text-primary-600 underline underline-offset-2 hover:text-primary-700">
                                anonim giriş yap
                            </button>{' '}
                            ve keşfet.
                        </p>
                    </div>
                </section>

                {/* ---------- SSS ---------- */}
                <section id="sss" className="px-5 py-24">
                    <div className="mx-auto max-w-2xl">
                        <h2 className="mb-10 text-center text-3xl font-extrabold tracking-tight sm:text-4xl">Merak edilenler</h2>
                        <div className="space-y-3">
                            {FAQS.map((f, i) => (
                                <FaqItem key={f.q} {...f} open={openFaq === i} onToggle={() => setOpenFaq(openFaq === i ? -1 : i)} />
                            ))}
                        </div>
                    </div>
                </section>

                {/* ---------- Platform Metrikleri ---------- */}
                <section className="px-5 py-16">
                    <div className="mx-auto max-w-4xl">
                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 stagger-children">
                            {[
                                { value: '3', label: 'İçerik türü', sub: 'hikâye · oyun · mektup' },
                                { value: '7', label: 'Dönüşüm evresi', sub: 'koza → kelebek' },
                                { value: '3', label: 'AI kalite katmanı', sub: 'analiz · üretim · editoryal' },
                                { value: '0', label: 'Kişisel veri', sub: 'tamamen anonim' },
                            ].map((m) => (
                                <div key={m.label} className="card p-6 text-center">
                                    <p className="mb-0.5 text-4xl font-extrabold tracking-tight text-primary-600">{m.value}</p>
                                    <p className="font-extrabold text-neutral-900">{m.label}</p>
                                    <p className="mt-0.5 text-[11px] font-bold text-neutral-400">{m.sub}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ---------- Son çağrı ---------- */}
                <section className="px-5 pb-28 pt-6">
                    <div className="mx-auto max-w-4xl">
                        <div className="grain relative overflow-hidden rounded-[1.5rem] border border-primary-500/30 bg-gradient-to-br from-primary-500 via-primary-700 to-primary-900 px-8 py-16 text-center text-white shadow-[0_24px_64px_-16px_rgba(106,82,220,0.55)]">
                            <div className="dot-pattern absolute inset-0 opacity-60" aria-hidden />
                            <div className="relative">
                                <p className="mb-3 text-[11px] font-extrabold uppercase tracking-[0.3em] text-primary-300">İnsanlık Yararına Teknoloji · TEKNOFEST 2026</p>
                                <h2 className="mb-4 text-3xl font-extrabold tracking-tight sm:text-4xl">Kozanın içinde bir kelebek var.</h2>
                                <p className="mx-auto mb-2 max-w-md text-primary-100">Onu görmek için tek bir adım yeter — ve bu adım tamamen anonim.</p>
                                <p className="mx-auto mb-9 max-w-lg text-[13px] text-primary-300">
                                    Her 3 öğrenciden birini etkileyen sessiz krize karşı: anlatı terapisi, yapay zekâ ve empatinin buluştuğu alan.
                                </p>
                                <Button size="lg" variant="accent" iconRight={ArrowRight} onClick={() => setShowAuth(true)}>
                                    Yolculuğa Başla
                                </Button>
                                <div className="mt-10 flex flex-wrap items-center justify-center gap-6 border-t border-primary-500/40 pt-8 text-[12px] font-extrabold text-primary-300">
                                    <span>White & Epston, 1990</span>
                                    <span className="h-3 w-px bg-primary-500/40" aria-hidden />
                                    <span>3 Aşamalı AI Hattı</span>
                                    <span className="h-3 w-px bg-primary-500/40" aria-hidden />
                                    <span>Tam Anonim</span>
                                    <span className="h-3 w-px bg-primary-500/40" aria-hidden />
                                    <span>7 Dönüşüm Evresi</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ---------- Uygulama İndir ---------- */}
                <DownloadSection />

            </main>

            {/* ---------- Alt bilgi ---------- */}
            <footer className="border-t border-neutral-200/70 bg-white/50 px-5 py-14">
                <div className="mx-auto flex max-w-6xl flex-col items-center gap-5 text-center">
                    <Logo size="sm" />
                    <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[12px] font-bold text-neutral-400">
                        <span>White & Epston, Anlatı Terapisi (1990)</span>
                        <span>·</span>
                        <span>Deci & Ryan, SDT (1985)</span>
                        <span>·</span>
                        <span>UNICEF Çocuk Hakları Sözleşmesi</span>
                    </div>
                    <p className="max-w-md text-[12px] leading-relaxed text-neutral-400">
                        {SAFETY_DISCLAIMER} Acil durumlarda <strong className="text-neutral-600">182</strong>'yi (İntihar Önleme Hattı) veya <strong className="text-neutral-600">ALO 183</strong>'ü (Aile ve Sosyal Hizmetler) arayın.
                    </p>
                    <p className="text-[11px] font-extrabold tracking-widest text-neutral-300">
                        TEKNOFEST 2026 · İNSANLIK YARARINA TEKNOLOJİ · HEMHAL TAKIMI
                    </p>
                    <p className="text-[10px] font-bold text-neutral-200">
                        kozateknofest@gmail.com
                    </p>
                </div>
            </footer>

            <AuthModal open={showAuth} onClose={() => setShowAuth(false)} />
        </div>
    );
};

export default LandingPage;
