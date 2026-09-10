import { createFileRoute } from "@tanstack/react-router";
import { Clock, Mail, MapPin, Phone } from "lucide-react";

export const Route = createFileRoute("/kontakt")({
  head: () => ({
    meta: [
      { title: "Kontakt | Záhonky od Danušky" },
      {
        name: "description",
        content: "Kontaktní údaje na výrobce dřevěných vyvýšených záhonů – telefon, e-mail, adresa dílny.",
      },
      { property: "og:title", content: "Kontakt – Záhonky od Danušky" },
      { property: "og:description", content: "Telefon, e-mail a adresa naší dílny." },
    ],
  }),
  component: ContactPage,
});

const contacts = [
  { icon: Phone, label: "Telefon", value: "+420 777 123 456" },
  { icon: Mail, label: "E-mail", value: "info@zahonky-danuska.cz" },
  { icon: MapPin, label: "Dílna", value: "Truhlářská 12, 588 56 Telč" },
  { icon: Clock, label: "Otevírací doba", value: "Po–Pá 8:00–16:00, So po domluvě" },
];

function ContactPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 md:px-6 md:py-16">
      <h1 className="font-display text-4xl md:text-5xl">Kontakt</h1>
      <p className="mt-4 text-muted-foreground">
        Ozvěte se nám s dotazem na rozměr, nátěr nebo termín dodání. Rádi poradíme.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {contacts.map((c) => (
          <div key={c.label} className="surface-card flex items-start gap-3 p-5">
            <c.icon className="mt-0.5 size-5 text-primary" />
            <div>
              <span className="block text-xs uppercase tracking-wide text-muted-foreground">{c.label}</span>
              <span className="text-base font-medium">{c.value}</span>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-8 rounded-xl bg-secondary p-4 text-sm text-muted-foreground">
        Uvedené kontaktní údaje jsou zatím vymyšlené pro ukázku. Pošlete mi ty skutečné a doplním je.
      </p>
    </div>
  );
}
