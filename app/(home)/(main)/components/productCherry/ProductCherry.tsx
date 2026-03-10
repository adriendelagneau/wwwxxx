"use client";

import { View } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import React, { useRef } from "react";

import MagneticButtons from "@/components/MagneticButtons";
import Scene from "./Scene";

gsap.registerPlugin(ScrollTrigger);

const ProductCherry = () => {
  const buttonRef = useRef(null);

  return (
    <div className="product-cherry relative ml-1 flex min-h-screen w-full justify-center overflow-hidden pt-16 xl:ml-6 xl:items-center xl:justify-start xl:pt-0">
      <View className="pointer-events-none absolute top-0 left-0 z-30 h-full w-full">
        <Scene flavor="cherry" />
      </View>
      <div
        className="absolute top-[84vh] left-[35%] sm:top-[57vh] sm:left-[55vw]    "
        ref={buttonRef}
      >
        <MagneticButtons>
          <Link href={"/product/cherry"}>
            <button className="text-secondary hover:bg-secondary relative md:left-0  hover:text-primary bg-primary h-22  w-44 sm:h-28 sm:w-56 rotate-3 cursor-pointer rounded-[50%] border-2  font-bold uppercase sm:text-xl md:h-31.25 md:w-62.5 md:text-2xl xl:h-37.5 xl:w-75 xl:text-4xl 2xl:h-45 2xl:w-90 2xl:-rotate-6">
              decouvrez-le
            </button>
          </Link>
        </MagneticButtons>
      </div>

      <div className="font-poppins flex flex-col gap-3 sm:gap-8 text-[34px] tracking-wider uppercase sm:text-5xl lg:text-6xl lg:gap-10 xl:gap-12 xl:text-7xl 2xl:text-[86px] 2xl:gap-18">
        <div className="flex flex-col sm:gap-3">
          <p className="flex gap-2">
            <span className="text-secondary">note</span>
            <span className="text-stroke-secondary-1 text-primary xl:tracking-wider">
              gourmande
            </span>
          </p>
          <p className="flex gap-2">
            <span className="text-stroke-secondary-1 text-primary xl:tracking-wider">
              de
            </span>
            <span className="text-secondary">cerises rouges</span>
          </p>
        </div>
         <div className="flex flex-col sm:gap-3">
          <p className="flex gap-2">
            <span className="text-secondary">toujours</span>
            <span className="text-stroke-secondary-1 text-primary xl:tracking-wider">
              aussi
            </span>
          </p>

          <p className="flex">
            <span className="text-secondary">savoureux</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCherry;
