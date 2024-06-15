import UserProduct from "@/models/productRequest";
import { dbConnect } from "./dbConnect";
// ["ALL", "UI", "UX", "Enhancement", "Bug", "Feature"];
import { Replies } from "./definitions";

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

export async function getCurrentUser() {
  // try {
  //   await dbConnect();
  //   let res = await UserProduct.find({
  //     status: { $in: ["live", "planned", "in-progress"] },
  //   });
  //   return Response.json(res);
  // } catch (error) {
  //   console.error(error);
  //   throw new Error(notFound());
  // }
}

export async function getProduct(query: string) {
  try {
    await dbConnect();
    let res = await UserProduct.findOne({ _id: query });
    return Response.json(res);
  } catch (error) {}
}

interface Reply {
  replyTo: string;
  name: String;
}

export async function getReplies(formData: FormData) {
  try {
    const reply = formData.get("reply");
    const userName = formData?.get("userName");

    console.log(reply);
  } catch (error) {
    console.error(error);
  }
}
