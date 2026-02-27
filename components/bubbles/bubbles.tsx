"use client";

import { useBubbleStore } from "@/store/useZuStore";
import { useFrame } from "@react-three/fiber";
import { useRef, useEffect, useMemo } from "react";
import * as THREE from "three";

// Pre-computed noise function using simple sine waves (faster than simplex-noise)
const fastNoise = (x: number, y: number, z: number) => {
  return (
    Math.sin(x * 1.2 + y * 0.9) * 0.5 +
    Math.sin(y * 1.5 + z * 0.8) * 0.3 +
    Math.sin(z * 1.1 + x * 0.7) * 0.2
  );
};

export const Bubbles = ({
  count = 400,
  speed = 5,
  bubbleSize = 0.01,
  opacity = 0.3,
  color = "#591420",
  repeat = true,
}) => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const isPlaying = useBubbleStore((state) => state.isPlaying);

  const minSpeed = speed * 0.0015;
  const maxSpeed = speed * 0.0075;

  // Pre-compute initial positions and speeds (done once)
  const { positions, speeds, noiseOffsets } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    const offsets = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      // Random initial positions
      pos[i * 3] = (Math.random() - 0.5) * 8; // x: -4 to 4
      pos[i * 3 + 1] = Math.random() * 6 - 2; // y: -2 to 4
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8; // z: -4 to 4

      // Pre-computed speeds
      spd[i] = minSpeed + Math.random() * (maxSpeed - minSpeed);

      // Pre-computed noise offsets for variety
      offsets[i * 3] = Math.random() * 100;
      offsets[i * 3 + 1] = Math.random() * 100;
      offsets[i * 3 + 2] = Math.random() * 100;
    }

    return { positions: pos, speeds: spd, noiseOffsets: offsets };
  }, [count, minSpeed, maxSpeed]);

  // Reduced geometry segments for better performance
  const geometry = useMemo(
    () => new THREE.SphereGeometry(bubbleSize, 8, 8),
    [bubbleSize]
  );

  // Use MeshBasicMaterial - much cheaper than MeshStandardMaterial
  const material = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        transparent: true,
        opacity,
        depthWrite: false,
        depthTest: true,
        color,
      }),
    [opacity, color]
  );

  // Reusable objects to avoid GC
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const tempPos = useMemo(() => new THREE.Vector3(), []);

  useEffect(() => {
    return () => {
      geometry.dispose();
      material.dispose();
    };
  }, [geometry, material]);

  // Initialize positions once on mount
  useEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;

    for (let i = 0; i < count; i++) {
      tempPos.set(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]);
      dummy.position.copy(tempPos);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }

    mesh.instanceMatrix.needsUpdate = true;
  }, [count, positions, tempPos, dummy]);

  useFrame(({ clock }) => {
    const mesh = meshRef.current;
    if (!mesh || !isPlaying) return;

    const time = clock.getElapsedTime();

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Direct position access - much faster than matrix extraction
      let x = positions[i3];
      let y = positions[i3 + 1];
      let z = positions[i3 + 2];

      // Update Y position
      y += speeds[i];

      // Simplified drift calculation with pre-computed offsets
      const driftX = fastNoise(noiseOffsets[i3] + y * 0.2, time * 0.2, 0);
      const driftZ = fastNoise(noiseOffsets[i3 + 1] + y * 0.2, time * 0.2, 100);

      x += driftX * 0.003;
      z += driftZ * 0.003;

      // Reset if above boundary
      if (y > 4 && repeat) {
        y = -2;
        x = (Math.random() - 0.5) * 8;
        z = (Math.random() - 0.5) * 8;
      }

      // Store updated positions
      positions[i3] = x;
      positions[i3 + 1] = y;
      positions[i3 + 2] = z;

      // Update matrix
      tempPos.set(x, y, z);
      dummy.position.copy(tempPos);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }

    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined, undefined, count]}
      position={[0, 0, 0]}
      material={material}
      geometry={geometry}
      visible={isPlaying}
    />
  );
};
