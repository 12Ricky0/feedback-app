"use client";

import { createContext, useState, useEffect } from "react";
import { getCurrentUser } from "@/libs/actions";
export const ProductContext = createContext({});

export default function ProductProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sort, setSort] = useState("ALL");
  const [category, setCategory] = useState("Feature");
  const [editCat, setEditCat] = useState();
  const [currentUser, setCurrentUser] = useState({});
  const [status, setStatus] = useState();

  function generateLetter() {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    return (
      alphabet.charAt(Math.floor(Math.random() * alphabet.length)) +
      alphabet.charAt(Math.floor(Math.random() * alphabet.length)) +
      alphabet.charAt(Math.floor(Math.random() * alphabet.length)) +
      alphabet.charAt(Math.floor(Math.random() * alphabet.length))
    );
  }
  const generateRandomNumber = (min: number, max: number) => {
    return String(Math.floor(Math.random() * (max - min + 1)) + min);
  };

  useEffect(() => {
    const user = localStorage.getItem("user");

    const newUser = {
      image: "./assets/user-images/image-zena.jpg",
      name: generateLetter(),
      username: generateLetter() + generateRandomNumber(0, 100),
    };
    if (user) {
      setCurrentUser(JSON.parse(user!));
      // console.log(JSON.parse(user).username);
    } else {
      localStorage.setItem("user", JSON.stringify(newUser));
      setCurrentUser(JSON.parse(user!));
    }
  }, []);

  const [sortBy, setSortBy] = useState<string>("Most Upvotes");

  return (
    <ProductContext.Provider
      value={{
        sort,
        setSort,
        sortBy,
        setSortBy,
        category,
        setCategory,
        editCat,
        setEditCat,
        status,
        setStatus,
        currentUser,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
