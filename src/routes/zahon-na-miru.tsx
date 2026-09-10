import { createFileRoute } from "@tanstack/react-router";
import { Configurator } from "@/components/Configurator";
import { defaultCustomConfig } from "@/lib/config-factory";

export const Route = createFileRoute("/zahon-na-miru")({
  head: () => ({
    meta: [
      { title: "Záhon na míru – konfigurátor | Záhonky od Danušky" },
      {
        name: "description",
        content:
          "Zadejte délku, šířku a výšku, zvolte materiál, nátěr a doplňky. Cena se spočítá okamžitě.",
      },
      { property: "og:title", content: "Konfigurátor záhonu na míru" },
      {
        property: "og:description",
        content: "Vlastní rozměry, materiál, nátěr i doplňky s okamžitým výpočtem ceny.",
      },
    ],
  }),
  component: CustomPage,
});

function CustomPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
      <h1 className="font-display text-4xl md:text-5xl">Záhon na míru</h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        Vyrobíme záhon přesně podle vašich rozměrů. Zadejte délku, šířku a výšku v centimetrech,
        vyberte materiál a povrchovou úpravu – celková cena se přepočítá po každé změně.
      </p>

      <div className="mt-10">
        <Configurator mode="custom" title="Záhon na míru" initialConfig={defaultCustomConfig()} />
      </div>
    </div>
  );
}
