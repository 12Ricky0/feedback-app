import { Nav } from "@/components/header";
import FeedbackContainer from "@/components/containers/feedback";
import { getSuggestions, getRoadMap } from "@/libs/actions";

export default async function Home() {
  let data = await getSuggestions();
  let res = await data?.json();
  let roadmap = await getRoadMap();
  let r = await roadmap?.json();
  return (
    <main className="md:flex md:flex-col lg:flex-row justify-center mx-auto max-w-[1100px] w-full">
      <Nav data={r} />
      <div className="w-full lg:ml-[30px] md:mt-10 lg:mt-0">
        <FeedbackContainer data={res} />
      </div>
    </main>
  );
}
