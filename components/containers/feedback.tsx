"use client";

import Image from "next/image";
import { ProductContext } from "@/user-provider";
import { useContext } from "react";
import { Header } from "../header";
import Upvotes from "../upvote";
import Empty from "../empty";
import { ProductRequest } from "@/libs/definitions";

export default function FeedbackContainer({
  data,
}: {
  data: ProductRequest[];
}) {
  const { sort, sortBy }: any = useContext(ProductContext);
  let items: ProductRequest[];
  sort == "ALL"
    ? (items = data)
    : (items = data.filter(
        (item: ProductRequest) => item.category == sort.toLowerCase()
      ));
  // console.log(items);

  function sort_data() {
    return items.sort((a: ProductRequest, b: ProductRequest) => {
      switch (sortBy) {
        case "Most Comments":
          return b.comments.length - a.comments.length;
        case "Least Comments":
          return a.comments.length - b.comments.length;
        case "Least Upvotes":
          return a.upvotes - b.upvotes;
        default:
          return b.upvotes - a.upvotes;
      }
    });
  }

  function get_status(status: string) {
    switch (status) {
      case "enhancement":
        return "Enhancement";

      case "bug":
        return "Bug";
      case "feature":
        return "Feature";
      case "UX":
        return "UX";
      case "UI":
        return "UI";
    }
  }

  return (
    <section>
      <Header count={items.length} />
      {items.length > 0 ? (
        sort_data().map((item) => (
          <div
            key={item.id}
            className="bg-white mx-6 last:mb-[55px] md:mx-0 text-[13px] mt-4 rounded-lg"
          >
            <article className="p-6 md:flex justify-between items-center">
              <div className="md:inline-flex gap-10">
                <Upvotes vote={item.upvotes} />
                <article>
                  <h1 className="text-secondary-dark-gray md:text-[18px] font-bold">
                    {item.title}
                  </h1>
                  <p className="mt-2 mb-[12px] text-secondary-light-blue md:text-[16px]">
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
        ))
      ) : (
        <Empty />
      )}
    </section>
  );
}
