import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { Slider } from "@/components/ui/slider";
import hero from "@/assets/hero.jpg";

export const Route = createFileRoute("/observatory")({
  head: () => ({
    meta: [
      { title: "Gestalt Observatory — OAK" },
      { name: "description", content: "Eight Gestalt principles of perception, demonstrated interactively and mapped to the OAK shopping experience." },
      { property: "og:title", content: "Gestalt Observatory — OAK" },
      { property: "og:description", content: "Eight Gestalt principles, demonstrated and mapped to OAK." },
    ],
  }),
  component: Observatory,
});

function ProximityDemo() {
  const [gap, setGap] = useState(28);
  return (
    <div className="space-y-6">
      <div className="flex justify-center" style={{ gap: `${gap}px` }}>
        {[0, 1, 2].map((g) => (
          <div key={g} className="grid grid-cols-2 gap-2">
            {[0, 1, 2, 3].map((d) => <span key={d} className="h-5 w-5 rounded-full bg-foreground" />)}
          </div>
        ))}
      </div>
      <label className="block text-xs text-muted-foreground">Group spacing
        <Slider className="mt-2" min={8} max={60} value={[gap]} onValueChange={(v) => setGap(v[0] ?? 0)} aria-label="Group spacing" />
      </label>
    </div>
  );
}

function SimilarityDemo() {
  const [on, setOn] = useState(true);
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-6 gap-3">
        {Array.from({ length: 18 }).map((_, i) => (
          <span key={i} className={`aspect-square transition-all duration-500 ${on && i % 6 >= 3 ? "rounded-sm bg-olive" : "rounded-full bg-stone"}`} />
        ))}
      </div>
      <button className="chip" data-active={on} onClick={() => setOn(!on)}>{on ? "Make all alike" : "Differentiate columns"}</button>
    </div>
  );
}

function ContinuityDemo() {
  const [t, setT] = useState(60);
  return (
    <div className="space-y-4">
      <svg viewBox="0 0 300 120" className="w-full">
        <path d="M10 100 C 90 0, 210 0, 290 100" fill="none" stroke="var(--olive)" strokeWidth="3" strokeDasharray="400" strokeDashoffset={400 - t * 4} />
        <path d="M10 20 C 90 120, 210 120, 290 20" fill="none" stroke="var(--charcoal)" strokeWidth="3" />
      </svg>
      <label className="block text-xs text-muted-foreground">Trace the curve
        <Slider className="mt-2" min={0} max={100} value={[t]} onValueChange={(v) => setT(v[0] ?? 0)} aria-label="Trace curve" />
      </label>
    </div>
  );
}

function ClosureDemo() {
  const [gap, setGap] = useState(40);
  const r = 46, c = 2 * Math.PI * r, seg = c / 4;
  return (
    <div className="space-y-4">
      <svg viewBox="0 0 120 120" className="mx-auto h-36 w-36">
        <circle cx="60" cy="60" r={r} fill="none" stroke="var(--charcoal)" strokeWidth="5" strokeLinecap="round"
          strokeDasharray={`${seg * (1 - gap / 100)} ${seg * (gap / 100)}`} className="transition-all" />
      </svg>
      <label className="block text-xs text-muted-foreground">Gap size — at what point does it stop being a circle?
        <Slider className="mt-2" min={0} max={85} value={[gap]} onValueChange={(v) => setGap(v[0] ?? 0)} aria-label="Gap size" />
      </label>
    </div>
  );
}

function FigureGroundDemo() {
  const [scrim, setScrim] = useState(true);
  return (
    <div className="space-y-4">
      <div className="relative h-40 overflow-hidden rounded-xl">
        <img src={hero} alt="" className="absolute inset-0 h-full w-full object-cover" />
        {scrim && <div className="scrim absolute inset-0" />}
        <p className={`absolute bottom-3 left-4 font-display text-3xl ${scrim ? "text-ivory" : "text-ivory/70"}`}>Rooms that breathe.</p>
      </div>
      <button className="chip" data-active={scrim} onClick={() => setScrim(!scrim)}>{scrim ? "Remove scrim" : "Add scrim"}</button>
    </div>
  );
}

function CommonRegionDemo() {
  const [on, setOn] = useState(true);
  return (
    <div className="space-y-4">
      <div className="flex justify-center gap-4">
        {[0, 1].map((g) => (
          <div key={g} className={`flex gap-3 rounded-xl p-4 transition-all duration-500 ${on ? "bg-sand" : ""}`}>
            {[0, 1, 2].map((d) => <span key={d} className="h-6 w-6 rounded-full bg-foreground" />)}
          </div>
        ))}
      </div>
      <button className="chip" data-active={on} onClick={() => setOn(!on)}>{on ? "Remove regions" : "Add regions"}</button>
    </div>
  );
}

function CommonFateDemo() {
  const [n, setN] = useState(0);
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-6 gap-3">
        {Array.from({ length: 12 }).map((_, i) => {
          const moving = i % 3 === 0;
          return <span key={moving ? `${i}-${n}` : i} className={`aspect-square rounded-full ${moving ? "bg-olive animate-rise" : "bg-stone"}`} />;
        })}
      </div>
      <button className="chip" onClick={() => setN(n + 1)}>Animate the group</button>
    </div>
  );
}

function FocalPointDemo() {
  const [i, setI] = useState(7);
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-5 gap-3">
        {Array.from({ length: 15 }).map((_, k) => (
          <button key={k} onClick={() => setI(k)} aria-label={`Focus dot ${k + 1}`}
            className={`aspect-square rounded-full transition-all duration-500 ${k === i ? "scale-110 bg-olive shadow-soft" : "bg-stone/60"}`} />
        ))}
      </div>
      <p className="text-xs text-muted-foreground">Tap any dot to move the focal point.</p>
    </div>
  );
}

type P = { n: string; name: string; what: string; where: string; why: string; demo: ReactNode };
const PRINCIPLES: P[] = [
  { n: "01", name: "Proximity", what: "Elements placed close together are perceived as a group.", where: "On every product card the name, tagline and price sit tightly beneath the image, separated from the next card by a much larger gap.", why: "Shoppers instantly know which price belongs to which piece without lines or boxes.", demo: <ProximityDemo /> },
  { n: "02", name: "Similarity", what: "Items that share shape, colour or size are read as related.", where: "All product cards, filter chips and pill buttons share one shape and type style; the dark pill is always the primary action.", why: "Once a shopper learns one card or button, they understand them all.", demo: <SimilarityDemo /> },
  { n: "03", name: "Continuity", what: "The eye follows lines and curves, preferring smooth paths.", where: "The checkout progress line fills from step to step; product grids align on a single column rhythm.", why: "A visible path reduces uncertainty about where the shopper is and what comes next.", demo: <ContinuityDemo /> },
  { n: "04", name: "Closure", what: "We mentally complete incomplete shapes.", where: "The OAK mark is a broken ring — four arcs the eye closes into a circle, echoed in the hero and order confirmation.", why: "It gives the brand a memorable, calm mark and reflects the idea that the customer completes the room.", demo: <ClosureDemo /> },
  { n: "05", name: "Figure–ground", what: "We separate a subject (figure) from its background (ground).", where: "Hero headlines sit over a gradient scrim; glass panels lift collection titles and the navigation from photography.", why: "Text stays readable over rich imagery, keeping contrast accessible.", demo: <FigureGroundDemo /> },
  { n: "06", name: "Common Region", what: "Elements inside a shared boundary are seen as a group.", where: "Shop filters, the product configuration panel, cart summary and checkout form each live in their own tinted region.", why: "Related controls are found together, so decisions feel contained and simple.", demo: <CommonRegionDemo /> },
  { n: "07", name: "Common Fate", what: "Elements moving together are perceived as a unit.", where: "When filters change, all matching product cards rise in together; adding to cart animates the badge, drawer and toast as one response.", why: "Shoppers see clearly which items were affected by their action.", demo: <CommonFateDemo /> },
  { n: "08", name: "Focal Point", what: "A distinct element draws attention first.", where: "The hero uses one oversized headline and a single light CTA; on product pages the dark Add to Cart button is the only filled action.", why: "The primary next step is obvious, reducing hesitation.", demo: <FocalPointDemo /> },
];

function Observatory() {
  return (
    <div className="mx-auto max-w-7xl px-6 pt-36">
      <p className="eyebrow text-olive">Perception, applied</p>
      <h1 className="mt-3 max-w-4xl text-6xl leading-[0.95] md:text-8xl">The Gestalt Observatory</h1>
      <p className="mt-6 max-w-2xl text-lg text-muted-foreground">Eight principles describe how people group and prioritise what they see. Each one below has a live demonstration and a note on where it works inside OAK.</p>
      <nav aria-label="Principles" className="mt-10 flex flex-wrap gap-2">
        {PRINCIPLES.map((p) => <a key={p.n} href={`#p-${p.n}`} className="chip">{p.n} {p.name}</a>)}
      </nav>
      <div className="mt-16 space-y-6">
        {PRINCIPLES.map((p) => (
          <section key={p.n} id={`p-${p.n}`} className="region grid scroll-mt-28 gap-8 p-6 md:grid-cols-[1fr_1fr] md:p-10">
            <div>
              <p className="font-display text-6xl text-oak">{p.n}</p>
              <h2 className="mt-2 text-4xl md:text-5xl">{p.name}</h2>
              <p className="mt-4 text-lg">{p.what}</p>
              <dl className="mt-6 space-y-4 text-sm">
                <div><dt className="eyebrow text-olive">Where it appears in OAK</dt><dd className="mt-1 text-muted-foreground">{p.where}</dd></div>
                <div><dt className="eyebrow text-olive">How it improves usability</dt><dd className="mt-1 text-muted-foreground">{p.why}</dd></div>
              </dl>
            </div>
            <div className="flex flex-col justify-center rounded-xl bg-background p-6">{p.demo}</div>
          </section>
        ))}
      </div>
      <div className="mt-16 text-center">
        <Link to="/shop" className="btn btn-primary">See them at work in the shop</Link>
      </div>
    </div>
  );
}
