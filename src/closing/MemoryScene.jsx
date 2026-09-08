import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { memoryLayers } from "./memory-layers";

export default function MemoryScene({ progress = 0 }) {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0605);
    scene.fog = new THREE.FogExp2(0x0a0605, 0.018);

    const camera = new THREE.PerspectiveCamera(
      42,
      mount.clientWidth / mount.clientHeight,
      0.1,
      500
    );

    camera.position.set(0, 0, 12);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    mount.appendChild(renderer.domElement);

    const ambient = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambient);

    const loader = new THREE.TextureLoader();
    const planes = [];

    const positions = [
      { x: 0, y: 0, z: -34 },
      { x: 0.2, y: -0.05, z: -78 },
      { x: -0.15, y: 0.08, z: -122 },
      { x: 0.12, y: -0.05, z: -166 },
      { x: -0.1, y: 0.06, z: -210 },
      { x: 0, y: 0, z: -254 },
    ];

    memoryLayers.forEach((layer, index) => {
      const texture = loader.load(layer.src);

      texture.colorSpace = THREE.SRGBColorSpace;
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;

      const geometry = new THREE.PlaneGeometry(16, 10);

      const material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        opacity: 1,
        side: THREE.DoubleSide,
      });

      const mesh = new THREE.Mesh(geometry, material);

      const position = positions[index];

      mesh.position.set(
        position.x,
        position.y,
        position.z
      );

      mesh.userData.baseZ = position.z;
      mesh.userData.index = index;

      scene.add(mesh);
      planes.push(mesh);
    });

    /*
     * Atmospheric particles
     */
    const particleCount = 700;
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] =
        (Math.random() - 0.5) * 25;

      particlePositions[i * 3 + 1] =
        (Math.random() - 0.5) * 15;

      particlePositions[i * 3 + 2] =
        -Math.random() * 280;
    }

    const particleGeometry =
      new THREE.BufferGeometry();

    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(
        particlePositions,
        3
      )
    );

    const particleMaterial =
      new THREE.PointsMaterial({
        color: 0xffd8b0,
        size: 0.035,
        transparent: true,
        opacity: 0.35,
        depthWrite: false,
      });

    const particles = new THREE.Points(
      particleGeometry,
      particleMaterial
    );

    scene.add(particles);

    sceneRef.current = {
      scene,
      camera,
      renderer,
      planes,
      particles,
    };

    const resize = () => {
      if (!mount) return;

      camera.aspect =
        mount.clientWidth / mount.clientHeight;

      camera.updateProjectionMatrix();

      renderer.setSize(
        mount.clientWidth,
        mount.clientHeight
      );
    };

    window.addEventListener("resize", resize);

    let animationFrame;

    const animate = () => {
      animationFrame =
        requestAnimationFrame(animate);

      particles.rotation.y += 0.00015;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);

      planes.forEach((mesh) => {
        mesh.geometry.dispose();

        if (mesh.material.map) {
          mesh.material.map.dispose();
        }

        mesh.material.dispose();
      });

      particleGeometry.dispose();
      particleMaterial.dispose();

      renderer.dispose();

      if (
        renderer.domElement &&
        mount.contains(renderer.domElement)
      ) {
        mount.removeChild(
          renderer.domElement
        );
      }
    };
  }, []);

  /*
   * Scroll / camera animation
   */
  useEffect(() => {
    const data = sceneRef.current;

    if (!data) return;

    const {
      camera,
      planes,
    } = data;

    const p = THREE.MathUtils.clamp(
      progress,
      0,
      1
    );

    /*
     * Camera travels through the six memories.
     */
    const cameraZ = THREE.MathUtils.lerp(
      12,
      -275,
      p
    );

    camera.position.z = cameraZ;

    /*
     * Subtle cinematic camera movement.
     */
    camera.position.x =
      Math.sin(p * Math.PI * 2) * 0.15;

    camera.position.y =
      Math.sin(p * Math.PI) * 0.08;

    camera.lookAt(
      camera.position.x,
      camera.position.y,
      camera.position.z - 20
    );

    /*
     * Each layer becomes visible as the
     * camera approaches it and fades after
     * the camera passes it.
     */
    planes.forEach((plane, index) => {
      const stageStart =
        index / planes.length;

      const stageEnd =
        (index + 1) / planes.length;

      const localProgress = THREE.MathUtils.clamp(
        (p - stageStart) /
          (stageEnd - stageStart),
        0,
        1
      );

      const fadeIn =
        THREE.MathUtils.smoothstep(
          localProgress,
          0,
          0.25
        );

      const fadeOut =
        1 -
        THREE.MathUtils.smoothstep(
          localProgress,
          0.72,
          1
        );

      plane.material.opacity =
        Math.max(
          0,
          Math.min(
            1,
            fadeIn * fadeOut
          )
        );

      const scale =
        1 +
        localProgress * 0.18;

      plane.scale.set(
        scale,
        scale,
        scale
      );

      plane.rotation.z =
        Math.sin(
          localProgress * Math.PI
        ) *
        0.012;
    });
  }, [progress]);

  return (
    <div
      ref={mountRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        overflow: "hidden",
      }}
    />
  );
}