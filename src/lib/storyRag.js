/**
 * KOZA Anlatı RAG — Geri Alma Motoru
 *
 * Kullanıcının yapılandırılmış deneyim metninden kategori + duygu profili çıkarır,
 * seed kütüphanesinden en uygun 2 fragmenti seçer ve few-shot blok döndürür.
 *
 * Vektör DB yoktur — kural tabanlı puanlama, sıfır ek maliyet, çevrimdışı çalışır.
 */

import { SEED_FRAGMENTS } from '../config/seedFragments';

/* ── Duygu anahtar kelimeleri ──────────────────────────────────────────────── */

const EMOTION_KEYWORDS = {
  yalnizlik: [
    'yalnız', 'yalnızlık', 'kimse', 'dışlandı', 'dışlandım', 'gruptan',
    'tek başına', 'kabul etmedi', 'kabul edilmedim', 'yok saydı', 'yok sayıldım',
    'görmezden', 'katılmama', 'çıkardılar', 'uzaklaştılar', 'konuşmadı', 'konuşmuyorlar',
  ],
  utanc: [
    'utandım', 'utanç', 'utanıyorum', 'herkes gördü', 'herkes duydu',
    'rezil', 'alay', 'güldüler', 'mahcup', 'baktılar', 'fark etti', 'fark ettiler',
    'yüzüm kızardı', 'küçüldüm', 'mahcup hissettim',
  ],
  ofke: [
    'kızgın', 'kızgınım', 'sinirli', 'sinirleniyorum', 'nefret',
    'haksız', 'adaletsiz', 'öfke', 'öfkeli', 'kızıyorum', 'sinirimi',
    'dayanamıyorum', 'içime işliyor',
  ],
  caresizlik: [
    'çaresiz', 'çaresizlik', 'yapamıyorum', 'ne yapacağımı bilmiyorum',
    'yoruldum', 'bıktım', 'anlayamıyorum', 'bitik', 'artık yapamıyorum',
    'çıkış yolu', 'nasıl yapacağım',
  ],
  korku: [
    'korkuyorum', 'korkuttu', 'korkutucu', 'tehdit', 'her gün bekliyorum',
    'ne yapacak', 'ne yapacağını bilmiyorum', 'endişeleniyorum',
    'tedirgin', 'güvende hissetmiyorum', 'gözüm arkada',
  ],
  uzuntu: [
    'üzgün', 'üzüntü', 'ağladım', 'ağlıyorum', 'kötü hissediyorum',
    'moralim bozuk', 'mutsuz', 'içim sıkışıyor', 'hüzün', 'gözyaşı',
    'kendimi kötü', 'acıtıyor', 'içim acıyor',
  ],
};

/* ── Kategori anahtar kelimeleri ───────────────────────────────────────────── */

const CATEGORY_KEYWORDS = {
  dislanma: [
    'dışladı', 'dışlandım', 'dahil etmedi', 'gruba almadı', 'yer vermedi',
    'konuşmadı', 'yok saydı', 'yok saydılar', 'katılmama', 'kabul etmedi',
    'grup sohbeti', 'sohbetten çıkardı', 'seçmedi', 'arkadaş grubu',
  ],
  alay: [
    'güldüler', 'alay etti', 'alay ettiler', 'lakap', 'takma ad', 'dalga',
    'mimik', 'taklit', 'imite', 'küçük düşürdü', 'rezil etti', 'utandırdı',
    'herkesin önünde', 'sınıfın önünde',
  ],
  siber: [
    'sosyal medya', 'instagram', 'whatsapp', 'tiktok', 'twitter', 'snapchat',
    'internet', 'telefon mesajı', 'mesaj attı', 'paylaştı', 'ekran', 'online',
    'yorum', 'fotoğraf paylaştı', 'video', 'hesap', 'sayfam', 'profil',
  ],
  fiziksel: [
    'itti', 'vurdu', 'tekmeledi', 'çarptı', 'yaralandı', 'dövdü', 'saldırdı',
    'eşyama zarar', 'çantamı', 'kırdı', 'yırttı', 'dokundu', 'tuttu',
  ],
  soylenti: [
    'dedikodu', 'söylenti', 'yalan', 'yaydı', 'anlattı', 'konuştular',
    'herkese söyledi', 'herkese anlattı', 'uydurdu', 'yanlış bir şey',
    'duydum ki', 'duydular', 'kulağa gitmiş',
  ],
  tehdit: [
    'tehdit', 'korkuttu', 'yaparsam', 'söylersen', 'yoksa', 'bekle',
    'göreceksin', 'sesini çıkarırsan', 'ödedirtirim', 'hesaplaşırız',
  ],
};

/* ── Yardımcı fonksiyonlar ─────────────────────────────────────────────────── */

/** Yapılandırılmış inputtan belirli bir alan çıkar */
function extractField(text, fieldName) {
  // "NE OLDU:\n...\n\nKİM VARDI" gibi yapıdan alanı çıkar
  const escaped = fieldName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const pattern = new RegExp(escaped + '[:\\s]*([\\s\\S]*?)(?=\\n[\\w\\sÇĞİÖŞÜçğışöüA-Z]{2,20}:\\n|\\n\\n[A-ZÇĞİÖŞÜ]|$)');
  const match = text.match(pattern);
  return match ? match[1].trim() : '';
}

/** Metinden duygu profili çıkar — skor bazlı, sıralı */
function detectEmotions(text) {
  const lower = (text || '').toLowerCase();
  const scores = {};
  for (const [emotion, keywords] of Object.entries(EMOTION_KEYWORDS)) {
    scores[emotion] = keywords.filter((kw) => lower.includes(kw)).length;
  }
  return Object.entries(scores)
    .filter(([, score]) => score > 0)
    .sort(([, a], [, b]) => b - a)
    .map(([emotion]) => emotion);
}

/** Metinden kategori tespit et */
export function detectCategory(userInput) {
  const target = (extractField(userInput, 'NE OLDU') + ' ' + userInput).toLowerCase();
  const scoredCats = Object.entries(CATEGORY_KEYWORDS).map(([cat, kws]) => ({
    cat,
    score: kws.filter((kw) => target.includes(kw)).length,
  }));
  const best = scoredCats.sort((a, b) => b.score - a.score)[0];
  return best && best.score > 0 ? best.cat : 'diger';
}

/** Fragment'i verilen kategori ve duygulara göre puan ver */
function scoreFragment(fragment, category, emotions) {
  let score = 0;

  // Kategori eşleşmesi en ağır faktör
  if (fragment.category === category) score += 6;
  // Diger fragmentler her zaman zayıf evrensel katkı sağlar
  if (fragment.category === 'diger') score += 1;

  // Duygu etiket örtüşmesi — ilk 2 duygu daha önemli
  emotions.slice(0, 2).forEach((em, idx) => {
    if (fragment.emotionTags.includes(em)) score += 3 - idx;
  });
  emotions.slice(2).forEach((em) => {
    if (fragment.emotionTags.includes(em)) score += 1;
  });

  // Hikâye anı çeşitliliği bonusu: her moment bir kez temsil edilsin
  // (Bu later de-duplication ile sağlanır)

  return score;
}

/* ── Ana API ───────────────────────────────────────────────────────────────── */

/**
 * Kullanıcı inputundan en uygun fragment'leri getirir.
 *
 * @param {string} userInput  Yapılandırılmış deneyim metni
 * @param {string} category   Algılanan kategori (detectCategory() ile)
 * @param {number} count      Döndürülecek fragment sayısı (varsayılan: 2)
 * @returns {Array}           Seçilen fragment nesneleri
 */
export function retrieveFragments(userInput, category, count = 2) {
  // Duygu profilini çıkar — his alanına öncelik ver
  const feelingsText = extractField(userInput, 'NASIL HİSSETTİRDİ')
    || extractField(userInput, 'NEDEN ZOR GELDİ')
    || userInput;
  const emotions = detectEmotions(feelingsText + ' ' + extractField(userInput, 'NE OLDU'));

  // Tüm fragment'leri puan sırasına koy
  const scored = SEED_FRAGMENTS
    .map((f) => ({ f, score: scoreFragment(f, category, emotions) }))
    .sort((a, b) => b.score - a.score);

  // Hikâye anı çeşitliliği: aynı storyMoment'ten 2 kez alma
  const selected = [];
  const usedMoments = new Set();

  for (const { f } of scored) {
    if (selected.length >= count) break;
    if (!usedMoments.has(f.storyMoment)) {
      selected.push(f);
      usedMoments.add(f.storyMoment);
    }
  }

  // count'a ulaşılamadıysa çeşitlilik kısıtı olmadan doldur
  if (selected.length < count) {
    for (const { f } of scored) {
      if (selected.length >= count) break;
      if (!selected.includes(f)) selected.push(f);
    }
  }

  return selected;
}

/**
 * Seçilen fragment'lerden prompt'a enjekte edilecek few-shot bloğu oluşturur.
 *
 * @param {Array} fragments  retrieveFragments() çıktısı
 * @returns {string}         Prompt'a eklenecek metin bloğu
 */
export function buildFewShotBlock(fragments) {
  if (!fragments || !fragments.length) return '';

  const examples = fragments
    .map(
      (f, i) =>
        `KALİTE ÖRNEĞİ ${i + 1} — "${f.title}":\n${f.content}`
    )
    .join('\n\n---\n\n');

  return `\n\n━━━ KALİTE ÇITASI — BU KATEGORİ İÇİN REFERANS SAYFALAR ━━━
(Bu örneklerin duygusal hassasiyetini, göster-anlatma tekniğini ve fiziksel gerçekliğini referans al.
İçerik ve karakterler tamamen kullanıcının özgün deneyimine dayalı olmalı — bu sayfaları kopyalama.)

${examples}

━━━ KALİTE REFERANSI SONU ━━━\n`;
}

/**
 * Belirtilen hikâye anlarına göre filtreli fragment getirme.
 * Her bölüm (A/B/C) kendi anlarına uyan referansları alır.
 *
 * @param {string}   userInput
 * @param {string}   category   detectCategory() çıktısı
 * @param {string[]} moments    İstenen storyMoment etiketleri
 * @param {number}   count
 */
export function retrieveFragmentsByMoments(userInput, category, moments, count = 2) {
  const feelingsText = extractField(userInput, 'NASIL HİSSETTİRDİ')
    || extractField(userInput, 'NEDEN ZOR GELDİ')
    || userInput;
  const emotions = detectEmotions(feelingsText + ' ' + extractField(userInput, 'NE OLDU'));

  const momentSet = new Set(moments);
  const candidates = SEED_FRAGMENTS.filter(f => momentSet.has(f.storyMoment));

  // Moment kümesinde fragment yoksa genel kütüphaneye dön
  if (!candidates.length) return retrieveFragments(userInput, category, count);

  const scored = candidates
    .map(f => ({ f, score: scoreFragment(f, category, emotions) }))
    .sort((a, b) => b.score - a.score);

  const selected = [];
  const usedMoments = new Set();

  for (const { f } of scored) {
    if (selected.length >= count) break;
    if (!usedMoments.has(f.storyMoment)) {
      selected.push(f);
      usedMoments.add(f.storyMoment);
    }
  }

  if (selected.length < count) {
    for (const { f } of scored) {
      if (selected.length >= count) break;
      if (!selected.includes(f)) selected.push(f);
    }
  }

  return selected;
}
