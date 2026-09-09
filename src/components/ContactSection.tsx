import React, { useState } from 'react';
import { Phone, MessageSquare, MapPin, Mail, ArrowUpRight, Check, Send } from 'lucide-react';
import { ContactFormState } from '../types';

export const ContactSection: React.FC = () => {
  const [formState, setFormState] = useState<ContactFormState>({
    fullName: '',
    phone: '',
    email: '',
    serviceType: 'Gergi Tavan & İç Mimarlık',
    projectArea: '150 - 300 m²',
    location: 'Antalya (Muratpaşa / Konyaaltı / Lara)',
    message: ''
  });

  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const whatsappMessage = encodeURIComponent(
    `Merhaba M2 Dekorasyon, projem hakkında danışmak istiyorum.\nİsim: ${formState.fullName || 'Belirtilmedi'}\nHizmet: ${formState.serviceType}\nAlan: ${formState.projectArea}\nNot: ${formState.message || 'Müsait olduğunuzda görüşebiliriz.'}`
  );

  return (
    <section id="contact" className="relative bg-[#050505] text-[#F5F5F5] py-28 md:py-36 px-6 md:px-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        
        {/* Minimal High-End Section Header */}
        <div className="mb-16 md:mb-24">
          <span className="font-mono text-[10px] text-[#F27D26] tracking-[0.3em] uppercase block mb-4">
            İLETİŞİM & KEŞİF // INITIATION
          </span>
          <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white uppercase leading-[0.92]">
            PROJENİZİ <br />
            <span className="text-white/30">KONUŞALIM.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left: Studio Information & Direct Connect (WhatsApp & Phone) */}
          <div className="lg:col-span-5 space-y-8">
            <p className="text-sm md:text-base text-white/60 font-light leading-relaxed">
              İster yeni bir villa projesi, ister mevcut bir konutun gergi tavan ve komple renovasyonu. Mimari ekibimiz yerinde rölöve ve 3D ön projelendirme için hazırdır.
            </p>

            {/* Direct Quick Action Buttons */}
            <div className="space-y-3">
              {/* WhatsApp Direct Action */}
              <a
                href={`https://wa.me/905320000000?text=${whatsappMessage}`}
                target="_blank"
                rel="noreferrer"
                id="contact-whatsapp-direct"
                className="w-full p-4 bg-[#111111] hover:bg-[#161616] border border-white/5 hover:border-white/20 flex items-center justify-between transition-all group rounded-xs"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-xs bg-[#25D366]/10 border border-[#25D366]/25 flex items-center justify-center text-[#25D366]">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <span className="text-sm font-medium text-white group-hover:text-white transition-colors block">
                      WHATSAPP HIZLI DANIŞMA
                    </span>
                    <span className="text-[10px] font-mono text-white/40">
                      Projeleriniz ve fotoğraflarınız için anlık yanıt
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-white/40 group-hover:text-white transition-colors" />
              </a>

              {/* Phone Direct */}
              <a
                href="tel:+902423162020"
                id="contact-phone-direct"
                className="w-full p-4 bg-[#111111] hover:bg-[#161616] border border-white/5 hover:border-white/20 flex items-center justify-between transition-all group rounded-xs"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-xs bg-white/5 border border-white/10 flex items-center justify-center text-white">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <span className="text-sm font-medium text-white group-hover:text-white transition-colors block font-mono">
                      +90 242 316 20 20
                    </span>
                    <span className="text-[10px] font-mono text-white/40">
                      Pazartesi – Cumartesi 09:00 - 19:00
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-white/40 group-hover:text-white transition-colors" />
              </a>
            </div>

            {/* Studio Address Coordinates */}
            <div className="pt-6 border-t border-white/5 space-y-3 text-xs font-mono text-white/50">
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-[#F27D26] shrink-0 mt-0.5" />
                <div>
                  <span className="text-white font-medium block">ANTALYA STÜDYOSU</span>
                  <span>Şirinyalı Mah. İsmet Gökşen Cad. No: 42/B, Muratpaşa / Antalya</span>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-[#F27D26] shrink-0" />
                <span>proje@m2dekorasyon.com</span>
              </div>
            </div>

          </div>

          {/* Right: Architectural Project Inquiry Form (Non-generic, bespoke layout) */}
          <div className="lg:col-span-7 bg-[#111111] border border-white/5 p-8 sm:p-10 shadow-2xl rounded-xs">
            {submitted ? (
              <div className="py-12 text-center space-y-4 animate-fade-in">
                <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mx-auto text-white">
                  <Check className="w-5 h-5" />
                </div>
                <h3 className="text-2xl sm:text-3xl text-white font-medium uppercase tracking-tight">
                  TALEBİNİZ ALINDI
                </h3>
                <p className="text-xs sm:text-sm text-white/60 max-w-md mx-auto leading-relaxed">
                  Mimari proje ekibimiz bilgilerinizi inceleyerek 24 saat içinde tarafınıza detaylı keşif randevusu için dönüş yapacaktır.
                </p>
                <div className="pt-4">
                  <a
                    href={`https://wa.me/905320000000?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center space-x-2 px-6 py-3.5 bg-white text-black text-xs font-mono tracking-wider uppercase font-semibold"
                  >
                    <span>HEMEN WHATSAPP'TAN YAZIN</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                
                <div className="border-b border-white/5 pb-4 mb-5">
                  <span className="text-[10px] font-mono text-[#F27D26] tracking-widest uppercase block mb-1">
                    PROJE DETAYLARI
                  </span>
                  <span className="text-xs text-white/40 font-light">
                    Ön rölöve ve teklif hazırlayabilmemiz için temel bilgileri doldurun.
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-mono text-white/60 uppercase block mb-1.5">
                      Adınız Soyadınız *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Örn: Arda Aksoy"
                      value={formState.fullName}
                      onChange={(e) => setFormState({ ...formState, fullName: e.target.value })}
                      className="w-full bg-[#050505] border border-white/10 px-3.5 py-2.5 text-xs text-white focus:border-white focus:outline-hidden transition-colors rounded-xs"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-mono text-white/60 uppercase block mb-1.5">
                      Telefon Numarası *
                    </label>
                    <input
                      required
                      type="tel"
                      placeholder="0532 000 00 00"
                      value={formState.phone}
                      onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                      className="w-full bg-[#050505] border border-white/10 px-3.5 py-2.5 text-xs text-white focus:border-white focus:outline-hidden transition-colors rounded-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-mono text-white/60 uppercase block mb-1.5">
                      Hizmet Türü
                    </label>
                    <select
                      value={formState.serviceType}
                      onChange={(e) => setFormState({ ...formState, serviceType: e.target.value })}
                      className="w-full bg-[#050505] border border-white/10 px-3.5 py-2.5 text-xs text-white focus:border-white focus:outline-hidden transition-colors rounded-xs"
                    >
                      <option value="Gergi Tavan & Aydınlatma">Gergi Tavan & Aydınlatma</option>
                      <option value="Komple İç Mimarlık & Renovasyon">Komple İç Mimarlık & Renovasyon</option>
                      <option value="Villa & Rezidans Tasarımı">Villa & Rezidans Tasarımı</option>
                      <option value="Asma Tavan & TV Ünitesi">Asma Tavan & TV Ünitesi</option>
                      <option value="Ofis & Ticari Mekan">Ofis & Ticari Mekan</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] font-mono text-white/60 uppercase block mb-1.5">
                      Tahmini Alan (m²)
                    </label>
                    <select
                      value={formState.projectArea}
                      onChange={(e) => setFormState({ ...formState, projectArea: e.target.value })}
                      className="w-full bg-[#050505] border border-white/10 px-3.5 py-2.5 text-xs text-white focus:border-white focus:outline-hidden transition-colors rounded-xs"
                    >
                      <option value="50 - 150 m²">50 - 150 m²</option>
                      <option value="150 - 300 m²">150 - 300 m²</option>
                      <option value="300 - 600 m²">300 - 600 m²</option>
                      <option value="600 m²+ (Lüks Villa / Ticari)">600 m²+ (Lüks Villa / Ticari)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-mono text-white/60 uppercase block mb-1.5">
                    Proje Lokasyonu (Antalya / İlçe)
                  </label>
                  <input
                    type="text"
                    placeholder="Örn: Konyaaltı, Lara, Kemer, Belek veya Kaş"
                    value={formState.location}
                    onChange={(e) => setFormState({ ...formState, location: e.target.value })}
                    className="w-full bg-[#050505] border border-white/10 px-3.5 py-2.5 text-xs text-white focus:border-white focus:outline-hidden transition-colors rounded-xs"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-mono text-white/60 uppercase block mb-1.5">
                    Proje Notları / Özel Talepler
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Mekanın mevcut durumu, istenen gergi tavan tipi veya teslim takvimi..."
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full bg-[#050505] border border-white/10 px-3.5 py-2.5 text-xs text-white focus:border-white focus:outline-hidden transition-colors resize-none rounded-xs"
                  />
                </div>

                <button
                  type="submit"
                  id="contact-submit-btn"
                  className="w-full py-4 bg-white hover:bg-[#e0e0e0] text-black font-semibold tracking-widest text-xs uppercase flex items-center justify-center space-x-2 transition-all cursor-pointer font-mono shadow-xl rounded-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>ÜCRETSİZ KEŞİF TALEBİNİ İLET</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
