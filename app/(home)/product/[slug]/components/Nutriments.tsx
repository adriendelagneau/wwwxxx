import { getProductByVariant } from "@/lib/hepler";
import React from "react";

interface Nutrition {
  energie: number;
  graisses: number;
  glucides: number;
  proteines: number;
  sel: number;
}

interface Product {
  name: string;
  ingredients: string;
  nutritionel: Nutrition;
}

const Nutriments = ({  variant,
}: {
  variant: "original" | "cherry" | "zero" | "lime" | "coffee";
}) => {
  const product = getProductByVariant(variant);
 
  if (!product) {
    return null;
  }

  const n = product.nutritionel

  return (
    <section className="text-secondary mb-12 lg:mb-24   flex w-full lg:max-w-none  max-w-4xl flex-col justify-center mx-auto px-3 mt-6">
      <div className="flex w-full flex-col gap-24 my-6 lg:flex-row ">
        <div className="grid w-full gap-4 text-xl lg:text-2xl">
          <Nutrient label="Énergie" value={`${n.energie} kcal`} />
          <Nutrient label="Graisses" value={`${n.graisses} g`} />
          <Nutrient label="Glucides" value={`${n.glucides} g`} />
          <Nutrient label="Protéines" value={`${n.proteines} g`} />
          <Nutrient label="Sel" value={`${n.sel} g`} />
        </div>

        <div>
          <h3 className="mb-2 text-2xl lg:text-3xl font-semibold">Ingrédients</h3>
          <p className="text-xl lg:text-2xl opacity-80">{product.ingredients}</p>
        </div>
      </div>
    </section>
  );
};

function Nutrient({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-b pb-2">
      <span>{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}

export default Nutriments;
