import React, { useState } from 'react';
import { 
  Ruler, 
  Palette, 
  Hammer, 
  CheckCircle, 
  MessageCircle, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { waLink } from '../data/services';

interface Step {
  number: string;
  stepName: string;
  title: string;
  desc: string;
  image: string;
  tag: string;
}

const STEPS: Step[] = [
  {
    number: '01',
    stepName: 'KEŞİF & ÖLÇÜ',
    title: 'Yerinde Ücretsiz Keşif',
    desc: 'Antalya içinde adresinize gelip alanın net ölçülerini alıyor, mekanın durumunu yerinde inceliyoruz.',
    image: '/process/step-01.webp',
    tag: 'Ücretsiz Keşif',
  },
  {
    number: '02',
    stepName: 'MODEL & FİYAT',
    title: 'Desen ve Malzeme Seçimi',
    desc: 'Zengin desen kataloğumuz ve numunelerimizle mekanınıza en uygun modele karar verip net fiyatı belirliyoruz.',
    image: '/process/step-02.webp',
    tag: 'Net Bütçe',
  },
  {
    number: '03',
    stepName: 'ATÖLYE HAZIRLIĞI',
    title: 'Ölçüye Özel İmalat',
    desc: 'Seçilen gergi tavan membranı veya duvar kağıdı, mekanınızın ölçüsüne göre atölyemizde titizlikle hazırlanır.',
    image: '/process/step-03.webp',
    tag: 'Kendi Atölyemiz',
  },
  {
    number: '04',
    stepName: 'MONTAJ & TESLİM',
    title: 'Temiz Kurulum ve Teslimat',
    desc: 'Kırmadan dökmeden, etrafı kirletmeden temiz bir işçilikle montajı tamamlayıp mekanınızı teslim ediyoruz.',
    image: '/process/step-04.webp',
    tag: 'Garantili Teslim',
  },
];

export const ProcessSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  return (
    <section 
      id="process" 
      className="relative bg-[#F8F6F0] text-[#141517] py-28 md:py-36 px-6 md:px-12 border-t border-black/8 select-none"
    >
      {/* Anchor for old #about links */}
      <span id="about" className="absolute -top-24 opacity-0 pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-black/8 gap-6">
          <div>
            <span className="font-mono text-[10px] text-[#E29415] tracking-[0.3em] uppercase block mb-3 font-semibold">
              NASIL ÇALIŞIRIZ? // WORKFLOW
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter text-[#141517] uppercase">
              4 ADIMDA DÖNÜŞÜM
            </h2>
          </div>

          <p className="max-w-md text-xs md:text-sm text-[#66686F] font-light leading-relaxed">
            Keşiften montaja kadar tüm süreci kendi ekibimizle yönetiyoruz. Sürpriz maliyet olmadan, temiz ve zamanında teslimat.
          </p>
        </div>

        {/* 4 Steps Showcase Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((step, idx) => {
            const isActive = idx === activeStep;

            return (
              <div
                key={step.number}
                onClick={() => setActiveStep(idx)}
                onMouseEnter={() => setActiveStep(idx)}
                className={`group cursor-pointer flex flex-col bg-white border rounded-xs overflow-hidden transition-all duration-500 shadow-[0_15px_35px_-15px_rgba(20,21,23,0.08)] ${
                  isActive 
                    ? 'border-[#E29415] ring-2 ring-[#E29415]/40 -translate-y-1.5 shadow-xl' 
                    : 'border-black/8 hover:border-[#E29415]/50'
                }`}
              >
                {/* Visual Thumbnail Frame */}
                <div className="relative aspect-[16/10] overflow-hidden bg-[#EFECE4]">
                  <img
                    src={step.image}
                    alt={step.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out filter brightness-95 contrast-105 group-hover:scale-105"
                  />
                  
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/15" />

                  {/* Step Number Top-Left Badge */}
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1 text-xs font-mono font-bold text-[#141517] border border-black/10 rounded-xs flex items-center space-x-1.5 shadow-sm">
                    <span className="text-[#E29415]">{step.number}</span>
                    <span className="text-[#91949D]">/</span>
                    <span className="text-[10px] tracking-wider text-[#141517]">{step.stepName}</span>
                  </div>

                  {/* Step Tag Top-Right */}
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2 py-0.5 text-[9px] font-mono text-[#141517] border border-black/10 rounded-xs font-semibold shadow-xs">
                    {step.tag}
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="p-5 sm:p-6 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="text-lg font-bold tracking-tight text-[#141517] mb-2 group-hover:text-[#E29415] transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-xs text-[#66686F] font-light leading-relaxed">
                      {step.desc}
                    </p>
                  </div>

                  {/* Active Step Indicator Line */}
                  <div className="mt-5 pt-3 border-t border-black/8 flex items-center justify-between text-[10px] font-mono">
                    <span className={isActive ? 'text-[#E29415] font-semibold' : 'text-[#91949D]'}>
                      {isActive ? '● AKTİF AŞAMA' : 'Aşama ' + step.number}
                    </span>
                    <span className="text-[#91949D] group-hover:text-[#141517] transition-colors font-medium">
                      Adım {idx + 1} / 4
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Action Trust Banner */}
        <div className="mt-12 bg-white border border-black/8 p-6 sm:p-8 rounded-xs flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_20px_50px_-20px_rgba(20,21,23,0.08)]">
          <div>
            <div className="flex items-center space-x-2 text-[10px] font-mono text-[#E29415] tracking-widest uppercase mb-1 font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>ANTALYA İÇİ HIZLI HİZMET</span>
            </div>
            <h4 className="text-xl sm:text-2xl font-bold text-[#141517] tracking-tight">
              Mekanınız İçin Ücretsiz Keşif Randevusu Alın
            </h4>
            <p className="text-xs text-[#66686F] font-light mt-1">
              Kataloglarımızla adresinize gelip ölçü alalım, mekanınıza en uygun çözümü birlikte planlayalım.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto shrink-0">
            <a
              href={waLink('Merhaba M2 Dekorasyon, yerinde ücretsiz keşif randevusu almak istiyorum.')}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-6 py-3.5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-mono text-xs tracking-wider uppercase font-semibold flex items-center justify-center space-x-2 transition-all rounded-xs shadow-md cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp ile Keşif İste</span>
            </a>

            <a
              href="#contact"
              className="w-full sm:w-auto px-6 py-3.5 bg-[#141517] hover:bg-[#E29415] text-white font-mono text-xs tracking-wider uppercase font-semibold flex items-center justify-center space-x-2 transition-all rounded-xs shadow-md cursor-pointer"
            >
              <span>Teklif Formu</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
