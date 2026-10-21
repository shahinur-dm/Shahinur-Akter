import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const Hero3DCanvas: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    // Check prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) return;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const width = currentMount.clientWidth || 500;
    const height = currentMount.clientHeight || 500;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 7;

    // 2. Renderer with transparent background & antialiasing
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    currentMount.appendChild(renderer.domElement);

    // 3. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xf97316, 3, 20); // Vibrant orange
    pointLight1.position.set(4, 3, 4);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xfdba74, 2, 20); // Soft peach
    pointLight2.position.set(-4, -3, 2);
    scene.add(pointLight2);

    // 4. Glossy 3D Objects
    // Main Orbital Torus
    const torusGeo = new THREE.TorusGeometry(2.3, 0.08, 16, 100);
    const torusMat = new THREE.MeshPhysicalMaterial({
      color: 0xf97316,
      emissive: 0xea580c,
      emissiveIntensity: 0.2,
      roughness: 0.1,
      metalness: 0.3,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    });
    const torus = new THREE.Mesh(torusGeo, torusMat);
    torus.rotation.x = Math.PI / 3;
    torus.rotation.y = Math.PI / 6;
    scene.add(torus);

    // Inner Secondary Ring
    const innerRingGeo = new THREE.TorusGeometry(1.8, 0.04, 16, 80);
    const innerRingMat = new THREE.MeshStandardMaterial({
      color: 0xfdba74,
      roughness: 0.2,
      metalness: 0.5,
    });
    const innerRing = new THREE.Mesh(innerRingGeo, innerRingMat);
    innerRing.rotation.x = -Math.PI / 4;
    scene.add(innerRing);

    // Floating 3D Octahedron / Crystal
    const octaGeo = new THREE.OctahedronGeometry(0.45, 0);
    const octaMat = new THREE.MeshPhysicalMaterial({
      color: 0xf97316,
      roughness: 0.15,
      metalness: 0.1,
      transmission: 0.4,
      thickness: 0.8,
    });
    const octa = new THREE.Mesh(octaGeo, octaMat);
    octa.position.set(2.4, 1.8, 0.5);
    scene.add(octa);

    // Small Floating Sphere
    const sphereGeo = new THREE.SphereGeometry(0.3, 32, 32);
    const sphereMat = new THREE.MeshStandardMaterial({
      color: 0xf97316,
      roughness: 0.2,
      metalness: 0.2,
    });
    const sphere = new THREE.Mesh(sphereGeo, sphereMat);
    sphere.position.set(-2.2, -1.6, 0.8);
    scene.add(sphere);

    // Subtle Particle Cloud
    const particleCount = 45;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 8;
      positions[i + 1] = (Math.random() - 0.5) * 8;
      positions[i + 2] = (Math.random() - 0.5) * 4;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xfb923c,
      size: 0.06,
      transparent: true,
      opacity: 0.7,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 5. Mouse Parallax
    let targetX = 0;
    let targetY = 0;
    let windowHalfX = window.innerWidth / 2;
    let windowHalfY = window.innerHeight / 2;

    const handleMouseMove = (event: MouseEvent) => {
      targetX = (event.clientX - windowHalfX) * 0.0006;
      targetY = (event.clientY - windowHalfY) * 0.0006;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // 6. Resize Handler
    const handleResize = () => {
      if (!mountRef.current) return;
      const newW = mountRef.current.clientWidth;
      const newH = mountRef.current.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
      windowHalfX = window.innerWidth / 2;
      windowHalfY = window.innerHeight / 2;
    };

    window.addEventListener('resize', handleResize);

    // 7. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth camera parallax
      camera.position.x += (targetX * 2 - camera.position.x) * 0.05;
      camera.position.y += (-targetY * 2 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      // Rotations & Floating Motion
      torus.rotation.z = elapsedTime * 0.15;
      torus.rotation.y = elapsedTime * 0.1;

      innerRing.rotation.z = -elapsedTime * 0.2;
      innerRing.rotation.x = Math.sin(elapsedTime * 0.5) * 0.3;

      octa.rotation.x = elapsedTime * 0.5;
      octa.rotation.y = elapsedTime * 0.7;
      octa.position.y = 1.8 + Math.sin(elapsedTime * 1.5) * 0.15;

      sphere.position.y = -1.6 + Math.cos(elapsedTime * 1.2) * 0.12;

      particles.rotation.y = elapsedTime * 0.04;

      renderer.render(scene, camera);
    };

    animate();

    // 8. Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);

      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }

      // Dispose Geometries and Materials
      torusGeo.dispose();
      torusMat.dispose();
      innerRingGeo.dispose();
      innerRingMat.dispose();
      octaGeo.dispose();
      octaMat.dispose();
      sphereGeo.dispose();
      sphereMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 pointer-events-none z-10 w-full h-full overflow-hidden"
      aria-hidden="true"
    />
  );
};
