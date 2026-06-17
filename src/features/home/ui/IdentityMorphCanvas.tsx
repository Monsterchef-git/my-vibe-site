'use client';

import { useEffect, useRef } from 'react';
import type { MutableRefObject } from 'react';
import * as THREE from 'three';

export interface IdentityMorphCanvasProps {
  /** Live scroll-driven morph value (0 = chef, 1 = dev), written by the parent. */
  progressRef: MutableRefObject<number>;
  fromSrc: string;
  toSrc: string;
  onReady?: () => void;
  className?: string;
  /**
   * Filled with a redraw function so the parent can request a frame on each
   * scroll tick — the canvas renders on demand, not in a continuous loop.
   */
  invalidateRef?: MutableRefObject<(() => void) | null>;
  /** Cursor position in uv space (0..1, y-up); [-1, -1] when the cursor is away. */
  mouseRef?: MutableRefObject<[number, number]>;
}

const VERTEX_SHADER = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const FRAGMENT_SHADER = /* glsl */ `
  precision highp float;

  uniform sampler2D uFrom;
  uniform sampler2D uTo;
  uniform float uProgress;
  uniform vec2 uResolution;
  uniform vec2 uFromSize;
  uniform vec2 uToSize;
  uniform vec2 uMouse;
  varying vec2 vUv;

  // object-fit: cover for a texture of size \`tex\` inside viewport \`res\`.
  vec2 coverUv(vec2 uv, vec2 tex, vec2 res) {
    vec2 ratio = vec2(
      min((res.x / res.y) / (tex.x / tex.y), 1.0),
      min((res.y / res.x) / (tex.y / tex.x), 1.0)
    );
    return uv * ratio + (1.0 - ratio) * 0.5;
  }

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
  }

  void main() {
    float p = uProgress;
    float n = noise(vUv * 3.0 + p * 1.5);

    // Displace the two frames in opposite directions so they "peel" apart.
    float disp = 0.07 * n;
    vec2 uvFrom = coverUv(vUv, uFromSize, uResolution) + disp * p;
    vec2 uvTo = coverUv(vUv, uToSize, uResolution) - disp * (1.0 - p);

    // Cursor lens: push the imagery radially around the pointer. uMouse = (-1,-1)
    // when the cursor is away, leaving the field untouched.
    float md = distance(vUv, uMouse);
    float ripple = smoothstep(0.30, 0.0, md);
    vec2 mdir = normalize(vUv - uMouse + vec2(1e-4));
    uvFrom += mdir * ripple * 0.05;
    uvTo += mdir * ripple * 0.05;

    vec4 from = texture2D(uFrom, uvFrom);
    vec4 to = texture2D(uTo, uvTo);

    // Organic crossfade edge guided by the same noise field.
    float edge = smoothstep(0.0, 1.0, p + (n - 0.5) * 0.28);
    gl_FragColor = mix(from, to, clamp(edge, 0.0, 1.0));
  }
`;

function loadTexture(loader: THREE.TextureLoader, src: string) {
  return new Promise<THREE.Texture>((resolve, reject) => {
    loader.load(src, resolve, undefined, reject);
  });
}

/**
 * Imperative Three.js layer (no react-three-fiber) — a single full-screen quad
 * that crossfades the two morph frames through a noise-displaced shader. Kept
 * vanilla so it adds no JSX type augmentation and a minimal bundle.
 */
export default function IdentityMorphCanvas({
  progressRef,
  fromSrc,
  toSrc,
  onReady,
  className,
  invalidateRef,
  mouseRef,
}: IdentityMorphCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const onReadyRef = useRef(onReady);

  useEffect(() => {
    onReadyRef.current = onReady;
  }, [onReady]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      alpha: false,
      powerPreference: 'high-performance',
    });
    const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
    renderer.setPixelRatio(dpr);
    renderer.setClearColor(0x000000, 1);
    Object.assign(renderer.domElement.style, {
      position: 'absolute',
      inset: '0',
      width: '100%',
      height: '100%',
    });
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const geometry = new THREE.PlaneGeometry(2, 2);
    const uniforms = {
      uFrom: { value: null as THREE.Texture | null },
      uTo: { value: null as THREE.Texture | null },
      uProgress: { value: progressRef.current },
      uResolution: { value: new THREE.Vector2(1, 1) },
      uFromSize: { value: new THREE.Vector2(1, 1) },
      uToSize: { value: new THREE.Vector2(1, 1) },
      uMouse: { value: new THREE.Vector2(-1, -1) },
    };
    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    let disposed = false;
    let ready = false;

    const render = () => {
      if (disposed || !ready) return;
      uniforms.uProgress.value = progressRef.current;
      if (mouseRef) {
        uniforms.uMouse.value.set(mouseRef.current[0], mouseRef.current[1]);
      }
      renderer.render(scene, camera);
    };

    const resize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      if (width === 0 || height === 0) return;
      renderer.setSize(width, height, false);
      uniforms.uResolution.value.set(width * dpr, height * dpr);
      render();
    };

    if (invalidateRef) invalidateRef.current = render;

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    const loader = new THREE.TextureLoader();
    Promise.all([
      loadTexture(loader, fromSrc),
      loadTexture(loader, toSrc),
    ])
      .then(([fromTex, toTex]) => {
        if (disposed) {
          fromTex.dispose();
          toTex.dispose();
          return;
        }
        for (const tex of [fromTex, toTex]) {
          tex.colorSpace = THREE.SRGBColorSpace;
          tex.minFilter = THREE.LinearFilter;
          tex.magFilter = THREE.LinearFilter;
          tex.generateMipmaps = false;
        }
        const fromImage = fromTex.image as HTMLImageElement;
        const toImage = toTex.image as HTMLImageElement;
        uniforms.uFrom.value = fromTex;
        uniforms.uTo.value = toTex;
        uniforms.uFromSize.value.set(fromImage.width, fromImage.height);
        uniforms.uToSize.value.set(toImage.width, toImage.height);
        ready = true;
        resize();
        onReadyRef.current?.();
      })
      .catch(() => {
        // WebGL/texture failure leaves the parent on its <Image> baseline.
      });

    return () => {
      disposed = true;
      if (invalidateRef) invalidateRef.current = null;
      resizeObserver.disconnect();
      geometry.dispose();
      material.dispose();
      uniforms.uFrom.value?.dispose();
      uniforms.uTo.value?.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [fromSrc, toSrc, progressRef, invalidateRef, mouseRef]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={className}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
    />
  );
}
