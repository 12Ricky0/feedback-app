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
  const [currentUser, setCurrentUser] = useState();
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
    return fetch(`http://localhost:3000/api/user/?query=${username}`)
      .then((response) => response.json())
      .then((data) => {
        // console.log("success");
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
      if (user) {
        setCurrentUser(JSON.parse(user!));
        // console.log(JSON.parse(user).username);
        fetchCurrentUser(JSON.parse(user!).username).then((res) => {
          if (res) {
            // console.log("Fetched user:", res);
            setCurrentUser(res.res);
          }
        });
      } else {
        localStorage.setItem("user", JSON.stringify(newUser));
        // setCurrentUser(JSON.parse(user!));

        fetch("http://localhost:3000/api/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        });
        // .then((response) => response.json())
        // .then((data) => {
        //   // console.log("User data fetched successfully:", data);
        //   return data;
        // });
      }
    } catch (error) {
    } finally {
      if (!user) {
        const query = localStorage.getItem("user");
        fetch(
          `http://localhost:3000/api/user/?query=${JSON.parse(query!).username}`
        )
          .then((response) => response.json())
          .then((data) => {
            // console.log("User data fetched successfully:", data);
            setCurrentUser(data.res);
          })
          .catch((error) => {
            console.error("Error fetching user data:", error);
            return null;
          });
      }
    }
  }, []);

  useEffect(() => {
    if (currentUser) {
      console.log("Current user state updated:", currentUser);
    }
  }, [currentUser]);

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
