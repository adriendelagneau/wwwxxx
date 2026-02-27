"use client";

import { useBubbleStore } from "@/store/useZuStore";
import { useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";

// Optimized pseudo-random function (faster than gsap.utils.random)
const random = (min: number, max: number) => Math.random() * (max - min) + min;

// Simple sine-based noise (much faster than simplex-noise)
const simpleNoise = (x: number, y: number, z: number) => {
  return (
    Math.sin(x * 1.2 + y * 0.9 + z * 1.5) * 0.5 +
    Math.sin(x * 0.7 - y * 1.3 + z * 0.8) * 0.3 +
    Math.sin(x * 1.8 + y * 0.5 - z * 2.1) * 0.2
  );
};

interface BubbleData {
  position: THREE.Vector3;
  speed: number;
  offset: number;
}

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

  // Precompute bubble data once (not on every render)
  const bubbleData = useMemo<BubbleData[]>(() => {
    const data: BubbleData[] = [];
    const minSpeed = speed * 0.0015;
    const maxSpeed = speed * 0.0075;

    for (let i = 0; i < count; i++) {
      data.push({
        position: new THREE.Vector3(
          random(-4, 4),
          random(-2, 4),
          random(-4, 4)
        ),
        speed: random(minSpeed, maxSpeed),
        offset: i * 0.1,
      });
    }
    return data;
  }, [count, speed]);

  // Reusable objects to avoid GC
  const tempObject = useMemo(() => new THREE.Object3D(), []);
  const tempVec = useMemo(() => new THREE.Vector3(), []);

  const geometry = useMemo(
    () => new THREE.SphereGeometry(bubbleSize, 12, 12), // Reduced segments
    [bubbleSize]
  );

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

  // Initialize positions once
  useMemo(() => {
    const mesh = meshRef.current;
    if (!mesh) return;

    bubbleData.forEach((bubble, i) => {
      tempObject.position.copy(bubble.position);
      tempObject.updateMatrix();
      mesh.setMatrixAt(i, tempObject.matrix);
    });

    mesh.instanceMatrix.needsUpdate = true;
  }, [bubbleData, tempObject]);

  useFrame(({ clock }) => {
    const mesh = meshRef.current;
    if (!mesh || !isPlaying) return;

    const time = clock.getElapsedTime();

    for (let i = 0; i < count; i++) {
      const bubble = bubbleData[i];

      // Update Y position
      bubble.position.y += bubble.speed;

      // Add noise-based drift
      const noiseX = simpleNoise(
        bubble.offset,
        bubble.position.y * 0.2,
        time * 0.2
      );
      const noiseZ = simpleNoise(
        bubble.offset + 100,
        bubble.position.y * 0.2,
        time * 0.2
      );

      bubble.position.x += noiseX * 0.003;
      bubble.position.z += noiseZ * 0.003;

      // Reset if above threshold
      if (bubble.position.y > 4 && repeat) {
        bubble.position.y = -2;
        bubble.position.x = random(-4, 4);
        bubble.position.z = random(-4, 4);
      }

      // Update instance matrix directly (faster)
      tempObject.position.copy(bubble.position);
      tempObject.updateMatrix();
      mesh.setMatrixAt(i, tempObject.matrix);
    }

    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[geometry, material, count]}
      position={[0, 0, 0]}
      visible={isPlaying}
      frustumCulled={false} // Bubbles are spread across the scene
    />
  );
};
