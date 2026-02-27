"use client";

import { View } from "@react-three/drei";
import React from "react";

import ProductTitle from "./ProductTittle";
import Nutriments from "./Nutriments";
import { getProductByVariant } from "@/lib/hepler";
import ProductIntro from "./ProductIntro";

const HeroSingle = ({
  variant,
}: {
  variant: "original" | "cherry" | "zero" | "lime" | "coffee";
}) => {
  const product = getProductByVariant(variant);

  return (
    <div className="hero-single relative">

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
