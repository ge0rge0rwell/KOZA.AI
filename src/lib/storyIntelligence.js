/**
 * KOZA Anlatı Zekâsı — Deneyim Mimarisi + Editoryal Geçiş
 *
 * Katman 1 — analyzeExperience önce çalışır:
 *   çıpa / metafor / ters-çevirme / yay tipi / şiddet skoru çıkar
 *
 * Katman 2 — buildInjectionBlock:
 *   mimari + kültürel zemin → prompt enjeksiyonu
 *
 * Katman 3 — buildEditorialContent + applyEditorial:
 *   hikâye üretildikten sonra 2 zayıf sayfa yeniden yazılır,
 *   son cümle görüntü zorlanır
 */

/* ── Kültürel zemin tespiti ─────────────────────────────────────────────────── */

const SPACE_PATTERNS = {
    koridor: ['koridor', 'koridorda', 'geçit', 'ara kat'],
    kantin: ['kantin', 'kafeterya', 'yemek arası', 'öğle arası', 'yemek'],
    sinif: ['sınıf', 'sınıfta', 'ders', 'tahta', 'sıra arkadaşı'],
    teneffus: ['teneffüs', 'teneffüste', 'ara', 'zil çaldı', 'mola'],
    tuvalet: ['tuvalet', 'wc', 'lavabo'],
    bahce: ['bahçe', 'okul bahçesi', 'dışarıda', 'okul önü'],
    dijital: [
        'sosyal medya', 'instagram', 'whatsapp', 'tiktok', 'twitter',
        'grup sohbeti', 'mesaj', 'yorum', 'paylaşım', 'ekran', 'bildirim',
    ],
};

const SPACE_DESCRIPTIONS = {
    koridor: 'Okul koridoru: kalabalık, gürültülü, her grubun kendi alanı var — geçiş değil, sosyal harita.',
    kantin: 'Kantin/kafeterya: kimin yanında oturulacağı meselesi, tepsi taşımanın çıplaklığı, sayılı teneffüs dakikaları.',
    sinif: 'Sınıf: öğretmenin görebildiği-göremediği açılar, sıraların yakınlığı, gülüşmenin yankılandığı duvarlar.',
    teneffus: 'Teneffüs: 15 dakika — yerini bulamayanlar için en uzun 15 dakika.',
    tuvalet: 'Okul tuvaleti: zaman öldürülen yer, ya da kaçılan yer, ya da korkulan yer.',
    bahce: 'Okul bahçesi: hiyerarşinin en görünür olduğu açık alan.',
    dijital: 'Dijital alan: ekranı kapat, hâlâ orada. Bildirim sesi artık farklı hissettiriyor.',
};

export function detectSpaces(userInput) {
    const lower = userInput.toLowerCase();
    return Object.entries(SPACE_PATTERNS)
        .filter(([, patterns]) => patterns.some((p) => lower.includes(p)))
        .map(([space]) => space);
}

function buildCulturalBlock(spaces) {
    if (!spaces.length) return '';
    const lines = spaces
        .map((s) => SPACE_DESCRIPTIONS[s])
        .filter(Boolean)
        .map((d) => `• ${d}`)
        .join('\n');
    return `\nKÜLTÜREL ZEMİN (bu mekânların somut gerçekliğini hikâyeye işle — soyut "okul" değil):\n${lines}\nTürkçe bedensel ifadeler: "içim sıkıştı" / "boğazım düğümlendi" / "gözlerim doldu" / "midem geçti" / "ellerim titredi".\n`;
}

/* ── Mimari çağrı — sistem promptu ─────────────────────────────────────────── */

export const ARCHITECTURE_SYSTEM = `Sen KOZA anlatı mimarısın. Tek görevin: bir çocuğun deneyimini analiz edip hikâye yazarına hazırlık verisi çıkarmak.
Teşhis yok. Yorum yok. Yalnızca JSON. JSON öncesinde veya sonrasında tek karakter bile yazma.`;

/* ── Mimari çağrı — kullanıcı mesajı ───────────────────────────────────────── */

export function buildArchitectureContent(userInput) {
    return `Çocuğun deneyimini analiz et. Aşağıdaki 9 alanı çıkar.

ALAN TANIMLARI:
anchor         — Kullanıcının anlattıklarından gelen TEK en spesifik somut nesne/yer/söz/an.
                 Tüm hikâyenin duygusal sütunu olacak. Genel değil, özgün: "o teneffüste dökülen su şişesi",
                 "grup sohbetinden çıkarıldığımı gösteren bildirim", "kimsenin dönüp bakmadığı o koridor anı".
                 Anlattıklardan yoksa deneyimin en özgün ayrıntısını seç.

characterBefore — Bu deneyim başlamadan önce bu çocuk kimdi? Anlattıklardan çıkar; yoksa deneyimle tutarlı
                  hayal et. 1 cümle, somut alışkanlık/tutku/özellik.

ownPhrases     — Kullanıcının kendi yazdığı 2 ÖZGÜN ifade. Birebil alıntı, kesinlikle değiştirme.
                 Hikâye içinde bu ifadeler minimal dönüşümle geçecek.

arc            — "GÜÇLÜ KALMA" veya "NASIL HİSSETTİRDİ" alanından kullanıcının temel ihtiyacı:
                 "validation"   → görülmek, onaylanmak, birisinin "gördüm" demesini istiyor
                 "strength"     → güçlü hissetmek, üstesinden gelmek istiyor
                 "hope"         → bu geçecek mi? umut arıyor
                 "understanding"→ neden böyle yapıldığını anlamak istiyor

severity       — 1 (hafif) → 5 (çok ağır). Şu 3 sinyale bak:
                 sözcük yoğunluğu + spesifik acı detayı sayısı + bedensel semptom ifadeleri.

dominantMetaphor — Kullanıcının bilinçsizce seçtiği bir imge: "yokmuşum gibi", "donup kaldım",
                   "kayboldum", "yutuldum". Yoksa null döndür.

pivotLocation  — Olayın geçtiği ana fiziksel/dijital yer. Hikâye 9. sayfada buraya dönecek.

inversion      — En ağır anın paradoksal olarak ortaya koyduğu şey. 1 cümle Türkçe.
                 Örn: "Ağlayamadım" → "Derinlemesine hissedebilen, ama bunu kimseyle paylaşamayan biri."
                 Zorla pozitifliğe çekme — gerçek paradoksu bul.

titleSeed      — Kullanıcının en duygusal yüklü ifadesinden damıtılmış 2-4 kelime.
                 Klişesiz; nesne/yer/eylem/ses olabilir. Başlık bu tohumdan büyüyecek.

KULLANICININ DENEYİMİ:
"""${userInput}"""

JSON — yalnızca bunu döndür, öncesinde/sonrasında hiçbir şey yazma:
{"anchor":"...","characterBefore":"...","ownPhrases":["...","..."],"arc":"validation","severity":3,"dominantMetaphor":null,"pivotLocation":"...","inversion":"...","titleSeed":"..."}`;
}

/* ── Mimari çıktı ayrıştırma ────────────────────────────────────────────────── */

export function parseArchitecture(raw) {
    const ARCS = ['validation', 'strength', 'hope', 'understanding'];
    return {
        anchor: String(raw.anchor || '').trim(),
        characterBefore: String(raw.characterBefore || '').trim(),
        ownPhrases: Array.isArray(raw.ownPhrases)
            ? raw.ownPhrases.map(String).filter(Boolean).slice(0, 3)
            : [],
        arc: ARCS.includes(raw.arc) ? raw.arc : 'validation',
        severity: Math.min(5, Math.max(1, Number(raw.severity) || 3)),
        dominantMetaphor: raw.dominantMetaphor ? String(raw.dominantMetaphor).trim() : null,
        pivotLocation: String(raw.pivotLocation || '').trim(),
        inversion: String(raw.inversion || '').trim(),
        titleSeed: String(raw.titleSeed || '').trim(),
    };
}

/* ── Enjeksiyon bloğu ───────────────────────────────────────────────────────── */

const ARC_GUIDE = {
    validation: 'YAY — TANIKLIK: Karakterin en derin ihtiyacı gerçekten görülmek. Sayfa 7-8\'de bir karakter (insan ya da yazar-dışı tanık) onu görür — büyük nutuk değil, "Gördüm" kadar küçük.',
    strength: 'YAY — ÖZ-GÜÇ: Küçük ama karakterin kendi seçtiği adımlar. "Güçlü" lafını kullanma — somut eylemleri göster.',
    hope: 'YAY — UMUT PENCERESİ: Karanlıkta uzun kal (severity kadar). Sayfa 8-9\'da sahici küçük bir olasılık aç — vaat değil, bir ipucu.',
    understanding: 'YAY — ANLAM: Zorbalık yapan kişinin karmaşıklığını 1 sahnede göster — meşrulaştırma değil, insan oku. "Neden?" sorusunu tam yanıtlama; bir parçasını aydınlat yeter.',
};

const SEVERITY_GUIDE = {
    1: 'Karanlık kısa. Dönüm noktası sayfa 4-5\'te başlayabilir.',
    2: 'Orta yoğunluk. Dönüm noktası sayfa 5-6.',
    3: 'Karanlığı tam tut. Dönüm noktası sayfa 6.',
    4: 'Sayfa 3-6 ağır olacak — bu gerekli. Dönüm noktası sayfa 7.',
    5: 'Sayfa 9\'a kadar tam karanlıkta kal. Okuyucu "evet tam böyledir" demeli. Çok erken ışık sahte gelir. Dönüm noktası sayfa 7-8.',
};

export function buildInjectionBlock(analysis, spaces = []) {
    const {
        anchor, characterBefore, ownPhrases, arc, severity,
        dominantMetaphor, pivotLocation, inversion, titleSeed,
    } = analysis;

    const phrasesBlock = ownPhrases.length
        ? `\nKULLANICININ KENDİ İFADELERİ — hikâyeye birebil veya minimal dönüşümle işle:\n${ownPhrases.map((p, i) => `  ${i + 1}. "${p}"`).join('\n')}\n`
        : '';

    const metaphorBlock = dominantMetaphor
        ? `\nHÂKİM METAFOR: Kullanıcı "${dominantMetaphor}" imgesiyle düşünüyor. Bu imgeyi hikâyenin yapısal metaforu yap — adını koyma.\n`
        : '';

    const cultural = buildCulturalBlock(spaces);

    return `

━━━ HİKÂYE MİMARİSİ — YAZMADAN ÖNCE HAZIRLIK ━━━

ÇIPA: "${anchor}"
  → Sayfa 1-2: nötr ya da sıradan hâliyle ilk görünüm
  → Sayfa 4-6: yaranın içine girmiş; artık bu şeyi hatırlamak bile acıtıyor
  → Sayfa 9-10: dönüşmüş; aynı şey, farklı anlam — iyileşme burada görünür

KARAKTER ÖNCESİ: ${characterBefore}
  → Sayfa 1\'de bu kimliğin izini bırak. Kayıplar ancak varoluşu olanlar için vardır.

PİVOT KONUMU: "${pivotLocation}"
  → Sayfa 9\'da karakter buraya geri döner. Aynı yer — ama içerisi farklı.

TERS-ÇEVİRME: ${inversion}
  → Sayfa 6-7\'de bu paradoksu göster. Adını koyma — okuyucu hisseder.

BAŞLIK TOHUMU: "${titleSeed}"
  → "title" alanı bu tohumdan ya birebil ya dönüşmüş olarak gelecek.
${phrasesBlock}${metaphorBlock}${cultural}
${ARC_GUIDE[arc]}
KARIŞIM YOĞUNLUĞU (${severity}/5): ${SEVERITY_GUIDE[severity]}

━━━ MİMARİ SONU ━━━
`;
}

/* ── Editoryal geçiş — sistem promptu ──────────────────────────────────────── */

export const EDITORIAL_SYSTEM = `Sen KOZA anlatı editörüsün. Tamamlanmış bir hikâyenin en zayıf 2-3 sayfasını tespit eder, yeniden yazarsın.
Yalnızca JSON döndür. JSON öncesinde veya sonrasında tek karakter yazma.`;

/* ── Editoryal geçiş — kullanıcı mesajı ────────────────────────────────────── */

export function buildEditorialContent(pages, analysis) {
    const { anchor, pivotLocation, severity, ownPhrases } = analysis;

    const pagesText = pages
        .map((p, i) => `[SAYFA ${i + 1}] başlık: "${p.title}"\n${p.content}`)
        .join('\n\n---\n\n');

    const lastPage = pages[pages.length - 1];
    const lastSentence = (lastPage?.content || '').trim().split(/[.!?]\s+/).pop() || '';

    const lastPageWarning = /öğrendi|artık|değişm|güçlü|kanatland|dönüştü|ışığı|yoluna girdi/i.test(lastSentence)
        ? `⚠️ SON SAYFA UYARISI: Son cümle soyut bir sonuç içeriyor ("${lastSentence.slice(0, 80)}..."). Son sayfayı yeniden yaz — son cümle GÖRÜNTÜ/HAREKET/SES olmalı.\n`
        : '';

    const phrasesNote = ownPhrases.length
        ? `Kullanıcının ifadeleri (${ownPhrases.map((p) => `"${p}"`).join(', ')}) hikâyede geçiyor mu? Geçmiyorsa bir sayfaya işle.\n`
        : '';

    return `Aşağıdaki hikâyeyi incele. En zayıf 2 sayfayı bul ve yeniden yaz.

BAĞLAM:
• Çıpa: "${anchor}" — sayfa 1-2'de nötr, 4-6'da yaralı, 9-10'da dönüşmüş olmalı. Eksikse doldur.
• Pivot konumu: "${pivotLocation}" — sayfa 9'da buraya dönülmeli.
• Karanlık yoğunluğu: ${severity}/5${severity >= 4 ? ' — Dönüm öncesi sayfalar yeterince ağır değilse yeniden yaz.' : '.'}
${lastPageWarning}${phrasesNote}
ZAYIF SAYFA KRİTERLERİ (2+ uyuyorsa yeniden yaz):
✗ Genel yazım — bu özgün deneyime spesifik değil, başka hikâyeye de gidebilir
✗ Fiziksel duyum yok (beden, nefes, el, mide, ses)
✗ Klişe: "içindeki gücü buldu / zamanla geçti / artık farklıydı / kanatlandı / ışığı gördü"
✗ Çıpa "${anchor}" geçmesi gereken yerde yok
✗ Diyalog veya iç ses yok

SON SAYFA ZORUNLU KURALI:
Son cümle bir GÖRÜNTÜ, HAREKET veya SES ile bitmeli.
"öğrendi ki / artık / değişmişti / güçlüydü / yoluna girdi" içeren cümle = yasak son.

YENİDEN YAZIM KURALLARI:
• Aynı sayfa sırası ve olay akışını koru — yalnızca kaliteyi yükselt
• Her sayfada en az 1 zorunlu: fiziksel duyum VEYA gerçek diyalog VEYA tam cümleyle iç ses
• 155-195 kelime
• Karakter adını ve bağlamı koru — yeni karakter icat etme

HİKÂYE SAYFALARI:
${pagesText}

JSON — yalnızca değiştirilen sayfalar, max 3 sayfa:
{"revisedPages":[{"index":2,"title":"...","content":"..."},{"index":9,"title":"...","content":"..."}]}`;
}

/* ── Editoryal uygulama ─────────────────────────────────────────────────────── */

export function applyEditorial(pages, editorialRaw) {
    if (!editorialRaw?.revisedPages?.length) return pages;
    const result = [...pages];
    for (const rev of editorialRaw.revisedPages) {
        const idx = Number(rev.index);
        if (Number.isInteger(idx) && idx >= 0 && idx < result.length && rev.content) {
            result[idx] = {
                title: rev.title ? String(rev.title).slice(0, 80) : result[idx].title,
                content: String(rev.content),
            };
        }
    }
    return result;
}
