"use client";

import Image from "next/image";
import data from "../../data.json";
import { useState } from "react";

export default function RmComtainer({ info }: { info: any }) {
  const [roadmap, setRoadmap] = useState("planned");

  function get_alingment(status: string) {
    switch (status) {
      case "in-progress":
        return "md:justify-center";

      case "planned":
        return "md:justify-end";

      default:
        "md:justify-left";
    }
  }
  return (
    <section className="w-full">
      <header className="bg-primary-dark-blue py-[26px] md:rounded-lg flex justify-between items-center">
        <div className="ml-6">
          <div>
            <Image
              alt="ar-left"
              src="/assets/shared/icon-arrow-left.svg"
              className="inline-block mr-4"
              width={8}
              height={8}
            />

            <span className="font-bold text-[13px] text-white">Go Back</span>
          </div>
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

      <article className="m-6 ">
        <h1 className="font-bold text-[18px] text-secondary-dark-gray">
          In-Progess
        </h1>
        <p className="text-[13px] text-secondary-light-blue mt-1">
          Features currently being developed
        </p>
      </article>

      {/* <div className="flex items-start justify-center"> */}
      {info?.map((d: any) => (
        <div
          key={d.id}
          className={`mr-0 items-start flex ${get_alingment(d.status)} ${
            d.status == "suggestion" && "hidden"
          }`}
        >
          <div
            className={`bg-white rounded-lg border-t-[6px] md:w-[350px] ${
              d.status == "planned" && "border-t-tetiary-orange"
            } ${d.status == "live" && "border-t-tetiary-sea-blue"} ${
              d.status == "in-progress" && "border-t-primary-voilet"
            } mx-6 md:mx-0 pb-6 mb-[16px]`}
          >
            <div className="mx-6 marker:text-primary-voilet">
              <li className="marker:text-primary-voilet my-2 text-[13px] text-secondary-light-blue mt-[22px]">
                {d.status}
              </li>
            </div>
            <article className="mx-6 mt-[16px]">
              <h1 className="font-bold text-[13px] text-secondary-dark-gray">
                One-click portfolio generation
              </h1>
              <p className="text-[13px] text-secondary-light-blue my-[9px]">
                Add ability to create professional looking portfolio from
                profile.
              </p>
              <span className="bg-secondary-very-gray px-4 py-[5px] rounded-lg text-primary-light-blue text-[13px] font-semibold">
                Feature
              </span>

              <div className="mt-[16px] flex justify-between items-center">
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
            </article>
          </div>
        </div>
      ))}
      {/* </div> */}
    </section>
  );
}
