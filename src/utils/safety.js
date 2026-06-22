/**
 * KOZA güvenlik katmanı — kriz tespiti ve içerik filtresi.
 * Kriz tespit edildiğinde üretim durdurulur ve kullanıcı destek kaynaklarına yönlendirilir.
 */

const CRISIS_PATTERNS = [
    'kendime zarar', 'kendimi kes', 'intihar', 'ölmek istiyorum', 'ölmek istedim',
    'yaşamak istemiyorum', 'canıma kıy', 'hayatıma son', 'kendimi öldür',
    'birini öldür', 'zarar vermek istiyorum', 'bıçaklamak', 'silahla vur',
];

const normalizeTr = (text) =>
    String(text)
        .replace(/İ/g, 'i')
        .replace(/I/g, 'ı')
        .toLowerCase()
        .replace(/\s+/g, ' ');

/**
 * Girdide kriz dili olup olmadığını kontrol eder.
 * @returns {{ isCrisis: boolean }}
 */
export const detectCrisis = (text) => {
    if (!text || typeof text !== 'string') return { isCrisis: false };
    const normalized = normalizeTr(text);
    return { isCrisis: CRISIS_PATTERNS.some((p) => normalized.includes(p)) };
};

const PROFANITY = ['salak', 'aptal', 'gerizekalı', 'mal '];

/** Topluluk önizlemeleri için hafif küfür maskesi. */
export const maskProfanity = (text) => {
    let out = String(text || '');
    PROFANITY.forEach((w) => {
        out = out.replace(new RegExp(w, 'gi'), '∗∗∗');
    });
    return out;
};

/* ---------------------------------------------------------------------------
 * Takma ad moderasyonu (çocuk güvenliği)
 * Kullanıcı kendi takma adını yazabilir; bu katman uygunsuz adları engeller.
 * Tamamen yerel çalışır (AI gerektirmez) — Dayanıklılık kuralına uyar.
 * ------------------------------------------------------------------------- */

// Türkçe harfleri ASCII'ye indirger; leetspeak karakterlerini harfe çevirir.
// Amaç yalnızca eşleştirme — saklanan ad her zaman kullanıcının yazdığı orijinaldir.
const TR_FOLD = { ç: 'c', ğ: 'g', ı: 'i', ö: 'o', ş: 's', ü: 'u', â: 'a', î: 'i', û: 'u' };
const LEET = { 0: 'o', 1: 'i', 3: 'e', 4: 'a', 5: 's', 7: 't', '@': 'a', $: 's', '!': 'i', '|': 'i' };

const fold = (text) =>
    String(text || '')
        .replace(/İ/g, 'i')
        .replace(/I/g, 'ı')
        .toLowerCase()
        .split('')
        .map((ch) => LEET[ch] ?? TR_FOLD[ch] ?? ch)
        .join('');

// Tüm boşluk/sembolleri atıp tek parça yapar ("s.a.l.a.k" → "salak").
const canonical = (text) => fold(text).replace(/[^a-z0-9]/g, '');
// Sözcüklere böler (kısa/çift anlamlı terimleri yalnız tam sözcükte yakalamak için).
const wordsOf = (text) => fold(text).split(/[^a-z0-9]+/).filter(Boolean);

// Alt dize olarak aranan, çift anlamı olmayan açık küfür/uygunsuz terimler.
const HARD = [
    // Türkçe
    'amk', 'amcik', 'amcuk', 'aminakoy', 'aminakoyim', 'aminakoyayim', 'ananisik',
    'ananisikeyim', 'orospu', 'oruspu', 'orospucocugu', 'kahpe', 'kahbe', 'pezevenk',
    'gavat', 'yavsak', 'serefsiz', 'pust', 'ibne', 'gotveren', 'gotlek', 'yarrak',
    'yarak', 'dalyarak', 'siktir', 'sikeyim', 'sikim', 'sikik', 'sikici', 'sikis',
    'kaltak', 'surtuk', 'fahise', 'kevase', 'godos',
    // İngilizce
    'fuck', 'fuk', 'fck', 'motherfuck', 'shit', 'bullshit', 'bitch', 'asshole',
    'dickhead', 'pussy', 'cunt', 'nigger', 'nigga', 'faggot', 'whore', 'porn',
    'rape', 'rapist', 'hitler', 'penis', 'vagina',
    // Kimlik taklidi
    'kozaekibi', 'kozaresmi', 'kozaofficial', 'kozadestek', 'administrator',
];

// Yalnızca tam sözcük olarak engellenen kısa/çift anlamlı terimler
// ("Kemal", "Koç", "Epic", "Ramazan" gibi gerçek adları yanlışlıkla engellememek için).
const WORD = new Set([
    'pic', 'sik', 'am', 'oc', 'got', 'mal', 'sex', 'sexy', 'ass', 'dick', 'cock',
    'boobs', 'xxx', 'salak', 'aptal', 'gerizekali', 'gerzek', 'dangalak', 'denyo',
    'admin', 'moderator', 'yonetici',
]);

/**
 * Takma adın uygunsuz içerik taşıyıp taşımadığını kontrol eder.
 * @returns {boolean} uygunsuzsa true
 */
export const detectInappropriate = (text) => {
    const flat = canonical(text);
    if (HARD.some((w) => flat.includes(w))) return true;
    return wordsOf(text).some((t) => WORD.has(t));
};
