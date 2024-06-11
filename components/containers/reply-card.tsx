"use client";
import FeedbackContainer from "./feedback";
import CommentCard from "./cards";
import { useState } from "react";
import { CommentForm } from "./forms";
import Image from "next/image";
import { ReplyForm } from "./forms";

export default function ReplyCard({
  name,
  userName,
  content,
  src,
  id,
  className,
  children,
}: // onClick,
{
  name: string;
  userName: string;
  content: string;
  src: string;
  id: number;
  className?: string;
  children?: React.ReactNode;
  // onClick: React.MouseEventHandler<HTMLButtonElement>;
}) {
  const [activeForm, setActiveForm] = useState(0);

  const handleClick = (id: number) => {
    setActiveForm((prevNumber) => (prevNumber === 0 ? id : 0));
  };

  return (
    <article className="mx-8 pb-6">
      <div className="flex flex-row mb-4 items-center justify-between">
        <div className="flex gap-4 md:gap-8">
          <Image
            alt="down"
            src={src}
            className="rounded-full"
            width={40}
            height={40}
          />
          <div>
            <h1 className="text-[13px] md:text-[14px] text-secondary-light-blue font-bold">
              {name}
            </h1>
            <span className="text-[13px] md:text-[14px] text-secondary-light-blue">
              {userName}
            </span>
          </div>
        </div>
        <button
          value={id}
          onClick={(e: any) => handleClick(e.target.value)}
          className="text-[13px] text-primary-light-blue font-semibold"
        >
          Reply
        </button>
      </div>
      <div className={`${className} md:pl-[60p]`}>
        <p className="text-[13px] md:ml-[56px] md:text-[15px] text-secondary-light-blue ">
          {content}{" "}
        </p>

        {activeForm == id && (
          <div className="ml-[56px]">
            <ReplyForm />
          </div>
        )}

        {children && <div className="children-container">{children}</div>}
      </div>
    </article>
  );
}
