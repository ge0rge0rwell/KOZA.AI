/**
 * KOZA AI katmanı — OpenRouter üzerinden Gemma/Llama modelleri.
 * Dayanıklılık: model zinciri → yeniden deneme → zaman aşımı → yerel üretici.
 * Uygulama hiçbir koşulda "bozuk" hissettirmez.
 */
import { SYSTEM_PROMPT, STORY_PROMPT, GAME_PROMPT, LETTER_PROMPT } from '../config/prompts';
import { CATEGORY_KEYS, THEME_COLORS } from '../config/constants';
import { LOCAL_STORY_PAGES, LOCAL_GAME_LEVELS, LOCAL_LETTER } from '../config/seedContent';

const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
const BASE_URL = 'https://openrouter.ai/api/v1/chat/completions';

const MODEL_CHAIN = [
    import.meta.env.VITE_OPENROUTER_MODEL,
    'google/gemma-3-27b-it:free',
    'meta-llama/llama-3.3-70b-instruct:free',
    'mistralai/mistral-small-3.1-24b-instruct:free',
].filter(Boolean);

const REQUEST_TIMEOUT = 75_000;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/* ---------------- Önbellek ---------------- */
const cache = new Map();
const CACHE_TTL = 10 * 60 * 1000;

const cacheKey = (mode, input) => `${mode}:${input.trim().toLowerCase().slice(0, 200)}`;

const getCached = (key) => {
    const hit = cache.get(key);
    if (hit && Date.now() - hit.t < CACHE_TTL) return hit.v;
    cache.delete(key);
    return null;
};

const setCached = (key, v) => {
    if (cache.size > 40) cache.delete(cache.keys().next().value);
    cache.set(key, { v, t: Date.now() });
};

/* ---------------- JSON ayıklama ---------------- */
const extractJSON = (text) => {
    let cleaned = String(text).replace(/```json/gi, '').replace(/```/g, '').trim();
    const start = cleaned.indexOf('{');
    const end = cleaned.lastIndexOf('}');
    if (start === -1 || end === -1) throw new Error('Yanıtta JSON bulunamadı');
    cleaned = cleaned.slice(start, end + 1);
    try {
        return JSON.parse(cleaned);
    } catch {
        // Sondaki virgüller gibi yaygın model hatalarını onar
        return JSON.parse(cleaned.replace(/,\s*([}\]])/g, '$1'));
    }
};

/* ---------------- API çağrısı ---------------- */
const callModel = async (model, userContent) => {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

    try {
        const res = await fetch(BASE_URL, {
            method: 'POST',
            signal: controller.signal,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${API_KEY}`,
                'HTTP-Referer': 'https://koza-app.vercel.app',
                'X-Title': 'KOZA',
            },
            body: JSON.stringify({
                model,
                messages: [
                    { role: 'system', content: SYSTEM_PROMPT },
                    { role: 'user', content: userContent },
                ],
                temperature: 0.85,
                max_tokens: 8192,
            }),
        });

        if (!res.ok) throw new Error(`API ${res.status}`);
        const data = await res.json();
        const content = data?.choices?.[0]?.message?.content;
        if (!content) throw new Error('Boş yanıt');
        return extractJSON(content);
    } finally {
        clearTimeout(timer);
    }
};

const callAI = async (prompt, userInput, onStage) => {
    if (!API_KEY) throw new Error('NO_KEY');
    const userContent = `${prompt}\n\nKULLANICININ DENEYİMİ:\n"""${userInput}"""`;
    let lastError;

    for (const model of MODEL_CHAIN) {
        for (let attempt = 0; attempt < 2; attempt++) {
            try {
                return await callModel(model, userContent);
            } catch (e) {
                lastError = e;
                if (e.name === 'AbortError') break; // zaman aşımı → sıradaki model
                await sleep(800 * (attempt + 1));
            }
        }
        onStage?.('Başka bir kanat deneniyor…');
    }
    throw lastError || new Error('AI kullanılamıyor');
};

/* ---------------- Normalizasyon ---------------- */
const pickTheme = (c) => (THEME_COLORS.includes(c) ? c : THEME_COLORS[0]);
const pickCategory = (c) => (CATEGORY_KEYS.includes(c) ? c : 'diger');

const baseMeta = (raw, fallbackTitle) => ({
    title: (raw.title || fallbackTitle).slice(0, 60),
    category: pickCategory(raw.category),
    themeColor: pickTheme(raw.themeColor),
    reflectionQuestion: raw.reflectionQuestion || 'Bu deneyim sana kendi gücün hakkında ne fısıldıyor?',
    growthLesson: raw.growthLesson || 'Zorluklar hikâyenin sonu değil, kozanın bir evresidir.',
});

const normalizeStory = (raw) => {
    const pages = (raw.pages || [])
        .filter((p) => p && p.content)
        .map((p) => ({ title: String(p.title || '').slice(0, 80), content: String(p.content) }));
    if (pages.length < 4) throw new Error('Hikâye eksik geldi');
    return { ...baseMeta(raw, 'Dönüşüm Hikâyesi'), type: 'story', pages };
};

const normalizeGame = (raw) => {
    const levels = (raw.levels || [])
        .filter((l) => l && l.scenario && Array.isArray(l.options) && l.options.length >= 2)
        .map((l, i) => ({
            name: l.name || ['Kabuğu Tanımak', 'Işığa Yönelmek', 'Kanat Çırpmak'][i] || `Bölüm ${i + 1}`,
            scenario: String(l.scenario),
            options: l.options.slice(0, 4).map((o) => ({
                text: String(o.text || ''),
                isCorrect: Boolean(o.isCorrect),
                feedback: String(o.feedback || ''),
            })),
        }));
    if (!levels.length) throw new Error('Oyun eksik geldi');
    // Her bölümde tam bir doğru cevap garantisi
    levels.forEach((l) => {
        if (!l.options.some((o) => o.isCorrect)) l.options[0].isCorrect = true;
    });
    return { ...baseMeta(raw, 'İçsel Güç Labirenti'), type: 'game', levels };
};

const normalizeLetter = (raw) => {
    const letter = raw.letter || {};
    const paragraphs = (letter.paragraphs || []).map(String).filter(Boolean);
    if (paragraphs.length < 3) throw new Error('Mektup eksik geldi');
    return {
        ...baseMeta(raw, 'Gelecekten Bir Mektup'),
        type: 'letter',
        letter: {
            greeting: letter.greeting || 'Sevgili Ben,',
            paragraphs,
            signature: letter.signature || '— Gelecekteki Sen',
            ps: letter.ps || 'Kanatların düşündüğünden daha güçlü.',
        },
    };
};

/* ---------------- Yerel yedek üretici (çevrimdışı dayanıklılık) ---------------- */
const localGenerate = (mode) => {
    const meta = {
        reflectionQuestion: 'Bu hikâyedeki kahramanın en güçlü anı sence hangisiydi — ve o güç sende de var mı?',
        growthLesson: 'Destek istemek zayıflık değil, kendi hikâyenin yazarı olmaktır.',
        themeColor: '#6A52DC',
        category: 'diger',
        source: 'local',
    };
    if (mode === 'story') {
        return { ...meta, type: 'story', title: 'Kozanın İçindeki Işık', pages: LOCAL_STORY_PAGES.map(([title, content]) => ({ title, content })) };
    }
    if (mode === 'game') {
        return { ...meta, type: 'game', title: 'İçsel Güç Labirenti', levels: LOCAL_GAME_LEVELS };
    }
    return { ...meta, type: 'letter', title: 'Gelecekten Bir Mektup', letter: LOCAL_LETTER };
};

/* ---------------- Genel API ---------------- */
const PROMPTS = { story: STORY_PROMPT, game: GAME_PROMPT, letter: LETTER_PROMPT };
const NORMALIZERS = { story: normalizeStory, game: normalizeGame, letter: normalizeLetter };

/**
 * Deneyimi seçilen türde içeriğe dönüştürür.
 * Asla reddetmez: AI erişilemezse özenle yazılmış yerel içerik döner (source: 'local').
 */
export const generateContent = async (mode, userInput, onStage) => {
    const key = cacheKey(mode, userInput);
    const cached = getCached(key);
    if (cached) return cached;

    try {
        onStage?.('Deneyimin okunuyor…');
        const raw = await callAI(PROMPTS[mode], userInput, onStage);
        onStage?.('Kanatlar şekilleniyor…');
        const result = { ...NORMALIZERS[mode](raw), source: 'ai' };
        setCached(key, result);
        return result;
    } catch (e) {
        console.warn('AI üretimi başarısız, yerel üreticiye geçildi:', e?.message);
        return localGenerate(mode);
    }
};

export const aiAvailable = () => Boolean(API_KEY);
