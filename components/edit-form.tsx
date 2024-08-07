"use client";
import Image from "next/image";
import { useState, useContext } from "react";
import Back from "./back";
import { ProductRequest } from "@/libs/definitions";
import { ProductContext } from "@/user-provider";
import { useFormState } from "react-dom";
import { updatePost, deletePost } from "@/libs/actions";
import { useRouter } from "next/navigation";

function SelectOption() {
  const options = ["UI", "UX", "Enhancement", "Bug", "Feature"];
  const { editCat, setEditCat }: any = useContext(ProductContext);

  return (
    <div className="mt-4 bg-white absolute right-0 mx-6 left-0 shadow-lg shadow-secondary-light-blue rounded-lg">
      <ul className="text-[16px] text-secondary-light-blue cursor-pointer">
        {options.map((option) => (
          <div
            key={options.indexOf(option)}
            className="flex items-center justify-between pr-6 border-b last:border-b-0"
          >
            <li
              className=" px-4 hover:text-primary-voilet  py-3"
              onClick={() => setEditCat(option)}
            >
              {option}
            </li>
            <Image
              alt="check"
              src="/assets/shared/icon-check.svg"
              className={` ${
                editCat == option ? "inline-block" : "hidden"
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

function Status() {
  const options = ["Suggestions", "Planned", "In-Progress", "Live"];
  const { status, setStatus }: any = useContext(ProductContext);

  return (
    <div className="mt-4 bg-white absolute right-0 mx-6 left-0 shadow-lg shadow-secondary-light-blue rounded-lg">
      <ul className="text-[16px] text-secondary-light-blue cursor-pointer">
        {options.map((option) => (
          <div
            key={options.indexOf(option)}
            className="flex items-center justify-between pr-6 border-b last:border-b-0"
          >
            <li
              className=" px-4 hover:text-primary-voilet  py-3"
              onClick={() => setStatus(option)}
            >
              {option}
            </li>
            <Image
              alt="check"
              src="/assets/shared/icon-check.svg"
              className={` ${
                status == option ? "inline-block" : "hidden"
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

export default function EditForm({ product }: { product: ProductRequest }) {
  const { editCat, status }: any = useContext(ProductContext);
  const [isOpen, setIsOpen] = useState(false);
  const [isStatus, setIsStatus] = useState(false);
  const [message, formAction] = useFormState(updatePost, null);
  const router = useRouter();
  function getCat(cat: string) {
    switch (cat) {
      case "enhancement" || "Enhancement":
        return "Enhancement";
      case "bug" || "Bug":
        return "Bug";
      case "feature" || "Feature":
        return "Feature";
      case "UX" || "ux":
        return "UX";
      case "ui" || "UI":
        return "UI";
    }
  }
  function getStatus(status: string) {
    switch (status) {
      case "suggestion" || "Suggestion":
        return "Suggestion";
      case "planned" || "Planned":
        return "Planned";
      case "in-progress" || "In-Progress":
        return "In-Progress";
      case "live" || "Live":
        return "Live";
    }
  }
  return (
    <div>
      <div className="mx-6 md:mx-0">
        <Back />
      </div>
      <section className="bg-white rounded-lg mx-6 md:mx-0 mt-[35px] md:mt-10 relative">
        <Image
          alt="check"
          src="/assets/shared/icon-edit-feedback.svg"
          width={40}
          height={40}
          className="absolute md:size-14 md:-translate-y-7 -translate-y-5 mx-6"
        />
        <h1 className="text-[18px] md:text-[24px] mx-6 font-bold text-secondary-dark-gray mb-6 pt-11">
          Editing ´{product.title}´
        </h1>

        <form action={formAction} className="mx-6">
          <label
            className="text-[13px] md:text-[14px] block font-bold text-secondary-dark-gray"
            htmlFor="title"
          >
            Feedback Title
          </label>
          <span className="text-secondary-light-blue md:text-[14px] text-[13px]">
            Add a short, descriptive headline
          </span>
          <input type="hidden" name="post_id" value={product?._id} />

          <input
            type="text"
            name="title"
            id="title"
            autoComplete="on"
            defaultValue={product?.title}
            className="w-full pl-4 text-secondary-dark-gray text-[13px] h-12 bg-secondary-very-gray rounded-lg focus:outline-tetiary-sea-blue mt-4"
          />
          {message?.errors.title && (
            <div className="">
              <p className="text-[13px] md:text-[14px] text-tetiary-red">
                {message.errors.title}
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
              className="w-full px-4 text-secondary-dark-gray md:text-[14px] text-[13px] h-12 bg-secondary-very-gray rounded-lg mt-4 flex items-center justify-between"
            >
              <input
                type="text"
                readOnly
                name="cat"
                className="focus:outline-none bg-inherit"
                value={editCat ? editCat : getCat(product.category)}
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

          <span className="text-[13px] md:text-[14px] block font-bold text-secondary-dark-gray mt-6">
            Update Status
          </span>
          <span className="text-secondary-light-blue md:text-[14px] text-[13px]">
            Change feedback state
          </span>

          <div>
            <div
              onClick={() => setIsStatus(!isStatus)}
              className="w-full px-4 text-secondary-dark-gray md:text-[14px] text-[13px] h-12 bg-secondary-very-gray rounded-lg mt-4 flex items-center justify-between"
            >
              <input
                type="text"
                name="status"
                readOnly
                className="focus:outline-none bg-inherit"
                value={status ? status : getStatus(product.status)}
              />
              <Image
                alt="down"
                src={`/assets/shared/icon-arrow-${
                  isStatus ? "up" : "down"
                }.svg`}
                className="inline-flex"
                width={8}
                height={4}
              />
            </div>
            {isStatus && <Status />}
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
            defaultValue={product?.description}
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

          <div className="mt-10 pb-6 md:flex flex-row-reverse justify-between gap-4">
            <div className=" md:flex flex-row-reverse gap-4">
              <button
                className="border-none rounded-lg hover:bg-violet-400 w-full bg-primary-voilet py-[10px] md:w-[144px] text-white font-bold text-[13px]"
                type="submit"
              >
                Save Changes
              </button>
              <button
                onClick={router.back}
                className="border-none rounded-lg md:w-[93px] w-full hover:bg-secondary-light-blue bg-secondary-dark-gray mt-4 md:mt-0 py-[10px] text-white font-bold text-[13px]"
              >
                Cancel
              </button>
            </div>
            <button
              onClick={() => deletePost(product._id)}
              className="border-none hover:bg-red-400 rounded-lg md:w-[93px] w-full bg-tetiary-red mt-4 md:mt-0 py-[10px] text-white font-bold text-[13px]"
            >
              Delete
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
