import type { Material } from "@/types";
import borovice from "@/assets/produkt-borovice.jpg";
import modrin from "@/assets/produkt-modrin.jpg";

export const materials: Material[] = [
  {
    id: "borovice",
    name: "Severská borovice",
    shortName: "Borovice",
    description:
      "Světlé, pravidelně rostlé dřevo z pomalu rostoucích severských lesů. Skvělý poměr ceny a odolnosti, ideální pro nátěr ve světlých odstínech.",
    image: borovice,
    thicknesses: [28, 45],
  },
  {
    id: "modrin",
    name: "Severský modřín",
    shortName: "Modřín",
    description:
      "Přirozeně odolné dřevo s vyšším obsahem pryskyřice a výraznou kresbou. Delší životnost i bez povrchové úpravy, teplý medový tón.",
    image: modrin,
    thicknesses: [28, 45],
  },
];

export const thicknesses = [
  { value: 28 as const, label: "28 mm", note: "Lehčí konstrukce, snadná manipulace" },
  { value: 45 as const, label: "45 mm", note: "Masivní provedení, nejdelší životnost" },
];

export const getMaterial = (id: string) => materials.find((m) => m.id === id) ?? materials[0]!;
