# KOZA — Teknik Mimari ve Uygulama Belgesi

**Proje:** KOZA — Empati Temelli Akran Zorbalığı Farkındalık Platformu  
**Versiyon:** 3.0.0  
**Kategori:** TEKNOFEST 2026 — İnsanlık Yararına Teknoloji  
**Ekip:** Hemhal Takımı  
**Tarih:** Haziran 2026

---

## İÇİNDEKİLER

1. [Projeye Genel Bakış](#1-projeye-genel-bakış)
2. [Tasarım Felsefesi ve Psikolojik Çerçeve](#2-tasarım-felsefesi-ve-psikolojik-çerçeve)
3. [Teknoloji Yığını ve Gerekçeler](#3-teknoloji-yığını-ve-gerekçeler)
4. [Sistem Mimarisi](#4-sistem-mimarisi)
5. [Provider Ağacı ve State Yönetimi](#5-provider-ağacı-ve-state-yönetimi)
6. [Hash Tabanlı Yönlendirme Sistemi](#6-hash-tabanlı-yönlendirme-sistemi)
7. [Firebase Entegrasyonu ve Çevrimdışı-Öncelikli Mimari](#7-firebase-entegrasyonu-ve-çevrimdışı-öncelikli-mimari)
8. [Yapay Zekâ Katmanı](#8-yapay-zekâ-katmanı)
9. [Anlatı Zekâsı Motoru (StoryIntelligence)](#9-anlatı-zekâsı-motoru-storyintelligence)
10. [RAG Sistemi (StoryRag)](#10-rag-sistemi-storryrag)
11. [ÖZ Ekonomisi ve Oyunlaştırma](#11-öz-ekonomisi-ve-oyunlaştırma)
12. [Güvenlik Katmanı](#12-güvenlik-katmanı)
13. [Veri Modeli](#13-veri-modeli)
14. [Bileşen Mimarisi](#14-bileşen-mimarisi)
15. [Tasarım Sistemi — Metamorfoz](#15-tasarım-sistemi--metamorfoz)
16. [PWA ve Servis Çalışanı](#16-pwa-ve-servis-çalışanı)
17. [Analitik ve Gözlemlenebilirlik](#17-analitik-ve-gözlemlenebilirlik)
18. [Güvenlik, Gizlilik ve KVKK](#18-güvenlik-gizlilik-ve-kvkk)
19. [Dağıtım Mimarisi](#19-dağıtım-mimarisi)
20. [Performans ve Ölçeklenebilirlik](#20-performans-ve-ölçeklenebilirlik)
21. [Test ve Kalite Güvencesi](#21-test-ve-kalite-güvencesi)
22. [Gelecek Yol Haritası](#22-gelecek-yol-haritası)

---

## 1. Projeye Genel Bakış

KOZA, 10–14 yaş ortaokul öğrencilerine yönelik geliştirilmiş, empati temelli bir akran zorbalığı farkındalık platformudur. Uygulamanın özünde tek bir fikir yatmaktadır: bir çocuk yaşadığı zorbalık deneyimini anlattığında, yapay zekâ bu deneyimi Anlatı Terapisi ilkeleriyle işleyerek çocuğu mağdur değil, kendi hikâyesinin kahramanı konumuna taşıyan özgün içerikler üretir.

Bu içerikler üç biçimde sunulur:

- **Hikâye:** On sayfalık, yalnızca o çocuğun deneyiminden doğabilecek kadar özgün, edebi kalitede kişisel anlatı.
- **Oyun:** Üç bölümlük interaktif karar oyunu. Bölümler sırasıyla "Kabuğu Tanımak", "Işığa Yönelmek" ve "Kanat Çırpmak" olarak adlandırılmıştır; her bölümde çocuk zorlu anlarda farklı seçimler yaparak empati ve direnç becerilerini pekiştirir.
- **Mektup:** Beş yıl sonraki "gelecekteki sen"den bugünkü sana yazılmış, umut ve güç dolu kişisel bir mektup.

Oluşturulan eserler anonim olarak toplulukla paylaşılabilir. Diğer kullanıcılar paylaşılan eserlere 💜 (kalp) ve 🤝 (Hemhal — ben de yaşadım) tepkileri verebilir. Her etkileşim ÖZ puanı kazandırır. Biriken ÖZ, kullanıcının dijital kozasını yedi aşamada kelebeğe dönüştürür. Rehber öğretmenler ise okul panosundan kimliksizleştirilmiş eğilim analizlerine erişebilir.

Projenin teknik altyapısı dört temel ilke üzerine inşa edilmiştir:

1. **Dayanıklılık:** Uygulama Firebase ve OpenRouter olmaksızın da tam işlevselliğini korur.
2. **Gizlilik:** Ham deneyim metni hiçbir zaman sunucuya gönderilmez; yalnızca dönüştürülmüş eser paylaşılır.
3. **Güvenlik:** Kriz içeriği tespit edildiğinde üretim anında durur, kullanıcı gerçek destek kaynaklarına yönlendirilir.
4. **ÖZ bütünlüğü:** Puan ve aşama mantığı tek bir merkezi kanaldan akar; bileşen düzeyinde elle hesaplama yapılmaz.

---

## 2. Tasarım Felsefesi ve Psikolojik Çerçeve

### 2.1 Anlatı Terapisi (White & Epston, 1990)

KOZA'nın içerik üretim motoru, Michael White ve David Epston'ın 1990 yılında geliştirdiği Anlatı Terapisi yaklaşımına dayanmaktadır. Bu terapötik çerçevenin özü şudur: insanlar yaşadıkları deneyimlere anlam katarak "egemen hikâyeler" oluştururlar. Zorbalık yaşayan çocuklarda bu egemen hikâye çoğunlukla "ben kurbanim, ben zayıfım, bu benim suçum" biçiminde şekillenir.

Anlatı Terapisi bu egemen hikâyeyi "dışsallaştırma" tekniğiyle yeniden yazar: problem kişinin kendisi değil, dışarıdan gelen bir deneyimdir. Çocuk bu deneyimi yaşayan biri değil, bu deneyimi aşan bir kahraman olarak konumlandırılır.

KOZA bunu algoritmik düzeyde hayata geçirir. Sistem istemi açıkça şunu söyler:

> "Kullanıcı 'zorbalık mağduru' değil — henüz kendi gücünü keşfedememiş, bu deneyimi yaşayan gerçek bir insan. Dil her zaman bunu yansıtır. 'Mağdur', 'kurban', 'ezilen' gibi etiketler yasak."

Bu ilke yalnızca dil tercihiyle sınırlı değildir. Anlatı yapısı da bu felsefeye göre kurgulanmıştır: her hikâye "çıpa" tekniğini kullanır — çocuğun anlattıklarından tek bir somut nesne, yer ya da söz seçilir ve bu çıpa hikâye boyunca üç kez farklı bağlamlarda döner. Her dönüşte anlamı değişir; ilk başta ağırlık simgesi olan şey, sonda güce dönüşür.

### 2.2 Yaş Grubu Tasarım İlkeleri

Hedef kitle 10–14 yaş ortaokul öğrencileridir. Bu yaş grubuna özel bazı tasarım kararları alınmıştır:

**Dil:** Tüm arayüz metinleri sıcak "sen" diliyle yazılmıştır. Teknik terimler, akademik dil ve yetişkin tonlaması kaçınılmıştır. Cümleler kısa tutulmuş, okunabilirlik ön planda tutulmuştur.

**Anonimlik:** Uygulamada gerçek isim veya fotoğraf kullanılmaz. Her kullanıcı rastgele üretilen bir "kelebek adı" ve emoji+renk kombinasyonuyla temsil edilir. Bu tasarım kararı hem mahremiyeti korumakta hem de sosyal karşılaştırmayı önlemektedir.

**Güvenlik:** Kriz içeriği — intihar, kendine zarar verme, şiddet — yapay zekâya hiç gönderilmez. Tespit anında üretim durur ve kullanıcı gerçek destek hatlarına yönlendirilir. Bu karar, teknik bir zorunluluk olarak kodun en erken katmanında uygulanmaktadır.

**Etkileşim tasarımı:** Oyunlaştırma unsurları (ÖZ puanı, aşamalar, rozetler) motivasyon için kullanılmış; ancak bunların kendi başına amaç hâline gelmesinden kaçınılmıştır. Her ödül gerçek bir etkileşime karşılık gelir — içerik oluşturma, toplulukla paylaşma, başka bir çocuğun eserine destek verme.

### 2.3 "Hemhal" Kavramı

"Hemhal" kelimesi Türkçede "birlikte olmak, aynı hâli paylaşmak" anlamına gelir. Uygulamada bu kavram, birinin eserine "ben de yaşadım" demek olarak somutlaştırılmıştır. Kalp tepkisi sempati ifadesidir; Hemhal tepkisi ise deneyimi paylaşmaktır. Bu ayrım kasıtlıdır: çocuklar yalnız olmadıklarını somut biçimde hissedebilmelidir.

---

## 3. Teknoloji Yığını ve Gerekçeler

### 3.1 Temel Kütüphaneler

| Teknoloji | Versiyon | Gerekçe |
|-----------|----------|---------|
| React | 19.2.0 | Concurrent Mode, yeni `use` hook'u, daha iyi Suspense desteği |
| Vite | 7.2.4 | Anlık HMR, ESM-öncelikli bundling, PWA eklenti ekosistemi |
| Tailwind CSS | 4.1.18 | CSS-first konfigürasyon (`@theme`), JIT derlemesi, sıfır çalışma zamanı |
| Firebase | 12.7.0 | Auth + Firestore; modüler SDK, tree-shakeable |
| lucide-react | 0.562.0 | Tree-shakeable SVG ikonlar, tutarlı stroke kalınlığı |
| canvas-confetti | 1.9.4 | Hafif, GPU-hızlandırmalı konfeti efekti |
| react-ga4 | 2.1.0 | GA4 entegrasyonu, no-op güvenli sarmalayıcı |
| vite-plugin-pwa | 1.2.0 | Workbox tabanlı servis çalışanı, önbellekleme stratejisi |

### 3.2 Neden React Router Kullanılmadı?

KOZA'nın yönlendirme ihtiyacı, tam teşekküllü bir router kütüphanesi gerektirmiyor. Sekiz rota, salt okunur URL parametresi, tarayıcı geçmişi ve scroll sıfırlama — bunların tamamı `UIContext` içindeki otuz satırlık hash-router ile karşılanıyor.

React Router eklenmesi `bundle` boyutunu gereksiz artırır, `<BrowserRouter>` için sunucu taraflı yönlendirme ayarı gerektirir ve bu projede hiçbir zaman ihtiyaç duyulmayacak lazy route splitting karmaşıklığı getirir. Hash tabanlı yönlendirme ise GitHub Pages ve Vercel gibi statik hosting hizmetlerinde sıfır sunucu yapılandırmasıyla çalışır.

### 3.3 Neden XState Kaldırıldı?

Projenin ilk prototipinde durum makineleri XState ile yönetiliyordu. Ancak uygulama olgunlaştıkça XState'in getirdiği soyutlama katmanı, faydasından çok karmaşıklık yaratmaya başladı:

- Her bağlam için ayrı makine tanımı; bu tanımlar zamanla bakımı güç devasa dosyalara dönüştü.
- React ve XState arasındaki köprü kodu (`@xstate/react`) gereksiz yeniden render'lara yol açıyordu.
- Durum geçişlerini takip etmek, sade React state kullanmaktan çok daha zordu.

Yeniden yazım sürecinde dört adet sade `useReducer` + `useContext` kombinasyonu bunu tamamen karşıladı. Paket bağımlılıklarından `xstate` ve `@xstate/react` kaldırıldı.

### 3.4 Neden TypeScript Kullanılmadı?

Bu bir tercih değil, pratik bir karardır. Proje TEKNOFEST kapsamında hızlı iterasyonla geliştirilmiştir. TypeScript eklemek, mevcut JSX bileşenlerinin tamamında tip tanımı gerektirirdi — bu da ikinci projeye eşdeğer bir iş yüküdür. Uygulamanın hedef kitlesine etkisi sıfırdır; derleme doğrulaması `npm run build` ile sağlanmaktadır.

### 3.5 Tailwind CSS 4'ün Farkları

Tailwind CSS 4, `tailwind.config.js` yerine `src/index.css` içindeki `@theme` direktifiyle konfigüre edilir. Bu "CSS-first" yaklaşım birkaç önemli fark getirir:

```css
@theme {
  --color-primary-500: #6A52DC;
  --font-manrope: 'Manrope', sans-serif;
  --radius-card: 20px;
}
```

Bu değişkenler artık hem Tailwind sınıflarında hem de sade CSS `var()` çağrılarında kullanılabilir. `@apply` direktifi ise yalnızca `@layer` veya `@utility` içinde tanımlı sınıflarla çalışır — bilinmeyen sınıfla derleme hatası verir. Bu nedenle bileşen kodu sınıf adları yerine `var(--color-primary-500)` biçiminde CSS değişkenlerini doğrudan kullanır.

---

## 4. Sistem Mimarisi

### 4.1 Genel Yapı

KOZA tek sayfalık uygulama (SPA) mimarisindedir. Sunucu yalnızca statik dosya sunar; tüm iş mantığı istemci tarafında çalışır. Firebase güvenlik kuralları veri erişimini katmanlı biçimde korur.

```
┌─────────────────────────────────────────────────────┐
│                     Tarayıcı                        │
│                                                     │
│  ┌──────────────────────────────────────────────┐   │
│  │              React SPA (Vite)               │   │
│  │                                              │   │
│  │  Provider Ağacı                             │   │
│  │  UIContext → AuthContext → UserContext →    │   │
│  │  StoryContext → App                         │   │
│  │                                              │   │
│  │  Sayfalar (lazy-loaded)                     │   │
│  │  Landing | Onboarding | Home | Create |     │   │
│  │  Library | Community | Journey | Profile |  │   │
│  │  Counselor | ContentView | CommunityItem    │   │
│  └──────────────────────────────────────────────┘   │
│                      │                              │
│         ┌────────────┴────────────┐                 │
│         │                        │                  │
│  ┌──────▼──────┐        ┌────────▼────────┐        │
│  │  Firebase   │        │  OpenRouter API  │        │
│  │  Auth + DB  │        │  (AI üretimi)    │        │
│  └─────────────┘        └──────────────────┘        │
│         │                                           │
│  ┌──────▼──────┐                                    │
│  │ localStorage │  (çevrimdışı mod + yedek)         │
│  └─────────────┘                                    │
└─────────────────────────────────────────────────────┘
```

### 4.2 Katmanlı Dayanıklılık Modeli

KOZA üç katmanlı dayanıklılık modeliyle çalışır:

**Katman 1 — Bulut (Firebase + OpenRouter aktif):** Tam işlevsellik. Gerçek kimlik doğrulama, bulut veri eşitleme, AI üretimi, gerçek topluluk paylaşımı.

**Katman 2 — Yarı-çevrimdışı (Firebase aktif, OpenRouter yok):** Kimlik doğrulama ve veri eşitleme çalışır. AI üretimi yerel içerik üreticisiyle karşılanır; kullanıcıya nazik bir bilgi bildirimi gösterilir.

**Katman 3 — Tamamen çevrimdışı (her ikisi de yok):** Yerel anonim kimlik (`koza-local-user`), localStorage tabanlı profil ve eserler, tohumlanmış topluluk verisi. Kullanıcı için işlevsellik kayıpsızdır; yalnızca veri başka cihazlara eşitlenmez.

---

## 5. Provider Ağacı ve State Yönetimi

### 5.1 Hiyerarşi ve Bağımlılıklar

```jsx
// main.jsx
<ErrorBoundary>
  <UIProvider>          // Route, toast, modal, kutlama
    <AuthProvider>      // Kullanıcı kimliği
      <UserProvider>    // Profil, ÖZ, rozet, aşama
        <StoryProvider> // Eserler, topluluk, etkileşimler
          <App />
        </StoryProvider>
      </UserProvider>
    </AuthProvider>
  </UIProvider>
</ErrorBoundary>
```

Sıralama kritiktir. `UserContext`, toast göstermek için `useUI()` kullanır — bu nedenle `UIProvider` dışarıda olmalıdır. `StoryContext`, ÖZ ödülü vermek için `useUser()` kullanır — bu nedenle `UserProvider` dışarıda olmalıdır. `AuthContext`, `UIContext`'e bağımlı değildir; ancak oturum bilgisinin diğer tüm context'lere erken ulaşması için hiyerarşinin üstünde tutulmuştur.

### 5.2 UIContext — Arayüz Orkestratörü

`UIContext` dört ayrı sorumluluğu tek bir context altında toplar:

**Yönlendirme:** `window.location.hash` dinlenir; değişiklikte `parseHash()` çağrılır ve `{ path, param }` çifti state'e yazılır. `navigate(to)` fonksiyonu hash'i günceller; tarayıcının `hashchange` olayı tetikler; bu da state güncellemesini başlatır. Döngüsel değil — her değişiklik tek yönlüdür.

**Toast bildirimleri:** Maksimum dört toast aynı anda görünür (`prev.slice(-3)` yeni bildirim eklemeden önce eski bildirimleri kırpar). Her toast 4.2 saniye sonra otomatik kapanır. `toastTimers` ref'i, bileşen unmount edildiğinde temizlenmesi gereken timer'ları takip eder. Erken kapatma desteklenir: `dismissToast(id)` hem state'den hem timer map'inden siler.

**Modal yönetimi:** Tek bir `activeModal` state değeri (`'safety' | 'upgrade' | 'auth' | null`) tüm global modalleri kontrol eder. İç içe modal açılması mimari düzeyde engellenmiştir — yalnızca bir modal aynı anda aktif olabilir.

**Kutlama sistemi:** `celebrate(stage)` çağrısı `StageCelebration` bileşenini tetikler. Kutlama bittikten sonra `endCelebration()` state'i sıfırlar.

```javascript
// UIContext.jsx — parseHash fonksiyonu
const parseHash = () => {
    const raw = window.location.hash.replace(/^#\/?/, '');
    const [path = '', param = ''] = raw.split('/');
    const known = ['', 'olustur', 'kutuphane', 'topluluk', 'yolculuk', 'profil', 'rehber', 'icerik'];
    if (!known.includes(path)) return { path: '', param: '' };
    return { path, param: decodeURIComponent(param) };
};
```

Bilinmeyen rotalar `{ path: '', param: '' }` döndürür — bu da Ana Sayfa'ya düşmesi anlamına gelir. Derin bağlantı saldırılarına karşı koruma sağlar.

### 5.3 AuthContext — Kimlik Doğrulama

`AuthContext` iki moda sahiptir:

**Firebase modu** (`firebaseReady === true`): `onAuthStateChanged` dinleyicisi başlatılır. Firebase kullanıcı objesi normalize edilerek (`uid`, `email`, `displayName`, `photoURL`, `isAnonymous`) state'e yazılır. Anonim giriş, Google popup ve e-posta/şifre desteklenir.

**Yerel demo modu** (`firebaseReady === false`): `signInAnonymously` yerine rastgele `local-{id}` biçiminde bir kullanıcı objesi oluşturulur ve `localStorage`'a yazılır. Sayfa yenilendiğinde `loadLocalUser()` bu değeri okur. Yerel kullanıcıda `local: true` bayrağı vardır; diğer context'ler bu bayrağa bakarak bulut işlemlerini atlar.

Tüm Firebase işlemleri `run()` sarmalayıcısından geçer:

```javascript
const run = useCallback(async (fn, eventName) => {
    try {
        await fn();
        analytics.event('login', { method: eventName });
        return { ok: true };
    } catch (e) {
        return { ok: false, error: friendlyError(e) };
    }
}, []);
```

`AUTH_ERRORS` nesnesi Firebase hata kodlarını Türkçe mesajlara çevirir. Bilinmeyen kodlar için genel geri dönüş metni kullanılır.

### 5.4 UserContext — Profil ve ÖZ Ekonomisi

`UserContext`'in en kritik parçası `applyUpdate` fonksiyonudur. Profili güncelleyen her işlem bu fonksiyondan geçmek zorundadır:

```javascript
const applyUpdate = useCallback((updater, { silent = false } = {}) => {
    setProfile((prev) => {
        let next = typeof updater === 'function' ? updater(prev) : { ...prev, ...updater };

        // Rozet kontrolü
        const fresh = findNewAchievements(next, next.achievements);
        if (fresh.length) {
            next = {
                ...next,
                achievements: [...next.achievements, ...fresh.map((a) => a.id)],
                totalOz: next.totalOz + fresh.reduce((s, a) => s + a.oz, 0),
            };
            if (!silent) fresh.forEach((a) => addToast('achievement', ...));
        }

        // Aşama geçişi
        const newStage = stageTransition(prev.totalOz, next.totalOz);
        if (newStage && !silent) celebrate(newStage);

        return next;
    });
}, [...]);
```

Bu fonksiyonun neden kritik olduğu şudur: rozet kontrolü `applyUpdate` içinde yapıldığı için, herhangi bir bileşen ÖZ vermek istediğinde `awardOz()` çağırır ve tüm yan etkiler (rozet bildirimi, aşama kutlaması, kalıcılık) otomatik olarak gerçekleşir. Bileşenin bunları ayrıca işlemesi gerekmez.

`cloudReady` bayrağı ise `Boolean(authUser && !authUser.local && db)` ifadesiyle hesaplanır. Bu üç koşulun hepsi sağlandığında profil değişiklikleri Firestore'a yazılır; aksi hâlde yalnızca `localStorage` güncellenir.

**Günlük ziyaret takibi:** Her oturum açılışında `lastVisit` bugün mü diye kontrol edilir. Değilse `daily_visit` ÖZ ödülü verilir ve günlük seri (`dailyStreak`) bir artırılır. Eğer son ziyaret ikiden fazla gün önceyse seri sıfırlanır.

### 5.5 StoryContext — Eserler ve Topluluk

`StoryContext` kişisel eserler ve topluluk verisi olmak üzere iki veri akışını yönetir.

**Kişisel eserler:** Firestore aboneliği (`subscribeCreations`) ve localStorage birlikte çalışır. Bulut verisi geldiğinde yerel verisiyle birleştirilerek en yeni sürüm tutulur:

```javascript
setCreations((local) => {
    const map = new Map();
    local.forEach((c) => map.set(String(c.id), c));
    cloudItems.forEach((c) => map.set(String(c.id), c));
    return [...map.values()].sort(
        (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
    );
});
```

**Topluluk verisi:** Tohumlanmış veriler (`SEED_COMMUNITY`) her zaman vardır — bu sayede yeni kurulmuş bir okulda bile topluluk boş görünmez. Gerçek Firestore verileri geldiğinde `mergeCommunity()` fonksiyonu id bazında tekilleştirerek birleştirir; gerçek veriler tohumların üstüne yazılır.

**Gizlilik garantisi:** `shareCreation()` içinde, paylaşılan veri nesnesine `userInput` (ham deneyim metni) hiçbir zaman eklenmez. Bu teknik bir karar değil, mimari bir güvencedir:

```javascript
const payload = {
    type: creation.type,
    title: creation.title,
    preview: maskProfanity(truncate(firstText, 180)),
    // ... diğer dönüştürülmüş alanlar
    // userInput: ASLA EKLENMEDİ
};
```

---

## 6. Hash Tabanlı Yönlendirme Sistemi

### 6.1 Neden Hash Yönlendirmesi?

Hash tabanlı yönlendirme (`#/rota`) üç somut avantaj sunar:

1. **Statik hosting uyumu:** Vercel, GitHub Pages, Netlify gibi hizmetlerde `404.html` yönlendirmesi veya sunucu taraflı rewrite kuralı gerekmez. `index.html` her zaman sunulur; rota parse işlemi istemcide gerçekleşir.

2. **Tarayıcı geçmişi entegrasyonu:** `window.history.back()` hash değişikliklerini geçmiş olarak kaydeder. Kullanıcı "geri" butonuna bastığında rota değişir. Bu davranış ek kod gerektirmez.

3. **PWA uyumluluğu:** Servis çalışanı, hash kısmı farklı olan URL'leri aynı önbellek girişi olarak değerlendirebilir. Bu, çevrimdışı modda tüm rotaların çalışmasını sağlar.

### 6.2 Rota Tablosu

| Hash | Bileşen | Açıklama |
|------|---------|----------|
| `#/` veya `#` | `HomePage` | Karşılama paneli |
| `#/olustur` | `CreatePage` | İçerik türü seçimi |
| `#/olustur/story` | `CreatePage` | Hikâye üretimi |
| `#/olustur/game` | `CreatePage` | Oyun üretimi |
| `#/olustur/letter` | `CreatePage` | Mektup üretimi |
| `#/kutuphane` | `LibraryPage` | Kişisel eserler |
| `#/topluluk` | `CommunityPage` | Topluluk galerisi |
| `#/topluluk/:id` | `CommunityItemView` | Topluluk eseri görüntüleme |
| `#/yolculuk` | `JourneyPage` | Metamorfoz yolculuğu |
| `#/profil` | `ProfilePage` | Kullanıcı profili |
| `#/rehber` | `CounselorPage` | Okul paneli (korumalı) |
| `#/icerik/:id` | `ContentView` | Kişisel eser okuma/oynama |

### 6.3 Korumalı Rotalar

`CounselorPage`, kullanıcının `profile.role === 'counselor'` olup olmadığını kontrol eder. Rehber olmayan kullanıcılar erişmeye çalıştığında `AppShell`, rehber simgesini navigasyondan gizler. Doğrudan URL girişi denenirse `CounselorPage` bileşeni içinde erişim kontrolü yapılır ve kullanıcı ana sayfaya yönlendirilir.

---

## 7. Firebase Entegrasyonu ve Çevrimdışı-Öncelikli Mimari

### 7.1 Korumalı Başlatma

`src/lib/firebase.js` dosyası Firebase'i koşullu başlatır:

```javascript
const config = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

export const firebaseReady = Boolean(config.apiKey && config.projectId && config.appId);

let app = null, auth = null, db = null;

if (firebaseReady) {
    try {
        app = initializeApp(config);
        auth = getAuth(app);
        db = getFirestore(app);
    } catch (e) {
        console.error('Firebase başlatılamadı:', e);
        app = auth = db = null;
    }
}

export { app, auth, db };
```

`firebaseReady` bayrağı üç kritik ortam değişkeninin varlığını kontrol eder. Herhangi biri eksikse Firebase başlatılmaz; `auth` ve `db` `null` kalır. Uygulama bu durumu fırlatma (throw) yerine sessizce ele alır.

Bu yapı ES modüllerinin canlı bağlama (live binding) özelliğini kullanır: `db.js` içindeki `import { db } from './firebase'` ifadesi, `db` değişkeninin anlık değerini değil, referansını alır. Firebase başlatıldıktan sonra `db` güncellense bile `db.js` her zaman güncel değeri görür.

### 7.2 Veri Katmanı (db.js)

`db.js`, Firestore işlemlerini saran bir arayüz katmanıdır. Her fonksiyon `guard()` çağrısıyla başlar:

```javascript
const guard = () => {
    if (!db) throw new Error('Firestore hazır değil');
};
```

Bu yaklaşım şu güvenceyi sağlar: Firebase başlatılmamışsa tüm Firestore işlemleri exception fırlatır. Bu exception'lar çağıran context'lerde yakalanır. Kullanıcıya bu hata asla ham hâliyle gösterilmez.

Abonelik fonksiyonları (`subscribeProfile`, `subscribeCreations`, `subscribeCommunity`) ise biraz farklı davranır: `if (!db) return () => {}` diyerek boş bir temizleme fonksiyonu döndürürler. Bu sayede context kodu, Firebase aktif olup olmadığından bağımsız olarak her zaman bir "unsubscribe" fonksiyonu alır.

### 7.3 Topluluk Güvenlik Kuralları

Firestore güvenlik kuralları üç ilkeye dayanır:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Kullanıcı yalnızca kendi verisini okuyup yazabilir
    match /users/{uid}/{document=**} {
      allow read, write: if request.auth != null 
                         && request.auth.uid == uid;
    }
    
    // Topluluk: herkes okur, kimliği doğrulanmış yazar
    // Güncellemeler yalnızca sayaç alanlarına izin verir
    match /community/{docId} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update: if request.auth != null
        && request.resource.data.diff(resource.data).affectedKeys()
             .hasOnly(['hearts','hugs','reads','heartedBy','huggedBy','reports']);
      allow delete: if false;
    }
  }
}
```

`diff().affectedKeys().hasOnly(...)` ifadesi, güncelleme işlemlerinin yalnızca belirtilen alanlara dokunabilmesini garantiler. Bu sayede bir kullanıcı `title`, `pages`, `letter` gibi içerik alanlarını asla değiştiremez.

---

## 8. Yapay Zekâ Katmanı

### 8.1 Genel Mimari

`src/lib/ai.js` dosyası, OpenRouter API üzerinden çok modelli içerik üretimini yönetir. Tasarımda üç temel karar öne çıkar:

**Model zinciri:** Tek model yerine dört model sırayla denenir. Her model için iki deneme hakkı vardır. Tüm denemeler başarısız olursa yerel üreticiye geçilir.

**Zaman aşımı yönetimi:** `AbortController` kullanılarak her istek için ayrı zaman aşımı tanımlanır. Mimari çağrılar için 25 saniye, editoryal geçişler için 45 saniye, tam üretim için 75 saniye.

**Önbellek:** `Map` tabanlı, TTL değeri 10 dakika olan bir önbellek mekanizması, aynı giriş için tekrarlı API çağrılarını önler. Önbellek anahtarı `mode:input.slice(0,200)` biçimindedir.

### 8.2 Model Zinciri

```javascript
const MODEL_CHAIN = [
    import.meta.env.VITE_OPENROUTER_MODEL,   // Ortam değişkeninden override
    'google/gemma-3-27b-it:free',             // Birincil model
    'meta-llama/llama-3.3-70b-instruct:free', // İkincil model
    'mistralai/mistral-7b-instruct:free',      // Üçüncül model
    'nousresearch/hermes-3-llama-3.1-405b:free', // Son çare
].filter(Boolean);
```

`VITE_OPENROUTER_MODEL` ortam değişkeni belirlendiyse, zincirde öncelikli olarak kullanılır. Bu değişken boşsa `filter(Boolean)` onu zincirden çıkarır.

Her model için deneme döngüsü:

```javascript
for (const model of MODEL_CHAIN) {
    for (let attempt = 0; attempt < 2; attempt++) {
        try {
            return await callModel(model, userContent, systemPrompt, timeout, temperature);
        } catch (e) {
            lastError = e;
            if (e.name === 'AbortError') break; // Zaman aşımı — bu modeli bırak
            await sleep(800 * (attempt + 1));   // Üstel geri çekilme
        }
    }
    onStage?.('Başka bir kanat deneniyor…');
}
```

`AbortError`, zaman aşımı anlamına gelir; bu durumda aynı modelde ikinci deneme yapılmaz. Diğer hatalar (ağ hatası, API 5xx) için ikinci deneme yapılır.

### 8.3 JSON Çıkarma ve Normalizasyon

OpenRouter modelleri JSON çıktısını her zaman temiz biçimde vermez. Bazı modeller JSON'ı Markdown kod bloğu içine sarar (` ```json ... ``` `), bazıları sondaki virgülleri unutur, bazıları JSON'dan önce açıklama metni yazar.

`extractJSON()` fonksiyonu bu sorunları sırayla ele alır:

```javascript
const extractJSON = (text) => {
    let cleaned = String(text)
        .replace(/```json/gi, '')
        .replace(/```/g, '')
        .trim();
    const start = cleaned.indexOf('{');
    const end = cleaned.lastIndexOf('}');
    if (start === -1 || end === -1) throw new Error('Yanıtta JSON bulunamadı');
    cleaned = cleaned.slice(start, end + 1);
    try {
        return JSON.parse(cleaned);
    } catch {
        // Sondaki virgülleri onar: ,} → } ve ,] → ]
        return JSON.parse(cleaned.replace(/,\s*([}\]])/g, '$1'));
    }
};
```

Normalizasyon fonksiyonları (`normalizeGame`, `normalizeLetter`) yapısal bütünlüğü garantiler. Örneğin oyun normalizasyonunda her bölümde en az bir doğru seçenek olması zorunludur:

```javascript
levels.forEach((l) => {
    if (!l.options.some((o) => o.isCorrect)) l.options[0].isCorrect = true;
});
```

Bu güvence, modelin yanlışlıkla tüm seçenekleri yanlış işaretlemesi durumunda oyunun kırılmasını önler.

### 8.4 Hikâye Üretimi — Yedi Aşamalı Boru Hattı

Hikâye üretimi, diğer içerik türlerinden çok daha karmaşık bir boru hattından geçer. Bu boru hattının her aşaması bağımsız bir `try/catch` bloğuna sahiptir — herhangi bir aşama başarısız olursa boru hattı kırılmaz, yalnızca o aşama atlanır.

**Aşama 1 — Deneyim Mimarisi (ARCH):**  
`ARCHITECTURE_SYSTEM` promtuyla `buildArchitectureContent(userInput)` çağrılır. Bu çağrı şu dokuz alanı JSON olarak döndürür: `anchor` (hikâyenin duygusal sütunu olacak tek somut nesne/yer/söz), `characterBefore` (deneyim başlamadan önceki kimlik), `ownPhrases` (kullanıcının kendi ifadelerinden iki alıntı), `arc` (temel ihtiyaç tipi), `severity` (1–5 şiddet skoru), `dominantMetaphor`, `pivotLocation`, `inversion`, `titleSeed`.

**Aşama 2 — Ses Çıkarımı (VOICE):**  
Mimari analizin çıktısı kullanılarak `VOICE_SYSTEM` promtuyla karakterin "iç sesi" oluşturulur. Bu ses, hikâyenin tüm iç monoloğunda kullanılır — stilistik tutarlılığı sağlar.

**Aşama 3 — Bölüm A (Sayfalar 1–4 + Meta):**  
RAG motoru `['world_before', 'the_moment', 'night_after']` anlarına uygun fragment'leri getirir. Bu fragment'ler few-shot blok olarak prompt'a enjekte edilir. `buildChunkAContent()` mimari analiz, ses örnekleri ve RAG verisiyle zenginleştirilmiş bir prompt oluşturur.

**Aşama 3b — Bölüm A Mikro-Editoryal:**  
Üretilen ilk dört sayfa, `MICRO_EDITORIAL_A_SYSTEM` ile kalite kontrolünden geçirilir. Bu geçiş, edebî kalite çıtasının altında kalan sayfaları yeniden yazar.

**Aşama 4 — Bölüm B (Sayfalar 5–7):**  
A bölümünün son cümlesi "köprü" olarak alınır. B bölümü bu köprüden itibaren devam eder; duygu yoğunluğu ve anlatısal gerilim artırılır.

**Aşama 4b — Bölüm B Mikro-Editoryal:**  
Dönüm noktasını içeren B bölümü ikinci kalite kontrolünden geçer.

**Aşama 5 — Bölüm C (Sayfalar 8–10):**  
Çözüm ve umut bölümü. Çıpa nesnesi son kez, dönüşmüş anlamıyla tekrar eder.

**Aşama 6 — Bedenselleştirme Geçişi:**  
`needsPhysicalize()` fonksiyonu sayfalarda "tell" (anlatma) baskınlığını kontrol eder. Eğer sayfalar duyguyu doğrudan açıklıyorsa ("üzgündü"), `PHYSICALIZE_SYSTEM` bu ifadeleri bedensel duyuma dönüştürür ("öğle arası kapıya en yakın masayı seçti, ekranı kapalı telefona baktı").

**Aşama 7 — Editoryal Kalite Geçişi:**  
`hasForbiddenPhrases()` yasak klişeleri kontrol eder. Bulunursa `EDITORIAL_SYSTEM` o sayfaları yeniden yazar.

### 8.5 Yerel Yedek Üretici

Tüm AI çağrıları başarısız olduğunda `localGenerate(mode)` devreye girer:

```javascript
const localGenerate = (mode) => {
    const meta = {
        reflectionQuestion: 'Bu hikâyedeki kahramanın en güçlü anı sence hangisiydi...',
        growthLesson: 'Destek istemek zayıflık değil, kendi hikâyenin yazarı olmaktır.',
        themeColor: '#6A52DC',
        category: 'diger',
        source: 'local',
    };
    if (mode === 'story') return { ...meta, type: 'story', title: 'Kozanın İçindeki Işık', pages: LOCAL_STORY_PAGES... };
    if (mode === 'game') return { ...meta, type: 'game', title: 'İçsel Güç Labirenti', levels: LOCAL_GAME_LEVELS };
    return { ...meta, type: 'letter', title: 'Gelecekten Bir Mektup', letter: LOCAL_LETTER };
};
```

`source: 'local'` bayrağı, `CreatePage`'de özel bir bildirim gösterilmesini tetikler: "Yapay zekâya ulaşılamadı; özenle hazırlanmış içerik sunuldu." Kullanıcıya hata mesajı değil, dürüst bir bilgi verilir.

---

## 9. Anlatı Zekâsı Motoru (StoryIntelligence)

`src/lib/storyIntelligence.js` dosyası, KOZA'nın en karmaşık bileşenidir. Bu modül, deneyim mimarisini analiz eden ve içeriği kalite standartlarına göre düzelten bir dizi birbirine bağlı alt sistem içerir.

### 9.1 Kültürel Zemin Tespiti

Türkiye'deki okul deneyiminin kendine özgü mekânları vardır: kantin, koridor, teneffüs bahçesi, okul tuvaleti, dijital platform. `detectSpaces()` fonksiyonu bu mekânları kullanıcı girdisinden tespit eder:

```javascript
const SPACE_PATTERNS = {
    koridor: ['koridor', 'koridorda', 'geçit', 'ara kat'],
    kantin: ['kantin', 'kafeterya', 'yemek arası', 'öğle arası'],
    sinif: ['sınıf', 'sınıfta', 'ders', 'tahta', 'sıra arkadaşı'],
    teneffus: ['teneffüs', 'teneffüste', 'ara', 'zil çaldı'],
    dijital: ['sosyal medya', 'instagram', 'whatsapp', 'tiktok', ...],
};
```

Tespit edilen mekânlar için zengin bağlam açıklamaları prompt'a enjekte edilir. Örneğin kantin tespitinde şu metin eklenir: "Kantin/kafeterya: kimin yanında oturulacağı meselesi, tepsi taşımanın çıplaklığı, sayılı teneffüs dakikaları." Bu sayede yapay zekâ soyut "okul" değil, somut Türk okul deneyimini yansıtan metinler üretir.

### 9.2 Yay Tipi Sınıflandırması

Her deneyim dört temel ihtiyaç tipinden birine sınıflandırılır:

- **validation:** Görülmek, onaylanmak istiyor
- **strength:** Güçlü hissetmek, üstesinden gelmek istiyor
- **hope:** Bu geçecek mi? Umut arıyor
- **understanding:** Neden böyle yapıldığını anlamak istiyor

Bu sınıflandırma, hikâyenin duygusal tonunu, dönüm noktasını ve çözüm yaklaşımını belirler. `validation` tipi deneyimler "görülme" anlarına odaklanırken, `strength` tipi deneyimler küçük ama gerçek direnç anlarını öne çıkarır.

### 9.3 Ses Çıkarımı ve Ses Kalıpları

`parseVoice()` ve `parseVoicePatterns()` fonksiyonları, mimari analizden karakterin özgün ses kalıplarını çıkarır. Bu kalıplar üç kategoriye ayrılır:

- **Sentence starters (cümle başlangıçları):** "Ama–", "Sanki–", "Neden–"
- **Recurring qualifiers (tekrarlayan niteleyiciler):** "biraz", "sanırım", "galiba"
- **Syntax patterns (sözdizimi kalıpları):** Uzun muyum, kısa mı? Soru cümleleri mi baskın?

Bu kalıplar hikâye boyunca iç monolog sahnelerine işlenir. Sonuç, kullanıcının "bu benim sesim" diyebileceği kadar özgün bir anlatıdır.

### 9.4 Bedenselleştirme Algoritması

`needsPhysicalize()` fonksiyonu şu ifadeleri yakalamak için düzenli ifadeler kullanır:

```
/üzgün(dü|ydü|du|du)/gi, /mutlu(ydu|ydu|ydı)/gi,
/kötü hissetti/gi, /iyi hissetti/gi, /korku(nç)? hissetti/gi
```

Bu ifadeler "tell" anlatımının göstergesidir. Sayfa içeriğinde bu ifadelerin oranı belirli bir eşiği geçerse `applyPhysicalize()` çağrılır ve bu ifadeler bedensel, duyusal anlatıma dönüştürülür.

### 9.5 Yasak Cümle Denetimi

`hasForbiddenPhrases()` fonksiyonu, Anlatı Terapisi prensiplerine aykırı klişe ifadeleri tespit eder:

```javascript
const FORBIDDEN = [
    'zamanla iyileşti', 'içindeki gücü buldu', 'artık farklıydı',
    'her şey değişti', 'güçlü çıktı', 'güçlendi ve', 'overcome',
    'sonunda mutlu', 'mutlu sona', 'herkes anladı',
];
```

Bu ifadeler "sahte mutlu son" kalıbına aittir. Anlatı terapisi gerçek, küçük adımlarla gelen umudu merkeze alır — herkesin birden anlayıp her şeyin düzeldiği sihirli anlar değil.

---

## 10. RAG Sistemi (StoryRag)

### 10.1 Genel Yaklaşım

KOZA'nın RAG (Retrieval-Augmented Generation) sistemi, vektör veritabanı veya embedding modeli kullanmadan çalışır. Bunun yerine kural tabanlı puanlama sistemi uygulanır. Bu tasarım kararının gerekçesi şudur:

- Vektör DB olmadan sıfır ek maliyet
- Çevrimdışı çalışır — ağ bağlantısı gerektirmez
- Şeffafdır — hangi fragment'in neden seçildiği takip edilebilir
- Hedef domain dar — Türk ortaokul zorbalığı deneyimleri; bu domain için anlamsal benzerlik yerine kategori+duygu eşleştirmesi yeterlidir

### 10.2 Fragment Yapısı

Her seed fragment şu alanları içerir:

```javascript
{
    id: 'f001',
    category: 'dislanma',
    storyMoment: 'world_before',
    emotionTags: ['yalnizlik', 'uzuntu'],
    title: 'Sessiz Kantin',
    content: '...' // Yüksek kaliteli örnek metin
}
```

`storyMoment` alanı, fragment'in hikâyenin hangi anına ait olduğunu belirtir. Hikâye sekiz moment kategorisine ayrılmıştır: `world_before`, `the_moment`, `night_after`, `body_next_day`, `inner_conflict`, `imperfect_step`, `connection`, `open_road`.

Bu kategoriler, KOZA'nın hikâye yapısıyla birebir örtüşür: hikâyenin her bölümü (A/B/C) kendi anlarına uygun referans fragment'leri alır.

### 10.3 Puanlama Algoritması

```javascript
function scoreFragment(fragment, category, emotions) {
    let score = 0;
    if (fragment.category === category) score += 6;  // Kategori eşleşmesi
    if (fragment.category === 'diger') score += 1;    // Evrensel katkı
    emotions.slice(0, 2).forEach((em, idx) => {
        if (fragment.emotionTags.includes(em)) score += 3 - idx;
    });
    emotions.slice(2).forEach((em) => {
        if (fragment.emotionTags.includes(em)) score += 1;
    });
    return score;
}
```

Birinci duygu eşleşmesi 3 puan, ikincisi 2 puan, diğerleri 1'er puan kazandırır. Kategori eşleşmesi en ağır faktördür (6 puan).

### 10.4 Moment Çeşitliliği Garantisi

Aynı story moment etiketinden iki fragment seçilmez. Bu kural, hikâyenin farklı anlarını kapsayan referans metinlerin kullanılmasını sağlar:

```javascript
const selected = [];
const usedMoments = new Set();
for (const { f } of scored) {
    if (selected.length >= count) break;
    if (!usedMoments.has(f.storyMoment)) {
        selected.push(f);
        usedMoments.add(f.storyMoment);
    }
}
```

### 10.5 Duygu Profili Çıkarımı

`detectEmotions()` fonksiyonu, kullanıcı girdisinin belirli alanlarından (öncelikle "NASIL HİSSETTİRDİ" ve "NEDEN ZOR GELDİ") duygu profilini çıkarır:

```javascript
const EMOTION_KEYWORDS = {
    yalnizlik: ['yalnız', 'dışlandım', 'tek başına', 'yok saydı', ...],
    utanc: ['utandım', 'herkes gördü', 'alay', 'güldüler', ...],
    ofke: ['kızgın', 'sinirli', 'nefret', 'öfke', ...],
    caresizlik: ['çaresiz', 'yapamıyorum', 'bıktım', 'bitik', ...],
    korku: ['korkuyorum', 'tehdit', 'tedirgin', ...],
    uzuntu: ['üzgün', 'ağladım', 'moralim bozuk', ...],
};
```

Her anahtar kelime kümesi için eşleşme sayısı hesaplanır; sonuç sıralanmış duygu listesi olarak döndürülür. Bu liste hem fragment puanlamasında hem de mimari çağrı prompt'una ek bağlam olarak kullanılır.

---

## 11. ÖZ Ekonomisi ve Oyunlaştırma

### 11.1 ÖZ Puanı Tablosu

| Eylem | ÖZ |
|-------|-----|
| Hikâye oluşturma | 120 |
| Oyun oluşturma | 100 |
| Mektup oluşturma | 80 |
| Toplulukla paylaşma | 40 |
| Yansıma sorusunu yanıtlama | 25 |
| Topluluktan eser keşfetme | 15 |
| Nefes egzersizi yapma | 10 |
| Günlük ziyaret | 10 |
| Esere kalp gönderme | 5 |
| "Hemhal" tepkisi verme | 10 |
| Onboarding tamamlama | 50 |

Ödül miktarları, eylemin terapötik değeriyle orantılıdır. İçerik oluşturma en yüksek ödülü alır; yalnızca tıklama gerektiren etkileşimler daha düşük ödüllendirilir.

### 11.2 Yedi Metamorfoz Aşaması

```javascript
export const STAGES = [
    { n: 1, min: 0,    name: 'Kapalı Koza',        color: '#A8A296' },
    { n: 2, min: 200,  name: 'İlk Kıpırtı',        color: '#BFB6F6' },
    { n: 3, min: 500,  name: 'Kabuğun Çatlaması',  color: '#8470E8' },
    { n: 4, min: 1000, name: 'Ortaya Çıkış',       color: '#6A52DC' },
    { n: 5, min: 2000, name: 'Kanatların Açılışı', color: '#E9AE41' },
    { n: 6, min: 4000, name: 'İlk Uçuş',           color: '#E29A28' },
    { n: 7, min: 8000, name: 'Görkemli Kelebek',   color: '#C97A1C' },
];
```

Eşik değerleri kasıtlı olarak üstel büyüme gösterir: ilk aşama geçişi 200 ÖZ ile gerçekleşirken, son aşama 8000 ÖZ gerektirir. Bu tasarım, erken başarı deneyimini kolaylaştırırken uzun vadeli bağlılığı teşvik eder.

### 11.3 Aşama İlerleme Hesaplama

```javascript
export const stageProgress = (totalOz = 0) => {
    const current = stageFor(totalOz);
    const next = nextStage(totalOz);
    if (!next) return 100;
    return Math.min(100, Math.round(
        ((totalOz - current.min) / (next.min - current.min)) * 100
    ));
};
```

Bu fonksiyon `JourneyPage`'deki ilerleme çubuğunu besler. Son aşamada (Görkemli Kelebek) her zaman 100 döndürür.

### 11.4 Rozet Sistemi

On üç rozet, profil istatistiklerinden saf fonksiyon olarak hesaplanır:

```javascript
export const ACHIEVEMENTS = [
    { id: 'ilk_adim',      check: (p) => p.onboarded,              oz: 50  },
    { id: 'ilk_hikaye',    check: (p) => p.storiesCreated >= 1,    oz: 50  },
    { id: 'ilk_oyun',      check: (p) => p.gamesCreated >= 1,      oz: 50  },
    { id: 'ilk_mektup',    check: (p) => p.lettersCreated >= 1,    oz: 50  },
    { id: 'hikaye_ustasi', check: (p) => p.storiesCreated >= 5,    oz: 200 },
    { id: 'paylasimci',    check: (p) => p.sharesCount >= 1,       oz: 100 },
    { id: 'kasif',         check: (p) => p.worksExplored >= 5,     oz: 100 },
    { id: 'destekci',      check: (p) => p.heartsGiven >= 10,      oz: 100 },
    { id: 'hemhal',        check: (p) => p.hugsGiven >= 1,         oz: 75  },
    { id: 'seri_3',        check: (p) => p.dailyStreak >= 3,       oz: 75  },
    { id: 'seri_7',        check: (p) => p.dailyStreak >= 7,       oz: 200 },
    { id: 'caprak_catladi',check: (p) => p.totalOz >= 500,         oz: 150 },
    { id: 'kelebek',       check: (p) => p.totalOz >= 8000,        oz: 500 },
];
```

`findNewAchievements()` her profil güncellemesinde tüm rozetleri kontrol eder. Yeni kazanılan rozetlerin ÖZ değerleri `applyUpdate` içinde toplam ÖZ'e eklenir — bu nedenle rozet kazanımı zincir tepkime yaratabilir (rozet ÖZ'ü yeni bir aşamayı tetikleyebilir).

---

## 12. Güvenlik Katmanı

### 12.1 Kriz Tespiti

`detectCrisis()` fonksiyonu, yapay zekâya gönderilmeden önce her kullanıcı girdisini tarar:

```javascript
const CRISIS_PATTERNS = [
    'kendime zarar', 'kendimi kes', 'intihar', 'ölmek istiyorum',
    'yaşamak istemiyorum', 'canıma kıy', 'hayatıma son', 'kendimi öldür',
    'birini öldür', 'zarar vermek istiyorum', 'bıçaklamak', 'silahla vur',
];

const normalizeTr = (text) =>
    String(text)
        .replace(/İ/g, 'i')
        .replace(/I/g, 'ı')
        .toLowerCase()
        .replace(/\s+/g, ' ');
```

Türkçe büyük harf normalizasyonu kritiktir: `İ` → `i` ve `I` → `ı` dönüşümleri olmadan `İNTİHAR` veya `INTIHAR` gibi büyük harfli girişler tespit edilemez. `normalizeTr()` bu dönüşümleri standart `toLowerCase()` öncesinde uygular.

Kriz tespit edildiğinde:
1. AI üretimi başlatılmaz
2. `CrisisCard` bileşeni gösterilir
3. Kullanıcı "Destek Kaynaklarını Gör" butonuyla `SafetyModal`'a yönlendirilir

### 12.2 Destek Kaynakları

`CRISIS_RESOURCES` dört somut kaynak içerir: 112 Acil Çağrı, 183 ALO Sosyal Destek Hattı, Okul Rehberlik Servisi ve Güvendiğin Bir Yetişkin. Bu kaynaklar yalnızca kriz anında değil, `SafetyModal` aracılığıyla her zaman erişilebilir durumdadır.

### 12.3 Takma Ad Güvenliği

`detectInappropriate()` fonksiyonu, kullanıcı tarafından seçilen takma adları iki katmanlı sistemle tarar:

**HARD listesi:** Alt dize olarak aranan, bağımsız anlamları net olan ifadeler. Türkçe küfürler, İngilizce küfürler, kimlik taklidi sözcükleri.

**WORD listesi:** Yalnızca tam sözcük olarak engellenen, kısa veya çift anlamlı terimler. "am", "sik", "got" gibi sözcükler hem küfür hem gerçek isim kökü olabileceğinden tam sözcük eşleştirmesi gerektirir.

Leetspeak tespiti de dahildir: `0→o`, `1→i`, `3→e`, `4→a`, `5→s` gibi dönüşümler `fold()` fonksiyonuyla normalizasyon öncesinde uygulanır. Bu sayede "s4l4k" gibi girişler de yakalanır.

### 12.4 İçerik Sansürü

`maskProfanity()`, topluluk önizlemelerinde hafif küfürleri `∗∗∗` ile maskeler. Bu fonksiyon kasıtlı olarak sınırlı tutulmuştur — kapsamlı küfür filtresi değil, yalnızca topluluk kartlarında görünen kısa önizlem metinleri için temel bir filtredir.

### 12.5 AI Prompt Güvenliği

Sistem promptunda açıkça yasaklanan içerik kategorileri:

- Tıbbi/psikolojik teşhis
- Terapi taklidi
- İlaç önerisi
- Şiddet veya intikam çözüm olarak sunulması
- Kendine zarar verme romantizasyonu
- Tek boyutlu canavar olarak zorbalık yapan kişi

Bu yasaklar sistem promptuna gömülüdür ve her AI çağrısında yeniden gönderilir. Modelin bağlam penceresi sıfırlanmaz — her üretim çağrısı tam sistem promtunu içerir.

---

## 13. Veri Modeli

### 13.1 Firestore Koleksiyon Yapısı

```
users/
  {uid}/
    data/
      profile     (tek belge)
    creations/
      {id}        (her eser ayrı belge)

community/
  {id}            (paylaşılan eserler)
```

`users/{uid}/data/profile` yolundaki `data` ara koleksiyonu bilinçli bir tasarım kararıdır: gelecekte `users/{uid}/data/settings` veya `users/{uid}/data/counselorData` gibi alanlar eklenebilir; bu yapı bunu olanaklı kılar.

### 13.2 Profil Belgesi Şeması

```javascript
{
    pseudonym: string | null,
    emoji: string,
    color: string,                    // Hex renk
    totalOz: number,
    dailyStreak: number,
    lastVisit: string | null,         // ISO 8601
    storiesCreated: number,
    gamesCreated: number,
    lettersCreated: number,
    worksExplored: number,
    heartsGiven: number,
    hugsGiven: number,
    sharesCount: number,
    reflectionsAnswered: number,
    achievements: string[],           // Rozet ID listesi
    plan: 'free' | 'school',
    role: 'student' | 'counselor',
    onboarded: boolean,
    creationsToday: { date: string, count: number },
    joinedAt: string,                 // ISO 8601
    createdAt: Timestamp,             // Firestore sunucu zaman damgası
    updatedAt: Timestamp,
}
```

### 13.3 Eser Belgesi Şeması

```javascript
{
    id: string,
    type: 'story' | 'game' | 'letter',
    title: string,
    category: string,
    themeColor: string,
    reflectionQuestion: string,
    growthLesson: string,
    source: 'ai' | 'local',
    userInput: string,                // HAM DENEYİM — sadece kişisel koleksiyonda
    sharedId: string | null,
    createdAt: string,                // ISO 8601
    updatedAt: Timestamp,
    // Türe göre ek alanlar:
    pages: Array<{title, content}>,   // story
    levels: Array<{name, scenario, options}>, // game
    letter: {greeting, paragraphs, signature, ps}, // letter
}
```

### 13.4 Topluluk Belgesi Şeması

```javascript
{
    type: 'story' | 'game' | 'letter',
    title: string,
    preview: string,                  // Maksimum 180 karakter, küfür maskelenmiş
    category: string,
    themeColor: string,
    reflectionQuestion: string | null,
    growthLesson: string | null,
    pages: Array | null,              // userInput içermez
    levels: Array | null,
    letter: Object | null,
    authorPseudonym: string,
    authorEmoji: string,
    authorColor: string,
    ownerUid: string,
    hearts: number,
    hugs: number,
    reads: number,
    heartedBy: string[],              // Uid listesi (çift tepkiyi önler)
    huggedBy: string[],
    reports: number,
    createdAt: Timestamp,
    day: string,                      // "YYYY-MM-DD" (danışman analizi için)
}
```

`heartedBy` ve `huggedBy` dizileri Firestore'daki `arrayUnion()` operatörüyle güncellenir. İstemci tarafında `interactions.hearted.includes(item.id)` kontrolü çift tıklamayı önceden önler; sunucu tarafında Firestore güvenlik kuralları `heartedBy` ve `huggedBy` dışındaki alanların güncellenmesini engeller.

---

## 14. Bileşen Mimarisi

### 14.1 Genel Bileşen Hiyerarşisi

```
App.jsx
├── Suspense (FullScreenLoader)
│   ├── LandingPage           (giriş yapmamış)
│   ├── OnboardingPage        (ilk kez)
│   ├── ContentView           (tam ekran: #/icerik/:id)
│   ├── CommunityItemView     (tam ekran: #/topluluk/:id)
│   └── AppShell              (oturum açık, onboarding tamamlanmış)
│       ├── Sidebar           (masaüstü)
│       ├── TopBar            (mobil)
│       ├── BottomNav         (mobil)
│       └── [Aktif Sayfa]
│
├── ToastStack
├── SafetyModal
├── UpgradeModal
└── StageCelebration
```

### 14.2 AppShell ve Navigasyon

`AppShell`, üç navigasyon modunu aynı anda yönetir:

- **Masaüstü (lg+):** Sol kenar çubuğu, sabit, tam yükseklik
- **Mobil:** Üst bar (başlık + profil avatarı) + alt sekme çubuğu

Navigasyon öğeleri beş temel rotayı içerir: Ana Sayfa, Oluştur, Kütüphane, Topluluk, Yolculuk. Profil ve Rehber Paneli, profil avatarı üzerinden erişilir.

### 14.3 UI Primitive Bileşenler

**Button:** Üç varyant (`primary`, `secondary`, `ghost`), üç boyut (`sm`, `md`, `lg`), isteğe bağlı sol/sağ ikon, `disabled` ve `loading` durumları.

**Card:** Beyaz arka plan, 20px border radius, `--shadow-soft` gölgesi. `className` prop'uyla genişletilebilir.

**Modal:** `open` prop'u ile kontrol edilir. Mount edildiğinde body scroll kilidi uygular (`document.body.style.overflow = 'hidden'`). Unmount edildiğinde kilidi kaldırır. Backdrop tıklamasıyla kapatılabilir.

**Badge:** Renk tonları: `primary`, `success`, `warning`, `danger`, `neutral`.

**EmptyState:** Emoji, başlık, açıklama ve isteğe bağlı eylem butonu. Tüm boş liste durumları bu bileşeni kullanır.

**ProgressBar:** `value` (0–100) ve `color` prop'ları. CSS `transition` ile animasyonlu dolum.

**SegmentedTabs:** Seçenek listesi ve aktif değer. Kaydırmalı içerik geçişi.

**Avatar:** Emoji + arka plan rengi kombinasyonu. Boyut prop'u.

**Spinner:** SVG tabanlı dönen yükleme göstergesi. Renk ve boyut özelleştirilebilir.

**ToastStack:** Sağ alt köşede yığılan bildirimler. Tür bazlı renkler: `success` (yeşil), `error` (kırmızı), `info` (mavi), `achievement` (amber).

### 14.4 CocoonVisual — SVG Koza Animasyonu

`CocoonVisual.jsx` saf SVG bileşenidir. Canvas kullanılmaz; bu sayede `prefers-reduced-motion` medya sorgusuna saygı göstermek kolaylaşır.

Yedi aşama için yedi farklı SVG görsel tanımlanmıştır. Aşamalar arasındaki geçiş `transition-all duration-700` sınıfıyla CSS tarafından yönetilir. Bileşen `stage` (1–7) ve `size` prop'larını alır.

### 14.5 İçerik Okuyucular

Üç içerik türü için ayrı okuyucu bileşenleri vardır:

**StoryReader:** Tam ekran, sayfa çevirme animasyonu (`animate-page-turn`). İlerleme çubuğu. Önceki/sonraki sayfa navigasyonu. Sesli okuma desteği (`useSpeech` hook'u ile `speechSynthesis` API'si).

**GamePlayer:** Üç bölümlük interaktif yapı. Her bölümde senaryo metni ve seçenekler. Doğru seçimde yeşil geri bildirim ve ÖZ ödülü. Yanlış seçimde kırmızı geri bildirim ve açıklama metni. Tüm bölümler tamamlandığında tebrik ekranı.

**LetterReader:** Zarftan mektup açılıyor animasyonu. Paragraf bazlı düzen. `reader-prose` sınıfıyla Lora yazı tipi. El yazısı benzeri imza stili.

### 14.6 Sayfa Bileşenleri

**LandingPage (601 satır):** Kahraman bölümü (dönen koza animasyonu), dönüşüm önizlemesi (4 senaryo otomatik geçiş), özellik kartları, topluluk önizlemesi (tohumlanmış eserlerden), güvenlik/gizlilik bölümü, rehber paneli bölümü, eylem çağrısı. `AuthModal` dahili olarak yönetilir.

**CreatePage (277 satır):** İçerik türü seçim radyoları, `ExperienceWizard` (yapılandırılmış deneyim giriş formu), üretim sırasında tam ekran `GenerationOverlay`, kriz durumunda `CrisisCard`, sonuç ekranı (eser başlığı, okuma/paylaşma butonları).

**CounselorPage (398 satır):** `role !== 'counselor'` kontrolü. Gerçek topluluk verisinden `aggregate()` ile istatistik hesaplama. Demo veri `buildDemoData()`. Kategori çubuk grafik, haftalık çizgi grafik (saf SVG), özet kartlar (toplam paylaşım, kalp, hemhal), risk önerileri.

**JourneyPage (211 satır):** Koza görseli, mevcut aşama ve ilerleme çubuğu, aşama listesi (kilitsiz/kilitli), rozet ızgarası, istatistik özeti.

---

## 15. Tasarım Sistemi — Metamorfoz

### 15.1 Renk Paleti

Tasarım sistemi "Metamorfoz" temasını görsel dilde somutlaştırır. Koza → kelebek dönüşümü renk skalasına işlenmiştir.

**Birincil renkler (Primary — Iris Moru):**
```css
--color-primary-50:  #F4F2FF
--color-primary-100: #E9E5FF
--color-primary-200: #D4CCFF
--color-primary-300: #B8ABFF
--color-primary-400: #9B85F4
--color-primary-500: #8470E8
--color-primary-600: #6A52DC   /* Ana eylem rengi */
--color-primary-700: #5340C4
--color-primary-800: #3D2FA0
--color-primary-900: #2D2278
```

**Vurgu rengi (Accent — Amber/Bal):**
```css
--color-accent-400: #F2BC4F
--color-accent-500: #E9AE41
--color-accent-600: #E29A28   /* ÖZ ve kelebek sıcaklığı */
--color-accent-700: #C97A1C
```

**Nötr renkler (Warm Sand):**
```css
--color-neutral-50:  #FAF9F7   /* Ana arka plan */
--color-neutral-100: #F2F0EC
--color-neutral-200: #E5E2DB
--color-neutral-300: #C8C3B9
--color-neutral-400: #9C9689
--color-neutral-500: #726C61
--color-neutral-600: #5A5550
--color-neutral-700: #3D3A35
--color-neutral-800: #28261F
--color-neutral-900: #161410
```

Nötr paletteki sıcak kum tonları, soğuk gri yerine kullanılmıştır. Bu tercih, uygulamanın duygusal sıcaklığını destekler.

### 15.2 Tipografi

İki yazı tipi ailesi kullanılır:

**Manrope (UI):** Geometrik sans-serif. 400–800 ağırlık aralığı. Navigasyon, butonlar, etiketler, form alanları, başlıklar. `font-manrope` sınıfı.

**Lora (İçerik):** Edebi serif yazı tipi. 400–600 ağırlık aralığı. Hikâye sayfaları, mektup metni. `reader-prose` utility sınıfıyla uygulanır.

```css
@utility reader-prose {
    font-family: var(--font-lora);
    font-size: 1.0625rem;
    line-height: 1.85;
    letter-spacing: 0.01em;
    color: var(--color-neutral-800);
}
```

### 15.3 Gölge Sistemi

```css
--shadow-soft: 0 1px 3px 0 rgba(0,0,0,0.06), 0 1px 2px -1px rgba(0,0,0,0.04);
--shadow-card: 0 4px 16px -4px rgba(0,0,0,0.08), 0 2px 6px -2px rgba(0,0,0,0.05);
--shadow-lift: 0 8px 24px -6px rgba(0,0,0,0.12), 0 4px 10px -4px rgba(0,0,0,0.08);
--shadow-pop:  0 16px 40px -8px rgba(0,0,0,0.16), 0 8px 16px -8px rgba(0,0,0,0.10);
```

Gölgeler dört seviyeye ayrılmıştır: soft (yüzey elemanları), card (kart bileşenleri), lift (hover durumu), pop (modal/dropdown).

### 15.4 Animasyon Sistemi

```css
@keyframes rise-in {
    from { opacity: 0; transform: translateY(10px); }
    to   { opacity: 1; transform: translateY(0); }
}

@keyframes scale-in {
    from { opacity: 0; transform: scale(0.95); }
    to   { opacity: 1; transform: scale(1); }
}

@keyframes modal-in {
    from { opacity: 0; transform: scale(0.96) translateY(8px); }
    to   { opacity: 1; transform: scale(1) translateY(0); }
}

@keyframes page-turn {
    0%   { opacity: 0; transform: rotateY(-8deg) translateX(-12px); }
    100% { opacity: 1; transform: rotateY(0) translateX(0); }
}
```

**Easing değerleri:**
```css
--ease-out-soft: cubic-bezier(0.16, 1, 0.3, 1);
--ease-spring:   cubic-bezier(0.34, 1.56, 0.64, 1);
```

`prefers-reduced-motion` medya sorgusu:
```css
@media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
        animation-duration: 0.01ms !important;
        transition-duration: 0.01ms !important;
    }
}
```

### 15.5 Arka Plan Efektleri

```css
@utility ambient-bg {
    position: absolute;
    inset: 0;
    pointer-events: none;
    overflow: hidden;
    z-index: 0;
}

@utility grain {
    background-image: url("data:image/svg+xml,..."); /* SVG gürültü deseni */
    opacity: 0.025;
}
```

`ambient-bg` utility'si iki yumuşak gradyan blob içerir — biri sol üstte mor, diğeri sağ altta amber. Bu efektler sayfa derinliği ve sıcaklık hissi yaratır. `grain` overlay hafif kâğıt dokusunu taklit eder.

---

## 16. PWA ve Servis Çalışanı

### 16.1 Vite Plugin PWA Yapılandırması

```javascript
// vite.config.js
VitePWA({
    registerType: 'autoUpdate',
    includeAssets: ['favicon.svg', 'robots.txt'],
    manifest: {
        name: 'KOZA',
        short_name: 'KOZA',
        description: 'Hikâyeni yeniden yaz.',
        theme_color: '#6A52DC',
        background_color: '#FAF9F7',
        display: 'standalone',
        start_url: '/',
        icons: [
            { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
            { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
        ],
    },
    workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        runtimeCaching: [
            {
                urlPattern: /^https:\/\/fonts\.googleapis\.com\//,
                handler: 'StaleWhileRevalidate',
            },
            {
                urlPattern: /^https:\/\/fonts\.gstatic\.com\//,
                handler: 'CacheFirst',
                options: { cacheName: 'fonts', expiration: { maxAgeSeconds: 60 * 60 * 24 * 365 } },
            },
        ],
    },
})
```

### 16.2 Önbellekleme Stratejisi

**Uygulama kabuk (Shell):** `CacheFirst` stratejisi. JS, CSS, HTML dosyaları servis çalışanı önbelleğine alınır. Yeni sürüm deploy edildiğinde servis çalışanı arka planda güncellenir; kullanıcı bir sonraki ziyarette yeni sürümü görür (`registerType: 'autoUpdate'`).

**Google Fonts (CSS):** `StaleWhileRevalidate` — önce önbellekten sun, arka planda güncelle.

**Google Fonts (woff2):** `CacheFirst`, bir yıl TTL — font dosyaları değişmediğinden agresif önbellekleme güvenlidir.

**OpenRouter API çağrıları:** Önbelleğe alınmaz. Her içerik üretimi canlı API çağrısıdır; istemci tarafı `Map` önbelleği 10 dakika TTL ile tekrarlı üretimleri önler.

### 16.3 Ana Ekrana Ekleme

`display: 'standalone'` ayarıyla uygulama ana ekrana eklendiğinde tarayıcı chrome'u (adres çubuğu, navigasyon butonları) gizlenir; uygulama yerel uygulama görünümüyle açılır. `theme_color: '#6A52DC'` mobil tarayıcılarda adres çubuğunu renklendirir.

---

## 17. Analitik ve Gözlemlenebilirlik

### 17.1 GA4 Entegrasyonu

`src/lib/analytics.js` dosyası, `react-ga4` paketini no-op güvenli bir arayüzle sarar:

```javascript
export const analytics = {
    init: () => {
        if (!import.meta.env.VITE_GA_MEASUREMENT_ID) return;
        ReactGA.initialize(import.meta.env.VITE_GA_MEASUREMENT_ID);
    },
    page: (path) => {
        try { ReactGA.send({ hitType: 'pageview', page: path }); } catch { /* sessiz */ }
    },
    event: (name, params = {}) => {
        try { ReactGA.event(name, params); } catch { /* sessiz */ }
    },
};
```

GA ölçüm kimliği olmadığında tüm çağrılar no-op (işlemsiz) olarak gerçekleşir; hiçbir hata fırlatılmaz. Bu uygulama, `Dayanıklılık` kuralına uyar.

### 17.2 İzlenen Olaylar

| Olay | Parametreler |
|------|-------------|
| `login` | `method: 'anonymous' \| 'google' \| 'email'` |
| `creation_made` | `type, source` |
| `creation_shared` | `type` |
| `achievement_unlocked` | `ids (virgülle ayrılmış)` |
| `content_reported` | `id` |
| `pageview` | `page` (her rota geçişinde) |

### 17.3 Gizlilik Yaklaşımı

GA4 yalnızca anonim olay verisi toplar. Kullanıcı takma adı, eser içeriği veya deneyim metni hiçbir zaman analitik sistemine gönderilmez. Parametreler yalnızca sayısal ve kategorik değerler içerir.

---

## 18. Güvenlik, Gizlilik ve KVKK

### 18.1 Veri Minimizasyonu

KOZA gizlilik tasarımının merkezi prensibi veri minimizasyonudur:

- Gerçek isim toplanmaz
- Fotoğraf kullanılmaz
- Coğrafi konum verisi toplanmaz
- Ham deneyim metni sunuculara gönderilmez
- Uygulama, anonim kullanımı tercih eder; Google/e-posta girişi isteğe bağlıdır

### 18.2 Anonimlik Mekanizması

Her kullanıcı üç rastgele elemandan oluşan bir kimlik alır:

**Kelebek adı:** `pseudonyms.js` içindeki havuzdan rastgele Türkçe kelebek adı seçilir (Mor Kelebek, Pembe Kelebek, Altın Kelebek vb.)

**Emoji:** Kelebek temalı emoji havuzundan rastgele seçim (🦋 🌸 🌟 ⭐ 💜 vb.)

**Renk:** `THEME_COLORS` dizisinden rastgele hex renk

Bu üçlü kombinasyon, kullanıcı tarafından kişiselleştirilebilir ancak hiçbir bileşen gerçek kimliğe işaret etmez.

### 18.3 Topluluk İçeriği Gizlilik Güvencesi

Topluluk paylaşımında izlenen güvence katmanları:

1. **Teknik güvence:** `shareCreation()` fonksiyonu `userInput` alanını payload nesnesine hiçbir koşulda eklemez.
2. **Firestore güvencesi:** `community` koleksiyonundaki güvenlik kuralları yalnızca belirli sayaç alanlarının güncellenmesine izin verir; içerik alanları immutable'dır.
3. **İçerik güvencesi:** Toplulukta görünen "önizleme" alanı, ham deneyim metninden değil, yapay zekânın ürettiği içeriğin ilk cümlesinden türetilir (maksimum 180 karakter, küfür maskelenmiş).

### 18.4 Güvenlik Başlıkları

Vercel dağıtımında aşağıdaki HTTP güvenlik başlıkları yapılandırılmalıdır:

```json
{
    "headers": [
        {
            "source": "/(.*)",
            "headers": [
                { "key": "X-Content-Type-Options", "value": "nosniff" },
                { "key": "X-Frame-Options", "value": "DENY" },
                { "key": "X-XSS-Protection", "value": "1; mode=block" },
                { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
                { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=()" }
            ]
        }
    ]
}
```

---

## 19. Dağıtım Mimarisi

### 19.1 Vercel Dağıtımı

KOZA, Vercel üzerinde statik site olarak dağıtılır. Vite çıktısı (`dist/`) doğrudan sunulur; sunucu taraflı işlem yoktur.

```
Vercel Edge Network
    │
    ├── dist/index.html     (tüm rotalar için)
    ├── dist/sw.js          (servis çalışanı)
    ├── dist/assets/        (chunk'lar, lazy-loaded)
    └── Firebase (ayrı altyapı)
```

### 19.2 Derleme Süreci

```bash
npm run build
# Çıktı:
# - Vite bundle analizi ve tree-shaking
# - Tailwind CSS purge (yalnızca kullanılan sınıflar)
# - Code splitting (her sayfa ayrı chunk)
# - PWA servis çalışanı üretimi (Workbox)
# - Varlık hash'leme (önbellek busting)
```

### 19.3 Chunk Büyüklükleri

```
firebase.js          345 kB (gzip: 107 kB)   — Firebase SDK
index.js             316 kB (gzip: 105 kB)   — Ana uygulama + context'ler
CreatePage.js        117 kB (gzip:  42 kB)   — AI katmanı + form
LandingPage.js        38 kB (gzip:  11 kB)
CounselorPage.js      14 kB (gzip:   5 kB)
LetterReader.js       17 kB (gzip:   5 kB)
```

Firebase SDK'sı en büyük chunk'tır (345 kB). Bu beklenen bir durumdur — Firebase modüler SDK'sı tree-shakeable olmasına karşın Firestore ve Auth istemcileri birlikte çok sayıda bağımlılık getirir.

### 19.4 Ortam Değişkenleri

| Değişken | Zorunlu | Açıklama |
|----------|---------|----------|
| `VITE_FIREBASE_API_KEY` | Hayır* | Firebase proje API anahtarı |
| `VITE_FIREBASE_AUTH_DOMAIN` | Hayır* | Firebase auth domain |
| `VITE_FIREBASE_PROJECT_ID` | Hayır* | Firestore proje ID |
| `VITE_FIREBASE_STORAGE_BUCKET` | Hayır* | Firebase storage bucket |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Hayır* | FCM gönderici ID |
| `VITE_FIREBASE_APP_ID` | Hayır* | Firebase uygulama ID |
| `VITE_OPENROUTER_API_KEY` | Hayır** | OpenRouter API anahtarı |
| `VITE_OPENROUTER_MODEL` | Hayır | Model override |
| `VITE_GA_MEASUREMENT_ID` | Hayır | GA4 ölçüm ID |

*Firebase değişkenlerinin hiçbiri veya hepsi sağlanmalıdır. Üçünden biri eksikse (`apiKey`, `projectId`, `appId`) Firebase başlatılmaz.

**Yoksa yerel üreticiye düşülür.

---

## 20. Performans ve Ölçeklenebilirlik

### 20.1 Kod Bölme Stratejisi

Tüm sayfa bileşenleri `React.lazy()` ile dinamik import kullanır:

```javascript
const LandingPage = lazy(() => import('./pages/LandingPage'));
const CreatePage = lazy(() => import('./pages/CreatePage'));
// ...
```

Bu yaklaşım ilk yükleme süresini önemli ölçüde düşürür: kullanıcı yalnızca görüntülediği sayfanın JS'ini indirir. `Suspense` fallback'i olarak `FullScreenLoader` (koza emoji + spinner) gösterilir.

### 20.2 Memoization Stratejisi

Context value'ları `useMemo` ile memoize edilir:

```javascript
const value = useMemo(
    () => ({ route, navigate, toasts, addToast, ... }),
    [route, navigate, toasts, addToast, ...]
);
```

Context callback'leri `useCallback` ile stabilize edilir. Bu, `React.memo` ile sarılmış alt bileşenlerin gereksiz yeniden render'larını önler.

### 20.3 Firestore Abonelikleri

Realtime abonelikler (`onSnapshot`) context unmount edildiğinde temizlenir:

```javascript
useEffect(() => {
    if (!cloudReady) return undefined;
    const unsub = dbApi.subscribeCreations(authUser.uid, (items) => {
        setCreations(...);
    });
    return unsub; // useEffect temizleme fonksiyonu
}, [cloudReady, authUser]);
```

`return unsub` ifadesi, bileşen unmount edildiğinde veya bağımlılıklar değiştiğinde Firestore aboneliğini iptal eder. Bellek sızıntısı oluşmaz.

### 20.4 AI İsteklerinde Önbellekleme

Aynı giriş metni için AI üretimi tekrarlanmaz:

```javascript
const key = cacheKey(mode, userInput);
const cached = getCached(key);
if (cached) return cached;
// ... üretim ...
setCached(key, result);
```

`cacheKey` fonksiyonu, giriş metninin ilk 200 karakterini ve üretim modunu birleştirir. 40 önbellek girişi sınırı, `Map.keys().next().value` ile FIFO stratejisiyle uygulanır.

---

## 21. Test ve Kalite Güvencesi

### 21.1 Derleme Doğrulaması

Proje kapsamında otomatik test altyapısı bulunmamaktadır. Doğrulama `npm run build` ile yapılır. Derleme başarısı şu garantileri sağlar:

- Tüm import çözümlemeleri başarılı
- JSX sözdizimi hatasız
- Tailwind `@apply` çağrıları geçerli sınıflara başvuruyor
- Vite tree-shaking tamamlandı
- PWA servis çalışanı üretildi

### 21.2 Kritik Kullanıcı Akışları

Manuel test edilmesi gereken kritik akışlar:

1. **Anonim giriş:** LandingPage → "Hemen Başla" → OnboardingPage → HomePage
2. **İçerik üretimi:** CreatePage → tür seçimi → ExperienceWizard → üretim → sonuç → okuma
3. **Topluluk paylaşımı:** ContentView → "Toplulukla Paylaş" → ShareDialog → onay → toplulukta görünme
4. **Kriz akışı:** CreatePage → kriz içeriği girişi → CrisisCard → SafetyModal → destek kaynakları
5. **Rehber paneli:** ProfilePage → rehber kodu girişi → CounselorPage → grafiklerin görünmesi
6. **Çevrimdışı mod:** Firebase keyleri boş → tüm akışların localStorage ile çalışması

### 21.3 ESLint Yapılandırması

```javascript
// eslint.config.js
export default [
    { plugins: { 'react-hooks': reactHooksPlugin } },
    { rules: { 'react-hooks/rules-of-hooks': 'error', 'react-hooks/exhaustive-deps': 'warn' } },
];
```

`react-hooks/exhaustive-deps` uyarısı, eksik bağımlılıkları tespit eder. Kasıtlı bağımlılık atlamaları `// eslint-disable-next-line` yorumuyla belgelenir.

---

## 22. Gelecek Yol Haritası

### 22.1 Kısa Vadeli (0–3 Ay)

**Firestore Composite Index'leri:** `community` koleksiyonunda `hugs >= minHugs, orderBy hugs desc` sorgusu composite index gerektirir. Bu index Firebase Console'dan manuel oluşturulmalıdır.

**Push Bildirimleri:** Firebase Cloud Messaging ile günlük seri hatırlatmaları. `VITE_FIREBASE_MESSAGING_SENDER_ID` ortam değişkeni zaten yapılandırılmıştır.

**Yansıma Soruları:** Her eser üretiminin ardından `reflectionQuestion` cevaplama akışı. Cevaplar yalnızca yerel olarak saklanır; `reflection_answered` ÖZ ödülü verilir.

### 22.2 Orta Vadeli (3–6 Ay)

**Okul Paneli Gelişmeleri:** Rehber öğretmenlerin kimliksizleştirilmiş eğilim raporlarını PDF olarak indirmesi. Haftalık e-posta özeti.

**Nefes Egzersizi Modülü:** `breathing_done` ÖZ ödülü altyapısı hazır; yalnızca UI bileşeni eksik. Dört saniye nefes al, dört saniye tut, dört saniye ver.

**Çoklu Dil Desteği:** `i18n` altyapısı kurulumu. Türkçe öncelikli olmak üzere İngilizce ve Kürtçe destek.

### 22.3 Uzun Vadeli (6–12 Ay)

**Makine Öğrenmesi Tabanlı Kategori Tespiti:** Kural tabanlı RAG yerine, okulun kendi topluluk verisiyle fine-tune edilmiş hafif sınıflandırma modeli.

**Danışman-Öğrenci Mesajlaşması:** Rehber öğretmenlerin tamamen anonim biçimde öğrencilere destek mesajı gönderebileceği şifreli kanal.

**Grup Terapisi Modülü:** Benzer deneyimler yaşamış öğrencileri rehber eşliğinde anonim grup oturumlarında buluşturan yapı.

---

## EK A — Hata Yönetimi Stratejisi

KOZA'nın hata yönetimi şu hiyerarşiye göre yapılandırılmıştır:

1. **Kurtarılabilir hatalar:** `try/catch` ile sessizce ele alınır, işlev bozulmadan devam eder.
2. **Kullanıcıya bildirilmesi gereken hatalar:** `addToast('error', ...)` ile kısa bildirim gösterilir.
3. **Kurtarılamaz hatalar:** `ErrorBoundary` yakalar, yeniden deneme seçeneği sunar.

AI üretim hataları her zaman birinci kategoriye girer — yerel üreticiye düşülür, kullanıcı asla boş ekranla karşılaşmaz.

---

## EK B — Yerel Geliştirme Kurulumu

```bash
# Bağımlılıkları kur
npm install

# Ortam değişkenlerini ayarla
cp .env.example .env
# .env dosyasını Firebase ve OpenRouter anahtarlarıyla doldur

# Geliştirme sunucusunu başlat
npm run dev
# → http://localhost:5173

# Üretim derlemesi (doğrulama)
npm run build

# Derleme önizleme
npm run preview
```

Firebase olmadan yerel geliştirme tam olarak çalışır. `firebaseReady: false` durumunda uygulama otomatik olarak localStorage moduna geçer.

---

## EK C — Firestore Güvenlik Kuralları (Tam)

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    function isAuthenticated() {
      return request.auth != null;
    }

    function isOwner(uid) {
      return request.auth.uid == uid;
    }

    // Kullanıcı profili ve kişisel eserler — yalnızca sahibi erişebilir
    match /users/{uid}/{document=**} {
      allow read:   if isAuthenticated() && isOwner(uid);
      allow create: if isAuthenticated() && isOwner(uid);
      allow update: if isAuthenticated() && isOwner(uid);
      allow delete: if isAuthenticated() && isOwner(uid);
    }

    // Topluluk eserleri
    match /community/{docId} {
      // Herkes okuyabilir (anonim kullanıcılar dahil)
      allow read: if true;

      // Yalnızca kimliği doğrulanmış kullanıcılar ekleyebilir
      allow create: if isAuthenticated()
        && request.resource.data.type in ['story', 'game', 'letter']
        && request.resource.data.ownerUid == request.auth.uid;

      // Yalnızca sosyal etkileşim alanları güncellenebilir
      allow update: if isAuthenticated()
        && request.resource.data.diff(resource.data).affectedKeys()
             .hasOnly(['hearts', 'hugs', 'reads', 'heartedBy', 'huggedBy', 'reports']);

      // Silme: hiçbir kullanıcı silemez (yönetici işlemi)
      allow delete: if false;
    }
  }
}
```

---

*Bu belge KOZA v3.0.0 kaynak kodundan üretilmiştir. Son güncelleme: Haziran 2026.*
