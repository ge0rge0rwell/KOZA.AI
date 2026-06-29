/**
 * KOZA AI katmanı — OpenRouter üzerinden Gemma/Llama modelleri.
 * Dayanıklılık: model zinciri → yeniden deneme → zaman aşımı → yerel üretici.
 * Uygulama hiçbir koşulda "bozuk" hissettirmez.
 */
import { SYSTEM_PROMPT, GAME_PROMPT, LETTER_PROMPT } from '../config/prompts';
import { CATEGORY_KEYS, THEME_COLORS } from '../config/constants';
import { LOCAL_STORY_PAGES, LOCAL_GAME_LEVELS, LOCAL_LETTER } from '../config/seedContent';
import { detectCategory, buildFewShotBlock, retrieveFragmentsByMoments } from './storyRag';
import {
    ARCHITECTURE_SYSTEM, buildArchitectureContent, parseArchitecture,
    EDITORIAL_SYSTEM, buildEditorialContent, applyEditorial, hasForbiddenPhrases,
    VOICE_SYSTEM, buildVoiceContent, parseVoice,
    buildChunkAContent, buildChunkBContent, buildChunkCContent, parseChunkA, parseChunkPages,
    GAME_ARCHITECTURE_SYSTEM, buildGameArchitectureContent, parseGameArchitecture, buildGameInjectionBlock,
    LETTER_ARCHITECTURE_SYSTEM, buildLetterArchitectureContent, parseLetterArchitecture, buildLetterInjectionBlock,
    LETTER_EDITORIAL_SYSTEM, buildLetterEditorialContent, applyLetterEditorial,
    MICRO_EDITORIAL_A_SYSTEM, buildMicroEditorialAContent,
    needsPhysicalize, PHYSICALIZE_SYSTEM, buildPhysicalizeContent, applyPhysicalize,
    needsMicroEditB, MICRO_EDITORIAL_B_SYSTEM, buildMicroEditorialBContent,
    parseVoicePatterns, extractBridgeSentence,
} from './storyIntelligence';

const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
const BASE_URL = 'https://openrouter.ai/api/v1/chat/completions';

const MODEL_CHAIN = [
    import.meta.env.VITE_OPENROUTER_MODEL,
    'google/gemma-3-27b-it:free',
    'meta-llama/llama-3.3-70b-instruct:free',
    'mistralai/mistral-7b-instruct:free',
    'nousresearch/hermes-3-llama-3.1-405b:free',
].filter(Boolean);

const REQUEST_TIMEOUT = 75_000;
const ARCH_TIMEOUT = 25_000;   // mimari çağrı kısadır
const EDIT_TIMEOUT = 45_000;   // editoryal 2-3 sayfa yazar
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
const callModel = async (model, userContent, systemPrompt = SYSTEM_PROMPT, timeout = REQUEST_TIMEOUT, temperature = 0.85) => {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeout);

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
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: userContent },
                ],
                temperature,
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

/** Standart hikâye/oyun/mektup üretimi — SYSTEM_PROMPT + PROMPTS[mode] + ekstra bloklar */
const callAI = async (prompt, userInput, onStage, extraBlock = '', temperature = 0.92) => {
    if (!API_KEY) throw new Error('NO_KEY');
    const userContent = `${prompt}${extraBlock}\n\nKULLANICININ DENEYİMİ:\n"""${userInput}"""`;
    let lastError;

    for (const model of MODEL_CHAIN) {
        for (let attempt = 0; attempt < 2; attempt++) {
            try {
                return await callModel(model, userContent, SYSTEM_PROMPT, REQUEST_TIMEOUT, temperature);
            } catch (e) {
                lastError = e;
                if (e.name === 'AbortError') break;
                await sleep(800 * (attempt + 1));
            }
        }
        onStage?.('Başka bir kanat deneniyor…');
    }
    throw lastError || new Error('AI kullanılamıyor');
};

/** Farklı sistem promptu ve zaman aşımıyla çağrı — mimari/editoryal geçişler için */
const callAIRaw = async (systemPrompt, userContent, onStage, timeout = REQUEST_TIMEOUT, temperature = 0.85) => {
    if (!API_KEY) throw new Error('NO_KEY');
    let lastError;

    for (const model of MODEL_CHAIN) {
        for (let attempt = 0; attempt < 2; attempt++) {
            try {
                return await callModel(model, userContent, systemPrompt, timeout, temperature);
            } catch (e) {
                lastError = e;
                if (e.name === 'AbortError') break;
                await sleep(600 * (attempt + 1));
            }
        }
        onStage?.('Analiz devam ediyor…');
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

/**
 * Deneyimi seçilen türde içeriğe dönüştürür.
 * Asla reddetmez: AI erişilemezse özenle yazılmış yerel içerik döner (source: 'local').
 *
 * Hikâye modu — 3 aşamalı boru hattı:
 *   1. Mimari çağrı  → çıpa / metafor / ters-çevirme / yay tipi / şiddet skoru
 *   2. Üretim çağrısı → RAG + mimari enjeksiyonu ile zenginleştirilmiş hikâye
 *   3. Editoryal geçiş → 2 zayıf sayfa yeniden yazılır, son cümle görüntü zorlanır
 * Her aşama bağımsız try/catch: herhangi biri düşerse hat kırılmaz.
 */
export const generateContent = async (mode, userInput, onStage) => {
    const key = cacheKey(mode, userInput);
    const cached = getCached(key);
    if (cached) return cached;

    try {
        /* ── HİKÂYE — 5 aşamalı bölümlü boru hattı ──────────────────────────── */
        if (mode === 'story') {
            // AŞAMA 1 — Deneyim mimarisi
            onStage?.('Deneyimin derinliği ölçülüyor…');
            let analysis = null;

            try {
                const archRaw = await callAIRaw(
                    ARCHITECTURE_SYSTEM,
                    buildArchitectureContent(userInput),
                    onStage,
                    ARCH_TIMEOUT,
                    0.65,
                );
                analysis = parseArchitecture(archRaw);
            } catch (archErr) {
                console.warn('Mimari analiz atlandı:', archErr?.message);
            }

            // AŞAMA 2 — Ses çıkarımı
            let voiceSample = '';
            let voicePatterns = [];
            if (analysis) {
                onStage?.('Karakterin sesi şekilleniyor…');
                try {
                    const voiceRaw = await callAIRaw(
                        VOICE_SYSTEM,
                        buildVoiceContent(analysis),
                        onStage,
                        ARCH_TIMEOUT,
                        0.88,
                    );
                    voiceSample = parseVoice(voiceRaw);
                    voicePatterns = parseVoicePatterns(voiceRaw);
                } catch (voiceErr) {
                    console.warn('Ses çıkarımı atlandı:', voiceErr?.message);
                }
            }

            // Moment-matched RAG için kategori
            let storyCategory = 'diger';
            try { storyCategory = detectCategory(userInput); } catch { /* sessiz */ }

            const storyOpts = { voicePatterns, palette: analysis?.palette || [] };

            // AŞAMA 3 — Bölüm A: sayfalar 1–4 + meta
            onStage?.('Hikâyen örülüyor… (1/3)');
            const ragA = buildFewShotBlock(
                retrieveFragmentsByMoments(userInput, storyCategory, ['world_before', 'the_moment', 'night_after'], 2)
            );
            const rawA = await callAIRaw(
                SYSTEM_PROMPT,
                buildChunkAContent(userInput, analysis || {}, voiceSample, ragA, storyOpts),
                onStage,
                REQUEST_TIMEOUT,
                0.92,
            );
            const { meta: metaA, pages: pagesARaw } = parseChunkA(rawA);
            if (pagesARaw.length < 3) throw new Error('Bölüm A eksik geldi');

            // AŞAMA 3b — Bölüm A mikro-editöryal: temeli B'ye geçmeden önce güçlendir
            let pagesA = pagesARaw;
            if (analysis && voiceSample) {
                onStage?.('Temel sayfalar güçlendiriliyor…');
                try {
                    const microRaw = await callAIRaw(
                        MICRO_EDITORIAL_A_SYSTEM,
                        buildMicroEditorialAContent(pagesA, analysis, voiceSample),
                        onStage,
                        EDIT_TIMEOUT,
                        0.72,
                    );
                    pagesA = applyEditorial(pagesA, microRaw);
                } catch (microErr) {
                    console.warn('Mikro editoryal A atlandı:', microErr?.message);
                }
            }

            // AŞAMA 4 — Bölüm B: sayfalar 5–7
            onStage?.('Hikâyen örülüyor… (2/3)');
            const bridgeAB = extractBridgeSentence(pagesA);
            const ragB = buildFewShotBlock(
                retrieveFragmentsByMoments(userInput, storyCategory, ['body_next_day', 'inner_conflict', 'imperfect_step'], 2)
            );
            const rawB = await callAIRaw(
                SYSTEM_PROMPT,
                buildChunkBContent(userInput, analysis || {}, voiceSample, pagesA, ragB, { ...storyOpts, bridge: bridgeAB }),
                onStage,
                REQUEST_TIMEOUT,
                0.92,
            );
            let pagesB = parseChunkPages(rawB, 3);

            // AŞAMA 4b — Bölüm B mikro-editöryal: dönüm noktasını C'ye geçmeden önce güçlendir
            if (needsMicroEditB(pagesB) && analysis && voiceSample) {
                onStage?.('Dönüm noktası güçlendiriliyor…');
                try {
                    const microBRaw = await callAIRaw(
                        MICRO_EDITORIAL_B_SYSTEM,
                        buildMicroEditorialBContent(pagesB, analysis, voiceSample),
                        onStage,
                        EDIT_TIMEOUT,
                        0.72,
                    );
                    pagesB = applyEditorial(pagesB, microBRaw);
                } catch (microBErr) {
                    console.warn('Mikro editoryal B atlandı:', microBErr?.message);
                }
            }

            // AŞAMA 5 — Bölüm C: sayfalar 8–10
            onStage?.('Hikâyen örülüyor… (3/3)');
            const bridgeBC = extractBridgeSentence(pagesB);
            const ragC = buildFewShotBlock(
                retrieveFragmentsByMoments(userInput, storyCategory, ['connection', 'open_road'], 2)
            );
            const rawC = await callAIRaw(
                SYSTEM_PROMPT,
                buildChunkCContent(userInput, analysis || {}, voiceSample, pagesB.length >= 2 ? pagesB : pagesA.slice(-3), ragC, { ...storyOpts, bridge: bridgeBC }),
                onStage,
                REQUEST_TIMEOUT,
                0.92,
            );
            const pagesC = parseChunkPages(rawC, 3);

            // Birleştir
            let allPages = [...pagesA, ...pagesB, ...pagesC]
                .filter(p => p && p.content)
                .slice(0, 10);
            if (allPages.length < 4) throw new Error('Hikâye eksik geldi');

            // AŞAMA 6 — Bedenselleştirme geçişi: tell→show (yalnızca gerektiğinde)
            if (needsPhysicalize(allPages)) {
                onStage?.('Duyular keskinleşiyor…');
                try {
                    const physRaw = await callAIRaw(
                        PHYSICALIZE_SYSTEM,
                        buildPhysicalizeContent(allPages),
                        onStage,
                        EDIT_TIMEOUT,
                        0.75,
                    );
                    allPages = applyPhysicalize(allPages, physRaw);
                } catch (physErr) {
                    console.warn('Bedenselleştirme geçişi atlandı:', physErr?.message);
                }
            }

            let normalized = {
                ...baseMeta(metaA, 'Dönüşüm Hikâyesi'),
                type: 'story',
                pages: allPages,
            };

            // AŞAMA 7 — Editoryal kalite geçişi
            if (analysis || hasForbiddenPhrases(normalized.pages)) {
                onStage?.('Son dokunuşlar yapılıyor…');
                const editAnalysis = analysis || {
                    anchor: '', characterBefore: '', ownPhrases: [],
                    arc: 'validation', severity: 3, dominantMetaphor: null,
                    pivotLocation: '', inversion: '', titleSeed: '',
                };
                try {
                    const editRaw = await callAIRaw(
                        EDITORIAL_SYSTEM,
                        buildEditorialContent(normalized.pages, editAnalysis),
                        onStage,
                        EDIT_TIMEOUT,
                        0.72,
                    );
                    normalized = { ...normalized, pages: applyEditorial(normalized.pages, editRaw) };
                } catch (editErr) {
                    console.warn('Editoryal geçiş atlandı:', editErr?.message);
                }
            }

            const result = { ...normalized, source: 'ai' };
            setCached(key, result);
            return result;
        }

        /* ── OYUN — mimari kalibrasyonu + üretim ────────────────────────────────── */
        if (mode === 'game') {
            onStage?.('Deneyimin okunuyor…');
            let gameAnalysis = null;
            let gameInjection = '';

            try {
                const archRaw = await callAIRaw(
                    GAME_ARCHITECTURE_SYSTEM,
                    buildGameArchitectureContent(userInput),
                    onStage,
                    ARCH_TIMEOUT,
                    0.65,
                );
                gameAnalysis = parseGameArchitecture(archRaw);
                gameInjection = buildGameInjectionBlock(gameAnalysis);
            } catch (archErr) {
                console.warn('Oyun mimarisi atlandı:', archErr?.message);
            }

            onStage?.('Senaryolar oluşturuluyor…');
            const rawGame = await callAI(GAME_PROMPT, userInput, onStage, gameInjection, 0.92);
            onStage?.('Kanatlar şekilleniyor…');
            const gameResult = { ...normalizeGame(rawGame), source: 'ai' };
            setCached(key, gameResult);
            return gameResult;
        }

        /* ── MEKTUP — mimari kişiselleştirme + üretim + editoryal ──────────────── */
        {
            onStage?.('Deneyimin okunuyor…');
            let letterAnalysis = null;
            let letterInjection = '';

            try {
                const archRaw = await callAIRaw(
                    LETTER_ARCHITECTURE_SYSTEM,
                    buildLetterArchitectureContent(userInput),
                    onStage,
                    ARCH_TIMEOUT,
                    0.65,
                );
                letterAnalysis = parseLetterArchitecture(archRaw);
                letterInjection = buildLetterInjectionBlock(letterAnalysis);
            } catch (archErr) {
                console.warn('Mektup mimarisi atlandı:', archErr?.message);
            }

            onStage?.('Mektup yazılıyor…');
            const rawLetter = await callAI(LETTER_PROMPT, userInput, onStage, letterInjection, 0.88);
            let normalizedLetter = normalizeLetter(rawLetter);

            if (letterAnalysis) {
                onStage?.('Son dokunuşlar yapılıyor…');
                try {
                    const editRaw = await callAIRaw(
                        LETTER_EDITORIAL_SYSTEM,
                        buildLetterEditorialContent(normalizedLetter.letter, letterAnalysis),
                        onStage,
                        EDIT_TIMEOUT,
                        0.72,
                    );
                    normalizedLetter = { ...normalizedLetter, letter: applyLetterEditorial(normalizedLetter.letter, editRaw) };
                } catch (editErr) {
                    console.warn('Mektup editoryal geçiş atlandı:', editErr?.message);
                }
            }

            const letterResult = { ...normalizedLetter, source: 'ai' };
            setCached(key, letterResult);
            return letterResult;
        }

    } catch (e) {
        console.warn('AI üretimi başarısız, yerel üreticiye geçildi:', e?.message);
        return localGenerate(mode);
    }
};

export const aiAvailable = () => Boolean(API_KEY);
