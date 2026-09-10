import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getProduct } from "@/data/products";
import { getMaterial } from "@/data/materials";
import { Configurator } from "@/components/Configurator";
import { defaultConfigForProduct } from "@/lib/config-factory";

export const Route = createFileRoute("/produkty/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Produkt nenalezen | Záhonky od Danušky" }, { name: "robots", content: "noindex" }],
      };
    }
    const { product } = loaderData;
    return {
      meta: [
        { title: `${product.name} | Záhonky od Danušky` },
        { name: "description", content: product.shortDescription },
        { property: "og:title", content: product.name },
        { property: "og:description", content: product.shortDescription },
      ],
    };
  },
  component: ProductDetail,
});

function ProductDetail() {
  const { product } = Route.useLoaderData();
  const material = getMaterial(product.materialId);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14">
      <nav className="text-sm text-muted-foreground">
        <Link to="/produkty" className="hover:text-foreground">
          Produkty
        </Link>{" "}
        / <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="mt-6 grid gap-8 lg:grid-cols-2 lg:items-start">
        <img
          src={product.image}
          alt={product.name}
          width={1200}
          height={912}
          className="w-full rounded-3xl object-cover shadow-[var(--shadow-soft)]"
        />
        <div>
          <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            {material.name} · {product.thickness} mm
          </span>
          <h1 className="mt-2 font-display text-3xl md:text-4xl">{product.name}</h1>
          <p className="mt-4 text-muted-foreground">{product.description}</p>
          <p className="mt-4 text-sm text-muted-foreground">{material.description}</p>
        </div>
      </div>

      <section className="mt-14">
        <h2 className="font-display text-2xl md:text-3xl">Nastavte si svůj záhon</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Cena se přepočítává okamžitě podle zvolených možností.
        </p>
        <div className="mt-8">
          <Configurator
            mode="preset"
            title={product.name}
            initialConfig={defaultConfigForProduct(product)}
            lockMaterial={false}
          />
        </div>
      </section>
    </div>
  );
}
