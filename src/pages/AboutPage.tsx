import React from 'react';
import {
  ShieldCheck, Award, Clock, Users, CheckCircle2, ChevronRight,
  Phone, MessageCircle, Sparkles, Palette, Layers, Compass, ArrowUpRight
} from 'lucide-react';
import { SITE, waLink } from '../data/services';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { FloatingWhatsApp } from '../components/FloatingWhatsApp';

const COLOR_PALETTE = [
  {
    name: 'Traverten Beyazı',
    hex: '#F8F6F0',
    border: 'border-[#141517]/15',
    textDark: true,
    role: 'Zemin & Işık Dengesi',
    description: 'Akdeniz mimarisinin doğal taş dokusundan ilham alan, mekana aydınlık, ferah ve dingin bir zemin kazandıran ana tonumuz.',
  },
  {
    name: 'Derin Grafit',
    hex: '#141517',
    border: 'border-[#141517]',
    textDark: false,
    role: 'Mimari Kontrast & Sınırlar',
    description: 'Modern mekanlarda keskin sınırları, tipografik zarafeti ve asil duruşu vurgulayan zamansız kontrast rengimiz.',
  },
  {
    name: 'Mimari Kehribar',
    hex: '#E29415',
    border: 'border-[#E29415]',
    textDark: false,
    role: 'İmzalı Vurgu & Ustalık Işığı',
    description: 'Antalya güneşinin sıcaklığını, atölye zanaatkarlığının enerjisini ve lüks detayları mekana taşıyan imza rengimiz.',
  },
  {
    name: 'Sıcak Keten & Taş',
    hex: '#EFECE4',
    border: 'border-[#141517]/10',
    textDark: true,
    role: 'Doğal Geçiş & Doku Sıcaklığı',
    description: 'Ham ahşap, dokulu duvar kağıtları ve doğal seramiklerle uyumlu, mekanlar arası yumuşak akışı sağlayan ara ton.',
  },
];

const STATS = [
  { value: '15+', label: 'Yıllık Saha Deneyimi', sub: 'Antalya ve sahil hattında kesintisiz hizmet' },
  { value: '1.200+', label: 'Tamamlanan Proje', sub: 'Konut, villa, otel ve ticari dönüşüm' },
  { value: '1 Günde', label: 'Temiz Montaj Standardı', sub: 'Tozsuz, molozsuz ve hızlı teslimat' },
  { value: '10 Yıl', label: 'Resmi Firma Garantisi', sub: 'Sarkmazlık, sızdırmazlık ve solmazlık' },
];

const PRINCIPLES = [
  {
    icon: ShieldCheck,
    title: 'Şeffaf & Sabit Bütçe',
    desc: 'Keşif sonrası onaylanan keşif listesi neyse fatura odur. Şantiye ortasında beklenmedik sürpriz maliyetler kesinlikle çıkarılmaz.',
  },
  {
    icon: Clock,
    title: 'Söz Verilen Günde Teslim',
    desc: 'Zamanınızın değerini biliyoruz. Başlangıçta taahhüt ettiğimiz iş takvimine gün gün sadık kalır, gecikmelere izin vermeyiz.',
  },
  {
    icon: Users,
    title: 'Aracısız, Kendi Kadromuz',
    desc: 'Taşeron veya komisyoncu zinciriyle çalışmıyoruz. Keşfe gelen, ölçüyü alan ve montajı yapan ekibimiz kendi kadrolu ustalarımızdır.',
  },
  {
    icon: Award,
    title: 'Belgeli & Sertifikalı Malzeme',
    desc: 'B1 alev almaz Avrupa tavan membranları, silinebilir ağır vinil kağıtlar ve Blum/Hafele mekanizmalar standarttır.',
  },
];

export const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F8F6F0] text-[#141517]">
      <Navbar currentLang="TR" onToggleLang={() => {}} />

      <main>
        {/* ---------------------------------------------------------- Hero */}
        <header className="relative pt-32 pb-20 md:pt-44 md:pb-28 px-6 md:px-12 bg-[#141517] overflow-hidden text-white">
          <div className="absolute inset-0 opacity-20">
            <img
              src="/projeler/proje-1/01.jpg"
              alt="M2 Dekorasyon Atölye ve Mimari Proje"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#141517] via-[#141517]/80 to-transparent" />

          <div className="relative max-w-7xl mx-auto">
            {/* Breadcrumb */}
            <nav aria-label="breadcrumb" className="mb-6">
              <ol className="flex items-center gap-2 text-[10px] md:text-[11px] font-mono tracking-[0.2em] uppercase text-white/60">
                <li><a href="/" className="hover:text-white transition-colors">Anasayfa</a></li>
                <li aria-hidden="true"><ChevronRight className="w-3 h-3" /></li>
                <li className="text-[#E29415]" aria-current="page">Hakkımızda</li>
              </ol>
            </nav>

            <span className="inline-flex items-center gap-2 font-mono text-[10px] text-[#E29415] tracking-[0.3em] uppercase mb-4 font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              M2 DEKORASYON // ANTALYA
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight uppercase leading-[0.98] max-w-4xl">
              Mekanlara Kimlik, Yaşamlara Konfor Katıyoruz.
            </h1>
            <p className="mt-6 text-base sm:text-lg md:text-xl text-white/80 font-light max-w-2xl leading-relaxed">
              Antalya Muratpaşa'da kurulan M2 Dekorasyon; gergi tavan sistemleri, ithal duvar kağıdı,
              mutfak & banyo yenileme ve komple iç mimarlık projelendirmede ustalığı estetikle buluşturuyor.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href={waLink('Merhaba M2 Dekorasyon, firmanız ve projeleriniz hakkında bilgi almak istiyorum.')}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#E29415] hover:bg-[#F5A623] text-black font-bold uppercase tracking-widest text-xs transition-all shadow-md active:scale-95"
              >
                <MessageCircle className="w-4 h-4" />
                <span>BİZE ULAŞIN</span>
              </a>
              <a
                href={`tel:${SITE.phone}`}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full border border-white/30 text-white hover:border-[#E29415] hover:text-[#E29415] font-mono text-xs tracking-widest uppercase transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#E29415]" />
                <span>{SITE.phoneDisplay}</span>
              </a>
            </div>
          </div>
        </header>

        {/* ---------------------------------------------------------- Stats Bar */}
        <section className="px-6 md:px-12 border-b border-[#141517]/10 bg-white">
          <div className="max-w-7xl mx-auto py-10 grid grid-cols-2 lg:grid-cols-4 gap-8">
            {STATS.map((s) => (
              <div key={s.label} className="border-l-2 border-[#E29415] pl-4">
                <span className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#141517] tracking-tight block">
                  {s.value}
                </span>
                <span className="font-mono text-xs text-[#141517] font-semibold uppercase tracking-wider block mt-1">
                  {s.label}
                </span>
                <span className="text-xs text-[#141517]/60 font-light block mt-0.5">
                  {s.sub}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ---------------------------------------------------------- Story */}
        <section className="px-6 md:px-12 py-16 md:py-24 border-b border-[#141517]/10 bg-[#F8F6F0]">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="font-mono text-[10px] text-[#E29415] tracking-[0.3em] uppercase block font-semibold">
                BİZ KİMİZ? // KURULUŞ HİKAYEMİZ
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#141517] uppercase leading-tight">
                Her Metrekaresinde Ustalık ve Zarafet Olan Mekanlar
              </h2>
              <div className="space-y-4 text-sm sm:text-base text-[#141517]/75 font-light leading-relaxed">
                <p>
                  M2 Dekorasyon (Metrekare Dekorasyon), Antalya Muratpaşa Dutlubahçe Mahallesi'nde kuruldu.
                  Yola çıkarken tek bir amacımız vardı: İnsanların ev yenilerken veya iş yeri açarken yaşadığı
                  usta bulamama, uzayan tadilat takvimleri ve kalitesiz malzeme stresini tamamen ortadan kaldırmak.
                </p>
                <p>
                  Yıllar içinde gergi tavan membran teknolojisindeki uzmanlığımızı, ithal silinebilir duvar kağıtları,
                  ergonomik mutfak-banyo çözümleri ve anahtar teslim 3D mimari projelendirme ile birleştirdik.
                  Bugün Konyaaltı villalarından Lara rezidanslarına, Döşemealtı konutlarından sahil otellerine kadar
                  1.200'ün üzerinde bağımsız projede M2 Dekorasyon imzası bulunmaktadır.
                </p>
                <p className="font-medium text-[#141517]">
                  Biz aracı bir komisyoncu değiliz; kendi atölyesinde üretim yapan, keşfe bizzat gelen ve
                  yaptığı işin 10 yıl boyunca arkasında duran gerçek bir zanaatkar ekibiyiz.
                </p>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="aspect-[4/5] rounded-sm overflow-hidden border border-[#141517]/10 shadow-md">
                    <img
                      src="/services-gallery/gergi-tavan/img-001.webp"
                      alt="Gergi Tavan Uygulaması"
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-5 bg-white border border-[#141517]/10 rounded-sm">
                    <span className="font-mono text-[10px] text-[#E29415] tracking-widest uppercase font-semibold block mb-1">
                      ÖZEL İMALAT
                    </span>
                    <p className="text-xs text-[#141517]/80 font-medium">
                      CNC tezgahlarında fitil kaynağı ve tozsuz montaj profilleri.
                    </p>
                  </div>
                </div>

                <div className="space-y-4 pt-6">
                  <div className="p-5 bg-[#141517] text-white border border-black rounded-sm">
                    <span className="font-mono text-[10px] text-[#E29415] tracking-widest uppercase font-semibold block mb-1">
                      ANTALYA GENELİ
                    </span>
                    <p className="text-xs text-white/80 font-light">
                      Muratpaşa, Konyaaltı, Kepez, Lara ve tüm sahil ilçelerine yerinde keşif.
                    </p>
                  </div>
                  <div className="aspect-[4/5] rounded-sm overflow-hidden border border-[#141517]/10 shadow-md">
                    <img
                      src="/services-gallery/mutfak/img-001.webp"
                      alt="Mutfak Yenileme Projesi"
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------- Renk Paletimiz & Tasarım Dili */}
        <section className="px-6 md:px-12 py-16 md:py-24 border-b border-[#141517]/10 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-3xl mb-12">
              <span className="font-mono text-[10px] text-[#E29415] tracking-[0.3em] uppercase block mb-3 font-semibold flex items-center gap-2">
                <Palette className="w-4 h-4 text-[#E29415]" />
                KURUMSAL KİMLİK & MİMARİ FELSEFE
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#141517] uppercase">
                Tasarım Dilimiz ve Renk Paletimiz
              </h2>
              <p className="mt-3 text-sm md:text-base text-[#141517]/70 font-light leading-relaxed">
                M2 Dekorasyon olarak mekanlarımızda ve kurumsal kimliğimizde; gözü yormayan,
                Akdeniz'in doğal ışığıyla nefes alan ve zamansız bir estetik sunan
                <strong> "Travertine & Amber"</strong> renk paletini uyguluyoruz.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {COLOR_PALETTE.map((c) => (
                <div
                  key={c.name}
                  className="bg-[#F8F6F0] border border-[#141517]/10 rounded-sm p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow"
                >
                  <div>
                    {/* Swatch */}
                    <div
                      className={`w-full h-24 rounded-sm border ${c.border} shadow-inner flex items-end justify-between p-3 mb-5`}
                      style={{ backgroundColor: c.hex }}
                    >
                      <span className={`font-mono text-xs font-bold tracking-wider ${c.textDark ? 'text-[#141517]' : 'text-white'}`}>
                        {c.hex}
                      </span>
                    </div>

                    <span className="font-mono text-[10px] text-[#E29415] uppercase tracking-widest font-semibold block mb-1">
                      {c.role}
                    </span>
                    <h3 className="text-lg font-bold text-[#141517] tracking-tight mb-2">
                      {c.name}
                    </h3>
                    <p className="text-xs text-[#141517]/70 font-light leading-relaxed">
                      {c.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------- Misyon & Vizyon */}
        <section className="px-6 md:px-12 py-16 md:py-24 border-b border-[#141517]/10 bg-[#F8F6F0]">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              {/* Misyon */}
              <div className="p-8 md:p-10 bg-white border border-[#141517]/10 rounded-sm shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#E29415]/5 rounded-bl-full pointer-events-none" />
                <span className="font-mono text-[10px] text-[#E29415] tracking-[0.3em] uppercase block mb-3 font-semibold flex items-center gap-2">
                  <Compass className="w-4 h-4 text-[#E29415]" />
                  MİSYONUMUZ
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#141517] mb-4">
                  Güvenilir, Hızlı ve Kusursuz Mekan Teslimi
                </h3>
                <p className="text-sm sm:text-base text-[#141517]/75 font-light leading-relaxed">
                  Müşterilerimize sürpriz maliyetler, uzayan şantiyeler ve kalitesiz malzeme hayal kırıklığı
                  yaşatmadan; söz verilen günde, milimetrik hassasiyetle ve 10 yıl resmi olarak arkasında
                  durabileceğimiz yüksek standartlı iç mekanlar teslim etmek.
                </p>
              </div>

              {/* Vizyon */}
              <div className="p-8 md:p-10 bg-[#141517] text-white border border-black rounded-sm shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#E29415]/10 rounded-bl-full pointer-events-none" />
                <span className="font-mono text-[10px] text-[#E29415] tracking-[0.3em] uppercase block mb-3 font-semibold flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#E29415]" />
                  VİZYONUMUZ
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-4">
                  Akdeniz'in Öncü İç Mekan Atölyesi
                </h3>
                <p className="text-sm sm:text-base text-white/80 font-light leading-relaxed">
                  Antalya ve tüm Akdeniz bölgesinde; iç mimari tadilat, gergi tavan sistemleri ve duvar kaplaması
                  denildiğinde dürüstlüğü, temiz işçiliği, teknolojik altyapısı ve estetik kalitesiyle akla gelen
                  bir numaralı referans marka olmak.
                </p>
              </div>
            </div>

            {/* Principles */}
            <div className="mt-16 pt-12 border-t border-[#141517]/10">
              <span className="font-mono text-[10px] text-[#E29415] tracking-[0.3em] uppercase block mb-8 font-semibold text-center">
                M2 DEKORASYON ÇALIŞMA İLKELERİ
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {PRINCIPLES.map((p) => {
                  const Icon = p.icon;
                  return (
                    <div key={p.title} className="p-6 bg-white border border-[#141517]/8 rounded-sm shadow-xs">
                      <div className="w-10 h-10 rounded-full bg-[#E29415]/10 text-[#E29415] flex items-center justify-center mb-4">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h4 className="text-base font-bold text-[#141517] mb-2">{p.title}</h4>
                      <p className="text-xs text-[#141517]/70 font-light leading-relaxed">{p.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------- Bottom CTA */}
        <section className="px-6 md:px-12 py-16 md:py-24 bg-[#EFECE4] border-t border-[#141517]/10">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div>
              <span className="font-mono text-[10px] text-[#E29415] tracking-[0.3em] uppercase block mb-2 font-semibold">
                TANIŞALIM & PLANLAYALIM
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#141517]">
                Mekanınızı Birlikte Dönüştürelim
              </h2>
              <p className="mt-2 text-sm text-[#141517]/70 font-light max-w-xl">
                Dutlubahçe, Muratpaşa'daki merkez ofisimize kahveye gelebilir veya evinize ücretsiz keşif randevusu isteyebilirsiniz.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <a
                href={waLink('Merhaba M2 Dekorasyon, projem için ücretsiz keşif randevusu almak istiyorum.')}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#E29415] hover:bg-[#F5A623] text-black font-bold uppercase tracking-widest text-xs transition-all shadow-md active:scale-95"
              >
                <MessageCircle className="w-4 h-4" />
                <span>ÜCRETSİZ KEŞİF TALEP ET</span>
              </a>
              <a
                href="/iletisim/"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-[#141517]/20 bg-white text-[#141517] hover:border-[#E29415] hover:text-[#E29415] font-mono text-xs tracking-widest uppercase transition-colors"
              >
                <span>İLETİŞİM BİLGİLERİ</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </section>
      </main>

      <FloatingWhatsApp message="Merhaba M2 Dekorasyon, hakkınızda bilgi almak istiyorum." />
      <Footer />
    </div>
  );
};

export default AboutPage;
