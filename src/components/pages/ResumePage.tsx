import React, { useState } from 'react';
import { PORTFOLIO_PROFILE, EDUCATION_LIST, PROJECTS, SKILL_CATEGORIES, HACKATHON_ACHIEVEMENT, CERTIFICATES } from '../../data/portfolioData';
import { Download, Printer, Copy, Check, FileText, ExternalLink } from 'lucide-react';
import { sound } from '../../utils/audio';

export const ResumePage: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handlePrint = () => {
    sound.playClick();
    window.print();
  };

  const generateMarkdownResume = () => {
    return `# ${PORTFOLIO_PROFILE.name}
**Positioning:** ${PORTFOLIO_PROFILE.positioning}
**Email:** ${PORTFOLIO_PROFILE.email} | **Phone:** +91 ${PORTFOLIO_PROFILE.phone}
**Location:** ${PORTFOLIO_PROFILE.location}
**LinkedIn:** ${PORTFOLIO_PROFILE.socials.linkedin} | **GitHub:** ${PORTFOLIO_PROFILE.socials.github}

---

## PROFESSIONAL SUMMARY
${PORTFOLIO_PROFILE.bio}

---

## TECHNICAL SKILLS
${SKILL_CATEGORIES.map(c => `- **${c.name}:** ${c.skills.map(s => s.name).join(', ')}`).join('\n')}

---

## FEATURED PROJECTS
${PROJECTS.map(p => `### ${p.title} (${p.date})
*Category:* ${p.category}
*Technologies:* ${p.technologies.join(', ')}
${p.githubUrl ? `*GitHub:* ${p.githubUrl}\n` : ''}
${p.highlights.map(h => `- ${h}`).join('\n')}
`).join('\n')}

---

## EDUCATION
${EDUCATION_LIST.map(e => `### ${e.degree}
**${e.institution}** | ${e.period}
${e.scoreLabel}: ${e.score} | Location: ${e.location}
${e.details.map(d => `- ${d}`).join('\n')}
`).join('\n')}

---

## HACKATHONS & AWARDS
### ${HACKATHON_ACHIEVEMENT.title} (${HACKATHON_ACHIEVEMENT.date})
**${HACKATHON_ACHIEVEMENT.event}**
- ${HACKATHON_ACHIEVEMENT.achievement}
- ${HACKATHON_ACHIEVEMENT.description}

---

## CERTIFICATIONS
${CERTIFICATES.map(c => `- ${c.title} — ${c.issuer} ${c.verificationUrl ? `[Verify](${c.verificationUrl})` : ''}`).join('\n')}
`;
  };

  const handleCopyMarkdown = () => {
    sound.playClick();
    const md = generateMarkdownResume();
    navigator.clipboard.writeText(md).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleDownloadMarkdown = () => {
    sound.playClick();
    const md = generateMarkdownResume();
    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Resume_Nalluri_Kausik_${new Date().getFullYear()}.md`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10 pb-20">
      {/* Header and Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-800">
        <div>
          <div className="text-xs font-mono text-cyan-400 mb-1">
            NODE // RESUME_04 · CURRICULUM VITAE
          </div>
          <h1 className="text-3xl md:text-5xl font-cyber font-bold tracking-wider text-white">
            CURRICULUM VITAE
          </h1>
          <p className="text-sm text-slate-400 mt-2">
            Structured resume document formatted for executive review and printable output.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-2.5 w-full sm:w-auto">
          <button
            onClick={handleCopyMarkdown}
            className="flex-1 sm:flex-none px-3.5 py-2 text-xs font-mono bg-slate-900/90 hover:bg-slate-800 text-slate-200 rounded-lg border border-slate-700/80 hover:border-cyan-500/50 flex items-center justify-center gap-1.5 transition-all active:scale-95 shadow-[0_2px_10px_rgba(0,0,0,0.5)]"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> : <Copy className="w-3.5 h-3.5 text-slate-400 shrink-0" />}
            <span className="whitespace-nowrap">{copied ? 'Copied MD' : 'Copy Text'}</span>
          </button>

          <button
            onClick={handleDownloadMarkdown}
            className="flex-1 sm:flex-none px-3.5 py-2 text-xs font-mono bg-slate-900/90 hover:bg-cyan-950/40 text-cyan-300 rounded-lg border border-cyan-500/40 hover:border-cyan-400 flex items-center justify-center gap-1.5 transition-all active:scale-95 shadow-[0_2px_12px_rgba(0,240,255,0.12)]"
          >
            <Download className="w-3.5 h-3.5 shrink-0" />
            <span className="whitespace-nowrap">Download .MD</span>
          </button>

          <button
            onClick={handlePrint}
            className="w-full sm:w-auto px-4 py-2 text-xs font-mono font-bold bg-gradient-to-r from-cyan-500 to-cyan-400 hover:from-cyan-400 hover:to-cyan-300 text-black rounded-lg flex items-center justify-center gap-1.5 transition-all shadow-[0_0_15px_rgba(0,240,255,0.35)] active:scale-95"
          >
            <Printer className="w-3.5 h-3.5 shrink-0" />
            <span className="whitespace-nowrap">Print / PDF</span>
          </button>
        </div>
      </div>

      {/* Styled Printable Resume Document */}
      <div className="p-4 sm:p-8 md:p-12 rounded-xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-8 print:p-0 print:border-none print:bg-white print:text-black">
        {/* Header Block */}
        <div className="border-b border-slate-800 pb-6 print:border-black">
          <h2 className="text-3xl md:text-4xl font-cyber font-bold text-white print:text-black">
            {PORTFOLIO_PROFILE.name}
          </h2>
          <div className="text-base text-cyan-400 font-medium print:text-slate-800 mt-1">
            {PORTFOLIO_PROFILE.positioning}
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs font-mono text-slate-400 print:text-slate-700 mt-3">
            <span>Email: {PORTFOLIO_PROFILE.email}</span>
            <span>·</span>
            <span>Phone: +91 {PORTFOLIO_PROFILE.phone}</span>
            <span>·</span>
            <span>Location: {PORTFOLIO_PROFILE.location}</span>
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs font-mono text-slate-400 print:text-slate-700 mt-1">
            <a href={PORTFOLIO_PROFILE.socials.linkedin} target="_blank" rel="noreferrer" className="text-cyan-400 underline print:text-black">
              LinkedIn
            </a>
            <span>·</span>
            <a href={PORTFOLIO_PROFILE.socials.github} target="_blank" rel="noreferrer" className="text-cyan-400 underline print:text-black">
              GitHub (nalluri-sys)
            </a>
          </div>
        </div>

        {/* Summary */}
        <div className="space-y-2">
          <h3 className="text-xs font-mono text-cyan-400 print:text-black font-bold uppercase tracking-wider">
            Professional Summary
          </h3>
          <p className="text-xs md:text-sm text-slate-300 print:text-black leading-relaxed">
            {PORTFOLIO_PROFILE.bio}
          </p>
        </div>

        {/* Skills Matrix */}
        <div className="space-y-3">
          <h3 className="text-xs font-mono text-cyan-400 print:text-black font-bold uppercase tracking-wider">
            Technical Skills
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            {SKILL_CATEGORIES.map((cat) => (
              <div key={cat.id} className="p-3 rounded bg-black/40 border border-slate-800 print:border-slate-300 print:bg-white">
                <span className="font-semibold text-white print:text-black block mb-1">
                  {cat.name}:
                </span>
                <span className="text-slate-400 print:text-slate-700 leading-relaxed">
                  {cat.skills.map((s) => s.name).join(', ')}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Featured Projects */}
        <div className="space-y-4">
          <h3 className="text-xs font-mono text-cyan-400 print:text-black font-bold uppercase tracking-wider">
            Key Software & AI Projects
          </h3>
          <div className="space-y-4">
            {PROJECTS.map((proj) => (
              <div key={proj.id} className="space-y-1.5 text-xs">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <div className="font-bold text-white print:text-black text-sm">
                    {proj.title}
                  </div>
                  <div className="font-mono text-slate-400 print:text-slate-600">
                    {proj.date}
                  </div>
                </div>
                <div className="font-mono text-cyan-300 print:text-slate-800 text-[11px]">
                  Technologies: {proj.technologies.join(', ')}
                </div>
                <ul className="list-disc list-inside space-y-1 text-slate-300 print:text-slate-800 pl-1">
                  {proj.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div className="space-y-4">
          <h3 className="text-xs font-mono text-cyan-400 print:text-black font-bold uppercase tracking-wider">
            Education
          </h3>
          <div className="space-y-3">
            {EDUCATION_LIST.map((edu) => (
              <div key={edu.id} className="space-y-1 text-xs">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <div className="font-bold text-white print:text-black">
                    {edu.degree} — {edu.institution}
                  </div>
                  <div className="font-mono text-cyan-400 print:text-black">
                    {edu.scoreLabel}: {edu.score}
                  </div>
                </div>
                <div className="text-slate-400 print:text-slate-600 text-[11px] font-mono">
                  {edu.period} · {edu.location}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hackathon Achievement */}
        <div className="space-y-2">
          <h3 className="text-xs font-mono text-cyan-400 print:text-black font-bold uppercase tracking-wider">
            Hackathons & Honors
          </h3>
          <div className="text-xs space-y-1">
            <div className="font-bold text-white print:text-black">
              {HACKATHON_ACHIEVEMENT.title} — {HACKATHON_ACHIEVEMENT.event} ({HACKATHON_ACHIEVEMENT.date})
            </div>
            <div className="text-cyan-300 print:text-slate-800 font-mono text-[11px]">
              {HACKATHON_ACHIEVEMENT.achievement}
            </div>
            <p className="text-slate-300 print:text-slate-800">
              {HACKATHON_ACHIEVEMENT.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
