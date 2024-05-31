import Image from "next/image";
import { Nav, Header } from "@/components/header";
import FeedbackContainer from "@/components/containers/feedback";

export default function Home() {
  return (
    <main className="lg:mx-[165px]">
      <Nav />
      <Header />
      <FeedbackContainer />
    </main>
  );
}
