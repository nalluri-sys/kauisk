import * as THREE from 'three';
import { WORLD_NODES, WorldNode } from '../../../data/portfolioData';

export interface InteractiveNodeItem {
  id: string;
  group: THREE.Group;
  hitTarget: THREE.Mesh;
  hoverHighlight: (hovered: boolean) => void;
  update: (time: number, delta: number) => void;
  position: THREE.Vector3;
  data: WorldNode;
}

/**
 * Creates a stylized anime holographic humanoid silhouette
 */
function createAnimeSilhouette(color = 0x00f0ff): THREE.Group {
  const figure = new THREE.Group();
  const mat = new THREE.MeshBasicMaterial({
    color,
    transparent: true,
    opacity: 0.75,
    wireframe: false,
  });

  // Head
  const headGeo = new THREE.SphereGeometry(0.18, 12, 12);
  const head = new THREE.Mesh(headGeo, mat);
  head.position.y = 1.45;
  figure.add(head);

  // Hair / anime spiky visor
  const visorGeo = new THREE.BoxGeometry(0.22, 0.08, 0.22);
  const visorMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.9 });
  const visor = new THREE.Mesh(visorGeo, visorMat);
  visor.position.set(0, 1.45, 0.08);
  figure.add(visor);

  // Torso / cyber jacket
  const torsoGeo = new THREE.CylinderGeometry(0.12, 0.18, 0.5, 8);
  const torso = new THREE.Mesh(torsoGeo, mat);
  torso.position.y = 1.1;
  figure.add(torso);

  // Left & right arms
  const armGeo = new THREE.CylinderGeometry(0.04, 0.05, 0.45, 6);
  const lArm = new THREE.Mesh(armGeo, mat);
  lArm.position.set(-0.25, 1.05, 0);
  lArm.rotation.z = 0.2;
  figure.add(lArm);

  const rArm = new THREE.Mesh(armGeo, mat);
  rArm.position.set(0.25, 1.05, 0);
  rArm.rotation.z = -0.2;
  figure.add(rArm);

  // Legs
  const legGeo = new THREE.CylinderGeometry(0.06, 0.05, 0.65, 6);
  const lLeg = new THREE.Mesh(legGeo, mat);
  lLeg.position.set(-0.1, 0.5, 0);
  figure.add(lLeg);

  const rLeg = new THREE.Mesh(legGeo, mat);
  rLeg.position.set(0.1, 0.5, 0);
  figure.add(rLeg);

  // Small floating halo / tech disc
  const ringGeo = new THREE.RingGeometry(0.18, 0.24, 16);
  const ringMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff, side: THREE.DoubleSide, transparent: true, opacity: 0.6 });
  const ring = new THREE.Mesh(ringGeo, ringMat);
  ring.rotation.x = -Math.PI / 2;
  ring.position.y = 1.68;
  figure.add(ring);

  return figure;
}

/**
 * Creates a sharp canvas texture for bracketed labels e.g. ┌ WORKS ┐ └       ┘
 */
function createBracketLabelTexture(title: string, hovered = false): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 128;
  const ctx = canvas.getContext('2d')!;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // High-contrast cyber dark backing with subtle border
  ctx.fillStyle = hovered ? 'rgba(0, 240, 255, 0.35)' : 'rgba(3, 8, 22, 0.95)';
  ctx.fillRect(6, 6, canvas.width - 12, canvas.height - 12);

  // Outer border
  ctx.strokeStyle = hovered ? '#ffffff' : '#00f0ff';
  ctx.lineWidth = 2.5;
  ctx.strokeRect(6, 6, canvas.width - 12, canvas.height - 12);

  // Tech corner brackets ┌ ┐ └ ┘
  ctx.strokeStyle = '#00f0ff';
  ctx.lineWidth = 5;
  ctx.shadowColor = '#00f0ff';
  ctx.shadowBlur = 10;

  const w = canvas.width;
  const h = canvas.height;
  const arm = 30;

  // Top-left bracket ┌
  ctx.beginPath();
  ctx.moveTo(6, 6 + arm);
  ctx.lineTo(6, 6);
  ctx.lineTo(6 + arm, 6);
  ctx.stroke();

  // Top-right bracket ┐
  ctx.beginPath();
  ctx.moveTo(w - 6 - arm, 6);
  ctx.lineTo(w - 6, 6);
  ctx.lineTo(w - 6, 6 + arm);
  ctx.stroke();

  // Bottom-left bracket └
  ctx.beginPath();
  ctx.moveTo(6, h - 6 - arm);
  ctx.lineTo(6, h - 6);
  ctx.lineTo(6 + arm, h - 6);
  ctx.stroke();

  // Bottom-right bracket ┘
  ctx.beginPath();
  ctx.moveTo(w - 6 - arm, h - 6);
  ctx.lineTo(w - 6, h - 6);
  ctx.lineTo(w - 6, h - 6 - arm);
  ctx.stroke();

  // Brilliant pure white text with bright neon cyan glow for 100% distance clarity
  ctx.font = 'bold 50px "Rajdhani", "Arial Black", sans-serif';
  ctx.fillStyle = '#ffffff';
  ctx.shadowColor = '#00f0ff';
  ctx.shadowBlur = 16;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(title, w / 2, h / 2 + 1);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  // Linear filter without mipmaps prevents distant texture downsampling blur
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = false;
  return texture;
}

/**
 * Builds all 7 interactive structures
 */
export function createNodeStructures(): {
  group: THREE.Group;
  nodes: InteractiveNodeItem[];
  update: (time: number, delta: number) => void;
} {
  const mainGroup = new THREE.Group();
  mainGroup.name = 'AllNodeStructures';

  const interactiveNodes: InteractiveNodeItem[] = [];

  WORLD_NODES.forEach((nodeData) => {
    const nodeGroup = new THREE.Group();
    nodeGroup.position.set(...nodeData.position);
    nodeGroup.name = `Node_${nodeData.id}`;

    // Invisible proxy hit target for smooth raycasting
    const hitGeo = new THREE.BoxGeometry(4.5, 4.5, 4.5);
    const hitMat = new THREE.MeshBasicMaterial({ visible: false });
    const hitTarget = new THREE.Mesh(hitGeo, hitMat);
    hitTarget.position.y = 2.0;
    hitTarget.userData = { nodeId: nodeData.id };
    nodeGroup.add(hitTarget);

    // Floating bracket label sprite
    const normalLabelTex = createBracketLabelTexture(nodeData.name, false);
    const hoverLabelTex = createBracketLabelTexture(nodeData.name, true);

    // CRITICAL: fog: false prevents distant fog from dimming top labels
    const spriteMat = new THREE.SpriteMaterial({
      map: normalLabelTex,
      transparent: true,
      opacity: 1.0,
      depthTest: false,
      depthWrite: false,
      fog: false,
    });
    const labelSprite = new THREE.Sprite(spriteMat);
    labelSprite.renderOrder = 999;

    // Distance compensation: top-three nodes are farther from the isometric camera
    const isTopThree = nodeData.id === 'backstage' || nodeData.id === 'work' || nodeData.id === 'testimonials';
    const baseScaleX = isTopThree ? 3.6 : 3.0;
    const baseScaleY = isTopThree ? 0.9 : 0.75;
    labelSprite.scale.set(baseScaleX, baseScaleY, 1);

    // Elevated position so portal and server towers never overlap the label
    const labelY = (nodeData.id === 'backstage' || nodeData.id === 'work')
      ? 4.5
      : (nodeData.id === 'testimonials' ? 4.2 : 3.7);

    labelSprite.position.set(0, labelY, 0);
    nodeGroup.add(labelSprite);

    // Subtle ground base ring
    const groundRingGeo = new THREE.RingGeometry(1.6, 1.8, 32);
    const groundRingMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.35,
    });
    const groundRing = new THREE.Mesh(groundRingGeo, groundRingMat);
    groundRing.rotation.x = -Math.PI / 2;
    groundRing.position.y = 0.02;
    nodeGroup.add(groundRing);

    // Individual node animations
    let customUpdate = (_time: number, _delta: number) => {};

    // Build specific 3D model per node type
    switch (nodeData.id) {
      // 1. BACKSTAGE (Portal / Gateway)
      case 'backstage': {
        const portal = new THREE.Group();

        // Platform
        const platGeo = new THREE.CylinderGeometry(1.6, 1.8, 0.2, 16);
        const platMat = new THREE.MeshStandardMaterial({ color: 0x090d1a, roughness: 0.3, metalness: 0.8 });
        const plat = new THREE.Mesh(platGeo, platMat);
        plat.position.y = 0.1;
        portal.add(plat);

        // Left pillar
        const pillarGeo = new THREE.BoxGeometry(0.35, 2.6, 0.45);
        const pillarMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.2, metalness: 0.9 });
        const leftPillar = new THREE.Mesh(pillarGeo, pillarMat);
        leftPillar.position.set(-1.0, 1.3, 0);
        portal.add(leftPillar);

        // Right pillar
        const rightPillar = leftPillar.clone();
        rightPillar.position.x = 1.0;
        portal.add(rightPillar);

        // Glowing neon slits on pillars
        const slitGeo = new THREE.BoxGeometry(0.08, 2.3, 0.47);
        const slitMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff });
        const lSlit = new THREE.Mesh(slitGeo, slitMat);
        lSlit.position.set(-1.0, 1.3, 0);
        portal.add(lSlit);

        const rSlit = lSlit.clone();
        rSlit.position.x = 1.0;
        portal.add(rSlit);

        // Top arch lintel
        const archGeo = new THREE.BoxGeometry(2.4, 0.4, 0.5);
        const arch = new THREE.Mesh(archGeo, pillarMat);
        arch.position.set(0, 2.6, 0);
        portal.add(arch);

        // Glowing arch edge
        const archGlowGeo = new THREE.BoxGeometry(2.36, 0.06, 0.52);
        const archGlow = new THREE.Mesh(archGlowGeo, slitMat);
        archGlow.position.set(0, 2.45, 0);
        portal.add(archGlow);

        // Central holographic portal energy field
        const energyGeo = new THREE.PlaneGeometry(1.6, 2.2);
        const energyMat = new THREE.MeshStandardMaterial({
          color: 0x00f0ff,
          emissive: 0x004466,
          transparent: true,
          opacity: 0.7,
          roughness: 0.1,
          metalness: 0.2,
          depthWrite: false,
          side: THREE.DoubleSide,
        });
        const energyField = new THREE.Mesh(energyGeo, energyMat);
        energyField.position.set(0, 1.3, 0);
        portal.add(energyField);

        // Anime silhouette standing beside portal
        const animeChar = createAnimeSilhouette(0x38bdf8);
        animeChar.position.set(1.4, 0.1, 0.4);
        animeChar.rotation.y = -Math.PI / 4;
        portal.add(animeChar);

        nodeGroup.add(portal);

        customUpdate = (t) => {
          energyMat.opacity = 0.55 + Math.sin(t * 3.5) * 0.18;
          archGlow.scale.set(1, 1 + Math.sin(t * 4) * 0.2, 1);
        };
        break;
      }

      // 2. WORKS (High Density Server Monoliths)
      case 'work': {
        const servers = new THREE.Group();

        // 6 Server towers in stepped array
        const towerPositions = [
          [-1.1, 0, -0.6],
          [0.0, 0, -0.8],
          [1.1, 0, -0.6],
          [-0.6, 0, 0.4],
          [0.6, 0, 0.4],
        ];

        const serverGeo = new THREE.BoxGeometry(0.65, 2.5, 0.65);
        const serverMat = new THREE.MeshStandardMaterial({
          color: 0x0b1120,
          roughness: 0.25,
          metalness: 0.85,
        });

        // Glowing LED line material
        const ledMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff });
        const blinkMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });

        towerPositions.forEach((pos, idx) => {
          const rack = new THREE.Group();
          rack.position.set(pos[0], 1.25, pos[2]);

          const body = new THREE.Mesh(serverGeo, serverMat);
          body.castShadow = true;
          rack.add(body);

          // LED lines
          for (let y = -0.9; y <= 0.9; y += 0.35) {
            const stripGeo = new THREE.BoxGeometry(0.48, 0.05, 0.67);
            const strip = new THREE.Mesh(stripGeo, (idx + y) % 2 === 0 ? ledMat : blinkMat);
            strip.position.y = y;
            rack.add(strip);
          }

          servers.add(rack);
        });

        // Anime silhouette inspecting server
        const char = createAnimeSilhouette(0x00f0ff);
        char.position.set(-1.6, 0, 0.6);
        char.rotation.y = Math.PI / 5;
        servers.add(char);

        // Small holographic terminal floating near figure
        const termGeo = new THREE.PlaneGeometry(0.6, 0.4);
        const termMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff, transparent: true, opacity: 0.8, side: THREE.DoubleSide });
        const term = new THREE.Mesh(termGeo, termMat);
        term.position.set(-1.3, 1.2, 0.8);
        term.rotation.y = Math.PI / 4;
        servers.add(term);

        nodeGroup.add(servers);

        customUpdate = (t) => {
          blinkMat.color.setHex((Math.sin(t * 8) > 0) ? 0x00f0ff : 0x0284c7);
          term.position.y = 1.2 + Math.sin(t * 2) * 0.05;
        };
        break;
      }

      // 3. CONTACT (Holographic Communicator & Orbital Orb)
      case 'contact': {
        const comm = new THREE.Group();

        // Base pod
        const baseGeo = new THREE.CylinderGeometry(1.2, 1.5, 0.4, 16);
        const baseMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.3, metalness: 0.8 });
        const base = new THREE.Mesh(baseGeo, baseMat);
        base.position.y = 0.2;
        comm.add(base);

        // Gimbal ring bracket
        const bracketGeo = new THREE.TorusGeometry(1.1, 0.08, 8, 24);
        const bracketMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.2, metalness: 0.9 });
        const bracket = new THREE.Mesh(bracketGeo, bracketMat);
        bracket.rotation.x = Math.PI / 2;
        bracket.position.y = 0.5;
        comm.add(bracket);

        // Floating central communicator sphere
        const sphereGeo = new THREE.SphereGeometry(0.7, 24, 24);
        const sphereMat = new THREE.MeshStandardMaterial({
          color: 0x00f0ff,
          emissive: 0x0284c7,
          emissiveIntensity: 0.6,
          roughness: 0.1,
          metalness: 0.3,
          transparent: true,
          opacity: 0.85,
          depthWrite: false,
        });
        const orb = new THREE.Mesh(sphereGeo, sphereMat);
        orb.position.y = 1.8;
        comm.add(orb);

        // Rotating holographic orbital rings
        const ringGeo1 = new THREE.TorusGeometry(1.2, 0.02, 8, 36);
        const ringMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff, transparent: true, opacity: 0.75 });
        const orbRing1 = new THREE.Mesh(ringGeo1, ringMat);
        orbRing1.position.y = 1.8;
        comm.add(orbRing1);

        const orbRing2 = new THREE.Mesh(ringGeo1, ringMat);
        orbRing2.position.y = 1.8;
        comm.add(orbRing2);

        // Small satellite emitter dish
        const dishGeo = new THREE.CylinderGeometry(0.4, 0.1, 0.15, 12);
        const dish = new THREE.Mesh(dishGeo, baseMat);
        dish.position.set(1.0, 0.6, 0.8);
        dish.rotation.x = 0.4;
        comm.add(dish);

        nodeGroup.add(comm);

        customUpdate = (t) => {
          orb.position.y = 1.8 + Math.sin(t * 2) * 0.12;
          orbRing1.position.y = orb.position.y;
          orbRing2.position.y = orb.position.y;

          orbRing1.rotation.x = t * 1.2;
          orbRing1.rotation.y = t * 0.8;
          orbRing2.rotation.y = -t * 1.0;
          orbRing2.rotation.z = t * 0.6;
        };
        break;
      }

      // 4. RESUME (Cyber Workstation Desk & Multi-Monitors)
      case 'resume': {
        const deskGroup = new THREE.Group();

        // Workstation platform
        const platGeo = new THREE.BoxGeometry(2.4, 0.1, 1.8);
        const platMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.3, metalness: 0.8 });
        const plat = new THREE.Mesh(platGeo, platMat);
        plat.position.set(0, 0.9, 0);
        deskGroup.add(plat);

        // Legs
        const legGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.9, 8);
        const legMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.9, roughness: 0.2 });
        [[-1.0, -0.7], [1.0, -0.7], [-1.0, 0.7], [1.0, 0.7]].forEach(([x, z]) => {
          const leg = new THREE.Mesh(legGeo, legMat);
          leg.position.set(x, 0.45, z);
          deskGroup.add(leg);
        });

        // Curved wide monitor 1 (center)
        const monGeo = new THREE.BoxGeometry(1.2, 0.7, 0.05);
        const screenMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff, transparent: true, opacity: 0.85 });
        const mon1 = new THREE.Mesh(monGeo, screenMat);
        mon1.position.set(0, 1.45, -0.3);
        deskGroup.add(mon1);

        // Angled side monitor 2
        const mon2 = new THREE.Mesh(monGeo, screenMat);
        mon2.scale.set(0.7, 0.7, 1);
        mon2.position.set(-0.9, 1.4, -0.15);
        mon2.rotation.y = Math.PI / 6;
        deskGroup.add(mon2);

        // Tech chair
        const seatGeo = new THREE.BoxGeometry(0.7, 0.1, 0.7);
        const seat = new THREE.Mesh(seatGeo, platMat);
        seat.position.set(0, 0.5, 0.6);
        deskGroup.add(seat);

        const backGeo = new THREE.BoxGeometry(0.65, 0.8, 0.1);
        const chairBack = new THREE.Mesh(backGeo, platMat);
        chairBack.position.set(0, 0.9, 0.95);
        deskGroup.add(chairBack);

        // Floating resume holographic badge / document icon
        const docGeo = new THREE.BoxGeometry(0.6, 0.8, 0.04);
        const docMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.75, wireframe: true });
        const doc = new THREE.Mesh(docGeo, docMat);
        doc.position.set(0, 2.3, 0);
        deskGroup.add(doc);

        nodeGroup.add(deskGroup);

        customUpdate = (t) => {
          doc.rotation.y = t * 1.0;
          doc.position.y = 2.3 + Math.sin(t * 2) * 0.08;
          screenMat.opacity = 0.75 + Math.sin(t * 3) * 0.15;
        };
        break;
      }

      // 5. TESTIMONIALS (Holographic Dais & Trophy / Avatar)
      case 'testimonials': {
        const dais = new THREE.Group();

        // Circular stepped dais
        const tier1Geo = new THREE.CylinderGeometry(1.8, 2.0, 0.25, 24);
        const tierMat = new THREE.MeshStandardMaterial({ color: 0x090d1a, roughness: 0.3, metalness: 0.8 });
        const tier1 = new THREE.Mesh(tier1Geo, tierMat);
        tier1.position.y = 0.125;
        dais.add(tier1);

        const tier2Geo = new THREE.CylinderGeometry(1.3, 1.5, 0.2, 24);
        const tier2 = new THREE.Mesh(tier2Geo, tierMat);
        tier2.position.y = 0.32;
        dais.add(tier2);

        // Glowing cyan circular ring on dais
        const ringGeo = new THREE.RingGeometry(1.1, 1.25, 32);
        const ringMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff, side: THREE.DoubleSide });
        const glowRing = new THREE.Mesh(ringGeo, ringMat);
        glowRing.rotation.x = -Math.PI / 2;
        glowRing.position.y = 0.43;
        dais.add(glowRing);

        // Stylized anime avatar silhouette standing on the dais
        const avatar = createAnimeSilhouette(0x38bdf8);
        avatar.position.y = 0.44;
        dais.add(avatar);

        // Floating trophy / achievement diamond above avatar
        const trophyGeo = new THREE.OctahedronGeometry(0.45, 0);
        const trophyMat = new THREE.MeshStandardMaterial({
          color: 0x00f0ff,
          emissive: 0x0284c7,
          emissiveIntensity: 0.6,
          roughness: 0.1,
          metalness: 0.8,
          transparent: true,
          opacity: 0.85,
          depthWrite: false,
        });
        const trophy = new THREE.Mesh(trophyGeo, trophyMat);
        trophy.position.y = 2.4;
        dais.add(trophy);

        // Orbiting particle ring around trophy
        const orbitGeo = new THREE.TorusGeometry(0.8, 0.02, 6, 24);
        const orbitMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.7 });
        const orbit = new THREE.Mesh(orbitGeo, orbitMat);
        orbit.rotation.x = Math.PI / 3;
        orbit.position.y = 2.4;
        dais.add(orbit);

        nodeGroup.add(dais);

        customUpdate = (t) => {
          trophy.rotation.y = t * 1.5;
          trophy.position.y = 2.4 + Math.sin(t * 2) * 0.1;
          orbit.position.y = trophy.position.y;
          orbit.rotation.z = -t * 2;
          glowRing.rotation.z = t * 0.5;
        };
        break;
      }

      // 6. EXPERIENCE (Miniature Cyber City & Data Towers)
      case 'experience': {
        const city = new THREE.Group();

        // Tower footprints
        const towers = [
          { pos: [-0.6, -0.6], h: 2.4, w: 0.8 },
          { pos: [0.6, -0.5], h: 3.1, w: 0.9 },
          { pos: [-0.5, 0.6], h: 1.8, w: 0.7 },
          { pos: [0.5, 0.6], h: 2.2, w: 0.75 },
        ];

        const towerMat = new THREE.MeshStandardMaterial({
          color: 0x0a101f,
          roughness: 0.3,
          metalness: 0.8,
        });
        const edgeMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff });

        towers.forEach((t) => {
          const tGroup = new THREE.Group();
          tGroup.position.set(t.pos[0], t.h / 2, t.pos[1]);

          const geo = new THREE.BoxGeometry(t.w, t.h, t.w);
          const mesh = new THREE.Mesh(geo, towerMat);
          tGroup.add(mesh);

          // Neon top crown
          const crownGeo = new THREE.BoxGeometry(t.w * 1.05, 0.06, t.w * 1.05);
          const crown = new THREE.Mesh(crownGeo, edgeMat);
          crown.position.y = t.h / 2 + 0.03;
          tGroup.add(crown);

          // Horizontal window lines
          for (let y = -t.h / 2 + 0.4; y < t.h / 2; y += 0.5) {
            const winGeo = new THREE.BoxGeometry(t.w * 1.02, 0.04, t.w * 1.02);
            const win = new THREE.Mesh(winGeo, edgeMat);
            win.position.y = y;
            tGroup.add(win);
          }

          city.add(tGroup);
        });

        // Skybridge between towers
        const bridgeGeo = new THREE.BoxGeometry(1.3, 0.08, 0.2);
        const bridge = new THREE.Mesh(bridgeGeo, edgeMat);
        bridge.position.set(0, 1.8, -0.55);
        city.add(bridge);

        nodeGroup.add(city);

        customUpdate = (t) => {
          edgeMat.color.setHex((Math.sin(t * 3) > 0) ? 0x00f0ff : 0x38bdf8);
        };
        break;
      }

      // 7. SKILLS (Robotic Manipulator Arm & Data Hypercube)
      case 'skills': {
        const armGroup = new THREE.Group();

        // Industrial circular base ring
        const baseGeo = new THREE.CylinderGeometry(1.4, 1.6, 0.3, 24);
        const baseMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.25, metalness: 0.85 });
        const base = new THREE.Mesh(baseGeo, baseMat);
        base.position.y = 0.15;
        armGroup.add(base);

        // Circular tech dial on base
        const dialGeo = new THREE.RingGeometry(1.0, 1.3, 24);
        const dialMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff, side: THREE.DoubleSide, transparent: true, opacity: 0.8 });
        const dial = new THREE.Mesh(dialGeo, dialMat);
        dial.rotation.x = -Math.PI / 2;
        dial.position.y = 0.31;
        armGroup.add(dial);

        // Robot arm turntable
        const tableGeo = new THREE.CylinderGeometry(0.5, 0.6, 0.3, 16);
        const table = new THREE.Mesh(tableGeo, baseMat);
        table.position.set(-0.5, 0.45, -0.4);
        armGroup.add(table);

        // Lower arm segment
        const lowerArmGeo = new THREE.BoxGeometry(0.18, 1.2, 0.18);
        const armMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.3, metalness: 0.9 });
        const lowerArm = new THREE.Mesh(lowerArmGeo, armMat);
        lowerArm.position.set(-0.5, 1.0, -0.4);
        lowerArm.rotation.z = -0.3;
        armGroup.add(lowerArm);

        // Upper arm segment
        const upperArmGeo = new THREE.BoxGeometry(0.15, 1.1, 0.15);
        const upperArm = new THREE.Mesh(upperArmGeo, armMat);
        upperArm.position.set(-0.2, 1.7, -0.2);
        upperArm.rotation.z = 0.4;
        armGroup.add(upperArm);

        // Gripper claw
        const clawGeo = new THREE.BoxGeometry(0.4, 0.08, 0.12);
        const claw = new THREE.Mesh(clawGeo, armMat);
        claw.position.set(0.1, 2.05, 0);
        armGroup.add(claw);

        // Floating glowing cyan data cube / hypercube
        const cubeGeo = new THREE.BoxGeometry(0.75, 0.75, 0.75);
        const cubeMat = new THREE.MeshStandardMaterial({
          color: 0x00f0ff,
          emissive: 0x0284c7,
          emissiveIntensity: 0.6,
          roughness: 0.1,
          metalness: 0.2,
          transparent: true,
          opacity: 0.8,
          depthWrite: false,
        });
        const cube = new THREE.Mesh(cubeGeo, cubeMat);
        cube.position.set(0.35, 1.5, 0.3);
        armGroup.add(cube);

        // Inner glowing wireframe for hypercube feel
        const wireGeo = new THREE.BoxGeometry(0.9, 0.9, 0.9);
        const wireMat = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true, transparent: true, opacity: 0.5 });
        const wireCube = new THREE.Mesh(wireGeo, wireMat);
        wireCube.position.copy(cube.position);
        armGroup.add(wireCube);

        nodeGroup.add(armGroup);

        customUpdate = (t) => {
          cube.rotation.x = t * 0.8;
          cube.rotation.y = t * 1.1;
          cube.position.y = 1.5 + Math.sin(t * 2) * 0.08;

          wireCube.position.copy(cube.position);
          wireCube.rotation.x = -t * 0.5;
          wireCube.rotation.y = -t * 0.9;

          dial.rotation.z = t * 0.4;
        };
        break;
      }
    }

    // Hover effect handler
    const hoverHighlight = (hovered: boolean) => {
      spriteMat.map = hovered ? hoverLabelTex : normalLabelTex;
      groundRingMat.opacity = hovered ? 0.9 : 0.35;
      labelSprite.scale.set(hovered ? baseScaleX * 1.15 : baseScaleX, hovered ? baseScaleY * 1.15 : baseScaleY, 1);
    };

    mainGroup.add(nodeGroup);

    interactiveNodes.push({
      id: nodeData.id,
      group: nodeGroup,
      hitTarget,
      hoverHighlight,
      update: customUpdate,
      position: new THREE.Vector3(...nodeData.position),
      data: nodeData,
    });
  });

  const update = (time: number, delta: number) => {
    interactiveNodes.forEach((n) => n.update(time, delta));
  };

  return { group: mainGroup, nodes: interactiveNodes, update };
}
