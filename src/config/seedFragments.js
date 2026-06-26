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
