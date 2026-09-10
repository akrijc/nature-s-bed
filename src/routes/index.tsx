import { createFileRoute, Link } from "@tanstack/react-router";
import { Hammer, Leaf, Ruler, ShieldCheck, Sprout, Truck } from "lucide-react";
import heroImage from "@/assets/hero-zahon.jpg";
import naMiruImage from "@/assets/na-miru.jpg";
import { products } from "@/data/products";
import { materials } from "@/data/materials";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Záhonky od Danušky – dřevěné vyvýšené záhony na míru" },
      {
        name: "description",
        content:
          "Vyvýšené záhony ze severské borovice a modřínu. Hotové rozměry, konfigurátor na míru a nátěry v 10 odstínech.",
      },
      { property: "og:title", content: "Záhonky od Danušky – dřevěné vyvýšené záhony" },
      {
        property: "og:description",
        content: "Vyvýšené záhony ze severské borovice a modřínu, vyrobené v Česku na míru.",
      },
    ],
  }),
  component: HomePage,
});

const benefits = [
  { icon: Leaf, title: "Přírodní materiál", text: "Severská borovice a modřín z certifikovaných lesů, žádné tlakově impregnované dřevo." },
  { icon: Hammer, title: "Česká výroba", text: "Každý záhon vyrábíme a kompletujeme v naší dílně na Vysočině." },
  { icon: Ruler, title: "Rozměr na míru", text: "Vyrobíme přesně takový záhon, jaký potřebujete – na centimetr." },
  { icon: ShieldCheck, title: "Odolné nátěry", text: "Tři úrovně ochrany a deset odstínů, které dřevu prodlouží život." },
  { icon: Truck, title: "Doprava po ČR", text: "Rozvoz vlastní dopravou, u větších objednávek zdarma." },
  { icon: Sprout, title: "Připraveno k sázení", text: "Vnitřní fólie nebo opálení, montáž zvládnete za odpoledne." },
];

function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 md:px-6 md:py-20 lg:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-secondary-foreground">
              Ruční výroba z Vysočiny
            </span>
            <h1 className="mt-5 font-display text-4xl leading-tight md:text-6xl">
              Vyvýšené záhony podle vašich představ
            </h1>
            <p className="mt-5 max-w-lg text-lg text-muted-foreground">
              Masivní dřevěné záhony ze severské borovice a modřínu. Vyberte si z hotových rozměrů
              nebo si nechte vyrobit záhon přesně na míru vaší zahradě.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/produkty"
                className="flex min-h-13 items-center justify-center rounded-xl bg-primary px-7 text-base font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                Vybrat záhon
              </Link>
              <Link
                to="/zahon-na-miru"
                className="flex min-h-13 items-center justify-center rounded-xl border border-border bg-card px-7 text-base font-semibold transition-colors hover:bg-secondary"
              >
                Vytvořit záhon na míru
              </Link>
            </div>
          </div>
          <div className="relative">
            <img
              src={heroImage}
              alt="Dřevěný vyvýšený záhon osázený zeleninou a bylinkami"
              width={1600}
              height={1008}
              className="w-full rounded-3xl object-cover shadow-[var(--shadow-lift)]"
            />
          </div>
        </div>
      </section>

      {/* Výhody */}
      <section className="section-y bg-secondary/50">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <h2 className="font-display text-3xl md:text-4xl">Proč právě naše záhony</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((b) => (
              <div key={b.title} className="surface-card p-6">
                <b.icon className="size-6 text-primary" />
                <h3 className="mt-4 text-lg">{b.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Materiály */}
      <section className="section-y">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <h2 className="font-display text-3xl md:text-4xl">Materiály</h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Oba materiály nabízíme v tloušťce 28 mm i 45 mm. Silnější provedení volte pro velké
            záhony a nejdelší životnost.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {materials.map((m) => (
              <article key={m.id} className="surface-card overflow-hidden">
                <img
                  src={m.image}
                  alt={m.name}
                  loading="lazy"
                  width={1200}
                  height={912}
                  className="aspect-16/9 w-full object-cover"
                />
                <div className="p-6">
                  <h3 className="font-display text-xl">{m.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{m.description}</p>
                  <div className="mt-4 flex gap-2">
                    {m.thicknesses.map((t) => (
                      <span key={t} className="rounded-full bg-secondary px-3 py-1 text-xs font-medium">
                        {t} mm
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Produkty */}
      <section className="section-y bg-secondary/50">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-display text-3xl md:text-4xl">Oblíbené záhony</h2>
            <Link to="/produkty" className="text-sm font-semibold text-primary hover:underline">
              Zobrazit celou nabídku →
            </Link>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Záhon na míru */}
      <section className="section-y">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 md:px-6 lg:grid-cols-2">
          <img
            src={naMiruImage}
            alt="Montáž dřevěného vyvýšeného záhonu"
            loading="lazy"
            width={1408}
            height={912}
            className="w-full rounded-3xl object-cover shadow-[var(--shadow-soft)]"
          />
          <div>
            <h2 className="font-display text-3xl md:text-4xl">Záhon na míru</h2>
            <p className="mt-4 text-muted-foreground">
              Máte úzký pruh u plotu, terasu nebo netypický roh zahrady? Zadejte délku, šířku
              a výšku a v konfigurátoru hned uvidíte výslednou cenu.
            </p>
            <ul className="mt-6 space-y-2 text-sm">
              {["Vlastní rozměry na centimetr", "Volba materiálu a tloušťky", "Nátěr ve 3 kvalitách a 10 odstínech", "Vrchní lišta počítaná podle obvodu"].map(
                (t) => (
                  <li key={t} className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-primary" /> {t}
                  </li>
                ),
              )}
            </ul>
            <Link
              to="/zahon-na-miru"
              className="mt-8 inline-flex min-h-13 items-center justify-center rounded-xl bg-primary px-7 text-base font-semibold text-primary-foreground hover:opacity-90"
            >
              Otevřít konfigurátor
            </Link>
          </div>
        </div>
      </section>

      {/* Výzva */}
      <section className="mx-auto max-w-6xl px-4 pb-4 md:px-6">
        <div className="rounded-3xl bg-primary px-6 py-12 text-center text-primary-foreground md:px-12">
          <h2 className="font-display text-3xl md:text-4xl">Pojďme vypěstovat něco dobrého</h2>
          <p className="mx-auto mt-3 max-w-xl opacity-90">
            Vyberte si hotový rozměr nebo si navrhněte vlastní. Objednávku vyřídíme do několika dní.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              to="/produkty"
              className="flex min-h-13 items-center justify-center rounded-xl bg-background px-7 text-base font-semibold text-foreground hover:opacity-90"
            >
              Prohlédnout záhony
            </Link>
            <Link
              to="/kontakt"
              className="flex min-h-13 items-center justify-center rounded-xl border border-primary-foreground/40 px-7 text-base font-semibold hover:bg-primary-foreground/10"
            >
              Napsat nám
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
