const BASES = [
  process.env.API_BASE_URL || "https://api.api-store.workers.dev/api/bazardor",
  "https://api.abcz.workers.dev/api/bazardor",
];

async function get(path) {
  let lastError;
  let found404 = false;
  for (const base of BASES) {
    try {
      const res = await fetch(`${base}${path}`, { next: { revalidate: 300 } });
      if (res.status === 404) {
        found404 = true;
        continue;
      }
      if (!res.ok) throw new Error(`API ${res.status} for ${path}`);
      return await res.json();
    } catch (err) {
      lastError = err;
    }
  }
  if (found404 && !lastError) return null;
  throw lastError;
}

function asArray(data) {
  if (Array.isArray(data)) return data;
  if (data && Array.isArray(data.data)) return data.data;
  if (data && Array.isArray(data.products)) return data.products;
  if (data && Array.isArray(data.categories)) return data.categories;
  return [];
}

export async function getProducts(category) {
  const q = category ? `?category=${encodeURIComponent(category)}` : "";
  return asArray(await get(`/products${q}`));
}

export async function getCategories() {
  return asArray(await get("/categories"));
}

export async function getProduct(slugOrId) {
  const all = await getProducts();
  const found = all.find(
    (p) => p.slug === slugOrId || String(p.id) === String(slugOrId)
  );
  return found || null;
}
