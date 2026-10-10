const numberBn = new Intl.NumberFormat("bn-BD", { maximumFractionDigits: 2 });
const pctBn = new Intl.NumberFormat("bn-BD", {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

export const toBn = (n) => numberBn.format(Number(n) || 0);
export const pctToBn = (n) => pctBn.format(Number(n) || 0);
export const takaBn = (n) => `${toBn(n)} টাকা`;

export const UNIT_LABEL = {
  kg: "প্রতি কেজি",
  litre: "প্রতি লিটার",
  dozen: "প্রতি ডজন",
  piece: "প্রতি পিস",
};

export const UNIT_SHORT = {
  kg: "কেজি",
  litre: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
};

export const unitLabel = (u) => UNIT_LABEL[u] || `প্রতি ${u}`;
export const unitShort = (u) => UNIT_SHORT[u] || u;

export function banglaDate(date = new Date()) {
  return new Intl.DateTimeFormat("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  }).format(date);
}

export function changeOf(p) {
  const dir = p?.change?.dir === "up" || p?.change?.dir === "down" ? p.change.dir : "flat";
  const pct = Number(p?.change?.pct) || 0;
  return { dir: pct === 0 ? "flat" : dir, pct };
}

export function topRisers(products, n = 6) {
  return products
    .filter((p) => changeOf(p).dir === "up")
    .sort((a, b) => Math.abs(changeOf(b).pct) - Math.abs(changeOf(a).pct))
    .slice(0, n);
}

export function topFallers(products, n = 6) {
  return products
    .filter((p) => changeOf(p).dir === "down")
    .sort((a, b) => Math.abs(changeOf(b).pct) - Math.abs(changeOf(a).pct))
    .slice(0, n);
}

export function sortProducts(products, mode) {
  const list = [...products];
  if (mode === "asc") list.sort((a, b) => a.today - b.today);
  if (mode === "desc") list.sort((a, b) => b.today - a.today);
  return list;
}

export function marketStats(product) {
  const markets = product.markets || [];
  if (!markets.length) {
    return { min: product.today, max: product.today, avg: product.today };
  }
  const min = Math.min(...markets.map((m) => m.min));
  const max = Math.max(...markets.map((m) => m.max));
  const avg =
    markets.reduce((sum, m) => sum + (m.min + m.max) / 2, 0) / markets.length;
  return { min, max, avg: Math.round(avg) };
}

export function groupByDivision(markets = []) {
  const map = new Map();
  for (const m of markets) {
    if (!map.has(m.division)) map.set(m.division, []);
    map.get(m.division).push(m);
  }
  return [...map.entries()].map(([division, items]) => ({ division, items }));
}
