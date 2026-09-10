import type { PriceResult, ProductConfiguration } from "@/types";
import { defaultPricing, type PricingConfig } from "@/data/pricing";

/** Plocha stěn v m²: 2 × (délka + šířka) × výška. */
export const wallAreaM2 = (l: number, w: number, h: number) => (2 * (l + w) * h) / 10_000;

/** Obvod v běžných metrech: 2 × (délka + šířka). */
export const perimeterM = (l: number, w: number) => (2 * (l + w)) / 100;

/** Plocha dna v m². */
export const bottomAreaM2 = (l: number, w: number) => (l * w) / 10_000;

/**
 * Centrální DEMO výpočet ceny.
 * Stačí nahradit tělo této funkce skutečným cenovým vzorcem.
 */
export function calculateProductPrice(
  config: ProductConfiguration,
  pricing: PricingConfig = defaultPricing,
): PriceResult {
  const { length, width, height, quantity } = config;
  const walls = wallAreaM2(length, width, height);

  const breakdown: PriceResult["breakdown"] = [];

  breakdown.push({ label: "Základ konstrukce", price: pricing.basePrice });

  const materialRate = pricing.materialPricePerM2[config.materialId]?.[config.thickness] ?? 0;
  breakdown.push({ label: "Dřevo a tloušťka", price: Math.round(walls * materialRate) });

  const paintRate = pricing.paintPricePerM2[config.paintQualityId] ?? 0;
  breakdown.push({ label: "Nátěr", price: Math.round(walls * paintRate) });

  if (config.topRail) {
    // Cena lišty = obvod záhonu × cena za běžný metr
    breakdown.push({
      label: "Vrchní lišta",
      price: Math.round(perimeterM(length, width) * pricing.topRailPricePerM),
    });
  }

  if (config.interior === "folie") {
    const area = walls + bottomAreaM2(length, width);
    breakdown.push({ label: "Vnitřní fólie", price: Math.round(area * pricing.linerPricePerM2) });
  } else {
    // Vnitřní opálení cenu nemění.
    breakdown.push({ label: "Vnitřní opálení", price: pricing.burnPrice });
  }

  const unitPrice = breakdown.reduce((sum, item) => sum + item.price, 0);

  return {
    breakdown,
    unitPrice,
    totalPrice: unitPrice * Math.max(1, quantity),
  };
}

export const formatPrice = (value: number) =>
  `${new Intl.NumberFormat("cs-CZ").format(Math.round(value))} Kč`;
