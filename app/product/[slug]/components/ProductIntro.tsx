"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useMemo } from "react";

import { splitWords } from "@/lib/splitters";
import { productsDetails } from "@/lib/data";

const ProductIntro = ({
  variant,
}: {
  variant: "original" | "cherry" | "zero" | "lime" | "coffee";
}) => {
  const refs = useRef<any[]>([]);
  const container = useRef<HTMLDivElement | null>(null);

  // get product from array
  const product = useMemo(
    () => productsDetails.find((p) => p.name === variant),
    [variant]
  );

  // fallback empty array if not found
  const infosText = product?.description ?? [];

  useGSAP(() => {
    if (!container.current) return;

    gsap.to(refs.current, {
      scrollTrigger: {
        trigger: container.current,
        scrub: true,
        start: "top 40%",
        end: `+=${window.innerHeight * 0.47}`,
        once: true,
        toggleActions: "play none none none",
      },
      opacity: 1,
      ease: "power3.out",
      stagger: 0.1,
    });
  }, [variant]);

  return (
    <div className="font-poppins text-primary bg-gradient-custom relative z-50 min-h-screen w-2/3 p-24 text-6xl leading-loose capitalise">
      <div
        ref={container}
        className="text-secondary font-poppins mx-auto my-12 flex w-full max-w-screen-2xl flex-col items-center justify-center gap-12 p-10 text-4xl"
      >
        {infosText.map((phrase, index) => (
          <div
            key={index}
            className="my-6 flex flex-wrap gap-2 leading-tight -skew-1"
          >
            {splitWords(phrase, refs)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductIntro;