import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-border bg-secondary/60">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-3 md:px-6">
        <div>
          <h3 className="font-display text-xl">Záhonky od Danušky</h3>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            Ručně vyráběné dřevěné vyvýšené záhony ze severské borovice a modřínu. Vyrábíme
            v České republice, na míru vaší zahradě.
          </p>
          <p className="mt-4 text-xs text-muted-foreground">
            Demo verze e-shopu – ceny i údaje jsou ukázkové.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide">Odkazy</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/produkty" className="hover:text-foreground">
                Produkty
              </Link>
            </li>
            <li>
              <Link to="/zahon-na-miru" className="hover:text-foreground">
                Záhon na míru
              </Link>
            </li>
            <li>
              <Link to="/o-nas" className="hover:text-foreground">
                O nás
              </Link>
            </li>
            <li>
              <Link to="/kontakt" className="hover:text-foreground">
                Kontakt
              </Link>
            </li>
            <li>
              <Link to="/admin" className="hover:text-foreground">
                Demo administrace
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide">Kontakt</h4>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <Phone className="size-4 text-primary" /> +420 777 123 456
            </li>
            <li className="flex items-center gap-2">
              <Mail className="size-4 text-primary" /> info@zahonky-danuska.cz
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 size-4 text-primary" /> Truhlářská 12, 588 56 Telč
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Záhonky od Danušky · Ukázkový projekt
      </div>
    </footer>
  );
}
