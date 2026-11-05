import React, { useState } from 'react';
import { PORTFOLIO_PROFILE, WORLD_NODES } from '../../data/portfolioData';
import {
  Linkedin,
  Github,
  Mail,
  ArrowLeft,
  Volume2,
  VolumeX,
  CheckSquare,
  Square,
  Sparkles,
  MessageSquare,
  Eye,
  EyeOff,
  X
} from 'lucide-react';
import { sound } from '../../utils/audio';

interface CyberHUDProps {
  activeNodeId: string | null;
  hoveredNodeId: string | null;
  fps: number;
  highQuality: boolean;
  soundEnabled: boolean;
  onToggleHighQuality: () => void;
  onToggleSound: () => void;
  onSelectNode: (nodeId: string | null) => void;
}

export const CyberHUD: React.FC<CyberHUDProps> = ({
  activeNodeId,
  hoveredNodeId,
  fps,
  highQuality,
  soundEnabled,
  onToggleHighQuality,
  onToggleSound,
  onSelectNode,
}) => {
  const [showToast, setShowToast] = useState<string | null>(null);
  const [hideHud, setHideHud] = useState(false);

  const activeNode = activeNodeId ? WORLD_NODES.find((n) => n.id === activeNodeId) : null;
  const hoveredNode = hoveredNodeId ? WORLD_NODES.find((n) => n.id === hoveredNodeId) : null;

  const handleLightModeClick = () => {
    sound.playHover();
    setShowToast('CYBER PROTOCOL: Light theme is disabled to preserve neural retinal link.');
    setTimeout(() => setShowToast(null), 3000);
  };

  return (
    <>
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2 bg-slate-900 border border-cyan-400 text-cyan-300 text-xs font-mono rounded shadow-[0_0_20px_rgba(0,240,255,0.4)] animate-bounce">
          {showToast}
        </div>
      )}

      {/* Top Bar Floating Back-to-World Button when a subpage is active */}
      {activeNodeId && (
        <header className="fixed top-0 left-0 right-0 z-40 h-14 sm:h-16 px-3 sm:px-6 flex items-center justify-between pointer-events-auto bg-[#030712] border-b border-cyan-500/25 shadow-[0_4px_25px_rgba(0,0,0,0.85)]">
          {/* Left: Back Button & Section Breadcrumb */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              onClick={() => {
                sound.playReturn();
                onSelectNode(null);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg bg-gradient-to-r from-slate-900 via-cyan-950/40 to-slate-900 hover:from-cyan-500 hover:to-cyan-400 text-cyan-300 hover:text-black font-mono text-xs font-bold tracking-wider border border-cyan-500/40 hover:border-cyan-300 shadow-[0_0_15px_rgba(0,240,255,0.2)] transition-all active:scale-95 shrink-0 whitespace-nowrap group"
              title="Return to 3D Cyber Island"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 group-hover:bg-black transition-colors animate-pulse" />
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              <span className="whitespace-nowrap">WORLD</span>
              <span className="hidden sm:inline whitespace-nowrap">VIEW</span>
            </button>

            <div className="hidden md:flex items-center gap-2 text-xs font-mono text-slate-400 pl-2.5 border-l border-slate-800">
              <span className="text-cyan-400 uppercase font-bold tracking-wider">{activeNode?.name}</span>
              <span className="text-slate-600">/</span>
              <span className="text-slate-300">{activeNode?.label}</span>
            </div>
          </div>

          {/* Center/Right: Quick Node Switcher Menu & Close X */}
          <div className="flex items-center gap-1.5 shrink-0 max-w-[62vw] sm:max-w-xl">
            <div className="flex items-center gap-1 overflow-x-auto py-1 scrollbar-none">
              {WORLD_NODES.map((n) => (
                <button
                  key={n.id}
                  onClick={() => {
                    sound.playClick();
                    onSelectNode(n.id);
                  }}
                  className={`px-2.5 py-1 text-[11px] font-mono rounded-lg transition-all whitespace-nowrap border shrink-0 ${
                    activeNodeId === n.id
                      ? 'bg-cyan-500 text-black font-bold border-cyan-300 shadow-[0_0_12px_rgba(0,240,255,0.4)]'
                      : 'bg-slate-900/60 text-slate-400 border-slate-800/80 hover:text-white hover:border-slate-700 active:scale-95'
                  }`}
                >
                  {n.name}
                </button>
              ))}
            </div>

            <button
              onClick={() => {
                sound.playReturn();
                onSelectNode(null);
              }}
              className="p-1.5 sm:p-2 rounded-lg bg-slate-900/80 hover:bg-rose-950/40 border border-slate-800 hover:border-rose-500/50 text-slate-400 hover:text-rose-300 transition-colors shrink-0 ml-1"
              title="Close Page"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </header>
      )}

      {/* Main 3D World HUD Overlays (only displayed in world overview mode) */}
      {!hideHud && !activeNodeId && (
        <div className="pointer-events-none fixed inset-0 z-30 flex flex-col justify-between p-3 sm:p-6 md:p-8">
          {/* Top Bar Row */}
          <div className="flex items-start justify-between gap-3">
            {/* Top Left: Title & Subtitle */}
            <div className="pointer-events-auto space-y-0.5 max-w-[68vw] sm:max-w-none">
              <button
                onClick={() => {
                  sound.playReturn();
                  onSelectNode(null);
                }}
                className="text-left group block"
              >
                <h1 className="text-xl sm:text-3xl md:text-4xl font-cyber font-bold tracking-wider text-white group-hover:text-cyan-300 transition-colors leading-tight">
                  {PORTFOLIO_PROFILE.name}
                </h1>
                <p className="text-[10px] sm:text-xs font-mono text-cyan-400 font-medium tracking-wider mt-0.5 truncate">
                  {PORTFOLIO_PROFILE.subtitle}
                </p>
              </button>
            </div>

            {/* Top Right: Zen toggle & Boxed FPS Indicator */}
            <div className="pointer-events-auto flex items-center gap-1.5 sm:gap-3 shrink-0">
              {/* Zen Mode Toggle */}
              <button
                onClick={() => setHideHud(true)}
                className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-900/70 border border-slate-800 text-[11px] font-mono text-slate-400 hover:text-cyan-300 transition-colors"
                title="Hide HUD for clean view"
              >
                <EyeOff className="w-3.5 h-3.5" />
                <span>ZEN</span>
              </button>

              {/* Boxed FPS counter matching screenshot */}
              <div className="px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-lg bg-black/70 border border-cyan-500/40 text-center font-mono shadow-[0_0_15px_rgba(0,240,255,0.15)]">
                <div className="text-[9px] text-slate-400 tracking-wider">
                  FPS
                </div>
                <div className="text-sm sm:text-lg font-bold text-cyan-400 leading-none">
                  {fps || 60}
                </div>
              </div>
            </div>
          </div>

          {/* Center Hover Node Quick Card (When hovering a node in 3D world on desktop) */}
          {!activeNodeId && hoveredNode && (
            <div className="pointer-events-auto self-center p-4 rounded-xl bg-slate-900/90 border border-cyan-400 text-center shadow-[0_0_30px_rgba(0,240,255,0.25)] cyber-corner-bracket animate-fade-in max-w-sm hidden sm:block">
              <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest">
                PORTAL DETECTED
              </div>
              <div className="text-xl font-cyber font-bold text-white mt-0.5">
                {hoveredNode.name} · {hoveredNode.label}
              </div>
              <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                {hoveredNode.description}
              </p>
              <button
                onClick={() => {
                  sound.playWarp();
                  onSelectNode(hoveredNode.id);
                }}
                className="mt-3 px-4 py-1.5 text-xs font-mono font-bold bg-cyan-500 hover:bg-cyan-400 text-black rounded transition-all"
              >
                ENTER {hoveredNode.name} →
              </button>
            </div>
          )}

          {/* DESKTOP Bottom Bar Controls (exactly matching the user reference screenshot) */}
          <div className="hidden md:flex items-end justify-between gap-4 pt-4">
            {/* Bottom Left: Cyber Toggles */}
            <div className="pointer-events-auto flex flex-col gap-2 p-3 rounded-lg bg-slate-900/70 border border-slate-800/80 text-xs font-mono">
              {/* High Quality */}
              <button
                onClick={() => {
                  sound.playClick();
                  onToggleHighQuality();
                }}
                className="flex items-center gap-2 text-slate-300 hover:text-cyan-300 transition-colors text-left"
              >
                {highQuality ? (
                  <CheckSquare className="w-4 h-4 text-cyan-400" />
                ) : (
                  <Square className="w-4 h-4 text-slate-500" />
                )}
                <span>HIGH QUALITY</span>
              </button>

              {/* Sound Effects */}
              <button
                onClick={() => {
                  onToggleSound();
                  sound.playClick();
                }}
                className="flex items-center gap-2 text-slate-300 hover:text-cyan-300 transition-colors text-left"
              >
                {soundEnabled ? (
                  <CheckSquare className="w-4 h-4 text-cyan-400" />
                ) : (
                  <Square className="w-4 h-4 text-slate-500" />
                )}
                <span>SOUND EFFECTS</span>
              </button>

              {/* Light Mode [Soon] */}
              <button
                onClick={handleLightModeClick}
                className="flex items-center gap-2 text-slate-500 hover:text-slate-400 transition-colors text-left cursor-pointer"
              >
                <Square className="w-4 h-4 text-slate-600" />
                <span>LIGHT MODE [SOON]</span>
              </button>
            </div>

            {/* Bottom Center: Links */}
            <div className="pointer-events-auto flex items-center gap-3 px-4 py-2 rounded-lg bg-slate-900/70 border border-slate-800/80 text-xs font-mono">
              <span className="text-slate-500">LINKS</span>
              <a
                href={PORTFOLIO_PROFILE.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                onClick={() => sound.playClick()}
                className="flex items-center gap-1 text-slate-300 hover:text-cyan-300 transition-colors"
              >
                <span>LINKEDIN</span>
                <span className="text-[10px] px-1 py-0.2 bg-slate-800 rounded text-cyan-400">in</span>
              </a>

              <span className="text-slate-600">·</span>

              <a
                href={PORTFOLIO_PROFILE.socials.github}
                target="_blank"
                rel="noreferrer"
                onClick={() => sound.playClick()}
                className="flex items-center gap-1 text-slate-300 hover:text-cyan-300 transition-colors"
              >
                <span>GITHUB</span>
                <Github className="w-3.5 h-3.5 text-cyan-400" />
              </a>

              <span className="text-slate-600">·</span>

              <a
                href={`mailto:${PORTFOLIO_PROFILE.email}`}
                onClick={() => sound.playClick()}
                className="flex items-center gap-1 text-slate-300 hover:text-cyan-300 transition-colors"
              >
                <span>EMAIL</span>
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
              </a>
            </div>

            {/* Bottom Right: Open to Work Status & Contact Shortcut */}
            <div className="pointer-events-auto flex items-center gap-2">
              <div className="px-3.5 py-1.5 rounded-lg bg-emerald-950/50 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold flex items-center gap-2 shadow-[0_0_12px_rgba(16,185,129,0.2)]">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>OPEN TO WORK</span>
              </div>

              <button
                onClick={() => {
                  sound.playClick();
                  onSelectNode('contact');
                }}
                className="p-2 rounded-lg bg-slate-900/90 border border-cyan-500/40 hover:bg-cyan-500 hover:text-black text-cyan-300 transition-all shadow-[0_0_12px_rgba(0,240,255,0.2)]"
                title="Quick Contact Terminal"
              >
                <MessageSquare className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* MOBILE Bottom Unified Cyber Dock (Clean, ergonomic, non-overlapping) */}
          <div className="md:hidden pointer-events-auto w-full pt-2">
            <div className="flex flex-col gap-2 p-2 rounded-2xl bg-[#030712]/95 border border-cyan-500/30 shadow-[0_10px_35px_rgba(0,0,0,0.9)]">
              {/* Row 1: Horizontal Scrollable Section Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 px-0.5 scrollbar-none">
                {WORLD_NODES.map((n) => (
                  <button
                    key={n.id}
                    onClick={() => {
                      sound.playWarp();
                      onSelectNode(n.id);
                    }}
                    className={`px-3 py-1.5 text-[11px] font-mono font-semibold rounded-lg whitespace-nowrap transition-all border shrink-0 ${
                      activeNodeId === n.id
                        ? 'bg-cyan-500 text-black border-cyan-300 shadow-[0_0_10px_rgba(0,240,255,0.4)]'
                        : 'bg-slate-900/90 text-cyan-300 border-cyan-500/30 active:scale-95'
                    }`}
                  >
                    {n.name}
                  </button>
                ))}
              </div>

              {/* Row 2: Integrated Compact Utility Row with Audio, Quality, Socials & Hire */}
              <div className="flex items-center justify-between gap-1 pt-1 border-t border-slate-800/80 px-1 text-xs">
                {/* FX & Quality Quick Toggles */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => {
                      onToggleSound();
                      sound.playClick();
                    }}
                    className={`p-1.5 rounded-md border flex items-center gap-1 text-[10px] font-mono transition-colors ${
                      soundEnabled
                        ? 'bg-cyan-950/40 border-cyan-500/40 text-cyan-300'
                        : 'bg-slate-900 border-slate-800 text-slate-500'
                    }`}
                    title="Toggle Audio"
                  >
                    {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-cyan-400" /> : <VolumeX className="w-3.5 h-3.5" />}
                  </button>

                  <button
                    onClick={() => {
                      sound.playClick();
                      onToggleHighQuality();
                    }}
                    className={`p-1.5 rounded-md border flex items-center gap-1 text-[10px] font-mono transition-colors ${
                      highQuality
                        ? 'bg-cyan-950/40 border-cyan-500/40 text-cyan-300'
                        : 'bg-slate-900 border-slate-800 text-slate-500'
                    }`}
                    title="Toggle Quality"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  </button>
                </div>

                {/* Social Quick Links */}
                <div className="flex items-center gap-1 px-1.5 py-1 rounded-md bg-slate-900/60 border border-slate-800">
                  <a
                    href={PORTFOLIO_PROFILE.socials.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => sound.playClick()}
                    className="p-0.5 text-slate-400 hover:text-cyan-300 transition-colors"
                    title="LinkedIn"
                  >
                    <Linkedin className="w-3 h-3" />
                  </a>
                  <a
                    href={PORTFOLIO_PROFILE.socials.github}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => sound.playClick()}
                    className="p-0.5 text-slate-400 hover:text-cyan-300 transition-colors"
                    title="GitHub"
                  >
                    <Github className="w-3 h-3" />
                  </a>
                  <a
                    href={`mailto:${PORTFOLIO_PROFILE.email}`}
                    onClick={() => sound.playClick()}
                    className="p-0.5 text-slate-400 hover:text-cyan-300 transition-colors"
                    title="Email"
                  >
                    <Mail className="w-3 h-3" />
                  </a>
                </div>

                {/* Open to Work Shortcut */}
                <button
                  onClick={() => {
                    sound.playClick();
                    onSelectNode('contact');
                  }}
                  className="px-2 py-1 rounded-md bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-[10px] font-mono font-bold flex items-center gap-1 shadow-[0_0_8px_rgba(16,185,129,0.2)] shrink-0"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>HIRE</span>
                  <MessageSquare className="w-3 h-3 text-cyan-400 ml-0.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Restore HUD Button when in Zen mode */}
      {hideHud && (
        <button
          onClick={() => setHideHud(false)}
          className="fixed top-4 right-4 z-50 p-2.5 rounded-lg bg-slate-900/90 border border-cyan-400 text-cyan-300 hover:bg-cyan-400 hover:text-black transition-colors"
          title="Restore HUD"
        >
          <Eye className="w-4 h-4" />
        </button>
      )}
    </>
  );
};
