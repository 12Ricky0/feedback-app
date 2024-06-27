import { Nav } from "@/components/header";
import FeedbackContainer from "@/components/containers/feedback";
import {
  getSuggestions,
  getRoadMap,
  getCurrentUser,
  verifyDefaultUserPost,
} from "@/libs/actions";
import { cookies } from "next/headers";
import defaultInvoice from "@/libs/data";

export default async function Home() {
  const cookieStore = cookies();
  const uName = cookieStore.get("username");
  const user = await getCurrentUser(uName?.value.replace(/"/g, "")!);
  const currentUser = await user?.json();
  // console.log(await defaultInvoice());

  let data = await getSuggestions(currentUser?.username);
  let suggestion = await data?.json();
  let roadmap = await getRoadMap(currentUser?.username);
  let rm = await roadmap?.json();

  // console.log(currentUser);
  return (
    <main className="md:flex md:flex-col lg:flex-row justify-center mx-auto max-w-[1100px] w-full">
      <Nav data={rm} />
      <div className="w-full lg:ml-[30px] mb-[55px] md:mt-10 lg:mt-0">
        <FeedbackContainer data={suggestion} />
      </div>
    </main>
  );
}
