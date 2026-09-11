import React, { useState } from 'react';
import { REAL_PROJECTS, ProjectItem } from '../data/projectsData';
import { ProjectModal } from './ProjectModal';
import { ArrowUpRight, MapPin, Camera, ArrowRight } from 'lucide-react';

export const ProjectsSection: React.FC = () => {
  const [activeModalProject, setActiveModalProject] = useState<ProjectItem | null>(null);
  const [showAll, setShowAll] = useState<boolean>(false);

  const displayedProjects = showAll ? REAL_PROJECTS : REAL_PROJECTS.slice(0, 6);

  return (
    <section id="projects" className="relative bg-[#F8F6F0] text-[#141517] py-28 md:py-36 px-6 md:px-12 border-t border-black/8">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-black/8">
          <div>
            <span className="font-mono text-[10px] text-[#E29415] tracking-[0.3em] uppercase block mb-3 font-semibold">
              M2 UYGULAMA PORTFOLYOSU // REAL WORKS
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter text-[#141517] uppercase">
              PROJELER
            </h2>
          </div>

          <div className="mt-4 md:mt-0 flex items-center space-x-4">
            <span className="text-xs font-mono text-[#66686F]">
              Antalya Uygulamalarımız · {REAL_PROJECTS.length} Proje
            </span>
            <a
              href="/projeler/"
              className="inline-flex items-center space-x-1.5 text-xs font-mono text-[#E29415] hover:text-white border border-[#E29415]/50 hover:bg-[#E29415] px-3.5 py-1.5 transition-all rounded-xs font-semibold"
            >
              <span>TÜMÜNÜ GÖR</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Large Editorial Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {displayedProjects.map((project) => {
            const previewThumbs = project.images.slice(1, 4);

            return (
              <div
                key={project.id}
                onClick={() => setActiveModalProject(project)}
                className="group cursor-pointer flex flex-col bg-white border border-black/8 hover:border-[#E29415] transition-all duration-500 rounded-xs overflow-hidden shadow-[0_15px_35px_-15px_rgba(20,21,23,0.08)] hover:-translate-y-1"
              >
                {/* Main Cover Visual */}
                <div className="relative aspect-[16/11] overflow-hidden bg-[#EFECE4]">
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out filter brightness-95 group-hover:scale-105"
                  />
                  
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 opacity-60 group-hover:opacity-30 transition-opacity" />

                  {/* Photo Count Badge */}
                  <div className="absolute top-4 left-4 flex items-center space-x-1.5 bg-white/95 backdrop-blur-md px-2.5 py-1 text-[11px] font-mono text-[#141517] border border-black/10 rounded-xs shadow-sm">
                    <Camera className="w-3 h-3 text-[#E29415]" />
                    <span className="font-semibold">{project.imageCount} Fotoğraf</span>
                  </div>

                  {/* Hover Inspect CTA */}
                  <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 text-[10px] font-mono text-[#141517] border border-black/10 flex items-center space-x-1.5 group-hover:bg-[#141517] group-hover:text-white transition-colors rounded-xs shadow-sm">
                    <span className="font-semibold">FOTOĞRAFLARI GÖR</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Card Content Footer */}
                <div className="p-5 flex flex-col justify-between flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center space-x-2 text-[10px] font-mono text-[#E29415] tracking-widest uppercase mb-1 font-semibold">
                        <MapPin className="w-3 h-3" />
                        <span>{project.location}</span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#141517] group-hover:text-[#E29415] transition-colors">
                        {project.code || project.title}
                      </h3>
                    </div>

                    {/* Mini Thumbnails Strip */}
                    <div className="flex -space-x-2">
                      {previewThumbs.map((thumb, idx) => (
                        <div
                          key={idx}
                          className="w-8 h-8 rounded-full border-2 border-white overflow-hidden bg-white shadow-sm shrink-0"
                        >
                          <img
                            src={thumb}
                            alt=""
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Load More Button if showing initial 6 */}
        {!showAll && (
          <div className="mt-12 text-center">
            <button
              onClick={() => setShowAll(true)}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-white border border-black/15 hover:border-[#E29415] hover:bg-[#F8F6F0] text-[#141517] font-mono text-xs tracking-wider uppercase font-semibold transition-all rounded-xs shadow-sm cursor-pointer"
            >
              <span>DİĞER 9 PROJEYİ LİSTELE (TOPLAM 15 PROJE)</span>
              <ArrowRight className="w-4 h-4 text-[#E29415]" />
            </button>
          </div>
        )}

        {/* Big Bottom Action to All Projects Page */}
        <div className="mt-16 pt-10 border-t border-black/8 flex flex-col sm:flex-row items-center justify-between gap-6 bg-white p-8 border border-black/8 rounded-xs shadow-[0_20px_50px_-20px_rgba(20,21,23,0.06)]">
          <div>
            <span className="font-mono text-[10px] text-[#E29415] tracking-widest uppercase block mb-1 font-semibold">
              PORTFOLYO ARŞİVİ
            </span>
            <h4 className="text-2xl sm:text-3xl font-bold text-[#141517] tracking-tight">
              Tüm Projelerimizi ve Uygulama Fotoğraflarını İnceleyin
            </h4>
            <p className="text-xs text-[#66686F] font-mono mt-1">
              Antalya genelinde tamamlanan 15 proje ve 250'den fazla yüksek çözünürlüklü görsel.
            </p>
          </div>

          <a
            href="/projeler/"
            className="w-full sm:w-auto px-8 py-4 bg-[#141517] hover:bg-[#E29415] text-white font-mono text-xs tracking-widest uppercase font-semibold transition-all duration-300 flex items-center justify-center space-x-3 shrink-0 shadow-lg cursor-pointer rounded-xs"
          >
            <span>TÜM PROJELERİ GÖR ({REAL_PROJECTS.length} PROJE)</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

      </div>

      {/* Project Detail Gallery Modal */}
      <ProjectModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </section>
  );
};
