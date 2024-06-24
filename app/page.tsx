import { Nav } from "@/components/header";
import FeedbackContainer from "@/components/containers/feedback";
import { getSuggestions, getRoadMap, getCurrentUser } from "@/libs/actions";
import { cookies } from "next/headers";

export default async function Home() {
  let data = await getSuggestions();
  let res = await data?.json();
  let roadmap = await getRoadMap();
  let rm = await roadmap?.json();
  const cookieStore = cookies();
  const theme = cookieStore.get("username");
  console.log(theme);
  // let user = await getCurrentUser("velvetr");
  // let userData = await user?.json();
  // console.log(userData);
  return (
    <main className="md:flex md:flex-col lg:flex-row justify-center mx-auto max-w-[1100px] w-full">
      <Nav data={rm} />
      <div className="w-full lg:ml-[30px] mb-[55px] md:mt-10 lg:mt-0">
        <FeedbackContainer data={res} />
      </div>
    </main>
  );
}
