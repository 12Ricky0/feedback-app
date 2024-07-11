import FeedbackForm from "@/components/feedback-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add Feedback",
};

export default async function Add() {
  return (
    <main className="md:flex md:flex-col lg:flex-row justify-center mx-auto max-w-[1100px] w-full">
      <FeedbackForm />
    </main>
  );
}
