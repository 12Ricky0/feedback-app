"use client";
import FeedbackContainer from "./feedback";
import CommentCard from "./comment-card";
import { useState } from "react";
import { CommentForm } from "./forms";

export default function CommentContainer() {
  const [count, setCount] = useState(250);
  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { value } = e.target;
    if (count == 0) {
      return;
    } else {
      setCount(250 - value.length);
    }
  }
  return (
    <section>
      <FeedbackContainer />

      <section>
        <CommentCard />
      </section>

      {/* <form className="bg-white mx-6 my-6 rounded-lg" action="">
        <h1 className="py-6 mx-6 font-bold text-[18px] text-secondary-dark-gray">
          Add Comment
        </h1>

        <div className="mx-6 mb-[16px]">
          <textarea
            onChange={handleChange}
            name="comment"
            maxLength={50}
            rows={5}
            placeholder="Type your comment here"
            className="w-full pl-4 pt-4  placeholder:pt-2 text-secondary-light-blue text-[13px] bg-secondary-very-gray rounded-lg focus:outline-tetiary-sea-blue"
          />
        </div>

        <div className="mx-6 flex justify-between items-center pb-6">
          <span className="text-[13px] text-secondary-light-blue">
            {count} Characters Left
          </span>
          <button
            className="rounded-lg text-[13px] font-bold bg-primary-voilet py-[10px] px-4 text-white"
            type="submit"
          >
            Post Comment
          </button>
        </div>
      </form> */}
      <CommentForm />
    </section>
  );
}
