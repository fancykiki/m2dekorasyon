import React from 'react';
import { BookOpen, CheckCircle2, HelpCircle, MessageCircle, Phone, ArrowRight } from 'lucide-react';
import { SERVICE_ARTICLES } from '../data/serviceArticles';
import { SITE, waLink } from '../data/services';

interface ServiceArticleSectionProps {
  serviceSlug: string;
}

export const ServiceArticleSection: React.FC<ServiceArticleSectionProps> = ({ serviceSlug }) => {
  const article = SERVICE_ARTICLES[serviceSlug];
  if (!article) return null;

  return (
    <section className="px-6 md:px-12 py-16 md:py-24 border-t border-[#141517]/8 bg-white">
      <div className="max-w-5xl mx-auto">
        <article className="prose prose-neutral max-w-none">
          {/* Article Header */}
          <div className="mb-12 pb-8 border-b border-[#141517]/10">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E29415]/10 text-[#E29415] font-mono text-[10px] tracking-wider uppercase font-semibold">
                <BookOpen className="w-3 h-3" />
                {article.badge}
              </span>
              <span className="font-mono text-xs text-[#141517]/50 tracking-wider">
                {article.readingTime}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#141517] leading-tight mb-5 not-prose">
              {article.title}
            </h2>

            <p className="text-base sm:text-lg text-[#141517]/80 font-light leading-relaxed">
              {article.summary}
            </p>
          </div>

          {/* Key Takeaways Box */}
          <div className="my-10 p-6 md:p-8 bg-[#F8F6F0] border-l-4 border-[#E29415] rounded-r-sm not-prose shadow-xs">
            <h3 className="font-mono text-xs uppercase tracking-widest text-[#141517] font-bold mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#E29415]" />
              Öne Çıkan Standartlar ve Mimari Kriterler
            </h3>
            <ul className="space-y-3">
              {article.keyTakeaways.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-[#141517]/80 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E29415] shrink-0 mt-2" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Content Sections */}
          <div className="space-y-12 my-12">
            {article.sections.map((section, idx) => (
              <div key={idx} className="space-y-4">
                <h3 className="text-xl sm:text-2xl font-bold text-[#141517] tracking-tight not-prose">
                  {section.heading}
                </h3>
                {section.body.map((p, pIdx) => (
                  <p key={pIdx} className="text-sm sm:text-base text-[#141517]/75 font-light leading-relaxed">
                    {p}
                  </p>
                ))}
                {section.callout && (
                  <div className="my-5 p-5 bg-[#EFECE4]/70 border border-[#141517]/10 rounded-sm not-prose">
                    <p className="text-xs sm:text-sm text-[#141517]/90 font-medium leading-relaxed italic">
                      💡 {section.callout}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Article FAQs if any */}
          {article.faq && article.faq.length > 0 && (
            <div className="my-12 pt-8 border-t border-[#141517]/10 not-prose">
              <h3 className="text-xl sm:text-2xl font-bold text-[#141517] tracking-tight mb-6 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-[#E29415]" />
                Teknik Merak Edilenler & Uzman Cevapları
              </h3>
              <div className="divide-y divide-[#141517]/10 border-y border-[#141517]/10">
                {article.faq.map((item, idx) => (
                  <details key={idx} className="group py-4">
                    <summary className="flex items-start justify-between gap-4 cursor-pointer list-none text-base text-[#141517] font-semibold">
                      <span>{item.q}</span>
                      <span className="shrink-0 mt-1 text-[#E29415] transition-transform duration-300 group-open:rotate-45 text-xl leading-none">+</span>
                    </summary>
                    <p className="mt-3 text-sm text-[#141517]/70 font-light leading-relaxed pr-6">
                      {item.a}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          )}

          {/* Bottom Local CTA Box */}
          <div className="mt-12 p-8 bg-[#141517] text-white rounded-sm not-prose shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <span className="font-mono text-[10px] text-[#E29415] tracking-[0.3em] uppercase block mb-2 font-semibold">
                M2 DEKORASYON // ANTALYA
              </span>
              <h4 className="text-xl sm:text-2xl font-bold tracking-tight text-white uppercase">
                Projenizi Birlikte Hayata Geçirelim
              </h4>
              <p className="mt-2 text-xs sm:text-sm text-white/70 font-light max-w-lg leading-relaxed">
                {SITE.street}, {SITE.district}/{SITE.city} adresindeki showroomumuza gelebilir veya adresinize ücretsiz keşif ve numune talep edebilirsiniz.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 shrink-0">
              <a
                href={waLink(`Merhaba M2 Dekorasyon, web sitenizdeki mimari rehberi inceledim ve projem için ücretsiz keşif talep ediyorum.`)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#E29415] hover:bg-[#F5A623] text-black font-bold uppercase tracking-wider text-xs transition-colors shadow-md active:scale-95"
              >
                <MessageCircle className="w-4 h-4" />
                <span>ÜCRETSİZ KEŞİF İSTE</span>
              </a>
              <a
                href={`tel:${SITE.phone}`}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full border border-white/20 text-white hover:border-[#E29415] hover:text-[#E29415] font-mono text-xs tracking-wider uppercase transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#E29415]" />
                <span>{SITE.phoneDisplay}</span>
              </a>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
};

export default ServiceArticleSection;
