export type CartLine = {
  key: string;
  slug: string;
  name: string;
  material: string;
  unitPrice: number;
  image: string;
  qty: number;
};

export const MAX_QTY = 10;
export const FREE_SHIPPING_THRESHOLD = 25000;
export const SHIPPING_FEE = 999;

export const lineKey = (slug: string, material: string) => `${slug}::${material}`;

export function addLine(lines: CartLine[], line: CartLine): CartLine[] {
  const existing = lines.find((l) => l.key === line.key);
  if (existing) {
    return lines.map((l) => (l.key === line.key ? { ...l, qty: Math.min(MAX_QTY, l.qty + line.qty) } : l));
  }
  return [...lines, { ...line, qty: Math.min(MAX_QTY, Math.max(1, line.qty)) }];
}

export function setQty(lines: CartLine[], key: string, qty: number): CartLine[] {
  if (qty <= 0) return lines.filter((l) => l.key !== key);
  return lines.map((l) => (l.key === key ? { ...l, qty: Math.min(MAX_QTY, qty) } : l));
}

export const subtotal = (lines: CartLine[]) => lines.reduce((s, l) => s + l.unitPrice * l.qty, 0);
export const itemCount = (lines: CartLine[]) => lines.reduce((s, l) => s + l.qty, 0);
export const shipping = (lines: CartLine[]) =>
  lines.length === 0 || subtotal(lines) >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
