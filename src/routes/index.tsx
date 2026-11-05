import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import hero from "@/assets/hero.jpg";
import bedroom from "@/assets/room-bedroom.jpg";
import sideboard from "@/assets/p-sideboard.jpg";
import { PRODUCTS } from "@/lib/products";
import { ProductCard } from "@/components/oak/ProductCard";
import { ClosureMark } from "@/components/oak/ClosureMark";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "OAK — Thoughtful furniture and timeless interiors" },
      { name: "description", content: "Solid-oak furniture, sculpted seating and calm lighting for rooms that age beautifully." },
      { property: "og:title", content: "OAK — Thoughtful furniture and timeless interiors" },
      { property: "og:description", content: "Solid-oak furniture, sculpted seating and calm lighting for rooms that age beautifully." },
    ],
  }),
  component: Home,
});

const COLLECTIONS = [
  { title: "The Living Room", copy: "Low, generous pieces for slow evenings.", img: hero, category: "Seating" },
  { title: "The Quiet Bedroom", copy: "Linen, oak and soft morning light.", img: bedroom, category: "Lighting" },
  { title: "Storage & Surfaces", copy: "Fluted oak that catches the day.", img: sideboard, category: "Storage" },
] as const;

function Home() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const on = () => setY(window.scrollY);
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  const featured = PRODUCTS.filter((p) => p.featured);

  return (
    <>
      {/* Figure–ground + focal point */}
      <section className="relative h-[100svh] min-h-[640px] overflow-hidden bg-charcoal">
        <img src={hero} alt="Sunlit living room with oak lounge chair and ivory curved sofa" width={1920} height={1088}
          className="animate-reveal absolute inset-0 h-full w-full object-cover" style={{ transform: `translateY(${y * 0.25}px) scale(1.05)` }} />
        <div className="scrim absolute inset-0" />
        <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-16 text-ivory md:pb-24">
          <p className="eyebrow animate-rise" style={{ animationDelay: "300ms" }}>Autumn Collection · 2026</p>
          <h1 className="animate-rise mt-4 max-w-4xl text-6xl leading-[0.95] md:text-8xl lg:text-[8.5rem]" style={{ animationDelay: "450ms" }}>
            Rooms that <em className="italic text-sand">breathe.</em>
          </h1>
          <div className="animate-rise mt-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between" style={{ animationDelay: "650ms" }}>
            <p className="max-w-md text-base text-ivory/80 md:text-lg">Solid oak, honest linen and sculpted forms — furniture designed to be lived with for decades.</p>
            <div className="flex gap-3">
              <Link to="/shop" className="btn btn-light group">Shop the collection <ArrowRight size={16} className="transition group-hover:translate-x-1" /></Link>
            </div>
          </div>
        </div>
        <ClosureMark size={180} className="pointer-events-none absolute -right-10 top-24 text-ivory/15 md:right-10" />
      </section>

      <section className="mx-auto max-w-7xl px-6 pt-28">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="eyebrow text-olive">Collections</p>
            <h2 className="mt-3 text-5xl md:text-6xl">Curated by room</h2>
          </div>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {COLLECTIONS.map((c, i) => (
            <Link key={c.title} to="/shop" search={{ category: c.category }}
              className={`group animate-rise relative overflow-hidden rounded-2xl ${i === 0 ? "md:row-span-2 aspect-[3/4] md:aspect-auto" : "aspect-[4/3]"}`}
              style={{ animationDelay: `${i * 120}ms` }}>
              <img src={c.img} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover transition duration-[1.4s] group-hover:scale-105" />
              <div className="scrim absolute inset-0" />
              <div className="glass absolute inset-x-4 bottom-4 rounded-xl p-5 text-foreground">
                <h3 className="text-2xl">{c.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{c.copy}</p>
              </div>
            </Link>
          ))}
          <div className="region flex flex-col justify-between p-8 md:col-span-2">
            <ClosureMark size={44} className="text-olive" />
            <p className="mt-8 font-display text-3xl leading-snug md:text-4xl">
              “We design the outline. <em className="text-olive">You complete the room.</em>”
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pt-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow text-olive">Curated pieces</p>
            <h2 className="mt-3 text-5xl md:text-6xl">The essentials</h2>
          </div>
          <Link to="/shop" className="eyebrow inline-flex items-center gap-2 border-b border-foreground pb-1">View all <ArrowRight size={14} /></Link>
        </div>
        <div className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p, i) => <ProductCard key={p.slug} product={p} index={i} />)}
        </div>
      </section>

      <section className="mx-auto mt-28 max-w-7xl px-6">
        <div className="grid overflow-hidden rounded-3xl bg-olive text-ivory md:grid-cols-2">
          <div className="p-10 md:p-16">
            <p className="eyebrow text-ivory/60">Behind the interface</p>
            <h2 className="mt-4 text-5xl">The Gestalt Observatory</h2>
            <p className="mt-4 max-w-md text-ivory/80">Eight principles of perception, explained and demonstrated — and shown at work across every page of OAK.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/observatory" className="btn btn-light">Enter the Observatory</Link>
              <Link to="/journal" className="btn btn-ghost">Read the journal</Link>
            </div>
          </div>
          <div className="relative min-h-72">
            <img src={bedroom} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
          </div>
        </div>
      </section>
    </>
  );
}
