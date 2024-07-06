import Image from "next/image";
import Upvotes from "../upvote";
import Link from "next/link";
import { Comment } from "@/libs/definitions";

export default function StatusContainer({
  id,
  title,
  status,
  description,
  upvotes,
  voted,
  comments,
  category,
}: {
  id: string;
  title: string;
  status: string;
  description: string;
  upvotes: number;
  voted: boolean;
  comments: Comment[];
  category: string;
}) {
  let total = 0;
  comments.forEach((comment: Comment) => {
    total++;
    if (comment.replies) {
      total += comment.replies.length;
    }
  });

  return (
    <div
      className={`bg-white rounded-lg border-t-[6px] group cursor-pointer md:max-w-[350px] ${
        status == "planned" && "border-t-tetiary-orange"
      } ${status == "live" && "border-t-tetiary-sea-blue"} ${
        status == "in-progress" && "border-t-primary-voilet"
      } mx-6 md:mx-0 pb-[24px] mb-[16px]`}
    >
      <div className="mx-6 marker:text-primary-voilet">
        <li className="marker:text-primary-voilet md:text-[16px] text-[13px] text-secondary-light-blue mt-[22px]">
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </li>
      </div>
      <article className="mx-6 mt-[16px]">
        <Link href={`/feedback/details/${id}`}>
          <h1 className="font-bold text-[13px] group-hover:text-primary-light-blue lg:text-[18px] text-secondary-dark-gray">
            {title}
          </h1>
          <p className="text-[13px] lg:text-[16px] text-secondary-light-blue mt-[9px] mb-6">
            {description}
          </p>
          <span className="bg-secondary-very-gray px-4 py-[5px] rounded-lg text-primary-light-blue text-[13px] font-semibold">
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </span>
        </Link>
        <div className="mt-[16px] flex justify-between items-center">
          <Upvotes vote={upvotes} voted={voted} id={id} />
          <div className="">
            <Image
              alt="down"
              src="/assets/shared/icon-comments.svg"
              className="inline-block mr-2"
              width={18}
              height={16}
            />
            <span className="font-bold text-[13px]">{total}</span>
          </div>
        </div>
      </article>
    </div>
  );
}
