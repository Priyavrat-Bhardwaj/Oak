import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { formatPrice, type Product } from "@/lib/products";
import { useStore } from "@/lib/store";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { wishlist, toggleWish } = useStore();
  const wished = wishlist.includes(product.slug);
  return (
    <article className="group animate-rise relative" style={{ animationDelay: `${index * 70}ms` }}>
      <Link to="/product/$slug" params={{ slug: product.slug }} className="block">
        <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-card">
          <img src={product.images[0]} alt={product.name} loading="lazy" width={1024} height={1280}
            className="absolute inset-0 h-full w-full object-cover transition duration-[1.2s] ease-out group-hover:scale-105 group-hover:opacity-0" />
          <img src={product.images[1]} alt="" loading="lazy" aria-hidden
            className="absolute inset-0 h-full w-full scale-110 object-cover opacity-0 transition duration-[1.2s] ease-out group-hover:scale-100 group-hover:opacity-100" />
          <span className="glass eyebrow absolute bottom-3 left-3 rounded-full px-3 py-1.5 text-[0.6rem] text-foreground">{product.category}</span>
        </div>
        {/* Proximity: name, detail and price sit tightly together */}
        <div className="mt-4 flex items-start justify-between gap-3">
          <div>
            <h3 className="font-display text-xl leading-tight">{product.name}</h3>
            <p className="mt-0.5 text-sm text-muted-foreground">{product.tagline}</p>
          </div>
          <p className="text-sm font-semibold tabular-nums">{formatPrice(product.price)}</p>
        </div>
      </Link>
      <button
        onClick={() => toggleWish(product.slug, product.name)}
        className="glass absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full text-foreground transition hover:scale-110"
        aria-label={wished ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
        aria-pressed={wished}
      >
        <Heart key={String(wished)} size={17} className={wished ? "animate-pop fill-accent text-accent" : ""} />
      </button>
    </article>
  );
}
