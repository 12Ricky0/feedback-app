"use client";
import { useState, useContext } from "react";
import { ProductContext } from "@/user-provider";

export default function SideMenu() {
  const options = ["ALL", "UI", "UX", "Enhancement", "Bug", "Feature"];
  // const [sort, setSort] = useState("ALL");
  const { sort, setSort }: any = useContext(ProductContext);

  return (
    <section>
      <div className="absolute md:relative z-50 overlay">
        <div className="w-[72%] md:w-0 bg-secondary-very-gray md:bg-transparent px-6 pt-6 md:px-0 md:pt-0 absolute md:relative right-0  h-full md:h-0">
          <div className="md:inline-flex lg:inline-block justify-between gap-[10px]">
            <header className="bg-white rounded-lg my-6 md:my-0 lg:my-6 md:w-[223px] lg:w-[255px] md:h-[178px] lg-h-[166px]">
              <ul className="grid grid-cols-4 grid-rows-3 gap-x-2 gap-y-4 p-6">
                {options.map((option) => (
                  <li
                    onClick={() => setSort(option)}
                    className={` px-4 py-[5px] last:w-[77px] hover:bg-tetiary-sea-blue cursor-pointer ${
                      options.indexOf(option) === 3 && "col-span-2"
                    } ${
                      options.indexOf(option) === 4 && "col-span-2 w-[56px]"
                    } ${
                      option == sort
                        ? "text-white bg-primary-light-blue"
                        : "text-primary-light-blue bg-secondary-very-gray"
                    } rounded-lg  text-[13px] flex items-center justify-center font-semibold`}
                    key={options.indexOf(option)}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            </header>

            <header className="bg-white rounded-lg my-6 md:my-0 lg:my-6 pb-6 md:w-[223px] md:h-[178px] lg:w-[255px]">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="font-bold text-[18px] p-6 text-secondary-light-blue ">
                    Roadmap
                  </h1>
                  <ul className="text-[16px] text-secondary-light-blue list-disc list-inside ml-6">
                    <li className="marker:text-tetiary-orange ">Planned</li>
                    <li className="marker:text-primary-voilet my-2">
                      In-Progress
                    </li>
                    <li className="marker:text-tetiary-sea-blue">Live</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-[13px] text-tetiary-sea-blue p-6">
                    View
                  </h3>
                  <ul className="text-[16px] text-right mr-6 text-secondary-light-blue font-bold">
                    <li>3</li>
                    <li className="my-2">2</li>
                    <li>1</li>
                  </ul>
                </div>
              </div>
            </header>
          </div>
        </div>
      </div>
    </section>
  );
}
