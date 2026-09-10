import { Project, Service } from '../types';

export const SERVICES: Service[] = [
  {
    id: "gergi-tavan",
    number: "01",
    title: "GERGİ TAVAN",
    tagline: "Işığın mimariye dönüştüğü pürüzsüz tavan sistemleri",
    description: "Işıklı transparan, akustik micro-perfore, lake ayna ve form verilebilir 3D gergi tavan uygulamaları. Yüksek CRI LED entegrasyonu ile homojen ve gölgesiz aydınlatma.",
    fullDetails: "M2 Dekorasyon olarak Avrupa standartlarında A sınıfı yanmazlık ve hijyen sertifikalı polimer membranlar kullanıyoruz. Antalya'nın nemli iklimine tam dayanıklı, sarkma yapmayan özel gergi sistemlerimizle mekanlara sonsuzluk hissi ve kusursuz akustik konfor kazandırıyoruz.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85",
    features: ["Homojen Işık Dağılımı", "Akustik Yankı Yalıtımı", "B1 Yanmazlık Sınıfı", "10 Yıl Garanti"],
    specifications: ["Barrisol standardı membran", "2700K - 6500K CCT LED", "DALI / 0-10V Dimmer", "IP65 Islak Hacim Uyumluluğu"]
  },
  {
    id: "ic-mimarlik",
    number: "02",
    title: "İÇ MİMARLIK",
    tagline: "Karakter sahibi mekanlar için bütüncül mimari yaklaşım",
    description: "Lüks konutlar, Akdeniz villaları ve ticari mekanlar için konsept geliştirmeden anahtar teslim uygulamaya kadar eksiksiz iç mimari tasarım yönetimi.",
    fullDetails: "Mekanın fonksiyonel potansiyelini estetik mükemmeliyetle buluşturuyoruz. Kullanıcı alışkanlıklarını mimari dille yeniden kurguluyor; renk paletinden malzeme kartelasına, özel sabit mobilyalardan aydınlatma senaryolarına kadar her santimetreyi tek elde yönetiyoruz.",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=85",
    features: ["Kişiye Özel Konsept", "Fonksiyonel Alan Optimizasyonu", "Şantiye & Proje Yönetimi", "Bütçe ve Takvim Disiplini"],
    specifications: ["Konsept Paftaları", "Uygulama Detay Çizimleri", "Malzeme Numune Panoları", "Sürekli Süpervizörlük"]
  },
  {
    id: "mimari-projelendirme",
    number: "03",
    title: "MİMARİ PROJELENDİRME",
    tagline: "Teknik kesinlik ve mühendislik disiplini",
    description: "Rölöve alımından kaba ve ince yapı uygulama projelerine, elektrik ve mekanik tesisat koordinasyonuna kadar eksiksiz teknik çizim paketleri.",
    fullDetails: "Gözle görülmeyen altyapı, yüzeydeki güzelliğin teminatıdır. Mühendislik ve mimari ekiplerimiz tüm statik, mekanik ve aydınlatma hatlarını milimetrik hassasiyetle paftalayarak şantiye sürecindeki sıfır hata toleransımızı korur.",
    image: "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=1600&q=85",
    features: ["Hassas Lazer Rölöve", "Tesisat & Aydınlatma Planı", "Mobilya İmalat Detayları", "Metraj & Hakediş Çizelgeleri"],
    specifications: ["AutoCAD / BIM Entegrasyonu", "1/20 & 1/5 İmalat Paftaları", "Aydınlatma Lümen Hesapları", "Akustik Simülasyon"]
  },
  {
    id: "asma-tavan",
    number: "04",
    title: "ASMA TAVAN",
    tagline: "Modern tavan geometrileri ve gizli ışık kanalları",
    description: "Alçıpan ışık havuzları, akustik baffle sistemler, lineer manyetik ray spot entegrasyonu ve kademeli mimari tavan çözümleri.",
    fullDetails: "Tavan, bir mekanın beşinci cephesidir. Klima menfezlerini, ses sistemlerini ve yangın tesisatını kusursuz bir mimari dille gizlerken, tavan yüksekliğini optik olarak artıran çok katmanlı profiller tasarlıyoruz.",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85",
    features: ["Gizli Işık Havuzları", "Gömme Manyetik Ray Spot", "Gizli Menfez Detayları", "Sıfır Çatlama Garantisi"],
    specifications: ["Knauf / Rigips Sistemleri", "Alüminyum Z Profilleri", "Akustik Taşyünü Yalıtımı", "Sıva Üstü İpek Boya"]
  },
  {
    id: "tv-unitesi",
    number: "05",
    title: "TV ÜNİTESİ & ÖZEL İMALAT",
    tagline: "Doğal taş, ahşap ve ateşin buluştuğu mimari odak noktası",
    description: "Büyük ebat porselen ve mermer plakalar, çıtalı ahşap lambri, entegre biyoetanol/su buharlı şömineler ve gizli kablo kanallı medya duvarları.",
    fullDetails: "Salonların görsel ağırlık merkezini oluşturan TV ünitelerini sıradan bir mobilya değil, heykelsi bir mimari eleman olarak üretiyoruz. Kitap eşlemeli (bookmatch) doğal taşlar, fırınlanmış meşe ve ceviz kaplamalar ile lüks bir doku katıyoruz.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85",
    features: ["Bookmatch Doğal Taş", "Özel CNC Ahşap Çıtalar", "Entegre Şömine Haznesi", "Gizli Akustik Kumaş Paneller"],
    specifications: ["Laminam / Neolith Porselen", "Doğal Masif Kaplama", "Blum Donanım Sistemleri", "RGB/CCT Arka Aydınlatma"]
  },
  {
    id: "mutfak-banyo",
    number: "06",
    title: "MUTFAK & BANYO",
    tagline: "Ergonomi ve yalın estetiğin Akdeniz yorumu",
    description: "Kulpuz minimalist ada mutfaklar, çizilmez porselen tezgahlar, sıva altı İtalyan armatürler ve heykelsi serbest küvetler.",
    fullDetails: "Su ve ateşin mekanlarında dayanıklılık lüksle yarışır. Antalya'nın lüks villaları için tasarladığımız ıslak hacimler, nemden etkilenmeyen marin gövdeler, anti-bakteriyel seramikler ve gizli depolama çözümleri ile donatılır.",
    image: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1600&q=85",
    features: ["Porselen Masif Ada", "Gömme İtalyan Bataryalar", "Özel Lineer Süzgeçler", "Gizli Kiler Sistemleri"],
    specifications: ["Anti-parmak izi Lake", "Kuvars / Porselen Yüzey", "Gessi / Hansgrohe Uyumlu", "Tavandan Su Çıkışı"]
  },
  {
    id: "duvar-panel",
    number: "07",
    title: "DUVAR & PANEL UYGULAMALARI",
    tagline: "Mekana derinlik ve akustik zenginlik katan yüzeyler",
    description: "İtalyan dekoratif sıva (stucco), mikrosimento, akustik ahşap çıta paneller, fırçalanmış bronz metal geçişler ve mimari duvar kağıtları.",
    fullDetails: "Düz ve cansız duvarları dokunsal birer sanat eserine çeviriyoruz. Sanmarino mermer tozu bazlı İtalyan sıvalarımız nefes alır, küflenmez ve ışığın açısına göre gün boyu farklı yansımalar üretir.",
    image: "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1600&q=85",
    features: ["İtalyan Venedik Sıvası", "Doğal Mikrocement", "Akustik Keçe Tabanlı Çıta", "PVD Kaplama Pirinç Çıtalar"],
    specifications: ["Mineral Esaslı Yüzeyler", "Yüksek Darbe Mukavemeti", "Su İtici Wax Koruması", "FSC Sertifikalı Ahşap"]
  },
  {
    id: "3d-tasarim",
    number: "08",
    title: "3D TASARIM & GÖRSELLEŞTİRME",
    tagline: "Uygulamadan önce yaşayabileceğiniz fotogerçekçi deneyim",
    description: "Işık kırılımlarını ve malzeme dokularını birebir yansıtan sinematik 3D renderlar, animasyonlar ve sanal gerçeklik (VR) turları.",
    fullDetails: "Müşterilerimizin sürprizlerle karşılaşmaması için en ufak priz yerleşiminden Akdeniz güneşinin öğle saatindeki yansımasına kadar her detayı fotogerçekçi motorlarda simüle ediyoruz.",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85",
    features: ["Fotogerçekçi Render", "360 Derece Sanal Gezinti", "Gündüz / Gece Işık Simülasyonu", "Malzeme Değişim Opsiyonları"],
    specifications: ["Corona / Chaos V-Ray Render", "8K Ultra-HD Çıktı", "Doğru Güneş & Coğrafi Konum", "Fiziksel Kamera Ayarları"]
  }
];

export const PROJECTS: Project[] = [
  {
    id: "lara-coastal-villa",
    title: "LARA HORIZON VILLA",
    subtitle: "Akdeniz Manzaralı Minimalist Villa Renovasyonu",
    category: "VİLLA",
    location: "Lara, Antalya",
    year: "2024",
    area: "620 m²",
    coverImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1800&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=1600&q=85"
    ],
    description: "Antalya falezler üzerinde konumlanan villanın tüm iç hacmi yeniden kurgulandı. Tavanda kullanılan 110 m² kesintisiz ışıklı gergi tavan, gün batımı ışığını mekana homojen olarak yayarken, özel traverten TV duvarı ve gömme şömine oditoryum hissi yaratıyor.",
    highlights: [
      "110 m² DALI kontrollü ipeksi mat gergi tavan",
      "Doğal traverten ve füme meşe kaplama TV duvarı",
      "Gizli iklimlendirme ve manyetik ray aydınlatma",
      "Akıllı ev entegrasyonu ve senaryolu aydınlatma"
    ],
    specs: [
      { label: "Mekan", value: "Özel Müstakil Villa" },
      { label: "Uygulama Süresi", value: "4.5 Ay" },
      { label: "Tavan Tipi", value: "Işıklı Transparan Gergi Tavan" },
      { label: "Zemin", value: "İtalyan Doğal Traverten" }
    ]
  },
  {
    id: "konyaalti-penthouse",
    title: "KONYAALTI BLUE SKY PENTHOUSE",
    subtitle: "Panoramik Deniz Manzaralı Dubleks Rezidans",
    category: "KONUT",
    location: "Konyaaltı, Antalya",
    year: "2024",
    area: "380 m²",
    coverImage: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1800&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=85"
    ],
    description: "Geniş terası Akdeniz'e açılan penthouse'da yüksek tavanlı salon alanına özel akustik mikro-delikli gergi tavan uygulandı. Yankı sorunu tamamen çözülürken, salon ile açık mutfak arasındaki geçişte lake lake ayna efektli tavanla derinlik artırıldı.",
    highlights: [
      "Akustik micro-perforated tavan ile sıfır eko",
      "Minimalist monolitik ada mutfak",
      "Master yatak odasında yıldızlı gökyüzü fiber optik gergi tavan",
      "Özel üretim ceviz giyinme odası"
    ],
    specs: [
      { label: "Mekan", value: "Dubleks Penthouse" },
      { label: "Uygulama Süresi", value: "3 Ay" },
      { label: "Tavan Tipi", value: "Akustik + Fiber Optik Gergi" },
      { label: "Aydınlatma", value: "2700K Warm LED" }
    ]
  },
  {
    id: "belek-golf-residence",
    title: "BELEK SANCTUARY VILLA",
    subtitle: "Doğa ile Bütünleşen Akdeniz Konsepti",
    category: "VİLLA",
    location: "Belek, Antalya",
    year: "2023",
    area: "750 m²",
    coverImage: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1800&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85"
    ],
    description: "Çam ormanları arasındaki bu özel villada ham ahşap, doğal taş ve organik formlu gergi tavan tasarımları kullanıldı. Havuz başı kapalı spa alanında neme dayanıklı IP65 akustik tavan sistemi yerleştirildi.",
    highlights: [
      "Organik kavisli 3D gergi tavan formları",
      "Kapalı SPA ve havuz içi buhar geçirmez tavan",
      "İtalyan ham dokulu mikrocement duvarlar",
      "Özel tasarım şarap mahzeni ve lounge"
    ],
    specs: [
      { label: "Mekan", value: "Özel Golf Villası" },
      { label: "Uygulama Süresi", value: "5 Ay" },
      { label: "Özellik", value: "3D Organik Gergi Tavan" },
      { label: "Yalıtım", value: "Yüksek Nem & Akustik Koruma" }
    ]
  },
  {
    id: "terracity-executive-hq",
    title: "TERRA EXECUTIVE HQ",
    subtitle: "Yüksek Prestijli Yönetim Ofisi",
    category: "OFİS",
    location: "Muratpaşa, Antalya",
    year: "2024",
    area: "420 m²",
    coverImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1800&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1600&q=85"
    ],
    description: "Uluslararası bir yatırım şirketinin genel merkezi için tasarlanan ofiste toplantı odaları ve yönetici suitleri kesintisiz akustik gergi tavan panelleri ile donatıldı. Video konferanslarda mükemmel ses netliği ve gölgesiz aydınlatma sağlandı.",
    highlights: [
      "Göz yormayan UGR<19 mikro prizmatik gergi aydınlatma",
      "Akustik cam bölme duvarlar ve gizli sürgülü kapılar",
      "Doğal mermer karşılama deski ve özel pirinç logolar"
    ],
    specs: [
      { label: "Mekan", value: "Yönetim Ofisi" },
      { label: "Uygulama Süresi", value: "2 Ay" },
      { label: "Akustik Değer", value: "NRC 0.85 Sertifikalı" }
    ]
  },
  {
    id: "kaleici-boutique-lounge",
    title: "KALEİÇİ HERITAGE LOUNGE",
    subtitle: "Tarihi Doku ile Çağdaş Lüksün Buluşması",
    category: "TİCARİ MEKAN",
    location: "Kaleiçi, Antalya",
    year: "2023",
    area: "310 m²",
    coverImage: "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1800&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=85"
    ],
    description: "Tarihi taş duvarlara dokunmadan, serbest duran çelik karkas üzerinde asılı lake gergi tavan ve dinamik aydınlatma senaryosu. Gündüz ferah bir sanat galerisi, gece ise sıcak bir kokteyl lounge'a dönüşen mekan.",
    highlights: [
      "Tarihi taş duvara sıfır müdahale ile asılı tavan",
      "RGBW DMX kontrollü gün ışığı geçiş senaryoları",
      "Özel pirinç ve masif ceviz bar tezgahı"
    ],
    specs: [
      { label: "Mekan", value: "Lounge & Gastronomi" },
      { label: "Tescil", value: "Koruma Kurulu Onaylı Uygulama" }
    ]
  },
  {
    id: "kemer-panoramic-estate",
    title: "KEMER CLIFFSIDE RETREAT",
    subtitle: "Toros Dağları ve Deniz Arasında Bir Başyapıt",
    category: "VİLLA",
    location: "Kemer, Antalya",
    year: "2024",
    area: "890 m²",
    coverImage: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1800&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85"
    ],
    description: "Kayalıkların üzerine kurulu malikanenin her odasında farklı bir tavan mimarisi kurgulandı. Sinema odasında yıldız simülasyonlu gergi tavan, ana salonda ise 6 metrelik galeri boşluğunu aydınlatan heykelsi ışıklı tavan yer alıyor.",
    highlights: [
      "6 metre tavan yüksekliğinde monolitik ışık heykeli",
      "Dolby Atmos sertifikalı sinema odası tavanı",
      "Akdeniz mermerleri ve sıcak ceviz paneller"
    ],
    specs: [
      { label: "Mekan", value: "Özel Malikane" },
      { label: "Uygulama Süresi", value: "6 Ay" }
    ]
  }
];

export const STRETCH_CEILING_TYPES = [
  {
    id: "translucent",
    name: "Işıklı Transparan (Barrisol Tipi)",
    tag: "En Çok Tercih Edilen",
    desc: "Arkasındaki homojen LED sistemi ile tüm tavanı bir ışık kaynağına dönüştürür. Gölgesiz, doğal gün ışığı etkisi sağlar.",
    lightPass: "%78 Işık Geçirgenliği",
    finish: "Mat / Saten Pürüzsüz",
    kelvinRange: "2700K - 6500K Ayarlanabilir",
    warranty: "10 Yıl Renk ve Sarkma Garantisi",
    idealFor: "Salonlar, villalar, banyolar, ofisler ve galeri boşlukları."
  },
  {
    id: "acoustic",
    name: "Akustik Mikro-Perfore Membran",
    tag: "Akustik Konfor",
    desc: "Metrekaresinde 500.000 mikro delik barındırır. Çınlama ve yankıyı sıfırlarken ses dalgalarını yutarak kusursuz bir sessizlik sağlar.",
    lightPass: "%65 Işık Geçirgenliği",
    finish: "Akustik Doku",
    kelvinRange: "3000K Warm White",
    warranty: "10 Yıl Akustik Performans Garantisi",
    idealFor: "Ev sinemaları, yüksek tavanlı geniş salonlar, toplantı odaları."
  },
  {
    id: "lacquer",
    name: "Lake Parlak (Ayna Efektli)",
    tag: "Mekansal Derinlik",
    desc: "Yüksek yansıtma kabiliyeti sayesinde tavan yüksekliğini optik olarak iki katına çıkarır. Mekanı olduğundan çok daha ferah gösterir.",
    lightPass: "Yansıtıcı Yüzey",
    finish: "Ultra Yüksek Parlaklık (%90 Ayna)",
    kelvinRange: "Periferik Gizli LED",
    warranty: "10 Yıl Ayna Parlaklığı Garantisi",
    idealFor: "Alçak tavanlı alanlar, koridorlar, havuz tavanları ve ticari mekanlar."
  },
  {
    id: "3d-form",
    name: "3D Form & Kavisli Mimari Tavan",
    tag: "Heykelsi Tasarım",
    desc: "Özel alüminyum karkas bükümleri ile kubbe, dalga, tonoz veya organik heykelsi tavan formları yaratır.",
    lightPass: "Çift Katmanlı Difüzyon",
    finish: "Özel CNC Kavis",
    kelvinRange: "DMX RGBW Dinamik",
    warranty: "10 Yıl Karkas & Membran",
    idealFor: "Lobi, otel, lüks villa girişleri ve mimari odak alanları."
  },
  {
    id: "printed",
    name: "Yüksek Çözünürlüklü Baskılı Tavan",
    tag: "Kişiselleştirilmiş",
    desc: "UV dayanımlı kokusuz su bazlı pigmentlerle gökyüzü, rönesans freskleri veya soyut mimari dokuların tavana yansıtılması.",
    lightPass: "Arkadan Işıklı UV Baskı",
    finish: "Ultra-HD 2400 DPI",
    kelvinRange: "5000K Doğal Beyaz",
    warranty: "10 Yıl UV Solmama Garantisi",
    idealFor: "SPA merkezleri, çocuk odaları, butik oteller ve özel salonlar."
  }
];
