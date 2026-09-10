// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Pro GitHub Pages se build spouští s BASE_PATH="/nazev-repozitare/".
// Lokálně i v Lovable náhledu zůstává "/" – nic se tím nemění.
const base = process.env["BASE_PATH"] ?? "/";

export default defineConfig({
  vite: { base },
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
    // Celý web je čistě klientský (žádné serverové funkce), takže se všechny
    // stránky předgenerují do statického HTML.
    pages: [
      { path: "/" },
      { path: "/produkty" },
      { path: "/produkty/borovice-28" },
      { path: "/produkty/borovice-45" },
      { path: "/produkty/modrin-28" },
      { path: "/produkty/modrin-45" },
      { path: "/zahon-na-miru" },
      { path: "/kosik" },
      { path: "/objednavka" },
      { path: "/objednavka-prijata" },
      { path: "/o-nas" },
      { path: "/kontakt" },
      { path: "/admin" },
    ],
    prerender: { enabled: true, autoStaticPathsDiscovery: false },
  },
});
