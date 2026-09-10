import { createFileRoute } from "@tanstack/react-router";
import naMiru from "@/assets/na-miru.jpg";

export const Route = createFileRoute("/o-nas")({
  head: () => ({
    meta: [
      { title: "O nás | Záhonky od Danušky" },
      {
        name: "description",
        content: "Malá rodinná dílna na Vysočině, která vyrábí dřevěné vyvýšené záhony na míru.",
      },
      { property: "og:title", content: "O nás – Záhonky od Danušky" },
      { property: "og:description", content: "Rodinná dílna vyrábějící dřevěné vyvýšené záhony." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 md:px-6 md:py-16">
      <h1 className="font-display text-4xl md:text-5xl">O nás</h1>
      <p className="mt-5 text-lg text-muted-foreground">
        Jsme malá rodinná dílna na Vysočině. Začínali jsme jedním záhonem pro vlastní zahradu –
        dnes vyrábíme záhony pro zahrady, terasy, školy i komunitní zahrádky po celé republice.
      </p>
      <img
        src={naMiru}
        alt="Výroba dřevěného vyvýšeného záhonu"
        loading="lazy"
        width={1408}
        height={912}
        className="mt-10 w-full rounded-3xl object-cover shadow-[var(--shadow-soft)]"
      />
      <div className="mt-10 grid gap-8 md:grid-cols-2">
        <div>
          <h2 className="font-display text-2xl">Jak pracujeme</h2>
          <p className="mt-3 text-muted-foreground">
            Dřevo nakupujeme od ověřených severských dodavatelů, řežeme a hoblujeme ho u nás
            v dílně. Každý záhon procházíme ručně, hrany zaoblujeme a spoje kotvíme nerezovými
            vruty.
          </p>
        </div>
        <div>
          <h2 className="font-display text-2xl">Naše hodnoty</h2>
          <p className="mt-3 text-muted-foreground">
            Poctivé materiály, čitelné ceny a řešení, které vydrží roky. Raději poradíme
            s rozměrem, než abychom prodali něco, co se na vaši zahradu nehodí.
          </p>
        </div>
      </div>
      <p className="mt-10 text-sm text-muted-foreground">
        Texty i údaje na této stránce jsou zatím ukázkové a snadno je nahradíme skutečnými.
      </p>
    </div>
  );
}
