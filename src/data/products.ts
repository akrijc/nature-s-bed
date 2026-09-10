import type { Product } from "@/types";
import borovice from "@/assets/produkt-borovice.jpg";
import modrin from "@/assets/produkt-modrin.jpg";

export const products: Product[] = [
  {
    id: "borovice-28",
    slug: "borovice-28",
    name: "Záhon Severská borovice 28 mm",
    shortDescription: "Lehký a dostupný záhon ze severské borovice.",
    description:
      "Vyvýšený záhon ze severské borovice o tloušťce 28 mm. Snadná manipulace, rychlá montáž a příjemná cena. Ideální volba pro bylinky, saláty a zeleninové záhony na zahradě i terase.",
    image: borovice,
    materialId: "borovice",
    thickness: 28,
    defaultDimensionId: "200x100x60",
  },
  {
    id: "borovice-45",
    slug: "borovice-45",
    name: "Záhon Severská borovice 45 mm",
    shortDescription: "Masivní borovicová konstrukce pro dlouhou životnost.",
    description:
      "Silnostěnné provedení ze severské borovice 45 mm. Robustní konstrukce lépe drží tvar i při velkých rozměrech a udržuje stabilnější teplotu zeminy.",
    image: borovice,
    materialId: "borovice",
    thickness: 45,
    defaultDimensionId: "250x100x60",
  },
  {
    id: "modrin-28",
    slug: "modrin-28",
    name: "Záhon Severský modřín 28 mm",
    shortDescription: "Přirozeně odolný modřín s teplým tónem.",
    description:
      "Vyvýšený záhon ze severského modřínu 28 mm. Dřevo je přirozeně odolné proti vlhkosti a hnilobě, vypadá skvěle i bez nátěru.",
    image: modrin,
    materialId: "modrin",
    thickness: 28,
    defaultDimensionId: "200x120x60",
  },
  {
    id: "modrin-45",
    slug: "modrin-45",
    name: "Záhon Severský modřín 45 mm",
    shortDescription: "Nejodolnější varianta v naší nabídce.",
    description:
      "Prémiový vyvýšený záhon ze severského modřínu 45 mm. Nejvyšší odolnost, masivní vzhled a nejdelší životnost. Vhodný i pro velké rozměry a náročné klima.",
    image: modrin,
    materialId: "modrin",
    thickness: 45,
    defaultDimensionId: "250x120x60",
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
