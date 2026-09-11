import React, { useState } from 'react';
import {
  MapPin, Phone, Mail, Clock, MessageCircle, Instagram, Facebook,
  ChevronRight, Send, CheckCircle2, ArrowUpRight, Sparkles, Navigation
} from 'lucide-react';
import { SITE, SERVICE_AREAS, waLink } from '../data/services';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { FloatingWhatsApp } from '../components/FloatingWhatsApp';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [district, setDistrict] = useState('Muratpaşa');
  const [service, setService] = useState('Gergi Tavan');
  const [note, setNote] = useState('');

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Merhaba M2 Dekorasyon, web sitenizden ulaşıyorum.\n\nİsim: ${name || 'Belirtilmedi'}\nİlçe: ${district}\nHizmet: ${service}\nNot: ${note || 'Ücretsiz keşif ve fiyat teklifi almak istiyorum.'}`;
    window.open(waLink(text), '_blank');
  };

  return (
    <div className="min-h-screen bg-[#F8F6F0] text-[#141517]">
      <Navbar currentLang="TR" onToggleLang={() => {}} />

      <main>
        {/* ---------------------------------------------------------- Hero */}
        <header className="relative pt-32 pb-16 md:pt-44 md:pb-24 px-6 md:px-12 bg-[#141517] overflow-hidden text-white">
          <div className="absolute inset-0 opacity-15">
            <img
              src="/projeler/proje-2/01.jpg"
              alt="M2 Dekorasyon İletişim"
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
                <li className="text-[#E29415]" aria-current="page">İletişim</li>
              </ol>
            </nav>

            <span className="inline-flex items-center gap-2 font-mono text-[10px] text-[#E29415] tracking-[0.3em] uppercase mb-4 font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              M2 DEKORASYON // İLETİŞİM & ADRESİMİZ
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight uppercase leading-[0.98] max-w-4xl">
              Bizimle İletişime Geçin
            </h1>
            <p className="mt-6 text-base sm:text-lg md:text-xl text-white/80 font-light max-w-2xl leading-relaxed">
              Adresimizi ziyaret edebilir, telefonla detaylı bilgi alabilir veya adresinize yerinde ücretsiz keşif randevusu isteyebilirsiniz.
            </p>
          </div>
        </header>

        {/* ---------------------------------------------------------- Contact Info Cards */}
        <section className="px-6 md:px-12 -mt-8 relative z-20">
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {/* Card 1: Address */}
            <div className="bg-white p-6 rounded-sm border border-[#141517]/10 shadow-lg flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-full bg-[#E29415]/10 text-[#E29415] flex items-center justify-center mb-4">
                  <MapPin className="w-5 h-5" />
                </div>
                <span className="font-mono text-[10px] text-[#E29415] tracking-widest uppercase font-semibold block mb-1">
                  ADRESİMİZ
                </span>
                <h3 className="text-base font-bold text-[#141517] mb-2">Adresimiz</h3>
                <p className="text-xs text-[#141517]/70 font-light leading-relaxed">
                  {SITE.street}<br />
                  {SITE.postalCode} {SITE.district} / {SITE.city}
                </p>
              </div>
              <a
                href={SITE.maps}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[#E29415] hover:text-[#141517] transition-colors"
              >
                <span>HARİTADA AÇ</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Card 2: Phone */}
            <div className="bg-white p-6 rounded-sm border border-[#141517]/10 shadow-lg flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-full bg-[#E29415]/10 text-[#E29415] flex items-center justify-center mb-4">
                  <Phone className="w-5 h-5" />
                </div>
                <span className="font-mono text-[10px] text-[#E29415] tracking-widest uppercase font-semibold block mb-1">
                  MÜŞTERİ HATTI
                </span>
                <h3 className="text-base font-bold text-[#141517] mb-2">Telefon</h3>
                <p className="text-xs text-[#141517]/70 font-light leading-relaxed mb-1">
                  Sabit: <a href={`tel:${SITE.phone}`} className="font-medium text-[#141517] hover:text-[#E29415]">{SITE.phoneDisplay}</a>
                </p>
                <p className="text-xs text-[#141517]/70 font-light leading-relaxed">
                  GSM: <a href={`tel:+${SITE.whatsapp}`} className="font-medium text-[#141517] hover:text-[#E29415]">{SITE.whatsappDisplay}</a>
                </p>
              </div>
              <a
                href={`tel:${SITE.phone}`}
                className="mt-5 inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[#E29415] hover:text-[#141517] transition-colors"
              >
                <span>ŞİMDİ ARAYIN</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Card 3: WhatsApp */}
            <div className="bg-white p-6 rounded-sm border border-[#141517]/10 shadow-lg flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-full bg-[#25D366]/10 text-[#25D366] flex items-center justify-center mb-4">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <span className="font-mono text-[10px] text-[#25D366] tracking-widest uppercase font-semibold block mb-1">
                  HIZLI MESAJLAŞMA
                </span>
                <h3 className="text-base font-bold text-[#141517] mb-2">WhatsApp Destek</h3>
                <p className="text-xs text-[#141517]/70 font-light leading-relaxed">
                  Odanızın veya tavanınızın fotoğrafını gönderip anında yaklaşık fiyat ve keşif randevusu alabilirsiniz.
                </p>
              </div>
              <a
                href={waLink('Merhaba M2 Dekorasyon, bilgi ve keşif almak istiyorum.')}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[#25D366] hover:text-[#141517] transition-colors"
              >
                <span>SOHBETİ BAŞLAT</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Card 4: Hours */}
            <div className="bg-white p-6 rounded-sm border border-[#141517]/10 shadow-lg flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-full bg-[#E29415]/10 text-[#E29415] flex items-center justify-center mb-4">
                  <Clock className="w-5 h-5" />
                </div>
                <span className="font-mono text-[10px] text-[#E29415] tracking-widest uppercase font-semibold block mb-1">
                  AÇILIŞ & KAPANIŞ
                </span>
                <h3 className="text-base font-bold text-[#141517] mb-2">Çalışma Saatleri</h3>
                <p className="text-xs text-[#141517]/70 font-light leading-relaxed">
                  Pazartesi – Pazar: <strong>09:00 – 19:00</strong>
                </p>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-mono font-semibold mt-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Haftanın Her Günü Açık
                </span>
              </div>
              <a
                href={`mailto:${SITE.email}`}
                className="mt-5 inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[#66686F] hover:text-[#141517] transition-colors"
              >
                <span>{SITE.email}</span>
              </a>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------- Social Media Show Section */}
        <section className="px-6 md:px-12 py-16 md:py-24 border-b border-[#141517]/10 bg-[#F8F6F0]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="font-mono text-[10px] text-[#E29415] tracking-[0.3em] uppercase block mb-3 font-semibold">
                DİJİTAL KANALLARIMIZ // GÜNCEL ŞANTİYELER
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#141517] uppercase">
                Sosyal Medyada M2 Dekorasyon
              </h2>
              <p className="mt-3 text-sm text-[#141517]/70 font-light leading-relaxed">
                Antalya genelinde devam eden güncel şantiyelerimizi, gergi tavan montaj videolarımızı ve
                önce/sonra dönüşüm serilerini sosyal medya hesaplarımızdan takip edebilirsiniz.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Instagram Card */}
              <a
                href={SITE.instagram}
                target="_blank"
                rel="noreferrer"
                className="group bg-white p-7 rounded-sm border border-[#141517]/10 hover:border-[#E1306C] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#FD1D1D] via-[#E1306C] to-[#405DE6] text-white flex items-center justify-center mb-5 shadow-md group-hover:scale-110 transition-transform">
                    <Instagram className="w-7 h-7" />
                  </div>
                  <span className="font-mono text-[10px] text-[#E1306C] tracking-widest uppercase font-bold block mb-1">
                    @m2dekorasyon
                  </span>
                  <h3 className="text-xl font-bold text-[#141517] mb-2">Instagram</h3>
                  <p className="text-xs text-[#141517]/70 font-light leading-relaxed">
                    Şantiye reels videoları, ışıklı gergi tavan testleri ve tamamlanan villa dekorasyonları.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#141517]/10 flex items-center justify-between text-xs font-mono font-bold text-[#E1306C]">
                  <span>TAKİP ET</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </a>

              {/* WhatsApp Card */}
              <a
                href={waLink('Merhaba M2 Dekorasyon, Instagram ve web siteniz üzerinden ulaşıyorum.')}
                target="_blank"
                rel="noreferrer"
                className="group bg-white p-7 rounded-sm border border-[#141517]/10 hover:border-[#25D366] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-[#25D366] text-white flex items-center justify-center mb-5 shadow-md group-hover:scale-110 transition-transform">
                    <MessageCircle className="w-7 h-7" />
                  </div>
                  <span className="font-mono text-[10px] text-[#25D366] tracking-widest uppercase font-bold block mb-1">
                    0530 540 85 67
                  </span>
                  <h3 className="text-xl font-bold text-[#141517] mb-2">WhatsApp</h3>
                  <p className="text-xs text-[#141517]/70 font-light leading-relaxed">
                    Ölçü ve fotoğraflarınızı iletin, dakikalar içinde yaklaşık maliyet ve randevu alın.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#141517]/10 flex items-center justify-between text-xs font-mono font-bold text-[#25D366]">
                  <span>MESAJ GÖNDER</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </a>

              {/* Facebook Card */}
              <a
                href={SITE.facebook}
                target="_blank"
                rel="noreferrer"
                className="group bg-white p-7 rounded-sm border border-[#141517]/10 hover:border-[#1877F2] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-[#1877F2] text-white flex items-center justify-center mb-5 shadow-md group-hover:scale-110 transition-transform">
                    <Facebook className="w-7 h-7" />
                  </div>
                  <span className="font-mono text-[10px] text-[#1877F2] tracking-widest uppercase font-bold block mb-1">
                    metrekaredekorasyon
                  </span>
                  <h3 className="text-xl font-bold text-[#141517] mb-2">Facebook</h3>
                  <p className="text-xs text-[#141517]/70 font-light leading-relaxed">
                    Müşteri değerlendirmeleri, albümler ve kurumsal duyurularımız.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#141517]/10 flex items-center justify-between text-xs font-mono font-bold text-[#1877F2]">
                  <span>SAYFAYI GÖR</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </a>

              {/* Direct Phone Call Card */}
              <a
                href={`tel:${SITE.phone}`}
                className="group bg-white p-7 rounded-sm border border-[#141517]/10 hover:border-[#E29415] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-[#E29415] text-black flex items-center justify-center mb-5 shadow-md group-hover:scale-110 transition-transform">
                    <Phone className="w-7 h-7" />
                  </div>
                  <span className="font-mono text-[10px] text-[#E29415] tracking-widest uppercase font-bold block mb-1">
                    0242 321 00 08
                  </span>
                  <h3 className="text-xl font-bold text-[#141517] mb-2">Doğrudan Arama</h3>
                  <p className="text-xs text-[#141517]/70 font-light leading-relaxed">
                    Ustalarımızla doğrudan konuşup teknik sorularınızı ve randevunuzu planlayın.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#141517]/10 flex items-center justify-between text-xs font-mono font-bold text-[#E29415]">
                  <span>HEMEN ARA</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </a>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------- Map + Quick Form Section */}
        <section className="px-6 md:px-12 py-16 md:py-24 border-b border-[#141517]/10 bg-white">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Left: Map */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="font-mono text-[10px] text-[#E29415] tracking-[0.3em] uppercase block mb-2 font-semibold flex items-center gap-2">
                  <Navigation className="w-4 h-4 text-[#E29415]" />
                  KONUM & HARİTA
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#141517] uppercase">
                  Adresimiz ve Konum Haritası
                </h2>
                <p className="text-sm text-[#141517]/70 font-light mt-1">
                  <strong className="text-[#141517] font-semibold">M2 Dekorasyon Gergi Tavan Antalya</strong> — Dutlubahçe Mahallesi, Fatih Caddesi No: 62/B, Muratpaşa / Antalya.
                  Cadde üzerinde kolay park imkanı mevcuttur.
                </p>
              </div>

              {/* Embedded Google Maps */}
              <div className="relative aspect-[16/10] w-full rounded-sm overflow-hidden border border-[#141517]/15 shadow-md bg-[#EAE7DF]">
                <iframe
                  src="https://maps.google.com/maps?q=M2+Dekorasyon+Gergi+Tavan+Antalya&t=&z=16&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="M2 Dekorasyon Gergi Tavan Antalya Harita Konumu"
                  className="w-full h-full"
                />
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href={SITE.maps}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#141517] text-white hover:bg-[#E29415] hover:text-black font-mono text-xs tracking-wider uppercase transition-colors shadow-sm"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>GOOGLE HARİTALARDA AÇ & YOL TARİFİ</span>
                </a>
              </div>
            </div>

            {/* Right: Quick Inquiry Form */}
            <div className="lg:col-span-5 bg-[#F8F6F0] p-7 md:p-8 rounded-sm border border-[#141517]/10 shadow-sm">
              <span className="font-mono text-[10px] text-[#E29415] tracking-[0.3em] uppercase block mb-2 font-semibold">
                HIZLI KEŞİF FORMU
              </span>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#141517] uppercase mb-2">
                Tek Tıkla Keşif Talebi
              </h3>
              <p className="text-xs text-[#141517]/70 font-light mb-6">
                Bilgilerinizi seçin, mesajınız otomatik olarak WhatsApp hattımıza aktarılsın.
              </p>

              <form onSubmit={handleWhatsAppSubmit} className="space-y-4">
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-[#141517]/70 mb-1 font-semibold">
                    Adınız Soyadınız
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Örn: Ahmet Yılmaz"
                    className="w-full px-4 py-3 bg-white border border-[#141517]/15 rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-[#E29415]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-[#141517]/70 mb-1 font-semibold">
                      İlçeniz
                    </label>
                    <select
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      className="w-full px-3 py-3 bg-white border border-[#141517]/15 rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-[#E29415]"
                    >
                      {SERVICE_AREAS.map((a) => (
                        <option key={a} value={a}>{a}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-[#141517]/70 mb-1 font-semibold">
                      Hizmet Türü
                    </label>
                    <select
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="w-full px-3 py-3 bg-white border border-[#141517]/15 rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-[#E29415]"
                    >
                      <option value="Gergi Tavan">Gergi Tavan</option>
                      <option value="Duvar Kağıdı">Duvar Kağıdı</option>
                      <option value="Mutfak Dekorasyon">Mutfak Dekorasyon</option>
                      <option value="Banyo Dekorasyon">Banyo Dekorasyon</option>
                      <option value="İç Mimari Tadilat">Komple Tadilat</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-[#141517]/70 mb-1 font-semibold">
                    Not / Metrekare / Detay (İsteğe Bağlı)
                  </label>
                  <textarea
                    rows={3}
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Örn: 30 m2 salon için ışıklı gergi tavan ve keşif talep ediyorum."
                    className="w-full px-4 py-3 bg-white border border-[#141517]/15 rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-[#E29415]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2.5 py-4 rounded-full bg-[#E29415] hover:bg-[#F5A623] text-black font-bold uppercase tracking-widest text-xs shadow-md transition-all active:scale-95 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>WHATSAPP İLE KEŞİF İSTE</span>
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------- Service Areas */}
        <section className="px-6 md:px-12 py-12 bg-[#EFECE4] border-t border-[#141517]/10">
          <div className="max-w-7xl mx-auto">
            <span className="font-mono text-[10px] text-[#E29415] tracking-[0.3em] uppercase block mb-3 font-semibold text-center">
              ANTALYA'NIN HER YERİNDEYİZ
            </span>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#141517] text-center mb-6">
              Yerinde Ücretsiz Keşif Yaptığımız İlçeler
            </h3>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {SERVICE_AREAS.map((a) => (
                <span
                  key={a}
                  className="px-3.5 py-1.5 bg-white border border-[#141517]/10 rounded-sm text-xs font-mono text-[#141517]/80 shadow-xs"
                >
                  {a}
                </span>
              ))}
            </div>
          </div>
        </section>
      </main>

      <FloatingWhatsApp message="Merhaba M2 Dekorasyon, iletişim sayfanızdan ulaşıyorum." />
      <Footer />
    </div>
  );
};

export default ContactPage;
