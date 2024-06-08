import CurrentUser from "@/models/user";
import UserProduct from "@/models/productRequest";
import mongoose from "mongoose";
import { dbConnect } from "./dbConnect";
import { notFound } from "next/navigation";
["ALL", "UI", "UX", "Enhancement", "Bug", "Feature"];

export async function getAllUserProducts(query: string) {
  try {
    await dbConnect();
    let res = await UserProduct.find({ status: "suggestion" });
    return Response.json(res);
  } catch (error) {
    console.error(error);
    // throw new Error(notFound());
  }
}
