/**
 * Anonim kimlik üretici — KOZA'nın gizlilik sözünün temeli.
 * Gerçek isim yerine herkes bir "kelebek adı" taşır.
 */
import { pickRandom } from './helpers';

const ADJECTIVES = [
    'Mavi', 'Mor', 'Gümüş', 'Altın', 'Turkuaz', 'Lavanta', 'Mercan', 'Safir',
    'Sessiz', 'Cesur', 'Parlak', 'Nazik', 'Bilge', 'Özgür', 'Sakin', 'Işıltılı',
    'Gece', 'Şafak', 'Bahar', 'Yıldız', 'Bulut', 'Rüzgâr', 'Okyanus', 'Kuzey',
];

const NOUNS = [
    'Kelebek', 'Kanat', 'Koza', 'Işık', 'Atmaca', 'Serçe', 'Anka', 'Yaprak',
    'Nehir', 'Dağ', 'Çiçek', 'Tohum', 'Pusula', 'Fener', 'Gökkuşağı', 'Kıvılcım',
];

export const AVATAR_EMOJIS = ['🦋', '🌷', '🌿', '🌙', '⭐', '🐦', '🌊', '🔥', '🍀', '🌸', '🪁', '🎈'];

export const AVATAR_COLORS = ['#6A52DC', '#8470E8', '#C97A1C', '#E29A28', '#34955D', '#3C8DC5', '#B45BC9', '#E11D48'];

export const generatePseudonym = () => `${pickRandom(ADJECTIVES)} ${pickRandom(NOUNS)}`;

export const randomAvatar = () => ({
    emoji: pickRandom(AVATAR_EMOJIS),
    color: pickRandom(AVATAR_COLORS),
});
