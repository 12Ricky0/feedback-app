"use client";

import Image from "next/image";
import { ProductContext } from "@/user-provider";
import { useContext } from "react";

export default function FeedbackContainer({ data }: { data: any }) {
  const { sort }: any = useContext(ProductContext);
  let items = data.filter((item) => item.category == sort.toLowerCase());
  console.log(sort);

  return items.map((item) => (
    <section
      key={item.id}
      className="bg-white mx-6 md:mx-0 text-[13px] mt-4 rounded-lg"
    >
      <article className="p-6 md:flex justify-between items-center">
        <div className="md:inline-flex gap-10">
          <div className="bg-secondary-very-gray rounded-lg w-[69px] h-8 md:w-10 md:h-[53px] items-center md:flex-col justify-center hidden md:inline-flex">
            <Image
              alt="down"
              src="/assets/shared/icon-arrow-up.svg"
              className="inline-block mr-2 md:mr-0 md:mb-2"
              width={8}
              height={4}
            />

            <span className="font-bold">112</span>
          </div>

          <article>
            <h1 className="text-secondary-dark-gray md:text-[18px] font-bold">
              Add tags for solutions
            </h1>
            <p className="my-2 text-secondary-light-blue md:text-[16px]">
              Easier to search for solutions based on a specific stack.
            </p>
            <span className="bg-secondary-very-gray px-4 py-[5px] rounded-lg text-primary-light-blue text-[13px] font-semibold">
              Enhancement
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
          <span className="font-bold ">2</span>
        </div>

        {/* mobile view */}
        <div className="flex justify-between mt-4 items-center md:hidden">
          <div className="bg-secondary-very-gray rounded-lg w-[69px] h-8 inline-flex items-center justify-center ">
            <Image
              alt="down"
              src="/assets/shared/icon-arrow-up.svg"
              className="inline-block mr-2"
              width={8}
              height={4}
            />

            <span className="font-bold">112</span>
          </div>
          <div className="">
            <Image
              alt="down"
              src="/assets/shared/icon-comments.svg"
              className="inline-block mr-2"
              width={18}
              height={16}
            />
            <span className="font-bold ">2</span>
          </div>
        </div>
        {/* mobile view */}
      </article>
    </section>
  ));
}
