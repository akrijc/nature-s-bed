import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { cartItemTotal, describeConfig, useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/pricing";
import { generateOrderNumber, saveDemoOrder } from "@/lib/order";
import { configLabels } from "@/routes/kosik";
import type { CustomerInfo } from "@/types";

export const Route = createFileRoute("/objednavka")({
  head: () => ({
    meta: [
      { title: "Objednávka | Záhonky od Danušky" },
      { name: "description", content: "Dokončení objednávky vyvýšeného záhonu – demo verze." },
      { property: "og:title", content: "Objednávka" },
      { property: "og:description", content: "Dokončení objednávky vyvýšeného záhonu." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CheckoutPage,
});

const emptyCustomer: CustomerInfo = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  street: "",
  city: "",
  zip: "",
  note: "",
};

const fields: { key: keyof CustomerInfo; label: string; type?: string; required?: boolean; full?: boolean }[] = [
  { key: "firstName", label: "Jméno", required: true },
  { key: "lastName", label: "Příjmení", required: true },
  { key: "email", label: "E-mail", type: "email", required: true },
  { key: "phone", label: "Telefon", type: "tel", required: true },
  { key: "street", label: "Ulice a číslo popisné", required: true, full: true },
  { key: "city", label: "Město", required: true },
  { key: "zip", label: "PSČ", required: true },
];

function CheckoutPage() {
  const { items, subtotal, clearCart, loaded } = useCart();
  const [customer, setCustomer] = useState<CustomerInfo>(emptyCustomer);
  const navigate = useNavigate();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    saveDemoOrder({
      number: generateOrderNumber(),
      createdAt: new Date().toISOString(),
      customer,
      items,
      total: subtotal,
    });
    clearCart();
    navigate({ to: "/objednavka-prijata" });
  };

  if (loaded && items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center md:px-6">
        <h1 className="font-display text-3xl">Košík je prázdný</h1>
        <p className="mt-3 text-muted-foreground">Nejprve si vyberte záhon.</p>
        <Link
          to="/produkty"
          className="mt-8 inline-flex min-h-12 items-center rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground hover:opacity-90"
        >
          Zobrazit produkty
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
      <h1 className="font-display text-4xl md:text-5xl">Objednávka</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        Demo verze – žádná platba neproběhne a data neodcházejí nikam mimo váš prohlížeč.
      </p>

      <form onSubmit={submit} className="mt-10 grid gap-8 lg:grid-cols-[1fr_340px] lg:items-start">
        <div className="surface-card p-6">
          <h2 className="font-display text-xl">Doručovací údaje</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {fields.map((f) => (
              <label key={f.key} className={f.full ? "sm:col-span-2" : undefined}>
                <span className="mb-1 block text-sm font-medium">
                  {f.label} {f.required && <span className="text-destructive">*</span>}
                </span>
                <input
                  type={f.type ?? "text"}
                  required={f.required}
                  value={customer[f.key]}
                  onChange={(e) => setCustomer((prev) => ({ ...prev, [f.key]: e.target.value }))}
                  className="h-12 w-full rounded-xl border border-input bg-card px-4 text-base outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </label>
            ))}
            <label className="sm:col-span-2">
              <span className="mb-1 block text-sm font-medium">Poznámka</span>
              <textarea
                rows={4}
                value={customer.note}
                onChange={(e) => setCustomer((prev) => ({ ...prev, note: e.target.value }))}
                className="w-full rounded-xl border border-input bg-card px-4 py-3 text-base outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </label>
          </div>
        </div>

        <aside className="surface-card p-6 lg:sticky lg:top-24">
          <h2 className="font-display text-xl">Rekapitulace</h2>
          <ul className="mt-4 space-y-4">
            {items.map((item) => (
              <li key={item.id} className="border-b border-dashed border-border pb-3">
                <div className="flex justify-between gap-3">
                  <span className="font-medium">{item.title}</span>
                  <span className="whitespace-nowrap font-medium">{formatPrice(cartItemTotal(item))}</span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  {describeConfig(item.config, configLabels(item.config)).join(" · ")} ·{" "}
                  {item.config.quantity} ks
                </p>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex items-end justify-between">
            <span className="font-medium">Celkem</span>
            <span className="font-display text-2xl font-semibold text-primary">{formatPrice(subtotal)}</span>
          </div>
          <button
            type="submit"
            className="mt-6 flex min-h-13 w-full items-center justify-center rounded-xl bg-primary px-6 text-base font-semibold text-primary-foreground hover:opacity-90"
          >
            Odeslat objednávku (DEMO)
          </button>
        </aside>
      </form>
    </div>
  );
}
