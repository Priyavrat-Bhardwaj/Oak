import { Link } from "@tanstack/react-router";
import { ClosureMark } from "./ClosureMark";

export function SiteFooter() {
  return (
    <footer className="mt-32 bg-charcoal text-ivory">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <ClosureMark size={32} />
            <span className="font-display text-4xl tracking-[0.2em]">OAK</span>
          </div>
          <p className="mt-4 max-w-sm font-display text-2xl italic text-ivory/70">Thoughtful furniture and timeless interiors.</p>
        </div>
        <div>
          <p className="eyebrow text-ivory/50">Shop</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/shop" className="hover:text-sand">All furniture</Link></li>
            <li><Link to="/cart" className="hover:text-sand">Your cart</Link></li>
          </ul>
        </div>
        <div>
          <p className="eyebrow text-ivory/50">Studio</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/observatory" className="hover:text-sand">Gestalt Observatory</Link></li>
            <li><Link to="/journal" className="hover:text-sand">Design Journal</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-ivory/10 px-6 py-6 text-center text-xs text-ivory/50">
        © 2026 OAK — a design study. Checkout is simulated; no payments are processed.
      </div>
    </footer>
  );
}
