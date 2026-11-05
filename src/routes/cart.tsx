import { createFileRoute, Link } from "@tanstack/react-router";
import { useStore } from "@/lib/store";
import { FREE_SHIPPING_THRESHOLD, shipping, subtotal } from "@/lib/cart-logic";
import { formatPrice } from "@/lib/products";
import { QtyControl } from "@/components/oak/QtyControl";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your cart — OAK" },
      { name: "description", content: "Review the OAK pieces in your cart before checkout." },
      { property: "og:title", content: "Your cart — OAK" },
      { property: "og:description", content: "Review the OAK pieces in your cart." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { lines, update, remove } = useStore();
  const sub = subtotal(lines);
  const ship = shipping(lines);

  return (
    <div className="mx-auto max-w-6xl px-6 pt-36">
      <h1 className="text-6xl">Your cart</h1>
      {lines.length === 0 ? (
        <div className="region mt-10 p-16 text-center">
          <p className="font-display text-3xl">Your cart is empty.</p>
          <Link to="/shop" className="btn btn-primary mt-6">Explore the collection</Link>
        </div>
      ) : (
        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_360px]">
          <ul className="divide-y divide-border border-y border-border">
            {lines.map((l) => (
              <li key={l.key} className="flex gap-5 py-6">
                <img src={l.image} alt="" className="h-32 w-28 rounded-lg object-cover" />
                <div className="flex flex-1 flex-col">
                  <div className="flex justify-between gap-4">
                    <div>
                      <Link to="/product/$slug" params={{ slug: l.slug }} className="font-display text-2xl hover:underline">{l.name}</Link>
                      <p className="text-sm text-muted-foreground">{l.material} · {formatPrice(l.unitPrice)} each</p>
                    </div>
                    <p className="font-semibold tabular-nums">{formatPrice(l.unitPrice * l.qty)}</p>
                  </div>
                  <div className="mt-auto flex items-center gap-6">
                    <QtyControl value={l.qty} onChange={(q) => update(l.key, q)} small />
                    <button onClick={() => remove(l.key)} className="text-sm underline underline-offset-4 text-muted-foreground hover:text-destructive">Remove</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <aside className="region h-fit space-y-4 p-6 lg:sticky lg:top-28">
            <h2 className="text-3xl">Summary</h2>
            <div className="flex justify-between text-sm"><span>Subtotal</span><span>{formatPrice(sub)}</span></div>
            <div className="flex justify-between text-sm"><span>Delivery</span><span>{ship ? formatPrice(ship) : "Free"}</span></div>
            {ship > 0 && <p className="text-xs text-muted-foreground">Add {formatPrice(FREE_SHIPPING_THRESHOLD - sub)} for free delivery.</p>}
            <div className="flex justify-between border-t border-border pt-4 font-semibold"><span>Total</span><span>{formatPrice(sub + ship)}</span></div>
            <Link to="/checkout" className="btn btn-primary w-full">Checkout</Link>
          </aside>
        </div>
      )}
    </div>
  );
}
