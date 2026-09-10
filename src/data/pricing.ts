import type { Thickness } from "@/types";

/**
 * DEMO ceník. Všechny hodnoty jsou v Kč a lze je kdykoliv změnit
 * (nebo přepsat v jednoduché administraci na /admin).
 */
export interface PricingConfig {
  /** Základní cena za konstrukci, spojovací materiál a balení (Kč / kus). */
  basePrice: number;
  /** Cena dřeva za m² stěny podle materiálu a tloušťky. */
  materialPricePerM2: Record<string, Record<Thickness, number>>;
  /** Cena nátěru za m² podle kvality. */
  paintPricePerM2: Record<string, number>;
  /** Cena vrchní lišty za běžný metr obvodu. */
  topRailPricePerM: number;
  /** Cena vnitřní fólie za m² (stěny + dno). */
  linerPricePerM2: number;
  /** Vnitřní opálení je v ceně – cena se nemění. */
  burnPrice: number;
  /** Doprava po ČR (DEMO). */
  shippingPrice: number;
}

export const defaultPricing: PricingConfig = {
  basePrice: 890,
  materialPricePerM2: {
    borovice: { 28: 1290, 45: 1790 },
    modrin: { 28: 1690, 45: 2290 },
  },
  paintPricePerM2: {
    zakladni: 190,
    premium: 340,
    "extra-ochrana": 520,
  },
  topRailPricePerM: 340,
  linerPricePerM2: 95,
  burnPrice: 0,
  shippingPrice: 0,
};
