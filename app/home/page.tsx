// import Image from "next/image";
// import { useRouter } from "next/router";
// import Link from "next/link";

// export default async function Defualt() {
//   const router = useRouter();
//   return (
//     <section className="flex items-center flex-col justify-center py-[110px] mb-[55px] text-center bg-white mx-6 md:mx-0 mt-4 rounded-lg">
//       <Image
//         alt="empty"
//         src="/assets/suggestions/illustration-empty.svg"
//         className="mx-auto"
//         width={130}
//         height={135}
//       />
//       <article className="mt-[53px]">
//         <h1 className="font-bold text-[24px] text-secondary-dark-gray mb-4">
//           There is no feedback yet.
//         </h1>
//         <p className="md:w-[410px] mx-6 md:mx-0 text-[16px] text-secondary-light-blue">
//           Got a suggestion? Found a bug that needs to be squashed? We love
//           hearing about new ideas to improve our app.
//         </p>
//       </article>
//       <button className="bg-primary-voilet text-[13px] font-bold text-white h-10 mt-12 rounded-lg w-[134px]">
//         <Image
//           alt="down"
//           src="/assets/shared/icon-plus.svg"
//           className="inline-block mr-2"
//           width={8}
//           height={8}
//         />
//         <Link href="/feedback/add">Add Feedback</Link>
//       </button>
//       <button
//         onClick={() => router.push("/")}
//         className="bg-primary-voilet text-[13px] font-bold text-white h-10 mt-12 rounded-lg w-[134px]"
//       >
//         Reload
//       </button>
//     </section>
//   );
// }

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
  if (currentUser) {
    let req = await fetch(
      `http://localhost:3000/api/?query=${currentUser?.username}`
      // , { next: { revalidate: 200 },}
    );
    // console.log(currentUser);
    const response = await req.json();
    if (response.res.length == 0) {
      await defaultInvoice(currentUser);
    }
  }

  const [suggestionsResponse, roadmapResponse] = await Promise.all([
    getSuggestions(currentUser?.username),
    getRoadMap(currentUser?.username),
  ]);
  let suggestion = await suggestionsResponse?.json();
  let roadmap = await roadmapResponse?.json();

  // if (currentUser && suggestion && roadmap) {
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
// }
