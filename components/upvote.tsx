"use client";
import { updateVote } from "@/libs/actions";
import { usePathname } from "next/navigation";
import { useState, useContext } from "react";
import { ProductContext } from "@/user-provider";

export default function Upvotes({ vote, id }: { vote: number; id: string }) {
  const { voted, setVoted }: any = useContext(ProductContext);
  const [userVote, setUserVote] = useState(vote);
  const path = usePathname();
  const increase = vote + 1;
  const decrease = vote - 1;
  function handleClick() {
    if (userVote) {
      // console.log(vote - 1);
      // setVoted(!voted);
      // setUserVote(vote - 1);
      // setVoted(!voted);
    } else {
      // console.log(vote + 1);
      // setUserVote(vote + 1);
      // setVoted(!voted);
      // setVoted(!voted);
    }
    setVoted(!voted);

    updateVote(id, voted ? decrease : increase);
    // console.log(voted);
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
