import React from 'react';
import { EDUCATION_LIST } from '../../data/portfolioData';
import { GraduationCap, Calendar, MapPin, Award, CheckCircle2 } from 'lucide-react';

export const ExperiencePage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-20">
      {/* Header */}
      <div className="pb-6 border-b border-slate-800">
        <div className="text-xs font-mono text-cyan-400 mb-1">
          NODE // EXPERIENCE_06 · CHRONOLOGICAL TIMELINE
        </div>
        <h1 className="text-3xl md:text-5xl font-cyber font-bold tracking-wider text-white">
          EDUCATION & MILESTONES
        </h1>
        <p className="text-sm text-slate-400 mt-2">
          Academic foundations, computer science training, and specialized technical coursework.
        </p>
      </div>

      {/* Timeline Track */}
      <div className="relative pl-6 md:pl-10 space-y-10 before:content-[''] before:absolute before:left-2 md:before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-gradient-to-b before:from-cyan-500 before:via-cyan-500/40 before:to-transparent">
        {EDUCATION_LIST.map((item, idx) => (
          <div key={item.id} className="relative group">
            {/* Timeline node icon */}
            <div className="absolute -left-6 md:-left-10 top-1.5 w-6 h-6 md:w-8 md:h-8 rounded-full bg-slate-900 border-2 border-cyan-400 flex items-center justify-center text-cyan-400 shadow-[0_0_12px_rgba(0,240,255,0.4)]">
              <GraduationCap className="w-3.5 h-3.5 md:w-4 md:h-4" />
            </div>

            {/* Card Content */}
            <div className="p-4 sm:p-6 md:p-8 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 transition-all cyber-box-hover space-y-4">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{item.period}</span>
                    <span>·</span>
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span className="text-slate-400">{item.location}</span>
                  </div>
                  <h2 className="text-xl md:text-2xl font-cyber font-bold text-white">
                    {item.degree}
                  </h2>
                  <div className="text-sm text-cyan-300 font-medium mt-0.5">
                    {item.institution}
                  </div>
                </div>

                {/* Score Badge */}
                <div className="self-start px-3.5 py-1.5 rounded-lg bg-cyan-950/40 border border-cyan-500/40 text-right">
                  <div className="text-[10px] font-mono text-slate-400 uppercase">
                    {item.scoreLabel}
                  </div>
                  <div className="text-base font-mono font-bold text-cyan-400">
                    {item.score}
                  </div>
                </div>
              </div>

              {/* Details List */}
              <div className="space-y-2 pt-2 border-t border-slate-800/80">
                {item.details.map((detail, dIdx) => (
                  <div key={dIdx} className="flex items-start gap-2.5 text-xs md:text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{detail}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
