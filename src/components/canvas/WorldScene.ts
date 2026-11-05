import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { createFloorGrid } from './models/FloorGrid';
import { createCentralCore } from './models/CentralCore';
import { createCircuitPaths } from './models/CircuitPaths';
import { createNodeStructures, InteractiveNodeItem } from './models/NodeStructures';
import { createAtmosphere } from './models/Atmosphere';
import { sound } from '../../utils/audio';

export interface WorldSceneOptions {
  container: HTMLDivElement;
  onNodeSelect: (nodeId: string) => void;
  onNodeHover: (nodeId: string | null) => void;
  onFpsUpdate: (fps: number) => void;
}

export class WorldScene {
  private container: HTMLDivElement;
  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;

  private isSoftwareGl = false;
  private highQuality = true;

  // Scene elements
  private centralCore!: ReturnType<typeof createCentralCore>;
  private circuitPaths!: ReturnType<typeof createCircuitPaths>;
  private nodeStructures!: ReturnType<typeof createNodeStructures>;
  private atmosphere!: ReturnType<typeof createAtmosphere>;
  private hitMeshes: THREE.Object3D[] = [];

  // Raycasting & Interaction
  private raycaster = new THREE.Raycaster();
  private mouse = new THREE.Vector2(-999, -999);
  private mouseMoved = false;
  private hoveredNode: InteractiveNodeItem | null = null;
  private selectedNodeId: string | null = null;

  // Camera targets & Kinematics
  private defaultCamPos = new THREE.Vector3(21, 19, 21);
  private defaultLookAt = new THREE.Vector3(0, 0.5, 0);
  private currentLookAt = new THREE.Vector3(0, 0.5, 0);
  private targetCamPos = new THREE.Vector3(21, 19, 21);
  private targetLookAt = new THREE.Vector3(0, 0.5, 0);

  // Parallax / Drag controls
  private isDragging = false;
  private previousMousePosition = { x: 0, y: 0 };
  private orbitAngle = 0;
  private parallaxOffset = new THREE.Vector2(0, 0);

  // FPS tracking & Loop
  private frameCount = 0;
  private lastFpsTime = 0;
  private animationFrameId = 0;

  // Callbacks
  private onNodeSelect: (nodeId: string) => void;
  private onNodeHover: (nodeId: string | null) => void;
  private onFpsUpdate: (fps: number) => void;

  constructor(options: WorldSceneOptions) {
    this.container = options.container;
    this.onNodeSelect = options.onNodeSelect;
    this.onNodeHover = options.onNodeHover;
    this.onFpsUpdate = options.onFpsUpdate;

    this.checkSoftwareGl();
    this.init();
    this.setupEvents();
    this.startLoop();
  }

  private checkSoftwareGl() {
    try {
      const gl = document.createElement('canvas').getContext('webgl2');
      if (!gl) {
        this.isSoftwareGl = true;
        return;
      }
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      this.isSoftwareGl = /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    } catch {
      this.isSoftwareGl = true;
    }
  }

  private init() {
    const width = this.container.clientWidth || window.innerWidth;
    const height = this.container.clientHeight || window.innerHeight;

    // 1. Scene & Dark Cyberpunk Fog
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x030712);
    this.scene.fog = new THREE.FogExp2(0x030712, 0.015);

    // 2. Camera (Isometric perspective with responsive viewport adaptation)
    this.camera = new THREE.PerspectiveCamera(28, width / height, 0.5, 250);
    this.updateCameraForViewport(width, height);
    this.camera.position.copy(this.defaultCamPos);
    this.camera.lookAt(this.defaultLookAt);

    // 3. Renderer with capped pixel ratio to prevent fillrate bottleneck
    this.renderer = new THREE.WebGLRenderer({
      antialias: !this.isSoftwareGl,
      powerPreference: 'high-performance',
      alpha: false,
      depth: true,
      stencil: false,
    });
    this.renderer.setSize(width, height);
    // Cap pixel ratio at 1.5 for ultra-crisp display without GPU lag
    this.renderer.setPixelRatio(this.isSoftwareGl ? 1 : Math.min(window.devicePixelRatio || 1, 1.5));
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.15;
    this.renderer.shadowMap.enabled = !this.isSoftwareGl;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    this.container.innerHTML = '';
    this.container.appendChild(this.renderer.domElement);

    // 4. Studio Environment
    const pmremGenerator = new THREE.PMREMGenerator(this.renderer);
    this.scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // 5. Lighting
    this.setupLighting();

    // 6. Build Scene Objects
    const floor = createFloorGrid();
    this.scene.add(floor);

    this.centralCore = createCentralCore();
    this.scene.add(this.centralCore.group);

    this.circuitPaths = createCircuitPaths();
    this.scene.add(this.circuitPaths.group);

    this.nodeStructures = createNodeStructures();
    this.scene.add(this.nodeStructures.group);

    // Cache hit target meshes once to eliminate array allocation in render tick
    this.hitMeshes = this.nodeStructures.nodes.map((n) => n.hitTarget);

    this.atmosphere = createAtmosphere(this.highQuality);
    this.scene.add(this.atmosphere.group);
  }

  private setupLighting() {
    // Key directional light (cool white)
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.0);
    keyLight.position.set(16, 28, 14);
    keyLight.castShadow = !this.isSoftwareGl;
    if (keyLight.castShadow) {
      keyLight.shadow.mapSize.width = 512;
      keyLight.shadow.mapSize.height = 512;
      keyLight.shadow.bias = -0.0005;
      keyLight.shadow.normalBias = 0.02;
      const d = 22;
      keyLight.shadow.camera.left = -d;
      keyLight.shadow.camera.right = d;
      keyLight.shadow.camera.top = d;
      keyLight.shadow.camera.bottom = -d;
      keyLight.shadow.camera.near = 1;
      keyLight.shadow.camera.far = 70;
    }
    this.scene.add(keyLight);

    // Hemisphere sky/ground fill
    const hemiLight = new THREE.HemisphereLight(0x38bdf8, 0x030712, 1.2);
    hemiLight.position.set(0, 20, 0);
    this.scene.add(hemiLight);

    // Cyan accent backlight
    const cyanRim = new THREE.PointLight(0x00f0ff, 2.0, 40);
    cyanRim.position.set(-16, 12, -16);
    this.scene.add(cyanRim);
  }

  private setupEvents() {
    window.addEventListener('resize', this.onResize);
    this.container.addEventListener('mousemove', this.onMouseMove);
    this.container.addEventListener('mouseleave', this.onMouseLeave);
    this.container.addEventListener('mousedown', this.onMouseDown);
    window.addEventListener('mouseup', this.onMouseUp);
    this.container.addEventListener('click', this.onClick);

    // Touch support for mobile
    this.container.addEventListener('touchstart', this.onTouchStart, { passive: true });
    this.container.addEventListener('touchmove', this.onTouchMove, { passive: true });
    this.container.addEventListener('touchend', this.onTouchEnd);
  }

  private updateCameraForViewport(width: number, height: number) {
    const aspect = width / height;
    this.camera.aspect = aspect;

    if (aspect < 0.8) {
      // Mobile portrait (e.g. 360-430px wide, 750-930px tall, aspect ~0.45 - 0.6)
      // Large and visible 3D world with balanced peripheral node visibility
      const mobileScale = 1.45;
      this.defaultCamPos.set(21 * mobileScale, 19 * mobileScale, 21 * mobileScale);
      this.defaultLookAt.set(0, 0.4, 0);
      this.camera.fov = 36;
      if (this.scene && this.scene.fog && this.scene.fog instanceof THREE.FogExp2) {
        this.scene.fog.density = 0.012;
      }
    } else if (aspect < 1.15) {
      // Tablet portrait / square
      const tabletScale = 1.4;
      this.defaultCamPos.set(21 * tabletScale, 19 * tabletScale, 21 * tabletScale);
      this.defaultLookAt.set(0, 0.35, 0);
      this.camera.fov = 31;
      if (this.scene && this.scene.fog && this.scene.fog instanceof THREE.FogExp2) {
        this.scene.fog.density = 0.011;
      }
    } else {
      // Desktop widescreen (aspect >= 1.15)
      this.defaultCamPos.set(21, 19, 21);
      this.defaultLookAt.set(0, 0.5, 0);
      this.camera.fov = 28;
      if (this.scene && this.scene.fog && this.scene.fog instanceof THREE.FogExp2) {
        this.scene.fog.density = 0.015;
      }
    }

    if (!this.selectedNodeId) {
      this.targetCamPos.copy(this.defaultCamPos);
      this.targetLookAt.copy(this.defaultLookAt);
      this.camera.position.copy(this.targetCamPos);
      this.currentLookAt.copy(this.defaultLookAt);
    }
    this.camera.updateProjectionMatrix();
  }

  private onResize = () => {
    if (!this.container) return;
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;
    this.updateCameraForViewport(width, height);
    this.renderer.setSize(width, height);
  };

  private onMouseMove = (e: MouseEvent) => {
    const rect = this.container.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    this.mouse.set(x, y);
    this.mouseMoved = true;

    // Parallax shift when not focused on a page
    if (!this.selectedNodeId) {
      this.parallaxOffset.set(x * 1.5, y * 1.0);
    }

    if (this.isDragging) {
      const deltaX = e.clientX - this.previousMousePosition.x;
      this.orbitAngle += deltaX * 0.005;
      this.previousMousePosition = { x: e.clientX, y: e.clientY };
    }
  };

  private onMouseLeave = () => {
    this.mouse.set(-999, -999);
    this.parallaxOffset.set(0, 0);
    this.mouseMoved = true;
  };

  private onMouseDown = (e: MouseEvent) => {
    this.isDragging = true;
    this.previousMousePosition = { x: e.clientX, y: e.clientY };
  };

  private onMouseUp = () => {
    this.isDragging = false;
  };

  private touchStartX = 0;
  private touchStartY = 0;

  private onTouchStart = (e: TouchEvent) => {
    if (e.touches.length === 1) {
      this.touchStartX = e.touches[0].clientX;
      this.touchStartY = e.touches[0].clientY;
      this.previousMousePosition = { x: this.touchStartX, y: this.touchStartY };
      this.isDragging = true;
    }
  };

  private onTouchMove = (e: TouchEvent) => {
    if (e.touches.length === 1 && this.isDragging) {
      const deltaX = e.touches[0].clientX - this.previousMousePosition.x;
      this.orbitAngle += deltaX * 0.007;
      this.previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  };

  private onTouchEnd = (e: TouchEvent) => {
    this.isDragging = false;
    // Check if it was a quick tap
    if (e.changedTouches.length === 1) {
      const dist = Math.hypot(
        e.changedTouches[0].clientX - this.touchStartX,
        e.changedTouches[0].clientY - this.touchStartY
      );
      if (dist < 12) {
        const rect = this.container.getBoundingClientRect();
        const x = ((e.changedTouches[0].clientX - rect.left) / rect.width) * 2 - 1;
        const y = -((e.changedTouches[0].clientY - rect.top) / rect.height) * 2 + 1;
        this.mouse.set(x, y);
        this.mouseMoved = true;
        this.checkRaycastClick();
      }
    }
  };

  private onClick = () => {
    this.checkRaycastClick();
  };

  private checkRaycastClick() {
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(this.hitMeshes, false);

    if (intersects.length > 0) {
      const hitObj = intersects[0].object as THREE.Mesh;
      const nodeId = hitObj.userData.nodeId as string;
      if (nodeId) {
        sound.playWarp();
        this.focusOnNode(nodeId);
        this.onNodeSelect(nodeId);
      }
    }
  }

  public focusOnNode(nodeId: string | null) {
    this.selectedNodeId = nodeId;
    if (!nodeId) {
      // Return to isometric overview
      this.targetCamPos.copy(this.defaultCamPos);
      this.targetLookAt.copy(this.defaultLookAt);
      this.orbitAngle = 0;
      sound.playReturn();
      return;
    }

    const targetNode = this.nodeStructures.nodes.find((n) => n.id === nodeId);
    if (targetNode) {
      const pos = targetNode.position;
      // Position camera angled above the node with responsive framing
      const zoomDist = this.camera.aspect < 0.8 ? 12.0 : 8.5;
      this.targetCamPos.set(pos.x + zoomDist, zoomDist * 0.88, pos.z + zoomDist);
      this.targetLookAt.set(pos.x, 1.4, pos.z);
    }
  }

  public setQuality(high: boolean) {
    this.highQuality = high;
    this.renderer.setPixelRatio(high ? Math.min(window.devicePixelRatio || 1, 1.5) : 1);
    this.renderer.shadowMap.enabled = high && !this.isSoftwareGl;
    this.atmosphere.setQuality(high);
  }

  private lastTime = performance.now();
  private startTime = performance.now();

  private startLoop() {
    this.lastTime = performance.now();
    this.startTime = performance.now();
    this.lastFpsTime = performance.now();

    const tick = () => {
      this.animationFrameId = requestAnimationFrame(tick);

      const now = performance.now();
      const delta = Math.min((now - this.lastTime) / 1000, 0.1);
      const time = (now - this.startTime) / 1000;
      this.lastTime = now;

      // Update FPS counter
      this.frameCount++;
      if (now - this.lastFpsTime >= 500) {
        const fps = Math.round((this.frameCount * 1000) / (now - this.lastFpsTime));
        this.onFpsUpdate(fps);
        this.frameCount = 0;
        this.lastFpsTime = now;
      }

      // If a fullpage subpage is open, throttle heavy 3D rendering to save GPU/CPU
      if (this.selectedNodeId) {
        // Lightly advance camera transition then sleep rendering
        this.camera.position.x = THREE.MathUtils.damp(this.camera.position.x, this.targetCamPos.x, 3.5, delta);
        this.camera.position.y = THREE.MathUtils.damp(this.camera.position.y, this.targetCamPos.y, 3.5, delta);
        this.camera.position.z = THREE.MathUtils.damp(this.camera.position.z, this.targetCamPos.z, 3.5, delta);
        this.currentLookAt.x = THREE.MathUtils.damp(this.currentLookAt.x, this.targetLookAt.x, 4.0, delta);
        this.currentLookAt.y = THREE.MathUtils.damp(this.currentLookAt.y, this.targetLookAt.y, 4.0, delta);
        this.currentLookAt.z = THREE.MathUtils.damp(this.currentLookAt.z, this.targetLookAt.z, 4.0, delta);
        this.camera.lookAt(this.currentLookAt);
        return;
      }

      // Update procedural elements
      this.centralCore.update(time, delta);
      this.circuitPaths.update(time, delta);
      this.nodeStructures.update(time, delta);
      this.atmosphere.update(time, delta);

      // Perform Raycasting hover only when pointer has moved
      if (this.mouseMoved) {
        this.mouseMoved = false;
        this.raycaster.setFromCamera(this.mouse, this.camera);
        const intersects = this.raycaster.intersectObjects(this.hitMeshes, false);

        if (intersects.length > 0) {
          const hitObj = intersects[0].object as THREE.Mesh;
          const matched = this.nodeStructures.nodes.find((n) => n.id === hitObj.userData.nodeId);
          if (matched && matched !== this.hoveredNode) {
            if (this.hoveredNode) this.hoveredNode.hoverHighlight(false);
            this.hoveredNode = matched;
            this.hoveredNode.hoverHighlight(true);
            this.container.style.cursor = 'pointer';
            this.onNodeHover(matched.id);
            sound.playHover();
          }
        } else {
          if (this.hoveredNode) {
            this.hoveredNode.hoverHighlight(false);
            this.hoveredNode = null;
            this.container.style.cursor = 'default';
            this.onNodeHover(null);
          }
        }
      }

      // Camera Smooth Kinematics (Exponential Damping)
      let desiredX = this.targetCamPos.x;
      let desiredZ = this.targetCamPos.z;

      if (!this.selectedNodeId && Math.abs(this.orbitAngle) > 0.001) {
        const radius = Math.hypot(this.defaultCamPos.x, this.defaultCamPos.z);
        const currentAngle = Math.atan2(this.defaultCamPos.z, this.defaultCamPos.x) + this.orbitAngle;
        desiredX = Math.cos(currentAngle) * radius;
        desiredZ = Math.sin(currentAngle) * radius;
      }

      // Add gentle parallax offset
      desiredX += this.parallaxOffset.x;
      desiredZ += this.parallaxOffset.y;

      this.camera.position.x = THREE.MathUtils.damp(this.camera.position.x, desiredX, 3.5, delta);
      this.camera.position.y = THREE.MathUtils.damp(this.camera.position.y, this.targetCamPos.y, 3.5, delta);
      this.camera.position.z = THREE.MathUtils.damp(this.camera.position.z, desiredZ, 3.5, delta);

      this.currentLookAt.x = THREE.MathUtils.damp(this.currentLookAt.x, this.targetLookAt.x, 4.0, delta);
      this.currentLookAt.y = THREE.MathUtils.damp(this.currentLookAt.y, this.targetLookAt.y, 4.0, delta);
      this.currentLookAt.z = THREE.MathUtils.damp(this.currentLookAt.z, this.targetLookAt.z, 4.0, delta);

      this.camera.lookAt(this.currentLookAt);

      this.renderer.render(this.scene, this.camera);
    };

    tick();
  }

  public dispose() {
    cancelAnimationFrame(this.animationFrameId);
    window.removeEventListener('resize', this.onResize);
    this.container.removeEventListener('mousemove', this.onMouseMove);
    this.container.removeEventListener('mouseleave', this.onMouseLeave);
    this.container.removeEventListener('mousedown', this.onMouseDown);
    window.removeEventListener('mouseup', this.onMouseUp);
    this.container.removeEventListener('click', this.onClick);

    this.container.removeEventListener('touchstart', this.onTouchStart);
    this.container.removeEventListener('touchmove', this.onTouchMove);
    this.container.removeEventListener('touchend', this.onTouchEnd);

    this.renderer.dispose();
  }
}
