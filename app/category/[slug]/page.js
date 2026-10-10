import Link from "next/link";
import { notFound } from "next/navigation";
import SortedProducts from "@/components/SortedProducts";
import { getCategories, getProducts } from "@/lib/api";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const categories = await getCategories().catch(() => []);
  const category = categories.find((c) => c.slug === slug);
  return { title: category ? category.nameBn : "ক্যাটেগরি" };
}

export default async function CategoryPage({ params }) {
  const { slug } = await params;

  const categories = await getCategories();
  const category = categories.find((c) => c.slug === slug);
  if (!category) notFound();

  const products = await getProducts(slug);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="mb-6 flex items-center gap-3 text-3xl font-extrabold">
        <span className="text-4xl">{category.icon}</span>
        {category.nameBn}
      </h1>

      {products.length === 0 ? (
        <div className="flex flex-col items-center py-16 text-center">
          <div className="text-6xl">🗂️</div>
          <p className="mt-4 text-xl font-bold">এই ক্যাটেগরিতে কোনো পণ্য নেই</p>
          <Link href="/" className="btn btn-primary mt-6">
            হোম পেজে ফিরে যান
          </Link>
        </div>
      ) : (
        <SortedProducts products={products} />
      )}
    </div>
  );
}
