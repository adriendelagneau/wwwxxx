import { ProductDetail } from "@/types";

export const sections = [
  {
    id: "year-2003",
    year: 2003,
    image: "https://res.cloudinary.com/dos8mey8r/image/upload/v1754068115/breizhCola/bz11_nliwm2.jpg",
    text: "Naissance de Breizh Cola, le cola breton."
  },
  {
    id: "year-2007",
    year: 2007,
    image: "https://res.cloudinary.com/dos8mey8r/image/upload/v1754065320/breizhCola/bz3_euoqwg.jpg",
    text: "Succès en Bretagne, ancrage local fort."
  },
  {
    id: "year-2011",
    year: 2011,
    image: "https://res.cloudinary.com/dos8mey8r/image/upload/v1754065641/breizhCola/bz5_cqeiz1.jpg",
    text: "Déploiement national, expansion du cola breton."
  },
  // {
  //   id: "year-2015",
  //   year: 2015,
  //   image: "https://res.cloudinary.com/dos8mey8r/image/upload/v1754065844/breizhCola/bz6_fqdo4y.jpg",
  //   text: "Nouvelles recettes et ingrédients naturels."
  // },
  // {
  //   id: "year-2018",
  //   year: 2018,
  //   image: "https://res.cloudinary.com/dos8mey8r/image/upload/v1754066577/breizhCola/bz7_yblvex.jpg",
  //   text: "Réduction des plastiques et actions écologiques."
  // },
  // {
  //   id: "year-2020",
  //   year: 2020,
  //   image: "https://res.cloudinary.com/dos8mey8r/image/upload/v1754067080/breizhCola/bz8_hxhy7f.jpg",
  //   text: "Campagne sur la culture bretonne."
  // },
  {
    id: "year-2023",
    year: 2023,
    image: "https://res.cloudinary.com/dos8mey8r/image/upload/v1754067654/breizhCola/bz9_yegs0b.jpg",
    text: "Collaboration avec des artistes bretons pour un design unique."
  },
  {
    id: "year-2031",
    year: 2031,
    image: "https://res.cloudinary.com/dos8mey8r/image/upload/v1754067853/breizhCola/bz10_quqd5y.jpg",
    text: "Lancement de versions bio et sans sucre."
  },
  {
    id: "year-2035",
    year: 2035,
    image: "https://res.cloudinary.com/dos8mey8r/image/upload/v1754068115/breizhCola/bz11_nliwm2.jpg",
    text: "Breizh Cola vers le futur"
  },
];

export const productsDetails: ProductDetail[] = [
  {
    slug: "breizh-cola-original",
    name: "original",
    description: [
      "Breizh Cola Original, lancé en 2002, offre un mélange parfait d’ingrédients, avec des bulles fines et un goût rafraîchissant. Apprécié pour son caractère authentique et breton, il reste un favori indétrônable après plus de 20 ans.",
      "Que ce soit pour un moment de détente ou pour accompagner vos repas, Breizh Cola Original est l’emblème d'une boisson pétillante au goût unique. C'est une expérience qui capture l'essence même de la Bretagne."
    ],
    ingredients:
      "Eau, gaz carbonique, colorant : E150d, acidifiants : acide citrique, acide phosphorique et citrate de sodium, caféine, arôme naturel de cola et autres arômes naturels, édulcorants : aspartame et acésulfame K.",
    nutritionel: {
      energie: 11,
      graisses: 0.1,
      glucides: 0.3,
      proteines: 0.1,
      sel: 0,
    },
  },
  {
    slug: "breizh-cola-zero",
    name: "zero",
    description: [
      "Avec Breizh Cola Zéro, savourez l’authenticité d’un cola breton sans aucune calorie. Conçu pour ceux qui veulent profiter d’un goût riche sans le sucre, il allie plaisir et bien-être sans compromis.",
      "Son goût fidèle à l'original, tout en étant léger et sans sucre, en fait un compagnon idéal pour tous les moments de détente. Breizh Cola Zéro vous accompagne dans chaque instant, avec la même effervescence."
    ],
    ingredients:
      "Eau, gaz carbonique, colorant : E150d, acidifiants : acide citrique, acide phosphorique et citrate de sodium, caféine, arôme naturel de cola et autres arômes naturels, édulcorants : aspartame, acésulfame K et sucralose.",
    nutritionel: {
      energie: 0,
      graisses: 0.1,
      glucides: 0.3,
      proteines: 0.1,
      sel: 0,
    },
  },
  {
    slug: "breizh-cola-cherry",
    name: "cherry",
    description: [
      "Breizh Cola Cherry apporte une touche fruitée à la gamme avec son goût de cerise. Ce cola breton audacieux associe la saveur classique avec un zeste de cerise, créant une expérience gourmande et rafraîchissante.",
      "Laissez-vous surprendre par cette combinaison unique, parfaite pour une pause rafraîchissante à tout moment de la journée. Breizh Cola Cherry est la boisson idéale pour ceux qui recherchent une alternative fruitée."
    ],
    ingredients:
      "Eau, gaz carbonique, colorant : E150d, acidifiants : acide citrique, acide phosphorique et citrate de sodium, caféine, arôme naturel de cola et autres arômes naturels, édulcorants : aspartame et acésulfame K.",
    nutritionel: {
      energie: 42,
      graisses: 0.1,
      glucides: 9.8,
      proteines: 0.3,
      sel: 0,
    },
  },

  // NEW: LIME
  {
    slug: "breizh-cola-lime",
    name: "lime",
    description: [
      "Breizh Cola Lime combine l’intensité du cola breton avec une touche vive et acidulée de citron vert. Cette alliance rafraîchissante apporte une sensation de fraîcheur immédiate et un équilibre parfait entre douceur et vivacité.",
      "Idéal pour les journées chaudes ou pour accompagner vos moments de convivialité, Breizh Cola Lime offre une expérience pétillante unique qui réveille les sens avec une note d’agrumes subtile et moderne."
    ],
    ingredients:
      "Eau, gaz carbonique, colorant : E150d, acidifiants : acide citrique et citrate de sodium, caféine, arôme naturel de cola, arôme naturel de citron vert, édulcorants : aspartame et acésulfame K.",
    nutritionel: {
      energie: 38,
      graisses: 0,
      glucides: 9.2,
      proteines: 0,
      sel: 0,
    },
  },

  // NEW: COFFEE
  {
    slug: "breizh-cola-coffee",
    name: "coffee",
    description: [
      "Breizh Cola Coffee propose une fusion audacieuse entre le cola breton et des notes riches de café. Cette combinaison unique offre une profondeur aromatique intense, parfaite pour les amateurs de saveurs plus corsées.",
      "Avec son caractère affirmé et son effervescence rafraîchissante, Breizh Cola Coffee est idéal pour un regain d’énergie ou pour découvrir une nouvelle dimension du cola traditionnel."
    ],
    ingredients:
      "Eau, gaz carbonique, colorant : E150d, acidifiants : acide phosphorique et citrate de sodium, caféine, arôme naturel de cola, extrait de café, édulcorants : aspartame et acésulfame K.",
    nutritionel: {
      energie: 45,
      graisses: 0,
      glucides: 10.5,
      proteines: 0.2,
      sel: 0,
    },
  },
];



/* ================= TYPES ================= */

type Vec3 = { x?: number; y?: number; z?: number };

export type Transform = {
  position?: Vec3;
  rotation?: Vec3;
  scale?: Vec3;
};

export type BreakpointConfig = {
  initial: {
    can1: Transform;
  };
  intro: {
    can1: { from: Transform; to: Transform };
  };
  final: {
    can1: Transform;
  };
  scroll: {
    groupRotation: Vec3;
    can1: Transform;
    can3: Transform;
    can4: Transform;
    groupPosition: {
      x?: number;
      y?: number;
      z?: number;
      duration?: number;
      ease?: string;
    };
  };
};


/* ================= CONFIG ================= */



export const CONFIG: Record<"SM" | "MD" | "LG" | "XL" | "XXL" | "XXXL", BreakpointConfig> = {

  SM: {
    initial: {
      can1: { position: { x: 0, y: -0.5 }, scale: { x: 0.55, y: 0.55, z: 0.55 } },
    },
    intro: {
      can1: { from: { position: { x: 5 }, rotation: { z: 1 } }, to: { position: { x: 0 }, rotation: { z: 0 } } },
    },
    final: {
      can1: { position: { x: 0, y: -0.5 }, rotation: { z: 0 }, scale: { x: 0.55, y: 0.55, z: 0.55 } },
    },
    scroll: {
      groupRotation: { y: Math.PI * 2 },
      can1: { position: { x: 0 }, rotation: { z: 0 } },
      can3: { position: { x: 0.25, y: -0.4, z: -0.5 }, rotation: { z: -0.3 } },
      can4: { position: { x: -0.25, y: -0.38, z: -0.4 }, rotation: { z: 0.3 } },
      groupPosition: { x: 0, y: 0, duration: 2, ease: "sine.inOut" },
    },
  },

  MD: {
    initial: {
      can1: { position: { x: 0, y: -0.7 }, scale: { x: 0.65, y: 0.65, z: 0.65 } },
    },
    intro: {
      can1: { from: { position: { x: 5 }, rotation: { z: 1 } }, to: { position: { x: 0 }, rotation: { z: 0 } } },
    },
    final: {
      can1: { position: { x: 0, y: -0.7 }, rotation: { z: 0 }, scale: { x: 0.65, y: 0.65, z: 0.65 } },
    },
    scroll: {
      groupRotation: { y: Math.PI * 2 },
      can1: { position: { x: 0, y: -0.3 }, rotation: { z: 0 } },
      can3: { position: { x: 0.25, y: -0.4, z: -0.5 }, rotation: { z: -0.3 } },
      can4: { position: { x: -0.25, y: -0.38, z: -0.4 }, rotation: { z: 0.3 } },
      groupPosition: { x: 0, y: -0.3, duration: 2, ease: "sine.inOut" },
    },
  },

  LG: {
    initial: {
      can1: { position: { x: 0, y: -0.65 }, scale: { x: 0.68, y: 0.68, z: 0.68 } },
    },
    intro: {
      can1: { from: { position: { x: 5 }, rotation: { z: 1 } }, to: { position: { x: 0 }, rotation: { z: 0 } } },
    },
    final: {
      can1: { position: { x: 0, y: -0.65 }, rotation: { z: 0 }, scale: { x: 0.68, y: 0.68, z: 0.68 } },
    },
    scroll: {
      groupRotation: { y: Math.PI * 2 },
      can1: { position: { x: 0, y: -0.3 }, rotation: { z: 0 } },
      can3: { position: { x: 0.25, y: -0.4, z: -0.5 }, rotation: { z: -0.3 } },
      can4: { position: { x: -0.25, y: -0.38, z: -0.4 }, rotation: { z: 0.3 } },
      groupPosition: { x: 0, y: -0.35, duration: 2, ease: "sine.inOut" },
    },
  },

  XL: {
    initial: {
      can1: { position: { x: 1.7, y: -0.1 }, rotation: { z: -0.1 }, scale: { x: 0.82, y: 0.82, z: 0.82 } },
    },
    intro: {
      can1: { from: { position: { y: 5, x: 1 }, rotation: { z: 3 } }, to: { position: { y: -0.1, x: 1 }, rotation: { z: -0.1 } } },
    },
    final: {
      can1: { position: { x: 1.7, y: -0.1 }, rotation: { z: -0.1 }, scale: { x: 0.82, y: 0.82, z: 0.82 } },
    },
    scroll: {
      groupRotation: { y: Math.PI * 2 },
      can1: { position: { x: 0.1 }, rotation: { z: 0 } },
      can3: { position: { x: 0.8, y: 0, z: -0.8 }, rotation: { z: -0.3 } },
      can4: { position: { x: -0.5, y: 0, z: -0.5 }, rotation: { z: 0.3 } },
      groupPosition: { x: 0, y: -0.4, duration: 3, ease: "sine.inOut" },
    },
  },

  XXL: {
    initial: {
      can1: { position: { y: -0.2, x: 1.2 }, rotation: { z: -0.1 }, scale: { x: 0.9, y: 0.9, z: 0.9 } },
    },
    intro: {
      can1: { from: { position: { y: 0, x: 2 }, rotation: { y: -Math.PI * 2 } }, to: { position: { y: -0.2, x: 1.2 }, rotation: { y: -0.1 } } },
    },
    final: {
      can1: { position: { y: -0.2, x: 1.2 }, rotation: { z: -0.1 }, scale: { x: 0.9, y: 0.9, z: 0.9 } },
    },
    scroll: {
      groupRotation: { y: Math.PI * 2 },
      can1: { position: { x: 0.1 }, rotation: { z: 0 } },
      can3: { position: { x: 0.8, y: 0, z: -0.8 }, rotation: { z: -0.3 } },
      can4: { position: { x: -0.5, y: 0, z: -0.5 }, rotation: { z: 0.3 } },
      groupPosition: { x: 1, duration: 3, ease: "sine.inOut" },
    },
  },

  XXXL: {
    initial: {
      can1: { position: { y: -0.1, x: 1.7 }, scale: { x: 1, y: 1, z: 1 } },
    },
    intro: {
      can1: { from: { position: { y: 0, x: 3.2 }, rotation: { z: 3 } }, to: { position: { y: -0.1, x: 1.7 }, rotation: { z: -0.1 } } },
    },
    final: {
      can1: { position: { y: -0.1, x: 1.7 }, scale: { x: 1, y: 1, z: 1 } },
    },
    scroll: {
      groupRotation: { y: Math.PI * 2 },
      can1: { position: { x: 1 }, rotation: { z: 0 } },
      can3: { position: { x: 0.8, y: 0, z: -0.8 }, rotation: { z: -0.3 } },
      can4: { position: { x: -0.5, y: 0, z: -0.5 }, rotation: { z: 0.3 } },
      groupPosition: { x: 1.5, duration: 3, ease: "sine.inOut" },
    },
  },

};

/* ================= HERO DATA ================= */

export type HeroLine = {
  words: string[];
};

export type HeroData = {
  tagline: string;
  lines: HeroLine[];
  description: string;
};

export const HERO: HeroData = {
  tagline: "Le cola breton",
  lines: [
    { words: ["breizh", "cola"] },
    { words: ["le", "cola", "du"] },
    { words: ["phare", "ouest"] },
  ],
  description:
    "Breizh Cola incarne un esprit libre et breton, une boisson de caractère née à l'Ouest, pour ceux qui recherchent authenticité, fraîcheur et goût.",
};