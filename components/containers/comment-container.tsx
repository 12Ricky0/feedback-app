"use client";
import FeedbackContainer from "./feedback";
import CommentCard from "./cards";
import { useState } from "react";
import { CommentForm } from "./forms";

export default function CommentContainer() {
  return (
    <section>
      <FeedbackContainer />

      <section>
        <CommentCard />
      </section>

      <CommentForm />
    </section>
  );
}
