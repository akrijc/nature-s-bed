import type { Product, ProductConfiguration } from "@/types";
import { getDimension } from "@/data/dimensions";
import { getColorsForQuality, paintQualities } from "@/data/paints";

const defaultQuality = paintQualities[0]!;
const defaultColor = getColorsForQuality(defaultQuality.id)[0]!;

export function defaultConfigForProduct(product: Product): ProductConfiguration {
  const d = getDimension(product.defaultDimensionId);
  return {
    materialId: product.materialId,
    thickness: product.thickness,
    length: d.length,
    width: d.width,
    height: d.height,
    quantity: 1,
    paintQualityId: defaultQuality.id,
    paintColorId: defaultColor.id,
    topRail: false,
    interior: "folie",
  };
}

export function defaultCustomConfig(): ProductConfiguration {
  return {
    materialId: "modrin",
    thickness: 45,
    length: 250,
    width: 100,
    height: 60,
    quantity: 1,
    paintQualityId: "premium",
    paintColorId: "premium-dub",
    topRail: true,
    interior: "folie",
    custom: true,
  };
}
