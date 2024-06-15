"use client";
import { useState } from "react";
import { getReplies, getProduct } from "@/libs/actions";
// import { useAc } from "react-dom";
import { useActionState } from "react";
import { useFormState } from "react-dom";

export function CommentForm() {
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
  // const [state, dispatch] = useActionState(getReplies, null);

  return (
    <form className="bg-white mx-6 md:mx-0 my-6 rounded-lg" action="">
      <h1 className="py-6 mx-6 font-bold text-[18px] text-secondary-dark-gray">
        Add Comment
      </h1>

      <div className="mx-6 mb-[16px]">
        <textarea
          onChange={handleChange}
          name="comment"
          maxLength={250}
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
    </form>
  );
}

export function ReplyForm({ userName }: { userName: string }) {
  const [message, formAction] = useFormState(getReplies, null);
  return (
    <form action={formAction} className="mt-6 flex gap-4 items-start ">
      <input type="hidden" name="username" value={userName} />
      <textarea
        name="reply"
        maxLength={250}
        rows={4}
        placeholder="Type your comment here"
        className="w-full pl-4 pt-4  placeholder:pt-2 text-secondary-light-blue text-[13px] bg-secondary-very-gray rounded-lg focus:outline-tetiary-sea-blue"
      />
      <button
        className="rounded-lg text-[13px]  font-bold bg-primary-voilet py-[10px] w-[117px] text-white"
        type="submit"
      >
        Post Reply
      </button>
    </form>
  );
}
