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
import { Suspense } from "react";
import Spinner from "@/components/spinner";
import { revalidatePath } from "next/cache";

export default async function Home() {
  const cookieStore = cookies();
  const uName = cookieStore.get("username");
  const user = await getCurrentUser(uName?.value.replace(/"/g, "")!);
  const currentUser = await user?.json();

  const [suggestionsResponse, roadmapResponse] = await Promise.all([
    getSuggestions(currentUser?.username),
    getRoadMap(currentUser?.username),
  ]);
  let suggestion = await suggestionsResponse?.json();
  let roadmap = await roadmapResponse?.json();

  if (currentUser) {
    let req = await fetch(
      `http://localhost:3000/api/?query=${currentUser?.username}`
      // , { next: { revalidate: 200 },}
    );

    const response = await req.json();
    if (response.res.length == 0) {
      await defaultInvoice(currentUser);
    }
  }

  if (currentUser && suggestion && roadmap) {
    revalidatePath("/");
    return (
      <main className="md:flex md:flex-col lg:flex-row justify-center mx-auto max-w-[1100px] w-full">
        <Nav data={roadmap} />
        <div className="w-full lg:ml-[30px] mb-[55px] md:mt-10 lg:mt-0">
          <Suspense fallback={<Spinner />}>
            <FeedbackContainer data={suggestion} />
          </Suspense>
        </div>
      </main>
    );
  }
}

// console.log(currentUser);
