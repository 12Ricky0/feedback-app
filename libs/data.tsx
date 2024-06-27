"use server";

import { cookies } from "next/headers";
import data from "@/data.json";
import { getCurrentUser } from "@/libs/actions";
import UserProduct from "@/models/productRequest";
import { title } from "process";
import CurrentUser from "@/models/user";
import { User } from "./definitions";

const cookieStore = cookies();

async function name() {
  const uName = cookieStore.get("username");
  const user = await getCurrentUser(uName?.value.replace(/"/g, "")!);
  const currentUser = await user?.json();
  return currentUser;
}
export default async function defaultInvoice(userData: User) {
  //   const d = data.productRequests[0];
  const uName = cookieStore.get("username");
  //   console.log("User name:", data);
  const user = await getCurrentUser(uName?.value.replace(/"/g, "")!);
  const currentUser = await user?.json();
  //   console.log("This is the current: ", currentUser);
  console.log("User data:", userData);
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
      status: d.status,
      description: d.description,
      comments: d.comments,
    };
    UserProduct.create(udata);
  });
}
