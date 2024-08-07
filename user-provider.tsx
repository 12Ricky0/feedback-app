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
  const [editCat, setEditCat] = useState();
  const [currentUser, setCurrentUser]: any = useState();
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

  const fetchCurrentUser = (username: string) => {
    return fetch(
      `https://feedback-app-ecru.vercel.app/api/user/?query=${username}`,
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        return null;
      });
  };
  useEffect(() => {
    const user = localStorage.getItem("user");

    const newUser = {
      image: "./assets/user-images/image-zena.jpg",
      name: generateLetter(),
      username: generateLetter() + generateRandomNumber(0, 100),
    };
    try {
      if (!user) {
        localStorage.setItem("user", JSON.stringify(newUser));

        fetch("https://feedback-app-ecru.vercel.app/api/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
          },
          body: JSON.stringify(newUser),
        });
      } else {
        fetchCurrentUser(JSON.parse(user!).username).then((res) => {
          if (res) {
            setCurrentUser(res.res);
          }
        });
      }
    } catch (error) {
    } finally {
      if (!user) {
        const query = localStorage.getItem("user");
        fetch(
          `https://feedback-app-ecru.vercel.app/api/user/?query=${
            JSON.parse(query!).username
          }`,
          {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
              "Access-Control-Allow-Headers": "Content-Type, Authorization",
            },
          }
        )
          .then((response) => response.json())
          .then((data) => {
            setCurrentUser(data.res);
          })
          .catch((error) => {
            console.error("Error fetching user data:", error);
            return null;
          });
      }
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
