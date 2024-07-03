"use client";

import Image from "next/image";
import { useState } from "react";
import Back from "../back";
import { ProductRequest } from "@/libs/definitions";
import StatusContainer from "./status";
import Link from "next/link";

export default function RmComtainer({ info }: { info: ProductRequest[] }) {
  const [roadmap, setRoadmap] = useState("planned");
  const planned = info.filter((d) => d.status === "planned");
  const progress = info.filter((d) => d.status === "in-progress");
  const live = info.filter((d) => d.status === "live");

  // let total = 0;
  // item.comments.forEach((comment: Comment) => {
  //   total++;
  //   if (comment.replies) {
  //     total += comment.replies.length;
  //   }
  // });

  return (
    <section className="">
      <header className="bg-primary-dark-blue py-[26px] md:rounded-lg flex justify-between items-center">
        <div className="md:ml-6">
          <Back className="text-white mx-0 mt-0 " />
          <h1 className="font-bold ml-6 md:ml-0 text-[18px] md:text-[24px] text-white">
            Roadmap
          </h1>
        </div>
        <button className="bg-primary-voilet hover: text-[13px] font-bold text-white h-10 mr-6 rounded-lg w-[134px]">
          <Image
            alt="down"
            src="/assets/shared/icon-plus.svg"
            className="inline-block mr-2"
            width={8}
            height={8}
          />
          <Link href="/feedback/add">Add Feedback</Link>{" "}
        </button>
      </header>

      <div className="border-b py-[16p]  md:hidden text-secondary-dark-gray  text-[13px] font-bold flex justify-between">
        <h1
          onClick={() => setRoadmap("planned")}
          className={`ml-6 pt-[20px] ${
            roadmap == "planned"
              ? "border-b-[6px] border-b-tetiary-orange pb-[16px] opacity-100"
              : "opacity-50"
          }`}
        >
          Planned ({planned.length})
        </h1>
        <h1
          onClick={() => setRoadmap("in-progress")}
          className={` pt-[20px] ${
            roadmap == "in-progress"
              ? "border-b-[6px] border-b-primary-voilet pb-[16px] opacity-100"
              : "opacity-50"
          }`}
        >
          In-Progess ({progress.length})
        </h1>
        <h1
          onClick={() => setRoadmap("live")}
          className={`mr-6 pt-[20px] ${
            roadmap == "live"
              ? "border-b-[6px] border-b-tetiary-sea-blue pb-[16px] opacity-100"
              : "opacity-50"
          }`}
        >
          Live ({live.length})
        </h1>
      </div>

      <section className="md:flex md:flex-row justify-center mx-auto max-w-[1100px] w-full lg:gap-[30px] md:gap-[10px]">
        <div
          className={`${roadmap == "planned" ? "block" : "hidden"} md:block`}
        >
          <article className="m-6 md:mx-0">
            <h1 className="font-bold md:text-[14px] lg:text-[18px] text-secondary-dark-gray">
              Planned ({planned.length})
            </h1>
            <p className="text-[13px] md:text-[14px] lg:text-[16px] text-secondary-light-blue mt-1">
              Ideas prioritized for research
            </p>
          </article>

          {planned?.map((d: any) => (
            <div key={d.id}>
              <StatusContainer
                id={d._id}
                status={d.status}
                title={d.title}
                description={d.description}
                upvotes={d.upvotes}
                comments={d.comments.length}
                category={d.category}
              />
            </div>
          ))}
        </div>
        <div
          className={`${
            roadmap == "in-progress" ? "block" : "hidden"
          } md:block`}
        >
          <article className="m-6 md:mx-0">
            <h1 className="font-bold md:text-[14px] lg:text-[18px] text-secondary-dark-gray">
              In-Progess ({progress.length})
            </h1>
            <p className="text-[13px] md:text-[14px] lg:text-[16px] text-secondary-light-blue mt-1">
              Currently being developed
            </p>
          </article>

          {progress?.map((d: any) => (
            <div key={d.id}>
              <StatusContainer
                id={d._id}
                status={d.status}
                title={d.title}
                description={d.description}
                upvotes={d.upvotes}
                comments={d.comments.length}
                category={d.category}
              />
            </div>
          ))}
        </div>
        <div className={`${roadmap == "live" ? "block" : "hidden"} md:block`}>
          <article className="m-6 md:mx-0">
            <h1 className="font-bold md:text-[14px] lg:text-[18px] text-secondary-dark-gray">
              Live ({live.length})
            </h1>
            <p className="text-[13px] md:text-[14px] lg:text-[16px] text-secondary-light-blue mt-1">
              Released features
            </p>
          </article>

          {live?.map((d: any) => (
            <div key={d.id}>
              <StatusContainer
                id={d._id}
                status={d.status}
                title={d.title}
                description={d.description}
                upvotes={d.upvotes}
                comments={d.comments.length}
                category={d.category}
              />
            </div>
          ))}
        </div>
      </section>
    </section>
  );
}
