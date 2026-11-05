import { Minus, Plus } from "lucide-react";
import { MAX_QTY } from "@/lib/cart-logic";

export function QtyControl({ value, onChange, small, min = 0 }: { value: number; onChange: (v: number) => void; small?: boolean; min?: number }) {
  const s = small ? "h-8 w-8" : "h-11 w-11";
  return (
    <div className="inline-flex items-center rounded-full border border-border" role="group" aria-label="Quantity">
      <button className={`${s} flex items-center justify-center rounded-full hover:bg-muted disabled:opacity-30`} onClick={() => onChange(value - 1)} disabled={value <= min} aria-label="Decrease quantity"><Minus size={14} /></button>
      <span className={`${small ? "w-6 text-sm" : "w-8"} text-center tabular-nums`} aria-live="polite">{value}</span>
      <button className={`${s} flex items-center justify-center rounded-full hover:bg-muted disabled:opacity-30`} onClick={() => onChange(value + 1)} disabled={value >= MAX_QTY} aria-label="Increase quantity"><Plus size={14} /></button>
    </div>
  );
}
