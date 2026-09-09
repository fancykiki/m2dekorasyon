import React from 'react';
import { Award, Compass, ShieldCheck, Clock, CheckCircle } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const values = [
    {
      title: "MİMARİ DİSİPLİN",
      desc: "Tasarım ve şantiye arasında kopukluk olmaz. 3D'de çizilen her çizgi, şantiyede milimetrik olarak hayata geçer."
    },
    {
      title: "IŞIK VE AKUSTİK",
      desc: "M2'nin imzası olan gergi tavan sistemleri, mekanın aydınlatma kalitesini ve akustik konforunu en üst seviyeye taşır."
    },
    {
      title: "ANAHTAR TESLİM GÜVENCE",
      desc: "Antalya'nın iklim şartlarına dayanıklı birinci sınıf malzemeler, sabit bütçe taahhüdü ve 10 yıl uygulama garantisi."
    }
  ];

  return (
    <section id="about" className="relative bg-[#050505] text-[#F5F5F5] py-28 md:py-36 px-6 md:px-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        
        {/* Large Editorial Headline */}
        <div className="mb-16 md:mb-24">
          <span className="font-mono text-[10px] text-[#F27D26] tracking-[0.3em] uppercase block mb-4">
            M² FELSEFESİ // PHILOSOPHY
          </span>
          <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white uppercase leading-[0.92] max-w-5xl">
            WE TRANSFORM <br />
            <span className="text-white/30">INTERIORS.</span>
          </h2>
        </div>

        {/* 2-Column Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left: Concise Turkish Copy as Requested */}
          <div className="lg:col-span-6 space-y-6">
            <p className="text-xl sm:text-2xl text-white font-light leading-relaxed">
              M2 Dekorasyon; mimari planlama, iç tasarım, gergi tavan teknolojisi ve detaylı şantiye uygulamasını tek bir çatıda birleştirir.
            </p>
            
            <p className="text-sm sm:text-base text-white/50 font-light leading-relaxed">
              Antalya merkezli stüdyomuz, Akdeniz’in seçkin konut, villa ve ticari mekanları için sıradan kalıpları reddeder. Ham mekanın geometrisini analiz eder, ışığı mimari bir yapı elemanı olarak kullanır ve yaşam alanını kişiselleştirilmiş bir sanat eserine dönüştürür.
            </p>

            {/* Key Statistics Strip */}
            <div className="pt-8 border-t border-white/5 grid grid-cols-3 gap-6">
              <div>
                <span className="text-3xl sm:text-4xl text-[#F27D26] font-mono font-bold block tracking-tight">
                  18+
                </span>
                <span className="text-[10px] font-mono text-white/40 tracking-wider uppercase mt-1 block">
                  Yıllık Tecrübe
                </span>
              </div>
              <div>
                <span className="text-3xl sm:text-4xl text-white font-mono font-bold block tracking-tight">
                  450+
                </span>
                <span className="text-[10px] font-mono text-white/40 tracking-wider uppercase mt-1 block">
                  Tamamlanan Proje
                </span>
              </div>
              <div>
                <span className="text-3xl sm:text-4xl text-white font-mono font-bold block tracking-tight">
                  25k m²
                </span>
                <span className="text-[10px] font-mono text-white/40 tracking-wider uppercase mt-1 block">
                  Gergi Tavan
                </span>
              </div>
            </div>
          </div>

          {/* Right: Studio Pillar Cards (Editorial minimal layout) */}
          <div className="lg:col-span-6 space-y-3.5">
            {values.map((v, i) => (
              <div 
                key={v.title}
                className="p-6 md:p-8 bg-[#111111] border border-white/5 hover:border-white/20 transition-colors rounded-xs"
              >
                <div className="flex items-center space-x-3 mb-2">
                  <span className="font-mono text-[10px] text-[#F27D26]">0{i + 1}</span>
                  <h3 className="text-base md:text-lg text-white font-medium uppercase tracking-tight">
                    {v.title}
                  </h3>
                </div>
                <p className="text-xs md:text-sm text-white/50 font-light leading-relaxed pl-6">
                  {v.desc}
                </p>
              </div>
            ))}

            {/* European Certifications Banner */}
            <div className="p-5 bg-[#111111] border border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-xs">
              <div className="flex items-center space-x-3">
                <ShieldCheck className="w-5 h-5 text-[#F27D26] shrink-0" />
                <span className="text-xs font-mono text-white/70">
                  DIN EN ISO 354 Akustik & B1 Yanmazlık Belgeli Avrupa Membranlar
                </span>
              </div>
              <span className="text-[10px] font-mono text-[#F27D26] uppercase whitespace-nowrap tracking-wider">
                10 YIL RESMİ GARANTİ
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
