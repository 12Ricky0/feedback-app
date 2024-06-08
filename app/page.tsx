import Image from "next/image";
import { Nav, Header } from "@/components/header";
import FeedbackContainer from "@/components/containers/feedback";
import FeedbackForm from "@/components/feeback-form";
import RmComtainer from "@/components/containers/roadmap";
import CommentContainer from "@/components/containers/comment-container";
import { getAllUserProducts } from "@/libs/actions";

export default async function Home() {
  let data = await getAllUserProducts("all");
  let res = await data?.json();
  // console.log(res);
  return (
    <main className="md:flex md:flex-col lg:flex-row justify-center mx-auto max-w-[1100px] w-full">
      <Nav />
      <div className="w-full lg:ml-[30px] md:mt-10 lg:mt-0">
        <Header />
        <FeedbackContainer data={res} />
      </div>
      {/* <FeedbackForm /> */}
      {/* <CommentContainer /> */}
    </main>
  );
}

// className =
//   "md:flex md:flex-col lg:flex-row justify-center mx-auto max-w-[1100px] w-full";
