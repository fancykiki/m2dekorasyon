import React from 'react';
import { Project } from '../types';
import { X, MapPin, Calendar, Maximize2, Check, ArrowRight } from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-xl animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-[#0a0a0a] border border-white/10 my-auto overflow-hidden shadow-2xl rounded-xs">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-20 p-2.5 bg-[#050505]/80 hover:bg-white text-white hover:text-black border border-white/20 transition-all cursor-pointer"
          aria-label="Kapat"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Hero Cover of Project */}
        <div className="relative h-72 sm:h-96 md:h-[420px] w-full overflow-hidden">
          <img
            src={project.coverImage}
            alt={project.title}
            referrerPolicy="no-referrer"
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover filter brightness-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-black/50" />

          <div className="absolute bottom-6 left-6 md:left-10 right-6">
            <div className="flex items-center space-x-3 text-[10px] font-mono text-[#F27D26] tracking-widest uppercase mb-2">
              <span className="px-2 py-0.5 bg-white/5 border border-white/15 text-white">
                {project.category}
              </span>
              <span className="text-white/20">/</span>
              <span className="flex items-center space-x-1 text-white/70">
                <MapPin className="w-3 h-3 text-[#F27D26]" />
                <span>{project.location}</span>
              </span>
              <span className="text-white/20">/</span>
              <span className="text-white/70">{project.year}</span>
            </div>
            <h3 className="text-3xl sm:text-4xl md:text-5xl text-white font-medium uppercase tracking-tight">
              {project.title}
            </h3>
            <p className="text-xs md:text-sm text-white/50 font-mono mt-1">
              {project.subtitle}
            </p>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 md:p-10 grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Left: Project Story & Highlights */}
          <div className="md:col-span-8 space-y-6">
            <div>
              <span className="text-[10px] font-mono text-[#F27D26] tracking-widest uppercase block mb-2">
                PROJE HİKAYESİ
              </span>
              <p className="text-white/70 leading-relaxed text-sm font-light">
                {project.description}
              </p>
            </div>

            <div>
              <span className="text-[10px] font-mono text-[#F27D26] tracking-widest uppercase block mb-3">
                ÖNE ÇIKAN MİMARİ MÜDAHALELER
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {project.highlights.map((h, i) => (
                  <div key={i} className="flex items-start space-x-2 text-xs font-mono text-white/80 bg-white/5 p-3 border border-white/5">
                    <Check className="w-3.5 h-3.5 text-[#F27D26] shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Gallery Strip */}
            <div>
              <span className="text-[10px] font-mono text-white/40 tracking-widest uppercase block mb-3">
                PROJE DETAY FOTOĞRAFLARI
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {project.gallery.map((img, i) => (
                  <div key={i} className="aspect-[4/3] bg-black/40 overflow-hidden border border-white/10 group">
                    <img
                      src={img}
                      alt={`${project.title} detail ${i + 1}`}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Technical Specifications Card */}
          <div className="md:col-span-4 bg-[#121212] border border-white/5 p-6 flex flex-col justify-between rounded-xs">
            <div>
              <span className="text-[10px] font-mono text-[#F27D26] tracking-widest uppercase block mb-4 border-b border-white/10 pb-2">
                TEKNİK KÜNYE
              </span>
              <dl className="space-y-3.5 text-xs">
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <dt className="text-white/40 font-mono">Alan</dt>
                  <dd className="text-white font-mono">{project.area}</dd>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <dt className="text-white/40 font-mono">Konum</dt>
                  <dd className="text-white font-mono">{project.location}</dd>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <dt className="text-white/40 font-mono">Yıl</dt>
                  <dd className="text-white font-mono">{project.year}</dd>
                </div>
                {project.specs.map((s, i) => (
                  <div key={i} className="flex justify-between border-b border-white/5 pb-2">
                    <dt className="text-white/40 font-mono">{s.label}</dt>
                    <dd className="text-white font-mono text-right ml-2">{s.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="mt-8 pt-6 border-t border-white/5">
              <a
                href="#contact"
                onClick={onClose}
                className="w-full py-3.5 bg-white hover:bg-[#e0e0e0] text-black text-center font-mono text-xs tracking-wider uppercase font-semibold flex items-center justify-center space-x-2 transition-colors block"
              >
                <span>BENZER PROJE BAŞLAT</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
