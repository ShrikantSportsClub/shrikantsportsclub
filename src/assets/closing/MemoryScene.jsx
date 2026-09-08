import { useEffect, useRef } from "react";
import * as THREE from "three";
import { MEMORY_LAYERS } from "./memory-layers";

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const lerp = (a, b, t) => a + (b - a) * t;
const seg = (p, from, to) => clamp((p - from) / (to - from));
const easeInOut = (t) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

const CAM_START = 12;
const CAM_END = -160;
const FOG_COLOR = new THREE.Color(0x0a0605);

const vertexShader = `
  uniform float uTime;
  uniform float uDissolve;
  varying vec2 vUv;
  varying float vDepth;

  void main() {
    vUv = uv;
    vec3 pos = position;
    float wave = sin(pos.x * 0.55 + uTime * 0.8) * cos(pos.y * 0.7 - uTime * 0.6);
    pos.z += wave * (0.25 + uDissolve * 4.2);
    pos.xy *= 1.0 + uDissolve * 0.06;
    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    vDepth = -mv.z;
    gl_Position = projectionMatrix * mv;
  }
`;

const fragmentShader = `
  uniform sampler2D uMap;
  uniform float uOpacity;
  uniform float uDissolve;
  uniform float uTime;
  uniform vec3 uFogColor;
  uniform float uFogDensity;
  uniform vec3 uWarm;
  varying vec2 vUv;
  varying float vDepth;

  float noise(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  void main() {
    vec2 uv = vUv;
    vec2 c = uv - 0.5;
    float d = length(c);
    uv += normalize(c + 0.0001) * uDissolve * 0.06 * (0.3 + d);
    float shift = uDissolve * 0.012;
    vec3 col;
    col.r = texture2D(uMap, uv + vec2(shift, 0.0)).r;
    col.g = texture2D(uMap, uv).g;
    col.b = texture2D(uMap, uv - vec2(shift, 0.0)).b;

    col = mix(col, col * uWarm, 0.45);
    col *= 0.86 + 0.2 * (1.0 - d);

    float n = noise(floor(uv * 220.0) + floor(uTime * 6.0));
    float grainCut = step(uDissolve * 0.85, n * 0.75 + (1.0 - d) * 0.6);

    float edge = smoothstep(0.5, 0.36, max(abs(vUv.x - 0.5), abs(vUv.y - 0.5)));
    float alpha = uOpacity * edge * grainCut;

    float fog = 1.0 - exp(-uFogDensity * uFogDensity * vDepth * vDepth);
    col = mix(col, uFogColor, clamp(fog, 0.0, 0.92));

    if (alpha <= 0.01) discard;
    gl_FragColor = vec4(col, alpha);
  }
`;

export default function MemoryScene({ progressRef }) {
  const hostRef = useRef(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return undefined;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    renderer.setSize(host.clientWidth, host.clientHeight);
    renderer.setClearColor(0x000000, 0);
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(FOG_COLOR.getHex(), 0.0085);

    const camera = new THREE.PerspectiveCamera(
      52,
      host.clientWidth / Math.max(1, host.clientHeight),
      0.1,
      500,
    );
    camera.position.set(0, 0, CAM_START);

    const loader = new THREE.TextureLoader();
    const meshes = MEMORY_LAYERS.map((layer) => {
      const texture = loader.load(layer.url);
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.anisotropy = Math.min(
        8,
        renderer.capabilities.getMaxAnisotropy(),
      );

      const material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        transparent: true,
        depthWrite: false,
        depthTest: true,
        side: THREE.DoubleSide,
        uniforms: {
          uMap: { value: texture },
          uOpacity: { value: 0 },
          uDissolve: { value: 0 },
          uTime: { value: 0 },
          uFogColor: { value: FOG_COLOR.clone() },
          uFogDensity: { value: 0.0085 },
          uWarm: { value: new THREE.Color(1.06, 0.94, 0.82) },
        },
      });

      const geo = new THREE.PlaneGeometry(
        layer.width,
        layer.width / layer.aspect,
        96,
        56,
      );

      const mesh = new THREE.Mesh(geo, material);
      scene.add(mesh);
      return { mesh, material, layer };
    });

    const count = 1100;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      positions[i * 3] = (Math.random() - 0.5) * 70;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 44;
      positions[i * 3 + 2] = -Math.random() * 240 + 15;
    }

    const dustGeo = new THREE.BufferGeometry();
    dustGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const dust = new THREE.Points(
      dustGeo,
      new THREE.PointsMaterial({
        color: new THREE.Color(0xf0c886),
        size: 0.16,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.32,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    );
    scene.add(dust);

    const resize = () => {
      const w = host.clientWidth;
      const h = Math.max(1, host.clientHeight);
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };

    window.addEventListener("resize", resize);

    let raf = 0;
    const start = performance.now();

    const render = () => {
      const t = (performance.now() - start) / 1000;
      const p = clamp(progressRef.current);
      const travel = easeInOut(seg(p, 0, 0.82));
      const finale = easeInOut(seg(p, 0.78, 1));

      const camZ = lerp(CAM_START, CAM_END, travel);
      camera.position.set(
        Math.sin(t * 0.16) * 0.9 + lerp(0, -0.6, finale),
        Math.sin(t * 0.21) * 0.6,
        camZ,
      );
      camera.rotation.z = Math.sin(t * 0.12) * 0.012;
      camera.lookAt(0, 0, camZ - 20);

      dust.rotation.z = t * 0.01;

      meshes.forEach(({ mesh, material, layer }, i) => {
        const finalZ = CAM_END + layer.final.z;
        const idleX = layer.x + Math.sin(t * 0.2 + i) * 0.35;
        const idleY = layer.y + Math.cos(t * 0.17 + i) * 0.28;

        mesh.position.set(
          lerp(idleX, layer.final.x, finale),
          lerp(idleY, layer.final.y, finale),
          lerp(layer.z, finalZ, finale),
        );

        mesh.rotation.set(
          lerp(Math.sin(t * 0.14 + i) * 0.03, 0, finale),
          lerp(
            Math.sin(t * 0.11 + i * 2) * 0.05,
            layer.final.rotY,
            finale,
          ),
          0,
        );

        mesh.scale.setScalar(lerp(1, layer.final.scale, finale));

        const d = mesh.position.z - camera.position.z;
        const near = 1 - clamp(Math.abs(d) / 16);
        const dissolve =
          Math.pow(Math.max(0, near), 1.6) * (1 - finale * 0.85);

        material.uniforms.uDissolve.value = dissolve;

        const approaching = clamp((-d - 4) / 26);
        const passed = clamp(1 - clamp(-d / 9));
        material.uniforms.uOpacity.value = Math.max(
          approaching * (1 - passed * 0.9) * (1 - finale),
          finale,
        );

        material.uniforms.uTime.value = t;
      });

      renderer.render(scene, camera);
      raf = requestAnimationFrame(render);
    };

    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);

      meshes.forEach(({ mesh, material }) => {
        mesh.geometry.dispose();
        material.uniforms.uMap.value?.dispose?.();
        material.dispose();
      });

      dustGeo.dispose();
      dust.material.dispose();
      renderer.dispose();

      if (renderer.domElement.parentNode === host) {
        host.removeChild(renderer.domElement);
      }
    };
  }, [progressRef]);

  return <div ref={hostRef} className="closing-memory-canvas" aria-hidden="true" />;
}
