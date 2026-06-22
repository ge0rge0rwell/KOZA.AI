/**
 * KOZA — tohum içerik havuzu.
 * Topluluk galerisini ilk açılışta dolu hissettiren, özenle yazılmış örnek eserler.
 * Gizlilik: burada asla ham kullanıcı girişi (userInput) bulunmaz;
 * tüm metinler dönüştürülmüş eser formatındadır.
 */

/* ─── Paylaşılan yerel yedek sabitler (ai.js de bunları kullanır) ─── */

export const LOCAL_STORY_PAGES = [
    ['Kozanın İçinde', 'Defne için o gün, diğer günlerden farklı başlamamıştı. Koridorlar aynı koridorlar, ziller aynı zillerdi. Ama teneffüste duyduğu o fısıltılar ve ardından gelen kahkahalar, göğsünde küçük bir taş gibi oturdu. Sıranın altında ellerini birleştirdi, kimse görmesin istedi. Dışarıdan bakan biri sadece sessiz bir öğrenci görürdü; oysa içeride, kelimelerin çarptığı yerde, görünmeyen bir iz kalıyordu.'],
    ['Sessizliğin Ağırlığı', 'Eve dönüş yolunda kulaklığını taktı ama müziği açmadı. Sessizliği dinledi. "Neden ben?" sorusu, cevapsız bir kâğıt uçak gibi zihninde dönüp duruyordu. Yemekte az konuştu, odasına erken çekildi. Tavana bakarken fark etti: son günlerde gülüşünü evde unutur olmuştu. Sessizlik bazen dinlendirir; ama bu sessizlik, omuzlarına yağan kar gibi sessizce birikiyordu.'],
    ['Küçük Bir Kıvılcım', 'Bir akşam, eski fotoğraflara bakarken durdu. Bisiklete binmeyi öğrendiği gün düşe kalka pedal çeviren, dizleri yara içinde ama gözleri parlayan çocuk da kendisiydi. O çocuk vazgeçmemişti. O an zihninde bir kıvılcım çaktı: "Bana söylenen sözler, benim kim olduğum değil." Bu cümleyi bir kâğıda yazdı ve masasının kenarına yapıştırdı. Kozanın duvarında ilk ince çatlak belirmişti.'],
    ['İçerideki Güç', 'Defne, kendinde unuttuğu şeyleri tek tek hatırlamaya başladı: en zor bulmacaları çözen sabrını, küçük kardeşine masal anlatırken kurduğu renkli dünyaları, bir arkadaşı üzüldüğünde onu fark eden ince gözlerini. Bunların hiçbiri fısıltılarla silinebilecek şeyler değildi. Güç, meğer hep oradaymış; sadece üstü, başkalarının sözleriyle örtülmüş.'],
    ['Karar Anı', 'Ertesi sabah aynanın karşısında durdu ve denedi: "Bu davranışın hoşuma gitmiyor. Lütfen dur." Sesi önce titredi, ikincisinde duruldu. Sonra bir karar daha aldı: bunu tek başına taşımayacaktı. Rehberlik servisinin kapısının yanından kaç kez geçmişti, hep başka tarafa bakarak. Bu kez kapıya bakacaktı. Yardım istemek, zayıflık değildi; tam tersine, kendi hikâyesinin direksiyonuna geçmekti.'],
    ['İlk Adım', 'Teneffüs zili çaldığında kalbi hızlıydı ama adımları kararlıydı. Rehber öğretmenin kapısını tıklattı. İçeri girdiğinde kelimeler önce dağınık döküldü, sonra yerini buldu. Öğretmeni onu bölmeden dinledi ve şöyle dedi: "Bunu anlatman büyük bir cesaret." Defne, omuzlarındaki görünmez karın eridiğini hissetti. Yalnız taşıdığı yük, paylaşınca yarıya inmişti.'],
    ['Yan Yana', 'Sonraki günlerde bir şeyler usulca değişti. Sınıftan iki kişi, olanları fark ettiklerini ve yanında olduklarını söyledi. Birlikte yemek yediler, birlikte güldüler. Defne fark etti: fısıltılar hâlâ ara sıra duyuluyordu ama artık aynı güçte çarpmıyordu; çünkü yanında duran insanlar, sözlerden daha gerçekti. Bir koza, içinde büyüyen kanatları sonsuza dek saklayamazdı.'],
    ['Yeni Bir Duruş', 'Aynı koridorlar, aynı ziller... Ama farklı bir Defne. Başı dik yürüyor, gözleri yere değil ileriye bakıyordu. Bir gün, ona söylenen eski bir söz tekrar edildiğinde derin bir nefes aldı ve sakin bir sesle "Bu sözün bana bir etkisi yok artık." dedi, sonra arkadaşlarının yanına yürüdü. Söz, havada asılı kaldı ve sahibine geri döndü. Kozanın kabuğu, içeriden açılmıştı.'],
    ['Bir Kanat da Sen Ol', 'Hafta sonu okul bahçesinde, köşede tek başına oturan yeni öğrenciyi gördü. O bakışı tanıyordu; bir zamanlar aynaya bakan kendi gözleriydi onlar. Yanına gitti, "Yanına oturabilir miyim?" diye sordu. Küçük bir soru, ama o çocuğun gözlerindeki buzu eritmeye yetti. Defne o gün anladı: kendi zorluğu, başkasını fark eden bir pusulaya dönüşmüştü.'],
    ['Kanatların Hatırası', 'Defne artık biliyor: o günler hikâyesinin sonu değil, kozasının evresiydi. Hâlâ zor günler olabilir; kelebekler de rüzgârda zorlanır. Ama kanatları var artık — sabrından, cesaretinden ve uzattığı elden örülmüş kanatlar. Masasındaki kâğıtta hâlâ aynı cümle yazıyor: "Bana söylenen sözler, benim kim olduğum değil." Ve altında yeni bir satır: "Ben, kendi hikâyemin yazarıyım."'],
];

export const LOCAL_GAME_LEVELS = [
    {
        name: 'Kabuğu Tanımak',
        scenario: 'Teneffüste sınıfa girdiğinde birkaç kişinin sana bakıp güldüğünü ve aralarında fısıldaştığını fark ediyorsun. Göğsünde bir sıkışma hissediyorsun ve aklından "benimle ilgili konuşuyorlar" düşüncesi geçiyor. İlk yapacağın şey ne olur?',
        options: [
            { text: 'Duyguyu fark edip isimlendiririm: "Şu an üzüldüm ve kaygılandım." Derin bir nefes alırım.', isCorrect: true, feedback: 'Harika bir başlangıç. Duyguyu fark edip isimlendirmek, onun seni yönetmesini engeller. Nefes, bedenine "güvendesin" sinyali gönderir.' },
            { text: 'Hemen yanlarına gidip bağırırım: "Ne gülüyorsunuz?"', isCorrect: false, feedback: 'Öfke anlaşılır bir duygu; ama öfkeyle verilen tepki genellikle durumu büyütür ve sana zarar verir. Önce duygunu fark et, sonra sakin adımını seç.' },
            { text: 'Kesin benim yüzümden diye düşünüp gün boyu kendimi suçlarım.', isCorrect: false, feedback: 'Dur. Başkalarının davranışı senin suçun değil. Kendini suçlamak, kabuğu kalınlaştırır. Sana iyi gelmeyen düşünceyi fark etmek de bir güçtür.' },
        ],
    },
    {
        name: 'Işığa Yönelmek',
        scenario: 'Aynı kişiler bu kez sana lakap takıp seninle dalga geçiyor. Etrafta başka öğrenciler de var. Kalbin hızlanıyor ama dünkü kararını hatırlıyorsun: bu durum böyle devam etmeyecek. Ne yapıyorsun?',
        options: [
            { text: 'Hiçbir şey yapmam, alışırım. Belki bir gün kendiliğinden biter.', isCorrect: false, feedback: 'Görmezden gelmek bazen kısa vadede koruyucu olabilir; ama süreklilik kazanan zorbalık kendiliğinden bitmez. Sesini güvenli bir şekilde duyurmak senin hakkın.' },
            { text: 'Sakin ama net bir sesle "Bu davranışın hoşuma gitmiyor, dur." der, sonra güvendiğim bir yetişkine durumu anlatırım.', isCorrect: true, feedback: 'İşte bu, gerçek güç. Net sınır + destek isteme, araştırmaların en etkili bulduğu ikili. Anlatmak ispiyon değil; kendine ve başkalarına koruma sağlamaktır.' },
            { text: 'Ben de onlara daha ağır bir lakap takarım, anlasınlar.', isCorrect: false, feedback: 'Aynı silahı kullanmak seni onların oyun alanına çeker ve döngüyü büyütür. Senin gücün, onların seviyesine inmemende.' },
        ],
    },
    {
        name: 'Kanat Çırpmak',
        scenario: 'Aradan haftalar geçti. Kendini daha güçlü hissediyorsun. Bir gün okul bahçesinde, başka bir öğrenciye aynı şeylerin yapıldığını görüyorsun. O, köşede tek başına duruyor. Ne yaparsın?',
        options: [
            { text: 'Karışmam, ya hedef ben olursam? Kendi başının çaresine baksın.', isCorrect: false, feedback: 'Korkun çok anlaşılır. Ama unutma: sessiz tanıklar zorbalığın en büyük gücüdür. Güvenliğini koruyarak da destek olabilirsin — yanına gitmek veya bir yetişkine haber vermek gibi.' },
            { text: 'Zorbalık yapanlarla kavga ederim, hak ettiler.', isCorrect: false, feedback: 'Cesaretin değerli ama kavga hem seni riske atar hem de sorunu çözmez. Gerçek kahramanlık, şiddete şiddetle değil, akılla ve dayanışmayla cevap vermektir.' },
            { text: 'O öğrencinin yanına gider, "İyi misin? Yanında oturayım mı?" derim ve durumu bir öğretmene bildiririm.', isCorrect: true, feedback: 'Kelebek etkisi tam olarak bu. Bir zamanlar ihtiyaç duyduğun desteği şimdi sen veriyorsun. Tek bir "iyi misin?", birinin bütün gününü — bazen bütün dönemini — değiştirebilir.' },
        ],
    },
];

export const LOCAL_LETTER = {
    greeting: 'Sevgili Cesur Hâlim,',
    paragraphs: [
        'Sana bu mektubu, şu an inanması zor gelecek bir yerden yazıyorum: her şeyin yoluna girdiği bir gelecekten. Bugün yaşadıklarını biliyorum — o fısıltıları, o yalnız teneffüsleri, eve dönerken boğazında düğümlenen o hissi. Hepsini hatırlıyorum, çünkü ben senim. Ve sana ilk söylemek istediğim şey şu: seni görüyorum ve seninle gurur duyuyorum.',
        'İkincisi ve en önemlisi: bunların hiçbiri senin suçun değil. Birinin sana kötü davranması, senin "eksik" ya da "tuhaf" olduğunu göstermez; o davranış, onu yapanın içindeki bir yaranın dışa vurumudur. Senin değerin, başkalarının sözleriyle ölçülemeyecek kadar derin.',
        'Şu an göremediğin şeyleri ben net görüyorum: zorluklara rağmen her sabah okula giden o inatçı cesaretini, başkalarının üzüntüsünü uzaktan fark eden ince kalbini, bir gün bu deneyimi başkalarına güç vermek için kullanacak olan bilgeliğini. Bunlar şimdiden sende. Koza karanlık olabilir; ama içinde kanatlar örülüyor.',
        'Sana işe yarayan birkaç şey söyleyeyim: duygularını yazmak, içindeki düğümleri çözüyor — buna devam et. Güvendiğin bir yetişkine anlatmak, düşündüğün gibi "ispiyon" değil; kendi hikâyene sahip çıkmak. Ve "Bu davranış hoşuma gitmiyor" demek, öğreneceğin en güçlü cümle olacak.',
        'Gelecekten küçük bir sahne: bir bahar günü, okul bahçesinde arkadaşlarınla gülüyorsun — gerçek, içten bir kahkaha. O gün, bugünü hatırlayacak ve kendine şöyle diyeceksin: "İyi ki vazgeçmemişim." O gün geliyor. Söz veriyorum.',
    ],
    signature: '— Kanatlanmış Sen',
    ps: 'P.S. Kanatların, düşündüğünden çok daha güçlü.',
};

/* ─── Tohum topluluk içerikleri ─── */

const pastDate = (daysAgo) => {
    const d = new Date();
    d.setDate(d.getDate() - daysAgo);
    return d.toISOString();
};

const dayKey = (daysAgo) => {
    const d = new Date();
    d.setDate(d.getDate() - daysAgo);
    return d.toISOString().slice(0, 10);
};

export const SEED_COMMUNITY = [
    /* ── Hikâye 1 ── */
    {
        id: 'local-seed-1',
        type: 'story',
        title: 'Kozanın İçindeki Işık',
        preview: 'Koridorlar aynı koridorlar, ziller aynı zillerdi. Ama teneffüste duyduğu o fısıltılar ve ardından gelen kahkahalar, göğsünde küçük bir taş gibi oturdu.',
        category: 'dislanma',
        themeColor: '#6A52DC',
        reflectionQuestion: 'Bu hikâyedeki kahramanın en güçlü anı sence hangisiydi — ve o güç sende de var mı?',
        growthLesson: 'Destek istemek zayıflık değil, kendi hikâyenin yazarı olmaktır.',
        pages: LOCAL_STORY_PAGES.map(([title, content]) => ({ title, content })),
        authorPseudonym: 'Sessiz Koza',
        authorEmoji: '🦋',
        authorColor: '#6A52DC',
        ownerUid: 'koza',
        day: dayKey(14),
        hearts: 23,
        hugs: 11,
        reads: 58,
        heartedBy: [],
        huggedBy: [],
        createdAt: pastDate(14),
    },

    /* ── Hikâye 2 ── */
    {
        id: 'local-seed-2',
        type: 'story',
        title: 'Ekranın Arkasındaki Ben',
        preview: 'Emre için saldırı gecenin ortasında geldi — bir bildirim sesiyle. Telefona uzandığında gördükleri onu yıldırım gibi çarptı. Ama o gece aynı zamanda bir şeyin de başlangıcıydı.',
        category: 'siber',
        themeColor: '#3C8DC5',
        reflectionQuestion: 'Siber zorbalık gerçek zorbalıktan farklı mı sence, yoksa aynı mı hissettiriyor?',
        growthLesson: 'Ekran arkasındaki kelimeler, senin değerini belirleyemez. Sen gerçeksin; o sözler değil.',
        pages: [
            { title: 'Gece Yarısı Bildirimi', content: 'Emre için saldırı gecenin ortasında geldi — bir bildirim sesiyle. Telefona uzandığında bir grup sohbetinde adının geçtiğini gördü. Mesajlar birbirini izliyordu: sahte ekran görüntüleri, alaya alan yorumlar, "ispiyon", "yalancı" gibi kelimeler. Kalbi o kadar hızlı atmaya başladı ki nefes almayı unutur gibiydi. Ekranı kapattı, açtı, tekrar kapattı. Dışarıdan hiçbir ses gelmiyordu; dünya uyuyordu. Sadece o uyanıktı ve yalnız.' },
            { title: 'Silmek İstediğin Şey', content: 'Sabah uyandığında ilk işi telefonunu kontrol etmek oldu — olmasa iyi olurdu, çünkü mesajlar çoğalmıştı. Sınıfta bazı gözlerin üzerinde durduğunu hissetti. Kimse doğrudan bir şey söylemiyor ama o bakışlar yeterliydi. "Ekranı silesim geliyor" diye düşündü. Ama silse ne olacaktı? Zihnindeki görüntüler silinir miydi? Öğle yemeğini yalnız yedi, yemedi aslında, sadece masa başında oturdu.' },
            { title: 'Bir Ekran Gerçek Değil', content: 'Akşam babası bilgisayarın başında oturan Emre\'yi görünce "Ne var, yüzün asık?" diye sordu. Emre "Bir şey yok" dedi ve o gece ilk kez ağladı. Ama ertesi gün bir şey fark etti: o mesajları yazan kişiler, Emre\'yi gerçekten tanımıyordu. Onların "ispiyon" dediği şey, aslında bir yanlış anlaşılmaydı. Ekran arkasındaki kelimeler, boşlukta fırlatılmış taşlar gibi — asıl meseleyi hiç tutamıyorlardı. O taşlar Emre\'ye çarptığında acıttı, evet. Ama asıl gerçek neydi?' },
            { title: 'Destek Adresi', content: 'Emre, okul rehber öğretmenine durumu anlattığında önce utanacağını düşünmüştü. Olmadı. Öğretmeni dinledi, not aldı ve "Bu senin hatan değil" dedi. Sonra grup yöneticisiyle, ailelerle görüşüldü. Süreç mükemmel değildi, kolay da değildi. Ama Emre artık tek başına değildi. Ve fark etti: sorunun çözümü, ekranı silmekten değil, gerçek dünyada gerçek insanlara güvenmekten geçiyordu.' },
            { title: 'Yeni Kural', content: 'Emre kendine bir kural koydu: ekranda gördüğü her saldırı karşısında bir yetişkini bilgilendirecekti. İspiyon değil, kendi güvenliğinin bekçisi olacaktı. Haftalar geçti. Grup artık sessizdi, Emre\'nin adı anılmıyordu. Belki unuttular, belki korktular — fark etmiyordu. Asıl önemli olan, Emre\'nin artık gecenin ortasında bildirimlere bakmamasıydı. Telefonu kapatıp uyuyabiliyordu. Bu küçük bir şeydi ama aslında çok büyüktü.' },
        ],
        authorPseudonym: 'Mavi Kanat',
        authorEmoji: '🌊',
        authorColor: '#3C8DC5',
        ownerUid: 'koza',
        day: dayKey(9),
        hearts: 17,
        hugs: 14,
        reads: 41,
        heartedBy: [],
        huggedBy: [],
        createdAt: pastDate(9),
    },

    /* ── Hikâye 3 ── */
    {
        id: 'local-seed-3',
        type: 'story',
        title: 'Söylenti Fırtınası',
        preview: 'Selin okula geldiğinde bir şeylerin değiştiğini anlamak için birinin söylemesine gerek yoktu. Bakışlar yeterliydi. Kimsenin söylemediği, ama herkesin bildiği bir şey vardı.',
        category: 'soylenti',
        themeColor: '#B45BC9',
        reflectionQuestion: 'Söylentiler neden bu kadar hızlı yayılır — ve onlara dur demek için ne gerekir?',
        growthLesson: 'Söylentiler su üstündeki köpük gibidir; geçer. Ama sen kayalıksın — yerinden oynamazsın.',
        pages: [
            { title: 'Söylentinin Sesi', content: 'Selin okula geldiğinde bir şeylerin değiştiğini anlamak için birinin söylemesine gerek yoktu. Bakışlar yeterliydi. Koridorda geçerken fısıltılar kesiliyor, sonra devam ediyordu — bir makasın sesiydi bu, tam ortasından geçiyordu. Öğle arasında bir arkadaşı yaklaştı: "Duydum... öyle bir şey söyledin mi gerçekten?" Selin ne söylediğini bilmiyordu bile. Söylenti daha büyük görünmek için büyümüştü.' },
            { title: 'Savunmak mı, Suskunluk mu?', content: 'Selin ilk içgüdüsü her şeyi açıklamak, her cümleyi çürütmek oldu. Ama kelimeler hep geri dönüyordu; söylenti, gerçek olmaya devam ediyordu. Sessiz kalmak daha kolay görünüyordu — ama sessizlik, kabul gibi duruyordu. Akşam günlüğüne yazdı: "Bir şey söylemedim. Neden söylediğim sanılıyor?" Ve o geceye kadar cevabı yoktu.' },
            { title: 'Hikâyemin Sahibi Benim', content: 'Üç gün sonra sınıf öğretmeniyle konuştu. "Doğruyu söylemek mi daha güçlü, yoksa herkesi ikna etmeye çalışmak mı?" diye sordu öğretmeni. Selin düşündü. "Doğruyu söylemek" dedi. Öğretmeni başını salladı: "O zaman hikâyeni sen yaz. Başkaları ne yazdığına bakma." Bu cümle bir şeyleri yerleştirdi. Söylenti başkalarının versiyonuydu. Ama gerçek, Selin\'inki.' },
            { title: 'Köpük Geçer', content: 'Zaman aldı. Ama söylentiler su üstündeki köpük gibiydi — bir süre sonra dağıldılar. Selin\'in kim olduğunu gerçekten bilenler, söylentinin içinde kaybolmadı. Yeni bir hafta başladığında koridor fısıltıları azalmıştı. Biri yanına geldi ve "Seni hiç öyle biri sanmamıştım" dedi. Selin gülümsedi: "Çünkü öyle biri değilim." İlk kez haftalar sonra gerçekten huzurlu hissetti.' },
        ],
        authorPseudonym: 'Şafak Serçe',
        authorEmoji: '🌸',
        authorColor: '#B45BC9',
        ownerUid: 'koza',
        day: dayKey(21),
        hearts: 15,
        hugs: 8,
        reads: 37,
        heartedBy: [],
        huggedBy: [],
        createdAt: pastDate(21),
    },

    /* ── Hikâye 4 ── */
    {
        id: 'local-seed-4',
        type: 'story',
        title: 'Yemek Masasının Köşesi',
        preview: 'Her öğle yemeğinde aynı yer: köşedeki masa, tek kişilik bir ada. Can, orada oturmayı seçmemişti — masaların geri kalanı ona kapalıydı.',
        category: 'dislanma',
        themeColor: '#E29A28',
        reflectionQuestion: 'Dışlanma bazen en çok hangisini acıtır — yapılan mı, yoksa yapılmayan, yani ilgi gösterilmemek mi?',
        growthLesson: 'Tek bir gerçek arkadaş, yüz yüzeysel ilişkiden daha değerlidir.',
        pages: [
            { title: 'Köşe Masa', content: 'Can her öğle yemeğinde aynı yere oturuyordu: yemekhane köşesindeki küçük masa. Başta seçmiş gibi görünüyordu; aslında seçim yoktu. Eski grubu, yeni bir öğrenciyle yakınlaştıktan sonra yavaş yavaş uzaklaşmıştı — hiç açıklamadan, hiç tartışmadan. Sadece masada yer kalmamıştı. Bu, "sen yoksun" demekten bazen daha çok acıtıyordu.' },
            { title: 'Görünmezlik', content: 'En ağır şey fiziksel değildi. Koridorda geçerken göz teması kurmamak, sınıfta birinin sorusunu cevaplarken Can\'ın varlığını görmezden gelmek, grup projelerinde adını saymamak — bunlar küçük ama birikerek büyüyordu. Can bir gün günlüğüne şunları yazdı: "Belki gerçekten görünmez oldum. Belki bu iyi." Ama iyi olmadığını biliyordu.' },
            { title: 'Kütüphanedeki Ses', content: 'Bir Çarşamba, kütüphaneye sığındı. Orada da yalnızdı ama bu yalnızlık farklıydı — seçilmişti. Kitaplar arasında dolaşırken biri yanına geldi: "Bu kitabı beğeniyor musun?" diye sordu. Can omuz silkti, ama konuştu. İki saat sonra fark etti: gün boyu ilk kez gerçek bir sohbet yapmıştı. O kişi yeni bir öğrenciydi. Kimsenin yer vermediği biri. Tıpkı Can gibi.' },
            { title: 'İki Kişilik Ada', content: 'Yavaş yavaş köşe masa ikiye dönüştü. Sonra zaman zaman üçe. Eski grup hâlâ oradaydı, hâlâ uzaktı — ama artık o kadar büyük bir boşluk bırakmıyordu. Can fark etti: dışlandığı o günler, kendisine gerçekten bakan insanları fark etmesini sağlamıştı. Bir kalabalıkta kaybolmak ile iki kişiyle gerçekten olmak arasında dağlar kadar fark vardı.' },
        ],
        authorPseudonym: 'Altın Tohum',
        authorEmoji: '⭐',
        authorColor: '#E29A28',
        ownerUid: 'koza',
        day: dayKey(30),
        hearts: 19,
        hugs: 12,
        reads: 44,
        heartedBy: [],
        huggedBy: [],
        createdAt: pastDate(30),
    },

    /* ── Oyun 1 ── */
    {
        id: 'local-seed-5',
        type: 'game',
        title: 'İçsel Güç Labirenti',
        preview: 'Teneffüste fısıltılar, lakaplar, yalnız köşeler... Bu labirentte her karar bir öncekinden daha güçlü seni bekliyor. Hangisini seçiyorsun?',
        category: 'diger',
        themeColor: '#C97A1C',
        reflectionQuestion: 'Oyundaki hangi karar sana en "ben" gibi hissettirdi?',
        growthLesson: 'Zorbalık karşısında en güçlü silah: sakin bir ses, net bir sınır ve yanında bir yetişkin.',
        levels: LOCAL_GAME_LEVELS,
        authorPseudonym: 'Cesur Anka',
        authorEmoji: '🔥',
        authorColor: '#C97A1C',
        ownerUid: 'koza',
        day: dayKey(6),
        hearts: 31,
        hugs: 18,
        reads: 72,
        heartedBy: [],
        huggedBy: [],
        createdAt: pastDate(6),
    },

    /* ── Oyun 2 ── */
    {
        id: 'local-seed-6',
        type: 'game',
        title: 'Siber Kalkan',
        preview: 'Ekran karşında yalnız değilsin. Siber zorbalık karşısında doğru adımı bul — her karar seni bir adım daha güçlü yapıyor.',
        category: 'siber',
        themeColor: '#34955D',
        reflectionQuestion: 'Gerçek hayatta da aynı adımı atabilir misin — güvendiğin bir yetişkine anlatmak?',
        growthLesson: 'Ekran kapat, kanıt sakla, güvendiğine anlat. Bu üç adım, siber zorbalığı kırmak için yeterli.',
        levels: [
            {
                name: 'Fark Et',
                scenario: 'Sınıf arkadaşlarından biri, senin fotoğrafını izin almadan bir gruba paylaşmış ve altına komik bir yorum yazmış. Grup 30 kişilik. Şu an mesajı görüyorsun. İlk adımın ne?',
                options: [
                    { text: 'Aynı kişi hakkında ben de bir şey paylaşırım — eşit olsun.', isCorrect: false, feedback: 'Bu adım seni de aynı döngüye çeker ve durumu büyütür. Üstelik hukuken sorun yaratabilir. Dur, nefes al.' },
                    { text: 'Ekran görüntüsü alırım (kanıt), sonra güvendiğim bir yetişkine gösteririm.', isCorrect: true, feedback: 'Tam doğru. Kanıtı silme, çünkü şikâyet sürecinde gerekebilir. Bir yetişkin sana bu süreçte rehberlik edebilir — yalnız taşıma.' },
                    { text: 'Gruptan çıkar, telefonu kapatırım — sanki olmamış gibi.', isCorrect: false, feedback: 'Gruptan çıkmak bazen geçici rahatlık sağlar, ama olayı yok saymak çözüm değil. Kanıt silinirse sonraki adımlar zorlaşır.' },
                ],
            },
            {
                name: 'Sınır Çiz',
                scenario: 'Bir öğrenci, sana sürekli mesaj gönderiyor: önce güzel şeyler, sonra tehdit içerikli sözler. Engellesen de farklı hesaplardan devam ediyor. Ne yaparsın?',
                options: [
                    { text: 'Cevap veririm — belki anlayacak, belki durur.', isCorrect: false, feedback: 'Cevap vermek, devam edeceğini görmesini sağlar. Her cevap, döngüyü besler. Sessiz kalmak ve bildirmek daha güçlü bir yanıt.' },
                    { text: 'Tüm mesajları kaydeder, tekrar ulaşımı engellerim ve durumu hem okula hem aileye bildiririm.', isCorrect: true, feedback: 'Mükemmel. Belgelemek önemli; çünkü bu davranış Türkiye\'de hukuken "siber taciz" kapsamına girebilir. Sen yalnız değilsin ve bu kesinlikle senin hatan değil.' },
                    { text: 'Sosyal medya hesabımı tamamen kapatırım.', isCorrect: false, feedback: 'Kendini izole etmek anlayışılır bir tepki; ama bu senin özgürlüğünü kısıtlar, sorunu çözmez. Hesabını kapatmak zorunda değilsin — yetkilileri harekete geçirmek daha adil.' },
                ],
            },
            {
                name: 'Kanat Ol',
                scenario: 'Bir arkadaşın, kimliği belli olmayan hesaplardan hakaret içeren mesajlar aldığını söylüyor. Çok üzgün, ne yapacağını bilmiyor. Senden yardım istiyor.',
                options: [
                    { text: '"Önemli değil, sil unut" derim — büyütmesek iyi olur.', isCorrect: false, feedback: 'Bu cümle iyi niyetle söylense de arkadaşına "bu normal, dayanmalısın" mesajı verir. Oysa duygularını küçümsemeden dinlemek çok daha değerlidir.' },
                    { text: 'Sadece dinlerim ama hiçbir şey yapmam — benim işim değil.', isCorrect: false, feedback: 'Dinlemek değerli, ama tamamen elleri bağlı kalmak arkadaşını yalnız bırakır. Birlikte bir yetişkine gitmeyi önermek, hem destek hem de güç olabilir.' },
                    { text: '"Seninle birlikteyim, ekran görüntüsü al ve rehber öğretmene birlikte gidelim" derim.', isCorrect: true, feedback: 'İşte gerçek kanat çırpma bu. Arkadaşının yanında olmak ve ona somut adım atmada yardımcı olmak, hayatını değiştirebilir. Bir zamanlar sana uzatılan eli, şimdi sen uzatıyorsun.' },
                ],
            },
        ],
        authorPseudonym: 'Bilge Fener',
        authorEmoji: '🍀',
        authorColor: '#34955D',
        ownerUid: 'koza',
        day: dayKey(3),
        hearts: 22,
        hugs: 9,
        reads: 53,
        heartedBy: [],
        huggedBy: [],
        createdAt: pastDate(3),
    },

    /* ── Mektup 1 ── */
    {
        id: 'local-seed-7',
        type: 'letter',
        title: 'Gelecekten Bir Mektup',
        preview: 'Sana bu mektubu, şu an inanması zor gelecek bir yerden yazıyorum: her şeyin yoluna girdiği bir gelecekten.',
        category: 'diger',
        themeColor: '#8470E8',
        reflectionQuestion: 'Beş yıl sonraki sen, bugünkü sana ne söylemek isterdi?',
        growthLesson: 'Bugünkü zorluklar, yarınki gücünü örüyor. Koza karanlıkta çalışır.',
        letter: LOCAL_LETTER,
        authorPseudonym: 'Işıltılı Kelebek',
        authorEmoji: '🦋',
        authorColor: '#8470E8',
        ownerUid: 'koza',
        day: dayKey(18),
        hearts: 28,
        hugs: 16,
        reads: 63,
        heartedBy: [],
        huggedBy: [],
        createdAt: pastDate(18),
    },

    /* ── Mektup 2 ── */
    {
        id: 'local-seed-8',
        type: 'letter',
        title: 'Beş Yıl Sonra Sana',
        preview: 'O lakabı hatırlıyor musun? Sana takılan, bir dönem peşini hiç bırakmayan o sözcük. Şu an oradan yazıyorum sana: o sözcük gerçek değildi hiç.',
        category: 'alay',
        themeColor: '#E29A28',
        reflectionQuestion: 'Biri sana bir lakap taksa, bu seni gerçekten tanımlayabilir mi?',
        growthLesson: 'Başkasının sana taktığı lakap, senin adın değildir. Sen kendi adını seçersin.',
        letter: {
            greeting: 'Sevgili Güçlü Hâlim,',
            paragraphs: [
                'O lakabı hatırlıyor musun? Sana takılan, bir dönem peşini hiç bırakmayan o sözcük. Koridorda seslenen sesler, öğle arasında fısıldayan ağızlar. O sözcüğü duyduğunda göğsünde ne hissettini biliyorum — hem öfke, hem de "belki haklılar mı" diye sorduğun o tuhaf an. Sana şunu söylemek için yazıyorum: o sözcük gerçek değildi hiç.',
                'Bir lakap, onu söyleyenin hayal gücüdür. Senin gerçeğin değil. Düşün bir: seni gerçekten tanıyan biri, seni bu lakabla mı çağırırdı? Cevabın "hayır" ise, o sözcüğün sana ait olmadığını zaten biliyorsun. Başkasının seni nasıl gördüğü, senin kim olduğunu belirleyemez.',
                'Şu an benden sana inanması zor gelecek bir şey söyleyeyim: o lakabı çok yakında hatırlamayacaksın. Değil çünkü acısı geçmedi; değil çünkü unutmak zorunda kaldın. Hatırlamayacaksın çünkü o tanım sende hiç yer etmedi. Gerçek adın, başkasının sana taktığı kelime değil — sen her gün yaptığın seçimlerden örülmüş bir isim.',
                'Sana bir şey öğreteyim, şimdiden işe yarıyor: "Bu söz beni tanımlamıyor" cümlesini içinden söylediğinde, o sözcüğün gücü yarı yarıya azalıyor. Ses çıkarmak zorunda değilsin. Sadece kendi içinde o gerçeği tekrar et. Kendi adını bil. Kendi adını sev.',
                'Beş yıl sonra, o lakabı söyleyen kişiyle karşılaşırsan ne yapacağını merak ediyorsun belki. Sana söyleyeyim: gülümseyeceksin — içten, zorlamadan. Çünkü o an artık sana ait değil. Ve bu, en güçlü zafer.',
            ],
            signature: '— Kendi Adını Bulan Sen',
            ps: 'P.S. Adın güzel. Sen seçtin onu.',
        },
        authorPseudonym: 'Lavanta Kanat',
        authorEmoji: '🌷',
        authorColor: '#B45BC9',
        ownerUid: 'koza',
        day: dayKey(25),
        hearts: 21,
        hugs: 13,
        reads: 48,
        heartedBy: [],
        huggedBy: [],
        createdAt: pastDate(25),
    },
];
