"use client";

import { useBubbleStore } from "@/store/useBubbleStore";
import { useFrame } from "@react-three/fiber";
import { useRef, useEffect, useMemo } from "react";
import { createNoise3D } from "simplex-noise";
import * as THREE from "three";

// Initialize simplex noise - created once at module level
const noise3D = createNoise3D();

// Reusable temp objects to avoid garbage collection in animation loop
const _position = new THREE.Vector3();
const _matrix = new THREE.Matrix4();

export const Bubbles = ({
  count = 400,
  speed = 5,
  bubbleSize = 0.01,
  opacity = 0.3,
  color = "#591420",
  repeat = true,
}) => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const bubbleSpeed = useRef(new Float32Array(count));
  const isPlaying = useBubbleStore((state) => state.isPlaying);

  // Memoize speed bounds - avoid recalculating on every render
  const { minSpeed, maxSpeed } = useMemo(
    () => ({
      minSpeed: speed * 0.0015,
      maxSpeed: speed * 0.0075,
    }),
    [speed]
  );

  // Memoize geometry - only recreate when bubbleSize changes
  const geometry = useMemo(
    () => new THREE.SphereGeometry(bubbleSize, 12, 12),
    [bubbleSize]
  );

  // Memoize material - only recreate when opacity or color changes
  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        transparent: true,
        opacity,
        depthWrite: false,
        color,
      }),
    [opacity, color]
  );

  // Precompute all initial positions using native Math.random (faster than gsap.utils.random)
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = Math.random() * 8 - 4;
      arr[i * 3 + 1] = Math.random() * 4 - 2;
      arr[i * 3 + 2] = Math.random() * 8 - 4;
    }
    return arr;
  }, [count]);

  // Initialize bubble speeds in useEffect to avoid initialization issues
  useEffect(() => {
    for (let i = 0; i < count; i++) {
      bubbleSpeed.current[i] = Math.random() * (maxSpeed - minSpeed) + minSpeed;
    }
  }, [count, minSpeed, maxSpeed]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      geometry.dispose();
      material.dispose();
    };
  }, [geometry, material]);

  // Initialize instanced mesh on mount - only runs once (empty deps)
  useEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;

    for (let i = 0; i < count; i++) {
      _position.set(
        positions[i * 3],
        positions[i * 3 + 1],
        positions[i * 3 + 2]
      );
      _matrix.setPosition(_position);
      mesh.setMatrixAt(i, _matrix);
    }

    mesh.instanceMatrix.needsUpdate = true;
  }, []); // Empty deps - only run once on mount

  // Animate bubbles per frame - optimized with minimal allocations
  useFrame(({ clock }) => {
    const mesh = meshRef.current;
    if (!mesh || !isPlaying) return;

    const time = clock.getElapsedTime();
    const boundaryY = 4;
    const resetY = -2;

    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      const currentY = positions[idx + 1];

      // Update Y position (move upward)
      positions[idx + 1] = currentY + bubbleSpeed.current[i];

      // Apply noise-based drift
      positions[idx] += noise3D(i * 0.1, currentY * 0.2, time * 0.2) * 0.002;
      positions[idx + 2] +=
        noise3D(i * 0.2 + 100, currentY * 0.2, time * 0.2) * 0.002;

      // Reset bubbles that go off top
      if (positions[idx + 1] > boundaryY && repeat) {
        positions[idx + 1] = resetY;
        positions[idx] = Math.random() * 8 - 4;
        positions[idx + 2] = Math.random() * 8 - 4;
      }

      // Update matrix directly without Object3D overhead
      _position.set(positions[idx], positions[idx + 1], positions[idx + 2]);
      _matrix.setPosition(_position);
      mesh.setMatrixAt(i, _matrix);
    }

    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[geometry, material, count]}
      position={[0, 0, 0]}
      visible={isPlaying}
    />
  );
};
