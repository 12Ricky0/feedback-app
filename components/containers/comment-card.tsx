"use client";
import { useState } from "react";
import data from "../../data.json";
import Image from "next/image";
import { ReplyForm } from "./forms";

function ReplyCard() {
  const [displayReply, setDisplayReply] = useState(false);

  return (
    <article className="mt-6">
      <div className="flex flex-row mb-4 items-center justify-between">
        <div className="flex gap-4 md:gap-8">
          <Image
            alt="down"
            src="/assets/user-images/image-anne.jpg"
            className="rounded-full"
            width={40}
            height={40}
          />
          <div>
            <h1 className="text-[13px] md:text-[14px] text-secondary-light-blue font-bold">
              Elijah Moss
            </h1>
            <span className="text-[13px] md:text-[14px] text-secondary-light-blue">
              @hexagon.bestagon
            </span>
          </div>
        </div>
        <button
          onClick={() => setDisplayReply(!displayReply)}
          className="text-[13px] text-primary-light-blue font-semibold"
        >
          Reply
        </button>
      </div>
      <div className="pb-">
        <p className="text-[13px] md:ml-[76px] md:text-[15px] text-secondary-light-blue ">
          Also, please allow styles to be applied based on system preferences. I
          would love to be able to browse Frontend Mentor in the evening after
          my device’s dark mode turns on without the bright background it
          currently has.
        </p>
        {displayReply && (
          <div className="ml-[76px]">
            <ReplyForm />
          </div>
        )}{" "}
      </div>
    </article>
  );
}

export default function CommentCard() {
  const [displayReply, setDisplayReply] = useState(false);
  return (
    <section className="bg-white mx-6 md:mx-0 text-[13px] mt-4 rounded-lg">
      <h1 className="mx-6 py-6 font-bold text-[18px] text-secondary-dark-gray">
        4 Comments
      </h1>
      <article className="mx-6 pb-6">
        <div className="flex flex-row mb-4 items-center justify-between">
          <div className="flex gap-4 md:gap-8">
            <Image
              alt="down"
              src="/assets/user-images/image-anne.jpg"
              className="rounded-full"
              width={40}
              height={40}
            />
            <div>
              <h1 className="text-[13px] md:text-[14px] text-secondary-light-blue font-bold">
                Elijah Moss
              </h1>
              <span className="text-[13px] md:text-[14px] text-secondary-light-blue">
                @hexagon.bestagon
              </span>
            </div>
          </div>
          <button
            onClick={() => setDisplayReply(!displayReply)}
            className="text-[13px] text-primary-light-blue font-semibold"
          >
            Reply
          </button>
        </div>
        <div className="md:border-l md:ml-[20px] ">
          <p className="text-[13px] md:ml-[56px] md:text-[15px] text-secondary-light-blue ">
            Also, please allow styles to be applied based on system preferences.
            I would love to be able to browse Frontend Mentor in the evening
            after my device’s dark mode turns on without the bright background
            it currently has.
          </p>
          {displayReply && (
            <div className="ml-[56px]">
              <ReplyForm />
            </div>
          )}
          <div className="border-l md:border-l-0 pl-6 mt-6">
            <ReplyCard />
            <ReplyCard />
          </div>
        </div>
      </article>
      <article className="mx-6 pb-6">
        <div className="flex flex-row mb-4 items-center justify-between">
          <div className="flex gap-4 md:gap-8">
            <Image
              alt="down"
              src="/assets/user-images/image-anne.jpg"
              className="rounded-full"
              width={40}
              height={40}
            />
            <div>
              <h1 className="text-[13px] md:text-[14px] text-secondary-light-blue font-bold">
                Elijah Moss
              </h1>
              <span className="text-[13px] md:text-[14px] text-secondary-light-blue">
                @hexagon.bestagon
              </span>
            </div>
          </div>
          <button
            onClick={() => setDisplayReply(!displayReply)}
            className="text-[13px] text-primary-light-blue font-semibold"
          >
            Reply
          </button>
        </div>
        <div className="md:border-l md:ml-[20px] ">
          <p className="text-[13px] md:ml-[56px] md:text-[15px] text-secondary-light-blue ">
            Also, please allow styles to be applied based on system preferences.
            I would love to be able to browse Frontend Mentor in the evening
            after my device’s dark mode turns on without the bright background
            it currently has.
          </p>
          {displayReply && (
            <div className="ml-[56px]">
              <ReplyForm />
            </div>
          )}
          <div className="border-l md:border-l-0 pl-6 mt-6">
            <ReplyCard />
            <ReplyCard />
          </div>
        </div>
      </article>
    </section>
  );
}
