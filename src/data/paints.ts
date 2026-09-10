import type { PaintColor, PaintQuality } from "@/types";

export const paintQualities: PaintQuality[] = [
  {
    id: "zakladni",
    name: "Základní",
    description: "Jednovrstvá lazura chránící dřevo před UV zářením a vlhkostí.",
    warranty: "Doporučená obnova po 2 letech",
  },
  {
    id: "premium",
    name: "Premium",
    description: "Dvouvrstvý olejový nátěr s vyšší krycí schopností a hlubokou penetrací.",
    warranty: "Doporučená obnova po 4 letech",
  },
  {
    id: "extra-ochrana",
    name: "Extra ochrana",
    description: "Třívrstvý systém s impregnací a finálním voskem pro nejnáročnější podmínky.",
    warranty: "Doporučená obnova po 6 letech",
  },
];

const baseShades: { key: string; name: string; hex: string }[] = [
  { key: "prirodni", name: "Přírodní", hex: "#d9c19a" },
  { key: "svetly-dub", name: "Světlý dub", hex: "#c9a878" },
  { key: "dub", name: "Dub", hex: "#a97f4e" },
  { key: "teak", name: "Teak", hex: "#8d5f34" },
  { key: "orech", name: "Ořech", hex: "#6b4526" },
  { key: "mahagon", name: "Mahagon", hex: "#7b3520" },
  { key: "palisandr", name: "Palisandr", hex: "#4e2b1f" },
  { key: "antracit", name: "Antracit", hex: "#3a3f42" },
  { key: "seda", name: "Šedá", hex: "#8b8d86" },
  { key: "cerna", name: "Černá", hex: "#1e1e1c" },
];

export const paintColors: PaintColor[] = paintQualities.flatMap((q) =>
  baseShades.map((s) => ({
    id: `${q.id}-${s.key}`,
    qualityId: q.id,
    name: s.name,
    hex: s.hex,
  })),
);

export const getColorsForQuality = (qualityId: string) =>
  paintColors.filter((c) => c.qualityId === qualityId);

export const getPaintQuality = (id: string) =>
  paintQualities.find((q) => q.id === id) ?? paintQualities[0];

export const getPaintColor = (id: string) => paintColors.find((c) => c.id === id);
