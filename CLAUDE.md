# CLAUDE.md — KOZA

Bu dosya, Claude Code'un bu depoda çalışırken ihtiyaç duyduğu proje bilgisini içerir.

## Proje Nedir?

**KOZA** — Empati temelli akran zorbalığı farkındalık uygulaması (TEKNOFEST 2026, "İnsanlık Yararına Teknoloji" kategorisi, Hemhal Takımı — ortaokul seviyesi).

Ortaokul öğrencileri (10–14 yaş) yaşadıkları zorbalık deneyimlerini **tamamen anonim** olarak yazar; yapay zekâ bu deneyimi **Anlatı Terapisi** (White & Epston, 1990) ilkeleriyle kullanıcıyı "mağdur" değil "kahraman" olarak konumlayan içeriklere dönüştürür:

- **Hikâye** (10 sayfalık kişisel hikâye kitabı)
- **Oyun** (3 bölümlük interaktif karar oyunu: "Kabuğu Tanımak → Işığa Yönelmek → Kanat Çırpmak")
- **Mektup** ("5 yıl sonraki kendinden" gelen mektup)

Kullanıcılar eserlerini anonim olarak toplulukla paylaşabilir, başkalarının eserlerine kalp 💜 ve "Hemhal" 🤝 (ben de yaşadım) tepkisi verebilir. Her etkinlik **ÖZ puanı** kazandırır; ÖZ biriktikçe kullanıcının kozası 7 aşamada kelebeğe dönüşür. Rehber öğretmenler **Okul Paneli** üzerinden kimliksizleştirilmiş eğilim analizlerini görür.

## Komutlar

```bash
npm run dev       # Vite geliştirme sunucusu
npm run build     # Üretim derlemesi (doğrulama için her zaman bunu çalıştır)
npm run preview   # Derlenmiş çıktıyı önizle
npm run lint      # ESLint
```

Windows + PowerShell ortamı. Test altyapısı yok; doğrulama `npm run build` ile yapılır.

## Teknoloji Yığını

- **React 19** + **Vite 7** (JSX, TypeScript YOK)
- **Tailwind CSS 4** — yapılandırma `src/index.css` içinde `@theme` / `@utility` ile (CSS-first; `tailwind.config.js` KULLANILMIYOR ve silinebilir)
- **Firebase** — Auth (anonim + Google + e-posta) ve Firestore; `vite-plugin-pwa` ile PWA
- **OpenRouter API** — Gemma 3 / Llama vb. ücretsiz modeller üzerinden Türkçe içerik üretimi
- **lucide-react** (ikonlar), **canvas-confetti** (kutlamalar), **react-ga4** (analitik)
- Yönlendirme: react-router YOK — `UIContext` içinde hash tabanlı mini router (`#/olustur` gibi)
- Durum yönetimi: XState KALDIRILDI — sade React Context'leri kullanılıyor

## Mimari

### Sağlayıcı ağacı (main.jsx)

```
ErrorBoundary → UIProvider → AuthProvider → UserProvider → StoryProvider → App
```

Sıra önemli: `UserContext` toast/kutlama için `useUI`'yi, `StoryContext` ÖZ ödülleri için `useUser`'ı kullanır.

### Rotalar (hash tabanlı, `UIContext.parseHash`)

| Rota | Sayfa |
|---|---|
| `#/` | HomePage (Panom — karşılama, yolculuk kartı, günün pratiği) |
| `#/olustur` ve `#/olustur/:tip` | CreatePage (ürünün kalbi; tip = story\|game\|letter) |
| `#/kutuphane` | LibraryPage (kişisel eserler) |
| `#/topluluk` ve `#/topluluk/:id` | CommunityPage / topluluk eseri görüntüleme |
| `#/yolculuk` | JourneyPage (7 aşama, rozetler, istatistikler) |
| `#/profil` | ProfilePage (kimlik, plan, veri indirme, rehber kodu) |
| `#/rehber` | CounselorPage (Okul Paneli — `isCounselor` korumalı) |
| `#/icerik/:id` | Kendi eserini okuma/oynama (ContentView) |

Giriş yoksa → LandingPage. Giriş var ama `profile.onboarded === false` → OnboardingPage.

### Dizin yapısı (yeni mimari)

```
src/
  main.jsx, App.jsx           # Sağlayıcı ağacı + rota anahtarı + global modallar
  index.css                   # TÜM tasarım sistemi (token'lar, utility'ler, animasyonlar)
  config/
    constants.js              # Planlar, ÖZ ödülleri, 7 aşama, kategoriler, kriz kaynakları
    prompts.js                # AI sistem istemi + hikâye/oyun/mektup istemleri
  lib/
    firebase.js               # Korumalı init; firebaseReady bayrağı (env yoksa app yine çalışır)
    db.js                     # Firestore katmanı (profil, eserler, topluluk)
    ai.js                     # OpenRouter istemcisi: model zinciri → retry → YEREL YEDEK üretici
    analytics.js              # GA4 sarmalayıcı (no-op güvenli)
    confetti.js               # Marka renkli konfeti (reduced-motion'a saygılı)
  context/
    UIContext.jsx             # Hash router, toast'lar, modallar (safety|upgrade), kutlama
    AuthContext.jsx           # Anonim öncelikli giriş; Firebase yoksa yerel demo kimliği
    UserContext.jsx           # Profil + ÖZ ekonomisi + rozet/aşama hattı + bulut eşitleme
    StoryContext.jsx          # Eserler + topluluk + kalp/hemhal/keşif etkileşimleri
  components/
    ui/                       # Button, Card, Badge, Field, Modal, ToastStack, Skeleton,
                              # EmptyState, SegmentedTabs, Avatar, Spinner, ProgressBar, Logo
    layout/AppShell.jsx       # Masaüstü kenar çubuğu + mobil üst bar + alt sekme çubuğu
    cocoon/CocoonVisual.jsx   # 7 aşamalı koza→kelebek SVG görseli (canvas yok)
    readers/                  # StoryReader, GamePlayer, LetterReader (tam ekran rotalar)
    auth/AuthModal.jsx        # Anonim öncelikli giriş modalı
    ShareDialog.jsx           # Anonim topluluk paylaşımı onayı
    ErrorBoundary.jsx
  pages/                      # Landing, Onboarding, Home, Create, Library, Community,
                              # Journey, Profile (+ Counselor, ContentView — bkz. durum)
  utils/
    helpers.js                # cn, todayKey, formatDate, timeAgo, truncate, pickDaily…
    safety.js                 # detectCrisis (Türkçe kriz kalıpları), maskProfanity
    validation.js             # validateExperience (25–2500 karakter)
    stages.js                 # stageFor, stageProgress, ozToNext, stageTransition
    achievements.js           # 13 rozet + findNewAchievements
    pseudonyms.js             # Kelebek adı üretici + avatar emoji/renk havuzları
  hooks/useSpeech.js          # Türkçe TTS (speechSynthesis)
```

### Veri modeli

**Firestore:**
- `users/{uid}/data/profile` — profil belgesi (aşağıdaki şema)
- `users/{uid}/creations/{id}` — kişisel eserler (ham `userInput` dahil; ÖZELDİR)
- `community/{id}` — paylaşılan eserler: `{ type, title, preview, category, themeColor, pages|levels|letter, authorPseudonym, authorEmoji, authorColor, ownerUid, hearts, hugs, reads, heartedBy[], huggedBy[], reports, createdAt }`

**Profil şeması:** `{ pseudonym, emoji, color, totalOz, dailyStreak, lastVisit, storiesCreated, gamesCreated, lettersCreated, worksExplored, heartsGiven, hugsGiven, sharesCount, achievements[], plan: 'free'|'plus'|'school', role: 'student'|'counselor', onboarded, creationsToday: {date,count}, joinedAt }`

**localStorage anahtarları:** `koza-profile`, `koza-creations`, `koza-community-local` (Firebase yoksa), `koza-interactions` (`{hearted[], hugged[], read[]}`), `koza-local-user` (demo kimlik).

Çevrimdışı/Firebase'siz mod birinci sınıf vatandaştır: her şey localStorage ile çalışır, bulut varsa eşitlenir.

### Oyunlaştırma (ÖZ ekonomisi)

- Ödüller `config/constants.js > OZ_REWARDS` içinde: hikâye +120, oyun +100, mektup +80, paylaşım +40, keşif +15, kalp +5, hemhal +10, günlük ziyaret +10, onboarding +50.
- 7 aşama eşiği: 0 / 200 / 500 / 1000 / 2000 / 4000 / 8000 ÖZ (`STAGES`).
- Tüm profil güncellemeleri `UserContext.applyUpdate` tek hattından geçer: rozet kontrolü → rozet ÖZ'ü → aşama geçişi kutlaması → kalıcılık. ÖZ verirken bu hattı atlama.

### AI katmanı (`lib/ai.js`)

- Model zinciri: env `VITE_OPENROUTER_MODEL` → `google/gemma-3-27b-it:free` → Llama → Mistral; model başına 2 deneme, 75 sn zaman aşımı.
- Çıktı her zaman JSON; `extractJSON` + tür bazlı normalize ediciler şemayı garantiler (oyunda her bölümde tam 1 doğru seçenek zorlanır).
- **Tüm yollar başarısız olursa asla hata gösterme** — `localGenerate` özenle yazılmış yerel içerik döner (`source: 'local'`), kullanıcıya nazik bir bilgi toast'u gösterilir.

## Tasarım Sistemi ("Metamorfoz")

- **Renkler** (index.css `@theme`): `primary` = Iris moru (#6A52DC ana eylem), `accent` = Bal/amber (#E29A28 — ÖZ ve kelebek sıcaklığı), `neutral` = sıcak kum tonları (#FAF9F7 zemin), semantik success/danger/info.
- **Yazı**: Manrope (UI, 400–800) + Lora (hikâye/mektup okuma, `reader-prose` sınıfı). Google Fonts, index.html'de preconnect'li.
- **Bileşen dili**: kartlar `card` utility (beyaz, 20px radius, yumuşak gölge), birincil butonlar pill (rounded-full), alanlar 14px radius. Gölgeler `--shadow-soft/card/lift/pop`.
- **Hareket**: `animate-rise-in`, `animate-scale-in`, `animate-modal-in`, `stagger-children`, `animate-page-turn`; easing `--ease-out-soft` / `--ease-spring`. `prefers-reduced-motion` desteği zorunlu.
- **Arka plan**: `ambient-bg` (iki yumuşak gradyan blob) + `grain` utility. Dikkat dağıtıcı efekt yok.
- Skeleton'lar (`skeleton` utility, `GridSkeleton`), boş durumlar (`EmptyState`) ve yükleme durumları her listede zorunlu.

## Değişmez Kurallar (İHLAL ETME)

1. **Dil**: Tüm kullanıcıya görünen metin **Türkçe** (sıcak "sen" dili, 10–14 yaşa uygun). Kod/yorumlar Türkçe veya İngilizce olabilir; mevcut dosyalar Türkçe yorum kullanıyor.
2. **Gizlilik**: Ham deneyim metni (`userInput`) **asla** topluluğa/`community` koleksiyonuna yazılmaz — yalnızca dönüştürülmüş eser paylaşılır (`StoryContext.shareCreation` buna uyar). Gerçek isim/fotoğraf hiçbir yerde gösterilmez; herkes takma ad (kelebek adı) taşır.
3. **Güvenlik**: Üretimden önce `detectCrisis` çalışır; kriz algılanırsa üretim DURUR ve kullanıcı Destek kaynaklarına yönlendirilir (CreatePage'deki `CrisisCard`). AI istemleri teşhis/terapi taklidi/intikam içeremez. `SAFETY_DISCLAIMER` görünür kalmalı.
4. **Dayanıklılık**: Uygulama Firebase ve/veya OpenRouter anahtarı olmadan da TAM çalışmalı (yerel kimlik + localStorage + yerel içerik üretici). Yeni özellik eklerken bu yolu kırma.
5. **ÖZ bütünlüğü**: ÖZ/rozet/aşama mantığını bileşenlerde elle hesaplama — `UserContext.awardOz/bump/applyUpdate` ve `utils/stages.js` kullan.

## Monetizasyon

`PLANS` (constants.js): **Filiz** (ücretsiz, günde 3 dönüşüm — `creationsLeft` ile zorlanır, dolunca yumuşak paywall kartı), **KOZA Plus** (₺39/ay, sınırsız + ayrıcalıklar), **KOZA Okul** (rehber paneli + okul analizi). Gerçek ödeme YOK — UpgradeModal sahte tahsilatla planı değiştirir (demo). Rehber paneli erişimi: `COUNSELOR_EMAILS` veya erişim kodu `KOZA-OKUL-2026` (ProfilePage'den girilir → `role: 'counselor'`).

## Ortam Değişkenleri (.env — git'e GİRMEZ)

```
VITE_FIREBASE_API_KEY / AUTH_DOMAIN / PROJECT_ID / STORAGE_BUCKET / MESSAGING_SENDER_ID / APP_ID
VITE_GA_MEASUREMENT_ID
VITE_OPENROUTER_API_KEY        # AI üretimi için
VITE_OPENROUTER_MODEL          # opsiyonel model override
```

Hepsi opsiyoneldir (bkz. Dayanıklılık kuralı). `config.js` içine anahtar gömme.

## Yeniden Yapılanma Durumu (2026-06)

Depo, eski prototipten üretim kalitesine **tam yeniden yazım** sürecinde. Git geçmişinde `Baseline:` commit'i eski hâli saklar.

**Tamamlanan:** tasarım sistemi (index.css), config, lib, utils, hooks, 4 context, ui/layout/cocoon/readers/auth bileşenleri, Landing/Onboarding/Home/Create/Library/Community/Journey/Profile sayfaları, ShareDialog, ErrorBoundary.

**Kalan işler:**
1. `pages/CounselorPage.jsx` (Okul Paneli: kategori dağılımı, haftalık eğilim, risk görünümü — `community` verisinden kimliksizleştirilmiş; boşsa demo veri yükleme düğmesi)
2. Global modallar: `SafetyModal` (kriz kaynakları + nefes egzersizi), `UpgradeModal` (plan kartları + sahte tahsilat), `StageCelebration` (aşama kutlaması)
3. `pages/ContentView.jsx` (#/icerik/:id) ve topluluk eseri görüntüleme (#/topluluk/:id) — reader'lara bağlanır; toplulukta `markExplored` ÖZ ödülü
4. Yeni `App.jsx` + `main.jsx` (lazy route'lar, sağlayıcı ağacı, modallar)
5. Eski kodun silinmesi: `components/galaxy|optics|uiverse|input|admin`, eski `layout/(Header|Sidebar|BottomNav|BottomMenu|MainLayout)`, `machines/`, eski `context/(AppContext|GlobalStateMachineContext)`, `tabs/`, `views/`, `domain/`, `services/`, eski `utils/(analytics|googleAnalytics|localAnalytics|errorTracker|performance|accessibility|userPresence)`, `styles/`, `theme.css`, eski cocoon stages/particles, `router/`, `pages/HomePage` eski hali zaten değişti, `tailwind.config.js`, `src/config.js`, `src/assets/react.svg`, `Onboarding.jsx|SkeletonLoader.jsx|Toast.jsx` (kökteki eskiler), `components/auth/LoginForm.*`, `components/ui/KozaLoader.*`
6. `npm uninstall xstate @xstate/react` + `npm run build` yeşil + README + final commit

## Bilinen Tuzaklar

- PowerShell 5.1: `&&` çalışmaz; komutları `;` ile zincirle.
- Tailwind 4'te utility'ler `@utility` ile tanımlanır; `@apply` bilinmeyen sınıfla derleme hatası verir — token'ları `var(--color-…)` ile kullan.
- `Modal` body scroll kilidi koyar; iç içe modal açma.
- Firestore güvenlik kuralları depoda DEĞİL — dağıtımda Firebase konsolundan ayarlanmalı (README'ye eklenecek): kullanıcı yalnız kendi `users/{uid}` ağacına yazabilmeli; `community` okuma herkese, yazma kimliği doğrulanmışa, alan bazlı doğrulamayla.
