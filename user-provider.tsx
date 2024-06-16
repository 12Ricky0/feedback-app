"use client";

import { createContext, useState, useEffect } from "react";

export const ProductContext = createContext({});

export default function ProductProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sort, setSort] = useState("ALL");
  const [category, setCategory] = useState("Feature");
  const [currentUser, setCurrentUser] = useState();

  function createUser() {}

  useEffect(() => {
    const newUser = {
      image: "./assets/user-images/image-zena.jpg",
      name: "Zena Kelley",
      username: "velvetround",
    };
    const user = localStorage.getItem("user");
    if (user) {
    } else {
    }
  });

  const [sortBy, setSortBy] = useState<string>("Most Upvotes");

  return (
    <ProductContext.Provider
      value={{ sort, setSort, sortBy, setSortBy, category, setCategory }}
    >
      {children}
    </ProductContext.Provider>
  );
}
