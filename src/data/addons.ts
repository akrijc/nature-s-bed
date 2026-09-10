import type { Addon } from "@/types";

export const addons: Addon[] = [
  {
    id: "vrchni-lista",
    name: "Vrchní lišta",
    description:
      "Hoblovaná lišta po celém obvodu záhonu. Chrání horní hranu prken a slouží jako pohodlné odkládací místo. Cena se počítá podle obvodu záhonu.",
  },
  {
    id: "vnitrni-folie",
    name: "Vnitřní fólie",
    description:
      "Netkaná ochranná fólie na stěny i dno. Odděluje zeminu od dřeva a prodlužuje životnost.",
  },
  {
    id: "vnitrni-opaleni",
    name: "Vnitřní opálení",
    description:
      "Tradiční opálení vnitřních stěn plamenem. Přírodní ochrana bez příplatku – cena záhonu se nemění.",
  },
];
