import { Link } from "@tanstack/react-router";
import { ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import type { Product } from "@/types";
import { getDimension, formatDimension } from "@/data/dimensions";
import { getMaterial } from "@/data/materials";
import { paintQualities, getColorsForQuality } from "@/data/paints";
import { calculateProductPrice, formatPrice } from "@/lib/pricing";
import { usePricing } from "@/lib/settings";
import { useCart } from "@/lib/cart";
import { defaultConfigForProduct } from "@/lib/config-factory";

export function ProductCard({ product }: { product: Product }) {
  const { pricing } = usePricing();
  const { addItem } = useCart();
  const material = getMaterial(product.materialId);
  const dimension = getDimension(product.defaultDimensionId);
  const config = defaultConfigForProduct(product);
  const price = calculateProductPrice(config, pricing);

  return (
    <article className="surface-card group flex flex-col overflow-hidden">
      <Link to="/produkty/$slug" params={{ slug: product.slug }} className="block overflow-hidden">
        <img
          src={product.image}
          alt={`Vyvýšený záhon – ${material.name}, ${product.thickness} mm`}
          loading="lazy"
          width={1200}
          height={912}
          className="aspect-4/3 w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <span className="text-xs font-semibold uppercase tracking-wide text-accent-foreground/70">
          {material.shortName} · {product.thickness} mm
        </span>
        <h3 className="mt-1 font-display text-lg">{product.name}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{product.shortDescription}</p>

        <ul className="mt-3 flex flex-wrap gap-2 text-xs text-muted-foreground">
          <li className="rounded-full bg-secondary px-3 py-1">
            {formatDimension(dimension.length, dimension.width, dimension.height)}
          </li>
          <li className="rounded-full bg-secondary px-3 py-1">{paintQualities.length} kvality nátěru</li>
          <li className="rounded-full bg-secondary px-3 py-1">
            {getColorsForQuality(paintQualities[0]!.id).length} odstínů
          </li>
        </ul>

        <div className="mt-5 flex items-end justify-between">
          <div>
            <span className="block text-xs text-muted-foreground">od</span>
            <span className="font-display text-2xl font-semibold text-primary">
              {formatPrice(price.unitPrice)}
            </span>
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
          <Link
            to="/produkty/$slug"
            params={{ slug: product.slug }}
            className="flex min-h-11 flex-1 items-center justify-center rounded-xl border border-border px-4 text-sm font-medium hover:bg-secondary"
          >
            Detail
          </Link>
          <button
            type="button"
            onClick={() => {
              addItem({ productId: product.id, title: product.name, config, unitPrice: price.unitPrice });
              toast.success("Přidáno do košíku", { description: product.name });
            }}
            className="flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground hover:opacity-90"
          >
            <ShoppingCart className="size-4" /> Do košíku
          </button>
        </div>
      </div>
    </article>
  );
}
