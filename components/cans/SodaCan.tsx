"use client";

import { useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { useMemo } from "react";

useGLTF.preload("/Soda-can.gltf");

const flavorTextures = {
  original: "/labels/bz1origibal.png",
  cherry: "/labels/bz1cherry.png",
  zero: "/labels/bz1zero.png",
  lime: "/labels/bz1lime.png",
  coffee: "/labels/bz1coffee.png",
};

// Memoize metal material to avoid recreation on every render
const metalMaterial = new THREE.MeshStandardMaterial({
  roughness: 0.3,
  metalness: 1,
  color: "#bbbbbb",
});

// Memoize the default material for labels
const createLabelMaterial = (map: THREE.Texture) =>
  new THREE.MeshStandardMaterial({
    roughness: 0.2,
    metalness: 0.9,
    map,
  });

export type SodaCanProps = {
  flavor?: keyof typeof flavorTextures;
  scale?: number;
};

export function SodaCan({
  flavor = "original",
  scale = 2,
  ...props
}: SodaCanProps) {
  const { nodes } = useGLTF("/Soda-can.gltf");

  // Only load the texture for the specific flavor being used - lazy loads only what's needed
  const label = useTexture(flavorTextures[flavor]);

  // Memoize the label material
  const labelMaterial = useMemo(() => createLabelMaterial(label), [label]);

  return (
    <group
      {...props}
      dispose={null}
      scale={scale}
      rotation={[0, -Math.PI * 1.25, 0]}
    >
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.cylinder as THREE.Mesh).geometry}
        material={metalMaterial}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.cylinder_1 as THREE.Mesh).geometry}
        material={labelMaterial}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.Tab as THREE.Mesh).geometry}
        material={metalMaterial}
      />
    </group>
  );
}
