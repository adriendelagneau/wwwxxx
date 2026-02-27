import Social from "@/components/layout/social/Social";
import Hero from "./components/hero/Hero";
import Marquee from "./components/Marquee";
import ProductZero from "./components/productZero/ProductZero";
import ProductCherry from "./components/productCherry/ProductCherry";
import Chronos from "./components/chronos/Chronos";
import MatterMarquee from "./components/MatterMarquee";

export default function Home() {
  return (
 <div className="min-h-[200vh] w-full relative z-5">
      <Hero />
      <Marquee
        initialDirection={1}
        speed={1}
        sentence="Une brise iodée venue de l’océan traverse la Bretagne, apportant fraîcheur, caractère et authenticité."
      />
      <Marquee
        initialDirection={-1}
        speed={0.7}
        sentence="Breizh Cola incarne l’esprit breton : une terre de caractère, des saveurs authentiques et une fraîcheur qui se partage, face à l’océan et sous un ciel ouvert."
      />
      <Marquee
        initialDirection={1}
        speed={0.9}
        sentence="Des bulles pleines de caractère, une fraîcheur venue de l’Ouest et l’esprit breton qui ne fait aucun compromis."
      />
      <ProductZero />
      <Marquee
        initialDirection={1}
        speed={1.1}
        sentence="Breizh Cola Zéro affirme l’esprit breton sans compromis : tout le caractère, toute la fraîcheur, et zéro sucre, face à l’océan et au vent du large."
      />
      <ProductCherry />
      <Marquee
        initialDirection={-1}
        speed={1.1}
        sentence="Breizh Cola Cherry revisite l’esprit breton avec une touche fruitée : des bulles de caractère, une cerise intense et une fraîcheur venue de l’Ouest."
      />
      <Chronos />
      <MatterMarquee />
      <Social />
    </div>
  );
}
