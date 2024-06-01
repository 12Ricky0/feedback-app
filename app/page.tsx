import Image from "next/image";
import { Nav, Header } from "@/components/header";
import FeedbackContainer from "@/components/containers/feedback";

export default function Home() {
  return (
    <main className="md:flex justify-center mx-auto max-w-[1100px] w-full">
      <Nav />
      <div className="w-full md:ml-[30px]">
        <Header />
        <FeedbackContainer />
      </div>
    </main>
  );
}
