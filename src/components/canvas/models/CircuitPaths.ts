import * as THREE from 'three';
import { WORLD_NODES } from '../../../data/portfolioData';

interface PathSegment {
  points: THREE.Vector3[];
  length: number;
  segLens: number[];
}

/**
 * 90-Degree Orthogonal Circuit Pathways connecting Central Core to Nodes
 * Features glowing lines, junction nodes, and traveling energy pulses.
 */
export function createCircuitPaths(): { group: THREE.Group; update: (time: number, delta: number) => void } {
  const group = new THREE.Group();
  group.name = 'CircuitPathsGroup';

  // Define 90-degree orthogonal waypoints for each node
  const pathWaypoints: Record<string, [number, number][]> = {
    backstage: [
      [-1.5, -2.2],
      [-5.5, -2.2],
      [-5.5, -5.5],
      [-8.5, -5.5],
      [-8.5, -7.5]
    ],
    work: [
      [0, -2.2],
      [0, -6.5],
      [-1.5, -6.5],
      [-1.5, -10.5]
    ],
    contact: [
      [2.2, -1.2],
      [5.5, -1.2],
      [5.5, -5.5],
      [9.0, -5.5],
      [9.0, -7.5]
    ],
    resume: [
      [2.2, 0.5],
      [6.5, 0.5],
      [6.5, 0.5],
      [10.5, 0.5]
    ],
    skills: [
      [1.5, 2.2],
      [1.5, 5.0],
      [2.5, 5.0],
      [2.5, 7.5]
    ],
    experience: [
      [-1.5, 2.2],
      [-1.5, 5.5],
      [-7.5, 5.5],
      [-7.5, 8.0]
    ],
    testimonials: [
      [-2.2, 0.2],
      [-6.5, 0.2],
      [-6.5, 0.8],
      [-10.2, 0.8]
    ]
  };

  const pathSegments: PathSegment[] = [];
  const linePositions: number[] = [];
  const junctionPositions: THREE.Vector3[] = [];

  // Build lines and calculate path lengths
  Object.entries(pathWaypoints).forEach(([_id, pts]) => {
    const fullPoints: THREE.Vector3[] = [];
    let prev = new THREE.Vector3(pts[0][0], 0.03, pts[0][1]);
    fullPoints.push(prev);

    for (let i = 1; i < pts.length; i++) {
      const curr = new THREE.Vector3(pts[i][0], 0.03, pts[i][1]);

      // Add line segment
      linePositions.push(prev.x, prev.y, prev.z, curr.x, curr.y, curr.z);

      // Junction points at corners
      if (i < pts.length - 1) {
        junctionPositions.push(curr.clone());
      }

      fullPoints.push(curr);
      prev = curr;
    }

    // Calculate total length and precompute segment lengths once
    let len = 0;
    const segLens: number[] = [];
    for (let i = 0; i < fullPoints.length - 1; i++) {
      const d = fullPoints[i].distanceTo(fullPoints[i + 1]);
      segLens.push(d);
      len += d;
    }

    pathSegments.push({
      points: fullPoints,
      length: len,
      segLens,
    });
  });

  // Main cyan circuit lines
  const lineGeo = new THREE.BufferGeometry();
  lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));

  const lineMat = new THREE.LineBasicMaterial({
    color: 0x00f0ff,
    transparent: true,
    opacity: 0.85,
    linewidth: 2,
  });
  const lines = new THREE.LineSegments(lineGeo, lineMat);
  group.add(lines);

  // Soft secondary outer glow lines (slightly wider / softer)
  const glowGeo = new THREE.BufferGeometry();
  glowGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
  const glowMat = new THREE.LineBasicMaterial({
    color: 0x38bdf8,
    transparent: true,
    opacity: 0.35,
  });
  const glowLines = new THREE.LineSegments(glowGeo, glowMat);
  glowLines.position.y = 0.01;
  group.add(glowLines);

  // Junction markers (little tech diamonds at 90-degree corners)
  const juncGeo = new THREE.BufferGeometry();
  const juncPoints: number[] = [];
  junctionPositions.forEach(p => {
    juncPoints.push(p.x, p.y + 0.01, p.z);
  });
  juncGeo.setAttribute('position', new THREE.Float32BufferAttribute(juncPoints, 3));

  const juncMat = new THREE.PointsMaterial({
    color: 0x00f0ff,
    size: 0.18,
    transparent: true,
    opacity: 0.9,
  });
  const junctions = new THREE.Points(juncGeo, juncMat);
  group.add(junctions);

  // Energy pulses traveling along the paths
  const pulseCount = pathSegments.length * 2;
  const pulses: {
    mesh: THREE.Mesh;
    pathIndex: number;
    offset: number;
    speed: number;
  }[] = [];

  const pulseGeo = new THREE.SphereGeometry(0.12, 8, 8);
  const pulseMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.95,
  });

  for (let i = 0; i < pulseCount; i++) {
    const pMesh = new THREE.Mesh(pulseGeo, pulseMat);
    group.add(pMesh);

    pulses.push({
      mesh: pMesh,
      pathIndex: i % pathSegments.length,
      offset: (Math.floor(i / pathSegments.length) * 0.5) + (i * 0.15) % 1,
      speed: 0.18 + (i % 3) * 0.04,
    });
  }

  // Precomputed zero-allocation helper along polyline
  function getPointAlongPath(path: PathSegment, progress: number, target: THREE.Vector3) {
    const clamped = Math.max(0, Math.min(1, progress));
    const targetDist = clamped * path.length;
    let accumulated = 0;
    const pts = path.points;
    const segLens = path.segLens;

    for (let i = 0; i < segLens.length; i++) {
      if (accumulated + segLens[i] >= targetDist || i === segLens.length - 1) {
        const segDist = targetDist - accumulated;
        const segT = segLens[i] > 0 ? segDist / segLens[i] : 0;
        target.lerpVectors(pts[i], pts[i + 1], segT);
        return;
      }
      accumulated += segLens[i];
    }
    target.copy(pts[pts.length - 1]);
  }

  const _tempPos = new THREE.Vector3();

  const update = (time: number, delta: number) => {
    // Pulse lines opacity rhythm
    lineMat.opacity = 0.75 + Math.sin(time * 3) * 0.2;

    // Update energy pulses
    pulses.forEach(p => {
      p.offset += p.speed * delta;
      if (p.offset > 1) p.offset -= 1;

      const path = pathSegments[p.pathIndex];
      getPointAlongPath(path, p.offset, _tempPos);
      p.mesh.position.copy(_tempPos);
      p.mesh.position.y = 0.05;

      // Pulse size and brightness fade near ends
      const edgeFade = Math.sin(p.offset * Math.PI);
      p.mesh.scale.setScalar(0.7 + edgeFade * 0.6);
    });
  };

  return { group, update };
}
