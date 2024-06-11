"use client";
import { useState } from "react";
import data from "../../data.json";
import Image from "next/image";
import { ReplyForm } from "./forms";
import { ProductRequest } from "@/libs/definitions";
import ReplyCard from "./reply-card";

export default function CommentCard({ item }: { item: ProductRequest }) {
  let total = 0;
  item.comments.forEach((comment: any) => {
    total++;
    if (comment.replies) {
      total += comment.replies.length;
    }
  });

  return (
    <section className="bg-white  mx-6 md:mx-0 text-[13px] mt-4 rounded-lg">
      <h1 className="mx-8 py-6 font-bold text-[18px] text-secondary-dark-gray">
        {total} Comments
      </h1>
      {item.comments?.map((data) => (
        <div key={data.id} className="">
          <ReplyCard
            id={data.id}
            src={data.user.image.split(".")[1] + ".jpg"}
            name={data.user.name}
            userName={`@${data.user.username}`}
            content={data.content}
            className={`${
              data.replies == 0 ? "md:border-b" : "md:border-l"
            }  md:ml-[20px] `}

            // onClick={handleClick(data.id)}
          >
            <div className="mt-8">
              {data.replies.length > 0 &&
                data.replies.map((reply) => (
                  <div className="" key={reply.id}>
                    <ReplyCard
                      id={data.id}
                      src={reply.user.image.split(".")[1] + ".jpg"}
                      name={reply.user.name}
                      content={reply.content}
                      userName={`@${reply.user.username}`}
                      className="ml-[16px]"
                    />
                  </div>
                ))}
            </div>
          </ReplyCard>
        </div>
      ))}
    </section>
  );
}
