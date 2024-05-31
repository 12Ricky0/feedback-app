"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export function Nav() {
  return (
    <section className="md:w-[255px]">
      <nav className="bg-bg-header md:pt-[62px] ">
        <article className="flex justify-between mx-6 items-center ">
          <article className="py-4 ">
            <h1 className="font-bold text-white text-[15px]">
              Frontend Mentor
            </h1>
            <p className="font-medium text-[13px] text-white opacity-50">
              Feedback Board
            </p>
          </article>
          <Image
            alt="burger"
            src="/assets/shared/mobile/icon-hamburger.svg"
            className="md:hidden"
            width={20}
            height={17}
          />
        </article>
      </nav>
      <header></header>
    </section>
  );
}

export function Header() {
  const [sort, setSort] = useState("Most Upvotes");
  const options = [
    "Most Upvotes",
    "Least Upvotes",
    "Most Comments",
    "Least Comments",
  ];
  return (
    <header className="bg-primary-dark-blue flex justify-between items-center py-2">
      <div className="text-[13px] text-secondary-light-gray ml-6">
        <span>Sort by :</span>
        <span className="font-bold mr-2"> {sort}</span>

        <Image
          alt="down"
          src="/assets/shared/icon-arrow-down.svg"
          className="inline-block"
          width={8}
          height={4}
        />
      </div>
      {/* <div>
        <ul>
          {options.map((option) => (
            <li key={options.indexOf(option)}>{option}</li>
          ))}
        </ul>
      </div> */}

      <button className="bg-primary-voilet text-[13px] font-bold text-white h-10 mr-6 rounded-lg w-[134px]">
        <Image
          alt="down"
          src="/assets/shared/icon-plus.svg"
          className="inline-block mr-2"
          width={8}
          height={8}
        />
        Add Feedback
      </button>
    </header>
  );
}
