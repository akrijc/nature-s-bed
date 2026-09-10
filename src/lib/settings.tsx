import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { defaultPricing, type PricingConfig } from "@/data/pricing";

const STORAGE_KEY = "zahonky-pricing-v1";

interface SettingsContextValue {
  pricing: PricingConfig;
  savePricing: (next: PricingConfig) => void;
  resetPricing: () => void;
  loaded: boolean;
}

const SettingsContext = createContext<SettingsContextValue | null>(null);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [pricing, setPricing] = useState<PricingConfig>(defaultPricing);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setPricing({ ...defaultPricing, ...(JSON.parse(raw) as PricingConfig) });
    } catch {
      /* demo – ignorujeme poškozená data */
    }
    setLoaded(true);
  }, []);

  const savePricing = useCallback((next: PricingConfig) => {
    setPricing(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* noop */
    }
  }, []);

  const resetPricing = useCallback(() => {
    setPricing(defaultPricing);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* noop */
    }
  }, []);

  return (
    <SettingsContext.Provider value={{ pricing, savePricing, resetPricing, loaded }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function usePricing() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("usePricing musí být uvnitř SettingsProvider");
  return ctx;
}
