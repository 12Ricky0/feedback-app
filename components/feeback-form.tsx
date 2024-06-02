"use client";
import Image from "next/image";
import { useState } from "react";

function SelectOption() {
  const options = ["UI", "UX", "Enhancement", "Bug", "Feature"];
  const [sort, setSort] = useState("Feature");

  return (
    <div className="mt-4 bg-white shadow-lg w-full shadow-secondary-light-blue rounded-lg">
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
  );
}

export default function FeedbackForm() {
  const [sort, setSort] = useState("Feature");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="bg-white rounded-lg mx-6 md:mx-0 mt-[35px]">
      <h1 className="text-[18px] mx-6 font-bold text-secondary-dark-gray mb-6 pt-11">
        Create New Feedback
      </h1>

      <form action="" className="mx-6">
        <label
          className="text-[13px] block font-bold text-secondary-dark-gray"
          htmlFor="title"
        >
          Feedback Title
        </label>
        <span className="text-secondary-light-blue text-[13px]">
          Add a short, descriptive headline
        </span>
        <input
          type="text"
          name="title"
          id="title"
          autoComplete="on"
          className="w-full pl-4 text-secondary-light-blue text-[13px] h-12 bg-secondary-very-gray rounded-lg focus:outline-tetiary-sea-blue mt-4"
        />
        <label
          className="text-[13px] block font-bold text-secondary-dark-gray mt-6"
          htmlFor="category"
        >
          Category
        </label>
        <span className="text-secondary-light-blue text-[13px]">
          Choose a category for your feedback
        </span>
        {/* <input
          type="text"
          name="category"
          id="category"
          readOnly
          defaultValue="Header"
          className="w-full pl-4 text-secondary-light-blue text-[13px] h-12 bg-secondary-very-gray rounded-lg focus:outline-tetiary-sea-blue mt-4"
        /> */}
        <div>
          <div
            onClick={() => setIsOpen(!isOpen)}
            className="w-full px-4 text-secondary-light-blue text-[13px] h-12 bg-secondary-very-gray rounded-lg mt-4 flex items-center justify-between"
          >
            <input
              type="text"
              readOnly
              className="focus:outline-none bg-inherit"
              defaultValue={sort}
            />
            <Image
              alt="down"
              src="/assets/shared/icon-arrow-down.svg"
              className="inline-flex"
              width={8}
              height={4}
            />
          </div>
          {isOpen && <SelectOption />}
        </div>

        <label
          className="text-[13px] block font-bold text-secondary-dark-gray mt-6"
          htmlFor="details"
        >
          Feedback Detail
        </label>
        <span className="text-secondary-light-blue text-[13px]">
          Include any specific comments on what should be improved, added, etc.
        </span>
        <textarea
          name="details"
          id="details"
          maxLength={255}
          rows={5}
          autoComplete="on"
          className="w-full pl-4 text-secondary-light-blue text-[13px] h- bg-secondary-very-gray rounded-lg focus:outline-tetiary-sea-blue mt-4"
        />
        <div className="mt-10 pb-6">
          <button
            className="border-none rounded-lg w-full bg-primary-voilet py-[10px] text-white font-bold text-[13px]"
            type="submit"
          >
            Add Feedback
          </button>
          <button
            className="border-none rounded-lg w-full bg-secondary-dark-gray mt-4 py-[10px] text-white font-bold text-[13px]"
            type="submit"
          >
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
}
