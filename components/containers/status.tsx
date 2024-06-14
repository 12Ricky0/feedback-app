import Image from "next/image";
import Link from "next/link";

export default function StatusContainer({
  title,
  status,
  description,
  upvotes,
  comments,
  category,
}: {
  title: string;
  status: string;
  description: string;
  upvotes: number;
  comments: number;
  category: string;
}) {
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
        <h1 className="font-bold text-[13px] group-hover:text-primary-light-blue lg:text-[18px] text-secondary-dark-gray">
          {title}
        </h1>
        <p className="text-[13px] lg:text-[16px] text-secondary-light-blue mt-[9px] mb-6">
          {description}
        </p>
        <span className="bg-secondary-very-gray px-4 py-[5px] rounded-lg text-primary-light-blue text-[13px] font-semibold">
          {category.charAt(0).toUpperCase() + category.slice(1)}
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

            <span className="font-bold text-[13px]">{upvotes}</span>
          </div>

          <div className="">
            <Image
              alt="down"
              src="/assets/shared/icon-comments.svg"
              className="inline-block mr-2"
              width={18}
              height={16}
            />
            <span className="font-bold text-[13px]">{comments}</span>
          </div>
        </div>
      </article>
    </div>
  );
}
