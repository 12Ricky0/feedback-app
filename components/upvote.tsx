"use client";
import Image from "next/image";
import { updateVote } from "@/libs/actions";
import { usePathname } from "next/navigation";

export default function Upvotes({ vote, id }: { vote: number; id: string }) {
  const path = usePathname();
  function handleClick() {
    updateVote(id);
  }

  return (
    <div
      className={`bg-secondary-very-gray hover:bg-tetiary-hov cursor-pointer rounded-lg ${
        path.endsWith("roadmap")
          ? "md:h-8 inline-flex"
          : "md:h-[53px] md:w-10 flex md:flex-col"
      } w-[69px] h-8  items-center  justify-center `}
    >
      <input type="hidden" name="post_id" value={id} />

      <Image
        alt="down"
        src="/assets/shared/icon-arrow-up.svg"
        className={`inline-block ${
          path.endsWith("roadmap") ? "" : "md:mr-0 md:mb-2"
        } mr-2 `}
        width={8}
        height={4}
        onClick={handleClick}
      />

      <span
        className={`font-bold ${path.endsWith("roadmap") && "text-[13px]"}`}
      >
        {vote}
      </span>
    </div>
  );
}
