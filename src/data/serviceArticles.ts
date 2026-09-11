export interface ServiceArticle {
  title: string;
  badge: string;
  readingTime: string;
  summary: string;
  sections: {
    heading: string;
    body: string[];
    callout?: string;
  }[];
  keyTakeaways: string[];
  faq: { q: string; a: string }[];
}

export const SERVICE_ARTICLES: Record<string, ServiceArticle> = {
  'gergi-tavan': {
    title: 'Antalya Gergi Tavan Sistemleri: Modern Aydınlatma, Akustik ve Dayanıklı Tavan Mimarisi',
    badge: 'MİMARİ REHBER & UYGULAMA STANDARTLARI',
    readingTime: '4 dk okuma',
    summary: 'Antalya genelinde villa, rezidans ve ticari mekanlarda uyguladığımız B1 alev almaz Avrupa membran gergi tavan teknolojisi, aydınlatma entegrasyonu, neme dayanıklılık ve montaj süreci hakkında bilmeniz gereken her şey.',
    keyTakeaways: [
      'Avrupa standartlarında üretilen B1 sınıfı alev yürütmez, yırtılmaz ve sararmaz PVC membranlar kullanılır.',
      'Antalya’nın yüksek nemli sahil ikliminde küf, rutubet, kabarma ve dökülme yapmaz.',
      'Özel LED difüzör profilleri sayesinde homojen, parlamasız (flicker-free) mimari aydınlatma sağlar.',
      'Kırmadan dökmeden, moloz ve toz oluşmadan standart bir odada 1 günde temiz montaj tamamlanır.',
      '10 yıl sarkmazlık, renk solmazlık ve kaynak ayrılmazlık resmi firma garantisi altındadır.',
    ],
    sections: [
      {
        heading: '1. Gergi Tavan Nedir ve Antalya Konutlarında Neden Tercih Edilir?',
        body: [
          'Gergi tavan (stretch ceiling), özel alüminyum taşıyıcı profillere ısıtılarak gerdirilen, yüksek moleküler hafızaya sahip esnek polimer membran sistemidir. Geleneksel alçıpan ve asma tavanların aksine boya, zımpara ve alçı gibi haftalarca süren inşaat kirliliği gerektirmez. Özellikle Antalya’nın Muratpaşa, Lara, Konyaaltı, Döşemealtı ve Belek gibi sahil ve nem oranı yüksek bölgelerinde klasik tavan boyaları birkaç yıl içerisinde kabarıp çatlarken, gergi tavan membranları su buharından, rutubetten ve ısı farklarından kesinlikle etkilenmez.',
          'M² Dekorasyon olarak kullandığımız Avrupa menşeili membranlar, mikron düzeyinde homojen kalınlığa sahiptir. Tavandaki mevcut çatlakları, elektrik tesisatlarını, havalandırma kanallarını ve yapısal düzensizlikleri kusursuz bir pürüzsüzlükle gizler. Üst kattan oluşabilecek su sızıntılarında metrekare başına 100 litreye kadar suyu haznesinde tutarak mobilyalarınızın ve parkelerinizin zarar görmesini engeller; su tahliyesinin ardından ısıtılarak ilk günkü formuna geri döner.',
        ],
      },
      {
        heading: '2. Membran Çeşitleri: Lake, Transparan, Mat ve Akustik Çözümler',
        body: [
          'İç mimari projelerimizde mekanın tavan yüksekliğine, doğal ışık alma kapasitesine ve kullanım amacına göre dört temel membran türünü projelendiriyoruz:',
          '• Transparan (Işık Geçiren) Gergi Tavan: Yüksek lümenli Samsung LED barlarıyla tavanın tamamını devasa bir ışık kaynağına dönüştürür. Gün ışığı (4000K), sıcak beyaz (3000K) veya soğuk beyaz (6500K) tonlarında ayarlanabilir difüzyon sunarak gölgesiz, dinlendirici bir genel aydınlatma yaratır.',
          '• Lake (Ayna Efektli) Gergi Tavan: Yüksek yansıtma kapasitesi sayesinde basık ve alçak tavanlı salon veya antrelerde tavanı olduğundan iki kat daha yüksek gösterir. Mekana derinlik, zarafet ve ferahlık katar.',
          '• Mat & Saten Gergi Tavan: Klasik alçı pürüzsüzlüğünü arayan ancak ömür boyu boya yenilemek istemeyen mekanlar için idealdir. Parlama yapmaz, kadifemsi ve sakin bir tavan dokusu oluşturur.',
          '• Akustik Delikli Membran: Ev sinema odaları, toplantı salonları, restoranlar ve otel lobilerinde yankılanmayı (eko) absorbe ederek mekan akustiğini stüdyo kalitesine ulaştırır.',
        ],
        callout: 'Tüm gergi tavanlarımız B1 sınıfı alev yürütmez sertifikasına sahiptir. Yangın anında alevi beslemez, damlama yapmaz ve zararlı toksik gaz salınımı oluşturmaz.',
      },
      {
        heading: '3. Lazer Ölçümden 1 Günde Temiz Montaja: Adım Adım Uygulama',
        body: [
          'Gergi tavan imalatında en kritik aşama milimetrik ölçüdür. Antalya merkezli keşif ekibimiz, lazer mesafe ölçerlerle tavanın köşegen ve çevre ölçülerini alır. Bu ölçüler CAD yazılımımıza aktarılarak membranın yüzde olarak çekme payı hesaplanır ve CNC tezgahlarında fitilli kenarlık (harpoon) kaynağı yapılır.',
          'Montaj günü, duvar veya tavana tozsuz delme aparatlı gizli alüminyum h-profilleri sabitlenir. Tavan içerisine uzun ömürlü, akım korumalı Osram / MeanWell trafolu LED barları döşenir. Ortam gazlı ısıtıcılarla 50–60°C sıcaklığa getirilerek membran esnetilir ve profillere kilitlenir. Oda soğuduğunda membran davul derisi gibi gergin, ayna gibi pürüzsüz bir yüzey kazanır.',
          'Evinizde hiçbir mobilyayı dışarı çıkarmanıza gerek kalmaz; toz, harç, boya kokusu ve moloz olmadan aynı gün içinde yeni tavanınız kullanıma hazır hale gelir.',
        ],
      },
      {
        heading: '4. Bakım, Temizlik ve M² Dekorasyon 10 Yıl Güvencesi',
        body: [
          'Gergi tavan membranlarımız antistatik yüzey kaplamasına sahiptir; toz çekmez, örümcek ağı barındırmaz ve is tutmaz. Temizliği son derece pratiktir; mikrofiber bir bez ve hafif cam temizleme solüsyonu ile silinmesi yeterlidir. Asla boya, macun veya vernik yenilemesi gerektirmez.',
          'M² Dekorasyon, Antalya genelinde gerçekleştirdiği tüm gergi tavan projelerinde membran yırtılmazlığı, kaynak mukavemeti ve sarkmazlık için 10 yıl resmi yazılı garanti vermektedir. Trafo ve aydınlatma elemanlarımız ise 3 yıl birebir değişim garantisi kapsamındadır.',
        ],
      },
    ],
    faq: [
      {
        q: 'Gergi tavan tavan yüksekliğini ne kadar düşürür?',
        a: 'Standart h-profil montajlarında tavanınız sadece 3 ila 4 cm kadar alçalır. Işıklı transparan tavanlarda ise LED ışık noktalarının homojen yayılması için minimum 8-12 cm tavan derinliği idealdir.',
      },
      {
        q: 'Üst kattan su akarsa gergi tavan patlar mı?',
        a: 'Hayır, membran metrekarede 100 kg suya kadar esneyebilir. Su membranın içinde bir havuz gibi toplanır. Ekibimiz gelerek suyu tahliye eder, kurutur ve membranı yeniden gerdirir; tavanınız ilk günkü haline döner.',
      },
      {
        q: 'Antalya içi keşif ve fiyatlandırma nasıl yapılıyor?',
        a: 'Antalya’nın tüm ilçelerine (Muratpaşa, Kepez, Konyaaltı, Lara, Döşemealtı, Aksu, Kemer, Serik) aynı gün veya randevulu ücretsiz keşif sağlıyoruz. Lazer ölçü sonrası net malzeme ve montaj bütçesi sunulur.',
      },
    ],
  },

  'duvar-kagidi': {
    title: 'Antalya Duvar Kağıdı Rehberi: Model Seçimi, Zemin Hazırlığı ve Temiz Montaj',
    badge: 'DEKORASYON REHBERİ',
    readingTime: '3 dk okuma',
    summary: 'Antalya evlerinde silinebilir vinil duvar kağıdı seçimi, sıcak ve nemli iklimde kabarmayı önleyen zemin hazırlığı, desen eşleştirme ve temiz işçilik hakkında pratik bilgiler.',
    keyTakeaways: [
      'Silinebilir ve neme dayanıklı kaliteli vinil tabanlı duvar kağıdı seçenekleri.',
      '130 sayfalık güncel desen arşivimiz ile yüzlerce model ve doku alternatifi.',
      'Ek yeri belli olmayan milimetrik desen eşleştirme ve temiz işçilik.',
      'Eski kağıt sökümü, duvar pürüzlerinin giderilmesi ve astar hazırlığı.',
      'Antalya merkez ve tüm ilçelerde yerinde katalogla ücretsiz keşif ve ölçüm.',
    ],
    sections: [
      {
        heading: '1. Doğru Duvar Kağıdı Seçimi: Neden Silinebilir Vinil?',
        body: [
          'Günlük kullanımda duvar kağıdının leke tutmaması ve kolay temizlenebilmesi en büyük konfordur. Kaliteli vinil tabanlı duvar kağıtları, nemli ve sabunlu bir bezle rahatça silinebilir, rengini ve canlılığını uzun yıllar korur.',
          'Özellikle salon TV ünitesi arkası, antreler, koridorlar ve çocuk odaları için hem şık hem de dayanıklı bir çözümdür. Doğal taş desenlerinden sıcak kumaş ve keten dokularına kadar geniş desen seçenekleri mevcuttur.',
        ],
      },
      {
        heading: '2. Zemin Hazırlığı: Duvar Kağıdının Uzun Ömrü',
        body: [
          'Duvar kağıdının yıllarca kabarmadan ve kenarlardan açılmadan kalması alt zeminin düzgünlüğüne bağlıdır. Antalya’nın nemli havasında kağıdın iyi tutunması için duvardaki eski kağıtlar sökülür, çatlaklar doldurulur ve astar uygulaması yapılır.',
          'Pürüzsüzleştirilen duvar yüzeyine kaliteli yapıştırıcı sürüldüğünde kağıt duvara kusursuz biçimde oturur ve uzun yıllar ilk günkü güzelliğini muhafaza eder.',
        ],
        callout: 'Kataloglarımızı evinize getirerek duvar ölçülerinizi alıyor, modelleri odanızın kendi ışığında ve mobilyalarınızın yanında görmenizi sağlıyoruz.',
      },
      {
        heading: '3. Milimetrik Desen Eşleştirme ve Ek Yeri Ustalığı',
        body: [
          'Desenli duvar kağıtlarında en önemli detay, şeritler arasındaki ek yerlerinin gözle fark edilmemesidir. Tecrübeli ustalarımız desen tekrarını milimetrik olarak eşleştirir ve özel baskı rulolarıyla ek yerlerini dikişsiz bir bütünlük haline getirir.',
          'Uygulama sonrasında odanız tertemiz toparlanır ve aynı gün içinde keyifle kullanıma hazır hale gelir.',
        ],
      },
      {
        heading: '4. 130 Sayfalık Dijital ve Basılı Desen Kataloğu',
        body: [
          'M2 Dekorasyon olarak hem sitemizdeki 130 sayfalık interaktif 3D kataloğumuzla hem de adresinize getirdiğimiz fiziki numune kataloglarımızla hizmet veriyoruz. Beğendiğiniz desenin sayfa numarasını bize iletmeniz yeterlidir.',
        ],
      },
    ],
    faq: [
      {
        q: 'Duvar kağıdı nemden veya sıcaktan kalkar mı?',
        a: 'Doğru zemin astarı ve kaliteli yapıştırıcı kullanıldığında Antalya’nın yaz sıcağında ve neminde kesinlikle kabarma veya açılma yapmaz.',
      },
      {
        q: 'Rulo hesabı ve ölçü nasıl belirlenir?',
        a: 'Duvarlarınızın en ve boy ölçüleri alınır. Desen tekrarına göre fire payı hesaplanır. Keşif ekibimiz net rulo adedini ve bütçeyi yerinde netleştirir.',
      },
    ],
  },

  'mutfak-dekorasyon': {
    title: 'Antalya Mutfak Dekorasyonu: Lüks Dolap Tasarımı, Porselen Tezgah ve Komple Tadilat',
    badge: 'ERGONOMİ & YAŞAM ALANI',
    readingTime: '5 dk okuma',
    summary: 'Antalya’da modern mutfak yenileme projelerinde akrilik/lake kapaklar, porselen ve kuvars tezgahlar, Blum mekanizmaları ve anahtar teslim şantiye yönetimi kılavuzu.',
    keyTakeaways: [
      'Çizilmeye, neme ve UV ışığına dayanıklı MDF üzeri akrilik ve ipek mat lake kapak seçenekleri.',
      'Lamar / Belenco / Çimstone porselen ve kuvars tezgahlar ile ısıya ve lekeye tam mukavemet.',
      'Altın üçgen çalışma ergonomisi (Depolama - Hazırlık - Pişirme) ile maksimum hareket özgürlüğü.',
      'Blum ve Hafele frenli çekmece rayları, köşe kör nokta kiler sistemleri ve sessiz kapanış.',
      'Su, atık su ve elektrik tesisatından asma tavan aydınlatmasına kadar sıfır sürprizle anahtar teslim süreç.',
    ],
    sections: [
      {
        heading: '1. Mutfak Yenilemede Mimari Planlama ve Ergonomi',
        body: [
          'Mutfak, evin sadece yemek pişirilen bir bölümü değil; ailenin bir araya geldiği, sosyalleştiği ana yaşam merkezidir. Antalya’da gerçekleştirdiğimiz mutfak projelerinde ilk adım, mekanın ışık yönünü ve kullanım alışkanlıklarını analiz etmektir. Mimarlık literatüründe "Altın Çalışma Üçgeni" olarak tanımlanan buzdolabı (saklama), evye (hazırlık/yıkama) ve ocak (pişirme) istasyonları arasındaki mesafeyi en ideal rotada konumlandırıyoruz.',
          'Gereksiz adım atmayı engelleyen, tezgah üstü karmaşayı minimuma indiren akıllı kiler dolapları, entegre baharatlıklar ve ada mutfak konseptleri ile hem yemek hazırlamayı keyifli kılıyor hem de mekana prestij kazandırıyoruz.',
        ],
      },
      {
        heading: '2. Dolap Kapaklarında Dayanıklılık: Lake, Akrilik ve Ahşap Dokular',
        body: [
          'Antalya’nın sıcak ve nemli ikliminde kalitesiz suntalam gövdeler zamanla şişme yapar ve menteşe deliklerinden gevşer. M² Dekorasyon olarak gövde imalatında daima suya ve buhara mukavemetli birinci sınıf MDF-Lam paneller kullanıyoruz:',
          '• İpek Mat Lake Kapaklar: CNC tezgahlarında açılan fitilli veya kulpsuz J-profil kanallar sonrası poliüretan bazlı sararmaz lake boya ile 7 katman boyanır. Pürüzsüz, kadifemsi ve zamansız bir estetik sunar.',
          '• Akrilik & Senosan Kapaklar: Çizilmeye karşı güçlendirilmiş yüzeyi ile yüksek parlaklık veya derin matlık sağlar. Parmak izi bırakmaz ve kolay silinir.',
          '• Doğal Ahşap Kaplama & Cam Kapaklar: Alüminyum çerçeveli füme camlı dolaplar ve LED aydınlatmalı vitrin bölümleriyle mutfağa lüks bir derinlik kazandırır.',
        ],
        callout: 'Tüm çekmece ve dolap kapaklarımızda ömür boyu mekanik garantili Blum / Hafele frenli ray sistemleri standart olarak sunulmaktadır. Çarpma yapmaz, sarkmaz ve sessiz çalışır.',
      },
      {
        heading: '3. Tezgah Seçimi: Kuvars mı, Porselen mi?',
        body: [
          'Mutfak tezgahı, en yoğun darbe, ısı ve kimyasala maruz kalan alandır. Gözeneksiz yapısı sayesinde leke tutmayan, limon ve sirke asidinden etkilenmeyen kuvars (Çimstone, Belenco, Silestone) ve 1200 derecede fırınlanmış ultra kompakt porselen (Lamar, Dekton) tezgahları öneriyoruz.',
          'Porselen tezgahlar tencereden doğrudan gelen sıcak tepsilere karşı tam yanmazlık sunar, üzerine doğrudan kesme tahtası olmadan bıçakla temas edilebilir ve sıfır çizilme dayanımı gösterir. Alttan yapıştırma evye ve gizli tezgah altı kablosuz şarj üniteleri ile teknolojik bir konfor oluşturulur.',
        ],
      },
      {
        heading: '4. Kırım, Altyapı ve 10 Günde Anahtar Teslim Montaj Süreci',
        body: [
          'Eski mutfağın sökümü, fayansların kırılması, su ve gider borularının yenilenmesi, priz hatlarının ada ve ankastre cihazlara göre dağıtılması ekibimiz tarafından titizlikle yönetilir. Kendi atölyemizde ön montajı yapılan dolaplar, şantiyeye sevk edilerek tecrübeli ustalarımızca kurulur. Sürpriz ek maliyet olmadan, sözleşmede taahhüt edilen günde mutfağınız eksiksiz teslim edilir.',
        ],
      },
    ],
    faq: [
      {
        q: 'Mutfak tadilatı ortalama kaç gün sürer?',
        a: 'Atölye imalat süreci devam ederken evinizdeki kırım ve altyapı işleri 2 günde tamamlanır. Dolap ve tezgah montajı 2-3 gün sürer. Toplamda eviniz şantiye olarak yalnızca 5 ila 8 iş günü açık kalır.',
      },
      {
        q: '3D çizimde gördüğümüzün birebir aynısı yapılıyor mu?',
        a: 'Evet, projelendirme aşamasında onayladığınız fotogerçekçi 3D render üzerinden üretim yapılır. Renk kodları, kulp modelleri ve tezgah plakası birebir sözleşmeye eklenir.',
      },
    ],
  },

  'banyo-dekorasyon': {
    title: 'Antalya Banyo Yenileme & Islak Hacim Mimari Uygulama Kılavuzu',
    badge: 'SU İZOLASYONU & SPA KONFORU',
    readingTime: '4 dk okuma',
    summary: 'Büyük ebat porselen seramikler, sızdırmaz membran su izolasyonu, gömme rezervuarlar ve özel cam duşakabin çözümleriyle Antalya’da komple banyo tadilatı rehberi.',
    keyTakeaways: [
      'Garantili çift katmanlı polimer-çimento esaslı tam elastik su yalıtımı.',
      '60x120 cm ve 120x240 cm büyük ebat rektifiyeli porselen seramiklerle derzsiz ferahlık.',
      'Geberit / VitrA gömme rezervuarlar ve duvara sıfır asma klozet sistemleri.',
      'Lineer gizli paslanmaz süzgeçler ile eğimli engelsiz duş zeminleri (Walk-in Shower).',
      'Neme dayanıklı lake banyo mobilyaları, LED ambiyanslı buğu önleyici aynalar.',
    ],
    sections: [
      {
        heading: '1. Banyo Yenilemenin Kalbi: Kusursuz Su İzolasyonu',
        body: [
          'Banyo tadilatında estetikten önce gelen en kritik konu su izolasyonudur. Antalya’da özellikle apartman dairelerinde alt kata su sızması, komşular arası en büyük tadilat kabusudur. M² Dekorasyon olarak eski seramikler söküldükten sonra zemin şapı atılır ve duvar-zemin birleşim noktalarına pah bantları yerleştirilir.',
          'Tüm ıslak hacme çift kat tam elastik sürme izolasyon uygulanır ve 24 saatlik su testi yapılmadan seramik uygulamasına kesinlikle geçilmez. Bu sayede alt kata su sızma riski ömür boyu ortadan kaldırılır.',
        ],
      },
      {
        heading: '2. Büyük Ebat Porselen Seramikler ve Derzsiz Zarafet',
        body: [
          'Geleneksel küçük ebat fayanslar bol miktarda derz dolgusu gerektirir; bu derzler zamanla su kireci ve neme bağlı olarak kararır, temizliği zorlaşır. Günümüz modern banyo tasarımlarında 60x120 cm, 80x160 cm veya 120x240 cm boyutlarında büyük ebat porselen seramikler kullanıyoruz.',
          'Rektifiyeli (keskin lazer kesimli) seramikler, minimum derz aralığı (1 mm) ve epoksi derz dolgusuyla birleştirilerek adeta yekpare bir mermer banyodaymış hissi uyandırır. Hem temizliği son derece kolaydır hem de mekanı lüks bir butik otel süitine dönüştürür.',
        ],
        callout: 'Duş alanlarında eşikli ve hantal duş tekneleri yerine, zemine sıfır gömme lineer süzgeçli (walk-in shower) temperli cam çözümleri uyguluyoruz.',
      },
      {
        heading: '3. Gömme Rezervuar, Asma Klozet ve Armatür Standartları',
        body: [
          'Zemine oturan klasik klozetlerin arkasında kalan temizlenemeyen kör noktalar, yerini duvara gömülü Geberit veya VitrA rezervuarlara ve kanalsız (rimless) asma klozetlere bırakmaktadır. Zemin temizliğini tek hamlede mümkün kılan bu sistemler, estetik açıdan da banyonun zemin kesintisizliğini korur.',
          'Armatürlerde ise mat siyah, fırçalanmış pirinç (gold) veya antrasit tonlarında termostatik ankastre duş bataryaları tercih ediyoruz. Su sıcaklığını sabitleyen termostatik kartuşlar, ani basınç düşmelerinde dahi haşlanma riskini engeller.',
        ],
      },
      {
        heading: '4. Neme Dayanıklı Banyo Mobilyaları ve Işık Planlaması',
        body: [
          'Banyo dolaplarımızda %100 suya ve neme dirençli MDF üzeri lake veya termoform membran kaplama paneller kullanılır. Dokunmatik sensörlü, buğu önleyici rezistanslı LED aynalar ve niş içi gizli aydınlatmalar ile banyonuza dinlendirici bir spa atmosferi kazandırılır.',
        ],
      },
    ],
    faq: [
      {
        q: 'Banyo tadilatı kaç gün sürer ve bu sürede evde yaşanabilir mi?',
        a: 'Komple banyo tadilatı kırım, tesisat, su yalıtımı, seramik döşeme ve montaj dahil 5 ila 7 iş gününde tamamlanır. Çift banyolu evlerde yaşam aksamaz; tek banyolu evlerde ise su kesintisi süresi minimuma indirilir.',
      },
      {
        q: 'Seramik üzerine seramik kaplama önerir misiniz?',
        a: 'Önermiyoruz. Eski seramiklerin altındaki tesisat boruları kontrol edilmeden yapılan uygulamalar ileride su sızıntılarına yol açar. Eski zemin tamamen kırılıp izolasyon sıfırdan yapılmalıdır.',
      },
    ],
  },

  'mimari-projelendirme-uygulama': {
    title: 'Antalya İç Mimarlık, 3D Tasarım & Komple Anahtar Teslim Tadilat Yönetimi',
    badge: 'KONSEPTTEN GERÇEĞE',
    readingTime: '5 dk okuma',
    summary: 'Rölöveden 3D fotogerçekçi görselleştirmeye, malzeme seçiminden şantiye şefliğine kadar Antalya genelinde lüks konut, villa ve ticari mekan dönüşüm standartlarımız.',
    keyTakeaways: [
      'Lazer rölöve ve fonksiyonel mekan analizi ile sürprizsiz başlangıç.',
      'Fotogerçekçi 3D renderlar ile tadilat başlamadan önce sonucunu birebir görme güvencesi.',
      'Kapsamlı keşif özeti, sabit bütçe ve net teslim tarihi taahhüdü.',
      'Yıkım, altyapı, zemin, mobilya ve aydınlatma ekiplerinin tek elden profesyonel koordinasyonu.',
      'Antalya’nın Döşemealtı, Lara, Konyaaltı, Belek ve Kemer bölgelerinde villa ve rezidans referansları.',
    ],
    sections: [
      {
        heading: '1. Neden Profesyonel Mimari Projelendirme?',
        body: [
          'Ev veya ticari mekan tadilatlarında en sık karşılaşılan sorunlar; ustaların birbirini beklemesi, plansız kırım işlemleri, bütçenin öngörülemeyen kalemlerle ikiye katlanması ve sonuçta hayal edilen estetiğin yakalanamamasıdır. M² Dekorasyon’un mimari projelendirme yaklaşımı, bu süreci şansa bırakmaz.',
          'Proje başlamadan önce mekanınızın her milimetresi lazerle ölçülür, duvar taşıyıcı sistemleri ve tesisat şemaları incelenir. İhtiyaçlarınıza özel hazırlanan fonksiyonel yerleşim planları (layout) ile alanın her köşesi maksimum verimlilikle değerlendirilir.',
        ],
      },
      {
        heading: '2. 3D Görselleştirme: Sonucu Önceden Görme Konforu',
        body: [
          'Bir duvara hangi renk boyanın yakışacağını, gergi tavanın mobilyalarla nasıl bir ahenk yakalayacağını veya mutfak tezgahının zemin seramiğiyle kontrastını hayal etmek zorunda değilsiniz. İç mimarlarımız mekanı 3D modelleme yazılımlarında aslına birebir uygun materyallerle giydirir.',
          'Işık simülasyonları, mobilya ölçekleri ve renk paletleri 3D render görüntülerinde onayınıza sunulur. Siz "Evet, tam olarak istediğim ev bu!" diyene kadar revizyonlar yapılır; şantiyede tek bir çivi dahi plansız çakılmaz.',
        ],
        callout: 'Onaylanan 3D tasarım şantiyedeki ustalara milimetrik teknik uygulama paftaları olarak iletilir. Sürpriz ek maliyetler ve "burası böyle oldu mecburen" bahaneleri tamamen ortadan kalkar.',
      },
      {
        heading: '3. Anahtar Teslim Şantiye Yönetimi ve Tek Muhatap Kolaylığı',
        body: [
          'Tesisatçı, elektrikçi, alçıcı, boyacı, seramik ustası ve mobilya imalatçısını ayrı ayrı aramak, koordine etmek ve hatalarda suçun birbirine atılmasıyla uğraşmak zorunda kalmazsınız. M² Dekorasyon tüm bu ekipleri tek bir çatı altında, kadrolu şantiye şefleriyle yönetir.',
          'Her sabah iş planı kontrol edilir, malzeme sevkiyatları gün gün takip edilir ve belirlenen takvime göre aşama aşama ilerlenir. Size sadece düzenli olarak ilettiğimiz şantiye fotoğraf ve video raporlarını keyifle izlemek kalır.',
        ],
      },
      {
        heading: '4. Bütçe Disiplini ve Resmi Sözleşme Güvencesi',
        body: [
          'Proje başlangıcında tüm malzeme marka, model ve metrajlarını içeren detaylı bir keşif listesi hazırlanır. Bütçe bu liste üzerinden sabitlenir; döviz veya piyasa dalgalanmaları sözleşme süresince müşteriye yansıtılmaz. Zamanında teslim ve 10 yıl resmi işçilik taahhüdü ile yatırımınızın değerini katlarız.',
        ],
      },
    ],
    faq: [
      {
        q: 'Anahtar teslim daire tadilatı ne kadar sürer?',
        a: 'Standart bir 3+1 dairenin komple yenilenmesi (kırım, tesisat, gergi tavan, banyo, mutfak, zemin ve kapılar) projenin kapsamına göre ortalama 20 ila 35 iş günü arasında tamamlanır.',
      },
      {
        q: 'Sadece tasarım ve 3D çizim hizmeti veriyor musunuz?',
        a: 'Evet, dilerseniz yalnızca 3D projelendirme ve teknik pafta danışmanlığı alabilir veya projeyi anahtar teslim olarak tüm imalatlarıyla birlikte bize emanet edebilirsiniz.',
      },
    ],
  },
};
