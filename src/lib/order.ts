import type { DemoOrder } from "@/types";

const STORAGE_KEY = "zahonky-last-order-v1";

export function generateOrderNumber() {
  const d = new Date();
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${rand}`;
}

export function saveDemoOrder(order: DemoOrder) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(order));
  } catch {
    /* noop */
  }
}

export function loadDemoOrder(): DemoOrder | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as DemoOrder) : null;
  } catch {
    return null;
  }
}
