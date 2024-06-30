"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

export default function Login() {
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

  const newUser = {
    image: "./assets/user-images/image-zena.jpg",
    name: generateLetter(),
    username: generateLetter() + generateRandomNumber(0, 100),
  };
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      localStorage.setItem("user", JSON.stringify(newUser));
    }
  }, []);
  return (
    <section className="flex items-center flex-col justify-center py-[110px] mb-[55px] text-center bg-white mx-6 md:mx-0 mt-4 rounded-lg">
      <Image
        alt="empty"
        src="/assets/suggestions/illustration-empty.svg"
        className="mx-auto"
        width={130}
        height={135}
      />
      <article className="mt-[53px]">
        <h1 className="font-bold text-[24px] text-secondary-dark-gray mb-4">
          There is no feedback yet.
        </h1>
        <p className="md:w-[410px] mx-6 md:mx-0 text-[16px] text-secondary-light-blue">
          Got a suggestion? Found a bug that needs to be squashed? We love
          hearing about new ideas to improve our app.
        </p>
      </article>
      <button className="bg-primary-voilet text-[13px] font-bold text-white h-10 mt-12 rounded-lg w-[134px]">
        <Image
          alt="down"
          src="/assets/shared/icon-plus.svg"
          className="inline-block mr-2"
          width={8}
          height={8}
        />
        <Link href="/home">Load Feedback</Link>
      </button>
    </section>
  );
}
