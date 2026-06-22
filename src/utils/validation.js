/** Deneyim girdisi doğrulama. */

import { detectInappropriate } from './safety';

const MIN_LENGTH = 25;
const MAX_LENGTH = 2500;

export const validateExperience = (input) => {
    const value = String(input || '').trim();

    if (!value) return { ok: false, error: 'Önce yaşadığını birkaç cümleyle anlat.' };
    if (value.length < MIN_LENGTH)
        return { ok: false, error: `Biraz daha ayrıntı ekler misin? En az ${MIN_LENGTH} karakter gerekli — ne oldu, nerede oldu, sana ne hissettirdi?` };
    if (value.length > MAX_LENGTH)
        return { ok: false, error: `Metin çok uzun (en fazla ${MAX_LENGTH} karakter). Önemli kısımları seçerek kısaltabilir misin?` };

    const unique = new Set(value.replace(/\s/g, '')).size;
    if (unique < 8) return { ok: false, error: 'Bu metin pek anlamlı görünmüyor. Yaşadığını kendi cümlelerinle anlatmayı dener misin?' };

    return { ok: true, value };
};

export const EXPERIENCE_LIMITS = { MIN_LENGTH, MAX_LENGTH };

/* ---------------------------------------------------------------------------
 * Takma ad (kullanıcı adı) doğrulama
 * ------------------------------------------------------------------------- */

const USERNAME_MIN = 2;
const USERNAME_MAX = 20;
// İzin verilen: harfler (Türkçe dahil), rakam, boşluk, tire, kesme işareti, nokta, alt çizgi
const USERNAME_ALLOWED = /^[\p{L}\p{N} ._'-]+$/u;

export const validateUsername = (input) => {
    const value = String(input || '').trim().replace(/\s+/g, ' ');

    if (!value) return { ok: false, error: 'Bir takma ad yaz ya da rastgele bir tane öner.' };
    if (value.length < USERNAME_MIN) return { ok: false, error: `Takma ad en az ${USERNAME_MIN} karakter olmalı.` };
    if (value.length > USERNAME_MAX) return { ok: false, error: `Takma ad en fazla ${USERNAME_MAX} karakter olabilir.` };
    if (!USERNAME_ALLOWED.test(value)) return { ok: false, error: 'Yalnızca harf, rakam ve boşluk kullanabilirsin.' };
    if ((value.match(/\p{L}/gu) || []).length < 2) return { ok: false, error: 'Takma adında en az iki harf olmalı.' };
    if (detectInappropriate(value)) return { ok: false, error: 'Bu ad uygun değil. Lütfen kibar bir takma ad seç. 💜' };

    return { ok: true, value };
};

export const USERNAME_LIMITS = { MIN: USERNAME_MIN, MAX: USERNAME_MAX };
