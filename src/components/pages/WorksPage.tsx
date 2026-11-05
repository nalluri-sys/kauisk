import React, { useState } from 'react';
import { PROJECTS, Project } from '../../data/portfolioData';
import { ExternalLink, Github, Code2, Layers, CheckCircle2, X } from 'lucide-react';
import { sound } from '../../utils/audio';

export const WorksPage: React.FC = () => {
  const [filter, setFilter] = useState<'All' | 'AI / Machine Learning' | 'Full-Stack' | 'Data Analytics'>('All');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const filteredProjects = PROJECTS.filter((p) => {
    if (filter === 'All') return true;
    return p.category === filter;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-800">
        <div>
          <div className="text-xs font-mono text-cyan-400 mb-1">
            NODE // WORKS_02 · ENGINEERING CATALOG
          </div>
          <h1 className="text-3xl md:text-5xl font-cyber font-bold tracking-wider text-white">
            PROJECT ARCHIVE
          </h1>
          <p className="text-sm text-slate-400 mt-2">
            Production full-stack applications, trained ML pipelines, and data analytics systems.
          </p>
        </div>

        {/* Filter Tabs (Horizontal scroll on mobile) */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900/90 border border-slate-800 rounded-xl overflow-x-auto max-w-full scrollbar-none shrink-0">
          {(['All', 'AI / Machine Learning', 'Full-Stack', 'Data Analytics'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => {
                sound.playClick();
                setFilter(cat);
              }}
              className={`px-3 py-1.5 text-xs font-mono rounded-lg transition-all whitespace-nowrap shrink-0 ${
                filter === cat
                  ? 'bg-cyan-500 text-black font-bold border border-cyan-400 shadow-[0_0_12px_rgba(0,240,255,0.3)]'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Project Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="flex flex-col justify-between p-4 sm:p-6 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 hover:bg-slate-900/90 transition-all duration-300 group shadow-lg"
          >
            <div className="space-y-4">
              {/* Category & Date */}
              <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                <span className="text-cyan-400 font-semibold">{project.category}</span>
                <span>{project.date}</span>
              </div>

              {/* Title & Subtitle */}
              <div>
                <h2 className="text-xl font-cyber font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {project.title}
                </h2>
                <p className="text-xs text-slate-400 mt-1 line-clamp-1">
                  {project.subtitle}
                </p>
              </div>

              {/* Summary */}
              <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                {project.summary}
              </p>

              {/* Technologies Badges */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 text-[11px] font-mono bg-black/40 text-slate-300 rounded border border-slate-800"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer Actions */}
            <div className="pt-4 mt-4 sm:pt-6 sm:mt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={() => {
                  sound.playClick();
                  setActiveModalProject(project);
                }}
                className="px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-cyan-950/40 border border-slate-700/80 hover:border-cyan-400/50 text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 transition-all active:scale-95"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Architecture</span>
              </button>

              <div className="flex items-center gap-2">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => sound.playClick()}
                    className="px-3 py-1.5 text-xs font-mono bg-slate-800/90 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700 flex items-center gap-1.5 transition-all active:scale-95"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>Source</span>
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => sound.playClick()}
                    className="px-3.5 py-1.5 text-xs font-mono bg-gradient-to-r from-cyan-500 to-cyan-400 hover:from-cyan-400 hover:to-cyan-300 text-black font-bold rounded-lg flex items-center gap-1.5 transition-all active:scale-95 shadow-[0_0_12px_rgba(0,240,255,0.25)]"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Launch</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for In-depth Architecture Specs */}
      {activeModalProject && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
        >
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 md:p-8 rounded-xl bg-slate-900 border border-cyan-500/40 shadow-[0_0_40px_rgba(0,240,255,0.15)] cyber-corner-bracket space-y-6">
            <button
              onClick={() => {
                sound.playClick();
                setActiveModalProject(null);
              }}
              className="absolute top-5 right-5 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <div className="text-xs font-mono text-cyan-400 mb-1">
                SYSTEM DEEP-DIVE // {activeModalProject.category}
              </div>
              <h2 className="text-2xl font-cyber font-bold text-white">
                {activeModalProject.title}
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                {activeModalProject.subtitle} · {activeModalProject.date}
              </p>
            </div>

            <div className="space-y-3">
              <div className="text-xs font-mono text-slate-300 font-semibold tracking-wider">
                CORE ARCHITECTURAL HIGHLIGHTS
              </div>
              <div className="space-y-2">
                {activeModalProject.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs md:text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {activeModalProject.metrics && (
              <div className="p-3 rounded-lg bg-black/50 border border-cyan-500/20 text-xs font-mono text-cyan-300 flex items-center gap-2">
                <Code2 className="w-4 h-4 text-cyan-400" />
                <span>BENCHMARK // {activeModalProject.metrics}</span>
              </div>
            )}

            <div className="space-y-2">
              <div className="text-xs font-mono text-slate-400">TECHNOLOGY STACK</div>
              <div className="flex flex-wrap gap-1.5">
                {activeModalProject.technologies.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 text-xs font-mono bg-black/50 text-slate-200 rounded border border-slate-700"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
              {activeModalProject.githubUrl && (
                <a
                  href={activeModalProject.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 text-xs font-mono bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded flex items-center gap-2 transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>Inspect on GitHub</span>
                </a>
              )}
              <button
                onClick={() => setActiveModalProject(null)}
                className="px-4 py-2 text-xs font-mono bg-slate-800 hover:bg-slate-700 text-slate-200 rounded transition-colors"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
