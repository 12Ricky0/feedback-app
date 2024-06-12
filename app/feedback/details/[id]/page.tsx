import CommentCard from "@/components/containers/cards";
import ProductCard from "@/components/containers/product-card";
import { CommentForm } from "@/components/containers/forms";
import { getProduct } from "@/libs/actions";
import Back from "@/components/back";
import Image from "next/image";
import Link from "next/link";

export default async function Page({ params }: { params: { id: string } }) {
  let data = await getProduct(params.id);
  let res = await data?.json();

  return (
    <main className=" mx-auto max-w-[730px] w-full">
      <section>
        <div className="flex justify-between items-center">
          <Back />
          <button className="bg-primary-light-blue text-[13px] font-bold text-white h-10 mr-6 rounded-lg w-[134px]">
            <Image
              alt="down"
              src="/assets/shared/icon-plus.svg"
              className="inline-block mr-2"
              width={8}
              height={8}
            />
            <Link href={`/feedback/edit/${params.id}`}>Edit Feedback</Link>
          </button>
        </div>
        <ProductCard item={res} />
      </section>
      <section>
        <CommentCard item={res} />
        <CommentForm />
      </section>
    </main>
  );
}
