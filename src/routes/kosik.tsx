import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2 } from "lucide-react";
import { cartItemTotal, describeConfig, useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/pricing";
import { getMaterial } from "@/data/materials";
import { getPaintColor, getPaintQuality } from "@/data/paints";

export const Route = createFileRoute("/kosik")({
  head: () => ({
    meta: [
      { title: "Košík | Záhonky od Danušky" },
      { name: "description", content: "Přehled vybraných vyvýšených záhonů a jejich konfigurací." },
      { property: "og:title", content: "Košík" },
      { property: "og:description", content: "Přehled vybraných vyvýšených záhonů." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CartPage,
});

export function configLabels(config: Parameters<typeof describeConfig>[0]) {
  return {
    material: getMaterial(config.materialId).name,
    paintQuality: getPaintQuality(config.paintQualityId).name,
    paintColor: getPaintColor(config.paintColorId)?.name ?? "—",
  };
}

function CartPage() {
  const { items, updateQuantity, removeItem, clearCart, subtotal, loaded } = useCart();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
      <h1 className="font-display text-4xl md:text-5xl">Košík</h1>

      {!loaded ? (
        <p className="mt-8 text-muted-foreground">Načítám…</p>
      ) : items.length === 0 ? (
        <div className="surface-card mt-8 p-8 text-center">
          <p className="text-muted-foreground">Váš košík je zatím prázdný.</p>
          <Link
            to="/produkty"
            className="mt-6 inline-flex min-h-12 items-center rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground hover:opacity-90"
          >
            Vybrat záhon
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_340px] lg:items-start">
          <div className="space-y-4">
            {items.map((item) => {
              const labels = configLabels(item.config);
              return (
                <article key={item.id} className="surface-card p-5">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <h2 className="font-display text-lg">{item.title}</h2>
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="size-4" /> Odebrat
                    </button>
                  </div>
                  <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
                    {describeConfig(item.config, labels).map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                    <div className="inline-flex items-center gap-2 rounded-xl border border-border p-1">
                      <button
                        type="button"
                        aria-label="Ubrat kus"
                        onClick={() => updateQuantity(item.id, item.config.quantity - 1)}
                        className="flex size-11 items-center justify-center rounded-lg hover:bg-secondary"
                      >
                        <Minus className="size-4" />
                      </button>
                      <span className="w-10 text-center font-semibold">{item.config.quantity} ks</span>
                      <button
                        type="button"
                        aria-label="Přidat kus"
                        onClick={() => updateQuantity(item.id, item.config.quantity + 1)}
                        className="flex size-11 items-center justify-center rounded-lg hover:bg-secondary"
                      >
                        <Plus className="size-4" />
                      </button>
                    </div>
                    <div className="text-right">
                      <span className="block text-xs text-muted-foreground">
                        {formatPrice(item.unitPrice)} / ks
                      </span>
                      <span className="font-display text-xl font-semibold text-primary">
                        {formatPrice(cartItemTotal(item))}
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}

            <button
              type="button"
              onClick={clearCart}
              className="text-sm text-muted-foreground underline hover:text-destructive"
            >
              Vymazat celý košík
            </button>
          </div>

          <aside className="surface-card p-6 lg:sticky lg:top-24">
            <h2 className="font-display text-xl">Souhrn</h2>
            <div className="mt-4 flex justify-between text-sm">
              <span className="text-muted-foreground">Mezisoučet</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="mt-2 flex justify-between text-sm">
              <span className="text-muted-foreground">Doprava</span>
              <span>Zdarma</span>
            </div>
            <div className="mt-5 flex items-end justify-between border-t border-border pt-4">
              <span className="font-medium">Celkem</span>
              <span className="font-display text-2xl font-semibold text-primary">
                {formatPrice(subtotal)}
              </span>
            </div>
            <Link
              to="/objednavka"
              className="mt-6 flex min-h-13 w-full items-center justify-center rounded-xl bg-primary px-6 text-base font-semibold text-primary-foreground hover:opacity-90"
            >
              Pokračovat k objednávce
            </Link>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              Demo verze – objednávka je pouze simulovaná.
            </p>
          </aside>
        </div>
      )}
    </div>
  );
}
