import Link from "next/link";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { getProduct } from "@/lib/api";
import ChangeBadge from "@/components/ChangeBadge";
import {
  groupByDivision,
  marketStats,
  takaBn,
  toBn,
  unitLabel,
} from "@/lib/format";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = await getProduct(slug).catch(() => null);
  return { title: product ? product.nameBn : "পণ্য" };
}

function Stat({ label, value, tone }) {
  return (
    <div className="rounded-box border border-base-300 bg-white p-4">
      <p className="text-xs text-base-content/60">{label}</p>
      <p className={`mt-1 text-xl font-bold ${tone || ""}`}>{value}</p>
    </div>
  );
}

function HistoryRow({ label, price, today }) {
  const diff = today - price;
  const tone = diff > 0 ? "text-success" : diff < 0 ? "text-error" : "text-base-content/60";
  const sign = diff > 0 ? "▲ +" : diff < 0 ? "▼ −" : "— ";
  return (
    <div className="flex items-center justify-between py-2.5 text-sm">
      <span className="text-base-content/70">{label}</span>
      <span className="flex items-center gap-3">
        <span className="font-semibold">{takaBn(price)}</span>
        <span className={`w-20 text-right text-xs font-semibold ${tone}`}>
          {sign}
          {toBn(Math.abs(diff))}
        </span>
      </span>
    </div>
  );
}

export default async function ProductPage({ params }) {
  const { slug } = await params;

  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    redirect(`/signin?redirect=${encodeURIComponent(`/product/${slug}`)}&reason=protected`);
  }

  const product = await getProduct(slug);
  if (!product) notFound();

  const { min, max, avg } = marketStats(product);
  const divisions = groupByDivision(product.markets);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <Link href={`/category/${product.category}`} className="text-sm text-primary hover:underline">
        ← {product.categoryNameBn}
      </Link>

      {/* Summary */}
      <section className="mt-4 rounded-box border border-base-300 bg-white p-5 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-base-200 text-5xl">
            {product.image || product.categoryIcon}
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-extrabold sm:text-3xl">{product.nameBn}</h1>
            <p className="mt-1 text-sm text-base-content/70">
              {product.categoryNameBn} · {toBn(product.markets?.length || 0)}টি বাজারের দামের
              ভিত্তিতে আজকের গড় দাম {takaBn(avg)} ({unitLabel(product.unit)})
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <Link
                href={`/category/${product.category}`}
                className="badge badge-primary badge-outline"
              >
                {product.categoryIcon} {product.categoryNameBn}
              </Link>
              <span className="badge badge-ghost">{unitLabel(product.unit)}</span>
            </div>
          </div>
          <div className="flex items-center gap-3 sm:flex-col sm:items-end">
            <p className="text-3xl font-extrabold text-primary">{takaBn(product.today)}</p>
            <ChangeBadge product={product} />
          </div>
        </div>
      </section>

      {/* Price summary */}
      <section className="mt-6">
        <h2 className="mb-3 text-lg font-bold">দামের সারসংক্ষেপ</h2>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <Stat label="সর্বনিম্ন দাম" value={takaBn(min)} tone="text-success" />
          <Stat label="সর্বোচ্চ দাম" value={takaBn(max)} tone="text-error" />
          <Stat label="গড় দাম" value={takaBn(avg)} />
          <Stat label="আজকের দাম" value={takaBn(product.today)} tone="text-primary" />
        </div>

        <div className="mt-4 divide-y divide-base-300 rounded-box border border-base-300 bg-white px-4">
          <HistoryRow label="গতকাল" price={product.yesterday} today={product.today} />
          <HistoryRow label="গত সপ্তাহ" price={product.lastWeek} today={product.today} />
          <HistoryRow label="গত মাস" price={product.lastMonth} today={product.today} />
        </div>
      </section>

      {/* Markets */}
      <section className="mt-8">
        <h2 className="mb-3 text-lg font-bold">বাজারভিত্তিক আজকের দাম</h2>
        {divisions.length === 0 ? (
          <p className="text-base-content/60">বাজারভিত্তিক তথ্য পাওয়া যায়নি।</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {divisions.map(({ division, items }) => (
              <div
                key={division}
                className="overflow-hidden rounded-box border border-base-300 bg-white"
              >
                <h3 className="border-b border-base-300 bg-base-200 px-4 py-2 font-bold">
                  {division}
                </h3>
                <table className="table table-sm">
                  <thead>
                    <tr>
                      <th>বাজার</th>
                      <th className="text-right">সর্বনিম্ন</th>
                      <th className="text-right">সর্বোচ্চ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((m) => (
                      <tr key={m.market}>
                        <td>{m.market}</td>
                        <td className="text-right text-success">{toBn(m.min)}</td>
                        <td className="text-right text-error">{toBn(m.max)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
