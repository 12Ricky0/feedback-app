import Link from "next/link";
import Image from "next/image";
import Upvotes from "../upvote";
import { ProductRequest } from "@/libs/definitions";

export default function ProductCard({ item }: { item: ProductRequest }) {
  function get_status(status: string) {
    switch (status) {
      case "enhancement":
        return "Enhancement";

      case "bug":
        return "Bug";
      case "feature":
        return "Feature";
      case "UX" || "ux":
        return "UX";
      case "UI" || "ui":
        return "UI";
    }
  }
  return (
    <div className="bg-white group mx-6 md:mx-0 text-[13px] mt-4 cursor-pointer rounded-lg">
      <article className="p-6 md:flex justify-between items-center">
        <div className="md:inline-flex">
          <div className="hidden md:inline-flex">
            <Upvotes vote={item.upvotes} />
          </div>
          <article className="mx-10">
            <h1 className="text-secondary-dark-gray group-hover:text-primary-light-blue md:text-[18px] font-bold">
              {item.title}
            </h1>
            <p className="mt-2 mb-[12px]  text-secondary-light-blue md:text-[16px]">
              {item.description}
            </p>
            <span className="bg-secondary-very-gray px-4 py-[5px] rounded-lg text-primary-light-blue text-[13px] font-semibold">
              {get_status(item.category)}
            </span>
          </article>
        </div>
        <div className="hidden md:inline-flex items-center">
          <Image
            alt="down"
            src="/assets/shared/icon-comments.svg"
            className="mr-2"
            width={18}
            height={16}
          />
          <span
            className={`${
              item.comments.length === 0 && "opacity-40"
            } font-bold md:text-[16px]`}
          >
            {item.comments.length}
          </span>
        </div>
        {/* mobile view */}
        <div className="flex justify-between mt-4 items-center md:hidden">
          <Upvotes vote={item.upvotes} />
          <div className="flex items-center">
            <Image
              alt="down"
              src="/assets/shared/icon-comments.svg"
              className=" mr-2"
              width={18}
              height={16}
            />
            <span
              className={`${
                item.comments.length === 0 && "opacity-40"
              } font-bold md:text-[16px]`}
            >
              {item.comments.length}
            </span>{" "}
          </div>
        </div>
        {/* mobile view */}
      </article>
    </div>
  );
}
