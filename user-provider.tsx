"use client";

import { createContext, useState } from "react";

export const ProductContext = createContext({});

export default function ProductProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sort, setSort] = useState("ALL");

  return (
    <ProductContext.Provider value={{ sort, setSort }}>
      {children}
    </ProductContext.Provider>
  );
}
