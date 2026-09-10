import { useMemo, useState } from "react";
import { Check, Minus, Plus, ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import { materials, thicknesses } from "@/data/materials";
import { customLimits, dimensions, formatDimension } from "@/data/dimensions";
import { getColorsForQuality, getPaintColor, getPaintQuality, paintQualities } from "@/data/paints";
import { calculateProductPrice, formatPrice } from "@/lib/pricing";
import { usePricing } from "@/lib/settings";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/utils";
import type { ProductConfiguration, Thickness } from "@/types";

interface ConfiguratorProps {
  mode: "preset" | "custom";
  initialConfig: ProductConfiguration;
  title: string;
  lockMaterial?: boolean;
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between gap-3">
        <h3 className="text-sm font-semibold uppercase tracking-wide">{label}</h3>
        {hint && <span className="text-xs text-muted-foreground">{hint}</span>}
      </div>
      {children}
    </div>
  );
}

function OptionButton({
  active,
  onClick,
  children,
  className,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "min-h-12 rounded-xl border px-4 py-3 text-left text-sm transition-all",
        active
          ? "border-primary bg-primary/8 ring-2 ring-primary/25"
          : "border-border bg-card hover:border-primary/40",
        className,
      )}
    >
      {children}
    </button>
  );
}

export function Configurator({ mode, initialConfig, title, lockMaterial }: ConfiguratorProps) {
  const [config, setConfig] = useState<ProductConfiguration>(initialConfig);
  const { pricing } = usePricing();
  const { addItem } = useCart();

  const set = <K extends keyof ProductConfiguration>(key: K, value: ProductConfiguration[K]) =>
    setConfig((prev) => ({ ...prev, [key]: value }));

  const colors = useMemo(() => getColorsForQuality(config.paintQualityId), [config.paintQualityId]);
  const price = useMemo(() => calculateProductPrice(config, pricing), [config, pricing]);

  const material = materials.find((m) => m.id === config.materialId)!;
  const quality = getPaintQuality(config.paintQualityId);
  const color = getPaintColor(config.paintColorId) ?? colors[0];

  const selectQuality = (qualityId: string) => {
    const first = getColorsForQuality(qualityId)[0];
    setConfig((prev) => ({ ...prev, paintQualityId: qualityId, paintColorId: first.id }));
  };

  const setNumber = (key: "length" | "width" | "height", raw: string) => {
    const num = Number(raw.replace(/[^\d]/g, ""));
    set(key, Number.isFinite(num) ? num : 0);
  };

  const clampDim = (key: "length" | "width" | "height") => {
    const limit = customLimits[key];
    set(key, Math.min(limit.max, Math.max(limit.min, config[key] || limit.min)));
  };

  const addToCart = () => {
    addItem({
      title,
      config,
      unitPrice: price.unitPrice,
    });
    toast.success("Přidáno do košíku", {
      description: `${title} – ${formatDimension(config.length, config.width, config.height)}`,
    });
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_360px] lg:items-start">
      <div className="space-y-8">
        <Field label="Materiál">
          <div className="grid gap-3 sm:grid-cols-2">
            {materials.map((m) => (
              <OptionButton
                key={m.id}
                active={config.materialId === m.id}
                onClick={() => !lockMaterial && set("materialId", m.id)}
                className={lockMaterial && config.materialId !== m.id ? "opacity-40" : undefined}
              >
                <span className="block font-medium">{m.name}</span>
                <span className="mt-1 block text-xs text-muted-foreground">{m.shortName} – přírodní materiál</span>
              </OptionButton>
            ))}
          </div>
        </Field>

        <Field label="Tloušťka">
          <div className="grid gap-3 sm:grid-cols-2">
            {thicknesses.map((t) => (
              <OptionButton
                key={t.value}
                active={config.thickness === t.value}
                onClick={() => set("thickness", t.value as Thickness)}
              >
                <span className="block font-medium">{t.label}</span>
                <span className="mt-1 block text-xs text-muted-foreground">{t.note}</span>
              </OptionButton>
            ))}
          </div>
        </Field>

        {mode === "preset" ? (
          <Field label="Rozměr" hint="délka × šířka × výška">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {dimensions.map((d) => (
                <OptionButton
                  key={d.id}
                  active={config.length === d.length && config.width === d.width && config.height === d.height}
                  onClick={() =>
                    setConfig((prev) => ({ ...prev, length: d.length, width: d.width, height: d.height }))
                  }
                >
                  <span className="block font-medium">{formatDimension(d.length, d.width, d.height)}</span>
                </OptionButton>
              ))}
            </div>
          </Field>
        ) : (
          <Field label="Vlastní rozměr" hint="v centimetrech">
            <div className="grid gap-3 sm:grid-cols-3">
              {(["length", "width", "height"] as const).map((key) => (
                <label key={key} className="block">
                  <span className="mb-1 block text-xs text-muted-foreground">
                    {key === "length" ? "Délka" : key === "width" ? "Šířka" : "Výška"} (
                    {customLimits[key].min}–{customLimits[key].max} cm)
                  </span>
                  <input
                    type="number"
                    inputMode="numeric"
                    value={config[key] || ""}
                    min={customLimits[key].min}
                    max={customLimits[key].max}
                    step={customLimits[key].step}
                    onChange={(e) => setNumber(key, e.target.value)}
                    onBlur={() => clampDim(key)}
                    className="h-12 w-full rounded-xl border border-input bg-card px-4 text-base outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </label>
              ))}
            </div>
          </Field>
        )}

        <Field label="Kvalita nátěru">
          <div className="grid gap-3 sm:grid-cols-3">
            {paintQualities.map((q) => (
              <OptionButton key={q.id} active={config.paintQualityId === q.id} onClick={() => selectQuality(q.id)}>
                <span className="block font-medium">{q.name}</span>
                <span className="mt-1 block text-xs text-muted-foreground">{q.warranty}</span>
              </OptionButton>
            ))}
          </div>
          <p className="mt-2 text-sm text-muted-foreground">{quality.description}</p>
        </Field>

        <Field label="Odstín nátěru" hint={color?.name}>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
            {colors.map((c) => {
              const active = config.paintColorId === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => set("paintColorId", c.id)}
                  className={cn(
                    "group flex flex-col items-center gap-2 rounded-xl border p-2 transition-all",
                    active ? "border-primary ring-2 ring-primary/25" : "border-border hover:border-primary/40",
                  )}
                >
                  <span
                    className="relative flex h-12 w-full items-center justify-center rounded-lg"
                    style={{ backgroundColor: c.hex }}
                  >
                    {active && <Check className="size-5 text-white drop-shadow" />}
                  </span>
                  <span className="text-xs font-medium">{c.name}</span>
                </button>
              );
            })}
          </div>
        </Field>

        <Field label="Vrchní lišta">
          <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-border bg-card p-4">
            <input
              type="checkbox"
              checked={config.topRail}
              onChange={(e) => set("topRail", e.target.checked)}
              className="mt-1 size-5 accent-[oklch(0.42_0.077_148)]"
            />
            <span>
              <span className="block font-medium">Přidat vrchní lištu</span>
              <span className="mt-1 block text-sm text-muted-foreground">
                Cena se počítá podle obvodu záhonu ({(2 * (config.length + config.width)) / 100} m ×{" "}
                {formatPrice(pricing.topRailPricePerM)}/m).
              </span>
            </span>
          </label>
        </Field>

        <Field label="Vnitřní úprava">
          <div className="grid gap-3 sm:grid-cols-2">
            <OptionButton active={config.interior === "folie"} onClick={() => set("interior", "folie")}>
              <span className="block font-medium">Vnitřní fólie</span>
              <span className="mt-1 block text-xs text-muted-foreground">Ochrana dřeva před zeminou</span>
            </OptionButton>
            <OptionButton active={config.interior === "opaleni"} onClick={() => set("interior", "opaleni")}>
              <span className="block font-medium">Vnitřní opálení</span>
              <span className="mt-1 block text-xs text-muted-foreground">Bez příplatku</span>
            </OptionButton>
          </div>
        </Field>

        <Field label="Počet kusů">
          <div className="inline-flex items-center gap-2 rounded-xl border border-border bg-card p-1">
            <button
              type="button"
              aria-label="Ubrat"
              onClick={() => set("quantity", Math.max(1, config.quantity - 1))}
              className="flex size-11 items-center justify-center rounded-lg hover:bg-secondary"
            >
              <Minus className="size-4" />
            </button>
            <span className="w-10 text-center text-lg font-semibold">{config.quantity}</span>
            <button
              type="button"
              aria-label="Přidat"
              onClick={() => set("quantity", Math.min(50, config.quantity + 1))}
              className="flex size-11 items-center justify-center rounded-lg hover:bg-secondary"
            >
              <Plus className="size-4" />
            </button>
          </div>
        </Field>
      </div>

      {/* Souhrn konfigurace + cena */}
      <aside className="surface-card sticky bottom-0 z-30 p-5 lg:top-24">
        <h3 className="font-display text-lg">Přehled konfigurace</h3>
        <dl className="mt-4 space-y-2 text-sm">
          {[
            ["Materiál", material.name],
            ["Tloušťka", `${config.thickness} mm`],
            ["Rozměr", formatDimension(config.length, config.width, config.height)],
            ["Nátěr", quality.name],
            ["Odstín", color?.name ?? "—"],
            ["Vrchní lišta", config.topRail ? "Ano" : "Ne"],
            ["Vnitřní úprava", config.interior === "folie" ? "Fólie" : "Opálení"],
            ["Počet kusů", `${config.quantity} ks`],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between gap-4 border-b border-dashed border-border pb-2">
              <dt className="text-muted-foreground">{k}</dt>
              <dd className="text-right font-medium">{v}</dd>
            </div>
          ))}
        </dl>

        <details className="mt-4 text-sm">
          <summary className="cursor-pointer text-muted-foreground">Rozpad ceny za kus</summary>
          <ul className="mt-2 space-y-1">
            {price.breakdown.map((b) => (
              <li key={b.label} className="flex justify-between">
                <span className="text-muted-foreground">{b.label}</span>
                <span>{formatPrice(b.price)}</span>
              </li>
            ))}
            <li className="flex justify-between border-t border-border pt-1 font-medium">
              <span>Cena za kus</span>
              <span>{formatPrice(price.unitPrice)}</span>
            </li>
          </ul>
        </details>

        <div className="mt-5 rounded-xl bg-primary/8 p-4">
          <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Celková cena
          </span>
          <div className="font-display text-3xl font-semibold text-primary">
            {formatPrice(price.totalPrice)}
          </div>
          <span className="text-xs text-muted-foreground">včetně DPH · demo ceník</span>
        </div>

        <button
          type="button"
          onClick={addToCart}
          className="mt-4 flex min-h-13 w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 text-base font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
          <ShoppingCart className="size-5" /> Přidat do košíku
        </button>
      </aside>
    </div>
  );
}
