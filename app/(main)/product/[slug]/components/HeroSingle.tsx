"use client";

import { View } from "@react-three/drei";
import React from "react";

import ProductTitle from "./ProductTittle";
import Nutriments from "./Nutriments";
import { getProductByVariant } from "@/lib/hepler";
import ProductIntro from "./ProductIntro";
import Scene from "./Scene";
import Marquee from "@/components/Marquee";

const HeroSingle = ({
  variant,
}: {
  variant: "original" | "cherry" | "zero" | "lime" | "coffee";
}) => {
  const product = getProductByVariant(variant);

  return (
    <div>
      <div className="hero-single relative">
        {/* Section 1: Hero - triggers first scroll animation */}

        <View className="hero-single-scene pointer-events-none sticky top-0 z-30 h-screen w-full">
          <Scene flavor={variant} />
        </View>
        <ProductTitle name={variant} />
        {/* Section 2: Intro - triggers second scroll animation (sibling, not nested) */}

        <ProductIntro variant={variant} />
      </div>
      <Marquee
        initialDirection={1}
        speed={1.1}
        sentence="Breizh Cola Zéro affirme l’esprit breton sans compromis : tout le caractère, toute la fraîcheur, et zéro sucre, face à l’océan et au vent du large."
      />
      <div className="h-screen w-full">
        {product && <Nutriments product={product} />}
      </div>
    </div>
  );
};

export default HeroSingle;
