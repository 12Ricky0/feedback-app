"use client";

import Image from "next/image";
import { useState } from "react";
import Back from "../back";
import { ProductRequest } from "@/libs/definitions";
import StatusContainer from "./status";

export default function RmComtainer({ info }: { info: ProductRequest[] }) {
  const [roadmap, setRoadmap] = useState("planned");
  const planned = info.filter((d) => d.status === "planned");
  const progress = info.filter((d) => d.status === "in-progress");
  const live = info.filter((d) => d.status === "live");

  return (
    <section className="">
      <header className="bg-primary-dark-blue py-[26px] md:rounded-lg flex justify-between items-center">
        <div className="ml-6">
          {/* <div>
            <Image
              alt="ar-left"
              src="/assets/shared/icon-arrow-left.svg"
              className="inline-block mr-4"
              width={8}
              height={8}
            />

            <span className="font-bold text-[13px] text-white">Go Back</span>
          </div> */}
          <Back />
          <h1 className="font-bold text-[18px] text-white">Roadmap</h1>
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

      <div className="border-b py-[16p]  md:hidden text-secondary-dark-gray opacity-50 text-[13px] font-bold flex justify-between">
        <h1
          onClick={() => setRoadmap("planned")}
          className={`ml-6 pt-[20px] ${
            roadmap == "planned" &&
            "border-b-[6px] border-b-tetiary-orange pb-[16px] "
          }`}
        >
          Planned (2)
        </h1>
        <h1
          onClick={() => setRoadmap("in-progress")}
          className={` pt-[20px] ${
            roadmap == "in-progress" &&
            "border-b-[6px] border-b-primary-voilet pb-[16px] "
          }`}
        >
          In-Progress (2)
        </h1>
        <h1
          onClick={() => setRoadmap("live")}
          className={`mr-6 pt-[20px] ${
            roadmap == "live" &&
            "border-b-[6px] border-b-tetiary-sea-blue pb-[16px] "
          }`}
        >
          Live (2)
        </h1>
      </div>

      <section className="md:flex md:flex-col lg:flex-row justify-center mx-auto max-w-[1100px] w-full gap-[30px]">
        <div>
          <article className="m-6 ">
            <h1 className="font-bold text-[18px] text-secondary-dark-gray">
              Planned ({planned.length})
            </h1>
            <p className="text-[13px] text-secondary-light-blue mt-1">
              Features currently being developed
            </p>
          </article>

          {planned?.map((d: any) => (
            <div key={d.id}>
              <StatusContainer
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
        <div>
          <article className="m-6 ">
            <h1 className="font-bold text-[18px] text-secondary-dark-gray">
              In-Progess ({progress.length})
            </h1>
            <p className="text-[13px] text-secondary-light-blue mt-1">
              Features currently being developed
            </p>
          </article>

          {progress?.map((d: any) => (
            <div key={d.id}>
              <StatusContainer
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
        <div>
          <article className="m-6 ">
            <h1 className="font-bold text-[18px] text-secondary-dark-gray">
              Live ({live.length})
            </h1>
            <p className="text-[13px] text-secondary-light-blue mt-1">
              Features currently being developed
            </p>
          </article>

          {live?.map((d: any) => (
            <div key={d.id}>
              <StatusContainer
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
