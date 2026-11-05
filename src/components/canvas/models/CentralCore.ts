import * as THREE from 'three';

/**
 * Central Cyber Core Dais & Holographic Crystal
 * Recreates the central illuminated pedestal with glowing borders and floating energy prism.
 */
export function createCentralCore(): { group: THREE.Group; update: (time: number, delta: number) => void } {
  const group = new THREE.Group();
  group.name = 'CentralCoreGroup';

  // Base tier 1 (wide dark foundation)
  const baseGeo = new THREE.BoxGeometry(4.4, 0.4, 4.4);
  const baseMat = new THREE.MeshStandardMaterial({
    color: 0x0a101f,
    roughness: 0.3,
    metalness: 0.8,
  });
  const base = new THREE.Mesh(baseGeo, baseMat);
  base.position.y = 0.2;
  base.receiveShadow = true;
  group.add(base);

  // Stepped tier 2
  const tier2Geo = new THREE.BoxGeometry(3.6, 0.35, 3.6);
  const tier2Mat = new THREE.MeshStandardMaterial({
    color: 0x0f172a,
    roughness: 0.25,
    metalness: 0.85,
  });
  const tier2 = new THREE.Mesh(tier2Geo, tier2Mat);
  tier2.position.y = 0.45;
  group.add(tier2);

  // Glowing perimeter edge ring on tier 2
  const rimGeo = new THREE.BoxGeometry(3.64, 0.08, 3.64);
  const rimMat = new THREE.MeshBasicMaterial({
    color: 0x00f0ff,
    transparent: true,
    opacity: 0.85,
  });
  const rim = new THREE.Mesh(rimGeo, rimMat);
  rim.position.y = 0.58;
  group.add(rim);

  // Recessed center plate
  const plateGeo = new THREE.BoxGeometry(2.6, 0.05, 2.6);
  const plateMat = new THREE.MeshStandardMaterial({
    color: 0x040814,
    roughness: 0.4,
    metalness: 0.7,
  });
  const plate = new THREE.Mesh(plateGeo, plateMat);
  plate.position.y = 0.62;
  group.add(plate);

  // Inner illuminated energy core (bright glowing cyan pad)
  const padGeo = new THREE.PlaneGeometry(2.1, 2.1);
  const padMat = new THREE.MeshBasicMaterial({
    color: 0x00f0ff,
    transparent: true,
    opacity: 0.9,
  });
  const pad = new THREE.Mesh(padGeo, padMat);
  pad.rotation.x = -Math.PI / 2;
  pad.position.y = 0.65;
  group.add(pad);

  // Soft cyan core light
  const coreLight = new THREE.PointLight(0x00f0ff, 2.5, 8);
  coreLight.position.set(0, 1.2, 0);
  group.add(coreLight);

  // Floating rotating holographic crystal / octahedron
  const crystalGeo = new THREE.OctahedronGeometry(0.7, 0);
  const crystalMat = new THREE.MeshStandardMaterial({
    color: 0x00f0ff,
    emissive: 0x007799,
    emissiveIntensity: 0.7,
    roughness: 0.1,
    metalness: 0.2,
    transparent: true,
    opacity: 0.8,
    depthWrite: false,
  });
  const crystal = new THREE.Mesh(crystalGeo, crystalMat);
  crystal.position.y = 1.4;
  group.add(crystal);

  // Crystal wireframe cage
  const wireGeo = new THREE.OctahedronGeometry(0.85, 0);
  const wireMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    wireframe: true,
    transparent: true,
    opacity: 0.4,
  });
  const wireCage = new THREE.Mesh(wireGeo, wireMat);
  wireCage.position.y = 1.4;
  group.add(wireCage);

  // Orbiting rings around crystal
  const ringGeo = new THREE.TorusGeometry(1.1, 0.02, 12, 32);
  const ringMat = new THREE.MeshBasicMaterial({
    color: 0x00f0ff,
    transparent: true,
    opacity: 0.5,
  });
  const ring1 = new THREE.Mesh(ringGeo, ringMat);
  ring1.position.y = 1.4;
  ring1.rotation.x = Math.PI / 3;
  group.add(ring1);

  const ring2 = new THREE.Mesh(ringGeo, ringMat);
  ring2.position.y = 1.4;
  ring2.rotation.y = Math.PI / 4;
  ring2.rotation.x = -Math.PI / 3;
  group.add(ring2);

  // Update loop
  const update = (time: number, _delta: number) => {
    crystal.rotation.y = time * 0.8;
    crystal.rotation.x = Math.sin(time * 0.5) * 0.2;
    crystal.position.y = 1.4 + Math.sin(time * 1.5) * 0.12;

    wireCage.rotation.y = -time * 0.6;
    wireCage.rotation.z = Math.cos(time * 0.4) * 0.2;
    wireCage.position.y = crystal.position.y;

    ring1.rotation.z = time * 0.7;
    ring2.rotation.x = -time * 0.5;

    // Pulse core light
    const pulse = 0.85 + Math.sin(time * 2.5) * 0.15;
    padMat.opacity = 0.75 + Math.sin(time * 2.5) * 0.2;
    coreLight.intensity = 2.0 * pulse;
  };

  return { group, update };
}
