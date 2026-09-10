/**
 * Centrální typy pro celý e-shop.
 * Data (ceny, materiály, rozměry, nátěry) jsou v /src/data.
 */

export type Thickness = 28 | 45;

export interface Material {
  id: string;
  name: string;
  shortName: string;
  description: string;
  image: string;
  thicknesses: Thickness[];
}

export interface Dimension {
  id: string;
  length: number; // cm
  width: number; // cm
  height: number; // cm
}

export interface PaintQuality {
  id: string;
  name: string;
  description: string;
  warranty: string;
}

export interface PaintColor {
  id: string;
  qualityId: string;
  name: string;
  hex: string;
}

export interface Addon {
  id: string;
  name: string;
  description: string;
}

export type InteriorTreatment = "folie" | "opaleni";

/** Kompletní konfigurace jednoho záhonu. */
export interface ProductConfiguration {
  materialId: string;
  thickness: Thickness;
  length: number;
  width: number;
  height: number;
  quantity: number;
  paintQualityId: string;
  paintColorId: string;
  topRail: boolean;
  interior: InteriorTreatment;
  custom?: boolean;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  image: string;
  materialId: string;
  thickness: Thickness;
  defaultDimensionId: string;
}

export interface PriceBreakdownItem {
  label: string;
  price: number;
}

export interface PriceResult {
  breakdown: PriceBreakdownItem[];
  unitPrice: number;
  totalPrice: number;
}

export interface CartItem {
  id: string;
  productId?: string;
  title: string;
  config: ProductConfiguration;
  unitPrice: number;
}

export interface CustomerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  zip: string;
  note: string;
}

export interface DemoOrder {
  number: string;
  createdAt: string;
  customer: CustomerInfo;
  items: CartItem[];
  total: number;
}
