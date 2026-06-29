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

specificDetails — Kullanıcının anlattıklarından çıkarılan 4 somut zemin ayrıntısı. Hikâye yazarına ham zemin malzeme.
                  location: Olayın geçtiği kesin yer ya da dijital alan — özgün sahne tanımı, tek kelime değil
                  perpetratorBehavior: Zorbalık yapan kişinin/grubun özgün davranış kalıbı (1 cümle, birebil)
                  physicalResponse: Kullanıcının beden tepkisi (anlattıklarından çıkar; yoksa deneyimle tutarlı infer et)
                  keyObject: Hesapta geçen en somut nesne/ses/ayrıntı — çıpa değil, zemin için (çıpadan farklı)

palette — Kullanıcının anlattıklarından çıkarılan 5 özgün duyusal/fiziksel ayrıntı. Hikâye yazarına zemin malzemesi.
          UYDURMA: yalnızca anlattıklarından veya bağlamdan kuvvetle ima olunanları yaz.
          "Okul kokusu" değil: "ıslak paspas + aşırı klor + o günkü yemekten kalan yağ kokusu".
          "Herkes baktı" değil: "arka sıradaki eğildi, bir şeyler fısıldadı, güldü".
          5 ayrıntı — farklı duyulardan: ses, koku, doku, görüntü, beden.

KULLANICININ DENEYİMİ:
"""${userInput}"""

JSON — yalnızca bunu döndür, öncesinde/sonrasında hiçbir şey yazma:
{"anchor":"...","characterBefore":"...","ownPhrases":["...","..."],"arc":"validation","severity":3,"dominantMetaphor":null,"pivotLocation":"...","inversion":"...","titleSeed":"...","specificDetails":{"location":"...","perpetratorBehavior":"...","physicalResponse":"...","keyObject":"..."},"palette":["...","...","...","...","..."]}`;
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
        specificDetails: {
            location: String(raw.specificDetails?.location || '').trim(),
            perpetratorBehavior: String(raw.specificDetails?.perpetratorBehavior || '').trim(),
            physicalResponse: String(raw.specificDetails?.physicalResponse || '').trim(),
            keyObject: String(raw.specificDetails?.keyObject || '').trim(),
        },
        palette: Array.isArray(raw.palette) ? raw.palette.map(String).filter(Boolean).slice(0, 6) : [],
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

/* ── Özgün zemin enjeksiyon bloğu ──────────────────────────────────────────── */

export function buildSpecificityBlock(analysis = {}) {
    const { specificDetails = {}, ownPhrases = [] } = analysis;
    const { location, perpetratorBehavior, physicalResponse, keyObject } = specificDetails;

    if (!location && !perpetratorBehavior && !physicalResponse && !keyObject && !ownPhrases.length) {
        return '';
    }

    const lines = [];
    if (location) lines.push(`Mekân: ${location}`);
    if (perpetratorBehavior) lines.push(`Davranış kalıbı: ${perpetratorBehavior}`);
    if (physicalResponse) lines.push(`Beden tepkisi: ${physicalResponse}`);
    if (keyObject) lines.push(`Kilit nesne/ses: ${keyObject}`);
    if (ownPhrases.length) lines.push(`Kullanıcının kendi sözleri: ${ownPhrases.map(p => `"${p}"`).join(' / ')}`);

    return `\n━━━ ÖZGÜN ZEMİN — BU DETAYLARI KULLAN ━━━\n${lines.join('\n')}\n━━━\n`;
}

export function buildPaletteBlock(palette) {
    if (!Array.isArray(palette) || !palette.length) return '';
    return `\n━━━ DUYUSAL ZEMİN ━━━\n${palette.map(d => `• ${d}`).join('\n')}\nBu ayrıntıları hikâyeye işle — hepsini değil, seçerek, dönüştürerek.\n━━━\n`;
}

export function extractBridgeSentence(pages) {
    const last = pages?.[pages.length - 1];
    if (!last?.content) return '';
    const text = last.content.trim();
    const lastPunct = Math.max(
        text.lastIndexOf('. '), text.lastIndexOf('! '),
        text.lastIndexOf('? '), text.lastIndexOf('… ')
    );
    const sentence = lastPunct > 0 ? text.slice(lastPunct + 2).trim() : text.slice(-150).trim();
    return sentence.length > 10 ? sentence : '';
}

/* ── Yasak ifade tarayıcı ───────────────────────────────────────────────────── */

const STORY_FORBIDDEN_PHRASES = [
    'zamanla geçti', 'içindeki gücü buldu', 'artık farklıydı',
    'güçlü olduğunu anladı', 'her şey yoluna girdi', 'kanatlandı',
    'dönüştü', 'kelebeğe döndü', 'ışığa yürüdü', 'umut filizlendi',
    'içindeki ışığı buldu', 'zamanla her şey', 'artık güçlüydü', 'her şey değişti',
];

export function hasForbiddenPhrases(pages) {
    const text = pages.map(p => p.content).join(' ').toLowerCase();
    return STORY_FORBIDDEN_PHRASES.some(phrase => text.includes(phrase));
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

    const allPageText = pagesText.toLowerCase();
    const foundForbidden = STORY_FORBIDDEN_PHRASES.filter(phrase => allPageText.includes(phrase));
    const forbiddenScanWarning = foundForbidden.length
        ? `⚠️ YASAK İFADE TARAMASI: "${foundForbidden.join('", "')}" tespit edildi. Bu ifadeleri içeren sayfaları klişesiz, somut alternatiflerle yeniden yaz.\n`
        : '';

    return `Aşağıdaki hikâyeyi incele. En zayıf 2-3 sayfayı bul ve yeniden yaz.

BAĞLAM:
• Çıpa: "${anchor}" — sayfa 1-2'de nötr, 4-6'da yaralı, 9-10'da dönüşmüş olmalı. Eksikse doldur.
• Pivot konumu: "${pivotLocation}" — sayfa 9'da buraya dönülmeli.
• Karanlık yoğunluğu: ${severity}/5${severity >= 4 ? ' — Dönüm öncesi sayfalar yeterince ağır değilse yeniden yaz.' : '.'}
${forbiddenScanWarning}${lastPageWarning}${phrasesNote}
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
{"revisedPages":[{"index":2,"title":"...","content":"..."},{"index":5,"title":"...","content":"..."},{"index":9,"title":"...","content":"..."}]}`;
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

/* ══════════════════════════════════════════════════════════════════════════════
   OYUN MİMARİSİ — Senaryo kalibrasyon katmanı
   ══════════════════════════════════════════════════════════════════════════════ */

export const GAME_ARCHITECTURE_SYSTEM = `Sen KOZA oyun mimarısın. Tek görevin: bir çocuğun deneyimini analiz edip 3 bölümlük karar oyunu için kalibrasyon verisi çıkarmak.
Teşhis yok. Yorum yok. Yalnızca JSON. JSON öncesinde veya sonrasında tek karakter bile yazma.`;

export function buildGameArchitectureContent(userInput) {
    return `Çocuğun deneyimini analiz et. Oyun kalibrasyonu için 5 alanı çıkar.

ALAN TANIMLARI:
severity          — 1 (hafif) → 5 (çok ağır). Sözcük yoğunluğu + spesifik acı detayı sayısı + bedensel semptom ifadeleri.

arc               — Kullanıcının temel ihtiyacı:
                    "validation"    → görülmek, onaylanmak
                    "strength"      → güçlü hissetmek, üstesinden gelmek
                    "hope"          → bu geçecek mi? umut arıyor
                    "understanding" → neden böyle yapıldığını anlamak istiyor

scenarioDynamics  — Kullanıcının yaşadığı 3 özgün dinamik (baskı, tepki, bağlam).
                    Oyun senaryolarına birebil değil ama bu dinamikleri yansıtacak.
                    Örn: ["teneffüste koridorda alenen alay edildi", "gruba katılmak istedi ama reddedildi", "yetişkine söylemek istedi ama çekindi"]

correctChoiceGuidance — Bu arc için doğru seçeneğin tonu (1 cümle):
                    "validation"    → doğru seçenek görülmeyi sağlar, tanıklık arar
                    "strength"      → öz saygıyı koruyan en küçük somut adım
                    "hope"          → bir kapıyı açık bırakan, bağ kuran seçenek
                    "understanding" → merak içerir, tepkisizlik değil, meşrulaştırma da değil

difficultyGrade   — "easy" | "medium" | "hard"
                    severity 1-2 → easy, 3 → medium, 4-5 → hard
                    Hard: yanlış seçenekler çok daha cazip görünmeli.

KULLANICININ DENEYİMİ:
"""${userInput}"""

JSON — yalnızca bunu döndür:
{"severity":3,"arc":"validation","scenarioDynamics":["...","...","..."],"correctChoiceGuidance":"...","difficultyGrade":"medium"}`;
}

export function parseGameArchitecture(raw) {
    const ARCS = ['validation', 'strength', 'hope', 'understanding'];
    const GRADES = ['easy', 'medium', 'hard'];
    return {
        severity: Math.min(5, Math.max(1, Number(raw.severity) || 3)),
        arc: ARCS.includes(raw.arc) ? raw.arc : 'validation',
        scenarioDynamics: Array.isArray(raw.scenarioDynamics)
            ? raw.scenarioDynamics.map(String).filter(Boolean).slice(0, 3)
            : [],
        correctChoiceGuidance: String(raw.correctChoiceGuidance || '').trim(),
        difficultyGrade: GRADES.includes(raw.difficultyGrade) ? raw.difficultyGrade : 'medium',
    };
}

const ARC_GUIDE_GAME = {
    validation: 'Her bölümde doğru seçenek görülmeyi ve duyulmayı öncelikler — bir karakter "gördüm" der ya da kullanıcı kendini duyurur.',
    strength: 'Her bölümde doğru seçenek en küçük ama kendi seçilen adım. Büyük eylem değil — bir şey yazma, bir sınır koyma.',
    hope: 'Her bölümde doğru seçenek bir kapıyı açık bırakır. Çözüm değil — olasılık, bağ.',
    understanding: 'Doğru seçenek merak içerir — zorbalık yapanı meşrulaştırmaz ama "neden?" sorar. Anlayış, ama teslim olmama.',
};

const DIFFICULTY_GUIDE = {
    easy: 'ZORLUK DÜŞÜK: Doğru seçenek görece belirgin. Yanlış seçenekler mantıklı ama açıkça sakıncalı.',
    medium: 'ZORLUK ORTA: Doğru seçenek ilk bakışta hemen belli olmamalı. Yanlış seçenekler cazip hissetmeli.',
    hard: 'ZORLUK YÜKSEK: Yanlış seçenekler (intikam / çekilme / karşı saldırı) çok cazip görünmeli. Doğru seçenek daha az belirgin ama en sağlıklı.',
};

export function buildGameInjectionBlock(analysis) {
    const { severity, arc, scenarioDynamics, correctChoiceGuidance, difficultyGrade } = analysis;

    const dynamicsBlock = scenarioDynamics.length
        ? `\nSENARYO DİNAMİKLERİ (bu 3 dinamiği 3 bölüme yansıt — birebil kopya değil, benzer baskı):\n${scenarioDynamics.map((d, i) => `  ${i + 1}. ${d}`).join('\n')}\n`
        : '';

    const severityNote = severity >= 4
        ? 'Senaryolar yoğun duygusal baskıyı yansıtmalı. Kaçmak veya suskunlaşmak güçlü bir dürtü olarak hissettirilmeli.'
        : severity <= 2
        ? 'Senaryolar gerçekçi ama aşırı dramatik değil.'
        : 'Dengeli yoğunluk.';

    return `

━━━ OYUN MİMARİSİ — SENARYO KALİBRASYONU ━━━

${DIFFICULTY_GUIDE[difficultyGrade]}

DOĞRU SEÇENEĞİN TONU: ${correctChoiceGuidance || ARC_GUIDE_GAME[arc]}

ŞİDDET SKORU (${severity}/5): ${severityNote}
${dynamicsBlock}
YAY — ${arc.toUpperCase()}: ${ARC_GUIDE_GAME[arc]}

━━━ MİMARİ SONU ━━━
`;
}

/* ══════════════════════════════════════════════════════════════════════════════
   MEKTUP MİMARİSİ + EDİTORYAL — Kişiselleştirme + kalite katmanları
   ══════════════════════════════════════════════════════════════════════════════ */

export const LETTER_ARCHITECTURE_SYSTEM = `Sen KOZA mektup mimarısın. Tek görevin: bir çocuğun deneyimini analiz edip "5 yıl sonraki kendin" mektubu için kişiselleştirme verisi çıkarmak.
Teşhis yok. Yorum yok. Yalnızca JSON. JSON öncesinde veya sonrasında tek karakter bile yazma.`;

export function buildLetterArchitectureContent(userInput) {
    return `Çocuğun deneyimini analiz et. Mektup kişiselleştirmesi için 5 alanı çıkar.

ALAN TANIMLARI:
specificMoment  — Kullanıcının anlattıklarındaki en somut, en özgün an.
                  Mektup P1'de "O gün..." diye başlayacak — bu an.
                  "Sosyal medyadan dışlandım" değil; "sohbet grubundan çıkarıldığını gösteren bildirim ekranı".

faultPattern    — Kullanıcı kendini suçluyor mu? Hangi cümle ya da ima?
                  Mektup P3'te bunu doğrudan, şefkatle ele alacak.
                  Yoksa null döndür.

hiddenStrength  — Anlattıklarında görülen ama kullanıcının fark etmediği güç. Somut kanıt.
                  Örn: "Hâlâ okula gidiyorsun" / "Bunu yazmak için buradayken"

futureSceneHint — 5 yıl sonrasından gerçekçi, küçük ama güzel 1 an.
                  "Ünlü olacaksın" değil — "Başka bir şeyle meşgulken fark edeceksin ki..."
                  P6'nın çekirdeği olacak.

ownPhrases      — Kullanıcının kendi yazdığı 1-2 özgün ifade. Birebil alıntı.

KULLANICININ DENEYİMİ:
"""${userInput}"""

JSON — yalnızca bunu döndür:
{"specificMoment":"...","faultPattern":null,"hiddenStrength":"...","futureSceneHint":"...","ownPhrases":["..."]}`;
}

export function parseLetterArchitecture(raw) {
    return {
        specificMoment: String(raw.specificMoment || '').trim(),
        faultPattern: raw.faultPattern ? String(raw.faultPattern).trim() : null,
        hiddenStrength: String(raw.hiddenStrength || '').trim(),
        futureSceneHint: String(raw.futureSceneHint || '').trim(),
        ownPhrases: Array.isArray(raw.ownPhrases)
            ? raw.ownPhrases.map(String).filter(Boolean).slice(0, 2)
            : [],
    };
}

export function buildLetterInjectionBlock(analysis) {
    const { specificMoment, faultPattern, hiddenStrength, futureSceneHint, ownPhrases } = analysis;

    const faultBlock = faultPattern
        ? `\nSUÇLAMA PAT.: Kullanıcı "${faultPattern}" diye kendini suçluyor. P3'te bunu doğrudan, şefkatle ele al — kendi suçu olmadığını somut nedenlerle göster.\n`
        : '';

    const phrasesBlock = ownPhrases.length
        ? `\nKULLANICININ KENDİ İFADELERİ — mektupta minimal dönüşümle geçmeli:\n${ownPhrases.map((p, i) => `  ${i + 1}. "${p}"`).join('\n')}\n`
        : '';

    return `

━━━ MEKTUP MİMARİSİ — KİŞİSELLEŞTİRME ━━━

PARAGRAF 1 ÇIKIŞ NOKTASI: "O gün..." → "${specificMoment}"
  → Genel "zor bir dönemden geçiyorsun" değil. Bu spesifik an.

GİZLİ GÜÇ (P4 çekirdeği): "${hiddenStrength}"
  → Somut kanıt olarak kullan. Soyut övgü değil.

GELECEK SAHNESİ (P6 çekirdeği): "${futureSceneHint}"
  → Gerçekçi, küçük, hak edilmiş. Abartma, vaat etme.
${faultBlock}${phrasesBlock}
━━━ MİMARİ SONU ━━━
`;
}

/* ── Mektup editoryal geçiş ─────────────────────────────────────────────────── */

export const LETTER_EDITORIAL_SYSTEM = `Sen KOZA mektup editörüsün. Tamamlanmış bir mektubun kalite sorunlarını tespit eder, gereken paragrafları yeniden yazarsın.
Yalnızca JSON döndür. JSON öncesinde veya sonrasında tek karakter yazma.`;

const LETTER_FORBIDDEN = [
    'güçlüsün', 'inanıyorum sana', 'her şey yoluna girecek',
    'kanatlanacaksın', 'ışığı göreceksin', 'zamanla geçecek', 'güçlü olacaksın',
];

export function buildLetterEditorialContent(letter, analysis) {
    const { specificMoment, hiddenStrength, futureSceneHint, ownPhrases } = analysis;
    const paragraphs = letter.paragraphs || [];
    const paragraphsText = paragraphs.map((p, i) => `[P${i + 1}] ${p}`).join('\n\n');
    const psText = letter.ps || '';
    const fullText = (paragraphsText + ' ' + psText).toLowerCase();

    const foundForbidden = LETTER_FORBIDDEN.filter(phrase => fullText.includes(phrase));
    const forbiddenWarning = foundForbidden.length
        ? `⚠️ YASAK İFADE: "${foundForbidden.join('", "')}" tespit edildi. Bu ifadeleri içeren paragrafları/PS'yi yeniden yaz.\n`
        : '';

    const psHasForbidden = LETTER_FORBIDDEN.some(f => psText.toLowerCase().includes(f));
    const psWarning = (!psText || psText.length < 25 || psHasForbidden)
        ? `⚠️ PS UYARISI: PS ${!psText || psText.length < 25 ? 'çok kısa veya boş' : 'klişe içeriyor'}. Bu deneyimden damıtılmış tek özgün cümle olmalı.\n`
        : '';

    const p6 = paragraphs[5] || '';
    const p6Warning = p6.length < 60
        ? `⚠️ P6 UYARISI: 6. paragraf (gelecek sahnesi) çok kısa. Somut küçük an: "${futureSceneHint}"\n`
        : '';

    const phrasesNote = ownPhrases.length
        ? `Kullanıcının ifadeleri (${ownPhrases.map(p => `"${p}"`).join(', ')}) mektupta geçiyor mu? Geçmiyorsa uygun paragrafa işle.\n`
        : '';

    return `Aşağıdaki mektubu incele. Tespit edilen sorunları gider.

BAĞLAM:
• Spesifik an (P1 çekirdeği): "${specificMoment}"
• Gizli güç (P4 çekirdeği): "${hiddenStrength}"
• Gelecek sahnesi (P6 çekirdeği): "${futureSceneHint}"
${forbiddenWarning}${psWarning}${p6Warning}${phrasesNote}
ZAYIF PARAGRAF KRİTERLERİ:
✗ Yasak ifadeler içeriyor
✗ Genel — bu özgün deneyime spesifik değil
✗ P1: "O gün..." ile "${specificMoment}"a değinmiyor
✗ PS: çok kısa, klişe, ya da mektubun ağırlık merkezini taşımıyor

YENİDEN YAZIM KURALLARI:
• Yalnızca sorunlu paragrafları yeniden yaz (max 2 paragraf + PS)
• Diğer paragrafları değiştirme — ses tutarlılığını koru
• Ses: "5 yıl sonraki sen", sıcak ama abartısız, vaaz vermiyor
• Yasak: güçlüsün, inanıyorum sana, her şey yoluna girecek, kanatlanacaksın, ışığı göreceksin

PARAGRAFLAR:
${paragraphsText}

PS: ${psText || '(boş)'}

JSON — yalnızca değiştirilen öğeler, değişen yoksa boş diziler döndür:
{"revisedParagraphs":[{"index":0,"content":"..."}],"revisedPs":"..."}`;
}

export function applyLetterEditorial(letter, editorialRaw) {
    if (!editorialRaw) return letter;
    const result = { ...letter, paragraphs: [...(letter.paragraphs || [])] };
    if (Array.isArray(editorialRaw.revisedParagraphs)) {
        for (const rev of editorialRaw.revisedParagraphs) {
            const idx = Number(rev.index);
            if (Number.isInteger(idx) && idx >= 0 && idx < result.paragraphs.length && rev.content) {
                result.paragraphs[idx] = String(rev.content);
            }
        }
    }
    if (editorialRaw.revisedPs && typeof editorialRaw.revisedPs === 'string' && editorialRaw.revisedPs.length > 10) {
        result.ps = editorialRaw.revisedPs;
    }
    return result;
}

/* ══════════════════════════════════════════════════════════════════════════════
   BÖLÜMLÜ ÜRETİM — Ses çıkarımı + 3 parçalı sayfa üretimi
   ══════════════════════════════════════════════════════════════════════════════ */

/* ── Ses çıkarımı ─────────────────────────────────────────────────────────── */

export const VOICE_SYSTEM = `Sen KOZA anlatı sesçisisin. Mimari veriden bu özgün karakterin iç sesini gösteren 1 kısa paragraf yaz.
Bu paragraf hikâyeye girmeyecek — yalnızca karakter sesinin ritim şablonu. Klişe yasak. Teşhis yok.
Yalnızca JSON döndür. JSON öncesinde veya sonrasında tek karakter yazma.`;

export function buildVoiceContent(analysis) {
    const { anchor, characterBefore, ownPhrases, arc, dominantMetaphor } = analysis;
    const metaphorHint = dominantMetaphor ? `\nBaskın imge: "${dominantMetaphor}".` : '';
    const phraseHint = ownPhrases.length ? `\nKullanıcının kendi ifadesi: "${ownPhrases[0]}".` : '';

    return `Aşağıdaki mimari veriye dayanarak bu karakterin iç sesini gösteren 1 paragraf yaz (80-100 kelime).

Karakterin önceki kimliği: ${characterBefore}
Temel ihtiyacı: ${arc} (validation=görülmek / strength=güç / hope=umut / understanding=anlayış)
Duygusal çıpa: "${anchor}"${metaphorHint}${phraseHint}

KURAL: O karakterin kafasında nasıl düşündüğünü, nasıl iç sesle konuştuğunu göster.
Somut — beden, nesne, an. Klişe yasak. Bu insanın özgün ritmi ve sesi.

Paragrafı yazdıktan sonra bu sesin 3 karakteristik cümle kalıbını çıkar — hikâye yazarı bu ritmleri tüm sayfalarda zorunlu sürdürsün.
Örn: "Kısa kesik vuruş. Ardından uzun içe dönen sorgu gelir." / "Nesne — eylem — beden tepkisi, hepsi art arda." / "Cümle hiç bitmez, devam eder, dönüp dolaşır—"

JSON — yalnızca bunu döndür:
{"voiceSample":"...","sentencePatterns":["...","...","..."]}`;
}

export function parseVoice(raw) {
    return String(raw.voiceSample || '').trim();
}

export function parseVoicePatterns(raw) {
    return Array.isArray(raw.sentencePatterns)
        ? raw.sentencePatterns.map(String).filter(Boolean).slice(0, 3)
        : [];
}

/* ── Bölüm A: sayfalar 1–4 + meta ─────────────────────────────────────────── */

export function buildChunkAContent(userInput, analysis = {}, voiceSample = '', ragBlock = '', opts = {}) {
    const {
        anchor = '', characterBefore = '', arc = 'validation',
        severity = 3, dominantMetaphor = null, pivotLocation = '',
    } = analysis;

    const { voicePatterns = [], palette = [] } = opts;

    const spaces = detectSpaces(userInput);
    const cultural = buildCulturalBlock(spaces);
    const specificityBlock = buildSpecificityBlock(analysis);
    const paletteBlock = buildPaletteBlock(palette);
    const patternsBlock = voicePatterns.length
        ? `━━━ SES KALIPLARI — tüm sayfalarda bu ritmlerden en az birini kullan ━━━\n${voicePatterns.map((p, i) => `${i + 1}. ${p}`).join('\n')}\n━━━\n\n`
        : '';
    const metaphorNote = dominantMetaphor
        ? `BASKIN METAFOR: "${dominantMetaphor}" — yapısal imge, adını koyma.\n`
        : '';

    const archBlock = anchor ? `━━━ MİMARİ ━━━
ÇIPA: "${anchor}"
  → Sayfa 1-2: nötr/sıradan hâliyle ilk görünüm — bir nesne, yer ya da alışkanlık
  → Sayfa 4: acıtmıyor henüz ama yakında acıtacağı hissini ver

KARAKTER ÖNCESİ: ${characterBefore}
  → Sayfa 1'de bu kimliğin izini bırak. Spesifik tutku/alışkanlık/küçük neşe.

PİVOT KONUMU: "${pivotLocation}" — Sayfa 9'da buraya dönülecek; Sayfa 1'de kur.

ŞİDDET (${severity}/5): ${severity >= 4 ? 'Sayfa 2 ağır olacak — dramayı düşür ama gerçekliği tuttur.' : 'Gerçekçi yoğunluk.'}
${metaphorNote}${cultural}━━━

` : '';

    const voiceBlock = voiceSample
        ? `━━━ KARAKTER SESİ — tüm 4 sayfa bu ritmi sürdürsün ━━━
${voiceSample}
━━━

`
        : '';

    return `Kullanıcının deneyiminden 4 sayfalık hikâye bölümü yaz. Bu ilk bölüm — karakteri kur, çıpayı ek, yarayı aç.

${archBlock}${voiceBlock}${paletteBlock}${patternsBlock}${specificityBlock}
━━━ YAZIM KURALLARI (TÜM SAYFALAR) ━━━

İLK CÜMLE KURALI (yalnızca Sayfa 1):
Doğrudan SES veya HAREKET veya DEVAM EDEN EYLEM içinde başla.
İyi: "Zil çalmadan üç dakika önce Elif merdiven başındaydı." / "Çantanın fermuar sesi koridora yayıldı."
YASAK: "O gün..." / hava durumu / "Her sabah..." / "Her zaman..." / herhangi bir kurulum cümlesi.

DUYUSAL ENVANTER (her sayfa):
En az 2 farklı duyu: görme + ses VEYA ses + dokunma VEYA koku + hareket. Salt görsel yok.

SAHNE KURALI (tüm sayfalar):
Hiçbir sayfada zaman özeti yok.
YASAK: "haftalarca / zamanla / günler sonra / o günden beri / zaman geçtikçe / ilerleyen günlerde / sonraki günlerde"
Her sayfa tek sahne, gerçek zamanlı.

CÜmle RİTMİ (her sayfa):
Kısa + uzun cümleleri karıştır. Her sayfada en az 1 cümle ≤8 kelime — duraklayıcı, ağırlık taşıyıcı.

SAYFA 2 — YARA SAYFASI KURALI:
TEK ANI yakınlaştır. Beden önce tepki verir, zihin sonra.
Zoom: eller / nefes / gözler / mide / boğaz / ses — ne yaptı?
"Üzgündü / hissetti / korktu / şaşırdı" gibi durum cümlesi yasak — beden tepkisini göster.

━━━ 4 SAYFA REHBERİ ━━━
SAYFA 1 — ÖNCE VE SONRA: Karakterin "normal"i. Küçük spesifik ayrıntı. O an başlar — bitmeden bitir.
SAYFA 2 — ANIN İÇİ: Yarayı doğrudan, abartısız yaz. Spesifik sözcükler, spesifik sessizlik. Beden önce.
SAYFA 3 — SONRASININ GECESİ: O gece odada. Zihnin dönüp durduğu tek an. İç ses gerçek ve sert.
SAYFA 4 — ERTESİ GÜN BEDENİ: Sabah kalkmak, okula gitmek. Beden bilir zihin karar vermeden — ayaklar ağır, mide sıkışık.

${ARC_GUIDE[arc]}
KARIŞIM YOĞUNLUĞU (${severity}/5): ${SEVERITY_GUIDE[severity]}

Her sayfada zorunlu — en az biri: fiziksel duyum VEYA gerçek diyalog VEYA tam cümleyle iç ses.
155-195 kelime/sayfa. Başlıklar: 2-4 kelime, imgeli, klişesiz.

━━━ YASAK — BU İFADELERİ KULLANMA ━━━
"içindeki gücü buldu" / "zamanla geçti" / "artık farklıydı" / "güçlü olduğunu anladı" / "her şey yoluna girdi" / "kanatlandı" / "dönüştü" / "kelebeğe döndü" / "ışığa yürüdü" / "umut filizlendi" / "içindeki ışığı buldu" / "zamanla her şey" / "artık güçlüydü" / "her şey değişti" / "içinde bir şeyler değişti" / "fark etti ki artık" / "güçlü olduğunu fark etti" / "içini ısıttı" / "her şey yoluna girecekti" / "kendini affetti" / "barış içindeydi" / "anladı ki" / "kazanmıştı" / "artık korkmuyordu" / "derin bir nefes aldı ve iyiydi"
━━━

"category": "dislanma"|"alay"|"siber"|"fiziksel"|"soylenti"|"tehdit"|"diger"
"themeColor": "#6A52DC"(mor-yalnızlık)|"#8470E8"(lavanta)|"#C97A1C"(amber-öfke)|"#E29A28"(altın-uyanış)|"#34955D"(yeşil)|"#3C8DC5"(mavi-uzaklık)|"#B45BC9"(pembe-onur)
"reflectionQuestion": yüzeyde değil, içeride bir şeye dokunan soru
"growthLesson": yalnızca bu özgün deneyimden çıkan tek cümle, genel bilgelik değil

${ragBlock}

KULLANICININ DENEYİMİ:
"""${userInput}"""

JSON — yalnızca bunu döndür, öncesinde/sonrasında hiçbir şey yazma:
{"title":"...","category":"...","themeColor":"#...","reflectionQuestion":"...","growthLesson":"...","pages":[{"title":"...","content":"..."},{"title":"...","content":"..."},{"title":"...","content":"..."},{"title":"...","content":"..."}]}`;
}

/* ── Bölüm B: sayfalar 5–7 ─────────────────────────────────────────────────── */

const ARC_GUIDE_CHUNK_B = {
    validation: 'Sayfa 7: bir karakter (insan ya da yazar-dışı tanık) onu görür — "Gördüm" kadar küçük. Nutuk yok.',
    strength: 'Sayfa 7: karakter en küçük ama kendi seçtiği adımı atar. "Güçlü" kelimesi yok — somut eylem.',
    hope: 'Sayfa 7: sahici küçük bir olasılık açılır — vaat değil, bir kapı aralığı.',
    understanding: 'Sayfa 7: zorbalık yapanın 1 sahnede karmaşıklığı görünür — meşrulaştırma değil, insan oku.',
};

export function buildChunkBContent(userInput, analysis = {}, voiceSample = '', pagesA = [], ragBlock = '', opts = {}) {
    const { anchor = '', arc = 'validation', severity = 3, pivotLocation = '' } = analysis;
    const { voicePatterns = [], palette = [], bridge = '' } = opts;

    const priorText = pagesA.map((p, i) =>
        `[SAYFA ${i + 1}: ${p.title}]\n${p.content}`
    ).join('\n\n---\n\n');

    const voiceBlock = voiceSample
        ? `━━━ KARAKTER SESİ (koru — aynı ritim, aynı ses) ━━━\n${voiceSample}\n━━━\n\n`
        : '';

    const paletteBlock = buildPaletteBlock(palette);
    const patternsBlock = voicePatterns.length
        ? `━━━ SES KALIPLARI — tüm sayfalarda bu ritmlerden en az birini kullan ━━━\n${voicePatterns.map((p, i) => `${i + 1}. ${p}`).join('\n')}\n━━━\n\n`
        : '';
    const bridgeBlock = bridge
        ? `\nKÖPRÜ — Bölüm B'nin ilk cümlesi şu anın DOĞRUDAN devamı olmalı:\n"${bridge}"\nKarakter aynı anda, aynı sahnede. Sıfırlama yok.\n`
        : '';

    const severityNote = severity >= 4
        ? `⚠️ ŞİDDET (${severity}/5): Sayfalar 5-6 ağır kalmalı. Dönüm çok erken gelirse sahte görünür.\n\n`
        : '';

    const specificityBlock = buildSpecificityBlock(analysis);

    return `Hikâyenin 5-7. sayfalarını yaz. Önceki 4 sayfa aşağıda — karakteri, sesi ve çıpayı sürdür.

${voiceBlock}${paletteBlock}${patternsBlock}${bridgeBlock}${specificityBlock}${severityNote}━━━ SÜRDÜRME KURALLARI ━━━
• Karakter adı ve sesi tutarlı kalsın — önceki sayfalardan al, yeni karakter icat etme
• ÇIPA "${anchor}": sayfalar 5-6'da ACITMALI — artık hatırlamak zor
• Pivot konumu "${pivotLocation}" sayfa 9'da kullanılacak — bu sayfalarda arka planda kalsın

━━━ YAZIM KURALLARI ━━━
DUYUSAL ENVANTER: her sayfada en az 2 farklı duyu — ses + dokunma / görme + koku / vb.
SAHNE KURALI: zaman özeti yasak — "zamanla / haftalarca / günler sonra" yok. Tek sahne, gerçek zamanlı.
CÜmle RİTMİ: kısa + uzun karıştır; her sayfada ≥1 cümle ≤8 kelime.

━━━ 3 SAYFA REHBERİ ━━━
SAYFA 5 — KÜÇÜK TANIK: Kimsenin görmediği ama karakterin fark ettiği kıpırtı. Yabancı bakışı, öğretmenin geçişi. Küçük — ama bir şey.
SAYFA 6 — ÇATIŞMANIN İÇİNDE: "Bu benim suçum değil" düşüncesi ilk kez geliyor — ama ikircikli. "Evet belki" ile "hayır muhtemelen benim hatam" aynı anda. Bu çatışma gerçek olsun.
SAYFA 7 — MÜKEMMEL OLMAYAN ADIM: Birine yazıyor, bir yetişkine gidiyor, deftere karalıyor — kırılgan, mükemmel değil.
⚠️ SAYFA 7 KURALI: Adım ÖZGÜN MİKRO-EYLEM olmalı — "cesur oldu / karar verdi / güçlü hissetti" yasak.
Tereddüt göster: ilk cümle üç kez siliniyor, elleri titreyerek, yarım bir cümle. Çatışma çözülmüyor — yalnızca bir kapı aralanıyor.

${ARC_GUIDE_CHUNK_B[arc] || ARC_GUIDE_CHUNK_B.validation}

Her sayfada: fiziksel duyum VEYA gerçek diyalog VEYA tam cümleyle iç ses. 155-195 kelime/sayfa.
━━━ YASAK ━━━
"içindeki gücü buldu" / "zamanla geçti" / "artık farklıydı" / "güçlü olduğunu anladı" / "her şey yoluna girdi" / "kanatlandı" / "dönüştü" / "umut filizlendi" / "artık güçlüydü" / "her şey değişti" / "içinde bir şeyler değişti" / "kazanmıştı" / "artık korkmuyordu" / "cesur oldu" / "korkmadan" / "korkusuzca" / "kendine söz verdi" / "doğru adımı attı"
━━━

${ragBlock}

ÖNCEKİ 4 SAYFA (karakteri buradan al — kopyalama, sürdür):
${priorText}

KULLANICININ DENEYİMİ:
"""${userInput}"""

JSON — yalnızca bunu döndür:
{"pages":[{"title":"...","content":"..."},{"title":"...","content":"..."},{"title":"...","content":"..."}]}`;
}

/* ── Bölüm C: sayfalar 8–10 ─────────────────────────────────────────────────── */

export function buildChunkCContent(userInput, analysis = {}, voiceSample = '', prevPages = [], ragBlock = '', opts = {}) {
    const { anchor = '' } = analysis;
    const { voicePatterns = [], palette = [], bridge = '' } = opts;

    const priorText = prevPages.map((p, i) =>
        `[SAYFA ${i + 5}: ${p.title}]\n${p.content}`
    ).join('\n\n---\n\n');

    const voiceBlock = voiceSample
        ? `━━━ KARAKTER SESİ (koru) ━━━\n${voiceSample}\n━━━\n\n`
        : '';

    const paletteBlock = buildPaletteBlock(palette);
    const patternsBlock = voicePatterns.length
        ? `━━━ SES KALIPLARI — tüm sayfalarda bu ritmlerden en az birini kullan ━━━\n${voicePatterns.map((p, i) => `${i + 1}. ${p}`).join('\n')}\n━━━\n\n`
        : '';
    const bridgeBlock = bridge
        ? `\nKÖPRÜ — Bölüm C'nin ilk cümlesi şu anın DOĞRUDAN devamı olmalı:\n"${bridge}"\nKarakter aynı anda, aynı sahnede. Sıfırlama yok.\n`
        : '';

    const specificityBlock = buildSpecificityBlock(analysis);

    return `Hikâyenin 8-10. sayfalarını yaz. Sayfalar 5-7 aşağıda — çıpa dönüşümünü tamamla, yolu aç.

${voiceBlock}${paletteBlock}${patternsBlock}${bridgeBlock}${specificityBlock}━━━ ÇIPA DÖNÜŞÜMÜ — bu bölümün kalbi ━━━
"${anchor}":
  Sayfalar 1-2: NÖTRDU (sıradan, tanıdık)
  Sayfalar 4-6: ACITTI (hatırlamak bile zor)
  Sayfa 9-10: DÖNÜŞMÜŞ OLMALI — aynı şey, artık farklı anlam. KÜÇÜK tut. Nutuk olmadan göster.

━━━ YAZIM KURALLARI ━━━
DUYUSAL ENVANTER: her sayfada en az 2 farklı duyu.
SAHNE KURALI: zaman özeti yasak — "zamanla / haftalarca / günler sonra" yok. Tek sahne, gerçek zamanlı.
CÜmle RİTMİ: kısa + uzun karıştır; her sayfada ≥1 cümle ≤8 kelime.

━━━ 3 SAYFA REHBERİ ━━━
SAYFA 8 — SÜRTÜNME: Sayfa 7'deki adımın beklediği gibi gitmemesi. İyileşme düz gitmez. Ama karakter tamamen geri dönmüyor — bir şey değişmiş.
SAYFA 9 — AYNI YER, FARKLI BAKIŞ: O yer, o koridor, o sınıf. Aynı kişiler. Ama içerideki ses tam olarak aynı değil. Küçük tut, gerçek tut. Zafer nutku değil. Çıpa son kez döner.
SAYFA 10 — AÇIK YOL: Mutlu son değil. Bitmemiş ama yürünebilen yol.

⚠️ SON CÜMLE KURALLARI:
Son cümle: GÖRÜNTÜ / HAREKET / SES.
Son sözcük: isim veya fiil — sıfat yasak.
Son 2 cümle: gözlemlenebilir, somut, bu karaktere özgün.
YASAK son: "öğrendi ki / artık / değişmişti / güçlüydü / yoluna girdi / barış içindeydi / anladı ki / kazanmıştı / her şey güzel olacaktı"

━━━ YASAK ━━━
"içindeki gücü buldu" / "zamanla geçti" / "artık farklıydı" / "güçlü olduğunu anladı" / "her şey yoluna girdi" / "kanatlandı" / "dönüştü" / "umut filizlendi" / "artık güçlüydü" / "her şey değişti" / "içinde bir şeyler değişti" / "kazanmıştı" / "artık korkmuyordu" / "barış içindeydi" / "kendini affetti" / "anladı ki" / "her şey güzel olacaktı" / "tebessüm etti ve iyiydi"
━━━

${ragBlock}

ÖNCEKİ 3 SAYFA (karakteri buradan al — kopyalama, sürdür):
${priorText}

KULLANICININ DENEYİMİ:
"""${userInput}"""

JSON — yalnızca bunu döndür:
{"pages":[{"title":"...","content":"..."},{"title":"...","content":"..."},{"title":"...","content":"..."}]}`;
}

/* ── Bölüm ayrıştırıcıları ──────────────────────────────────────────────────── */

export function parseChunkA(raw) {
    const pages = (raw.pages || [])
        .filter(p => p && p.content)
        .map(p => ({ title: String(p.title || '').slice(0, 80), content: String(p.content) }))
        .slice(0, 4);
    return { meta: raw, pages };
}

export function parseChunkPages(raw, expected = 3) {
    return (raw.pages || [])
        .filter(p => p && p.content)
        .map(p => ({ title: String(p.title || '').slice(0, 80), content: String(p.content) }))
        .slice(0, expected);
}

/* ── Mikro editoryal A — bölüm A temelini güçlendir ─────────────────────── */

export const MICRO_EDITORIAL_A_SYSTEM = `Sen KOZA mikro editörüsün. Hikâyenin ilk 4 sayfasının EN ZAYIF 1-2 sayfasını yeniden yazarsın.
Yalnızca JSON döndür. JSON öncesinde veya sonrasında tek karakter yazma.`;

export function buildMicroEditorialAContent(pages, analysis = {}, voiceSample = '') {
    const { anchor = '', characterBefore = '', ownPhrases = [], severity = 3 } = analysis;

    const pagesText = pages.map((p, i) =>
        `[SAYFA ${i + 1}: ${p.title}]\n${p.content}`
    ).join('\n\n---\n\n');

    const phrasesNote = ownPhrases.length
        ? `• Kullanıcının kendi ifadeleri (${ownPhrases.map(p => `"${p}"`).join(', ')}) sayfada geçiyor mu?\n`
        : '';

    return `Hikâyenin ilk 4 sayfasını değerlendir. EN ZAYIF 1-2 sayfayı tespit et ve yeniden yaz.

BAĞLAM:
• ÇIPA: "${anchor}" — Sayfa 1-2'de somut ve spesifik görünmeli (nötr ama özgün).
• KARAKTER ÖNCESİ: "${characterBefore}" — Sayfa 1'de bu kimlik spesifik gözlemlenebilmeli.
${severity >= 4 ? '• ŞİDDET yüksek (4-5/5): Sayfa 2 yeterince ağır mı? Dramayı düşür ama ağırlığı koru.\n' : ''}${phrasesNote}
KARAKTER SESİ (bu ritmi koru):
${voiceSample || '(ses şablonu yok)'}

ZAYIF SAYFA KRİTERLERİ — 2+ uyuyorsa o sayfa yeniden yazılmalı:
✗ Çıpa "${anchor}" sayfa 1-2'de yok veya çok genel
✗ "${characterBefore}" özelliği sayfa 1'de gösterilmemiş
✗ Sayfa 2: yara soyut — beden tepkisi (eller, nefes, mide, gözler) yok
✗ Tell baskın: "üzgündü / hissetti / korktu / düşündü ki" — show yok: fiziksel eylem/duyum/spesifik
✗ Karakter sesinin ritmi tutarsız (kısa-kesik cümleler mi, uzun-içe dönen mi — koru)
✗ Klişe: "içindeki gücü / zamanla geçti / kanatlandı / güçlü olduğunu anladı"

YENİDEN YAZIM KURALLARI:
• 155-195 kelime / sayfa
• Olay akışını koru — yalnızca kalite yükselt
• Değiştirme gerekmiyorsa o sayfayı JSON'a ekleme (boş array kabul)

SAYFALAR:
${pagesText}

JSON — yalnızca değiştirilen sayfalar, maksimum 2:
{"revisedPages":[{"index":0,"title":"...","content":"..."},{"index":1,"title":"...","content":"..."}]}`;
}

/* ── Bedenselleştirme geçişi — show-don't-tell rewriter ─────────────────── */

const TELL_PHRASES_SCAN = [
    'hissetti', 'hissediyordu', 'üzgündü', 'üzülmüştü', 'yalnız hissetti',
    'yalnızdı', 'korkuyordu', 'korkmuştu', 'mutluydu', 'mutlu hissetti',
    'şaşırmıştı', 'şaşırdı', 'sinirleniyordu', 'sinirli hissetti',
    'yorulmuştu', 'düşündü ki', 'fark etti ki',
];

export function needsPhysicalize(pages) {
    const allText = pages.map(p => p.content).join(' ').toLowerCase();
    const count = TELL_PHRASES_SCAN.reduce((n, phrase) =>
        n + (allText.split(phrase).length - 1), 0);
    return count >= 4;
}

export const PHYSICALIZE_SYSTEM = `Sen KOZA bedenselleştirme editörüsün. Tek görevin: hikâyede duygusal durumların ANLATILDIĞI (tell) cümleleri bedensel/fiziksel/somut karşılıklarına (show) dönüştürmek.

TELL = duygu ismiyle söyleme: "üzgündü", "yalnız hissetti", "korktu", "şaşırdı", "mutlu oldu", "düşündü ki [duygu]"
SHOW = fiziksel, gözlemlenebilir, somut: hareket, nesne, ses, beden tepkisi, özel ayrıntı

Yalnızca JSON döndür. JSON öncesinde veya sonrasında tek karakter yazma.`;

export function buildPhysicalizeContent(pages) {
    const pagesText = pages.map((p, i) =>
        `[SAYFA ${i + 1}: ${p.title}]\n${p.content}`
    ).join('\n\n---\n\n');

    return `Aşağıdaki hikâye sayfalarını tara. Her sayfada en fazla 2 "tell" cümlesini "show"a çevir.

TELL = duygusal durumun ismiyle ifadesi: "üzgündü", "yalnız hissetti", "korktu", "şaşırdı", "mutlu oldu"
SHOW = fiziksel, gözlemlenebilir, spesifik: hareket, nesne, beden, ses, somut ayrıntı

KURAL:
• Sayfa başına maksimum 2 cümle değiştir
• Sadece o cümleleri değiştir — geri kalan sayfa içeriği AYNEN korunmalı
• Sayfada zaten fiziksel duyum/eylem baskınsa o sayfayı JSON'a ekleme
• Değiştirme gerekmiyorsa boş array döndür: {"physPages":[]}
• Tam sayfa içeriğini döndür (modifiye cümlelerle, geri kalan aynı)

HIKÂYESİ:
${pagesText}

JSON — yalnızca değiştirilen sayfalar (tam sayfa içeriğiyle):
{"physPages":[{"index":0,"content":"..."},{"index":3,"content":"..."}]}`;
}

export function applyPhysicalize(pages, physRaw) {
    if (!physRaw?.physPages?.length) return pages;
    const result = [...pages];
    for (const rev of physRaw.physPages) {
        const idx = Number(rev.index);
        if (Number.isInteger(idx) && idx >= 0 && idx < result.length && rev.content) {
            result[idx] = { ...result[idx], content: String(rev.content) };
        }
    }
    return result;
}

/* ── Mikro editoryal B — dönüm noktası sayfalarını güçlendir ────────────── */

const HEROIC_B_PATTERNS = [
    'cesur oldu', 'güçlü olduğunu', 'artık biliyordu', 'doğru adımı attı',
    'korkmadan', 'korkusuzca', 'karar verdi ve', 'içindeki güç', 'kendine söz verdi',
    'her şey değiş', 'utanmadan', 'artık korkmuyordu', 'güçleniyordu',
];

export function needsMicroEditB(pagesB) {
    const page7 = pagesB?.[2];
    if (!page7?.content) return false;
    const lower = page7.content.toLowerCase();
    return HEROIC_B_PATTERNS.some(p => lower.includes(p));
}

export const MICRO_EDITORIAL_B_SYSTEM = `Sen KOZA mikro editörüsün. Hikâyenin 5-7. sayfalarının dönüm noktası sayfasını (Sayfa 7) ve gerekirse Sayfa 6'yı yeniden yazarsın.
Yalnızca JSON döndür. JSON öncesinde veya sonrasında tek karakter yazma.`;

export function buildMicroEditorialBContent(pages, analysis = {}, voiceSample = '') {
    const { anchor = '', arc = 'validation' } = analysis;

    const pagesText = pages.map((p, i) =>
        `[SAYFA ${i + 5}: ${p.title}]\n${p.content}`
    ).join('\n\n---\n\n');

    return `Hikâyenin 5-7. sayfalarını değerlendir. Özellikle SAYFA 7'yi (dönüm adımı) kontrol et ve gerekirse yeniden yaz.

BAĞLAM:
• ÇIPA: "${anchor}" — sayfa 6'da acıtıyor olmalı (nötr değil, henüz dönüşmemiş)
• Arc: ${arc}

KARAKTER SESİ (koru):
${voiceSample || '(ses şablonu yok)'}

SAYFA 7 DEĞERLENDİRME KRİTERLERİ — şunlardan biri varsa yeniden yaz:
✗ Adım heroik — "cesur oldu / karar verdi / güçlü hissetti / korkmadan"
✗ Çatışma çözüldü — sayfa 7'de çatışma bitmemiş olmalı, yalnızca bir kapı aralık
✗ Eylem genel — "birine anlattı" değil, spesifik: "telefona Elif'in adını yazdı, üç kez sildi"
✗ Tereddüt yok — gerçek adım titrek olur, mükemmel değil

SAYFA 6 DEĞERLENDİRME KRİTERLERİ — şunlardan biri varsa yeniden yaz:
✗ ÇIPA "${anchor}" sayfa 6'da yok veya çok genel
✗ İç çatışma ikircikli değil — "bu benim suçum değil" net söyleniyor olmamalı, hâlâ tartışılıyor

YENİDEN YAZIM KURALLARI:
• 155-195 kelime/sayfa
• Olay akışını koru — yalnızca kalite yükselt
• Değiştirme gerekmiyorsa o sayfayı JSON'a ekleme

SAYFALAR:
${pagesText}

JSON — yalnızca değiştirilen sayfalar (index 0=Sayfa5, 1=Sayfa6, 2=Sayfa7), max 2:
{"revisedPages":[{"index":2,"title":"...","content":"..."}]}`;
}
