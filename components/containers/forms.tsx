"use client";
import { useState, ChangeEvent, FormEventHandler } from "react";
import { getReplies, postComment } from "@/libs/actions";
import { useFormState } from "react-dom";

export function CommentForm({ _id, user }: { _id: string; user: string }) {
  const [comment, setComment] = useState("");
  const [count, setCount] = useState(250);
  const [message, formAction] = useFormState(postComment, null);

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { value } = e.target;
    if (count == 0) {
      return;
    } else {
      setCount(250 - value.length);
    }
    setComment(value);
  }

  const handleSubmit: FormEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    setComment("");
    setCount(250);
  };

  return (
    <form className="bg-white mx-6 md:mx-0 my-6 rounded-lg" action={formAction}>
      <h1 className="py-6 mx-6 font-bold text-[18px] text-secondary-dark-gray">
        Add Comment
      </h1>

      <div className="mx-6 mb-[16px]">
        <input type="hidden" name="post_id" value={_id} />
        <input type="hidden" name="user" value={user} />

        <textarea
          onChange={handleChange}
          name="comment"
          maxLength={250}
          value={comment}
          rows={5}
          placeholder="Type your comment here"
          className="w-full pl-4 pt-4  placeholder:pt-2 text-secondary-light-blue text-[13px] bg-secondary-very-gray rounded-lg focus:outline-tetiary-sea-blue"
        />
      </div>

      <div className="mx-6 flex justify-between items-center pb-6">
        <span className="text-[13px] text-secondary-light-blue">
          {count} Characters Left
        </span>
        {message?.errors.content && (
          <div className="">
            <p className="text-[13px] md:text-[14px] text-tetiary-red">
              {message.errors.content}
            </p>
          </div>
        )}
        <button
          onSubmit={handleSubmit}
          className="rounded-lg text-[13px] hover:bg-violet-400 font-bold bg-primary-voilet py-[10px] px-4 text-white"
          type="submit"
        >
          Post Comment
        </button>
      </div>
    </form>
  );
}

export function ReplyForm({
  userName,
  _id,
  commentId,
  user,
}: {
  userName: string;
  _id: string;
  user: string;
  commentId: string;
}) {
  const [message, formAction] = useFormState(getReplies, null);
  const [comment, setComment] = useState("");

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { value } = e.target;
    setComment(value);
  }

  const handleSubmit: FormEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    setComment("");
  };

  return (
    <form action={formAction} className="mt-6 flex gap-4 items-start ">
      <input type="hidden" name="post-id" value={_id} />
      <input type="hidden" name="username" value={userName} />
      <input type="hidden" name="comment_id" value={commentId} />
      <input type="hidden" name="user" value={user} />
      <textarea
        name="reply"
        maxLength={250}
        value={comment}
        onChange={handleChange}
        rows={4}
        placeholder="Type your comment here"
        className="w-full pl-4 pt-4  placeholder:pt-2 text-secondary-light-blue text-[13px] bg-secondary-very-gray rounded-lg focus:outline-tetiary-sea-blue"
      />
      <button
        className="rounded-lg text-[13px] hover:bg-violet-400 font-bold bg-primary-voilet py-[10px] w-[117px] text-white"
        type="submit"
        onSubmit={handleSubmit}
      >
        Post Reply
      </button>
    </form>
  );
}
