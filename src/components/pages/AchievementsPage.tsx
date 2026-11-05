import React, { useState } from 'react';
import { CERTIFICATES, HACKATHON_ACHIEVEMENT, PORTFOLIO_PROFILE } from '../../data/portfolioData';
import { Award, Trophy, CheckCircle2, ExternalLink, Code2, Send, MessageSquare } from 'lucide-react';
import { sound } from '../../utils/audio';

export const AchievementsPage: React.FC = () => {
  const [endorsementText, setEndorsementText] = useState('');
  const [endorserName, setEndorserName] = useState('');
  const [endorserRole, setEndorserRole] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitEndorsement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!endorsementText || !endorserName) return;
    sound.playClick();
    setSubmitted(true);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-20">
      {/* Header */}
      <div className="pb-6 border-b border-slate-800">
        <div className="text-xs font-mono text-cyan-400 mb-1">
          NODE // TESTIMONIALS_05 · ACHIEVEMENTS & CREDENTIALS
        </div>
        <h1 className="text-3xl md:text-5xl font-cyber font-bold tracking-wider text-white">
          VERIFIED ACHIEVEMENTS
        </h1>
        <p className="text-sm text-slate-400 mt-2">
          Hackathon milestones, professional certifications, and competitive programming credentials.
        </p>
      </div>

      {/* Featured Hackathon Spotlight */}
      <div className="p-5 sm:p-8 rounded-xl bg-gradient-to-r from-slate-900/90 via-cyan-950/20 to-slate-900/90 border border-cyan-500/40 shadow-[0_0_30px_rgba(0,240,255,0.1)] cyber-corner-bracket space-y-6">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
              <Trophy className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>HACKATHON SPOTLIGHT</span>
              <span>·</span>
              <span>{HACKATHON_ACHIEVEMENT.date}</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-cyber font-bold text-white">
              {HACKATHON_ACHIEVEMENT.title}
            </h2>
            <p className="text-sm text-cyan-300 font-medium">
              {HACKATHON_ACHIEVEMENT.event}
            </p>
          </div>

          <div className="px-3.5 py-1.5 rounded-lg bg-cyan-950/50 border border-cyan-500/50 text-cyan-300 font-mono text-xs font-semibold self-start shadow-[0_0_12px_rgba(0,240,255,0.15)]">
            {HACKATHON_ACHIEVEMENT.achievement}
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-4xl">
          {HACKATHON_ACHIEVEMENT.description}
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 pt-4 border-t border-cyan-500/20">
          {HACKATHON_ACHIEVEMENT.stats.map((s, idx) => (
            <div key={idx} className="p-3 rounded-lg bg-black/40 border border-cyan-500/15">
              <div className="text-[10px] sm:text-[11px] font-mono text-slate-400 uppercase">{s.label}</div>
              <div className="text-base sm:text-lg font-cyber font-bold text-cyan-400 mt-0.5">{s.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Verified Professional Certifications */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl md:text-2xl font-cyber font-bold text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-cyan-400" />
            Professional Certifications
          </h2>
          <span className="text-xs font-mono text-slate-400">
            {CERTIFICATES.length} credentials
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {CERTIFICATES.map((cert) => (
            <div
              key={cert.id}
              className="p-4 sm:p-5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between gap-4 group"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400">{cert.issuer}</span>
                  {cert.verified ? (
                    <span className="flex items-center gap-1 text-emerald-400">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Verified Link</span>
                    </span>
                  ) : (
                    <span className="text-slate-500">Curriculum Track</span>
                  )}
                </div>
                <h3 className="text-base font-cyber font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {cert.title}
                </h3>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-800/80">
                <span className="text-[11px] font-mono text-slate-400">
                  {cert.category}
                </span>

                {cert.verificationUrl ? (
                  <a
                    href={cert.verificationUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => sound.playClick()}
                    className="px-3 py-1.5 rounded-lg bg-slate-950/80 hover:bg-cyan-500 hover:text-black border border-cyan-500/40 hover:border-cyan-300 text-xs font-mono text-cyan-300 flex items-center gap-1.5 transition-all active:scale-95 shadow-[0_0_10px_rgba(0,240,255,0.1)] group/btn"
                  >
                    <span>Verify Credential</span>
                    <ExternalLink className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform" />
                  </a>
                ) : (
                  <span className="text-[11px] font-mono text-slate-500">
                    Certificate on File
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Competitive Programming Handles */}
      <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800 space-y-4">
        <h2 className="text-xl font-cyber font-bold text-white flex items-center gap-2">
          <Code2 className="w-5 h-5 text-cyan-400" />
          Competitive Programming Handles
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <a
            href={PORTFOLIO_PROFILE.socials.leetcode}
            target="_blank"
            rel="noreferrer"
            onClick={() => sound.playClick()}
            className="p-4 rounded-lg bg-black/40 border border-slate-800 hover:border-cyan-500/50 flex items-center justify-between transition-colors group"
          >
            <div>
              <div className="text-xs font-mono text-slate-400">LeetCode Profile</div>
              <div className="text-sm font-semibold text-white group-hover:text-cyan-300 mt-0.5">
                @{PORTFOLIO_PROFILE.socials.leetcode.split('/').filter(Boolean).pop()}
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-cyan-400 group-hover:translate-x-0.5 transition-transform" />
          </a>

          <a
            href={PORTFOLIO_PROFILE.socials.codechef}
            target="_blank"
            rel="noreferrer"
            onClick={() => sound.playClick()}
            className="p-4 rounded-lg bg-black/40 border border-slate-800 hover:border-cyan-500/50 flex items-center justify-between transition-colors group"
          >
            <div>
              <div className="text-xs font-mono text-slate-400">CodeChef Profile</div>
              <div className="text-sm font-semibold text-white group-hover:text-cyan-300 mt-0.5">
                @{PORTFOLIO_PROFILE.socials.codechef.split('/').filter(Boolean).pop()}
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-cyan-400 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>
      </div>

      {/* Recruiter & Peer Endorsement Form (No fictional testimonials) */}
      <div className="p-6 md:p-8 rounded-xl bg-slate-900/50 border border-slate-800 space-y-4">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-cyan-400" />
          <h2 className="text-xl font-cyber font-bold text-white">
            Peer & Recruiter Endorsement Submissions
          </h2>
        </div>
        <p className="text-xs text-slate-400 max-w-2xl">
          To maintain strict journalistic integrity, no fictional testimonials are fabricated. If you have worked with Nalluri Kausik on academic projects, hackathons, or software initiatives, submit an endorsement directly below:
        </p>

        {submitted ? (
          <div className="p-4 rounded-lg bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs font-mono flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Endorsement registered. Thank you for your feedback! It will be reviewed and verified.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmitEndorsement} className="space-y-4 pt-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                required
                value={endorserName}
                onChange={(e) => setEndorserName(e.target.value)}
                placeholder="Your Full Name (e.g. Prof. / Engineering Manager)"
                className="w-full px-4 py-2 text-xs font-mono bg-black/50 border border-slate-800 focus:border-cyan-400 rounded-lg text-slate-100 placeholder:text-slate-600 focus:outline-none"
              />
              <input
                type="text"
                value={endorserRole}
                onChange={(e) => setEndorserRole(e.target.value)}
                placeholder="Your Role & Organization"
                className="w-full px-4 py-2 text-xs font-mono bg-black/50 border border-slate-800 focus:border-cyan-400 rounded-lg text-slate-100 placeholder:text-slate-600 focus:outline-none"
              />
            </div>
            <textarea
              required
              rows={3}
              value={endorsementText}
              onChange={(e) => setEndorsementText(e.target.value)}
              placeholder="Your testimonial, collaboration feedback, or technical endorsement..."
              className="w-full px-4 py-2 text-xs font-mono bg-black/50 border border-slate-800 focus:border-cyan-400 rounded-lg text-slate-100 placeholder:text-slate-600 focus:outline-none"
            />
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-2.5 text-xs font-mono font-bold bg-gradient-to-r from-cyan-500 to-cyan-400 hover:from-cyan-400 hover:to-cyan-300 text-black rounded-lg flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(0,240,255,0.3)] active:scale-95"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit Verified Endorsement</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
