/**
 * Interactive 3D Anime-Inspired Developer Portfolio
 * Nalluri Kausik — AI Engineer | Machine Learning | Full Stack
 */

import React, { useState, useEffect, useCallback } from 'react';
import { WorldCanvas } from './components/canvas/WorldCanvas';
import { CyberHUD } from './components/hud/CyberHUD';
import { BackstagePage } from './components/pages/BackstagePage';
import { WorksPage } from './components/pages/WorksPage';
import { SkillsPage } from './components/pages/SkillsPage';
import { ExperiencePage } from './components/pages/ExperiencePage';
import { AchievementsPage } from './components/pages/AchievementsPage';
import { ResumePage } from './components/pages/ResumePage';
import { ContactPage } from './components/pages/ContactPage';
import { WORLD_NODES } from './data/portfolioData';
import { sound } from './utils/audio';

export default function App() {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [fps, setFps] = useState<number>(120);
  const [highQuality, setHighQuality] = useState<boolean>(true);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(sound.isEnabled());

  // Deep linking via hash routing
  useEffect(() => {
    const handleGesture = () => {
      sound.registerUserInteraction();
    };
    window.addEventListener('pointerdown', handleGesture, { once: true });
    window.addEventListener('keydown', handleGesture, { once: true });

    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      const matched = WORLD_NODES.find((n) => n.id === hash || n.route === `/${hash}`);
      if (matched) {
        setSelectedNodeId(matched.id);
      } else if (!hash) {
        setSelectedNodeId(null);
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => {
      window.removeEventListener('hashchange', handleHash);
      window.removeEventListener('pointerdown', handleGesture);
      window.removeEventListener('keydown', handleGesture);
    };
  }, []);

  const handleSelectNode = useCallback((nodeId: string | null) => {
    setSelectedNodeId(nodeId);
    if (nodeId) {
      window.location.hash = nodeId;
    } else {
      history.pushState(null, '', window.location.pathname);
    }
  }, []);

  const handleToggleSound = useCallback(() => {
    const next = !soundEnabled;
    sound.setEnabled(next);
    setSoundEnabled(next);
  }, [soundEnabled]);

  const handleToggleHighQuality = useCallback(() => {
    setHighQuality((prev) => !prev);
  }, []);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#030712] text-slate-100 font-sans select-none">
      {/* 1. Interactive 3D World Canvas */}
      <WorldCanvas
        selectedNodeId={selectedNodeId}
        onNodeSelect={handleSelectNode}
        onNodeHover={setHoveredNodeId}
        onFpsUpdate={setFps}
        highQuality={highQuality}
      />

      {/* 2. Cyberpunk UI HUD Layer */}
      <CyberHUD
        activeNodeId={selectedNodeId}
        hoveredNodeId={hoveredNodeId}
        fps={fps}
        highQuality={highQuality}
        soundEnabled={soundEnabled}
        onToggleHighQuality={handleToggleHighQuality}
        onToggleSound={handleToggleSound}
        onSelectNode={handleSelectNode}
      />

      {/* 3. Dedicated Portfolio Section Drawer / Fullpage View */}
      {selectedNodeId && (
        <main
          role="main"
          className="fixed inset-0 z-35 overflow-y-auto pt-16 sm:pt-20 pb-16 px-3 sm:px-6 md:px-12 pointer-events-auto bg-[#030712]/98 animate-fade-in"
        >
          {selectedNodeId === 'backstage' && (
            <BackstagePage onNavigate={handleSelectNode} />
          )}
          {selectedNodeId === 'work' && <WorksPage />}
          {selectedNodeId === 'skills' && <SkillsPage />}
          {selectedNodeId === 'experience' && <ExperiencePage />}
          {selectedNodeId === 'testimonials' && <AchievementsPage />}
          {selectedNodeId === 'resume' && <ResumePage />}
          {selectedNodeId === 'contact' && <ContactPage />}
        </main>
      )}
    </div>
  );
}
