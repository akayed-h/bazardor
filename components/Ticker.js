import { changeOf, pctToBn, toBn, unitShort } from "@/lib/format";

function TickerItem({ p }) {
  const { dir, pct } = changeOf(p);
  const color =
    dir === "up" ? "text-success" : dir === "down" ? "text-error" : "text-base-content/50";
  const arrow = dir === "up" ? "▲" : dir === "down" ? "▼" : "—";
  return (
    <span className="flex items-center gap-2 whitespace-nowrap px-5 text-sm">
      <span className="text-lg">{p.image || p.categoryIcon}</span>
      <span className="font-semibold">{p.nameBn}</span>
      <span className="text-base-content/70">
        {toBn(p.today)} টাকা/{unitShort(p.unit)}
      </span>
      <span className={`font-semibold ${color}`}>
        {arrow} {pctToBn(pct)}%
      </span>
    </span>
  );
}

export default function Ticker({ products }) {
  if (!products?.length) return null;
  return (
    <div className="ticker overflow-hidden border-b border-base-300 bg-base-200 py-2" aria-label="আজকের দামের তালিকা">
      <div className="ticker-track">
        {/* list is rendered twice so the -50% translate loops seamlessly */}
        {[0, 1].map((copy) => (
          <div key={copy} className="flex" aria-hidden={copy === 1}>
            {products.map((p) => (
              <TickerItem key={`${copy}-${p.id}`} p={p} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
