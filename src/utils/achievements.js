/** Rozet sistemi — profil istatistiklerinden türetilir. */

export const ACHIEVEMENTS = [
    { id: 'ilk_adim', name: 'İlk Adım', desc: 'KOZA yolculuğuna başla', icon: '🌱', oz: 50, check: (p) => p.onboarded },
    { id: 'ilk_hikaye', name: 'İlk Hikâye', desc: 'İlk hikâyeni oluştur', icon: '📖', oz: 50, check: (p) => p.storiesCreated >= 1 },
    { id: 'ilk_oyun', name: 'İlk Oyun', desc: 'İlk oyununu oluştur', icon: '🎮', oz: 50, check: (p) => p.gamesCreated >= 1 },
    { id: 'ilk_mektup', name: 'İlk Mektup', desc: 'Gelecekten ilk mektubunu al', icon: '💌', oz: 50, check: (p) => p.lettersCreated >= 1 },
    { id: 'hikaye_ustasi', name: 'Hikâye Ustası', desc: '5 hikâye oluştur', icon: '✨', oz: 200, check: (p) => p.storiesCreated >= 5 },
    { id: 'paylasimci', name: 'Cesur Kalp', desc: 'İlk eserini toplulukla paylaş', icon: '🕊️', oz: 100, check: (p) => p.sharesCount >= 1 },
    { id: 'kasif', name: 'Kâşif', desc: 'Topluluktan 5 eser keşfet', icon: '🧭', oz: 100, check: (p) => p.worksExplored >= 5 },
    { id: 'destekci', name: 'Destekçi', desc: '10 esere kalp gönder', icon: '💜', oz: 100, check: (p) => p.heartsGiven >= 10 },
    { id: 'hemhal', name: 'Hemhal', desc: 'İlk kez "Ben de yaşadım" de', icon: '🤝', oz: 75, check: (p) => p.hugsGiven >= 1 },
    { id: 'seri_3', name: 'Kararlı', desc: '3 gün üst üste gel', icon: '🔥', oz: 75, check: (p) => p.dailyStreak >= 3 },
    { id: 'seri_7', name: 'Sarsılmaz', desc: '7 gün üst üste gel', icon: '⚡', oz: 200, check: (p) => p.dailyStreak >= 7 },
    { id: 'caprak_catladi', name: 'Çatlayan Kabuk', desc: '3. aşamaya ulaş', icon: '🌟', oz: 150, check: (p) => p.totalOz >= 500 },
    { id: 'kelebek', name: 'Görkemli Kelebek', desc: 'Son aşamaya ulaş', icon: '🦋', oz: 500, check: (p) => p.totalOz >= 8000 },
];

/** Yeni kazanılan rozetleri döner. */
export const findNewAchievements = (profile, unlocked = []) =>
    ACHIEVEMENTS.filter((a) => !unlocked.includes(a.id) && a.check(profile));

export const achievementById = (id) => ACHIEVEMENTS.find((a) => a.id === id);
