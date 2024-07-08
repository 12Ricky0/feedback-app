import { Nav } from "@/components/header";
import FeedbackContainer from "@/components/containers/feedback";
import { getSuggestions, getRoadMap, getCurrentUser } from "@/libs/actions";
import { cookies } from "next/headers";
import defaultInvoice from "@/libs/data";
import { Suspense } from "react";
import Spinner from "@/components/spinner";
import { GetServerSideProps } from "next";

export default async function Home({ currentUser, suggestion, roadmap }: any) {
  // const cookieStore = cookies();
  // const uName = cookieStore.get("username");
  // const user = await getCurrentUser(uName?.value.replace(/"/g, "")!);
  // const currentUser = await user?.json();
  // if (currentUser) {
  //   let req = await fetch(
  //     `http://localhost:3000/api/?query=${currentUser?.username}`
  //   );
  //   const response = await req.json();
  //   if (response.res.length == 0) {
  //     await defaultInvoice(currentUser);
  //   }
  // }

  // const [suggestionsResponse, roadmapResponse] = await Promise.all([
  //   getSuggestions(currentUser?.username),
  //   getRoadMap(currentUser?.username),
  // ]);
  // let suggestion = await suggestionsResponse?.json();
  // let roadmap = await roadmapResponse?.json();

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

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const cookieStore = context.req.cookies;
//   const uName = cookieStore.username
//     ? cookieStore.username.replace(/"/g, "")
//     : null;

//   if (!uName) {
//     return {
//       props: {
//         currentUser: null,
//         suggestion: null,
//         roadmap: null,
//       },
//     };
//   }

//   const userResponse = await getCurrentUser(uName);
//   const currentUser = await userResponse.json();

//   if (currentUser) {
//     let req = await fetch(
//       `http://localhost:3000/api/?query=${currentUser.username}`
//     );
//     const response = await req.json();
//     if (response.res.length == 0) {
//       await defaultInvoice(currentUser);
//     }
//   }

//   const [suggestionsResponse, roadmapResponse] = await Promise.all([
//     getSuggestions(currentUser?.username),
//     getRoadMap(currentUser?.username),
//   ]);

//   const suggestion = await suggestionsResponse?.json();
//   const roadmap = await roadmapResponse?.json();

//   return {
//     props: {
//       currentUser,
//       suggestion,
//       roadmap,
//     },
//   };
// };
