import { createFileRoute, Link } from "@tanstack/react-router";
import { products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { dimensions, formatDimension } from "@/data/dimensions";

export const Route = createFileRoute("/produkty/")({
  head: () => ({
    meta: [
      { title: "Vyvýšené záhony – katalog | Záhonky od Danušky" },
      {
        name: "description",
        content:
          "Katalog dřevěných vyvýšených záhonů ze severské borovice a modřínu v tloušťce 28 a 45 mm.",
      },
      { property: "og:title", content: "Vyvýšené záhony – katalog" },
      {
        property: "og:description",
        content: "Borovice a modřín, tloušťka 28 a 45 mm, šest přednastavených rozměrů.",
      },
    ],
  }),
  component: ProductsPage,
});

function ProductsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
      <h1 className="font-display text-4xl md:text-5xl">Vyvýšené záhony</h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        Vyberte si materiál a tloušťku. V detailu produktu si zvolíte rozměr, nátěr, odstín
        i doplňky – cena se přepočítá okamžitě.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      <section className="surface-card mt-14 p-6 md:p-8">
        <h2 className="font-display text-2xl">Přednastavené rozměry</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Všechny rozměry jsou dostupné u každého produktu. Potřebujete jiný? Použijte konfigurátor.
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {dimensions.map((d) => (
            <div key={d.id} className="rounded-xl bg-secondary px-4 py-3 text-sm font-medium">
              {formatDimension(d.length, d.width, d.height)}
            </div>
          ))}
        </div>
        <Link
          to="/zahon-na-miru"
          className="mt-6 inline-flex min-h-12 items-center rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground hover:opacity-90"
        >
          Chci vlastní rozměr
        </Link>
      </section>
    </div>
  );
}
