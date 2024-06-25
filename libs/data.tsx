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

// Generate a default invoice for the first product request in the data.json file.
export default async function defaultInvoice() {
  const d = data.productRequests[0];
}
data.productRequests.map((d) => {
  const udata = {
    // currentUser: {
    //   image: name().image,
    //   name: name().name,
    //   username: name().username,
    // },
    id: d.id,
    title: d.title,
    category: d.category,
    upvotes: d.upvotes,
    status: d.status,
    description: d.description,
    comments: d.comments,
  };
  //   console.log(udata);
});
