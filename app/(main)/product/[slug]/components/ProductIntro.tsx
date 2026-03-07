"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useRef, useMemo } from "react";

import { splitWords } from "@/lib/splitters";
import { productsDetails } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

const ProductIntro = ({
  variant,
}: {
  variant: "original" | "cherry" | "zero" | "lime" | "coffee";
}) => {
  const pinSectionRef = useRef<HTMLDivElement | null>(null);
  const letterRefs = useRef<HTMLSpanElement[]>([]);
  letterRefs.current = []; // clear to avoid duplicates in dev mode

  // get product from array
  const product = useMemo(
    () => productsDetails.find((p) => p.name === variant),
    [variant]
  );

  // fallback empty array if not found
  const infosText = product?.description ?? [];

  useGSAP(() => {
    gsap.set(letterRefs.current, { opacity: 0, y: 50 });

    gsap.to(letterRefs.current, {
      opacity: 1,
      y: 0,
      stagger: 0.05,
      ease: "power2.out",
      scrollTrigger: {
        trigger: pinSectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
        pin: true,
      },
    });
  }, [variant]);

  return (
    <section
      ref={pinSectionRef}
      className="font-poppins text-primary bg-gradient-custom relative z-50 flex h-screen w-full justify-start p-8 lg:pt-36 text-xl sm:text-3xl xl:text-4xl 2xl:text-5xl "
    >
      <div className="text-secondary max-w-4xl leading-snug">
        {infosText.map((phrase, index) => (
          <div key={index} className="my-6 flex flex-wrap gap-2 leading-tight">
            {splitWords(phrase, letterRefs)}
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductIntro;
