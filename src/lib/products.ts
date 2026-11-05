import chair from "@/assets/p-chair.jpg";
import sofa from "@/assets/p-sofa.jpg";
import table from "@/assets/p-table.jpg";
import ottoman from "@/assets/p-ottoman.jpg";
import sideboard from "@/assets/p-sideboard.jpg";
import lamp from "@/assets/p-lamp.jpg";
import hero from "@/assets/hero.jpg";
import bedroom from "@/assets/room-bedroom.jpg";

export type Category = "Seating" | "Tables" | "Storage" | "Lighting";
export const CATEGORIES: Category[] = ["Seating", "Tables", "Storage", "Lighting"];

export type Product = {
  slug: string;
  name: string;
  category: Category;
  price: number;
  tagline: string;
  description: string;
  dimensions: string;
  materials: { name: string; swatch: string; surcharge: number }[];
  images: string[];
  featured?: boolean;
};

export const PRODUCTS: Product[] = [
  {
    slug: "halden-lounge-chair",
    name: "Halden Lounge Chair",
    category: "Seating",
    price: 28999,
    tagline: "Solid oak frame, linen cushions",
    description:
      "A low, generous lounge chair shaped from solid white oak with softly rounded armrests. Loose linen cushions can be removed and cleaned.",
    dimensions: "W 72 × D 80 × H 76 cm",
    materials: [
      { name: "Natural Oak", swatch: "var(--oak)", surcharge: 0 },
      { name: "Smoked Oak", swatch: "var(--charcoal)", surcharge: 2500 },
    ],
    images: [chair, hero],
    featured: true,
  },
  {
    slug: "dune-curved-sofa",
    name: "Dune Curved Sofa",
    category: "Seating",
    price: 64999,
    tagline: "Three-seat bouclé crescent",
    description:
      "A crescent-shaped sofa upholstered in dense ivory bouclé. The curve gathers conversation and anchors open-plan rooms.",
    dimensions: "W 248 × D 102 × H 74 cm",
    materials: [
      { name: "Ivory Bouclé", swatch: "var(--ivory)", surcharge: 0 },
      { name: "Sand Bouclé", swatch: "var(--sand)", surcharge: 0 },
      { name: "Olive Velvet", swatch: "var(--olive)", surcharge: 6000 },
    ],
    images: [sofa, hero],
    featured: true,
  },
  {
    slug: "ring-pedestal-table",
    name: "Ring Pedestal Table",
    category: "Tables",
    price: 46999,
    tagline: "Carved oak, seats six",
    description:
      "A round dining table on a fluted, hand-finished pedestal. No corner legs means every seat feels equal.",
    dimensions: "Ø 150 × H 75 cm",
    materials: [
      { name: "Natural Oak", swatch: "var(--oak)", surcharge: 0 },
      { name: "Smoked Oak", swatch: "var(--charcoal)", surcharge: 4000 },
    ],
    images: [table, hero],
    featured: true,
  },
  {
    slug: "moss-ottoman",
    name: "Moss Ottoman",
    category: "Seating",
    price: 12999,
    tagline: "Velvet pouf on oak legs",
    description:
      "A compact footstool in deep olive cotton velvet, raised on turned oak legs. Equally at home by a bed or a lounge chair.",
    dimensions: "Ø 56 × H 42 cm",
    materials: [
      { name: "Olive Velvet", swatch: "var(--olive)", surcharge: 0 },
      { name: "Sand Velvet", swatch: "var(--sand)", surcharge: 0 },
    ],
    images: [ottoman, bedroom],
  },
  {
    slug: "fjord-sideboard",
    name: "Fjord Sideboard",
    category: "Storage",
    price: 54999,
    tagline: "Fluted doors, soft-close",
    description:
      "A long, low credenza with fluted oak doors that catch light through the day. Adjustable shelves and cable access behind.",
    dimensions: "W 200 × D 45 × H 78 cm",
    materials: [
      { name: "Natural Oak", swatch: "var(--oak)", surcharge: 0 },
      { name: "Smoked Oak", swatch: "var(--charcoal)", surcharge: 5000 },
    ],
    images: [sideboard, hero],
    featured: true,
  },
  {
    slug: "veil-floor-lamp",
    name: "Veil Floor Lamp",
    category: "Lighting",
    price: 8999,
    tagline: "Washi paper, bronzed stem",
    description:
      "A sculpted washi paper shade folds around a slim bronzed stem, diffusing a warm, even glow across a room.",
    dimensions: "Ø 48 × H 172 cm",
    materials: [
      { name: "Bronze Stem", swatch: "var(--charcoal)", surcharge: 0 },
      { name: "Oak Stem", swatch: "var(--oak)", surcharge: 1500 },
    ],
    images: [lamp, bedroom],
  },
];

export const getProduct = (slug: string) => PRODUCTS.find((p) => p.slug === slug);

export const formatPrice = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);
