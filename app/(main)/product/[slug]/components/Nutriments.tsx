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

const Nutriments = ({ product }: { product: Product }) => {
  const n = product.nutritionel;

  return (
    <section className="text-secondary flex w-full xl:max-w-8xl max-w-6xl flex-col justify-center mx-auto px-3 py-24 ">
      <div className="flex w-full flex-col gap-12 my-6 xl:flex-row">
        <div className="grid w-full gap-4 text-xl">
          <Nutrient label="Énergie" value={`${n.energie} kcal`} />
          <Nutrient label="Graisses" value={`${n.graisses} g`} />
          <Nutrient label="Glucides" value={`${n.glucides} g`} />
          <Nutrient label="Protéines" value={`${n.proteines} g`} />
          <Nutrient label="Sel" value={`${n.sel} g`} />
        </div>

        <div>
          <h3 className="text-2xl font-semibold">Ingrédients</h3>
          <p className="text-xl opacity-80">{product.ingredients}</p>
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
