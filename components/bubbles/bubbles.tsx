"use client";

import { useBubbleStore } from "@/store/useBubbleStore";
import { useFrame } from "@react-three/fiber";
import gsap from "gsap";
import { useRef, useEffect, useMemo } from "react";
import { createNoise3D } from "simplex-noise";
import * as THREE from "three";

// Initialize simplex noise
const noise3D = createNoise3D();
const o = new THREE.Object3D();

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

  const minSpeed = speed * 0.0015;
  const maxSpeed = speed * 0.0075;

  // Precompute geometry and material
  const geometry = useMemo(() => new THREE.SphereGeometry(bubbleSize, 12, 12), [bubbleSize]);

  const material = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        transparent: true,
        opacity,
        depthWrite: false,
        color,
      }),
    [opacity, color]
  );

  // Precompute initial positions
  const bubblePositions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = gsap.utils.random(-4, 4);
      arr[i * 3 + 1] = gsap.utils.random(-2, 2);
      arr[i * 3 + 2] = gsap.utils.random(-4, 4);
      bubbleSpeed.current[i] = gsap.utils.random(minSpeed, maxSpeed);
    }
    return arr;
  }, [count, minSpeed, maxSpeed]);

  // Cleanup
  useEffect(() => {
    return () => {
      geometry.dispose();
      material.dispose();
    };
  }, [geometry, material]);

  // Initialize instanced mesh on mount
  useEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;

    for (let i = 0; i < count; i++) {
      o.position.set(
        bubblePositions[i * 3],
        bubblePositions[i * 3 + 1],
        bubblePositions[i * 3 + 2]
      );
      o.updateMatrix();
      mesh.setMatrixAt(i, o.matrix);
    }

    mesh.instanceMatrix.needsUpdate = true;
  }, [count, bubblePositions]);

  // Animate bubbles per frame
  useFrame(({ clock }) => {
    const mesh = meshRef.current;
    if (!mesh || !isPlaying) return;

    const time = clock.getElapsedTime();

    for (let i = 0; i < count; i++) {
      o.position.set(
        bubblePositions[i * 3],
        bubblePositions[i * 3 + 1],
        bubblePositions[i * 3 + 2]
      );

      // Move upward
      o.position.y += bubbleSpeed.current[i];

      // Drift using simplex noise
      o.position.x += noise3D(i * 0.1, o.position.y * 0.2, time * 0.2) * 0.002;
      o.position.z += noise3D(i * 0.2 + 100, o.position.y * 0.2, time * 0.2) * 0.002;

      // Reset bubbles that go off top
      if (o.position.y > 4 && repeat) {
        o.position.y = -2;
        o.position.x = gsap.utils.random(-4, 4);
        o.position.z = gsap.utils.random(-4, 4);
      }

      // Store updated positions
      bubblePositions[i * 3] = o.position.x;
      bubblePositions[i * 3 + 1] = o.position.y;
      bubblePositions[i * 3 + 2] = o.position.z;

      // Update instance matrix
      o.updateMatrix();
      mesh.setMatrixAt(i, o.matrix);
    }

    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[geometry, material, count]}
      position={[0, 0, 0]}
      visible={isPlaying} // hide when paused
    />
  );
};