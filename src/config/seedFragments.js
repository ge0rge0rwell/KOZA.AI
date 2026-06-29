/**
 * KOZA Anlatı RAG — Küratörlü Tohum Kütüphanesi
 *
 * Her fragment: yayın kalitesinde Türkçe terapötik anlatı sayfası.
 * Bunlar AI'ın kalite çıtasını görmesi için few-shot örnek olarak kullanılır.
 * Model bu fragmentleri kopyalamaz — duygusal hassasiyeti ve tekniği referans alır.
 *
 * Duygusal etiketler:
 *   yalnizlik | utanc | ofke | caresizlik | korku | uzuntu
 *
 * Hikâye anı etiketleri:
 *   night_after | body_next_day | the_moment | inner_conflict |
 *   imperfect_step | connection | open_road | world_before
 */

export const SEED_FRAGMENTS = [

  /* ══════════════════════════════════════════════════════════════
     DISLANMA — Gruptan dışlanma, yok sayılma
     ══════════════════════════════════════════════════════════════ */

  {
    id: 'dislanma_night_01',
    category: 'dislanma',
    emotionTags: ['yalnizlik', 'uzuntu'],
    storyMoment: 'night_after',
    title: 'Yüz Mesaj',
    content: `Cansu, akşam yemeğinde tabağına baktı. Çatalı aldı, bıraktı, tekrar aldı. Annesi bir şeyler söylüyordu — hafta sonu, alışveriş belki — ama sesler birbirine karışıyordu. Kulağı orada değildi.

Yatağa geçince telefonu eline aldı. Grup sohbeti hâlâ açıktı. Yüz yirmi mesaj. Kendi adının geçtiği yerleri bulmak için kaydırdı — bulmadı. Yokmuş gibi yazmışlardı. Sanki hiç orada olmamış gibi.

Bu, doğrudan söylenen bir şeyden farklıydı. Doğrudan söylense, en azından gerçek olduğunu bilebilirdi. Ama yok sayılmak başka türlü acıtıyordu — elle tutulmaz, kanıtlanamaz, anlatılamaz bir şekilde.

Aynanın önünden geçerken duraksadı. Göründüğünü düşündü. Görünüyordu — gözleri, saçları, üstündeki kıyafeti. Ama nasıl oluyor da görünür bir insan, bir grup içinde bu kadar görünmez olabiliyordu?

Işığı kapatmadan önce penceresinden dışarıya baktı. Komşunun odası aydınlıktı. Birisi masada oturuyordu. Cansu bir süre o ışığa baktı, sonra perdeyi çekti.`,
  },

  {
    id: 'dislanma_body_01',
    category: 'dislanma',
    emotionTags: ['yalnizlik', 'utanc'],
    storyMoment: 'body_next_day',
    title: 'Kafeterya Matematiği',
    content: `Kafeteryaya girerken Cansu'nun gözleri otomatik olarak üç noktayı taradı: onların masası, boş masalar, çıkış kapısı. Bu artık bilinçsiz yapılan bir hesaplama hâline gelmişti — saniyeler içinde, neredeyse düşünmeden.

Onların masasına yakın oturma. Boş masada yalnız oturma — çok belli olur. En az görünen yerde, en az dikkat çeken pozisyonda.

Tepsiyi aldı, kuyrukta bekledi, kasiyer ona günaydın dedi. Cansu teşekkür etti ama sesi bir tuhaf çıktı — kulağına bile yabancı geldi.

Seçtiği masa pencerenin yanındaydı. Dışarısı görünüyordu — okul bahçesi, birkaç ağaç. Oturdu, kaşığını aldı, çorbasına baktı. Çorba ılımıştı. Aslında önemi yoktu. Önemli olan ellerin bir şeylerle meşgul görünmesiydi.

Ellerini meşgul tutarsan kimse yanına oturmak zorunda değilmiş gibi yapabilirsin. Ve kimse yanına oturmak zorunda değilmiş gibi yaparsan, yalnız olmak bir tercih gibi görünür — bir başarısızlık gibi değil.`,
  },

  {
    id: 'dislanma_conflict_01',
    category: 'dislanma',
    emotionTags: ['caresizlik', 'uzuntu'],
    storyMoment: 'inner_conflict',
    title: 'Belki Bendim',
    content: `Yatağında tavanı izlerken Cansu'nun aklı dönüp duruyordu aynı soruya. Neden? Neden şimdi, neden kendisi?

Bir hata yapmış mıydı? Doğru hatırlamaya çalıştı — son haftalarda ne söyledi, nasıl davrandı, neyi farklı yaptı. Belki çok konuşuyordu. Belki az konuşuyordu. Belki bir şey söylemişti ve farkında bile değildi. Belki sadece kendisiydi — sadece o olmak, bir hataydı.

Bu düşünce diğerlerinden daha uzun durdu. Çünkü en kolayı buydu — kendi hatasını bulmak, düzeltmeye çalışmak. Başkalarının neden böyle davrandığını anlayamazsın ama kendini değiştirmeye çalışabilirsin. Değişirsen belki. Değişirsen belki olmaz bu.

Ama sonra küçük, sessiz bir başka düşünce geldi: Değişeceksen, ne olacaksın? Kimliğinin hangi parçasını keser atacaksın?

Bu soru yanıtsız kaldı. Pencereden bir araba geçti, farlar tavana yansıdı ve kayboldu. Cansu gözlerini kapattı. Belki uyursa bu soruların hepsi sabah küçük görünür.`,
  },

  {
    id: 'dislanma_open_01',
    category: 'dislanma',
    emotionTags: ['yalnizlik'],
    storyMoment: 'open_road',
    title: 'Aynı Kapı',
    content: `Okul kapısından geçerken Cansu bir an duraksadı. Aynı kapı. Aynı demir trabzan, aynı renk boyanmış duvar. Ama bugün için bir şey farklıydı — ve bu fark kapıda değildi, içerdeydi.

Geçen hafta burada durduğunda ayakları ağırlaşmıştı. Bu hafta ağır değildi; sadece ayaktı. Bunu fark etmek tuhaf hissettirdi. İyileşmiyordum demişti kendi kendine. Ama belki iyileşmek buydu — büyük bir şeyin bitmesi değil, küçük bir ağırlığın azalması.

Koridora girdi. Onların masası vardı. Güldüler, bir şeyler izlediler telefonda. Cansu onlara bakmadı ama bunun acısı geçen haftaki kadar keskin gelmedi. Hâlâ vardı ama farklıydı. Daha tanıdık bir şeydi artık — yabancı bir acı değil, taşımayı öğrendiği bir ağırlık.

Kendi sınıfına yürüdü. Kapıya gelince içeri girdi. Masasına oturdu. Defterini açtı.

Ve bu kadar basitti: bir gün daha başlamıştı ve Cansu onun içindeydi.`,
  },

  /* ══════════════════════════════════════════════════════════════
     ALAY — Dalga geçme, lakap takma, aşağılama
     ══════════════════════════════════════════════════════════════ */

  {
    id: 'alay_moment_01',
    category: 'alay',
    emotionTags: ['utanc', 'korku'],
    storyMoment: 'the_moment',
    title: 'Gülüşün Anatomisi',
    content: `Ses önceden geldi. Bir kişinin güldüğü, sonra iki kişinin, sonra beşin. Mehmet önce anlamadı — kafasını kaldırdı, baktı. Sınıfın öbür köşesindeydi Kerem, telefonu uzatmış gösteriyordu bir şeyler.

Ekran uzaktı, küçüktü, ama kendi ismi okunuyordu.

Bundan sonrası yavaş ilerledi zihninde. Kerem'in yüzü. Diğerlerinin dönmesi. Birinin "o da biliyordu zaten" demesi. Mehmet'in elleri masaya yapıştı. Kalksa mı? Kalmasa mı? Kalksa daha mı belli olur? Güler gibi yapsa mı?

Yüzünün kızardığını hissetti. Kızarıyorum, biliyorum kızardığımı, onlar da biliyorlar — bu daha da kötü yapıyor. Döngü.

Sonunda hiçbir şey yapmadı. Oturdu. Defterine baktı ama harf görmüyordu, sadece satırlar.

Gülüşme beş dakika içinde durdu. Ders devam etti. Öğretmen tahtaya bir şeyler yazdı. Sınıf döndü. Sanki hiçbir şey olmamış gibi. Ama Mehmet için sınıf artık beş dakika öncekiyle aynı değildi.`,
  },

  {
    id: 'alay_night_01',
    category: 'alay',
    emotionTags: ['uzuntu', 'caresizlik'],
    storyMoment: 'night_after',
    title: 'Tekrar Tekrar',
    content: `Mehmet o geceyi kapatmak için üç farklı şey denedi. Önce oyun — ekrana baktı, karakterini hareket ettirdi, ama zihin başka yerdeydi. Sonra müzik — kulaklığı taktı, sesi açtı, ama sınıftaki gülüşme müziğin altından sızdı. Sonra hiçbir şey — uzandı, gözlerini kapattı.

Ve işte o zaman görüntü geldi, tam netliğiyle: Kerem'in telefonu uzatması, o ekran, o isim.

Zihin bunu neden yapıyordu? Neden defalarca oynatıyordu aynı sahneyi — sanki bir şeyi kaçırmış gibi, sanki bir dahaki seferde farklı sonuçlanacak gibi?

Her seferinde aynı şey oldu ama Mehmet her seferinde farklı tepki vermeyi hayal etti. Güldü diyebilirdi belki. Ya da kalksaydı. Ya da hiç dönmeseydi.

Ama bütün bu "ya da"lar geçmişin içindeydi ve geçmiş değişmiyordu.

Saat üçü geçiyordu. Mehmet derin bir nefes aldı. Nefes verdi. Bilmiyordu bunu kaç kez yapacağını, sabaha kadar. Bildiği tek şey: şu an uyumak istiyor ama beyin izin vermiyor.`,
  },

  {
    id: 'alay_conflict_01',
    category: 'alay',
    emotionTags: ['utanc', 'caresizlik'],
    storyMoment: 'inner_conflict',
    title: 'Doğru mu Söylediler',
    content: `O lakap. Mehmet bunu düşünmemeye çalışıyordu ama düşünce geliyordu yine de, beklenmedik anlarda — diş fırçalarken, yemek yerken, derse girerken.

Doğru muydu acaba? İnsanlar her zaman tamamen yanlış bir şeyi bu kadar çok söyler mi?

Bu düşünceyle mücadele etti. Hayır, diyordu bir sesi. Birini incitmek için söylenmiş bir şey doğru olmak zorunda değil. Ama diğer ses — daha alçak, daha kararlı — hep bir "ama" buluyordu. Ama ya gerçekten öyleyse? Ama ya fark etmiyorsan?

Bu iki ses arasında Mehmet bazen saatlerce kalıyordu. Kazanan değişiyordu. Bazen ilk ses güçlüydü ve Mehmet biraz rahatladı. Bazen ikinci.

Ve ikinci ses kazandığında en ağır şey şu oluyordu: kendine kızgın hissediyordu. Sanki inanmak istemek bir zayıflıktı. Ama inanmamak için de kanıt istiyor — ve kanıt bulmakta zorlanıyordu.

Deftere yazdı sonunda: "Birinin söylediği her şey doğru olmak zorunda değil." Baktı buna. Silmedi.`,
  },

  {
    id: 'alay_step_01',
    category: 'alay',
    emotionTags: ['korku', 'uzuntu'],
    storyMoment: 'imperfect_step',
    title: 'Bir Mesaj',
    content: `Mehmet telefona baktı. Ekran açıktı, annesinin numarası seçiliydi. Yazmaya başladı: "Anne, okulda bir şey oldu—" Sildi. "Anne, Kerem—" Sildi. "Bugün zorlu bir gün geçirdim." Bu kaldı.

Baktı buna. Bu doğruydu ama yarısıydı. Yarısını söylemek hiç söylememekten iyi miydi?

Ekranı kilitledi. Yatağa uzandı. Sonra tekrar açtı.

"Bugün okulda biriyle sorun yaşadım ve biraz moralim bozuk." Gönder.

Nefesini tuttu. Cevap gelmedi ilk bir dakika. İki dakika. Üç. Belki görmemiştir. Belki meşguldür.

Titreşim. "Ne oldu canım?"

İki kelime. Ama o iki kelimede bir şey vardı. Mehmet ne yazacağını bilmiyordu tam olarak — hepsini anlatamayacaktı bu gece, kelimeler yetmeyecekti.

Ama "canım" kelimesi ekranda duruyordu ve Mehmet onu birkaç saniye boyunca baktı.

Sonra yazmaya başladı. Yanlış cümlelerle, eksik yerlerle, hepsini anlatamadan. Ama yazmaya başladı.`,
  },

  /* ══════════════════════════════════════════════════════════════
     SİBER — İnternet/sosyal medya üzerinden zorbalık
     ══════════════════════════════════════════════════════════════ */

  {
    id: 'siber_moment_01',
    category: 'siber',
    emotionTags: ['utanc', 'korku'],
    storyMoment: 'the_moment',
    title: 'Ekran Işığında',
    content: `Defne o geceyi çalışma masasında bitirmeyi düşünüyordu — ödev vardı, bir de okumak istediği bir şey. Telefonu masanın kenarına bıraktı.

Titreşim. Bir bildirim, sonra üst üste.

Açtı. Adını bilmediği, profil resmi olmayan bir hesap onu etiketlemişti. Fotoğraf oradaydı. Hangi gün çekildiğini hatırlamıyordu ama oradaydı — ve altında bir yorum vardı. Kısa, net, bıçak gibiydi.

Okudu. Tekrar okudu.

Hesabı kapat, dedi kendi kendine. Kapattı. Ama gözleri hâlâ o sözcükleri görüyordu, ekran kapansa da.

Bu fotoğraf kaç kişiye gitmişti? Kaç kişi şu an görüyordu? Bu soruları sormak büyük bir hataydı — çünkü sorunca cevabı bilmemek daha da ağırlaşıyordu, zihin en kötü ihtimali seçiyordu.

Defne telefonu çevirerek ekranını masaya yatırdı. Ödev sayfası hâlâ açıktı bilgisayarda.

Hiçbir şey yazmadı o gece.`,
  },

  {
    id: 'siber_night_01',
    category: 'siber',
    emotionTags: ['caresizlik', 'korku'],
    storyMoment: 'night_after',
    title: 'Kapatmak Yetmiyor',
    content: `Defne uygulamayı kapattı. Açtı. Kapattı. Bu üç kez tekrar etti — her kapanışta "artık bakmayacağım" diyerek, her açılışta bir önceki kararı unutarak.

Yorum sayısı artmıştı. Yirmi beşten otuza, otuza kırka. Her yeni yorum, gönülsüzce bakan bir göz çifti daha.

Bir noktada telefonu tamamen bırakmaya karar verdi — çekmecenin içine koydu, üstüne bir şeyler örttü. Ama çekmece oradaydı. Ve içindeki telefon, o gönderi, o hesap — hepsi oradaydı. Kapatmak yetmiyordu. Ekranı kapatabilirsin ama zihnin sekmesi kapanmıyor.

Pencereden dışarı baktı — sokak lambası yanıyordu, komşunun arabası park yerindeydi. Dünya devam ediyordu. Başka evlerde başka insanlar bir şeyler yapıyordu şu an. Ve o gönderi onların hiçbirini ilgilendirmiyordu.

Ama Defne için bütün gece doluydu onunla.

Sabah olunca gönderi hâlâ orada olacaktı.`,
  },

  {
    id: 'siber_body_01',
    category: 'siber',
    emotionTags: ['korku', 'utanc'],
    storyMoment: 'body_next_day',
    title: 'Telefonu Çantaya Koymak',
    content: `Sabah okula giderken Defne telefonu çantasının en dibine koydu. Farkında olmaksızın bir karar almıştı gece: bugün bakmayacaktı.

Bakarsa birinin yüzüne bakmak zorunda kalacaktı. O yüze bakarken "biliyor mu" diye düşünecekti. Sonra diğer yüzlere bakacak ve her birinde aynı soruyu soracaktı.

Bunun yerine düz baktı. Zemine, duvara, kapıya.

Birisi günaydın dedi — sınıf arkadaşı. Defne günaydın dedi. Sesi normal çıktı. Bu küçük bir şeydi ama tuhaf biçimde önemliydi. Sesinin normal çıkması.

Sınıfa girdi, yerine oturdu. Öğretmen geldi, ders başladı. Defne elindeki kalemi tuttu ve yazmaya başladı — ama dersin notlarını değil, en üste kendi adını yazdı ve baktı.

Adı oradaydı. Kendi yazısıyla, kendi kâğıdında, kimsenin koyamayacağı ya da silemeyeceği bir yerde.

Sonra dersi yazmaya başladı.`,
  },

  {
    id: 'siber_open_01',
    category: 'siber',
    emotionTags: ['korku'],
    storyMoment: 'open_road',
    title: 'Bildirim Sesi',
    content: `Bir hafta sonra Defne'nin telefonu yine titreşti ve Defne irkildi — hâlâ irkiliyordu.

Ama bu sefer ekranda annesinin adı yazıyordu. "Akşam yemek için ne istersin?" Basit bir mesajdı. Defne "Makarna olur" yazdı ve gönderdi. Sonra durdu.

İrkilmenin geçmesi birkaç saniye sürdü. Sonra geçti.

Bu bir hafta öncekinin aynı değildi — o hafta her titreşim mide ağrısıyla geliyordu, her bildirim bir tehdit gibi hissediyordu. Bu hafta henüz tam değildi; hâlâ o irkilme anı vardı. Ama o an kısalmıştı. Ve kısalacaktı daha da.

Defne telefonu cebine koydu ve yürümeye devam etti.

Gönderi hâlâ bir yerlerde duruyordu — internet hafızası uzundu. Ama bugün ona bakmadı. Çantasının dibinde duruyordu telefon ve bu pozisyon, bu bilinçli tercih, küçük ama gerçek bir şeydi.`,
  },

  /* ══════════════════════════════════════════════════════════════
     FİZİKSEL — İtme, vurma, eşyaya zarar
     ══════════════════════════════════════════════════════════════ */

  {
    id: 'fiziksel_body_01',
    category: 'fiziksel',
    emotionTags: ['korku', 'caresizlik'],
    storyMoment: 'body_next_day',
    title: 'Omuz',
    content: `Can, sabah koridorda yürürken omzunu içe çekti. Fark etti bunu — fark etmek, bırakmak, tekrar içe çekmek.

Beden bir şeyleri hatırlar ve hatırladıklarını dışarıya vurur; beyin izin vermese de. Koridoru geçmek artık bir prosedürdü: sağa bak, sola bak, kim var, kim yok, kaç adım çıkışa. Bu hesabı kendi yapıyordu, istemeden, otomatik olarak.

Birisi arkasından seslendi — adını söyledi, sadece adını. Can döndü. Sınıf arkadaşıydı, elinde bir kâğıt tutuyordu. "Dün ders notlarını aldın mı?" Normal bir soruydu.

Ama Can'ın kalbi birkaç saniye hızlı attı — dönene kadar. Hızlı atmasının nedeni kâğıt değildi, ses değildi; sadece arkadan gelen bir sesti ve beden henüz fark etmeyi öğrenmemişti.

Sınıf arkadaşına baktı. "Evet, aldım." Sesi sakin çıktı.

Omzu hâlâ içe çekikti ama Can yürümeye devam etti.`,
  },

  {
    id: 'fiziksel_conflict_01',
    category: 'fiziksel',
    emotionTags: ['caresizlik', 'korku'],
    storyMoment: 'inner_conflict',
    title: 'Söylemek',
    content: `Can'ın aklında bir şey dönüp duruyordu: söylemek mi, söylememek mi?

Söylerse ne olur? Belki hiçbir şey — "çocuklar böyledir" der geçerler. Belki çok şey — daha da kötüleşir, üstüne gelirler.

Söylememenin de bedeli vardı: böyle devam eder. Belki azalır. Belki azalmaz.

Bu iki ihtimal arasında Can kaldı. Söylemenin riski belirliydi, söylememenin riski de. Ama söylememe riski en azından tanıdıktı. Tanıdık olan, daha az korkutucu hissettirir çoğu zaman.

Bir akşam yatmadan önce bu konuşmayı zihninde prova etti: kim, ne, nerede, nasıl. Cümleler kurdu, bozdu, tekrar kurdu. Rehber öğretmen mi? Yoksa annesi mi? Yoksa ikisi de gereksiz mi?

Sonra şunu düşündü: eğer başka biri bu durumda olsaydı, ona "söyle" mi diyecekti?

Evet, diyecekti. Tereddütsüz diyecekti.

O zaman neden kendine söylemek bu kadar zordu?`,
  },

  /* ══════════════════════════════════════════════════════════════
     SÖYLENTI — Dedikodu yayma, yalan
     ══════════════════════════════════════════════════════════════ */

  {
    id: 'soylenti_night_01',
    category: 'soylenti',
    emotionTags: ['utanc', 'caresizlik'],
    storyMoment: 'night_after',
    title: 'Kim Bildi',
    content: `Ayşe o gece kim biliyordu diye saydı. Sınıftan en az beş kişi. Onların arkadaşları — belki on kişi daha. Sosyal medyada — belli değil.

Söylenti nasıl yayılıyordu bu kadar hızlı? Kimse telefon etmiyordu, kimse toplantı yapmıyordu; sadece bir kulaktan diğerine, bir ekrandan diğerine akıyordu. Ve içinde ne kadarı doğruydu? Neredeyse hiçbiri. Ama doğruluğu önemli değildi artık — önemli olan, insanların bunu duymuş olmasıydı. Duyulan şey, gerçek olmasa da iz bırakıyordu.

Ayşe kendi adını arama motoruna yazdı. Sonuç çıkmadı. Bu iyi miydi? Yoksa söylenti arama motorlarına düşmeyecek kadar küçük müydü — sadece okulun koridorlarında, kafeteryanın köşelerinde dolaşan türden mi?

İkincisi hem iyi hem kötüydü: daha az insan biliyordu ama bilenlerin hepsi tanıdığıydı.

Ayşe aramayı kapattı. Telefonu fırlattı yatağa. Sonra döndü aldı — telefona kızgın olmak mantıklı değildi ama o gece nereye kızacağını bilmiyordu.`,
  },

  {
    id: 'soylenti_conflict_01',
    category: 'soylenti',
    emotionTags: ['utanc', 'caresizlik'],
    storyMoment: 'inner_conflict',
    title: 'Gerçekmiş Gibi',
    content: `Söylenti doğru değildi ama Ayşe'nin kafası bir noktada karışmaya başlamıştı.

İnsanlar onu yeterince çok söylediğinde — her geçişte bir bakış, her fısıltıda bir duraksamada — gerçek olmayan bir şey tuhaf bir gerçeklik kazanıyordu. Ayşe kendini bir an düşünürken buldu: ya gerçekten böyle bir şey olmuşsaydı? Neden sonra kendi kendine güldü — olmamıştı, birebil biliyordu. Ama bu düşüncenin gelmesi bile tuhaftı.

İnsanlar bir şeye yeterince inanırsa, inanılmayan kişi kendi gerçeğinden şüphe eder mi?

Bu soruyu not defterine yazdı — yanıtsız bıraktı. Ama yazmak bir şeydi. Yazmak, düşünceyi kafanın dışına çıkarıyordu ve dışarıda daha küçük görünüyordu.

Söylenti doğru değil. Bunu yazdı altına. Bunu biliyorum. Bunu da yazdı.

Bilmek hissetmekle aynı şey değil — ama bilmek en azından bir çıpa. Ve bu gece Ayşe'nin ihtiyacı olan şey buydu: tutunacak bir şey.`,
  },

  /* ══════════════════════════════════════════════════════════════
     TEHDİT — Korkutma, tehdit
     ══════════════════════════════════════════════════════════════ */

  {
    id: 'tehdit_body_01',
    category: 'tehdit',
    emotionTags: ['korku', 'caresizlik'],
    storyMoment: 'body_next_day',
    title: 'Rotalar',
    content: `Emre okula varır varmaz iki şeyi kontrol etti: koridorun sağı mı, solu mu. Geçen hafta bir şey olmuştu sağ koridorda — tam olarak nerede durduğunu, hangi saatte, kaç kişinin çevresinde olduğunu biliyordu artık.

Bu bilgi faydalıydı. Rotaları değiştirmek mümkündü — birkaç dakika daha, birkaç adım daha, ama mümkündü. Teneffüste tuvaleti değiştirdi. Öğle arasında farklı masada oturdu.

Bu kararları kimseye söylemedi. Söyleseydi ne derdi? "Birisinden korktuğum için rotamı değiştiriyorum"? Doğruydu ama kelimeler dışarı çıktığında farklı hissettiriyordu — daha gerçek, daha korkutucu. Kafasında kalmak belki daha iyiydi.

Ders zili çaldı. Emre sınıfına giderken sağ koridor yerine solu seçti. Üç dakika daha.

Ama bugün için yeterliydi. Bugün için sağ koridordan geçmek zorunda kalmadı ve bu küçük şey, o sabah önemli hissettirdi.`,
  },

  {
    id: 'tehdit_step_01',
    category: 'tehdit',
    emotionTags: ['korku', 'caresizlik'],
    storyMoment: 'imperfect_step',
    title: 'Kâğıda Yazdım',
    content: `Emre not defterinin son sayfasını açtı — kimsenin bakmadığı sayfa, derse hiç kullanmadığı. Kalemini aldı ve yazmaya başladı.

Tarih. Yer. Ne oldu. Kim. Ne söyledi. Ayrıntılar.

Yazdıkça elin titrediğini fark etti — biraz. Ama yazmak, hafızanın sisi içinden bir şeyleri netleştiriyordu: bu gerçekten olmuştu. Sadece kafasında değildi. Somuttu, sayfadaydı, tarihli.

"Bunu bir yetişkine göstereceğim" diye düşünmedi o an — sadece yazdı. Belki göstermeyecekti. Belki bu sayfa kapanacak ve bir daha açılmayacaktı.

Ama bir ihtimal olarak oradaydı şimdi. Ve olasılık, seçenek anlamına geliyordu.

Çantasına koydu defteri. Teneffüse çıktı. Dışarıda rüzgar vardı, hafif. Diğerleri konuşuyor, koşuyor, gülüyordu. Emre duvara yaslandı.

Defteri çantasındaydı. Birisi biliyordu şimdi — gerçek bir insan olmasa da, o sayfa biliyordu. Yalnız hissetmek azalmamıştı ama tek başına değildi bu kaydıyla.`,
  },

  /* ══════════════════════════════════════════════════════════════
     DİGER — Genel; karma ya da tanımlanmamış zorbalık türleri
     ══════════════════════════════════════════════════════════════ */

  {
    id: 'diger_night_01',
    category: 'diger',
    emotionTags: ['caresizlik', 'uzuntu'],
    storyMoment: 'night_after',
    title: 'Nasıl Anlatırım',
    content: `Aslı o gece ne olduğunu anlatmaya çalıştı — önce kendi kendine. Kelimeleri sıraladı zihninde ama doğru sırayı bulamadı.

Başından beri mi anlatsa? Ama başı neredeydi ki? Yoksa bugünkü anla mı başlasa? Ama bugünkü an, her şey olmadan anlam ifade etmiyordu. Aralarındaki tarihin tamamını bilmesi gerekiyordu birinin, anlayabilmesi için.

"Zorbalık" diyebilirdi. Sözcük vardı. Ama sözcük hem çok büyüktü hem çok küçüktü aynı anda. Büyüktü çünkü dramayı büyütüyordu sanki. Küçüktü çünkü içindeki şeyin tamamını karşılamıyordu.

Yatağında döndü. Annesi kapıyı tıklattı, "uyuyor musun?" dedi. "Evet," dedi Aslı.

Uyumuyordu. Ama anlatmaya hazır değildi. Henüz değil. Belki yarın. Belki birkaç gün daha. Belki anlatmanın bir yolunu bulacaktı — tam doğru kelimeleri değil, ama yakın olan kelimeleri.

Penceresinden yıldızlar görünüyordu. Bulutsuz bir geceydi. Bu, önemsiz bir ayrıntıydı. Ama Aslı buna baktı.`,
  },

  {
    id: 'diger_open_01',
    category: 'diger',
    emotionTags: ['uzuntu'],
    storyMoment: 'open_road',
    title: 'Küçük Değişim',
    content: `Bir sabah Aslı okul çantasını hazırlarken fark etti: her zamanki gibi hazırlamıştı. El otomatik gitmişti kalem kutusuna, sonra deftere, sonra su şişesine.

Bu rutin, son haftalarda bozulmuştu — bazı sabahlar çantayı hazırlamak zorlaşmıştı, hangi adımın ne anlama geldiği bulanıklaşmıştı. Ama bugün el gitmişti, beyin düşünmemişti.

Bu küçük bir şeydi. Ama küçük şeyler bazen göstergeydi.

Okula giderken hava soğuktu, nefesi buhar yapıyordu. Aslı bir süre buna baktı — nefes, buhar, kaybolmak. Sonra yürümeye devam etti.

Okulun önünde diğer öğrenciler gelip geçiyordu. Tanıdık yüzler, tanıdık sesler. Her şey aynıydı.

Ama Aslı'nın içinde bir şey, çok küçük bir şey, geçen haftakinden farklıydı. Bunu kelimeyle tanımlayamazdı. Sadece hissediyordu — biraz daha yer kaplıyordu bu sabah. Biraz daha oradaydı.

Kapıdan içeri girdi.`,
  },

  /* ══════════════════════════════════════════════════════════════
     EVRENSEL — Her kategoride kullanılabilir, yüksek kalite
     ══════════════════════════════════════════════════════════════ */

  /* ══════════════════════════════════════════════════════════════
     ALAY — Eksik anlar: body_next_day, open_road
     ══════════════════════════════════════════════════════════════ */

  {
    id: 'alay_body_01',
    category: 'alay',
    emotionTags: ['utanc', 'caresizlik'],
    storyMoment: 'body_next_day',
    title: 'Lakap Sesi',
    content: `Mehmet, sabah sınıfa girerken kapıda duraksadı. İçeriden sesler geliyordu — normal sesler, gülüşmeler, sandalye gıcırtıları. Ama içeri girmeden önce bir an bekledi.

Bu beklemek yeniydi. Bir hafta önce yoktu.

Masasına yürürken gözleri önünde duruyordu. Birisi bir şey söyledi — adını mı, lakapı mı, tam anlamadı. Sesi duydu ama anlamı gecikti.

İlk hafta bu gecikme yoktu. Duyunca anında içinden geçiyordu. Şimdi bir saniye duraklamak bazen yetiyordu. Bu ilerleme miydi yoksa alışmak mıydı, Mehmet bilmiyordu.

Masasına oturdu. Defterini çıkardı. Ders başladı.

Öğretmen tahtaya bir şey yazdı ve Mehmet baktı — gerçekten baktı, takip etti, anlamaya çalıştı. Bu da yeniydi. Son haftalarda tahtaya bakıyor ama görmüyordu.

Bugün gördü. Küçük bir şeydi bu ama buydu işte.`,
  },

  {
    id: 'alay_open_01',
    category: 'alay',
    emotionTags: ['utanc', 'uzuntu'],
    storyMoment: 'open_road',
    title: 'Defterdeki Cümle',
    content: `Mehmet o gün Türkçe dersinde kendi yazdığı bir cümleye baktı ve durdu.

Cümle iyiydi. Öğretmen "güzel" demişti — sınıfın önünde okumamıştı, sadece defterine yazmıştı, ama "güzel" demişti.

İki ay önce bu kelime farklı hissettirirdi. Her "güzel" başka bir şeyi de getirirdi — o lakap geliyor muydu, geliyor muydu? Artık bu döngü başlamıyordu hemen.

Bugün "güzel" sadece güzeldi.

Teneffüste dışarıya çıktı. Oyun grubuna katılmadı — katılmak istemiyordu, bu sefer kaçmak için değil, sadece istemediği için. Bu fark önemliydi. Hangisinin hangisi olduğunu artık anlayabiliyordu.

Duvara yaslandı. Serin bir günün güneşi sırtını ısıttı. Gözlerini kapattı. O lakap aklına geldi — gelmemesi için çaba harcamadı, geldi. Ve bekledi. Ve geçti.

Geçmesi daha önce bu kadar kolay değildi.`,
  },

  /* ══════════════════════════════════════════════════════════════
     FİZİKSEL — Eksik anlar: the_moment, night_after, imperfect_step, open_road
     ══════════════════════════════════════════════════════════════ */

  {
    id: 'fiziksel_moment_01',
    category: 'fiziksel',
    emotionTags: ['korku', 'utanc'],
    storyMoment: 'the_moment',
    title: 'İtilmek',
    content: `Can, teneffüste koridordan geçerken ilk itişi hissetmedi tam olarak — anlamak birkaç saniye aldı.

Omzuna bir el değdi, döndü. Üç kişi vardı. Ortadaki güldü. Can yüzlerine bakmak zorunda kalmamak için aşağıya baktı, ama gülüşme kulaklarda kaldı.

"Nereye?" dedi biri.

Can bir şey söylemedi. Cevap bulmak için aklı çalıştı ama kelimeler gelmedi. Gelseydi ne olacağını hesaplamak zaman aldığı için. Bu hesap yapılırken üç kişi çoktan geçip gitmişti.

Koridorda kaldı. Çantasının askısını tuttu. Elinin titrediğini o zaman fark etti — hafifçe, ama yanlış yerde titriyordu.

Bir öğrenci yanından geçti. Bir öğretmen kapısını kapattı. Zil bir dakika sonra çalacaktı.

Can koridorun duvarına yaslandı. Nefes aldı. Verdi. Midesi yukarı çekiyordu.

Zil çaldı. Derse girmek zorundaydı.`,
  },

  {
    id: 'fiziksel_night_01',
    category: 'fiziksel',
    emotionTags: ['korku', 'uzuntu'],
    storyMoment: 'night_after',
    title: 'Çantayı Kaldırmak',
    content: `Can, o gece çantasını odanın ortasına bıraktı. Normalde kapının yanına koyardı — yarın kolayca alabilmek için. Ama o gece kapının yanına götürmedi.

Çantayı görünce bugünü hatırlıyordu.

Masasına oturdu. Ödev vardı — matematikti. Kalemini açtı. Birinci soruyu okudu. İkinci kez okudu. Üçüncüde ne sorduğunu hâlâ anlamamıştı.

Kalkıp yatağa uzandı.

Tavanı izlerken koridor geldi aklına. Üç kişi. O gülüşme. Kendi elleri.

Neden bir şey dememişti? Bu soruyu defalarca sordu kendine ve her seferinde farklı bir cevap geldi: söyleseydi daha kötü olurdu, söyleseydi çok belli olurdu. Belki hepsi doğruydu. Belki hiçbiri.

Bir yerden ses geldi — TV belki. Normal bir ses. Dünya devam ediyordu dışarıda.

Can gözlerini kapattı. Bugün olmuştu. Yarın da okula gidecekti. Bu ikisi aynı anda hem çok büyük hem çok küçük hissettirdi.`,
  },

  {
    id: 'fiziksel_step_01',
    category: 'fiziksel',
    emotionTags: ['korku', 'caresizlik'],
    storyMoment: 'imperfect_step',
    title: 'Kâğıt',
    content: `Can o sabah okula erken geldi — kasıtlı değil, otobüs erken gelmişti. Okul kapısında bekledi.

Rehber öğretmenin odası oradaydı. Kapı kapalıydı.

Bu kapıyı üç haftadır görmezden geliyordu. Bugün durdu önünde. Bir şey yazmayı düşündü — kâğıda, sadece ne olduğunu. Bazen yazmak söylemekten önceydi.

Çantasından defterini çıkardı. Boş sayfa. Yazdı: "Koridorda itildim. Birden fazla kez oldu."

Baktı buna. Kâğıtta duruyordu. Fazla dramatik görünüyor muydu? Az mı? İkisini de bilmiyordu.

Defteri kapattı. Çantasına koydu.

Kapı hâlâ kapalıydı. Zil on dakika sonra çalacaktı. Can bir süre kapıya baktı. Vurmadı.

Ama yazdığı sayfa çantasındaydı. Bir gün vurmak isteyebilirdi. O zaman elinde somut bir şey olacaktı — belirsiz bir his değil, tarihli, kâğıttaki sözcükler.

Bu bugün için yeterliydi.`,
  },

  {
    id: 'fiziksel_open_01',
    category: 'fiziksel',
    emotionTags: ['korku', 'caresizlik'],
    storyMoment: 'open_road',
    title: 'Omuz Bırakıldı',
    content: `Bir hafta sonra Can aynı koridordan geçti.

Aynı koridor. Aynı locker'lar, aynı renk boyalı duvarlar. Can fark etti bunu — fark etmek için çaba harcamadı, kendiliğinden geldi.

Omzunu içe çekip çekmediğini kontrol etti. Çekiyordu, biraz. Ama geçen haftakinden daha az.

O üç kişi başka bir yerde duruyordu. Can onlara bakmadı. Bakmak istemediği için değil — nerede olduklarını bilmek eskisi kadar acil değildi artık.

Koridoru geçti.

Dışarıda güneş vardı ve teneffüste bahçeye çıktı. Duvara değil, ortasına gitti. Oturdu yere, defterini açtı ve bir şeyler karaladı — düz çizgiler, dörtgenler, ödev değil. Karalamak kafayı başka yere götürüyordu.

Zil çalmadan önce birkaç dakika geçti böyle. Can defterini kapattı. Kalkacaktı ki fark etti — omuzları bırakılmıştı. İçe çekik değildi, sadece omuzlardı.

Küçük bir şeydi. Ama Can fark etti.`,
  },

  /* ══════════════════════════════════════════════════════════════
     SÖYLENTI — Eksik anlar: the_moment, body_next_day, imperfect_step, open_road
     ══════════════════════════════════════════════════════════════ */

  {
    id: 'soylenti_moment_01',
    category: 'soylenti',
    emotionTags: ['utanc', 'korku'],
    storyMoment: 'the_moment',
    title: 'Duydum Dediler',
    content: `Ayşe kantinde tepsiyle dönerken durdu.

Kendi adını duymuştu — net, yüksek değil ama net. Arkasından geliyordu, bir masadan. Döndü mü? Dönmedi. Ama durdu.

Yürüdü. Boş bir yere gitti, oturdu. Kulaklarda o isim kalıyordu — kendi adı, başkasının ağzında, ne bağlamda söylendiğini bilmiyordu. Bu en kötüsüydü: ne söylendiğini duymamak.

Belli belirsiz bir cümle gelmişti — "Ayşe'nin o..." Sonrası gürültüde kaybolmuştu.

"O" nun ne olduğunu bulmak için aklı çalışmaya başladı. Yakın zamanda ne olmuştu, kime ne söylemişti, neyi biri bozmuş olabilirdi?

Liste uzadı. Bu listenin uzaması başlı başına bir şeydi.

Tepsideki yemek soğudu. Ayşe fark etmedi. Gözleri masada değildi — o sesin geldiği yöne bakmadan o yöndeydi zihin.

Söylenti ne kadar yayılmıştı? Gerçek miydi? Bu iki sorudan hangisi daha korkutucuydu, Ayşe henüz bilemiyordu.`,
  },

  {
    id: 'soylenti_body_01',
    category: 'soylenti',
    emotionTags: ['utanc', 'caresizlik'],
    storyMoment: 'body_next_day',
    title: 'Bakışları Yorumlamak',
    content: `Ertesi gün Ayşe okula girdiğinde gözleri iki şeyi taradı: kim bakıyor, kim bakmıyor.

Bakanlar: belki biliyorlar. Bakmayanlar: bilmedikleri için mi, bilmek istemedikleri için mi? Her iki gruba da anlam yükledi — ve her iki anlam da aynı yere çıkıyordu.

Derse girdi. Sırasına oturdu. Öğretmen konuştu. Ayşe dinlemeye çalıştı ama kulaklar yarı oradaydı.

Sıra arkasından bir fısıltı geldi. Normalde umursamazdı. Bugün kulakları döndü — kendi adı geçiyor muydu? Geçmiyordu. Sıradan bir fısıltıydı.

Ama artık her fısıltı önce kendi adının olup olmadığını tarıyordu. Otomatik, iradeyle değil.

Öğle arasında tuvalete gitti. Aynaya baktı. Görünüşü normaldi. Hiçbir şey yazılı değildi yüzünde.

Ellerini yıkadı. Suyun sesi birkaç saniye her şeyi bastırdı. Ayşe ellerini kurulayıp koridora çıktı.

Hâlâ tarıyordu. Ama bir sonraki adımı attı.`,
  },

  {
    id: 'soylenti_step_01',
    category: 'soylenti',
    emotionTags: ['utanc', 'caresizlik'],
    storyMoment: 'imperfect_step',
    title: 'Yazıp Silmek',
    content: `Ayşe o akşam en güvendiği kişiyi düşündü. Bir isim geldi — annesinin değil, sınıftaki birinin de değil. Farklı sınıfların Türkçe öğretmeni — ama daha önce iki kez konuşmuşlardı ve her ikisinde de dinlediğini hissettirmişti.

Telefona açtı. Okul portalından resmi e-posta adresini buldu.

Yazdı: "Merhaba, bir şey danışmak istiyordum —" Sildi.

"Hakkımda yanlış bir şey yayılıyor ve ne yapacağımı bilmiyorum." Baktı. Doğruydu. Ama çok doğruydu — bu kadar net bir şey göndermek...

Sildi.

"Merhaba, okuldaki bir şey hakkında konuşabilir miyiz? Uygun bir zamanınız olursa." Gönder.

Nefesini tuttu. Pişmanlık geldi — anında, ilk saniyede. Ama gönderilmişti.

Bir saat sonra cevap geldi: "Yarın teneffüste gel."

Üç kelime. Ayşe ekranda baktı buna. Yarın teneffüse gitme fikri hem ürküttü hem rahatlamanın bir ucunu tutturdu.`,
  },

  {
    id: 'soylenti_open_01',
    category: 'soylenti',
    emotionTags: ['utanc', 'uzuntu'],
    storyMoment: 'open_road',
    title: 'Kim Ne Dedi',
    content: `Bir ay sonra Ayşe o söylentiyi düşündü — ne kadar yayıldığını, ne kadara ulaştığını, ne kadarının gerçek olduğunu hiçbir zaman tam öğrenmemişti.

Garip olan şu: öğrenmek istemiyordu artık.

Değil ki önemli değildi. Birkaç hafta önce çok önemliydi. Ama şu an öğrenmek için bir şey yapmayı düşünürken içinde bir şey "gerek yok" dedi. Kaçmak için değil, gerçekten gerek yok gibiydi.

Öğretmenle konuşmuştu. "Bazı şeyler soruşturamayız ama gözetleyebiliriz" demişti. Tam bir çözüm değildi. Ama gerçekti — bir yetişkin biliyordu, ve bu tek başına bir şeydi.

Koridorda yürüdü. Biri bir şey söyledi, kahkahalar attı. Almıyor muydu artık, yoksa farklı mı hissediyordu?

Bilmiyordu kesin olarak. Ama adımları eskisi gibi ağırlaşmıyordu.

Sınıfına girdi, yerine oturdu, defterini açtı.

Söylenti bir yerlerde duruyordu. Ayşe buradaydı.`,
  },

  /* ══════════════════════════════════════════════════════════════
     TEHDİT — Eksik anlar: the_moment, night_after, inner_conflict, open_road
     ══════════════════════════════════════════════════════════════ */

  {
    id: 'tehdit_moment_01',
    category: 'tehdit',
    emotionTags: ['korku', 'caresizlik'],
    storyMoment: 'the_moment',
    title: 'Bekle Seni',
    content: `Emre, teneffüste kantinden çıkarken koluna birinin değdiğini hissetti.

Döndü. İki kişiydi. Aynı sınıftan değil ama aynı koridoru paylaşıyorlardı. Biri güldü, diğeri yüzüne bakmıyordu.

"Hoca'ya söyledin, değil mi?" dedi ilki.

Emre bir şey söylemedi. Ne "evet" ne "hayır" güvenli hissettirdi.

"Bekle seni." Bu kadar. Döndüler, gittiler.

Emre kantinin kapısında kaldı. İki saniye, beş saniye. Etraf devam ediyordu — öğrenciler geçiyor, zil iki dakikaya çalacaktı, biri gülerek geçti yanından.

Midesi döndü. Değil ki bulantıdan — içten sıkışmak gibi farklı bir şey. Bacakları biraz ağırlaştı.

"Bekle seni" — bu ne anlama geliyordu? Bugün mü, yarın mı, gerçekten mi, boş bir tehdit mi? Bu soruların cevabı yoktu ve cevabı olmamak, en kötü versiyonu hayal ettiriyordu.

Zil çaldı. Emre içeri girdi.`,
  },

  {
    id: 'tehdit_night_01',
    category: 'tehdit',
    emotionTags: ['korku', 'caresizlik'],
    storyMoment: 'night_after',
    title: 'Tekrar',
    content: `Emre o gece uyuyamadı.

Saat onu geçmişti, sonra on biri. Tavanı izliyordu — beyaz tavan, lambanın şekli, bir köşedeki sararmış boya.

"Bekle seni" dönüp duruyordu. Sadece iki kelimeydi ama iki kelime kafada büyüyordu — yarın ne yapacaklar, nerede, nasıl, kim daha gelecek?

Senaryolar geldi. Her senaryoda farklı şeyler oluyordu. Ama bu "olacaklar" hayal içinde bile düzgün sonuçlanmıyordu; hayal içinde bile cevap bulmak zordu.

Telefona baktı. Saat 00:14. Kimi arasaydı bu saatte? Annesini uyandırsa ne diyecekti? "Biri bana tehdit savurdu" — bunu söylemek mümkün mü, bunu söylemek neyi başlatır, daha da kötü olur mu?

Bu sorular birbirini takip etti.

Pencereden ay görünüyordu. Emre bir süre aya baktı. Ay cevap vermiyordu, tabii. Ama bakmak için bir yer olması iyiydi.

Sabah geldi — bir noktada uyumuştu, bilmiyordu ne zaman.`,
  },

  {
    id: 'tehdit_conflict_01',
    category: 'tehdit',
    emotionTags: ['korku', 'caresizlik'],
    storyMoment: 'inner_conflict',
    title: 'Söylemek mi',
    content: `Emre'nin aklında bir hesap dönüyordu: söylemek mi, söylememek mi?

Söylerse — kim? Öğretmen mi, rehber mi, anne mi? Her biri farklı sorular getirir. Öğretmen okul meselesi yapar, belki daha çok dikkat çeker. Anne merak eder, korkar, kendini suçlar. Rehber — hiç bilmiyordu, oraya gitmemişti.

Söyleme neyi değiştirdi? Muhtemelen bir şeyi. Ama ne yönde değiştireceği belirsizdi. Belirsizlik en kötüsüydü.

Söylemezse — bugün iyi geçebilir, tehdit boş çıkabilir. Ya da geçemez.

Bu iki seçenek arasında kaldı. Söylemenin riski somuttu, söylememenin riski soyuttu — ama soyut tehlike bazen daha ağır basıyordu çünkü hayal gücü her zaman gerçekten kötüymüş gibi dolduruyordu.

Not defterine yazdı sonunda: "Söylersem ne olur?"

Altına: "Söylemezsem ne olur?"

İkinci cevap daha uzun çıktı. Bu bir şey mi anlatıyordu?

Defteri kapattı. Cevap net değildi hâlâ. Ama yazılmış olması, kafanın içindeki döngüden biraz daha net görünmesini sağladı.`,
  },

  {
    id: 'tehdit_open_01',
    category: 'tehdit',
    emotionTags: ['korku', 'uzuntu'],
    storyMoment: 'open_road',
    title: 'Aynı Koridor',
    content: `İki hafta sonra Emre aynı koridordan geçti.

Duraksadı mı? Duraksadı — ama geçen sefer duraksaması daha uzundu. Bu sefer iki adım önceden fark etti, bir nefes aldı, geçti.

O iki kişi oradaydı. Biri telefona bakıyordu, diğeri bir şeyler anlatıyordu arkadaşına. Emre'ye bakmadılar.

Bu iyi miydi yoksa görmezden mi geliyorlardı? Emre bilmiyordu. Ama "bekle seni" — bir hafta önceki kadar büyük değildi kafada artık.

Rehber öğretmenle konuşmuştu. Tam olarak ne olacağını bilmiyordu — öğretmen "takip edeceğiz" demişti, somut bir eylem planı değildi ama biri biliyordu. Bir yetişkin bilmesiydi bu.

Bilmeden önce Emre yalnızdı bu kafayla. Şimdi en azından o kafayı paylaşmıştı.

Koridor bitmişti. Sınıfa girdi.

Tehdit tamamen geçmişti mi? Bilmiyordu. Ama dün koridoru düşünerek uyumadı. Bu birinciden farklıydı.`,
  },

  /* ══════════════════════════════════════════════════════════════
     EVRENSEL — Ek anlar: world_before, imperfect_step, ikinci connection
     ══════════════════════════════════════════════════════════════ */

  {
    id: 'universal_before_01',
    category: 'diger',
    emotionTags: ['uzuntu', 'yalnizlik'],
    storyMoment: 'world_before',
    title: 'Önceki Sabah',
    content: `Bir sabah vardı — tam olarak hangi sabah olduğu değişmişti ama o sabah vardı.

O sabah okul çantasını hazırlarken müzik dinliyordu. Hangi şarkıydı hatırlamıyor artık, ama dinliyordu. Ve çantayı hazırlarken bir şeyler mırıldanıyordu.

O sabah öğretmenin "güzel" dediği bir cümle yazmıştı. Sadece bir cümleydi ama o gün iyiydi.

O sabah öğle arasında yanına oturan biri vardı — kimdi, ne konuştular, bunlar belirgin değil. Ama biri oturmuştu.

Bu ayrıntılar küçük hissettiriyor şimdi. Ama şimdi o ayrıntılara bakınca bir şey görünüyor: o sabah her şey hâlâ yerindeydi. Müzik çalıyordu, cümle güzeldi, biri yanındaydı.

Bir şeyler bittikten sonra, bitmeden önceki o sıradan sabah değer kazanıyor. Sıradan olduğu için değil — orada olduğu için.

O sabah hâlâ olmuştu. Kimse onu geri alamazdı.`,
  },

  {
    id: 'universal_step_01',
    category: 'diger',
    emotionTags: ['caresizlik', 'uzuntu'],
    storyMoment: 'imperfect_step',
    title: 'İlk Cümle',
    content: `Yazmak üç denemede oldu.

İlk seferinde: "Okulda bazı sorunlar yaşıyorum." Sildi — çok belirsiz.

İkinci seferinde: "Birisi beni rahatsız ediyor ve durmuyor." Baktı buna. Doğruydu ama "birisi" ve "rahatsız" kelimeleri yeterince taşımıyordu gerçeği. Sildi.

Üçüncüde sadece şunu yazdı: "Bu hafta çok yoruldum."

Bu da tam değildi. Ama bu sefer göndermek daha kolaydı — çünkü doğruydu ve tamamını söylemek zorunda değildi şimdi.

Gönderdi.

Cevap birkaç dakika sonra geldi. "Anlat." İki kelime, soru işareti bile yok. Ama "anlat" kapı açık bırakıyordu.

Bir şey yazmaya başladı — düzensiz, bazen geri dönerek, bazen atlayarak. Tamamını anlatmadı. Ama yazarken bir şey oldu: kelimeler çıktıkça içeride yer açılıyordu. Az, ama vardı.

Mesajı gönderdi. Cevap bekledi. Beklemek zordu. Ama mesaj gitmişti ve bu tek başına bir şeydi.`,
  },

  {
    id: 'universal_connection_01',
    category: 'diger',
    emotionTags: ['yalnizlik', 'uzuntu'],
    storyMoment: 'connection',
    title: 'Gördüm Dedi',
    content: `Selin öğle arasında koridorda Naz'ın yanından geçiyordu. Durdu.

Bu beklenmedik bir şeydi — Selin her zaman koşarak geçerdi, her zaman bir yere yetişiyordu. Ama bu sefer durdu. "Gördüm," dedi. Başka bir şey söylemedi.

Naz ne diyeceğini bilemedi. "Gördüm" ne anlama geliyordu? Neyi gördü? Sınıftaki anı mı, koridordaki bakışları mı, her şeyi mi? Sormadı. Cevap beklemedi zaten Selin de.

Sadece oturdu yanına. Tepsiyi bıraktı masaya. Telefona bakmadı. Bir şey anlatmaya başlamadı — geçen hafta basketbolda ne olduğunu ya da hafta sonu nereye gideceğini. Sadece oturdu.

Bu beş dakika sürdü, belki on. Sonra zil çaldı ve Selin kalktı. "Sonra görüşürüz," dedi, normal bir sesle, ve gitti.

Naz masada kaldı. Tepsi önündeydi, yemek soğumuştu. Ama midesindeki o sıkışmış his — o ağırlık — biraz gevşemişti. Bir insan oturmuştu yanına. Bu kadar küçük, bu kadar büyük.`,
  },

  {
    id: 'universal_witness_01',
    category: 'diger',
    emotionTags: ['caresizlik', 'uzuntu'],
    storyMoment: 'connection',
    title: 'Rehber Odası',
    content: `Kapıya üç kez vurmak büyük bir karardı.

İlk vuruştan önce Kemal iki kere geri döndü. "Gerek yok" dedi kendi kendine. "Abartıyorum." Ama ikinci sefer geri dönmeye karar verdiğinde, ayakları durdu.

Vurdu. İçeriden "gel" sesi duyuldu.

Rehber öğretmen masasından baktı. Gözlüklüydü, elinde bir kalem vardı. "Otur," dedi, soru sormadan. Sanki bunu bekliyormuş gibi — ya da bekliyormuş gibi değil, sadece hazırdı.

Kemal oturdu. Konuşmaya başladı — dağınık, sırasız, bazen geriye dönerek, bazen atlayarak. Öğretmen not almadı. Sadece baktı ve zaman zaman "anlıyorum" ya da "devam et" dedi.

Hiçbir şey çözülmedi o odada. Kimse "her şey yoluna girecek" demedi. Kemal dışarı çıktığında sorun hâlâ oradaydı — aynı kişiler, aynı okul, aynı koridorlar.

Ama bir insan biliyordu artık. Gerçek bir insan, gerçek bir odada. Ve bu, bir dakika öncesinden farklıydı.`,
  },

];
