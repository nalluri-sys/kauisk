import React, { useState, useEffect } from 'react';
import { PORTFOLIO_PROFILE } from '../../data/portfolioData';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, Copy, Check, ExternalLink, AlertCircle } from 'lucide-react';
import { sound } from '../../utils/audio';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

  // Live IST Time clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format to IST
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      setCurrentTime(now.toLocaleTimeString('en-US', options) + ' IST (UTC+5:30)');
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errs.name = 'Full name must be at least 2 characters.';
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'A valid email address is required.';
    }
    if (!formData.subject.trim() || formData.subject.trim().length < 3) {
      errs.subject = 'Subject must be at least 3 characters.';
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errs.message = 'Message must be at least 10 characters.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }

    sound.playClick();
    setIsSubmitting(true);

    // Simulate sending transmission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
      sound.playReturn();
    }, 1200);
  };

  const copyEmail = () => {
    sound.playClick();
    navigator.clipboard.writeText(PORTFOLIO_PROFILE.email).then(() => {
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-20">
      {/* Header */}
      <div className="pb-6 border-b border-slate-800">
        <div className="text-xs font-mono text-cyan-400 mb-1">
          NODE // CONTACT_03 · SECURE TRANSMISSION BEACON
        </div>
        <h1 className="text-3xl md:text-5xl font-cyber font-bold tracking-wider text-white">
          COMMUNICATION TERMINAL
        </h1>
        <p className="text-sm text-slate-400 mt-2">
          Direct communication channels, recruitment inquiries, and encrypted dispatch terminal.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Left Column: Direct Credentials & Status */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800 space-y-4 cyber-box-hover">
            <div className="text-xs font-mono text-cyan-400 font-semibold tracking-wider">
              DIRECT CHANNELS
            </div>

            <div className="space-y-4 text-xs font-mono">
              {/* Email */}
              <div className="p-3.5 rounded-lg bg-black/40 border border-slate-800/80 space-y-1.5">
                <div className="text-slate-400 flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-cyan-400" />
                  <span>PRIMARY INBOX</span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-white text-xs font-semibold truncate">
                    {PORTFOLIO_PROFILE.email}
                  </span>
                  <button
                    onClick={copyEmail}
                    className="px-2.5 py-1.5 rounded-lg bg-slate-850 hover:bg-cyan-950/40 border border-slate-700/80 hover:border-cyan-500/40 text-cyan-400 hover:text-white transition-all shrink-0 flex items-center gap-1 active:scale-90"
                    title="Copy Email"
                  >
                    {emailCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-[10px] text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span className="text-[10px]">Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Phone */}
              <div className="p-3.5 rounded-lg bg-black/40 border border-slate-800/80 space-y-1">
                <div className="text-slate-400 flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-cyan-400" />
                  <span>DIRECT LINE</span>
                </div>
                <div className="text-white text-xs font-semibold">
                  +91 {PORTFOLIO_PROFILE.phone}
                </div>
              </div>

              {/* Location */}
              <div className="p-3.5 rounded-lg bg-black/40 border border-slate-800/80 space-y-1">
                <div className="text-slate-400 flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                  <span>BASE LOCATION</span>
                </div>
                <div className="text-white text-xs font-semibold">
                  {PORTFOLIO_PROFILE.location}
                </div>
              </div>

              {/* Live Clock */}
              <div className="p-3.5 rounded-lg bg-black/40 border border-slate-800/80 space-y-1">
                <div className="text-slate-400 flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" />
                  <span>CURRENT TIME</span>
                </div>
                <div className="text-cyan-300 text-xs font-semibold">
                  {currentTime || 'Calculating IST...'}
                </div>
              </div>
            </div>
          </div>

          {/* Social Links Matrix */}
          <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="text-xs font-mono text-cyan-400 font-semibold tracking-wider">
              PUBLIC PROFILES
            </div>

            <div className="space-y-2">
              <a
                href={PORTFOLIO_PROFILE.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                onClick={() => sound.playClick()}
                className="p-3 rounded-lg bg-black/30 border border-slate-800 hover:border-cyan-500/40 flex items-center justify-between text-xs font-mono transition-colors group"
              >
                <span className="text-slate-300 group-hover:text-white">LinkedIn / in/nalluri-kausik</span>
                <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
              </a>

              <a
                href={PORTFOLIO_PROFILE.socials.github}
                target="_blank"
                rel="noreferrer"
                onClick={() => sound.playClick()}
                className="p-3 rounded-lg bg-black/30 border border-slate-800 hover:border-cyan-500/40 flex items-center justify-between text-xs font-mono transition-colors group"
              >
                <span className="text-slate-300 group-hover:text-white">GitHub / nalluri-sys</span>
                <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Encrypted Message Dispatch Terminal */}
        <div className="lg:col-span-3">
          <div className="p-6 md:p-8 rounded-xl bg-slate-900/80 border border-cyan-500/30 shadow-[0_0_30px_rgba(0,240,255,0.06)] cyber-corner-bracket space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <h2 className="text-xl font-cyber font-bold text-white">
                  TRANSMISSION DISPATCH
                </h2>
                <p className="text-xs text-slate-400">
                  Send a message directly or open your preferred mail client.
                </p>
              </div>
              <div className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/40 text-emerald-400">
                CHANNEL ONLINE
              </div>
            </div>

            {isSent ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-12 h-12 mx-auto rounded-full bg-cyan-950/50 border border-cyan-400 flex items-center justify-center text-cyan-400 shadow-[0_0_20px_rgba(0,240,255,0.3)]">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-cyber font-bold text-white">
                  TRANSMISSION CONFIRMED
                </h3>
                <p className="text-xs text-slate-300 max-w-md mx-auto">
                  Thank you, {formData.name}. Your message has been prepared. A mailto dispatch link is also ready should you wish to send via your local client:
                </p>
                <div className="pt-2 flex flex-wrap justify-center gap-3">
                  <a
                    href={`mailto:${PORTFOLIO_PROFILE.email}?subject=${encodeURIComponent(
                      formData.subject
                    )}&body=${encodeURIComponent(
                      `From: ${formData.name} (${formData.email})\n\n${formData.message}`
                    )}`}
                    onClick={() => sound.playClick()}
                    className="px-5 py-2.5 text-xs font-mono font-bold bg-gradient-to-r from-cyan-500 to-cyan-400 hover:from-cyan-400 hover:to-cyan-300 text-black rounded-lg transition-all shadow-[0_0_15px_rgba(0,240,255,0.3)] inline-flex items-center gap-2 active:scale-95"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Open in Default Mail Client</span>
                  </a>
                  <button
                    onClick={() => {
                      setIsSent(false);
                      setFormData({ name: '', email: '', subject: '', message: '' });
                    }}
                    className="px-4 py-2.5 text-xs font-mono bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 rounded-lg transition-all active:scale-95"
                  >
                    Send Another
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[11px] font-mono text-slate-300">
                      IDENTIFIER / NAME *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Elena Rostova"
                      className={`w-full px-3.5 py-2 text-xs font-mono bg-black/50 rounded-lg text-slate-100 placeholder:text-slate-600 border focus:outline-none ${
                        errors.name ? 'border-red-500/80' : 'border-slate-800 focus:border-cyan-400'
                      }`}
                    />
                    {errors.name && (
                      <div className="flex items-center gap-1 text-[10px] font-mono text-red-400 mt-0.5">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.name}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-mono text-slate-300">
                      CONTACT FREQUENCY / EMAIL *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. recruiter@company.com"
                      className={`w-full px-3.5 py-2 text-xs font-mono bg-black/50 rounded-lg text-slate-100 placeholder:text-slate-600 border focus:outline-none ${
                        errors.email ? 'border-red-500/80' : 'border-slate-800 focus:border-cyan-400'
                      }`}
                    />
                    {errors.email && (
                      <div className="flex items-center gap-1 text-[10px] font-mono text-red-400 mt-0.5">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.email}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Subject */}
                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-slate-300">
                    TRANSMISSION PROTOCOL / SUBJECT *
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. Full-Time AI Engineering Opportunity / Project Inquiry"
                    className={`w-full px-3.5 py-2 text-xs font-mono bg-black/50 rounded-lg text-slate-100 placeholder:text-slate-600 border focus:outline-none ${
                      errors.subject ? 'border-red-500/80' : 'border-slate-800 focus:border-cyan-400'
                    }`}
                  />
                  {errors.subject && (
                    <div className="flex items-center gap-1 text-[10px] font-mono text-red-400 mt-0.5">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.subject}</span>
                    </div>
                  )}
                </div>

                {/* Message */}
                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-slate-300">
                    PAYLOAD / MESSAGE *
                  </label>
                  <textarea
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe project specifications, technical role requirements, or collaboration proposals..."
                    className={`w-full px-3.5 py-2 text-xs font-mono bg-black/50 rounded-lg text-slate-100 placeholder:text-slate-600 border focus:outline-none ${
                      errors.message ? 'border-red-500/80' : 'border-slate-800 focus:border-cyan-400'
                    }`}
                  />
                  {errors.message && (
                    <div className="flex items-center gap-1 text-[10px] font-mono text-red-400 mt-0.5">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.message}</span>
                    </div>
                  )}
                </div>

                {/* Submit Row */}
                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="text-[11px] font-mono text-slate-500">
                    * Required parameters
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-7 py-3 text-xs font-cyber font-bold tracking-wider bg-gradient-to-r from-cyan-500 via-cyan-400 to-sky-300 hover:from-cyan-400 hover:to-sky-200 text-black rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(0,240,255,0.35)] active:scale-95 disabled:opacity-50"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isSubmitting ? 'DISPATCHING...' : 'TRANSMIT MESSAGE'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
