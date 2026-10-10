import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import { getProducts } from "@/lib/api";
import { topFallers, topRisers } from "@/lib/format";

function Section({ id, title, subtitle, children }) {
  return (
    <section id={id} className="mx-auto max-w-6xl scroll-mt-32 px-4 pt-12">
      <div className="mb-5">
        <h2 className="text-2xl font-bold">{title}</h2>
        {subtitle && <p className="mt-1 text-sm text-base-content/60">{subtitle}</p>}
      </div>
      {children}
    </section>
  );
}

export default async function HomePage() {
  const products = await getProducts();
  const risers = topRisers(products);
  const fallers = topFallers(products);

  return (
    <>
      <Hero />

      {risers.length > 0 && (
        <Section
          title="আজ দাম বেড়েছে ▲"
          subtitle="গতকালের তুলনায় যেসব পণ্যের দাম সবচেয়ে বেশি বেড়েছে"
        >
          <ProductGrid products={risers} />
        </Section>
      )}

      {fallers.length > 0 && (
        <Section
          title="আজ দাম কমেছে ▼"
          subtitle="গতকালের তুলনায় যেসব পণ্যের দাম সবচেয়ে বেশি কমেছে"
        >
          <ProductGrid products={fallers} />
        </Section>
      )}

      <Section
        id="সব-পণ্য"
        title="সব পণ্য"
        subtitle="যেকোনো পণ্যে ক্লিক করে বিভিন্ন বাজারের বিস্তারিত দাম দেখুন"
      >
        <ProductGrid products={products} />
      </Section>
    </>
  );
}
