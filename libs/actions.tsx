"use server";
import { z } from "zod";
import { Comment } from "./definitions";

import UserProduct from "@/models/productRequest";
import { dbConnect } from "./dbConnect";
// ["ALL", "UI", "UX", "Enhancement", "Bug", "Feature"];
import { Replies } from "./definitions";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

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
  replyTo?: string;
  name?: String;
}

const userReply = z.object({
  content: z
    .string({
      required_error: "Content is Required",
    })
    .max(250, { message: "Exceeded maximum allowed Characters limit" }),
  replyTo: z.string(),
  image: z.string(),
  name: z.string(),
  userName: z.string(),
});

export async function getReplies(prevState: any, formData: FormData) {
  const validatedData = userReply.safeParse({
    content: formData.get("reply"),
    replyTo: formData.get("username")?.slice(1),
    image: "./assets/user-images/image-zena.jpg",
    name: "Zena Kelley",
    userName: "velvetround",
  });
  const id = formData.get("post-id");
  const commentId = formData.get("comment_id");
  if (!validatedData.success) {
    return {
      errors: validatedData.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Invoice.",
    };
  }

  try {
    const { content, replyTo, image, name, userName } = validatedData.data;
    const reply = {
      content: content,
      replyingTo: replyTo,
      user: {
        image: image,
        name: name,
        username: userName,
      },
    };
    await dbConnect();
    let post = await UserProduct.findById(id);
    if (post) {
      const comment = await post.comments.find(
        (comment: Comment) => comment.user._id!.toString() == commentId
      );
      await comment.replies.push(reply);
      post.save();
    } else {
      return;
    }
  } catch (error) {
    console.error(error);
  }

  revalidatePath("/feedback/details/" + id);
}
