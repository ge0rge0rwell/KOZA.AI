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

/* ---------- Kahraman görseli: koza→kelebek döngüsü ---------- */
const HeroVisual = () => {
    const [stage, setStage] = useState(1);
    useEffect(() => {
        const t = setInterval(() => setStage((s) => (s >= 7 ? 1 : s + 1)), 2200);
        return () => clearInterval(t);
    }, []);
    return (
        <div className="relative mx-auto flex h-[280px] w-[280px] items-center justify-center sm:h-[340px] sm:w-[340px]">
            <CocoonVisual stage={stage} size={300} className="transition-all duration-700" />
            <div className="absolute -bottom-1 left-1/2 flex -translate-x-1/2 gap-1.5">
                {Array.from({ length: 7 }).map((_, i) => (
                    <span
                        key={i}
                        className={cn(
                            'h-1.5 rounded-full transition-all duration-500',
                            i + 1 === stage ? 'w-6 bg-primary-500' : 'w-1.5 bg-neutral-200'
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

const LandingPage = () => {
    const [showAuth, setShowAuth] = useState(false);
    const [openFaq, setOpenFaq] = useState(0);

    return (
        <div className="min-h-dvh bg-neutral-50">
            <div className="ambient-bg" aria-hidden />

            {/* ---------- Üst bar ---------- */}
            <header className="fixed inset-x-0 top-0 z-50 border-b border-neutral-200/60 surface-tint">
                <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
                    <Logo size="md" />
                    <nav className="hidden items-center gap-7 text-sm font-bold text-neutral-500 md:flex" aria-label="Sayfa içi">
                        <a href="#nasil" className="transition-colors hover:text-neutral-900">Nasıl çalışır?</a>
                        <a href="#ozellikler" className="transition-colors hover:text-neutral-900">Özellikler</a>
                        <a href="#guven" className="transition-colors hover:text-neutral-900">Güvenlik</a>
                        <a href="#sss" className="transition-colors hover:text-neutral-900">SSS</a>
                    </nav>
                    <Button size="sm" onClick={() => setShowAuth(true)}>Başla</Button>
                </div>
            </header>

            <main>
                {/* ---------- Kahraman ---------- */}
                <section className="relative px-5 pb-20 pt-32 sm:pt-40">
                    <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
                        <div className="text-center lg:text-left">
                            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary-200 bg-primary-50 px-4 py-1.5 text-[12px] font-extrabold text-primary-700 animate-rise-in">
                                <VenetianMask size={14} />
                                Anonim · Empati temelli · Ücretsiz
                            </div>
                            <h1 className="mb-6 text-4xl font-extrabold leading-[1.08] tracking-tight text-neutral-900 sm:text-5xl lg:text-[56px] animate-rise-in" style={{ animationDelay: '0.08s' }}>
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
                            <p className="mt-5 text-[12px] font-bold text-neutral-400 animate-rise-in" style={{ animationDelay: '0.3s' }}>
                                Kayıt yok, e-posta yok — tek dokunuşla güvenli alandasın.
                            </p>
                        </div>
                        <div className="animate-scale-in" style={{ animationDelay: '0.2s' }}>
                            <HeroVisual />
                        </div>
                    </div>
                </section>

                {/* ---------- Güven şeridi ---------- */}
                <section className="border-y border-neutral-200/70 bg-white/60 py-6 backdrop-blur-sm">
                    <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-12 gap-y-3 px-5 text-[13px] font-extrabold text-neutral-500">
                        <span className="flex items-center gap-2"><Lock size={15} className="text-primary-500" /> Anonim kimlik</span>
                        <span className="flex items-center gap-2"><Sparkles size={15} className="text-accent-500" /> Anlatı Terapisi × Yapay Zekâ</span>
                        <span className="flex items-center gap-2"><ShieldCheck size={15} className="text-success-500" /> Güvenli içerik filtreleri</span>
                        <span className="flex items-center gap-2"><HeartHandshake size={15} className="text-danger-500" /> 7/24 destek kaynakları</span>
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
                                    <span className="absolute -right-2 -top-4 text-[88px] font-extrabold leading-none text-neutral-100 select-none" aria-hidden>{s.n}</span>
                                    <div className="relative">
                                        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-50 text-primary-600">
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

                {/* ---------- Köken hikâyesi ---------- */}
                <section className="px-5 py-20">
                    <div className="mx-auto max-w-3xl">
                        <div className="card grain relative overflow-hidden bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 p-10 text-center sm:p-14">
                            <ButterflyMark size={40} className="mx-auto mb-7 opacity-90" />
                            <p className="font-serif text-lg italic leading-relaxed text-primary-100 sm:text-xl">
                                "Bir öğrenci, her yemekten sonra tabağını eliyle silip tertemiz yapıyordu.
                                Arkadaşları bu 'tuhaf' davranışla alay etti, onu dışladı. Oysa gerçek, kabuğun çok altındaydı:
                                Görme engelli annesi, oğlunun yemeğini bitirip bitirmediğini tabağına dokunarak anlıyordu.
                                O 'tuhaf' hareket, bir çocuğun annesine duyduğu sevgiydi."
                            </p>
                            <div className="mx-auto my-7 h-px w-16 bg-primary-400/40" />
                            <p className="text-sm font-bold leading-relaxed text-primary-200">
                                KOZA bu gerçek hikâyeden doğdu. Çünkü hepimiz dışarıdan kapalı birer kozayız —
                                ve hiçbir koza, içindeki kelebeği anlamayan ellerde kırılmamalı.
                            </p>
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
                                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-accent-50 text-accent-600">
                                        <f.icon size={20} strokeWidth={2.2} />
                                    </div>
                                    <h3 className="mb-1.5 font-extrabold">{f.title}</h3>
                                    <p className="text-sm leading-relaxed text-neutral-500">{f.text}</p>
                                </div>
                            ))}
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

                {/* ---------- Son çağrı ---------- */}
                <section className="px-5 pb-28 pt-6">
                    <div className="mx-auto max-w-4xl">
                        <div className="card grain relative overflow-hidden bg-gradient-to-br from-primary-600 to-primary-800 px-8 py-16 text-center text-white">
                            <h2 className="mb-4 text-3xl font-extrabold tracking-tight sm:text-4xl">Kozanın içinde bir kelebek var.</h2>
                            <p className="mx-auto mb-9 max-w-md text-primary-100">Onu görmek için tek bir adım yeter — ve bu adım tamamen anonim.</p>
                            <Button size="lg" variant="accent" iconRight={ArrowRight} onClick={() => setShowAuth(true)}>
                                Yolculuğa Başla
                            </Button>
                        </div>
                    </div>
                </section>
            </main>

            {/* ---------- Alt bilgi ---------- */}
            <footer className="border-t border-neutral-200/70 bg-white/50 px-5 py-12">
                <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 text-center">
                    <Logo size="sm" />
                    <p className="max-w-md text-[12px] leading-relaxed text-neutral-400">
                        {SAFETY_DISCLAIMER} Acil durumlarda <strong className="text-neutral-600">112</strong>'yi arayın,
                        sosyal destek için <strong className="text-neutral-600">ALO 183</strong>'ü kullanın.
                    </p>
                    <p className="text-[11px] font-bold tracking-widest text-neutral-300">
                        TEKNOFEST 2026 · İNSANLIK YARARINA TEKNOLOJİ · HEMHAL TAKIMI
                    </p>
                </div>
            </footer>

            <AuthModal open={showAuth} onClose={() => setShowAuth(false)} />
        </div>
    );
};

export default LandingPage;
