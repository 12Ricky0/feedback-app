"use client";
import { ProductRequest, Comment } from "@/libs/definitions";
import ReplyCard from "./reply-card";

export default function CommentCard({ item }: { item: ProductRequest }) {
  let total = 0;
  item.comments.forEach((comment: Comment) => {
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
            _id={item._id}
            commentId={data.user._id?.toString()}
            src={data.user.image.split(".")[1] + ".jpg"}
            name={data.user.name}
            userName={`@${data.user.username}`}
            content={data.content}
            className={`${
              data.replies?.length == 0 ? "md:border-b" : "md:border-l"
            }  md:ml-[20px] `}
          >
            <div className="mt-8">
              {data.replies &&
                data.replies.length > 0 &&
                data.replies.map((reply) => (
                  <div className="" key={data.id}>
                    <ReplyCard
                      id={data.id}
                      _id={item._id}
                      commentId={data.user._id?.toString()}
                      src={reply.user.image.split(".")[1] + ".jpg"}
                      name={reply.user.name}
                      replyto={`@${reply.replyingTo}`}
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
