import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/journal")({
  head: () => ({
    meta: [
      { title: "Design Journal — OAK" },
      { name: "description", content: "The problem, audience, needs, direction, ideation and testing plan behind the OAK furniture store." },
      { property: "og:title", content: "Design Journal — OAK" },
      { property: "og:description", content: "How and why OAK was designed." },
    ],
  }),
  component: Journal,
});

const ENTRIES: { title: string; body: string[] }[] = [
  { title: "Problem statement", body: [
    "Premium furniture is a considered, high-value purchase, yet many online stores bury products under promotions, dense grids and unclear checkout steps.",
    "OAK aims to make browsing feel as calm as the rooms it sells, while keeping every shopping task — finding, configuring, buying — fast and obvious.",
  ] },
  { title: "Target audience", body: [
    "Design-conscious adults furnishing a home for the long term: people who compare materials, value craft and expect to read dimensions before committing.",
    "They browse on mobile during spare moments and often finish purchases on a larger screen.",
  ] },
  { title: "User needs", body: [
    "See products large and in context, not just on white backgrounds.",
    "Narrow the collection quickly by room or category, and search by name.",
    "Understand material options and their price impact before adding to cart.",
    "Edit the cart without losing their place, and know exactly how many steps checkout has.",
  ] },
  { title: "Design direction", body: [
    "Editorial luxury meets modern minimalism: an ivory, sand, oak, olive, stone and charcoal palette; Cormorant Garamond headlines over a Manrope interface.",
    "Subtle glass panels separate text from photography. A broken-ring mark expresses closure and recurs through the site.",
    "Motion is purposeful — staggered entrances, coordinated filter transitions and linked cart feedback — and is switched off for reduced-motion users.",
  ] },
  { title: "Wireframes & ideation", body: [
    "Early layouts compared a dense four-column shop against a three-column grid with larger images; the larger images won for this audience, with filters gathered in one bar above the grid.",
    "The product page places the gallery left and a single configuration panel right, so the material, quantity and Add to Cart sit in one region.",
    "Checkout was split into three short steps joined by a progress line rather than one long form.",
  ] },
  { title: "Testing & iteration", body: [
    "No formal user testing has been run on this version, so no findings are reported here.",
    "Planned next: five moderated task-based sessions (find a sofa under ₹70,000, change its material, complete checkout), measuring task success, time on task and points of hesitation, followed by an iteration round on the issues observed.",
  ] },
];

function Journal() {
  return (
    <div className="mx-auto max-w-4xl px-6 pt-36">
      <p className="eyebrow text-olive">Process</p>
      <h1 className="mt-3 text-6xl md:text-8xl">Design Journal</h1>
      <ol className="relative mt-16 space-y-14 border-l border-border pl-8 md:pl-12">
        {ENTRIES.map((e, i) => (
          <li key={e.title} className="relative">
            <span className="absolute -left-[calc(2rem+7px)] top-3 h-3.5 w-3.5 rounded-full border-2 border-olive bg-background md:-left-[calc(3rem+7px)]" />
            <p className="eyebrow text-muted-foreground">Chapter {String(i + 1).padStart(2, "0")}</p>
            <h2 className="mt-2 text-4xl">{e.title}</h2>
            <div className="mt-4 space-y-3 leading-relaxed text-muted-foreground">
              {e.body.map((b) => <p key={b}>{b}</p>)}
            </div>
          </li>
        ))}
      </ol>
      <div className="mt-16 flex flex-wrap gap-3">
        <Link to="/observatory" className="btn btn-primary">Gestalt Observatory</Link>
        <Link to="/shop" className="btn btn-ghost">Shop</Link>
      </div>
    </div>
  );
}
