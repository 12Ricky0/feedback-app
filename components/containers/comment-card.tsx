"use client";
import { useState } from "react";
import data from "../../data.json";
import Image from "next/image";

function Reply() {}

export default function CommentCard() {
  return (
    <section className="bg-white mx-6 md:mx-0 text-[13px] mt-4 rounded-lg">
      <h1 className="mx-6 py-6 font-bold text-[18px] text-secondary-dark-gray">
        4 Comments
      </h1>
      <article className="mx-6 pb-6">
        <div className="flex flex-row mb-4 items-center justify-between">
          <div className="flex gap-4">
            <Image
              alt="down"
              src="/assets/user-images/image-anne.jpg"
              className="rounded-full"
              width={40}
              height={40}
            />
            <div>
              <h1 className="text-[13px] text-secondary-light-blue font-bold">
                Elijah Moss
              </h1>
              <span className="text-[13px] text-secondary-light-blue">
                @hexagon.bestagon
              </span>
            </div>
          </div>
          <button className="text-[13px] text-primary-light-blue font-semibold">
            Reply
          </button>
        </div>
        <p className="text-[13px] text-secondary-light-blue border-b pb-6">
          Also, please allow styles to be applied based on system preferences. I
          would love to be able to browse Frontend Mentor in the evening after
          my device’s dark mode turns on without the bright background it
          currently has.
        </p>
      </article>
      <article className="mx-6 pb-6">
        <div className="flex flex-row mb-4 items-center justify-between">
          <div className="flex gap-4">
            <Image
              alt="down"
              src="/assets/user-images/image-anne.jpg"
              className="rounded-full"
              width={40}
              height={40}
            />
            <div>
              <h1 className="text-[13px] text-secondary-light-blue font-bold">
                Elijah Moss
              </h1>
              <span className="text-[13px] text-secondary-light-blue">
                @hexagon.bestagon
              </span>
            </div>
          </div>
          <button className="text-[13px] text-primary-light-blue font-semibold">
            Reply
          </button>
        </div>
        <p className="text-[13px] text-secondary-light-blue border-b pb-6">
          Also, please allow styles to be applied based on system preferences. I
          would love to be able to browse Frontend Mentor in the evening after
          my device’s dark mode turns on without the bright background it
          currently has.
        </p>
      </article>
    </section>
  );
}
