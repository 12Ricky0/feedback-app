"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export function Nav() {
  const options = ["ALL", "UI", "UX", "Enhancement", "Bug", "Feature"];
  const [sort, setSort] = useState("ALL");
  const [isOpen, setIsOpen] = useState(false);
  return (
    <section className="md:w-[255px]">
      <nav className="bg-bg-header lg:bg-bg-header-desktop md:pt-[62px] md:rounded-lg md:w-[255px]">
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
            onClick={() => setIsOpen(!isOpen)}
            alt="burger"
            src={`/assets/shared/mobile/${
              isOpen ? "icon-close.svg" : "icon-hamburger.svg"
            }`}
            className="md:hidden"
            width={20}
            height={17}
          />
        </article>
      </nav>
      <div className="absolute md:relative">
        <header className="bg-white rounded-lg my-6 md:w-[255px]">
          <ul className="grid grid-cols-4 grid-rows-3 gap-x-2 gap-y-4 p-6">
            {options.map((option) => (
              <li
                onClick={() => setSort(option)}
                className={` px-4 py-[5px] last:w-[77px] hover:bg-tetiary-sea-blue cursor-pointer ${
                  options.indexOf(option) === 3 && "col-span-2"
                } ${options.indexOf(option) === 4 && "col-span-2 w-[56px]"} ${
                  option == sort
                    ? "text-white bg-primary-light-blue"
                    : "text-primary-light-blue bg-secondary-very-gray"
                } rounded-lg  text-[13px] flex items-center justify-center font-semibold`}
                key={options.indexOf(option)}
              >
                {option}
              </li>
            ))}
          </ul>
        </header>

        <header className="bg-white rounded-lg my-6 pb-6 md:w-[255px]">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="font-bold text-[18px] p-6 text-secondary-light-blue ">
                Roadmap
              </h1>
              <ul className="text-[16px] text-secondary-light-blue list-disc list-inside ml-6">
                <li className="marker:text-tetiary-orange ">Planned</li>
                <li className="marker:text-primary-voilet my-2">In-Progress</li>
                <li className="marker:text-tetiary-sea-blue">Live</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-[13px] text-tetiary-sea-blue p-6">
                View
              </h3>
              <ul className="text-[16px] text-right mr-6 text-secondary-light-blue font-bold">
                <li>3</li>
                <li className="my-2">2</li>
                <li>1</li>
              </ul>
            </div>
          </div>
        </header>
      </div>
    </section>
  );
}

export function Header() {
  const [sort, setSort] = useState("Most Upvotes");
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
            6 Suggestions
          </span>
        </div>
        <div
          className="relative cursor-pointer"
          onClick={() => setSelect(!select)}
        >
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
        {select && (
          <div className="absolute md:top-[170px] top-[140px] w-[200px] md:ml-[190px] bg-white md:w-[255px] shadow-lg shadow-secondary-light-blue rounded-lg">
            <ul className="text-[16px] text-secondary-light-blue cursor-pointer">
              {options.map((option) => (
                <div
                  key={options.indexOf(option)}
                  className="flex items-center justify-between pr-6 border-b last:border-b-0"
                >
                  <li
                    className=" px-4 hover:text-primary-voilet  py-3"
                    onClick={() => setSort(option)}
                  >
                    {option}
                  </li>
                  <Image
                    alt="check"
                    src="/assets/shared/icon-check.svg"
                    className={` ${
                      sort == option ? "inline-block" : "hidden"
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
