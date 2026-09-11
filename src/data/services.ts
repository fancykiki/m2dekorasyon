/**
 * Single source of truth for the M2 Dekorasyon service pages.
 *
 * Everything downstream is generated from this file:
 *  - the static HTML shell of every /hizmetler/... page (title, description,
 *    canonical, Open Graph, Service + FAQPage + BreadcrumbList JSON-LD)
 *  - sitemap.xml
 *  - the services hub and the homepage services section
 *
 * See scripts/generate-pages.ts.
 *
 * IMAGES: heroImage / gallery currently point at stock photography so the
 * pages are complete. Replace the URLs here (or drop files into
 * public/hizmetler/<slug>/ and point to them) — nothing else needs touching.
 */

export const SITE = {
  name: 'M2 Dekorasyon',
  legalName: 'M2 Dekorasyon',
  origin: 'https://m2dekorasyon.com',
  logo: '/logo.png',
  phone: '+902423210008',
  phoneDisplay: '0242 321 00 08',
  whatsapp: '905305408567',
  whatsappDisplay: '0530 540 85 67',
  email: 'info@m2dekorasyon.com',
  street: 'Dutlubahçe, Fatih Cd. 62 B',
  district: 'Muratpaşa',
  city: 'Antalya',
  postalCode: '07010',
  lat: 36.909653,
  lng: 30.698736,
  hours: '09:00 – 19:00',
  openingHours: 'Her gün 09:00 – 19:00',
  maps: 'https://maps.app.goo.gl/8iiczBEtzGhHbKRE9',
  instagram: 'https://www.instagram.com/m2dekorasyon/',
  facebook: 'https://www.facebook.com/metrekaredekorasyon/',
} as const;

/** Everywhere we link to the catalogue flipbook. */
export const CATALOG = {
  path: '/katalog/',
  pdfPath: '/m2dekorasyon.pdf',
  title: 'Desen Kataloğu',
  pages: 45,
} as const;

/** Prefilled WhatsApp link. */
export const waLink = (text: string) =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;

/** Districts we actively serve — used for areaServed schema and local copy. */
export const SERVICE_AREAS = [
  'Muratpaşa',
  'Konyaaltı',
  'Kepez',
  'Döşemealtı',
  'Aksu',
  'Lara',
  'Serik',
  'Belek',
  'Manavgat',
  'Side',
  'Kemer',
  'Alanya',
] as const;

export interface ServiceBlock {
  heading: string;
  body: string;
  bullets?: string[];
}

export interface ServiceFaq {
  q: string;
  a: string;
}

export interface ServiceSpec {
  label: string;
  value: string;
}

export interface ServicePage {
  slug: string;
  number: string;
  /** Short label for navigation and cards. */
  nav: string;
  /** Visible page heading. One H1 per page. */
  h1: string;
  /** <title> — keep under ~60 characters. */
  seoTitle: string;
  /** <meta name="description"> — keep under ~160 characters. */
  seoDescription: string;
  keywords: string[];
  tagline: string;
  intro: string;
  heroImage: string;
  gallery: string[];
  blocks: ServiceBlock[];
  features: string[];
  specs: ServiceSpec[];
  faq: ServiceFaq[];
  relatedSlugs: string[];
}

export const SERVICES: ServicePage[] = [
  /* ------------------------------------------------------------------ 01 */
  {
    slug: 'gergi-tavan',
    number: '01',
    nav: 'Gergi Tavan',
    h1: 'Antalya Gergi Tavan Sistemleri',
    seoTitle: 'Antalya Gergi Tavan Sistemleri | M2 Dekorasyon',
    seoDescription:
      'Antalya gergi tavan uygulaması: mat, parlak lake, ışıklı translüsent ve baskılı membran. Muratpaşa, Konyaaltı ve Lara’da tek günde montaj, ücretsiz keşif.',
    keywords: [
      'antalya gergi tavan',
      'gergi tavan antalya',
      'gergi tavan fiyatları antalya',
      'ışıklı gergi tavan',
      'parlak lake gergi tavan',
      'muratpaşa gergi tavan',
      'konyaaltı gergi tavan',
    ],
    tagline: 'Eksiz membran, gizli ışık ve tek günde biten tavan',
    intro:
      'Gergi tavan, eski ve çatlamış tavanları kırıp dökmeden yenilemenin en hızlı yoludur. Alüminyum çevre profiline ısıyla gerdirilerek kilitlenen membran, tek parça ve eksiz bir yüzey oluşturur. M2 Dekorasyon olarak Antalya ve çevre ilçelerde konut, ofis, otel ve ticari mekânlarda gergi tavan uyguluyoruz.',
    // Real M2 stretch-ceiling frames we already ship — local, optimised, on-brand.
    heroImage: '/hero-seq/frame-0044.webp',
    gallery: ['/hero-seq/frame-0020.webp', '/hero-seq/frame-0060.webp'],
    blocks: [
      {
        heading: 'Hangi gergi tavan çeşidi hangi mekâna uygun?',
        body:
          'Membran seçimi mekânın yüksekliğine, ışık ihtiyacına ve kullanım amacına göre değişir. Doğru seçim, tavanın hem görünümünü hem de mekânın algılanan ferahlığını belirler.',
        bullets: [
          'Mat membran — salon, yatak odası ve ofislerde doğal alçı görünümü verir, ışığı yansıtmaz.',
          'Parlak lake membran — dar ve alçak mekânlarda ayna etkisiyle tavan yüksekliğini görsel olarak artırır.',
          'Işıklı translüsent membran — arkasına yerleştirilen LED ile tüm tavanı gölgesiz, homojen bir aydınlatma yüzeyine dönüştürür.',
          'Baskılı ve yıldızlı gökyüzü — çocuk odası, yatak odası ve sinema odalarında özel atmosfer kurar.',
          'Akustik mikro-perfore — ofis, restoran ve toplantı salonlarında yankıyı düşürür.',
        ],
      },
      {
        heading: 'Uygulama nasıl ilerliyor?',
        body:
          'Ücretsiz keşifte mekânı ölçüyor, tavan yüksekliğini ve mevcut tesisatı değerlendiriyoruz. Membran ölçüye göre hazırlanıyor, montaj günü çevre profili monte edilip membran ısıyla gerdiriliyor. Tek odalı uygulamalar çoğunlukla aynı gün tamamlanıyor; mobilyalarınızı taşımanıza veya evden çıkmanıza gerek kalmıyor.',
      },
      {
        heading: 'Antalya’nın nemli ikliminde neden gergi tavan?',
        body:
          'Deniz seviyesine yakın ve nem oranı yüksek bölgelerde alçı tavanlar zamanla çatlar, boya kabarır ve küf oluşur. Gergi tavan membranı su geçirmez ve küf tutmaz; üst kattan gelen olası su kaçaklarında suyu taşıyıp boşaltılmasına imkân verir. Bu nedenle Konyaaltı, Lara ve Kemer gibi sahil hattındaki konutlarda özellikle tercih ediliyor.',
      },
    ],
    features: [
      'Eksiz tek parça yüzey',
      'Tek günde montaj, toz ve moloz yok',
      'Su geçirmez, küf yapmaz',
      'Gizli LED kanalı ve gömme spot entegrasyonu',
    ],
    specs: [
      { label: 'Membran', value: 'Yüksek yanmazlık sınıfı PVC / akustik mikro-perfore' },
      { label: 'Montaj sistemi', value: 'Alüminyum harpun çevre profili' },
      { label: 'Yükseklik kaybı', value: 'Spot kullanılmayan uygulamalarda minimum' },
      { label: 'Aydınlatma', value: '2700K–4000K ayarlanabilir, kısılabilir sürücü' },
    ],
    faq: [
      {
        q: 'Antalya’da gergi tavan fiyatları neye göre belirleniyor?',
        a: 'Fiyat; metrekare, seçilen membran tipi (mat, lake, ışıklı, baskılı), aydınlatma kurgusu ve tavanın mevcut durumuna göre değişir. Yerinde ücretsiz keşif sonrası net fiyat veriyoruz.',
      },
      {
        q: 'Montaj ne kadar sürüyor, evden çıkmam gerekir mi?',
        a: 'Tek odalı uygulamalar genellikle aynı gün biter. Kırım ve moloz olmadığı için evden çıkmanız gerekmez; mobilyaları odanın ortasına toplamak yeterlidir.',
      },
      {
        q: 'Gergi tavan sarkar mı, zamanla renk atar mı?',
        a: 'Doğru gerdirme ve profil seçimiyle sarkma olmaz. Kullandığımız membranlar UV dayanımlıdır ve normal iç mekân koşullarında renk atmaz.',
      },
      {
        q: 'Mevcut spotlarım ve klimam korunabilir mi?',
        a: 'Evet. Spot, klima menfezi, duman dedektörü ve perde kutusu için özel halkalarla geçiş açıyoruz. İsterseniz aydınlatmayı da aynı anda yeniliyoruz.',
      },
      {
        q: 'Hangi ilçelerde hizmet veriyorsunuz?',
        a: 'Muratpaşa, Konyaaltı, Kepez, Döşemealtı, Aksu ve Lara başta olmak üzere Serik, Belek, Manavgat, Side, Kemer ve Alanya’da uygulama yapıyoruz.',
      },
    ],
    relatedSlugs: ['banyo-dekorasyon', 'duvar-kagidi', 'mimari-projelendirme-uygulama'],
  },

  /* ------------------------------------------------------------------ 02 */
  {
    slug: 'duvar-kagidi',
    number: '02',
    nav: 'Duvar Kağıdı',
    h1: 'Antalya Duvar Kağıdı Satış ve Uygulama',
    seoTitle: 'Antalya Duvar Kağıdı Satış ve Uygulama | M2 Dekorasyon',
    seoDescription:
      'Antalya duvar kağıdı uygulama: silinebilir vinil ve kaliteli ithal duvar kağıtları. Temiz zemin hazırlığı, milimetrik işçilik ve yerinde katalogla ücretsiz keşif.',
    keywords: [
      'antalya duvar kağıdı',
      'duvar kağıdı antalya',
      'duvar kağıdı ustası antalya',
      'silinebilir duvar kağıdı',
      'ithal duvar kağıdı antalya',
      'muratpaşa duvar kağıdı',
      'konyaaltı duvar kağıdı',
    ],
    tagline: 'Silinebilir kaliteli modeller, temiz yüzey hazırlığı ve dikişsiz uygulama',
    intro:
      'Duvar kağıdı, evinize ferahlık ve şıklık katmanın en pratik yoludur. M2 Dekorasyon olarak yüzlerce model içeren güncel desen kataloglarımızla adresinize geliyor, mekanınıza en uygun modeli birlikte seçiyoruz. Eski kağıdın sökümünden pürüzsüz zemin hazırlığına ve temiz montaja kadar her şeyi titizlikle yapıyoruz.',
    heroImage: '/duvar-kagidi-katalog/page-002.webp',
    gallery: ['/duvar-kagidi-katalog/page-003.webp', '/duvar-kagidi-katalog/page-004.webp'],
    blocks: [
      {
        heading: 'Zengin Desen ve Model Seçenekleri',
        body:
          'Mekanınızın ışığına ve mobilyalarınıza en uygun desenleri geniş kataloğumuzdan seçebilirsiniz. Tüm modellerimiz kaliteli, uzun ömürlü ve temizliği kolay ürünlerdir.',
        bullets: [
          'Silinebilir vinil modeller — Nemli bezle kolayca temizlenir, leke ve parmak izi tutmaz.',
          'Dokulu ve keten efektli modeller — Salon ve yatak odalarında sıcak, şık bir hava yaratır.',
          'Doğal taş ve mermer desenleri — TV ünitesi arkasında ve antrelerde modern derinlik katar.',
          'Özel manzara ve 3D derinlikli görseller — Odanızı olduğundan daha ferah ve canlı gösterir.',
        ],
      },
      {
        heading: 'Temiz Zemin Hazırlığı ve Kusursuz İşçilik',
        body:
          'Duvar kağıdının uzun yıllar boyunca kabarmadan, açılma yapmadan durması için alt zemin çok önemlidir. Uygulama öncesinde duvardaki pürüzleri gideriyor, gerekiyorsa alçı dolgusunu ve astarını çekiyoruz. Desenleri milimetrik olarak birbirine denk getiriyor ve ek yerlerini kesinlikle belli etmeyecek şekilde uyguluyoruz.',
      },
      {
        heading: 'Yerinde Katalogla Ücretsiz Keşif',
        body:
          'Fotoğraftan veya ekrandan duvar kağıdı seçmek her zaman doğru rengi vermez. Bize ulaştığınızda ustalarımız en beğenilen desen kataloglarıyla evinize gelir; hem net ölçünüzü alır hem de renkleri kendi mobilyalarınızın yanında canlı olarak görmenizi sağlar.',
      },
    ],
    features: [
      '130 sayfalık güncel desen kataloğu',
      'Silinebilir, leke tutmayan kaliteli kağıtlar',
      'Eski kağıt sökümü ve pürüzsüz zemin hazırlığı',
      'Ek yeri belli olmayan milimetrik desen eşleme',
      'Antalya geneli yerinde katalogla ücretsiz keşif',
    ],
    specs: [
      { label: 'Modeller', value: 'Silinebilir vinil, dokulu kumaş efektli, 3D derinlikli modeller' },
      { label: 'Hazırlık', value: 'Eski kağıt sökümü, pürüz giderme, saten alçı ve astar' },
      { label: 'Uygulama', value: 'Dikişsiz ek yeri, desen raport kontrollü temiz montaj' },
      { label: 'Keşif', value: 'Antalya geneli yerinde katalogla ücretsiz' },
    ],
    faq: [
      {
        q: 'Duvar kağıdı nemden veya sıcaktan kalkar mı?',
        a: 'Kullandığımız kaliteli vinil modeller ve doğru astar uygulaması sayesinde Antalya’nın sıcağında ve neminde kabarma veya kalkma yapmaz.',
      },
      {
        q: 'Eski duvar kağıdının üzerine yeni kağıt yapılır mı?',
        a: 'En temiz ve uzun ömürlü sonuç için eski kağıdın sökülüp alt zeminin düzeltilmesini öneriyoruz. Bu hazırlığı temiz ve tozsuz bir şekilde biz yapıyoruz.',
      },
      {
        q: 'Bir odanın yapılması ne kadar sürer?',
        a: 'Zemini hazır olan standart bir oda genellikle 1 günde tamamen bitirilip temiz bir şekilde teslim edilir.',
      },
      {
        q: 'Katalogları evimizde canlı inceleyebilir miyiz?',
        a: 'Evet. Bizi aradığınızda ustamız desen kataloglarıyla evinize gelir, hem ölçü alır hem de desenleri mobilyalarınızın yanında görmenizi sağlar.',
      },
    ],
    relatedSlugs: ['gergi-tavan', 'mutfak-dekorasyon', 'mimari-projelendirme-uygulama'],
  },

  /* ------------------------------------------------------------------ 03 */
  {
    slug: 'mutfak-dekorasyon',
    number: '03',
    nav: 'Mutfak Dekorasyon',
    h1: 'Antalya Mutfak Dekorasyon ve Yenileme',
    seoTitle: 'Antalya Mutfak Dekorasyon ve Yenileme | M2 Dekorasyon',
    seoDescription:
      'Antalya mutfak dekorasyon: kulpsuz dolap, kuvars tezgâh, ada mutfak ve tezgâh altı LED. Ölçüden montaja anahtar teslim mutfak yenileme, ücretsiz keşif.',
    keywords: [
      'antalya mutfak dekorasyon',
      'mutfak yenileme antalya',
      'antalya mutfak dolabı',
      'ada mutfak antalya',
      'kuvars tezgah antalya',
      'muratpaşa mutfak yenileme',
    ],
    tagline: 'Ergonomi, depolama ve doğru aydınlatmayla kurulan mutfaklar',
    intro:
      'Mutfak yenilemede en sık yapılan hata, işe dolap seçerek başlamaktır. Oysa önce çalışma üçgeni, depolama ihtiyacı ve tesisatın konumu çözülmelidir. M2 Dekorasyon olarak Antalya’da mutfakları önce planlıyor, sonra üretiyoruz; sonuç hem daha kullanışlı hem de daha uzun ömürlü oluyor.',
    heroImage: '/services-gallery/mutfak/img-001.webp',
    gallery: [
      '/services-gallery/mutfak/img-002.webp',
      '/services-gallery/mutfak/img-003.webp',
    ],
    blocks: [
      {
        heading: 'Önce plan, sonra dolap',
        body:
          'Buzdolabı, evye ve ocak arasındaki mesafe mutfakta geçirdiğiniz süreyi doğrudan etkiler. Ada kurulup kurulamayacağı, tesisatın taşınıp taşınmayacağı ve davlumbaz bacasının güzergâhı ilk günden netleşmelidir. Rölöve sonrası mutfağınızı 3D olarak görselleştiriyor, üretime ancak siz onayladıktan sonra başlıyoruz.',
      },
      {
        heading: 'Malzeme seçimi neyi değiştirir?',
        body:
          'Mutfak, evin en çok yıpranan alanıdır. Kapak yüzeyi, tezgâh malzemesi ve donanım kalitesi günlük kullanımda hemen kendini gösterir.',
        bullets: [
          'Kulpsuz (gola) kapak — temizliği kolay, çizik göstermeyen yalın bir görünüm verir.',
          'Kuvars ve porselen tezgâh — ısıya ve lekeye dayanıklı; mermerin aksine gözenek tutmaz.',
          'Şelale ada kenarı — tezgâhın yandan devam etmesi mutfağa heykelsi bir görünüm katar.',
          'Frenli menteşe ve tam açılır ray — kapak ve çekmece ömrünü belirleyen asıl detay.',
          'Tezgâh altı LED — çalışma yüzeyini gölgesiz aydınlatır, akşam kullanımını değiştirir.',
        ],
      },
      {
        heading: 'Islak hacme uygun tavan ve aydınlatma',
        body:
          'Mutfak buharı zamanla alçı tavanı boyar ve kabartır. Neme dayanıklı gergi tavan, mutfakta hem silinebilir bir yüzey sağlar hem de gömme spotları düzgün bir hizada toplar. Mutfak yenilemelerimizde tavan ve aydınlatmayı dolapla aynı projede ele alıyoruz.',
      },
    ],
    features: [
      'Rölöve ve 3D ön görselleştirme',
      'Kulpsuz gola ve lake kapak seçenekleri',
      'Kuvars / porselen tezgâh ve şelale ada',
      'Tezgâh altı LED ve gömme aydınlatma',
    ],
    specs: [
      { label: 'Kapak', value: 'Lake, akrilik, melamin, gola sistem' },
      { label: 'Tezgâh', value: 'Kuvars, porselen, kompakt lamine' },
      { label: 'Donanım', value: 'Frenli menteşe, tam açılır ray, köşe çözümleri' },
      { label: 'Tavan', value: 'Neme dayanıklı gergi tavan + gömme spot' },
    ],
    faq: [
      {
        q: 'Mutfak yenileme ne kadar sürüyor?',
        a: 'Sadece dolap ve tezgâh değişiminde 3–5 gün yeterlidir. Tesisat, zemin ve duvar işleri de varsa süre 2–3 haftaya çıkabilir. Takvimi keşiften sonra gün gün paylaşıyoruz.',
      },
      {
        q: 'Mevcut dolaplarımı koruyup sadece kapak ve tezgâh değiştirebilir miyim?',
        a: 'Gövdeler sağlamsa evet. Bu, bütçeyi ciddi şekilde düşüren bir çözümdür; keşifte gövde durumunu kontrol edip size net olarak söylüyoruz.',
      },
      {
        q: 'Kuvars mı granit mi tercih etmeliyim?',
        a: 'Kuvars gözeneksizdir, leke tutmaz ve bakım istemez; günlük kullanımda çoğu ev için daha pratiktir. Granit doğal desen isteyenler için uygundur ancak periyodik emprenye ister.',
      },
      {
        q: 'Antalya’nın hangi ilçelerinde mutfak yeniliyorsunuz?',
        a: 'Muratpaşa, Konyaaltı, Kepez, Döşemealtı, Aksu ve Lara başta olmak üzere Serik, Belek, Manavgat ve Alanya’da uygulama yapıyoruz.',
      },
    ],
    relatedSlugs: ['banyo-dekorasyon', 'gergi-tavan', 'mimari-projelendirme-uygulama'],
  },

  /* ------------------------------------------------------------------ 04 */
  {
    slug: 'banyo-dekorasyon',
    number: '04',
    nav: 'Banyo Dekorasyon',
    h1: 'Antalya Banyo Dekorasyon ve Yenileme',
    seoTitle: 'Antalya Banyo Dekorasyon ve Yenileme | M2 Dekorasyon',
    seoDescription:
      'Antalya banyo yenileme: büyük ebat seramik, askılı vanity, ışıklı ayna, duşakabin ve su geçirmez gergi tavan. Su yalıtımı dahil anahtar teslim uygulama.',
    keywords: [
      'antalya banyo dekorasyon',
      'banyo yenileme antalya',
      'antalya banyo tadilatı',
      'duşakabin antalya',
      'banyo dolabı antalya',
      'konyaaltı banyo yenileme',
    ],
    tagline: 'Su yalıtımından aydınlatmaya kadar doğru sırayla yenilenen banyolar',
    intro:
      'Banyo, evin en küçük ama en çok detay barındıran odasıdır. Yanlış eğim, eksik yalıtım veya yetersiz havalandırma birkaç yıl içinde kendini gösterir. M2 Dekorasyon olarak Antalya’da banyo yenilemeyi görünen malzemeden değil, altındaki yalıtımdan başlayarak kurguluyoruz.',
    heroImage: '/services-gallery/banyo/img-001.webp',
    gallery: [
      '/services-gallery/banyo/img-002.webp',
      '/services-gallery/banyo/img-003.webp',
    ],
    blocks: [
      {
        heading: 'Görünmeyen kısım: yalıtım ve eğim',
        body:
          'Banyo tadilatında en kritik aşama seramik altındaki su yalıtımıdır. Duş alanında sürme izolasyon, köşe ve gider çevresinde bantlı detay uygulamadan seramik döşemek, alt kata sızıntı riskini kalıcı hale getirir. Zemin eğimini gidere doğru doğru vermek ise suyun birikmesini önler. Bu iki adımı hiçbir projede atlamıyoruz.',
      },
      {
        heading: 'Küçük banyoyu büyük göstermenin yolları',
        body:
          'Antalya’daki pek çok dairede banyo metrekaresi sınırlıdır. Doğru kararlarla mekân olduğundan çok daha ferah algılanabilir.',
        bullets: [
          'Büyük ebat seramik — derz sayısını azaltır, yüzeyi kesintisiz gösterir.',
          'Askılı (duvardan) vanity ve klozet — zemini açık bırakır, temizliği kolaylaştırır.',
          'Cam duşakabin — küvet yerine şeffaf ayırıcı, görüş hattını kesmez.',
          'Işıklı ayna ve dolaylı aydınlatma — gölgesiz ışık, hem kullanışlı hem ferah.',
          'Lineer süzgeç — tek yöne eğim sayesinde büyük ebat seramiği duşta da kullanmayı sağlar.',
        ],
      },
      {
        heading: 'Banyoda tavan ve havalandırma',
        body:
          'Buhar ve nem, banyoda boyalı tavanı kısa sürede bozar. Su geçirmez saten gergi tavan hem küf yapmaz hem silinebilir; üst kattan gelebilecek kaçaklarda suyu tutar. Aspiratör kapasitesini banyonun hacmine göre seçiyor, menfezi tavan içinde gizliyoruz.',
      },
    ],
    features: [
      'Sürme su yalıtımı ve doğru zemin eğimi',
      'Büyük ebat seramik ve lineer süzgeç',
      'Askılı vanity, ışıklı ayna, cam duşakabin',
      'Su geçirmez gergi tavan ve gizli havalandırma',
    ],
    specs: [
      { label: 'Yalıtım', value: 'Sürme membran + köşe bant detayı' },
      { label: 'Seramik', value: 'Büyük ebat porselen, ince derz' },
      { label: 'Vitrifiye', value: 'Askılı klozet, gömme rezervuar' },
      { label: 'Tavan', value: 'Su geçirmez saten gergi tavan' },
    ],
    faq: [
      {
        q: 'Banyo tadilatı kaç gün sürer?',
        a: 'Standart bir daire banyosu, kırımdan teslime genellikle 10–15 iş günü sürer. Yalıtım ve şap kuruma süreleri kısaltılamaz; takvimi baştan net veriyoruz.',
      },
      {
        q: 'Kırmadan banyo yenilenebilir mi?',
        a: 'Zemin ve duvar sağlamsa seramik üstüne uygulama, vitrifiye ve dolap yenileme ile kırımsız çözüm mümkündür. Ancak su kaçağı şüphesi varsa yalıtımı yenilemek gerekir.',
      },
      {
        q: 'Küvet mi duşakabin mi?',
        a: 'Küçük banyolarda cam duşakabin mekânı görsel olarak büyütür ve kullanımı kolaylaştırır. Çocuklu aileler için küvet hâlâ pratik olabilir; kararı keşifte birlikte veriyoruz.',
      },
      {
        q: 'Banyoya gergi tavan yapılır mı?',
        a: 'Evet, banyo gergi tavan için en uygun mekânlardan biridir. Membran su geçirmez, küf yapmaz ve gömme spotları düzgün bir hizada toplar.',
      },
    ],
    relatedSlugs: ['mutfak-dekorasyon', 'gergi-tavan', 'mimari-projelendirme-uygulama'],
  },

  /* ------------------------------------------------------------------ 05 */
  {
    slug: 'mimari-projelendirme-uygulama',
    number: '05',
    nav: 'Mimari Projelendirme',
    h1: 'Antalya Mimari Projelendirme ve Uygulama',
    seoTitle: 'Antalya Mimari Projelendirme ve Uygulama | M2 Dekorasyon',
    seoDescription:
      'Antalya’da mimari projelendirme ve anahtar teslim uygulama: rölöve, 3D görselleştirme, uygulama projeleri ve şantiye yönetimi. Villa, konut ve ticari mekân.',
    keywords: [
      'antalya mimari projelendirme',
      'antalya iç mimarlık',
      'anahtar teslim tadilat antalya',
      'villa tadilat antalya',
      'antalya 3d iç mimari',
      'ticari mekan tasarımı antalya',
    ],
    tagline: 'Rölöveden şantiye teslimine tek muhatap',
    intro:
      'Bir tadilatın maliyetini ve süresini belirleyen şey, işe başlamadan önce ne kadarının çözüldüğüdür. M2 Dekorasyon olarak Antalya’da konut, villa ve ticari mekânlar için önce projeyi bitiriyor, sonra uyguluyoruz. Böylece şantiye sırasında sürpriz karar alınmıyor, bütçe kontrolden çıkmıyor.',
    heroImage: '/projeler/proje-1/01.jpg',
    gallery: [
      '/projeler/proje-1/02.jpg',
      '/projeler/proje-2/01.jpg',
    ],
    blocks: [
      {
        heading: 'Süreç nasıl işliyor?',
        body:
          'Her proje aynı disiplinle ilerler. Aşamaları baştan paylaşıyoruz; hangi kararın ne zaman verilmesi gerektiğini bilmek, işin en rahatlatıcı kısmıdır.',
        bullets: [
          'Rölöve — mekânın mevcut ölçüleri, kot farkları ve tesisat güzergâhları çıkarılır.',
          'Konsept — plan alternatifleri, malzeme paleti ve aydınlatma kurgusu belirlenir.',
          '3D görselleştirme — uygulamadan önce sonucu görürsünüz; değişiklikler bu aşamada ücretsizdir.',
          'Uygulama projesi — elektrik, mekanik, mobilya ve aydınlatma paftaları hazırlanır.',
          'Metraj ve bütçe — kalem kalem miktar ve maliyet tablosu çıkarılır.',
          'Şantiye yönetimi — imalat, sevkiyat ve ekip koordinasyonu tek elden yürütülür.',
        ],
      },
      {
        heading: 'Neden tek muhatap önemli?',
        body:
          'Ayrı ayrı çalışan usta ve tedarikçilerde sorumluluk dağılır; bir gecikme zincirleme diğerlerini bekletir ve aradaki koordinasyonu ev sahibi yapmak zorunda kalır. Projelendirme ve uygulamayı birlikte üstlendiğimizde takvim, bütçe ve işçilik kalitesi tek sorumlulukta toplanır. Aksaklık olduğunda arayacağınız tek numara vardır.',
      },
      {
        heading: 'Hangi mekânlarda çalışıyoruz?',
        body:
          'Daire ve villa renovasyonları, yazlık ve kiralık konut yenilemeleri, ofis ve mağaza tasarımları, kafe ve restoran uygulamaları. Antalya’nın turizm yoğun ilçelerinde sezon dışı takvimle çalışarak işletmelerin kapalı kalma süresini en aza indiriyoruz.',
      },
    ],
    features: [
      'Rölöve ve mevcut durum analizi',
      '3D görselleştirme ile onaylı tasarım',
      'Elektrik, mekanik ve mobilya uygulama paftaları',
      'Metraj, bütçe tablosu ve şantiye yönetimi',
    ],
    specs: [
      { label: 'Çizim', value: 'Uygulama paftaları, imalat detayları' },
      { label: 'Görselleştirme', value: 'Fotogerçekçi 3D görsel' },
      { label: 'Kapsam', value: 'Konut, villa, ofis, mağaza, kafe ve restoran' },
      { label: 'Yönetim', value: 'Takvim, metraj, hakediş ve ekip koordinasyonu' },
    ],
    faq: [
      {
        q: 'Sadece proje çizdirip uygulamayı başkasına yaptırabilir miyim?',
        a: 'Evet. Projelendirme tek başına alınabilen bir hizmettir. Uygulamayı da biz yaparsak proje bedelini toplam işten mahsup ediyoruz.',
      },
      {
        q: '3D görsel uygulamayla birebir aynı mı çıkıyor?',
        a: 'Malzeme ve ölçüler projeye sabitlendiği için sonuç görsele çok yakın olur. Doğal malzemelerde (mermer, ahşap) damar farkı olabileceğini baştan belirtiyoruz.',
      },
      {
        q: 'Bütçeyi nasıl kontrol altında tutuyorsunuz?',
        a: 'Uygulama öncesi kalem kalem metraj ve fiyat tablosu çıkarıyoruz. Proje sabitlendikten sonra iş kalemi eklenmedikçe bütçe değişmez.',
      },
      {
        q: 'Oturduğum evde tadilat yapılabilir mi?',
        a: 'Evet. İşi bölümlere ayırarak, tozlu imalatları ayrı günlerde toplayarak ve alanı izole ederek yaşarken tadilat yapılabilen bir takvim kuruyoruz.',
      },
    ],
    relatedSlugs: ['gergi-tavan', 'mutfak-dekorasyon', 'banyo-dekorasyon'],
  },
];

export const getService = (slug: string) => SERVICES.find((s) => s.slug === slug);

export const servicePath = (slug: string) => `/hizmetler/${slug}/`;
