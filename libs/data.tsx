"use server";

import { cookies } from "next/headers";
import data from "@/data.json";
import { getCurrentUser } from "@/libs/actions";
import UserProduct from "@/models/productRequest";
import { User } from "./definitions";

export default async function defaultInvoice(userData: User) {
  const cookieStore = cookies();
  const uName = cookieStore.get("username");
  await getCurrentUser(uName?.value.replace(/"/g, "")!);
  data.productRequests.map((d) => {
    const udata = {
      currentUser: {
        image: userData?.image,
        name: userData?.name,
        username: userData?.username,
      },
      id: d.id,
      title: d.title,
      category: d.category,
      upvotes: d.upvotes,
      voted: false,
      status: d.status,
      description: d.description,
      comments: d.comments,
    };
    UserProduct.create(udata);
  });
}
