import RmComtainer from "@/components/containers/roadmap";
import { getRoadMap } from "@/libs/actions";

export default async function Roadmap() {
  let roadmap = await getRoadMap();
  let res = await roadmap?.json();
  return (
    <main className=" mx-auto max-w-[1100px] w-full">
      <RmComtainer info={res} />
    </main>
  );
}
