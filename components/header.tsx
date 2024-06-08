"use client";

import { useState, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import SideMenu from "./side-menu";
import { ProductContext } from "@/user-provider";
import { ProductRequest } from "@/libs/definitions";

export function Nav({ data }: { data: ProductRequest[] }) {
  // const options = ["ALL", "UI", "UX", "Enhancement", "Bug", "Feature"];
  // const [sort, setSort] = useState("ALL");
  const live = data.filter((d) => d.status === "live");
  const progress = data.filter((d) => d.status === "in-progress");
  const planned = data.filter((d) => d.status === "planned");
  const [isOpen, setIsOpen] = useState(false);
  return (
    <section className=" md:flex  lg:inline-block gap-[10px]">
      <nav className="bg-bg-header md:flex lg:bg-bg-header-desktop bg-center md:bg-bg-header-tablet md:pt-[62x] bg-no-repeat bg-cover md:rounded-lg md:w-[240px] lg:w-[255px] md:h-[178px] lg:h-[137px]">
        <article className="flex justify-between mx-6 items-center md:items-end ">
          <article className="py-4">
            <h1 className="font-bold text-white text-[15px] md:text-[20px]">
              Frontend Mentor
            </h1>
            <p className="font-medium text-[13px] md:text-[15px] text-white opacity-50">
              Feedback Board
            </p>
          </article>
          <Image
            onClick={() => setIsOpen(!isOpen)}
            alt="burger"
            src={`/assets/shared/mobile/${
              isOpen ? "icon-close.svg" : "icon-hamburger.svg"
            }`}
            className="md:hidden "
            width={20}
            height={17}
          />
        </article>
      </nav>

      {isOpen && (
        <SideMenu
          live={live.length}
          progress={progress.length}
          planned={planned.length}
        />
      )}
      <div className="hidden md:block">
        <SideMenu
          live={live.length}
          progress={progress.length}
          planned={planned.length}
        />
      </div>
    </section>
  );
}

export function Header({ count }: { count: number }) {
  const { sortBy, setSortBy }: any = useContext(ProductContext);
  const [select, setSelect] = useState(false);
  const options = [
    "Most Upvotes",
    "Least Upvotes",
    "Most Comments",
    "Least Comments",
  ];
  return (
    <header className="bg-primary-dark-blue flex justify-between items-center py-2 md:py-[14px] md:rounded-lg">
      <div className="text-[13px] md:text-[14px] inline-flex items-center gap-[38px] text-secondary-light-gray ml-6">
        <div className="hidden md:inline-flex items-center ">
          <Image
            alt="suggestion"
            src="/assets/suggestions/icon-suggestions.svg"
            className="mr-4"
            width={23}
            height={24}
          />
          <span className="font-bold text-white text-[18px]">
            {count} Suggestions
          </span>
        </div>
        <div
          className="relative cursor-pointer"
          onClick={() => setSelect(!select)}
        >
          <span>Sort by :</span>
          <span className="font-bold mr-2"> {sortBy}</span>

          <Image
            alt="down"
            src="/assets/shared/icon-arrow-down.svg"
            className="inline-block"
            width={8}
            height={4}
          />
        </div>
        {select && (
          <div className="absolute md:top-[350px] lg:top-[170px] top-[140px] w-[200px] md:ml-[190px] bg-white md:w-[255px] shadow-lg shadow-secondary-light-blue rounded-lg">
            <ul className="text-[16px] text-secondary-light-blue cursor-pointer">
              {options.map((option) => (
                <div
                  key={options.indexOf(option)}
                  className="flex items-center justify-between pr-6 border-b last:border-b-0"
                >
                  <li
                    className=" px-4 hover:text-primary-voilet  py-3"
                    onClick={() => setSortBy(option)}
                  >
                    {option}
                  </li>
                  <Image
                    alt="check"
                    src="/assets/shared/icon-check.svg"
                    className={` ${
                      sortBy == option ? "inline-block" : "hidden"
                    } ease-in-out duration-200`}
                    width={11}
                    height={8}
                  />
                </div>
              ))}
            </ul>
          </div>
        )}
      </div>

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
