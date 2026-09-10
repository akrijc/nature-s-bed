import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { loadDemoOrder } from "@/lib/order";
import { describeConfig, cartItemTotal } from "@/lib/cart";
import { configLabels } from "@/routes/kosik";
import { formatPrice } from "@/lib/pricing";
import type { DemoOrder } from "@/types";

export const Route = createFileRoute("/objednavka-prijata")({
  head: () => ({
    meta: [
      { title: "Objednávka přijata – DEMO | Záhonky od Danušky" },
      { name: "description", content: "Potvrzení simulované objednávky vyvýšeného záhonu." },
      { property: "og:title", content: "Objednávka přijata – DEMO" },
      { property: "og:description", content: "Potvrzení simulované objednávky." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: OrderDonePage,
});

function OrderDonePage() {
  const [order, setOrder] = useState<DemoOrder | null>(null);

  useEffect(() => {
    setOrder(loadDemoOrder());
  }, []);

  return (
    <div className="mx-auto max-w-3xl px-4 py-14 md:px-6 md:py-20">
      <div className="text-center">
        <CheckCircle2 className="mx-auto size-14 text-primary" />
        <h1 className="mt-5 font-display text-4xl">Objednávka přijata – DEMO</h1>
        <p className="mt-3 text-muted-foreground">
          Toto je ukázková objednávka. Žádná platba neproběhla a nic jsme neodeslali.
        </p>
      </div>

      {order ? (
        <div className="surface-card mt-10 p-6 md:p-8">
          <div className="flex flex-wrap justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-wide text-muted-foreground">Číslo objednávky</span>
              <p className="font-display text-2xl">{order.number}</p>
            </div>
            <div className="text-right">
              <span className="text-xs uppercase tracking-wide text-muted-foreground">Datum</span>
              <p>{new Date(order.createdAt).toLocaleString("cs-CZ")}</p>
            </div>
          </div>

          <h2 className="mt-8 font-display text-xl">Zákazník</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {order.customer.firstName} {order.customer.lastName}
            <br />
            {order.customer.street}, {order.customer.zip} {order.customer.city}
            <br />
            {order.customer.email} · {order.customer.phone}
            {order.customer.note && (
              <>
                <br />
                Poznámka: {order.customer.note}
              </>
            )}
          </p>

          <h2 className="mt-8 font-display text-xl">Položky</h2>
          <ul className="mt-3 space-y-4">
            {order.items.map((item) => (
              <li key={item.id} className="border-b border-dashed border-border pb-3">
                <div className="flex justify-between gap-3">
                  <span className="font-medium">{item.title}</span>
                  <span className="whitespace-nowrap font-medium">{formatPrice(cartItemTotal(item))}</span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {describeConfig(item.config, configLabels(item.config)).join(" · ")} ·{" "}
                  {item.config.quantity} ks
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-5 flex items-end justify-between">
            <span className="font-medium">Celkem</span>
            <span className="font-display text-2xl font-semibold text-primary">
              {formatPrice(order.total)}
            </span>
          </div>
        </div>
      ) : (
        <p className="mt-10 text-center text-muted-foreground">Žádná demo objednávka k zobrazení.</p>
      )}

      <div className="mt-10 text-center">
        <Link
          to="/"
          className="inline-flex min-h-12 items-center rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground hover:opacity-90"
        >
          Zpět na úvodní stránku
        </Link>
      </div>
    </div>
  );
}
