/**
 * KOZA — 100 tohum hikâye
 * Topluluk galerisini dolduran, terapötik anlatı çerçevesinde yazılmış eserler.
 */

const p  = (d) => { const dt = new Date(); dt.setDate(dt.getDate() - d); return dt.toISOString(); };
const dk = (d) => p(d).slice(0, 10);

/* ─── İçerik havuzları ─── */

const PSEUDONYMS = [
    'Mavi Kelebek','Mor Koza','Pembe Kanat','Yeşil Tohum','Altın Pupa',
    'Gümüş Kanat','Kristal Koza','Amber Işık','Zümrüt Yaprak','Leylak Koza',
    'Safir Kanat','Mercan Kelebek','Çiçek Koza','İnci Kanat','Elmas Tohum',
    'Turuncu Koza','Kiraz Kelebek','Mor Işık','Yeşil Kanat','Altın Yaprak',
    'Gümüş Tohum','Kristal Kanat','Amber Koza','Zümrüt Kelebek','Safir Tohum',
    'Mercan Kanat','Pembe Işık','Mavi Tohum','İnci Koza','Elmas Kanat',
    'Leylak Tohum','Turuncu Kanat','Kiraz Koza','Mor Yaprak','Yeşil Kelebek',
    'Altın Kanat','Gümüş Koza','Kristal Işık','Amber Yaprak','Zümrüt Tohum',
    'Safir Koza','Mercan Yaprak','Pembe Tohum','Mavi Koza','İnci Yaprak',
    'Elmas Işık','Leylak Yaprak','Turuncu Kelebek','Kiraz Kanat','Mor Tohum',
    'Yeşil Işık','Altın Kelebek','Gümüş Işık','Kristal Yaprak','Amber Kanat',
    'Zümrüt Işık','Safir Yaprak','Mercan Işık','Pembe Koza','Mavi Işık',
    'Mor Kelebek','Yeşil Koza','Altın Işık','Gümüş Kelebek','Kristal Tohum',
    'Amber Kelebek','Zümrüt Kanat','Safir Işık','Mercan Tohum','Pembe Yaprak',
    'Mavi Yaprak','İnci Kelebek','Elmas Koza','Leylak Kelebek','Turuncu Tohum',
    'Kiraz Tohum','Mor Pupa','Yeşil Pupa','Altın Şafak','Gümüş Pupa',
    'Kristal Pupa','Amber Pupa','Zümrüt Pupa','Safir Pupa','Mercan Pupa',
    'Pembe Pupa','Mavi Pupa','İnci Pupa','Elmas Pupa','Leylak Pupa',
    'Turuncu Pupa','Kiraz Pupa','Mor Şafak','Yeşil Şafak','Altın Umut',
    'Gümüş Şafak','Kristal Şafak','Amber Şafak','Zümrüt Şafak','Safir Şafak',
];

const EMOJIS = ['🦋','🌸','⭐','🌊','🌺','🌙','☀️','🍃','🌈','🔮','💜','🌻','🌿','🦚','🎋','🌟','🪷','🫧','🦋','🌷'];
const ACOLORS = ['#6A52DC','#3C8DC5','#B45BC9','#E29A28','#34955D','#F43F5E','#9B59B6','#1ABC9C'];

const CATS   = ['dislanma','siber','soylenti','fiziksel','sozlu','diger'];
const CCOLOR = { dislanma:'#6A52DC', siber:'#3C8DC5', soylenti:'#B45BC9', fiziksel:'#F43F5E', sozlu:'#E29A28', diger:'#34955D' };

const TITLES = [
    'Kozanın İçindeki Ses','Görünmez Duvarlar','Fısıltıların Ötesi','Yalnızlığın Rengi',
    'Gizli Güç','Kırık Değil Tam','Işığa Doğru','Dönüşüm Günüm',
    'Kanatlarım Var','Sessizliği Bozdum','Gerçek Olan Ben','Susmayan Yürek',
    'Umut Tohumları','Kahramanım Ben','Yeniden Doğuyorum','Fırtına Geçer',
    'Güçlü Adım','Kozamdan Çıktım','İz Bıraktım','Direniş',
    'Değişim Anı','Yeni Sabahım','Güçlü Kalmak','Kendi Sözüm',
    'Yeniden Yazılan Hikâye','Cesaretimin Rengi','Kırık Gülümseme','Söylenti Fırtınası',
    'Kelimeler Yara Açar','Grubun Dışında','Yalnız Teneffüs','İçimdeki Kahraman',
    'Karanlıktan Çıkış','Koridordaki Adım','Gerçeği Söylemek','Kanat Açmak',
    'Boş Sandalyeler','Ekranın Ötesi','Susmanın Bedeli','Çiçek Açmak',
];

const PREVIEWS = [
    'Koridorda herkes geçiyor, ben duruyordum. Ama durmak bazen en güçlü adımdı.',
    'Fısıltılar yeterliydi. Bir söz söylenmeden çok şey anlatılabilirdi.',
    'Grup beni dışladığında dünyam karardı sanki. Sonra anladım: karartan güneş değil, bulutlardı.',
    'Telefona her baktığımda o yorumlar oradaydı. Ta ki ekranı kapayıp dışarı çıkana kadar.',
    'Söylenti benden önce okula geldi. Ama gerçek, sonunda her zaman kazanır.',
    'Koridorda itmeler başladığında sustum. Ama susmak tek seçenek değildi.',
    'Lakap bana yapışmıştı sanki. Bir gün onu düşürdüm ve geri almadım.',
    'Yalnız oturmak zorunda olmadığımı öğrenene kadar, hep köşe masayı seçtim.',
    'Ekran görüntüsü yayıldığında dünya çöküyor gibiydi. Bu onların seçimiydi, benim değerim değil.',
    'Kimse beni davet etmedi. Ama sonunda kendi davetimi yarattım.',
    'Bir söz söylenmeden kaç şey anlatılabiliyordu — ve konuşunca ne kadar güçleniliyordu.',
    'O günden sonra koridorlar farklı göründü. Ama asıl değişen koridorlar değildi — bendim.',
    'Herkesi ikna etmeye çalışmak yerine, gerçeği bilen birini bulmak yeterliydi.',
    'Korkuyu bir yetişkine aktarmak — bu kararı vermek zaman aldı ama her şeyi değiştirdi.',
    'Aynaya bakmaktan kaçınıyordum. Sonra anladım: o gözlerde başkasının sözünü arıyordum.',
    'Herkes yapıyor diye bir şey yapılmaz. Bu cümleyi anlamak, her şeyi değiştirdi.',
    'Günlüğe yazdığımda fark ettim: kendi sesim, en güçlü sesmiş.',
    'Birinin yanında durmak bazen sadece "Bu doğru değil" demek kadar basit.',
    'Yanlış cevap vermekten korkar olmuştum. Yanlış cevap, yanlış insan olmak değildi.',
    'Karşılaştırdığım insanların en iyi anlarını görüyordum. Benim ise tüm anlarımı yaşıyordum.',
    'Anonim hesap yazdı, ben cevap vermedim. Ama sessizlik benim seçimimdi — onların değil.',
    'Grup sohbetinden çıkarılmak, kelimelerin en ağır biçimiydi — çünkü hiç söylenmemişti.',
    'Yeni okul yeni bir sayfa demekti. Korkunç ama aynı zamanda özgür.',
    'Bedenimi eleştiren sözler aynama yapışmıştı. Bir gün onu sildim.',
    'Hakkımda konuştular ama ben orada değildim. Ve orada olmamayı seçtim.',
    'Tanık olduğumda ne yapacağımı bilmiyordum. Öğrendim: "İyi misin?" demek yeterliydi.',
    'Eşyalarım zarar gördüğünde çaresiz hissettim. Sonra fark ettim: kanıt biriktiriyorum.',
    'Savunmak istedim ama önce bir mola verdim. Bu mola, en doğru kararımdı.',
    'Güven kırıldığında herkes şüpheli görünür. Ama herkesi şüpheliyle eşitlemek de yanlıştı.',
    'Başarım söylentiye yol açtı. Başarım için özür dilemeyecektim.',
    'İçimde biriken korku, bir gün kelime oldu. O an her şey değişti.',
    'Bakış dahi yeter bazen — tek bir bakışı fark etmek her şeyi değiştirebilir.',
    'O teneffüste kimse beklemiyor, kimse aramıyordu. Bir gün beklemek zorunda olmadığıma karar verdim.',
    'Dedikodu beni geçti, ben onu geçtim.',
    'Kozadan çıkmak için önce içeriden itmek gerekir. Ben ittim.',
    'Söyleneni değil, söylemek istediğimi duymayı öğrendim.',
    'Sessizlik kolay görünüyordu. Ama konuşmak, gerçekten güçlü olmaktı.',
    'Tanık olmak seçimle başlar. Ben o seçimi yaptım.',
    'Güçlü olmak yalnız taşımak değil — ne zaman yardım isteyeceğini bilmek.',
    'Kendi yolumu bulmak zaman aldı. Ama bulduğumda, gerçekten bendim.',
];

const REFLECTIONS = [
    'Bu hikâyedeki kahramanın en güçlü anı sence hangisiydi?',
    'Sen de böyle bir an yaşadıysan, o anda içinde ne vardı?',
    'Dışlanma hissi seni en çok nerede buluyor?',
    'Siber zorbalık ile yüz yüze zorbalık sence nasıl farklı hissettiriyor?',
    'Söylentiler neden bu kadar hızlı yayılır — ve onlara nasıl dur denilebilir?',
    'Fiziksel zorbalık yaşandığında sessiz kalmak ne zaman daha ağır olur?',
    'Bir lakap senin kim olduğunu tanımlayabilir mi?',
    'Görünüş hakkında alınan yorumlar neden bu kadar derin iz bırakabilir?',
    'Birinin yanında durmak için kahramanlık mı, yoksa sadece cesaret mi gerekir?',
    'Kendi hikâyeni yazmak ne zaman güçlendirir?',
    'Akran baskısına "hayır" demek ne zaman en güçlü "evet"e dönüşür?',
    'Bir tanığın sessizliği ile hareketi arasındaki fark ne kadar büyük?',
    'Güvenin kırılması, yeni sınırlar oluşturabilir mi?',
    'Okul değişikliği gibi zor geçişlerde kim veya ne destek olabilir?',
    'Anonim saldırılar neden bazen daha zor hissettiriyor?',
    'Özgüven yolculuğu varış noktası olan bir şey mi, yolculuk mu?',
    'Kırılma anları bize neler öğretebilir?',
    'Beden hakkındaki yorumlar nasıl içselleşebilir ve nasıl dışarı çıkarılır?',
    'Bir yetişkine güvenmek zor geldiğinde ne değiştirir bu kararı?',
    'Söylenmemiş bir şey bazen söylenenden daha ağır olabilir mi?',
];

const LESSONS = [
    'Destek istemek zayıflık değil, kendi hikâyenin yazarı olmaktır.',
    'Ekran arkasındaki kelimeler, senin değerini belirleyemez.',
    'Söylentiler su üstündeki köpük gibidir; geçer. Ama sen kayalıksın.',
    'Bedenimi korumak hakkım — ve bu hakkı kullanmak güçtür.',
    'Bir lakap seni tanımlamaz; seni tanımlayan senin seçtiğin kelimelerdir.',
    'Kırılma anları, genişleme anlarıdır — çatlayan koza, açılan kanattır.',
    'Akran baskısına "hayır" demek, kendine en büyük "evet"i söylemektir.',
    'Tanık olmak ve upstander olmak arasındaki fark: harekete geçmek.',
    'Güven kırılır ama yeniden seçici olarak inşa edilir.',
    'Yeni başlangıçlar hem korkunçtur hem özgür.',
    'Sessizlik bazen koruyucu, ama konuşmak her zaman daha güçlüdür.',
    'Özgüven varış noktası değil yolculuktur — yolda olmak yeterlidir.',
    'Başkalarının yorumu bedenini değiştirmez; ama senin bakışın değiştirebilir.',
    'Kanıt biriktirmek, hakkını aramak için en sessiz ve güçlü adımdır.',
    'Hikâyeni başkaları yazmadan önce, sen yaz.',
    'Karşılaştırma, eşit koşullarda yapılmadığında adil olmaz.',
    'Günlük tutmak, iç sesin dışarı çıkmasına izin vermektir.',
    'Kendi grubunu bulmak zaman alır ama bir kalabalıktan daha değerlidir.',
    'Bir kez güvenli bir yetişkene anlattığında, yükün yarısı onunla taşınır.',
    'Güçlü olmak, ne zaman yardım isteyeceğini bilmektir.',
];

/* ─── 20 sayfa seti (her set 4 sayfa) ─── */

const PAGE_SETS = [
    /* 0 — dislanma: Teneffüste görünmez */
    [
        { title: 'O Teneffüs', content: 'Teneffüs zili çaldığında herkes koşarak dışarı fırladı. Ben de koştum — ama kimse beni beklemiyor, kimse beni aramıyordu. Bahçede küçük gruplar, kahkahalar, ortak sırlar... ve ben, tam ortasında ama hiçbirinin içinde olmayan biri. Koridorun ucundaki duvar en güvenli sığınağım olmuştu. Duvara yaslanmak, kendinle baş başa kalmakla aynı şeydi. Belki de en iyi arkadaşım o duvardı o günlerde.' },
        { title: 'İçimdeki Fırtına', content: 'Evde annem "Nasıl geçti?" diye sordu. "İyi" dedim. Bu cevap yalan da değildi, doğru da sayılmazdı. Nasıl anlatacaktım? O geceyi günlüğüme yazdım: "Ya gerçekten görünmez isem? Ya hep böyle sürecekse?" Kalem elimde titriyordu. Cevapların hiçbirini bilmiyordum. Ama soruları yazmak bile bir şeydi — dışarı çıkmış, kağıtta kalmış, zihnimden çıkmıştı.' },
        { title: 'Kıvılcım Anı', content: 'Bir gün matematik öğretmeni tahtaya beni kaldırdı. Soruyu çözdüm — ve öğretmen "Aferin, bu çözüm çok akıllıca" dedi. Sınıfta bir sessizlik oldu. Biri gerçekten beni gördü. Ve fark ettim: ben hep oradaydım, sadece bazıları bakmıyordu. Görmezden gelen gözler, beni yok etmiyordu; sadece görmek istemiyordu. Bu fark büyüktü — ve bu farkı anlamak her şeyi değiştirdi.' },
        { title: 'Kendi Grubum', content: 'Zamanla küçük bir şey değişti. Kütüphanede bir kız benim okuduğum kitabı da okuyordu. Konuştuk. İki hafta sonra birlikte yemek yedik. Bir ay sonra üçtük. Eski grup hâlâ oradaydı — ama artık onlara bakmıyordum. Kendi grubumu bulmuştum: küçük, sessiz ama gerçek. En büyük grup değil, en gerçek grup önemliydi.' },
    ],
    /* 1 — dislanma: Grup sohbetinden çıkarılmak */
    [
        { title: 'Ekranda Boşluk', content: 'O gece telefona baktığımda grup sohbeti yoktu. Önceki gün hepsindeydi — şakalar, fotoğraflar, hafta sonu planları. Şimdi sadece ekranda bir boşluk. Çıkarılmıştım. Açıklama yok, veda yok, sebep yok. Bu boşluk, bana söylenen en ağır söz gibiydi — çünkü hiç söylenmemişti. Sessizlik bazen en yüksek sestir.' },
        { title: 'Neden Bilmemek', content: 'Ertesi sabah onları görünce mideme bir şeyler düştü. Güldüler, konuştular — ama bensiz. "Neden?" diye sormak istedim ama sesim çıkmadı. Belki bir hata yaptım? Bilmemek, bilmekten daha ağır olabiliyordu. Sessizce oturdum ve bekledim. Ne beklediğimi bile bilmiyordum. Günün sonunda yalnızca şunu biliyordum: bu his bir daha taşımak istemediğim bir yükü.' },
        { title: 'Cevabı Aramak', content: 'Anneme anlattığımda ilk kez birine konuşmuştum. "Bunu hak etmedin" dedi. Bu cümle garip geldi; sanki hak etmiş olabileceğimi içimde düşünüyormuşum gibi. Rehber öğretmenle konuştum. "Grup davranışı her zaman adil değildir. Senin hatanı aramana gerek yok." Bu cümle, zihnimde bir şeyleri düzeltti. Aramamalıydım.' },
        { title: 'Grup Olmadan Güçlü', content: 'Artık o gruptaki herkese sabah selam vererek geçiyordum. Kibarca, sakin. Onların beni dışlaması, benim değerimi belirlemiyordu. Yeni arkadaşlar edindim — daha yavaş, daha gerçek bir süreç. Ve şimdi bakıyorum: o gece ekranda gördüğüm boşluk, aslında benim için açılan bir kapıydı.' },
    ],
    /* 2 — dislanma: Yeni okul */
    [
        { title: 'Yeni Kapı', content: 'Yeni okula ilk günüm, bir yerlerden baktığında kolay görünürdü: sadece girip otur. Ama asıl zor olan şuydu: burada kimse beni tanımıyordu. Ve tanımak isteyeceklerine dair hiçbir işaret yoktu. Sınıfa girdiğimde boş sandalyeler arasında seçim yaptım — kimin yanına oturacağımı bilmediğim için. Bu boşluk, içimi doldurdu.' },
        { title: 'İlk Haftalar', content: 'İlk haftalarda öğle yemeğini hızlı yedim. Yavaş yemenin, yalnız görünme riskini artırdığını hissediyordum. Bu mantıklı değildi ama his buydu. Eve dönerken eski okulu düşündüm. Ama aynı zamanda fark ettim: bir kez gerçek arkadaş edindim, yeniden edinebildim.' },
        { title: 'İlk Söz', content: 'Bir Perşembe, sanat dersinde yanıma biri oturdu. "Bu renkleri iyi seçtin" dedi. Öyle basit bir cümle. Ama o gün eve dönerken daha hafif hissettim. İlk gerçek kelime buydu — basit, kasıtsız, ama beni gören. Bazen bir gülümseme veya küçük bir yorum, haftalar süren sessizliği kırabiliyordu.' },
        { title: 'Kendi Yerimi Bulmak', content: 'Birkaç ay geçti. Artık sınıfta birinin yanında oturuyordum ve koridorda selamlayan yüzler vardı. Yeni okulu sevmiyordum henüz — ama artık kabul ediyordum. Yeni bir yerde başlamak, boş bir sayfa gibiydi. Korkunç ama aynı zamanda özgür. Kendimi, burada bilmeyenlerin gözüyle yeniden yazabilirdim.' },
    ],
    /* 3 — siber: Anonim hesap */
    [
        { title: 'Bilmediğim Biri', content: 'Anonim bir hesap benim fotoğrafımı paylaşmıştı ve altına yazılar yazıyordu. Kim olduğunu bilmiyordum. Belki tanıdığım biriydi, belki değildi. Bu belirsizlik, kesinlikten daha ağırdı. Tanıdığım biriyse kim? Tanımadığım biriyse neden? Ekrana baktım, telefonu kapattım, tekrar açtım. Döngü devam ediyordu — ta ki döngüyü kırana kadar.' },
        { title: 'Tanık Olmak Zorunda Kalmak', content: 'Okulda birkaç kişi "Gördüm" demedi ama gözlerinde gördüm. Biliyorlardı. Bu belki en zor kısımdı: özel bir şeyin herkese açık olması. "Nasıl hissettim?" diye sorarsanız: küçüldüm. Küçülmek doğru kelime miydi bilmiyorum ama his buydu — etrafta insanlar varken de yalnız kalmak gibi.' },
        { title: 'Yetkili Adım', content: 'Annem durumu öğrenince birlikte oturdu. "Ne yapmak istiyorsun?" diye sordu. İki seçenek vardı: susup geçmek ya da bir şey yapmak. İkinci seçeneği seçtim. Ekran görüntülerini aldım, hesabı bildirdim, okul müdürüne anlattım. Süreç mükemmel değildi ama bir şey yaptım. Pasif kalmaktan adım atmak her zaman daha güçtü.' },
        { title: 'Asıl Gerçek', content: 'Hesap silinmişti. Bu süreçte öğrendim: anonim saldırı, anonimin gücü değil zayıflığıdır. Yüzünü göstermeden konuşmak, söz söylemenin en zayıf biçimidir. Ben ise yüzümü göstererek konuştum, yetkililere başvurdum, destek istedim. Bu benim gücümdü.' },
    ],
    /* 4 — siber: Grup sohbeti saldırısı */
    [
        { title: 'Sabah Mesajları', content: 'Sabah uyandığımda telefonda yüzlerce mesaj vardı. Hepsi benim hakkımda. Gece boyunca yazmışlardı — yalanlar, kışkırtmalar, eski şeyler çarpıtılmış. Bir grup sohbeti, benim gıyabımda mahkeme kurmuştu. Suçlu seçilmiştim; sanık olduğumu bile bilmeden. Bu his — habersiz yakalanmak — çok ağırdı.' },
        { title: 'Temizlemek', content: 'Hepsini okumak istedim. Bilmek istedim. Ama her mesaj, üstüme yüklenen ağırlıktı. Bir noktada telefonu kapattım ve dışarı çıktım. Yürüdüm. Hava soğuktu ama temizdi. Ve fark ettim: bu sohbet, benim değildi. Ben orada yoktum. Hakkımda konuştular ama ben orada değildim.' },
        { title: 'Destek Sesi', content: 'Biri beni aradı — gruptaydı ama o gece mesaj atmamıştı. "Seninle konuşmak istedim. Haksızlık bu" dedi. O an, tek bir insanın sesi, yüz mesajdan ağır bastı. Bazen dayanışma büyük değil, küçük olur: bir mesaj, bir telefon, "yanındayım"ın bir biçimi.' },
        { title: 'Hakikat Kazanır', content: 'Zaman geçti. Grup suskunluğa büründü. Gerçek, yavaş ama mutlaka gelir. Ve öğrendim: sosyal medyada yazılanlar, gerçek değildir — gerçek olmak için gerçek olması gerekir. Benim hakkımda yazılanların çoğu gerçek değildi. Ve gerçek olmayan şeyler, eninde sonunda çözülür.' },
    ],
    /* 5 — siber: Paylaşılmayan fotoğraf */
    [
        { title: 'İzinsiz', content: 'Özel bir fotoğrafım, iznim olmadan paylaşılmıştı. Kim paylaşmıştı? Güvendiğim biri. Bu en ağır kısımdı: fotoğrafın kendisi değil, güvenin kırılması. Bir şeyi birisiyle paylaştığında, onun güvende olduğuna inanıyorsun. Bu inanç kırıldığında ne hissedersin? Cevabını o gün öğrendim.' },
        { title: 'Güveni Yeniden Düşünmek', content: 'Kim güvenilir? Kim değil? Sorular kafamı doldurdu. Herkesten uzak durmak istedim. Ama izole olmak da kayıptı. Rehber öğretmen şöyle dedi: "Bir kişinin yaptığı hata, herkesi güvensiz yapmaz. Ama dikkatli olmak da hakkın." Bu denge — kapatmak değil, dikkatli açmak — öğrenilecek en değerli şeydi.' },
        { title: 'Dijital Haklar', content: 'Öğretmenimle birlikte durumu okul yönetimine bildirdik. Kişisel fotoğrafımı izinsiz paylaşmak, yasal sınırları da aşıyordu. Sadece etik değil, hukuken de yanlıştı. Bunu bilmiyordum; öğrendim. Ve bu bilgi beni güçlendirdi: sadece kötü hissetmiyordum, hakkımı da arıyordum.' },
        { title: 'Yeniden İnşa', content: 'Güveni yeniden inşa etmek zaman aldı. Ama tamamen kapanmak istemedim. Seçici oldum — kiminle ne paylaşacağımı daha dikkatli düşündüm. Bu bence olgunlaşmaktı. Acı bir deneyim ama öğretici: dijital dünyada da sınırlarım var ve bu sınırlar değerlidir.' },
    ],
    /* 6 — soylenti: Yalan yayıldı */
    [
        { title: 'Söylentinin Kökeni', content: 'Benim hakkımda bir yalan dolaşıyordu. Başlatan kimi bilmiyordum ama yayılma hızı şaşırtıcıydı: sabah söylenmişti, öğleden önce herkes biliyordu. Yalan, gerçekten daha hızlı koşar — gerçek sıkıcıdır, yalan heyecan vericidir. Benim "heyecanlı" olmam, yalanın yayılmasına yetmişti.' },
        { title: 'Savunmak mı?', content: 'Her şeyi açıklamak istedim. Ama kime, ne kadar? Gruptaki herkes çoktan duymuştu. "Yalan bu" dediğimde kaç kişi inanırdı? "Yalan bu" demek doğruydu — ama nasıl söyleyeceğimi bilmiyordum. Önce bir mola verdim: kimseye hiçbir şey açıklamak zorunda değildim.' },
        { title: 'Gerçeğin Ağırlığı', content: 'Sınıf öğretmeniyle konuştum. "Söylentiye cevap vermek zorunda değilsin" dedi. "Ama istersen konuşabiliriz." Tercih bende olduğunu duymak güçlendirdi beni. Sonra karar verdim: yakın arkadaşlarıma gerçeği anlattım. Onlar bana inandı. Ve onların inanması, grubun geri kalanından daha önemliydi.' },
        { title: 'Köpük Geçer', content: 'Söylentiler geçer. Bir hafta sonra başka bir söylenti ortaya çıkmıştı — bu sefer beni değil, başkasını ilgilendiriyordu. Ben de anladım: söylentinin hedefi olmak, değerimin düştüğünü göstermiyor. Sadece birileri konuşmaya malzeme bulmuş. Ben malzeme değilim; insanım.' },
    ],
    /* 7 — soylenti: Kıskançlıktan doğan */
    [
        { title: 'Başarının Bedeli', content: 'İlk sırayı aldığımda gurur duymuştum. Sonra fark ettim: bazı bakışlar değişmişti. Söylenti başlamıştı — hile yaptığım, öğretmenin bana kıyak geçtiği, hak etmediğim. Başarı bazen hedef çizer. Bunu bilmiyordum. Öğrendim.' },
        { title: 'İçimdeki Şüphe', content: 'En kötüsü, kendi kendime de sormaya başladım: "Gerçekten hak ettim mi?" Başkalarının şüphesi, içimde yankı bulmuştu. Bu tehlikeliydi. Günlüğe yazdım: "Çalıştım. Bildim. Doğru cevap verdim." Gerçeği yazmak, onu sağlamlaştırdı.' },
        { title: 'Kaynak Değil Gerçek', content: 'Söylentinin nereden geldiğini hiç öğrenemedim. Ama fark ettim: kaynağı bulmak çözüm değildi. Asıl mesele şuydu: başkalarının kıskançlığı, benim başarımı silemiyor. Öğretmen de bunu söyledi: "Emek verdin, puanı hak ettin. Başkalarının yorumu bu gerçeği değiştirmiyor."' },
        { title: 'Sessiz Güç', content: 'O dönemden sonra başarılarım konusunda daha sessiz oldum. Ama susmak için değil — sessizlik bazen en güçlü cevaptır. Gerçeği bilmek yeterliydi. Her gerçeği herkese kanıtlamak zorunda değildim. Kendi içimde sağlam durmak, herkesi ikna etmekten daha güçlüydü.' },
    ],
    /* 8 — soylenti: Arkadaşı için direnme */
    [
        { title: 'Arkadaşım Hedefte', content: 'Arkadaşım hakkında bir söylenti vardı. Yanlış olduğunu biliyordum — o an yanındaydım ve gerçeği biliyordum. Ama kim dinlerdi? Ve konuşmak beni de hedef yapar mıydı? Bu iki soru beni felç etti.' },
        { title: 'Sessiz Kalmak Yeter mi?', content: 'Bir gün arkadaşım ağladı. "Neden kimse söylemiyor ki yalan bu?" dedi. O an içimde bir şey kırıldı. Sessiz kalmak, yalan söylemekten farklı değildi artık. Susarak katılıyordum. Bu benim değerlerimle çelişiyordu.' },
        { title: 'Konuşma Kararı', content: 'İkna etmeye çalışmadım herkesi. Sadece en yakın arkadaş grubumda gerçeği söyledim: "O anda yanındaydım. Böyle bir şey olmadı." Bazıları dinledi, bazıları omuz silkti. Ama söylemek önemliydi — hem arkadaşım için hem de kendim için.' },
        { title: 'Dayanışmanın Gücü', content: 'Arkadaşım sonradan "Beni savunman çok şey ifade etti" dedi. Ben ise şunu öğrendim: birinin yanında durmak bazen sadece "Bu doğru değil" demek kadar basit. Tek bir ses, sessizliği kırabilir. Ben o sesi oldum. Ve bu beni güçlendirdi.' },
    ],
    /* 9 — fiziksel: Koridorda itilmek */
    [
        { title: 'O Darbe', content: 'Koridorda geçerken birisi beni itti. "Kaza" gibi görünüyordu ama üçüncü kez olunca kaza olmadığını anladım. Etrafta öğrenciler vardı, kimse bir şey söylemedi. Ben de söylemedim. Ama içimde bir şeyler birikiyordu.' },
        { title: 'Sesini Çıkarmamak', content: 'Evde annem "Yüzün soluk" dedi. "Yorgunum" dedim. Anlatamazdım — ya inanmazsa? Ya küçük bir şey mi diyecek? Seçenekler kafamda döndü ama hiçbirini uygulamadım. Sadece oturdum ve bekledim. Ne beklediğimi bilmiyordum.' },
        { title: 'Anlatma Kararı', content: 'Dördüncü seferinde yere düştüm. O an bir şeylerin değişmesi gerektiğini hissettim. Sınıf öğretmenime gittim ve anlattım. Titriyordum ama konuştum. Öğretmen dikkate aldı, not tuttu, aileyle görüştü. Süreç başlamıştı. Susarak değil, konuşarak.' },
        { title: 'Güvenli Alan', content: 'O itişler durdu. Ama öğrendiklerim durmadı. Şunu öğrendim: bedenimi korumak hakkım. Fiziksel rahatsızlık, "dayanması gereken" bir şey değil. Bir yetişkine anlatmak zayıflık değil, güvenlik talep etmek. Bu talep, herkesin hakkı.' },
    ],
    /* 10 — fiziksel: Eşyaların zarar görmesi */
    [
        { title: 'Kırılan Şeyler', content: 'Çantam yere atılmıştı. İçindekiler dağılmıştı. Defterim ıslanmıştı. Bunlar nesneydi — ama nesneler bazen çok şeyi temsil eder. O deftere özenle notlar almıştım. Onları kirletmek, bir anlamda beni kirletmek gibiydi.' },
        { title: 'Öfke ve Utanç', content: 'Öfke mi duymam, utanç mı? İkisini de hissettim. Öfke anlaşılırdı. Ama utanç — kendi eşyam zarar görmesine rağmen utandım. Sanki bir şey eksikti bende. Bu çarpık mantığı fark etmem zaman aldı: utanması gereken ben değildim.' },
        { title: 'Kanıt ve Adım', content: 'Bir sonraki gün, bir şeyler bozuksa fotoğraflamaya başladım. Kanıt biriktirmek garip hissettirdi ama öğretmenim "Doğru yapıyorsun" demişti. Kanıt, kelimelerden güçlüydü. Ve birkaç hafta sonra, biriktirdiğim kanıtlar durumu çözmede işe yaradı.' },
        { title: 'Sınırlar Korunabilir', content: 'Bu süreçten öğrendim: eşyama zarar verilmesi, kabul etmem gereken bir şey değil. Sınırlarım var — sadece duygusal değil, fiziksel de. Bu sınırları korumak için yetkililere başvurmak, benim hakkım. Ve bu hakkı kullandım.' },
    ],
    /* 11 — fiziksel: Tehdit ve korkutma */
    [
        { title: 'Bakış Bile Yeter', content: 'Bana hiçbir şey söylememişti. Sadece bakmıştı. Ama o bakış, onlarca kelimeden ağırdı. "Yarın ne olacak?" sorusu her gece kafamda döndü. Korku, varlığından bile büyük bir şeydi.' },
        { title: 'Korkuyu Anlamak', content: 'Korku neden bu kadar büyüdü? Çünkü içimde "Bu biter" diyecek ses yoktu. Kimseye anlatmadan, senaryo hep en kötüsüne gidiyordu. Günlüğe yazdım: "Korkuyorum. Bu korkuyu artık taşımak istemiyorum."' },
        { title: 'Güven Köprüsü', content: 'Bir arkadaşım fark etti. "Bir şeyler var, söyle" dedi. Anlattım. İlk kez birinin yanında taşıdım bu ağırlığı. Arkadaşım "Seninle okul danışmanına gidelim" dedi. İkimiz birlikte gittik. Yalnız değil, iki kişiydim. Bu fark büyüktü.' },
        { title: 'Güvenli Bölge', content: 'Danışman harekete geçti. Süreç başladı. Korkum tamamen bitmedi — ama artık aksiyon alınıyordu. Öğrendim: korku, hareketi felç etmek zorunda değil. Aksine, korku bazen harekete geçmek için işaret fişeği atar. Ben o işareti gördüm ve gittim.' },
    ],
    /* 12 — sozlu: Lakap */
    [
        { title: 'Adım Değiştirmek', content: 'Bir lakap takılmıştı bana. İlk başta görmezden geldim — belki geçer, belki sıkılırlar. Geçmedi. Haftalarca devam etti. Artık kendi adımı duyunca, lakapla karıştırır olmuştum. Kimliğim, birinin yaptığı şakaya karışmıştı sanki.' },
        { title: 'Kelimeler Yara Açar', content: 'Fiziksel bir iz bırakmıyor ama kelimeler yara açar. Bunu açıklayan kelime bulamıyordum uzun süre. "Neden bu kadar etkilendi?" dediklerini biliyordum. Ama etkisi gerçekti — ve gerçek olan şey, küçümsenmezdi.' },
        { title: 'Sahip Çıkmak', content: 'Bir gün öğretmen lakabı duyunca müdahale etti. O an beklediğim şey değildi bu. Öğretmen benden önce harekete geçmişti. Hakkımda bir şey yapıldı — ama ben de bir şey yapmak istedim. "Bu benim adım değil, beni bu isimle çağırma" dedim. Titreyerek ama söyledim.' },
        { title: 'İsim Benim', content: 'Zaman geçti ve lakap azaldı. Tamamen bitmedi belki, ama önemli olan: artık beni tanımlamıyordu. Adım bendim. Başka birinin koyduğu etiket, benim kimliğim olamazdı. Bu farkı anlamak, her şeyi değiştirdi.' },
    ],
    /* 13 — sozlu: Aleni alay */
    [
        { title: 'Herkesin Önünde', content: 'Sınıfta cevap verdim — yanlış bir cevap. Olur. Ama ardından gülüşmeler başladı. Yanlış cevap değil, ben güldürü konusuydum. Yüzüm kızardı. Kaybolmak istedim.' },
        { title: 'Gülüşmenin Yankısı', content: 'Teneffüste hâlâ o gülüşmeleri duyuyordum zihnimde. Dersten sonra konuşmak istemez oldum. Yanlış cevap verme korkusu, öğrenme isteğimi bastırıyordu. Bu fark edilmez bir kayıptı — ama gerçek bir kayıp.' },
        { title: 'Öğretmenin Farkı', content: 'Bir sonraki derste öğretmenim sınıfa genel bir şey söyledi: "Yanlış cevap, cevap vermemekten her zaman daha iyidir. Dalga geçilecek bir şey değil, öğrenmenin parçasıdır." Kimseyi işaret etmedi ama hissettim. Koruyucu bir sesti.' },
        { title: 'Sesimi Geri Almak', content: 'Yavaş yavaş yeniden konuşmaya başladım. Önce sessiz, sonra daha yüksek. Gülüşme tekrar oldu — ama bu sefer geçip gitti. Çünkü içimde farklı bir ses vardı: "Yanlış cevap vermek, yanlış bir insan olmak değil."' },
    ],
    /* 14 — sozlu: Görünüş yorumları */
    [
        { title: 'Beden Yorumları', content: 'Beden hakkında yorum aldım. "Çok zayıf", "tuhaf kıyafet", "saçın garip." Belki "şaka" gibi söylenmişti — ama her şaka bir şey söyler. Bu şakalar ne diyordu? "Sen olduğun gibi kabul edilemezsin." Bu mesajı duymak istemiyordum.' },
        { title: 'Ayna Sorunu', content: 'Aynaya bakmaktan kaçınır oldum. Bu fark edilmez ama önemliydi: kendi bedenimi düşman gibi görmeye başlamıştım. Birinin sözü, kendi algımı zehirlemişti. Bu fark edildiğinde şaşırdım — bazen en büyük zararlar görünmez olur.' },
        { title: 'Bedenim Ben', content: 'Annem fark etti. Konuştuk. "Başkasının gözüyle kendi bedenine bakıyorsun" dedi. Bu cümle keskin bir düzeltme gibi geldi. Bedenim benim. Yorumlar başkasının. Bu iki şeyi birbirine karıştırmak zorunda değildim.' },
        { title: 'Kabul Ettim', content: 'Kabul etmek kolay değil. Ama şunu öğrendim: bedenim, başkalarının yorumlarından önce benim. Sağlıklı, hayatımı yaşayan, beni taşıyan bedenim. Yorumlar gelir geçer. Beden hâlâ burada, hâlâ benim.' },
    ],
    /* 15 — diger: Tanık olmak */
    [
        { title: 'Gördüm', content: 'Bir öğrenciye yapılıyordu. Bana değil. Ben sadece görmüştüm. "Karışmam" dedim önce. Ama karışmamak da bir seçimdi — ve bu seçim, sessiz onay gibiydi.' },
        { title: 'Tanığın Gücü', content: 'Araştırmalar diyor ki: zorbalığı durdurmada en etkili kişi, tanık olan kişidir. Çünkü tanıkların tepkisi, zorbalık yapanın cesaretini ya kırar ya besler. Ben o kişiydim. Bu sorumluluk ağır geldi ama gerçekti.' },
        { title: 'Küçük Adım', content: 'Büyük bir şey yapmadım. Sadece o öğrencinin yanına gittim ve "İyi misin?" dedim. Sonra durumu bir öğretmene bildirdim. İki küçük adım. Ama o öğrenci "Teşekkür ederim" dedi — ve bu iki adım, onun için büyük bir fark yaratmıştı.' },
        { title: 'Upstander Olmak', content: 'Tanık olmakla upstander olmak arasındaki fark buydu: harekete geçmek. O günden sonra daha dikkatli bakmaya başladım. Çevremde ne oluyor? Kim yardıma ihtiyaç duyuyor? Bu dikkat, bir güç haline geldi.' },
    ],
    /* 16 — diger: Genel dayanıklılık */
    [
        { title: 'Zor Dönem', content: 'O dönem birçok şey üst üste geldi. Evde sorunlar vardı, okulda zorluklardı, içimde karmaşa vardı. Her şey tek tek taşınabilirdi belki — ama hepsi aynı anda ağır geldi.' },
        { title: 'Kırılma Noktası', content: 'Bir gün dersimi çalışamadım. Sadece oturdum. Bu benim için yeniydi — ben durumu idare eden biriydim. Duraksadım. "Bu ne demek?" diye sordum. Cevap: "Artık biraz daha destek gerekiyor."' },
        { title: 'Yardım Almak', content: 'Okul psikolojik danışmanını ziyaret ettim. İlk başta garip geldi — "Bir sorun yok ki" diye düşündüm. Ama sorun yoktu demek, her şeyin iyi olduğu anlamına gelmiyordu. Sadece konuşmak da yeterliydi. Ve konuştum.' },
        { title: 'Denge', content: 'Zor dönemler biter. Ve bu dönemden öğrendim: güçlü olmak, tek başına taşımak değil. Güçlü olmak, ne zaman yardım isteyeceğini bilmek.' },
    ],
    /* 17 — diger: Kendi hikâyeni yazmak */
    [
        { title: 'Hikâye Kim Yazar?', content: 'Hakkımda çok şey söylendi. Kötü, iyi, yanlış, doğru. Bir noktada fark ettim: herkes benim hikâyemi yazıyordu — sadece ben yazmıyordum.' },
        { title: 'Kalem Bende', content: 'Günlük tutmaya başladım. İlk başta zordu — ne yazacaktım? Ama sonra kelimeler aktı. Kendi bakış açım, kendi yorumum, kendi sesim. Yazdıkça güçlendim. Güçlendikçe daha net düşündüm.' },
        { title: 'Anlatmak Seçimi', content: 'Başkalarına anlattım — seçerek, güvendiğim kişilere. Her şeyi herkese değil. Bu seçici açılım, hem kendimi hem de ilişkilerimi şekillendirdi. Kime, ne kadar güveniyorum? Bu soruyu bilmek, değerliydi.' },
        { title: 'Benim Hikâyem', content: 'Bugün hâlâ zorlu şeyler yaşıyorum — kimse yaşamıyor değil. Ama artık biliyorum: bu zorluğun kahramanı benim. Yazan benim. Ve bu, her şeyi değiştiriyor.' },
    ],
    /* 18 — diger: Akran baskısı */
    [
        { title: 'Herkes Yapıyor', content: 'Herkes yapıyor gibi görünüyordu. Ben de yapmalıydım. Bu mantık, düşünülmeden kabul edildi içimde. Ama bir gün durdum: "Ben gerçekten yapmak istiyor muyum?"' },
        { title: 'İçsel Pusula', content: 'Cevap "hayır"dı. Ama "hayır" demek kolay değildi. Reddetmek, dışlanmak anlamına gelebilirdi. Bu risk gerçekti. Ama içimdeki "hayır", gruptan gelen "evet"ten daha güçlü geldi.' },
        { title: 'Reddedince', content: 'Reddettiğimde beklediğim olmadı. Kimse beni zorlamadı, kimse beni tamamen dışlamadı. Belki bazıları şaşırdı. Ama en kötü senaryo gerçekleşmedi. Ve ben, kendime güvendim.' },
        { title: 'Kendi Yolum', content: 'Akran baskısı bitmez — farklı biçimler alır hep. Ama öğrendim: içsel pusula, dışsal sese her zaman galip gelir. Ben kendi pusulama sahibim. Bu pusula bazen titrer ama kaybolmaz.' },
    ],
    /* 19 — diger: Özgüven yolculuğu */
    [
        { title: 'Yetersizlik Hissi', content: 'Hep birileri benden daha iyiydi. Daha zeki, daha güzel, daha eğlenceli. Bu karşılaştırma, içimde sessizce büyüyen bir şeydi — görünmez ama ağır.' },
        { title: 'Karşılaştırmanın Tuzağı', content: 'Bir gün fark ettim: karşılaştırdığım insanların en iyi anlarını görüyordum. Benim ise tüm anlarımı yaşıyordum. Bu eşit bir karşılaştırma değildi. Birinin en parlak anını, benim en karanlık anımla kıyaslamak — adil değildi.' },
        { title: 'Kendi Ölçeğim', content: 'Kendimi kendimle karşılaştırmaya başladım. Geçen haftaki ben, bu haftaki ben. Bu daha adildi. Ve fark ettim: ilerlemişim. Fark küçük ama gerçekti.' },
        { title: 'Yolculuk Devam', content: 'Özgüven bir varış noktası değil, bir yolculuk. Bazen geride gidiyorum, bazen ileri. Ama önemli olan: yolda olmak. Ve bu yolda, en güvenilir rehber benim.' },
    ],
];

const CAT_ARC_MAP = {
    dislanma: [0, 1, 2],
    siber:    [3, 4, 5],
    soylenti: [6, 7, 8],
    fiziksel: [9, 10, 11],
    sozlu:    [12, 13, 14],
    diger:    [15, 16, 17, 18, 19],
};

/* ─── 100 hikâye üret ─── */

const r = (arr, seed) => arr[seed % arr.length];

const SEED_STORIES = Array.from({ length: 100 }, (_, i) => {
    const cat      = CATS[i % 6];
    const arcs     = CAT_ARC_MAP[cat];
    const arcIdx   = arcs[Math.floor(i / 6) % arcs.length];
    const daysAgo  = (i * 3 + 1) % 340 + 1;

    return {
        id:                 `seed-s-${i + 1}`,
        type:               'story',
        title:              r(TITLES, i * 3),
        preview:            r(PREVIEWS, i * 7 + 2),
        category:           cat,
        themeColor:         CCOLOR[cat],
        reflectionQuestion: r(REFLECTIONS, arcIdx),
        growthLesson:       r(LESSONS, arcIdx),
        pages:              PAGE_SETS[arcIdx],
        authorPseudonym:    r(PSEUDONYMS, i * 11 + 5),
        authorEmoji:        r(EMOJIS, i * 13),
        authorColor:        r(ACOLORS, i * 3 + 1),
        ownerUid:           'koza',
        day:                dk(daysAgo),
        hearts:             8 + ((i * 7)  % 44),
        hugs:               3 + ((i * 5)  % 28),
        reads:              20 + ((i * 11) % 90),
        heartedBy:          [],
        huggedBy:           [],
        createdAt:          p(daysAgo),
    };
});

export default SEED_STORIES;
