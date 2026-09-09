import React, { useState } from 'react';
import { PROJECTS } from '../data/content';
import { Project, ProjectCategory } from '../types';
import { ProjectModal } from './ProjectModal';
import { ArrowUpRight, MapPin, Maximize2, Layers } from 'lucide-react';

export const ProjectsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('ALL');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const categories: { label: string; value: ProjectCategory }[] = [
    { label: 'TÜM PROJELER', value: 'ALL' },
    { label: 'VİLLA', value: 'VİLLA' },
    { label: 'KONUT', value: 'KONUT' },
    { label: 'OFİS', value: 'OFİS' },
    { label: 'TİCARİ MEKAN', value: 'TİCARİ MEKAN' },
    { label: 'GERGİ TAVAN', value: 'GERGİ TAVAN' },
    { label: 'İÇ MİMARLIK', value: 'İÇ MİMARLIK' },
  ];

  const filteredProjects = selectedCategory === 'ALL'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === selectedCategory || (selectedCategory === 'GERGİ TAVAN' && p.description.includes('gergi')));

  return (
    <section id="projects" className="relative bg-[#050505] text-[#F5F5F5] py-28 md:py-36 px-6 md:px-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 pb-8 border-b border-white/5">
          <div>
            <span className="font-mono text-[10px] text-[#F27D26] tracking-[0.3em] uppercase block mb-3">
              SEÇKİN PORTFOLYO // SELECTED WORKS
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter text-white uppercase">
              PROJELER
            </h2>
          </div>

          {/* Minimalist Architectural Category Filter */}
          <div className="mt-6 lg:mt-0 flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-3 py-1.5 text-[10px] font-mono tracking-wider uppercase transition-all duration-300 border ${
                  selectedCategory === cat.value
                    ? 'bg-white text-black border-white font-semibold'
                    : 'bg-transparent text-white/50 border-white/10 hover:border-white/30 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Large Editorial Showcase Layout: Expansive Viewport Cards with Cinematic Asymmetry */}
        <div className="space-y-16 md:space-y-24">
          {filteredProjects.map((project, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={project.id}
                onClick={() => setActiveModalProject(project)}
                className="group cursor-pointer grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center"
              >
                {/* Large Project Visual Viewport */}
                <div className={`lg:col-span-8 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                  <div className="relative overflow-hidden aspect-[16/10] bg-[#111111] border border-white/5 shadow-2xl rounded-xs">
                    <img
                      src={project.coverImage}
                      alt={project.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-1000 ease-out filter brightness-90 contrast-105 group-hover:scale-105"
                    />
                    
                    {/* Architectural Overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/80 via-transparent to-black/20 opacity-60 group-hover:opacity-40 transition-opacity" />

                    {/* View Details Hover Trigger */}
                    <div className="absolute bottom-5 right-5 bg-[#050505]/80 backdrop-blur-md px-3.5 py-1.5 border border-white/15 text-[10px] font-mono text-white flex items-center space-x-2 group-hover:bg-white group-hover:text-black transition-colors">
                      <span>DETAYLARI İNCELE</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </div>

                    <div className="absolute top-5 left-5 flex items-center space-x-2 bg-[#050505]/80 backdrop-blur-md px-2.5 py-1 text-[10px] font-mono text-white/80 border border-white/10">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F27D26]" />
                      <span>{project.category}</span>
                    </div>
                  </div>
                </div>

                {/* Editorial Typography & Metadata Description */}
                <div className={`lg:col-span-4 ${isEven ? 'lg:order-2' : 'lg:order-1'} flex flex-col justify-center`}>
                  <div className="flex items-center space-x-3 text-[10px] font-mono text-[#F27D26] tracking-widest uppercase mb-3">
                    <span className="flex items-center space-x-1">
                      <MapPin className="w-3 h-3" />
                      <span>{project.location}</span>
                    </span>
                    <span className="text-white/20">/</span>
                    <span>{project.area}</span>
                    <span className="text-white/20">/</span>
                    <span>{project.year}</span>
                  </div>

                  <h3 className="text-3xl sm:text-4xl text-white font-medium uppercase tracking-tight group-hover:text-[#F27D26] transition-colors">
                    {project.title}
                  </h3>

                  <p className="mt-1.5 text-xs text-white/40 font-mono">
                    {project.subtitle}
                  </p>

                  <p className="mt-4 text-xs md:text-sm text-white/60 font-light leading-relaxed">
                    {project.description}
                  </p>

                  {/* Highlights Bullet Tag list */}
                  <div className="mt-6 pt-6 border-t border-white/5 space-y-2">
                    {project.highlights.slice(0, 3).map((hl, i) => (
                      <div key={i} className="text-xs font-mono text-white/50 flex items-center space-x-2">
                        <span className="w-1 h-1 bg-[#F27D26] rounded-full" />
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 flex items-center space-x-4">
                    <button
                      type="button"
                      className="text-xs font-mono tracking-wider uppercase text-white hover:text-[#F27D26] flex items-center space-x-2 transition-colors"
                    >
                      <span>PROJE SAYFASINI AÇ</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Project Detail Modal */}
      <ProjectModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </section>
  );
};
