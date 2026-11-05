import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { useState, type FormEvent } from "react";
import { useStore } from "@/lib/store";
import { shipping, subtotal, type CartLine } from "@/lib/cart-logic";
import { formatPrice } from "@/lib/products";
import { ClosureMark } from "@/components/oak/ClosureMark";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — OAK" },
      { name: "description", content: "Complete your OAK order. This demo checkout processes no payments." },
      { property: "og:title", content: "Checkout — OAK" },
      { property: "og:description", content: "Complete your OAK order (simulated)." },
    ],
  }),
  component: Checkout,
});

const STEPS = ["Details", "Delivery", "Payment"];

function Field({ label, name, type = "text", autoComplete, pattern }: { label: string; name: string; type?: string; autoComplete?: string; pattern?: string }) {
  return (
    <label className="block">
      <span className="eyebrow text-muted-foreground">{label}</span>
      <input name={name} type={type} required autoComplete={autoComplete} pattern={pattern}
        className="mt-2 h-11 w-full rounded-lg border border-border bg-background px-3 focus:border-foreground" />
    </label>
  );
}

function Checkout() {
  const { lines, clear } = useStore();
  const [step, setStep] = useState(0);
  const [done, setDone] = useState<{ id: string; lines: CartLine[] } | null>(null);
  const sub = subtotal(lines);
  const ship = shipping(lines);

  const next = (e: FormEvent) => {
    e.preventDefault();
    if (step < 2) return setStep(step + 1);
    setDone({ id: `OAK-${Math.floor(100000 + Math.random() * 900000)}`, lines });
    clear();
  };

  if (done) {
    return (
      <div className="mx-auto max-w-xl px-6 pt-44 text-center">
        <ClosureMark size={64} className="mx-auto animate-rise text-olive" />
        <h1 className="animate-rise mt-6 text-6xl">Thank you.</h1>
        <p className="mt-4 text-muted-foreground">Order <strong className="text-foreground">{done.id}</strong> is confirmed — this was a simulated checkout, so nothing was charged.</p>
        <Link to="/shop" className="btn btn-primary mt-8">Continue browsing</Link>
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-6 pt-44 text-center">
        <h1 className="text-5xl">Your cart is empty.</h1>
        <Link to="/shop" className="btn btn-primary mt-8">Explore the collection</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-6 pt-36">
      <h1 className="text-6xl">Checkout</h1>
      {/* Continuity: a single connected line runs through every step */}
      <ol className="mt-8 flex items-center" aria-label="Checkout progress">
        {STEPS.map((s, i) => (
          <li key={s} className="flex flex-1 items-center last:flex-none">
            <span className={`flex h-9 w-9 items-center justify-center rounded-full border text-sm transition ${i <= step ? "border-foreground bg-foreground text-background" : "border-border"}`} aria-current={i === step ? "step" : undefined}>
              {i < step ? <Check size={15} /> : i + 1}
            </span>
            <span className="ml-3 hidden text-sm sm:inline">{s}</span>
            {i < STEPS.length - 1 && <span className="mx-4 h-px flex-1 bg-border"><span className="block h-full bg-foreground transition-all duration-700" style={{ width: i < step ? "100%" : "0%" }} /></span>}
          </li>
        ))}
      </ol>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_360px]">
        <form key={step} onSubmit={next} className="region animate-rise space-y-5 p-6 md:p-8">
          {step === 0 && (<>
            <h2 className="text-3xl">Your details</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="First name" name="first" autoComplete="given-name" />
              <Field label="Last name" name="last" autoComplete="family-name" />
            </div>
            <Field label="Email" name="email" type="email" autoComplete="email" />
          </>)}
          {step === 1 && (<>
            <h2 className="text-3xl">Delivery address</h2>
            <Field label="Street address" name="street" autoComplete="street-address" />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="City" name="city" autoComplete="address-level2" />
              <Field label="Postcode" name="zip" autoComplete="postal-code" />
            </div>
          </>)}
          {step === 2 && (<>
            <h2 className="text-3xl">Payment</h2>
            <p className="rounded-lg bg-muted p-3 text-sm text-muted-foreground">Demo only — enter any 16 digits. No payment is processed.</p>
            <Field label="Card number" name="card" pattern="[0-9 ]{16,19}" autoComplete="off" />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Expiry (MM/YY)" name="exp" pattern="[0-9]{2}/[0-9]{2}" autoComplete="off" />
              <Field label="CVC" name="cvc" pattern="[0-9]{3,4}" autoComplete="off" />
            </div>
          </>)}
          <div className="flex justify-between pt-2">
            {step > 0 ? <button type="button" className="btn btn-ghost" onClick={() => setStep(step - 1)}>Back</button> : <Link to="/cart" className="btn btn-ghost">Back to cart</Link>}
            <button type="submit" className="btn btn-primary">{step < 2 ? "Continue" : `Place order — ${formatPrice(sub + ship)}`}</button>
          </div>
        </form>

        <aside className="region h-fit space-y-3 p-6">
          <h2 className="text-2xl">Order</h2>
          {lines.map((l) => (
            <div key={l.key} className="flex items-center gap-3 text-sm">
              <img src={l.image} alt="" className="h-14 w-12 rounded object-cover" />
              <div className="flex-1"><p>{l.name}</p><p className="text-xs text-muted-foreground">{l.material} × {l.qty}</p></div>
              <span>{formatPrice(l.unitPrice * l.qty)}</span>
            </div>
          ))}
          <div className="flex justify-between border-t border-border pt-3 text-sm"><span>Delivery</span><span>{ship ? formatPrice(ship) : "Free"}</span></div>
          <div className="flex justify-between font-semibold"><span>Total</span><span>{formatPrice(sub + ship)}</span></div>
        </aside>
      </div>
    </div>
  );
}
