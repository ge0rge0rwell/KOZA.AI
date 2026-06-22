/** Küçük, bağımsız yardımcılar. */

export const cn = (...parts) => parts.filter(Boolean).join(' ');

export const todayKey = () => new Date().toISOString().slice(0, 10);

export const formatDate = (iso) => {
    if (!iso) return '';
    const d = typeof iso === 'string' ? new Date(iso) : iso?.toDate ? iso.toDate() : iso;
    if (Number.isNaN(d?.getTime?.())) return '';
    return d.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
};

export const timeAgo = (iso) => {
    if (!iso) return '';
    const d = typeof iso === 'string' ? new Date(iso) : iso?.toDate ? iso.toDate() : iso;
    const s = Math.floor((Date.now() - d.getTime()) / 1000);
    if (s < 60) return 'az önce';
    if (s < 3600) return `${Math.floor(s / 60)} dk önce`;
    if (s < 86400) return `${Math.floor(s / 3600)} sa önce`;
    if (s < 604800) return `${Math.floor(s / 86400)} gün önce`;
    return formatDate(d);
};

export const clamp = (v, min, max) => Math.min(Math.max(v, min), max);

export const randomId = () => `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;

export const pickRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

/** Gün bazlı deterministik seçim (günlük egzersiz için). */
export const pickDaily = (arr) => {
    const day = Math.floor(Date.now() / 86_400_000);
    return arr[day % arr.length];
};

export const truncate = (text, n = 160) => {
    const t = String(text || '').trim();
    return t.length > n ? `${t.slice(0, n - 1).trimEnd()}…` : t;
};

export const plural = (n, single, multi) => (n === 1 ? single : multi);
