import EditForm from "@/components/edit-form";
import { getProduct } from "@/libs/actions";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Product",
};

export default async function Edit({ params }: { params: { id: string } }) {
  let data = await getProduct(params.id);
  let res = await data?.json();
  return (
    <main className="md:flex md:flex-col lg:flex-row justify-center mx-auto max-w-[1100px] w-full">
      <EditForm product={res} />
    </main>
  );
}
