/**
 * KOZA — product configuration.
 * Single source of truth for plans, ÖZ economy, stages, categories and safety resources.
 */

export const APP = {
    name: 'KOZA',
    tagline: 'Hikâyeni yeniden yaz.',
    version: '3.0.0',
};

/* ---------------- İçerik kategorileri (anonim analiz için) ---------------- */
export const CATEGORIES = {
    dislanma: { label: 'Dışlanma', color: '#6A52DC' },
    alay: { label: 'Alay etme', color: '#8470E8' },
    siber: { label: 'Siber zorbalık', color: '#3C8DC5' },
    fiziksel: { label: 'Fiziksel zorbalık', color: '#E11D48' },
    soylenti: { label: 'Söylenti yayma', color: '#E29A28' },
    tehdit: { label: 'Tehdit / Korkutma', color: '#A75A19' },
    diger: { label: 'Diğer', color: '#7E786C' },
};

export const CATEGORY_KEYS = Object.keys(CATEGORIES);

/* ---------------- İçerik türleri ---------------- */
export const CONTENT_TYPES = {
    story: { label: 'Hikâye', emoji: '📖', verb: 'Hikâyeye Dönüştür', oz: 120 },
    game: { label: 'Oyun', emoji: '🎮', verb: 'Oyuna Dönüştür', oz: 100 },
    letter: { label: 'Mektup', emoji: '💌', verb: 'Mektuba Dönüştür', oz: 80 },
};

/* ---------------- ÖZ ekonomisi ---------------- */
export const OZ_REWARDS = {
    create_story: 120,
    create_game: 100,
    create_letter: 80,
    share_community: 40,
    read_community: 15,
    play_community: 15,
    heart_given: 5,
    hug_given: 10,
    reflection_answered: 25,
    breathing_done: 10,
    onboarding_done: 50,
    daily_visit: 10,
};

/* ---------------- Metamorfoz aşamaları ---------------- */
export const STAGES = [
    { n: 1, min: 0, name: 'Kapalı Koza', color: '#A8A296', blurb: 'Dışarıdan her şey sessiz görünebilir ama içeride bir dönüşüm başlıyor.' },
    { n: 2, min: 200, name: 'İlk Kıpırtı', color: '#BFB6F6', blurb: 'İçeride bir şeyler kıpırdanıyor. Gücünü keşfetmeye başladın.' },
    { n: 3, min: 500, name: 'Kabuğun Çatlaması', color: '#8470E8', blurb: 'Cesaretin kabuğu çatlatıyor. Işık içeri sızıyor.' },
    { n: 4, min: 1000, name: 'Ortaya Çıkış', color: '#6A52DC', blurb: 'Yeni bir sen beliriyor. Geri dönüş yok.' },
    { n: 5, min: 2000, name: 'Kanatların Açılışı', color: '#E9AE41', blurb: 'Renklerin görünmeye başladı. Kanatların kuruyup güçleniyor.' },
    { n: 6, min: 4000, name: 'İlk Uçuş', color: '#E29A28', blurb: 'Kanatların seni taşıyor. Yükseklere alışıyorsun.' },
    { n: 7, min: 8000, name: 'Görkemli Kelebek', color: '#C97A1C', blurb: 'Dönüşümünü tamamladın. Artık başkalarına ilham veriyorsun.' },
];

/* ---------------- Planlar ---------------- */
export const PLANS = {
    free: {
        id: 'free',
        name: 'KOZA',
        price: 0,
        priceLabel: 'Ücretsiz',
        dailyCreations: Infinity,
        features: [
            'Sınırsız dönüşüm (hikâye, oyun veya mektup)',
            'Topluluk galerisine tam erişim',
            'Metamorfoz yolculuğu ve rozetler',
            'Sesli okuma',
        ],
    },
    school: {
        id: 'school',
        name: 'KOZA Okul',
        price: 0,
        priceLabel: 'Ücretsiz',
        dailyCreations: Infinity,
        features: [
            'Tüm öğrencilere sınırsız KOZA',
            'Rehberlik servisi için anonim analiz paneli',
            'Okul geneli eğilim ve risk haritası',
            'Veri odaklı önleyici strateji raporları',
            'KVKK uyumlu, kimliksizleştirilmiş veri',
        ],
    },
};

/* Rehber paneli erişim kodu (okul yönetimi tarafından sağlanır) */
export const COUNSELOR_ACCESS_CODE = 'KOZA-OKUL-2026';
export const COUNSELOR_EMAILS = ['oguzhanacar.bt@gmail.com', 'kozateknofest@gmail.com'];

/* KOZA Okul'u talep etmek için zorunlu resmî okul e-posta uzantısı (MEB k12 alan adı). */
export const SCHOOL_EMAIL_SUFFIX = '.k12.tr';

/* ---------------- Güvenlik kaynakları ---------------- */
export const CRISIS_RESOURCES = [
    {
        name: 'Acil Çağrı Merkezi',
        contact: '112',
        href: 'tel:112',
        desc: 'Sen veya bir başkası acil tehlikedeyse hemen ara.',
    },
    {
        name: 'ALO 183 Sosyal Destek Hattı',
        contact: '183',
        href: 'tel:183',
        desc: 'Aile ve Sosyal Hizmetler Bakanlığı — 7/24 ücretsiz destek.',
    },
    {
        name: 'Okul Rehberlik Servisi',
        contact: 'Rehber öğretmenin',
        href: null,
        desc: 'Destek istemek güçlülüktür, ispiyon değil. Rehber öğretmenin seni dinlemek için orada.',
    },
    {
        name: 'Güvendiğin Bir Yetişkin',
        contact: 'Ailen, öğretmenin',
        href: null,
        desc: 'Yaşadıklarını güvendiğin bir yetişkinle paylaşmak en güçlü adımdır.',
    },
];

export const SAFETY_DISCLAIMER =
    'KOZA bir eğitim ve farkındalık aracıdır; profesyonel psikolojik desteğin yerini tutmaz.';

/* ---------------- Hikâye tema renkleri ---------------- */
export const THEME_COLORS = ['#6A52DC', '#8470E8', '#C97A1C', '#E29A28', '#34955D', '#3C8DC5', '#B45BC9'];

/* ---------------- Günlük yansıma egzersizleri ---------------- */
export const DAILY_PRACTICES = [
    { icon: '🫶', title: 'Öz şefkat anı', text: 'Bugün kendine, en yakın arkadaşına söyleyeceğin kadar nazik bir cümle söyle.' },
    { icon: '🔍', title: 'Koza bakışı', text: 'Bugün sana "tuhaf" gelen bir davranış gördüğünde sor: "Acaba bu kozanın içinde ne var?"' },
    { icon: '✋', title: 'Sınır cümlesi', text: '"Bu davranış hoşuma gitmiyor, lütfen dur." — Aynada bir kez yüksek sesle dene.' },
    { icon: '🌟', title: 'Güç envanteri', text: 'Bu hafta üstesinden geldiğin küçük bir zorluğu hatırla. Bunu hangi gücünle başardın?' },
    { icon: '🤝', title: 'Bir iyilik', text: 'Bugün yalnız görünen birine küçük bir selam ver. Küçük bir kanat çırpışı, büyük bir rüzgâr başlatır.' },
    { icon: '💬', title: 'Destek cümlesi', text: 'Destek istemek güçlülüktür. Bugün bir konuda birinden yardım iste — küçük bir şey bile olur.' },
    { icon: '🦋', title: 'Dönüşüm hatırlatması', text: 'Şu an zor olan şey, hikâyenin sonu değil; kozanın sadece bir evresi.' },
];
