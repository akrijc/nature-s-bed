# Záhonky od Danušky – demo e-shop

Demo e-shopu s dřevěnými vyvýšenými záhony. Čistý frontend (React + TypeScript + Vite +
Tailwind CSS), bez serverové logiky – košík i demo administrace běží v prohlížeči
(localStorage).

## Struktura projektu

```
src/
  assets/        dočasné obrázky (placeholdery), snadno nahraditelné
  components/    UI komponenty (hlavička, patička, karta produktu, konfigurátor)
  data/          VŠECHNA DEMO DATA – ceny, materiály, rozměry, nátěry, doplňky, produkty
  lib/           logika: výpočet ceny, košík, objednávka, nastavení ceníku
  routes/        stránky (file-based routing)
  types/         sdílené typy (Product, Material, Dimension, CartItem, …)
```

### Kde měnit ceny a parametry

| Co                         | Soubor                    |
| -------------------------- | ------------------------- |
| Ceník (vše v Kč)           | `src/data/pricing.ts`     |
| Materiály a tloušťky       | `src/data/materials.ts`   |
| Přednastavené rozměry      | `src/data/dimensions.ts`  |
| Kvality nátěru a odstíny   | `src/data/paints.ts`      |
| Doplňky                    | `src/data/addons.ts`      |
| Produkty v katalogu        | `src/data/products.ts`    |
| Vzorec výpočtu ceny        | `src/lib/pricing.ts` → `calculateProductPrice()` |

V prohlížeči lze demo ceny upravit i na `/admin` (ukládá se do localStorage).

### Cenový model (demo)

```
plocha stěn = 2 × (délka + šířka) × výška
cena = základ
     + plocha stěn × cena dřeva (materiál + tloušťka)
     + plocha stěn × cena nátěru (kvalita)
     + obvod × cena lišty za bm        (jen při zvolené vrchní liště)
     + (plocha stěn + dno) × cena fólie (jen při vnitřní fólii)
vnitřní opálení cenu nemění
celkem = cena za kus × počet kusů
```

## Spuštění

```bash
npm install
npm run dev
npm run build
```

## Další vývoj

Architektura je připravená na napojení databáze, skutečné administrace s přihlášením,
reálných objednávek, e-mailů, platební brány, dopravy a fakturace – stačí nahradit
`src/data` a `src/lib` implementacemi volajícími API.
