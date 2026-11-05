import * as THREE from 'three';

/**
 * Procedural Cyberpunk Floor Grid
 * Creates an expansive dark floor with cyan crosshair intersections and subtle dot grid
 * Exactly matching the reference screenshot's isometric cyber matrix.
 */
export function createFloorGrid(): THREE.Group {
  const group = new THREE.Group();
  group.name = 'FloorGridGroup';

  // Base dark floor receiver
  const floorGeo = new THREE.PlaneGeometry(160, 160);
  const floorMat = new THREE.MeshStandardMaterial({
    color: 0x030712,
    roughness: 0.9,
    metalness: 0.2,
  });
  const floor = new THREE.Mesh(floorGeo, floorMat);
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -0.05;
  floor.receiveShadow = true;
  group.add(floor);

  // Procedural Grid Texture with sharp crosshairs and dots
  const size = 1024;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#030712';
  ctx.fillRect(0, 0, size, size);

  // Grid step
  const cells = 16;
  const step = size / cells;

  ctx.strokeStyle = 'rgba(0, 240, 255, 0.08)';
  ctx.lineWidth = 1;

  for (let i = 0; i <= size; i += step) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, size);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(size, i);
    ctx.stroke();
  }

  // Draw cyber crosshairs (+) at intersections
  ctx.strokeStyle = 'rgba(0, 240, 255, 0.45)';
  ctx.lineWidth = 1.5;
  const arm = 5;

  for (let x = 0; x <= size; x += step) {
    for (let y = 0; y <= size; y += step) {
      // Horizontal cross arm
      ctx.beginPath();
      ctx.moveTo(x - arm, y);
      ctx.lineTo(x + arm, y);
      ctx.stroke();

      // Vertical cross arm
      ctx.beginPath();
      ctx.moveTo(x, y - arm);
      ctx.lineTo(x, y + arm);
      ctx.stroke();

      // Small center dot
      ctx.fillStyle = '#00f0ff';
      ctx.fillRect(x - 1, y - 1, 2, 2);
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(10, 10);
  texture.colorSpace = THREE.SRGBColorSpace;

  const gridGeo = new THREE.PlaneGeometry(160, 160);
  const gridMat = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
    opacity: 0.85,
    depthWrite: false,
  });
  gridMat.polygonOffset = true;
  gridMat.polygonOffsetFactor = -1;
  gridMat.polygonOffsetUnits = -1;

  const gridMesh = new THREE.Mesh(gridGeo, gridMat);
  gridMesh.rotation.x = -Math.PI / 2;
  gridMesh.position.y = -0.02;
  group.add(gridMesh);

  return group;
}
