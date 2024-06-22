"use client";
import Image from "next/image";
import { updateVote } from "@/libs/actions";
import { useFormState } from "react-dom";

export default function Upvotes({ vote, id }: { vote: number; id: string }) {
  function handleClick() {
    updateVote(id);
  }
  return (
    <div className="bg-secondary-very-gray hover:bg-tetiary-hov cursor-pointer rounded-lg w-[69px] h-8 md:w-10 md:h-[53px] items-center md:flex-col justify-center flex">
      <input type="hidden" name="post_id" value={id} />

      <Image
        alt="down"
        src="/assets/shared/icon-arrow-up.svg"
        className="inline-block mr-2 md:mr-0 md:mb-2"
        width={8}
        height={4}
        onClick={handleClick}
      />

      <span className="font-bold">{vote}</span>
    </div>
  );
}
