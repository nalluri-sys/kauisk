import React, { useEffect, useRef } from 'react';
import { WorldScene } from './WorldScene';

interface WorldCanvasProps {
  selectedNodeId: string | null;
  onNodeSelect: (nodeId: string) => void;
  onNodeHover: (nodeId: string | null) => void;
  onFpsUpdate: (fps: number) => void;
  highQuality: boolean;
}

export const WorldCanvas: React.FC<WorldCanvasProps> = ({
  selectedNodeId,
  onNodeSelect,
  onNodeHover,
  onFpsUpdate,
  highQuality,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<WorldScene | null>(null);

  // Initialize scene once
  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new WorldScene({
      container: mountRef.current,
      onNodeSelect,
      onNodeHover,
      onFpsUpdate,
    });
    sceneRef.current = scene;

    return () => {
      scene.dispose();
      sceneRef.current = null;
    };
  }, [onNodeSelect, onNodeHover, onFpsUpdate]);

  // Sync node focus
  useEffect(() => {
    if (sceneRef.current) {
      sceneRef.current.focusOnNode(selectedNodeId);
    }
  }, [selectedNodeId]);

  // Sync quality toggle
  useEffect(() => {
    if (sceneRef.current) {
      sceneRef.current.setQuality(highQuality);
    }
  }, [highQuality]);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full overflow-hidden z-0 pointer-events-auto"
      style={{ touchAction: 'none' }}
    />
  );
};
