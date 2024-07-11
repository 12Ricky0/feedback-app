import CommentCard from "@/components/containers/cards";
import ProductCard from "@/components/containers/product-card";
import { CommentForm } from "@/components/containers/forms";
import { getProduct } from "@/libs/actions";
import Back from "@/components/back";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Feedback Details",
};

export default async function Page({ params }: { params: { id: string } }) {
  let data = await getProduct(params.id);
  let res = await data?.json();
  return (
    <main className=" mx-auto max-w-[730px] w-full">
      <section>
        <div className="flex mx-6 md:mx-0 mt-6 md:mt-0 justify-between items-center">
          <Back className="mt-0" />
          <button className="bg-primary-light-blue text-[13px] hover:bg-tetiary-hov  font-bold text-white h-10 rounded-lg w-[134px]">
            <Link href={`/feedback/edit/${params.id}`}>Edit Feedback</Link>
          </button>
        </div>
        <ProductCard item={res} />
      </section>
      <section>
        <CommentCard item={res} />
        <CommentForm _id={params.id} user={res.currentUser.username} />
      </section>
    </main>
  );
}
