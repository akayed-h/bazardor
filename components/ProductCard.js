import Link from "next/link";
import ChangeBadge from "./ChangeBadge";
import { takaBn, unitLabel } from "@/lib/format";

export default function ProductCard({ product }) {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="card bg-white border border-base-300 transition hover:-translate-y-0.5 hover:shadow-md hover:border-primary/40"
    >
      <div className="card-body gap-3 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-base-200 text-3xl">
            {product.image || product.categoryIcon}
          </div>
          <div className="min-w-0">
            <h3 className="truncate text-base font-bold">{product.nameBn}</h3>
            <p className="text-xs text-base-content/60">{unitLabel(product.unit)}</p>
          </div>
        </div>

        <div className="flex items-end justify-between border-t border-base-300 pt-3">
          <div>
            <p className="text-xs text-base-content/60">আজকের দাম</p>
            <p className="text-lg font-bold text-primary">{takaBn(product.today)}</p>
          </div>
          <ChangeBadge product={product} />
        </div>
      </div>
    </Link>
  );
}
