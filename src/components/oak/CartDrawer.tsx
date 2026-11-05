import { Link } from "@tanstack/react-router";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useStore } from "@/lib/store";
import { subtotal } from "@/lib/cart-logic";
import { formatPrice } from "@/lib/products";
import { QtyControl } from "./QtyControl";

export function CartDrawer() {
  const { lines, drawerOpen, setDrawerOpen, update, remove } = useStore();
  return (
    <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
      <SheetContent className="flex w-full flex-col bg-background sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="font-display text-3xl font-medium">Your cart</SheetTitle>
        </SheetHeader>
        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-6 text-center">
            <p className="font-display text-2xl text-muted-foreground">Nothing here yet.</p>
            <Link to="/shop" onClick={() => setDrawerOpen(false)} className="btn btn-primary">Explore the collection</Link>
          </div>
        ) : (
          <>
            <ul className="-mx-2 flex-1 space-y-3 overflow-y-auto px-2 py-4">
              {lines.map((l) => (
                <li key={l.key} className="region animate-rise flex gap-4 p-3">
                  <img src={l.image} alt="" className="h-24 w-20 rounded object-cover" />
                  <div className="flex flex-1 flex-col">
                    <div className="flex justify-between gap-2">
                      <div>
                        <p className="font-display text-lg leading-tight">{l.name}</p>
                        <p className="text-xs text-muted-foreground">{l.material}</p>
                      </div>
                      <p className="text-sm font-semibold">{formatPrice(l.unitPrice * l.qty)}</p>
                    </div>
                    <div className="mt-auto flex items-center justify-between">
                      <QtyControl value={l.qty} onChange={(q) => update(l.key, q)} small />
                      <button onClick={() => remove(l.key)} className="text-xs underline underline-offset-4 text-muted-foreground hover:text-destructive">Remove</button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="region space-y-4 p-5">
              <div className="flex justify-between"><span className="eyebrow">Subtotal</span><span className="font-semibold">{formatPrice(subtotal(lines))}</span></div>
              <div className="grid grid-cols-2 gap-2">
                <Link to="/cart" onClick={() => setDrawerOpen(false)} className="btn btn-ghost">View cart</Link>
                <Link to="/checkout" onClick={() => setDrawerOpen(false)} className="btn btn-primary">Checkout</Link>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
