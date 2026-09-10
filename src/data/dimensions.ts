import type { Dimension } from "@/types";

/** Přednastavené DEMO rozměry (cm). */
export const dimensions: Dimension[] = [
  { id: "200x100x60", length: 200, width: 100, height: 60 },
  { id: "250x100x60", length: 250, width: 100, height: 60 },
  { id: "300x100x60", length: 300, width: 100, height: 60 },
  { id: "200x120x60", length: 200, width: 120, height: 60 },
  { id: "250x120x60", length: 250, width: 120, height: 60 },
  { id: "300x120x60", length: 300, width: 120, height: 60 },
];

export const formatDimension = (l: number, w: number, h: number) => `${l} × ${w} × ${h} cm`;

export const getDimension = (id: string) => dimensions.find((d) => d.id === id) ?? dimensions[0]!;

/** Limity pro konfigurátor na míru (cm). */
export const customLimits = {
  length: { min: 80, max: 600, step: 10 },
  width: { min: 60, max: 200, step: 10 },
  height: { min: 20, max: 120, step: 10 },
};
