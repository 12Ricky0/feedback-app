import CurrentUser from "@/models/user";
import UserProduct from "@/models/productRequest";
import mongoose from "mongoose";
import { dbConnect } from "./dbConnect";
import { notFound } from "next/navigation";
["ALL", "UI", "UX", "Enhancement", "Bug", "Feature"];

export async function getSuggestions() {
  try {
    await dbConnect();
    let res = await UserProduct.find({ status: "suggestion" });
    return Response.json(res);
  } catch (error) {
    console.error(error);
    // throw new Error(notFound());
  }
}

export async function getRoadMap() {
  try {
    await dbConnect();
    let res = await UserProduct.find({
      status: { $in: ["live", "planned", "in-progress"] },
    });
    return Response.json(res);
  } catch (error) {
    console.error(error);
    // throw new Error(notFound());
  }
}
