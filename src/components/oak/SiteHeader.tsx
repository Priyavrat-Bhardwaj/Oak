import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, ShoppingBag, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useStore } from "@/lib/store";
import { ClosureMark } from "./ClosureMark";

const NAV = [
  { to: "/shop", label: "Shop" },
  { to: "/observatory", label: "Gestalt Observatory" },
  { to: "/journal", label: "Design Journal" },
] as const;

export function SiteHeader() {
  const { count, setDrawerOpen, bump } = useStore();
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const overHero = path === "/" && !scrolled;

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => setOpen(false), [path]);

  return (
    <header className="fixed inset-x-0 top-0 z-40 px-3 pt-3 md:px-6 md:pt-4">
      <nav
        className={`mx-auto flex max-w-7xl items-center justify-between rounded-full px-5 py-3 transition-all duration-500 ${
          overHero ? "text-ivory" : "glass text-foreground shadow-soft"
        }`}
        aria-label="Main"
      >
        <Link to="/" className="flex items-center gap-2" aria-label="OAK home">
          <ClosureMark size={24} />
          <span className="font-display text-2xl tracking-[0.2em]">OAK</span>
        </Link>
        <ul className="hidden items-center gap-8 md:flex">
          {NAV.map((n) => (
            <li key={n.to}>
              <Link
                to={n.to}
                className="eyebrow relative opacity-80 transition hover:opacity-100 after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-current after:transition-all hover:after:w-full"
                activeProps={{ className: "opacity-100 after:w-full" }}
              >
                {n.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setDrawerOpen(true)}
            className="relative flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-foreground/10"
            aria-label={`Open cart, ${count} items`}
          >
            <ShoppingBag size={19} />
            {count > 0 && (
              <span key={bump} className="animate-pop absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-bold text-accent-foreground">
                {count}
              </span>
            )}
          </button>
          <button className="flex h-10 w-10 items-center justify-center md:hidden" onClick={() => setOpen(!open)} aria-label="Menu" aria-expanded={open}>
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>
      {open && (
        <div className="glass animate-rise mx-auto mt-2 max-w-7xl rounded-3xl p-6 text-foreground md:hidden">
          {NAV.map((n) => (
            <Link key={n.to} to={n.to} className="block py-3 font-display text-2xl">
              {n.label}
            </Link>
          ))}
          <Link to="/cart" className="block py-3 font-display text-2xl">Cart ({count})</Link>
        </div>
      )}
    </header>
  );
}
