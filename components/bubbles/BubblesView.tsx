"use client";

import { View } from "@react-three/drei";
import { Bubbles } from "./bubbles";

const BubblesView = () => {
  return (
    <View className="bubbles pointer-events-none sticky top-0 z-10 -mt-[100vh] h-screen w-full">
      <Bubbles />
      <directionalLight position={[0, 0, 5]} intensity={0.5} />
      <ambientLight intensity={8} />
      <pointLight position={[0, 1, 3]} intensity={3.4} />
    </View>
  );
};

export default BubblesView;
