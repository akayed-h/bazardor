"use client";

import { useMemo, useState } from "react";
import ProductGrid from "./ProductGrid";
import { sortProducts } from "@/lib/format";

export default function SortedProducts({ products }) {
  const [mode, setMode] = useState("default");
  const sorted = useMemo(() => sortProducts(products, mode), [products, mode]);

  return (
    <>
      <div className="mb-5 flex items-center justify-end gap-2">
        <label htmlFor="sort" className="text-sm font-medium">
          সাজান:
        </label>
        <select
          id="sort"
          value={mode}
          onChange={(e) => setMode(e.target.value)}
          className="select select-bordered select-sm bg-white sm:select-md"
        >
          <option value="default">ডিফল্ট</option>
          <option value="asc">দাম: কম থেকে বেশি</option>
          <option value="desc">দাম: বেশি থেকে কম</option>
        </select>
      </div>
      <ProductGrid products={sorted} />
    </>
  );
}
