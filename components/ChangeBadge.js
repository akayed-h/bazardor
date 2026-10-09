import { changeOf, pctToBn } from "@/lib/format";

export default function ChangeBadge({ product, className = "" }) {
  const { dir, pct } = changeOf(product);

  const styles = {
    up: "bg-success/10 text-success",
    down: "bg-error/10 text-error",
    flat: "bg-base-300 text-base-content/60",
  }[dir];

  const label =
    dir === "up"
      ? `▲ ${pctToBn(pct)}%`
      : dir === "down"
      ? `▼ ${pctToBn(pct)}%`
      : `— ${pctToBn(0)}%`;

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold whitespace-nowrap ${styles} ${className}`}
    >
      {label}
    </span>
  );
}
