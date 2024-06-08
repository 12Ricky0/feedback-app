"use client";

import { createContext, useState } from "react";

export const ProductContext = createContext({});

export default function ProductProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sort, setSort] = useState("ALL");
  const [sortBy, setSortBy] = useState<string>("Most Upvotes");

  return (
    <ProductContext.Provider value={{ sort, setSort, sortBy, setSortBy }}>
      {children}
    </ProductContext.Provider>
  );
}
