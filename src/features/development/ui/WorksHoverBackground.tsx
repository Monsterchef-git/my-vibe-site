'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from '@/lib/gsap';
import { cx } from '@/lib/utils/cx';

interface WorksHoverBackgroundProps {
  /** Project image sources, stable across renders. */
  images: string[];
  /** Index of the hovered project, or null when nothing is hovered. */
  activeIndex: number | null;
  className?: string;
}

const VISIBLE_OPACITY = 0.22;

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
  uniform float uMix;
  uniform vec2 uResolution;
  uniform vec2 uFromSize;
  uniform vec2 uToSize;
  uniform vec2 uMouse;
  varying vec2 vUv;

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
    float n = noise(vUv * 2.5 + uMix);
    // Displacement peaks mid-transition, zero at both ends.
    float wave = 4.0 * uMix * (1.0 - uMix);
    float disp = 0.05 * n * wave;
    // Gentle cursor parallax.
    vec2 par = (uMouse - 0.5) * 0.03;

    vec2 uvFrom = coverUv(vUv, uFromSize, uResolution) + par + disp;
    vec2 uvTo = coverUv(vUv, uToSize, uResolution) + par - disp;

    vec4 from = texture2D(uFrom, uvFrom);
    vec4 to = texture2D(uTo, uvTo);
    gl_FragColor = mix(from, to, smoothstep(0.0, 1.0, uMix));
  }
`;

type Engine = {
  uniforms: {
    uFrom: { value: THREE.Texture | null };
    uTo: { value: THREE.Texture | null };
    uMix: { value: number };
    uResolution: { value: THREE.Vector2 };
    uFromSize: { value: THREE.Vector2 };
    uToSize: { value: THREE.Vector2 };
    uMouse: { value: THREE.Vector2 };
  };
  textures: THREE.Texture[];
  render: () => void;
};

/**
 * Full-bleed blurred background that crossfades to the hovered project through a
 * noise-displaced shader, with subtle cursor parallax. Vanilla three.js (no R3F)
 * to avoid global JSX type augmentation. Mounted only when WebGL is available;
 * otherwise the caller keeps its DOM <Image> fallback.
 */
export default function WorksHoverBackground({
  images,
  activeIndex,
  className,
}: WorksHoverBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Engine | null>(null);
  const currentIndexRef = useRef<number | null>(null);
  const latestActiveRef = useRef<number | null>(activeIndex);
  const transitionRef = useRef<((index: number | null) => void) | null>(null);
  const mouseRef = useRef<[number, number]>([0.5, 0.5]);
  const reducedMotionRef = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    reducedMotionRef.current = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      alpha: true,
      powerPreference: 'high-performance',
    });
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    renderer.setPixelRatio(dpr);
    renderer.setClearColor(0x000000, 0);
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
    const uniforms: Engine['uniforms'] = {
      uFrom: { value: null },
      uTo: { value: null },
      uMix: { value: 1 },
      uResolution: { value: new THREE.Vector2(1, 1) },
      uFromSize: { value: new THREE.Vector2(1, 1) },
      uToSize: { value: new THREE.Vector2(1, 1) },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    };
    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
      transparent: true,
    });
    scene.add(new THREE.Mesh(geometry, material));

    let disposed = false;

    const render = () => {
      if (disposed) return;
      uniforms.uMouse.value.set(mouseRef.current[0], mouseRef.current[1]);
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

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    const onPointerMove = (event: PointerEvent) => {
      mouseRef.current = [
        event.clientX / window.innerWidth,
        1 - event.clientY / window.innerHeight,
      ];
      if (currentIndexRef.current !== null && !reducedMotionRef.current) render();
    };
    window.addEventListener('pointermove', onPointerMove, { passive: true });

    const setFrame = (
      slot: 'uFrom' | 'uTo',
      sizeSlot: 'uFromSize' | 'uToSize',
      texture: THREE.Texture,
    ) => {
      const image = texture.image as HTMLImageElement;
      uniforms[slot].value = texture;
      uniforms[sizeSlot].value.set(image.width, image.height);
    };

    const transition = (index: number | null) => {
      const engine = engineRef.current;
      if (!engine || !containerRef.current) return;

      if (index === null) {
        containerRef.current.style.opacity = '0';
        currentIndexRef.current = null;
        return;
      }

      const texture = engine.textures[index];
      if (!texture) return;

      if (currentIndexRef.current === null) {
        // Fade in straight to the hovered frame.
        setFrame('uFrom', 'uFromSize', texture);
        setFrame('uTo', 'uToSize', texture);
        uniforms.uMix.value = 1;
        render();
        containerRef.current.style.opacity = String(VISIBLE_OPACITY);
      } else if (currentIndexRef.current !== index) {
        setFrame('uFrom', 'uFromSize', engine.textures[currentIndexRef.current]);
        setFrame('uTo', 'uToSize', texture);
        uniforms.uMix.value = 0;
        containerRef.current.style.opacity = String(VISIBLE_OPACITY);
        gsap.killTweensOf(uniforms.uMix);
        if (reducedMotionRef.current) {
          uniforms.uMix.value = 1;
          render();
        } else {
          gsap.to(uniforms.uMix, {
            value: 1,
            duration: 0.7,
            ease: 'power2.out',
            onUpdate: render,
          });
        }
      }

      currentIndexRef.current = index;
    };

    const loader = new THREE.TextureLoader();
    Promise.all(
      images.map(
        (src) =>
          new Promise<THREE.Texture>((resolve, reject) => {
            loader.load(src, resolve, undefined, reject);
          }),
      ),
    )
      .then((textures) => {
        if (disposed) {
          textures.forEach((texture) => texture.dispose());
          return;
        }
        textures.forEach((texture) => {
          texture.colorSpace = THREE.SRGBColorSpace;
          texture.minFilter = THREE.LinearFilter;
          texture.magFilter = THREE.LinearFilter;
          texture.generateMipmaps = false;
        });
        engineRef.current = { uniforms, textures, render };
        transitionRef.current = transition;
        resize();
        // Apply whatever the hover state is now (textures may finish after a hover).
        transition(latestActiveRef.current);
      })
      .catch(() => {
        // Texture/WebGL failure: caller keeps its DOM fallback.
      });

    return () => {
      disposed = true;
      window.removeEventListener('pointermove', onPointerMove);
      resizeObserver.disconnect();
      gsap.killTweensOf(uniforms.uMix);
      geometry.dispose();
      material.dispose();
      engineRef.current?.textures.forEach((texture) => texture.dispose());
      renderer.dispose();
      renderer.domElement.remove();
      engineRef.current = null;
      transitionRef.current = null;
    };
  }, [images]);

  useEffect(() => {
    latestActiveRef.current = activeIndex;
    transitionRef.current?.(activeIndex);
  }, [activeIndex]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={cx('pointer-events-none', className)}
      style={{
        opacity: 0,
        transition: 'opacity 700ms cubic-bezier(0.16, 1, 0.3, 1)',
        filter: 'blur(7px)',
        transform: 'scale(1.06)',
      }}
    />
  );
}
