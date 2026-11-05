import React from 'react';
import { PORTFOLIO_PROFILE } from '../../data/portfolioData';
import { Brain, MapPin, Mail, Phone, Cpu, Terminal, Compass, ArrowUpRight } from 'lucide-react';
import { sound } from '../../utils/audio';

interface BackstagePageProps {
  onNavigate: (nodeId: string) => void;
}

export const BackstagePage: React.FC<BackstagePageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-16 relative">
      {/* Subtle atmospheric ambient glow from portrait */}
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 w-96 h-96 opacity-20 pointer-events-none rounded-full blur-3xl bg-cyan-500/30"
      />

      {/* Header Banner with Main Right-Side Image */}
      <div className="relative p-4 sm:p-6 md:p-8 rounded-xl bg-gradient-to-r from-slate-900/95 via-[#071328]/90 to-slate-900/95 border border-cyan-500/30 shadow-[0_0_35px_rgba(0,240,255,0.12)] cyber-corner-bracket overflow-hidden">
        {/* Ambient subtle image texture reflection */}
        <div
          aria-hidden="true"
          className="absolute -right-16 -top-16 w-80 h-80 opacity-10 pointer-events-none bg-cover bg-top rounded-full blur-xl"
          style={{ backgroundImage: `url('/assets/aistudio/image_b5267d79.png')` }}
        />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
          {/* Left: Bio Info, Subtitles & Direct Channels */}
          <div className="lg:col-span-7 space-y-5">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                <Terminal className="w-3.5 h-3.5" />
                <span>NODE // BACKSTAGE_01</span>
                <span>·</span>
                <span>SYSTEM PROFILE</span>
              </div>
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-cyber font-bold tracking-wider text-white">
                NALLURI KAUSIK
              </h1>
              <p className="text-sm sm:text-base text-cyan-300 font-medium">
                {PORTFOLIO_PROFILE.positioning}
              </p>
            </div>

            {/* Direct Channel Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-3 sm:p-4 rounded-xl bg-black/60 border border-cyan-500/20 text-xs font-mono">
              <div className="flex items-center gap-2 text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span className="truncate">{PORTFOLIO_PROFILE.location}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Mail className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span className="truncate">{PORTFOLIO_PROFILE.email}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Phone className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>+91 {PORTFOLIO_PROFILE.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <Compass className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Timezone: {PORTFOLIO_PROFILE.timezone}</span>
              </div>
            </div>

            {/* Quick Badges */}
            <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-mono">
              <span className="px-2.5 py-1 rounded-md bg-cyan-950/40 text-cyan-300 border border-cyan-500/30">
                B.Tech CSE @ VVIT
              </span>
              <span className="px-2.5 py-1 rounded-md bg-slate-900 text-slate-300 border border-slate-800">
                Quantathon Finalist
              </span>
              <span className="px-2.5 py-1 rounded-md bg-slate-900 text-slate-300 border border-slate-800">
                GenAI & LLM Pipelines
              </span>
            </div>
          </div>

          {/* Right: Main Featured Developer Portrait */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[240px] sm:max-w-[280px] md:max-w-[320px] rounded-xl overflow-hidden border-2 border-cyan-500/40 bg-slate-950 shadow-[0_0_30px_rgba(0,240,255,0.2)] cyber-corner-bracket group">
              {/* Status Header Chip */}
              <div className="absolute top-2.5 left-2.5 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/90 border border-cyan-400/40 text-[10px] font-mono text-cyan-300 shadow-md">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span>OPERATOR // ACTIVE</span>
              </div>

              {/* Portrait Image */}
              <div className="relative overflow-hidden aspect-[9/10]">
                <img
                  src="/assets/aistudio/image_b5267d79.png"
                  alt="Nalluri Kausik — Anime Developer Portrait"
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  loading="eager"
                />
                {/* Subtle bottom gradient scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent opacity-60" />
              </div>

              {/* Tech Label Footer */}
              <div className="p-2 sm:p-2.5 bg-slate-950/90 border-t border-cyan-500/30 flex items-center justify-between text-[11px] font-mono">
                <span className="text-slate-300 font-semibold">NALLURI KAUSIK</span>
                <span className="text-cyan-400 font-bold">AI ENGINEER</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Narrative & Engineering Mindset */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="p-4 sm:p-6 rounded-xl bg-slate-900/60 border border-slate-800">
            <h2 className="text-lg sm:text-xl font-cyber font-bold text-white mb-3 sm:mb-4 flex items-center gap-2">
              <Brain className="w-5 h-5 text-cyan-400" />
              Engineering Philosophy & Background
            </h2>
            <div className="space-y-3 sm:space-y-4 text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed">
              <p>
                {PORTFOLIO_PROFILE.bio}
              </p>
              <p>
                My technical approach centers on bridging the gap between theoretical predictive algorithms and high-reliability, production-ready systems. From optimizing biomarker discovery via QUBO (Quadratic Unconstrained Binary Optimization) algorithms in hackathons to deploying containerized full-stack e-commerce fraud prevention networks, I treat software engineering as an exact, data-grounded science.
              </p>
              <p>
                Whether architecting autonomous LLM agent workflows with LangChain, training computer vision classifiers, or writing type-safe distributed APIs with Spring Boot and Node.js, my goal is always measurable reliability, clean modular separation, and zero-compromise performance.
              </p>
            </div>
          </div>

          {/* Quick Action Matrix */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
            <button
              onClick={() => { sound.playClick(); onNavigate('work'); }}
              className="p-3.5 sm:p-4 rounded-xl bg-gradient-to-br from-slate-900/90 to-cyan-950/20 border border-cyan-500/30 hover:border-cyan-400 hover:bg-cyan-950/30 text-left transition-all group shadow-md active:scale-95 cursor-pointer"
            >
              <div className="text-xs font-mono text-cyan-400 group-hover:translate-x-1 transition-transform flex items-center justify-between">
                <span className="font-bold tracking-wider">VIEW WORKS</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
              <div className="text-xs text-slate-300 font-semibold mt-1">7 Featured Systems</div>
            </button>

            <button
              onClick={() => { sound.playClick(); onNavigate('skills'); }}
              className="p-3.5 sm:p-4 rounded-xl bg-gradient-to-br from-slate-900/90 to-cyan-950/20 border border-cyan-500/30 hover:border-cyan-400 hover:bg-cyan-950/30 text-left transition-all group shadow-md active:scale-95 cursor-pointer"
            >
              <div className="text-xs font-mono text-cyan-400 group-hover:translate-x-1 transition-transform flex items-center justify-between">
                <span className="font-bold tracking-wider">TECH MATRIX</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
              <div className="text-xs text-slate-300 font-semibold mt-1">AI, GenAI & Full-Stack</div>
            </button>

            <button
              onClick={() => { sound.playClick(); onNavigate('contact'); }}
              className="p-3.5 sm:p-4 rounded-xl bg-gradient-to-br from-slate-900/90 to-cyan-950/20 border border-cyan-500/30 hover:border-cyan-400 hover:bg-cyan-950/30 text-left transition-all group shadow-md active:scale-95 cursor-pointer"
            >
              <div className="text-xs font-mono text-cyan-400 group-hover:translate-x-1 transition-transform flex items-center justify-between">
                <span className="font-bold tracking-wider">CONNECT</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
              <div className="text-xs text-slate-300 font-semibold mt-1">Open to Opportunities</div>
            </button>
          </div>
        </div>

        {/* Core Strengths Card Column */}
        <div className="space-y-4">
          <div className="text-xs font-mono text-slate-400 tracking-wider">
            PRIMARY COMPETENCIES
          </div>

          <div className="space-y-3">
            {PORTFOLIO_PROFILE.strengths.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-lg bg-slate-900/50 border border-slate-800 hover:border-cyan-500/40 transition-colors"
              >
                <div className="flex items-center gap-2 text-cyan-300 font-cyber font-bold text-base">
                  <Cpu className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>{item.title}</span>
                </div>
                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
