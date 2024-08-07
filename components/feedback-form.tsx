"use client";
import Image from "next/image";
import { useState, useContext } from "react";
import Back from "./back";
import { ProductContext } from "@/user-provider";
import { useRouter } from "next/navigation";
import { useFormState } from "react-dom";
import { createFeedback } from "@/libs/actions";

function SelectOption() {
  const options = ["UI", "UX", "Enhancement", "Bug", "Feature"];
  const { category, setCategory }: any = useContext(ProductContext);

  return (
    <div className="mt-4 bg-white absolute right-0 mx-6 md:mx-[42px] left-0 shadow-lg shadow-secondary-light-blue rounded-lg">
      <ul className="text-[16px] text-secondary-light-blue cursor-pointer">
        {options?.map((option) => (
          <div
            key={options.indexOf(option)}
            className="flex items-center justify-between pr-6 border-b last:border-b-0"
          >
            <li
              className=" px-4 hover:text-primary-voilet  py-3"
              onClick={() => setCategory(option)}
            >
              {option}
            </li>
            <Image
              alt="check"
              src="/assets/shared/icon-check.svg"
              className={` ${
                category == option ? "inline-block" : "hidden"
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
  const [isOpen, setIsOpen] = useState(false);
  const { category, currentUser }: any = useContext(ProductContext);

  const [message, formAction] = useFormState(createFeedback, null);

  const router = useRouter();
  return (
    <div>
      <div className="mx-6 md:mx-0">
        <Back />
      </div>
      <section className="bg-white rounded-lg mx-6 md:mx-0 mt-[35px] mb-[70px] md:mb-0 md:mt-10 relative">
        <Image
          alt="check"
          src="/assets/shared/icon-new-feedback.svg"
          width={40}
          height={40}
          className="absolute md:size-14 md:-translate-y-6 -translate-y-5 mx-6 md:mx-[42px]"
        />
        <h1 className="text-[18px] md:text-[24px] mx-6 md:mx-[42px] font-bold text-secondary-dark-gray mb-6 pt-11">
          Create New Feedback
        </h1>

        <form action={formAction} className="mx-6 md:mx-[42px]">
          <label
            className="text-[13px] md:text-[14px] block font-bold text-secondary-dark-gray"
            htmlFor="title"
          >
            Feedback Title
          </label>
          <span className="text-secondary-light-blue md:text-[14px] text-[13px]">
            Add a short, descriptive headline
          </span>
          <input
            type="text"
            name="title"
            id="title"
            autoComplete="on"
            className={`w-full pl-4 text-secondary-light-blue text-[13px] h-12 ${
              message?.errors.title && "outline-tetiary-red outline-1 outline"
            } bg-secondary-very-gray rounded-lg focus:outline-tetiary-sea-blue mt-4`}
          />
          <input
            hidden
            value={currentUser && currentUser.username}
            name="user"
          />
          {message?.errors.title && (
            <div className="">
              <p className="text-[13px] md:text-[14px] text-tetiary-red">
                {message.errors.description}
              </p>
            </div>
          )}

          <span className="text-[13px] md:text-[14px] block font-bold text-secondary-dark-gray mt-6">
            Category
          </span>
          <span className="text-secondary-light-blue md:text-[14px] text-[13px]">
            Choose a category for your feedback
          </span>
          <div>
            <div
              onClick={() => setIsOpen(!isOpen)}
              className="w-full px-4 text-secondary-light-blue md:text-[14px] text-[13px] h-12 bg-secondary-very-gray rounded-lg mt-4 flex items-center justify-between"
            >
              <input
                type="text"
                name="cat"
                readOnly
                className="focus:outline-none bg-inherit"
                value={category}
              />
              <Image
                alt="down"
                src={`/assets/shared/icon-arrow-${isOpen ? "up" : "down"}.svg`}
                className="inline-flex"
                width={8}
                height={4}
              />
            </div>
            {isOpen && <SelectOption />}
          </div>

          <label
            className="text-[13px] md:text-[14px] block font-bold text-secondary-dark-gray mt-6"
            htmlFor="details"
          >
            Feedback Detail
          </label>
          <span className="text-secondary-light-blue md:text-[14px] text-[13px]">
            Include any specific comments on what should be improved, added,
            etc.
          </span>
          <textarea
            name="details"
            id="details"
            maxLength={255}
            rows={5}
            autoComplete="on"
            className={`w-full pl-4 text-secondary-light-blue text-[13px] ${
              message?.errors.description &&
              "outline-tetiary-red outline-1 outline"
            } bg-secondary-very-gray rounded-lg focus:outline-tetiary-sea-blue mt-4`}
          />
          {message?.errors.description && (
            <div className="">
              <p className="text-[13px] md:text-[14px] text-tetiary-red">
                {message.errors.description}
              </p>
            </div>
          )}
          <div className="mt-10 pb-6 md:flex flex-row-reverse gap-4">
            <button
              className="border-none rounded-lg w-full bg-primary-voilet py-[10px] md:w-[144px] text-white font-bold text-[13px]"
              type="submit"
            >
              Add Feedback
            </button>
            <button
              onClick={router.back}
              className="border-none rounded-lg md:w-[93px] w-full bg-secondary-dark-gray mt-4 md:mt-0 py-[10px] text-white font-bold text-[13px]"
            >
              Cancel
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
