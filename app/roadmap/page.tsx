import RmComtainer from "@/components/containers/roadmap";
import { getRoadMap } from "@/libs/actions";
import { cookies } from "next/headers";
import { getCurrentUser } from "@/libs/actions";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Roadmap",
};

export default async function Roadmap() {
  const cookieStore = cookies();
  const uName = cookieStore.get("username");
  const user = await getCurrentUser(uName?.value.replace(/"/g, "")!);
  const currentUser = await user?.json();

  let roadmap = await getRoadMap(currentUser?.username);
  let res = await roadmap?.json();
  return (
    <main className=" mx-auto max-w-[1100px] w-full">
      <RmComtainer info={res} />
    </main>
  );
}
