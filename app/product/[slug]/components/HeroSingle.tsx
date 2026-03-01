"use client";

import { View } from "@react-three/drei";
import React from "react";

import ProductTitle from "./ProductTittle";
import Nutriments from "./Nutriments";
import { getProductByVariant } from "@/lib/hepler";
import ProductIntro from "./ProductIntro";
import Scene from "./Scene";

const HeroSingle = ({
  variant,
}: {
  variant: "original" | "cherry" | "zero" | "lime" | "coffee";
}) => {
  const product = getProductByVariant(variant);

  return (
    <div className="hero-single relative">
      <View className="hero-single-scene pointer-events-none sticky top-0 z-30 hidden h-screen w-full md:block">
        <Scene flavor={variant} />
      </View>
      <ProductTitle name={variant} />
      <div className="h-screen w-full"></div>

      <ProductIntro variant={variant} />
      <div className="h-screen w-full">
        {product && <Nutriments product={product} />}
      </div>
    </div>
  );
};

export default HeroSingle;
