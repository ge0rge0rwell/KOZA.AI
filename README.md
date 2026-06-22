# 🦋 KOZA — Hikâyeni Yeniden Yaz

**Empati temelli akran zorbalığı farkındalık platformu.**
TEKNOFEST 2026 · İnsanlık Yararına Teknoloji · Hemhal Takımı

KOZA, akran zorbalığı yaşayan ortaokul öğrencilerinin deneyimlerini — **tamamen anonim olarak** — yapay zekâ ve Anlatı Terapisi (White & Epston, 1990) ilkeleriyle onları güçlendiren içeriklere dönüştürür:

| | |
|---|---|
| 📖 **Hikâye** | Kullanıcıyı "mağdur" değil "kahraman" olarak anlatan 10 sayfalık kişisel hikâye |
| 🎮 **Oyun** | Zor durumlarla başa çıkmayı güvenle prova ettiren 3 bölümlük karar oyunu |
| 💌 **Mektup** | "5 yıl sonraki kendinden" gelen, umut dolu kişisel bir mektup |

Eserler anonim takma adlarla ("Mavi Kelebek") toplulukta paylaşılabilir; kalp 💜 ve **"Hemhal"** 🤝 (*ben de yaşadım*) tepkileriyle empati döngüsü kurulur. Her etkinlik **ÖZ puanı** kazandırır; ÖZ biriktikçe kullanıcının kozası **7 aşamada kelebeğe** dönüşür. Rehber öğretmenler **Okul Paneli**'nden kimliksizleştirilmiş eğilim analizleri görür.

---

## Hızlı Başlangıç

```bash
npm install
npm run dev        # http://localhost:5173
```

> **Anahtarsız çalışır:** Firebase veya OpenRouter yapılandırılmamış olsa bile uygulama tam işlevseldir — yerel demo kimliği, localStorage kalıcılığı ve özenle yazılmış çevrimdışı içerik üreticisi devreye girer.

### Komutlar

```bash
npm run dev        # Geliştirme sunucusu
npm run build      # Üretim derlemesi (dist/)
npm run preview    # Derlenmiş çıktıyı önizle
npm run lint       # ESLint
```

## Ortam Değişkenleri

`.env.example` dosyasını `.env` olarak kopyalayın ve doldurun (tümü opsiyonel):

```env
# Firebase (bulut eşitleme + gerçek topluluk)
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=

# OpenRouter (yapay zekâ üretimi; yoksa yerel üretici devrede)
VITE_OPENROUTER_API_KEY=
VITE_OPENROUTER_MODEL=          # opsiyonel, vars.: google/gemma-3-27b-it:free

# Google Analytics (opsiyonel)
VITE_GA_MEASUREMENT_ID=
```

Firebase Console'da **Authentication → Sign-in method** altında şunları açın: **Anonymous** (zorunlu), Google ve E-posta/Şifre (opsiyonel).

## Firestore Güvenlik Kuralları

Dağıtımdan önce Firebase Console → Firestore → Rules:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Kullanıcı yalnızca kendi ağacını okur/yazar
    match /users/{uid}/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == uid;
    }

    // Topluluk: okumak herkese (giriş yapmış), oluşturmak sahibine
    match /community/{itemId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null
        && request.resource.data.ownerUid == request.auth.uid
        // Gizlilik garantisi: ham deneyim metni topluluğa asla yazılamaz
        && !('userInput' in request.resource.data);
      // Etkileşim güncellemeleri: yalnızca sayaç/tepki alanları değişebilir
      allow update: if request.auth != null
        && request.resource.data.diff(resource.data).affectedKeys()
           .hasOnly(['hearts', 'hugs', 'reads', 'reports', 'heartedBy', 'huggedBy']);
      allow delete: if request.auth != null && resource.data.ownerUid == request.auth.uid;
    }
  }
}
```

## Mimari Özeti

```
src/
  config/      # Planlar, ÖZ ekonomisi, 7 aşama, kategoriler, AI istemleri
  lib/         # firebase, db (Firestore), ai (OpenRouter + yerel yedek), analytics, confetti
  context/     # UI (hash router/toast/modal) · Auth (anonim öncelikli) · User (ÖZ/rozet/aşama) · Story (eser+topluluk)
  components/  # ui/ (tasarım sistemi) · layout/AppShell · cocoon/ (SVG metamorfoz) · readers/ · modals/
  pages/       # Landing, Onboarding, Home, Create, Library, Community, Journey, Profile, Counselor, ContentView
  utils/       # safety (kriz tespiti), validation, stages, achievements, pseudonyms, helpers
```

Ayrıntılı mimari ve katkı kuralları için **[CLAUDE.md](./CLAUDE.md)** dosyasına bakın.

## Tasarım İlkeleri

- **Gizlilik varsayılandır** — gerçek isim/fotoğraf yok; ham deneyim metni asla paylaşılmaz.
- **Güvenlik üretimden önce gelir** — kriz dili algılanırsa üretim durur, gerçek destek kaynakları gösterilir (112, ALO 183, rehberlik servisi).
- **Asla bozuk hissettirme** — AI erişilemezse yerel içerik üretici; Firebase yoksa localStorage; her liste için iskelet/boş durum.
- **Mağdur değil, kahraman** — tüm metin ve AI istemleri kullanıcıyı kendi hikâyesinin yazarı olarak konumlar.

## Rehber Öğretmen Paneli (Demo)

Profil → "Rehber öğretmen misin?" → erişim kodu: `KOZA-OKUL-2026`
Panel boşsa "Demo Verilerle Keşfet" düğmesiyle örnek analiz görüntülenebilir.

---

⚠️ *KOZA bir eğitim ve farkındalık aracıdır; profesyonel psikolojik desteğin yerini tutmaz. Acil durumda 112'yi arayın.*
