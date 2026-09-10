import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { usePricing } from "@/lib/settings";
import { defaultPricing, type PricingConfig } from "@/data/pricing";
import { materials } from "@/data/materials";
import { paintQualities } from "@/data/paints";
import { formatPrice } from "@/lib/pricing";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Demo administrace ceníku | Záhonky od Danušky" },
      { name: "description", content: "Jednoduchá demo administrace pro úpravu ukázkových cen." },
      { property: "og:title", content: "Demo administrace ceníku" },
      { property: "og:description", content: "Úprava ukázkových cen v prohlížeči." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPage,
});

function NumberRow({
  label,
  value,
  onChange,
  suffix,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  suffix: string;
}) {
  return (
    <label className="flex flex-wrap items-center justify-between gap-3 border-b border-dashed border-border py-3">
      <span className="text-sm">{label}</span>
      <span className="flex items-center gap-2">
        <input
          type="number"
          value={value}
          min={0}
          onChange={(e) => onChange(Number(e.target.value))}
          className="h-11 w-32 rounded-xl border border-input bg-card px-3 text-right outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
        <span className="w-16 text-xs text-muted-foreground">{suffix}</span>
      </span>
    </label>
  );
}

function AdminPage() {
  const { pricing, savePricing, resetPricing, loaded } = usePricing();
  const [draft, setDraft] = useState<PricingConfig>(pricing);

  useEffect(() => {
    if (loaded) setDraft(pricing);
  }, [loaded, pricing]);

  const setMaterial = (materialId: string, thickness: 28 | 45, value: number) =>
    setDraft((prev) => ({
      ...prev,
      materialPricePerM2: {
        ...prev.materialPricePerM2,
        [materialId]: { ...prev.materialPricePerM2[materialId], [thickness]: value },
      },
    }));

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 md:px-6 md:py-16">
      <h1 className="font-display text-4xl">Demo administrace</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        Změny se ukládají pouze do tohoto prohlížeče (localStorage). Slouží jako příprava pro
        budoucí skutečnou administraci s databází a přihlášením.
      </p>

      <section className="surface-card mt-8 p-6">
        <h2 className="font-display text-xl">Základní ceny</h2>
        <NumberRow
          label="Základ konstrukce"
          suffix="Kč / ks"
          value={draft.basePrice}
          onChange={(v) => setDraft((p) => ({ ...p, basePrice: v }))}
        />
        <NumberRow
          label="Vrchní lišta"
          suffix="Kč / bm"
          value={draft.topRailPricePerM}
          onChange={(v) => setDraft((p) => ({ ...p, topRailPricePerM: v }))}
        />
        <NumberRow
          label="Vnitřní fólie"
          suffix="Kč / m²"
          value={draft.linerPricePerM2}
          onChange={(v) => setDraft((p) => ({ ...p, linerPricePerM2: v }))}
        />
        <NumberRow
          label="Vnitřní opálení (musí zůstat 0)"
          suffix="Kč"
          value={draft.burnPrice}
          onChange={(v) => setDraft((p) => ({ ...p, burnPrice: v }))}
        />
      </section>

      <section className="surface-card mt-6 p-6">
        <h2 className="font-display text-xl">Dřevo (cena za m² stěny)</h2>
        {materials.map((m) =>
          m.thicknesses.map((t) => (
            <NumberRow
              key={`${m.id}-${t}`}
              label={`${m.name} – ${t} mm`}
              suffix="Kč / m²"
              value={draft.materialPricePerM2[m.id]?.[t] ?? 0}
              onChange={(v) => setMaterial(m.id, t, v)}
            />
          )),
        )}
      </section>

      <section className="surface-card mt-6 p-6">
        <h2 className="font-display text-xl">Nátěry (cena za m²)</h2>
        {paintQualities.map((q) => (
          <NumberRow
            key={q.id}
            label={q.name}
            suffix="Kč / m²"
            value={draft.paintPricePerM2[q.id] ?? 0}
            onChange={(v) =>
              setDraft((p) => ({ ...p, paintPricePerM2: { ...p.paintPricePerM2, [q.id]: v } }))
            }
          />
        ))}
      </section>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={() => {
            savePricing(draft);
            toast.success("Ceník uložen");
          }}
          className="flex min-h-13 flex-1 items-center justify-center rounded-xl bg-primary px-6 text-base font-semibold text-primary-foreground hover:opacity-90"
        >
          Uložit ceník
        </button>
        <button
          type="button"
          onClick={() => {
            resetPricing();
            setDraft(defaultPricing);
            toast.success("Obnoveny výchozí ceny");
          }}
          className="flex min-h-13 flex-1 items-center justify-center rounded-xl border border-border px-6 text-base font-medium hover:bg-secondary"
        >
          Obnovit výchozí
        </button>
      </div>

      <p className="mt-6 text-xs text-muted-foreground">
        Ukázka výpočtu: základ {formatPrice(draft.basePrice)} + dřevo × plocha stěn + nátěr × plocha
        stěn (+ lišta × obvod, + fólie × plocha).
      </p>
    </div>
  );
}
