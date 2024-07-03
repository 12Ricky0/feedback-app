"use client";
import { updateVote } from "@/libs/actions";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Upvotes({ vote, id }: { vote: number; id: string }) {
  const [voted, setVoted] = useState(false);
  const path = usePathname();
  function handleClick() {
    updateVote(id);
    setVoted(!voted);
  }

  return (
    <div
      className={`b ${
        voted ? "bg-primary-light-blue" : "bg-secondary-very-gray"
      } hover:bg-tetiary-hov cursor-pointer rounded-lg ${
        path.endsWith("roadmap")
          ? "md:h-8 inline-flex"
          : "md:h-[53px] md:w-10 flex md:flex-col"
      } w-[69px] h-8  items-center  justify-center `}
    >
      <input type="hidden" name="post_id" value={id} />

      <div
        onClick={handleClick}
        className={`inline-block ${
          path.endsWith("roadmap") ? "" : "md:mr-0 md:mb-2"
        } mr-2 `}
      >
        <svg width="10" height="7" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M1 6l4-4 4 4"
            stroke={`${voted ? "white" : "#4661E6"}`}
            stroke-width="2"
            fill="none"
            fill-rule="evenodd"
          />
        </svg>
      </div>
      <span
        className={`font-bold ${voted && "text-white"} ${
          path.endsWith("roadmap") && "text-[13px]"
        }`}
      >
        {vote}
      </span>
    </div>
  );
}
