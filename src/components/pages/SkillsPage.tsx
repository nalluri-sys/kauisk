import React, { useState } from 'react';
import { SKILL_CATEGORIES } from '../../data/portfolioData';
import { Cpu, Sparkles, Code2, Database, Terminal, BarChart3, Search } from 'lucide-react';
import { sound } from '../../utils/audio';

const iconMap: Record<string, React.ElementType> = {
  Cpu,
  Sparkles,
  Code2,
  Database,
  Terminal,
  BarChart3,
};

export const SkillsPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState<string>('all');

  const filteredCategories = SKILL_CATEGORIES.map((cat) => {
    const matchingSkills = cat.skills.filter((s) => {
      const matchSearch =
        search === '' ||
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.tags?.some((t) => t.toLowerCase().includes(search.toLowerCase()));
      return matchSearch;
    });
    return { ...cat, skills: matchingSkills };
  }).filter((cat) => {
    if (selectedCat !== 'all' && cat.id !== selectedCat) return false;
    return cat.skills.length > 0;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-800">
        <div>
          <div className="text-xs font-mono text-cyan-400 mb-1">
            NODE // SKILLS_07 · NEURAL & TECHNICAL REPERTOIRE
          </div>
          <h1 className="text-3xl md:text-5xl font-cyber font-bold tracking-wider text-white">
            TECHNICAL MATRIX
          </h1>
          <p className="text-sm text-slate-400 mt-2">
            AI Engineering, Machine Learning, Generative AI, Full-Stack Architecture, and Analytics.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search skills, tools, frameworks..."
            className="w-full pl-10 pr-4 py-2.5 text-xs font-mono bg-slate-900/90 border border-slate-800 focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(0,240,255,0.2)] focus:outline-none rounded-xl text-slate-100 placeholder:text-slate-500 transition-all"
          />
        </div>
      </div>

      {/* Category Filter Pills (Horizontal scrollable with smooth scrollbar-none) */}
      <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 scrollbar-none">
        <button
          onClick={() => {
            sound.playClick();
            setSelectedCat('all');
          }}
          className={`px-3.5 py-1.5 text-xs font-mono rounded-lg transition-all whitespace-nowrap shrink-0 active:scale-95 ${
            selectedCat === 'all'
              ? 'bg-cyan-500 text-black font-bold border border-cyan-300 shadow-[0_0_15px_rgba(0,240,255,0.4)]'
              : 'bg-slate-900/70 text-slate-400 border border-slate-800 hover:text-white hover:border-slate-700'
          }`}
        >
          All Matrices
        </button>
        {SKILL_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              sound.playClick();
              setSelectedCat(cat.id);
            }}
            className={`px-3.5 py-1.5 text-xs font-mono rounded-lg transition-all whitespace-nowrap shrink-0 active:scale-95 ${
              selectedCat === cat.id
                ? 'bg-cyan-500 text-black font-bold border border-cyan-300 shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                : 'bg-slate-900/70 text-slate-400 border border-slate-800 hover:text-white hover:border-slate-700'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {filteredCategories.map((category) => {
          const Icon = iconMap[category.icon] || Cpu;
          return (
            <div
              key={category.id}
              className="p-4 sm:p-6 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/30 transition-all space-y-5"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded bg-cyan-950/40 border border-cyan-500/30 text-cyan-400">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-cyber font-bold text-white">
                      {category.name}
                    </h2>
                    <span className="text-[11px] font-mono text-cyan-400">
                      {category.skills.length} competencies indexed
                    </span>
                  </div>
                </div>
              </div>

              {/* Skill Bars */}
              <div className="space-y-4">
                {category.skills.map((skill) => (
                  <div key={skill.name} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-slate-200 font-medium">{skill.name}</span>
                      <span className="text-cyan-400 font-semibold">{skill.level}%</span>
                    </div>

                    {/* Progress Track */}
                    <div className="h-1.5 w-full bg-slate-800/80 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-600 via-cyan-400 to-sky-300 rounded-full transition-all duration-700"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>

                    {/* Tags */}
                    {skill.tags && (
                      <div className="flex flex-wrap gap-1 pt-0.5">
                        {skill.tags.map((t) => (
                          <span
                            key={t}
                            className="text-[10px] font-mono text-slate-400 px-1.5 py-0.2 bg-black/30 rounded border border-slate-800/60"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
