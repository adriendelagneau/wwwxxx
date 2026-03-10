export const sections = [
  {
    id: "year-2003",
    year: 2003,
    image: "https://res.cloudinary.com/dos8mey8r/image/upload/v1754068115/breizhCola/bz11_nliwm2.jpg",
    text: "Naissance de Breizh Cola, le cola breton qui revendique fièrement ses racines. Une alternative locale qui bouscule les géants du marché."
  },
  {
    id: "year-2007",
    year: 2007,
    image: "https://res.cloudinary.com/dos8mey8r/image/upload/v1754065320/breizhCola/bz3_euoqwg.jpg",
    text: "La Bretagne adopte son cola avec enthousiasme. La marque s’impose comme un symbole régional fort."
  },
  {
    id: "year-2011",
    year: 2011,
    image: "https://res.cloudinary.com/dos8mey8r/image/upload/v1754065641/breizhCola/bz5_cqeiz1.jpg",
    text: "Cap sur le national avec une expansion maîtrisée. Breizh Cola affirme son identité partout en France."
  },
  {
    id: "year-2018",
    year: 2018,
    image: "https://res.cloudinary.com/dos8mey8r/image/upload/v1754066577/breizhCola/bz7_yblvex.jpg",
    text: "Moins de plastique, plus d’engagement concret. La marque accélère sa transition écologique."
  },
  {
    id: "year-2023",
    year: 2023,
    image: "https://res.cloudinary.com/dos8mey8r/image/upload/v1754067654/breizhCola/bz9_yegs0b.jpg",
    text: "Des artistes bretons réinventent le design des bouteilles. La culture locale s’affiche avec audace."
  },
  {
    id: "year-2031",
    year: 2031,
    image: "https://res.cloudinary.com/dos8mey8r/image/upload/v1754067853/breizhCola/bz10_quqd5y.jpg",
    text: "Arrivée des versions bio et sans sucre dans la gamme. L’innovation répond aux nouvelles attentes."
  },
  {
    id: "year-2035",
    year: 2035,
    image: "https://res.cloudinary.com/dos8mey8r/image/upload/v1754068115/breizhCola/bz11_nliwm2.jpg",
    text: "Breizh Cola regarde vers l’avenir avec ambition. L’esprit breton continue d’inspirer chaque évolution."
  },
];
export interface Nutritionel {
  energie: number;
  graisses: number;
  glucides: number;
  proteines: number;
  sel: number;
}

export interface ProductDetail {
  slug: string;
  name: string;
  description: string[];
  ingredients: string;
  nutritionel: Nutritionel;
}


export const productsDetails: ProductDetail[] = [
  {
    slug: "breizh-cola-original",
    name: "original",
    description: [
      "Breizh Cola Original, lancé en 2002, offre un mélange parfait d’ingrédients, avec des bulles fines et un goût rafraîchissant. Apprécié pour son caractère authentique et breton, il reste un favori indétrônable après plus de 20 ans.",
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


/* ================= TYPES ================= */

type Vec3 = { x?: number; y?: number; z?: number };

export type Transform = {
  position?: Vec3;
  rotation?: Vec3;
  scale?: Vec3;
};

export type ResponsiveConfig = {
  position: { x: number; y: number; z: number };
  scaleFrom: { x: number; y: number; z: number };
  scaleTo: { x: number; y: number; z: number };
};

export type singleProductConfig = {
  position: { x: number; y: number; z: number };
  scale: { x: number; y: number; z: number };
  scrollAnimations: {
    position: { y: number; x: number };
  };
  scrollAnimations2: {
    position: { y: number; x: number };
  };
};

export type CarouselConfig = {
  radiusX: number;
  radiusZ: number;
  scaleRange: [number, number];
  duration: number;
};

export type BreakpointConfig = {
  hero: {
    intro: {
      can1: { from: Transform; to: Transform };
    };
    final: {
      can1: Transform;
    };
    scroll: {
      groupRotation: Vec3;
      can1: Transform;
      can2: { from: Transform; to: Transform };
      can3: { from: Transform; to: Transform };
    };
  };
  lime: ResponsiveConfig;
  cherry: ResponsiveConfig;
  single: singleProductConfig;
  carousel: CarouselConfig
};


/* ================= CONFIG ================= */



export const CONFIG: Record<"XS" | "SM" | "MD" | "LG" | "XL" | "XXL", BreakpointConfig> = {

  XS: {
    hero: {
      intro: {
        can1: { from: { position: { x: 5, y: -0.7 }, scale: { x: 0.55, y: 0.55, z: 0.55 } }, to: { position: { x: 0, y: -0.7 }, rotation: { z: 0 } } },
      },
      final: {
        can1: { position: { x: 0, y: -0.7 }, scale: { x: 0.55, y: 0.55, z: 0.55 } },
      },
      scroll: {
        groupRotation: { y: Math.PI * 2 },
        can1: { position: { x: 0, y: -0.7 }, rotation: { z: 0 } },
        can2: { from: { position: { x: 0, y: -4, z: -0.5 }, scale: { x: 0.5, y: 0.5, z: 0.5 } }, to: { position: { x: 0.25, y: -0.78, z: -0.5 }, rotation: { z: -0.3 }, scale: { x: 0.5, y: 0.5, z: 0.5 } } },
        can3: { from: { position: { x: -0.25, y: 4, z: -0.4 }, scale: { x: 0.5, y: 0.5, z: 0.5 } }, to: { position: { x: -0.25, y: -0.74, z: -0.4 }, rotation: { z: 0.3 }, scale: { x: 0.5, y: 0.5, z: 0.5 } } },

      },
    },
    lime: {
      position: { x: 0, y: -0.4, z: 0 },
      scaleFrom: { x: 0, y: 0, z: 0 },
      scaleTo: { x: 0.65, y: 0.65, z: 0.65 },
    },
    cherry: {
      position: { x: 0, y: -0.4, z: 0 },
      scaleFrom: { x: 0, y: 0, z: 0 },
      scaleTo: { x: 0.65, y: 0.65, z: 0.65 },
    },
    single: {
      position: { x: 0, y: -0.4, z: 0 },
      scale: { x: 0.6, y: 0.6, z: 0.6 },
      scrollAnimations: {
        position: { y: -0.5, x: 0 },
      },
      scrollAnimations2: {
        position: { y: -0.7, x: 0 },
      },
    },
    carousel: {
      radiusX: 0.9,
      radiusZ: 0.65,
      scaleRange: [0.4, 0.6],
      duration: 0.9,
    }
  },

  SM: {
    hero: {
      intro: {
        can1: { from: { position: { x: 5, y: -0.7 }, scale: { x: 0.65, y: 0.65, z: 0.65 } }, to: { position: { x: 0, y: -0.7 }, rotation: { z: 0 } } },
      },
      final: {
        can1: { position: { x: 0, y: -0.7 }, scale: { x: 0.65, y: 0.65, z: 0.65 } },
      },
      scroll: {
        groupRotation: { y: Math.PI * 2 },
        can1: { position: { x: 0, y: -0.65 }, rotation: { z: 0 } },
        can2: { from: { position: { x: 0, y: -4, z: -0.5 }, scale: { x: 0.57, y: 0.57, z: 0.57 } }, to: { position: { x: 0.33, y: -0.78, z: -0.5 }, rotation: { z: -0.3 }, scale: { x: 0.57, y: 0.57, z: 0.57 } } },
        can3: { from: { position: { x: -0.25, y: 4, z: -0.4 }, scale: { x: 0.57, y: 0.57, z: 0.57 } }, to: { position: { x: -0.33, y: -0.74, z: -0.4 }, rotation: { z: 0.3 }, scale: { x: 0.57, y: 0.57, z: 0.57 } } },

      },
    },
    lime: {
      position: { x: -0.3, y: -0.4, z: 0 },
      scaleFrom: { x: 0, y: 0, z: 0 },
      scaleTo: { x: 0.75, y: 0.75, z: 0.75 },
    },
    cherry: {
      position: { x: -0.3, y: -0.4, z: 0 },
      scaleFrom: { x: 0, y: 0, z: 0 },
      scaleTo: { x: 0.75, y: 0.75, z: 0.75 },
    },
    single: {
      position: { x: 0, y: -0.4, z: 0 },
      scale: { x: 0.65, y: 0.65, z: 0.65 },
      scrollAnimations: {
        position: { y: -0.3, x: 0 },
      },
      scrollAnimations2: {
        position: { y: -0.3, x: 0 },
      },
    },
    carousel: {
      radiusX: 1.3,
      radiusZ: 0.85,
      scaleRange: [0.6, 0.7],
      duration: 1,
    }
  },

  MD: {
    hero: {

      intro: {
        can1: { from: { position: { x: 4, y: -0.65 }, scale: { x: 0.68, y: 0.68, z: 0.68 } }, to: { position: { x: 0, y: -0.65 }, rotation: { z: 0 } } },
      },
      final: {
        can1: { position: { x: 0, y: -0.65 }, scale: { x: 0.68, y: 0.68, z: 0.68 } },
      },
      scroll: {
        groupRotation: { y: Math.PI * 2 },
        can1: { position: { x: 0, y: -0.6 }, rotation: { z: 0 } },
        can2: { from: { position: { x: 0, y: -4, z: -0.5 }, scale: { x: 0.6, y: 0.6, z: 0.6 } }, to: { position: { x: 0.43, y: -0.78, z: -0.5 }, rotation: { z: -0.3 }, scale: { x: 0.6, y: 0.6, z: 0.6 } } },
        can3: { from: { position: { x: -0.25, y: 4, z: -0.4 }, scale: { x: 0.6, y: 0.6, z: 0.6 } }, to: { position: { x: -0.40, y: -0.74, z: -0.4 }, rotation: { z: 0.3 }, scale: { x: 0.6, y: 0.6, z: 0.6 } } },

      },
    },
    lime: {
      position: { x: -0.3, y: -0.5, z: 0 },
      scaleFrom: { x: 0, y: 0, z: 0 },
      scaleTo: { x: 0.75, y: 0.75, z: 0.75 },
    },
    cherry: {
      position: { x: -0.3, y: -0.5, z: 0 },
      scaleFrom: { x: 0, y: 0, z: 0 },
      scaleTo: { x: 0.75, y: 0.75, z: 0.75 },
    },
    single: {
      position: { x: 0, y: -0.4, z: 0 },
      scale: { x: 0.7, y: 0.7, z: 0.7 },
      scrollAnimations: {
        position: { y: -0.3, x: 0 },
      },
      scrollAnimations2: {
        position: { y: -0.3, x: 0 },
      },
    },
    carousel: {
      radiusX: 1.5,
      radiusZ: 0.9,
      scaleRange: [0.7, 0.9],
      duration: 1,
    }
  },

  LG: {
    hero: {

      intro: {
        can1: { from: { position: { x: 4, y: -0.65 }, scale: { x: 0.68, y: 0.68, z: 0.68 } }, to: { position: { x: 0, y: -0.65 }, rotation: { z: 0 } } },
      },
      final: {
        can1: { position: { x: 0, y: -0.65 }, scale: { x: 0.68, y: 0.68, z: 0.68 } },
      },
      scroll: {
        groupRotation: { y: Math.PI * 2 },
        can1: { position: { x: 0, y: -0.6 }, rotation: { z: 0 } },
        can2: { from: { position: { x: 0, y: -4, z: -0.5 }, scale: { x: 0.6, y: 0.6, z: 0.6 } }, to: { position: { x: 0.43, y: -0.78, z: -0.5 }, rotation: { z: -0.3 }, scale: { x: 0.6, y: 0.6, z: 0.6 } } },
        can3: { from: { position: { x: -0.25, y: 4, z: -0.4 }, scale: { x: 0.6, y: 0.6, z: 0.6 } }, to: { position: { x: -0.40, y: -0.74, z: -0.4 }, rotation: { z: 0.3 }, scale: { x: 0.6, y: 0.6, z: 0.6 } } },

      },
    },
    lime: {
      position: { x: -0.3, y: -0.5, z: 0 },
      scaleFrom: { x: 0, y: 0, z: 0 },
      scaleTo: { x: 0.75, y: 0.75, z: 0.75 },
    },
    cherry: {
      position: { x: -0.3, y: -0.5, z: 0 },
      scaleFrom: { x: 0, y: 0, z: 0 },
      scaleTo: { x: 0.75, y: 0.75, z: 0.75 },
    },
    single: {
      position: { x: 0, y: -0.4, z: 0 },
      scale: { x: 0.8, y: 0.8, z: 0.8 },
      scrollAnimations: {
        position: { y: -0.3, x: 0 },
      },
      scrollAnimations2: {
        position: { y: -0.3, x: 0 },
      },
    },
    carousel: {
      radiusX: 1.8,
      radiusZ: 0.95,
      scaleRange: [0.8, 1],
      duration: 1,
    }
  },

  XL: {
    hero: {
      intro: {
        can1: { from: { position: { y: 0, x: 4 } ,scale: { x: 0.85, y: 0.85, z: 0.85 } }, to: { position: { y: -0.2, x: 1.2 }, rotation: { y: -0.1 } } },
      },
      final: {
        can1: { position: { y: -0.2, x: 1.2 }, scale: { x: 0.85, y: 0.85, z: 0.85 } },
      },
      scroll: {
        groupRotation: { y: Math.PI * 2 },
        can1: { position: { x: 1.3 }, rotation: { z: 0 } },
        can2: { from: { position: { x: 0, y: -4, z: -0.5 }, scale: { x: 0.8, y: 0.8, z: 0.8 } }, to: { position: { x: 2.1, y: 0, z: -0.8 }, rotation: { z: -0.3 }, scale: { x: 0.8, y: 0.8, z: 0.8 } } },
        can3: { from: { position: { x: -1.5, y: 4, z: -0.4 }, scale: { x: 0.8, y: 0.8, z: 0.8 } }, to: { position: { x: 0.8, y: 0, z: -0.5 }, rotation: { z: 0.3 }, scale: { x: 0.8, y: 0.8, z: 0.8 } } },

      },
    },
    lime: {
      position: { x: 1.5, y: 0, z: 0 },
      scaleFrom: { x: 0, y: 0, z: 0 },
      scaleTo: { x: 0.9, y: 0.9, z: 0.9 },
    },
    cherry: {
      position: { x: 1.5, y: 0, z: 0 },
      scaleFrom: { x: 0, y: 0, z: 0 },
      scaleTo: { x: 0.9, y: 0.9, z: 0.9 },
    },
    single: {
      position: { x: 0, y: -0.4, z: 0 },
      scale: { x: 0.85, y: 0.85, z: 0.85 },
      scrollAnimations: {
        position: { y: -0.3, x: 0 },
      },
      scrollAnimations2: {
        position: { y: -0.3, x: 0 },
      },
    },
    carousel: {
      radiusX: 1.7,
      radiusZ: 0.95,
      scaleRange: [0.7, 1],
      duration: 1,
    }
  },

  XXL: {
    hero: {
      intro: {
        can1: { from: { position: { y: -0.1, x: 3.2 } }, to: { position: { y: -0.1, x: 1.7 } } },
      },
      final: {
        can1: { position: { y: -0.1, x: 2 }, scale: { x: 1, y: 1, z: 1 } },
      },
      scroll: {
        groupRotation: { y: Math.PI * 2 },
        can1: { position: { x: 1.4 }, rotation: { z: 0 } },
        can2: { from: { position: { x: 0, y: -4, z: -0.5 }, scale: { x: 0.85, y: 0.85, z: 0.85 } }, to: { position: { x: 2.2, y: 0, z: -0.8 }, rotation: { z: -0.3 }, scale: { x: 0.85, y: 0.85, z: 0.85 } } },
        can3: { from: { position: { x: -1.5, y: 4, z: -0.4 }, scale: { x: 0.85, y: 0.85, z: 0.85 } }, to: { position: { x: 0.9, y: 0, z: -0.5 }, rotation: { z: 0.3 }, scale: { x: 0.85, y: 0.85, z: 0.85 } } },

      },
    },
    lime: {
      position: { x: 1.6, y: 0, z: 0 },
      scaleFrom: { x: 0, y: 0, z: 0 },
      scaleTo: { x: 0.95, y: 0.95, z: 0.95 },
    },
    cherry: {
      position: { x: 1.6, y: 0, z: 0 },
      scaleFrom: { x: 0, y: 0, z: 0 },
      scaleTo: { x: 0.95, y: 0.95, z: 0.95 },
    },
    single: {
      position: { x: 0, y: -0.2, z: 0 },
      scale: { x: 0.85, y: 0.85, z: 0.85 },
      scrollAnimations: {
        position: { y: 0, x: 0 },
      },
      scrollAnimations2: {
        position: { y: -0.2, x: 1.5 },
      },
    },
    carousel: {
      radiusX: 2,
      radiusZ: 0.95,
      scaleRange: [0.8, 1],
      duration: 1,
    }
  }
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
