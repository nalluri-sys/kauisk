import * as THREE from 'three';

/**
 * Cyberpunk Atmospheric Floating Particles & Data Motes
 */
export function createAtmosphere(highQuality = true): {
  group: THREE.Group;
  update: (time: number, delta: number) => void;
  setQuality: (high: boolean) => void;
} {
  const group = new THREE.Group();
  group.name = 'AtmosphereGroup';

  const count = highQuality ? 350 : 120;
  const positions = new Float32Array(count * 3);
  const velocities = new Float32Array(count);
  const colors = new Float32Array(count * 3);

  const spread = 40;
  const cyan = new THREE.Color(0x00f0ff);
  const white = new THREE.Color(0xffffff);
  const sky = new THREE.Color(0x38bdf8);

  for (let i = 0; i < count; i++) {
    positions[i * 3 + 0] = (Math.random() - 0.5) * spread;
    positions[i * 3 + 1] = Math.random() * 12;
    positions[i * 3 + 2] = (Math.random() - 0.5) * spread;

    velocities[i] = 0.2 + Math.random() * 0.5;

    const col = Math.random() > 0.4 ? cyan : (Math.random() > 0.5 ? sky : white);
    colors[i * 3 + 0] = col.r;
    colors[i * 3 + 1] = col.g;
    colors[i * 3 + 2] = col.b;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const material = new THREE.PointsMaterial({
    size: 0.14,
    vertexColors: true,
    transparent: true,
    opacity: 0.7,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  const points = new THREE.Points(geometry, material);
  group.add(points);

  const update = (_time: number, delta: number) => {
    const pos = geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 1] += velocities[i] * delta;
      // Wrap around
      if (pos[i * 3 + 1] > 14) {
        pos[i * 3 + 1] = 0.1;
      }
    }
    geometry.attributes.position.needsUpdate = true;
  };

  const setQuality = (high: boolean) => {
    material.size = high ? 0.14 : 0.18;
    material.opacity = high ? 0.75 : 0.45;
  };

  return { group, update, setQuality };
}
