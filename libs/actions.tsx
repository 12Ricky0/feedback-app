"use server";
import { z } from "zod";
import { Comment } from "./definitions";

import UserProduct from "@/models/productRequest";
import CurrentUser from "@/models/user";
import { dbConnect } from "./dbConnect";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { unstable_noStore as noStore } from "next/cache";

export async function getSuggestions() {
  noStore();
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

export async function getCurrentUser(query: string) {
  try {
    let res = await CurrentUser.findOne({ username: String(query) });
    return Response.json(res);
  } catch (error) {
    console.error(error);
  }
}

export async function getProduct(query: string) {
  try {
    await dbConnect();
    let res = await UserProduct.findOne({ _id: query });
    return Response.json(res);
  } catch (error) {}
}

const comment = z.object({
  content: z
    .string({
      required_error: "Content is Required",
    })
    .min(1, { message: "Content cannot be empty" })
    .max(255, { message: "Exceeded maximum allowed Characters limit" }),
  image: z.string(),
  name: z.string(),
  userName: z.string(),
});

const userReply = z.object({
  content: z
    .string({
      required_error: "Content is Required",
    })
    .min(1, { message: "Content cannot be empty" })
    .max(250, { message: "Exceeded maximum allowed Characters limit" }),
  replyTo: z.string(),
  image: z.string(),
  name: z.string(),
  userName: z.string(),
});

const feedback = z.object({
  title: z
    .string({
      required_error: "Can't be empty",
    })
    .min(1, { message: "Can't be empty" }),
  category: z.string(),
  description: z
    .string({
      required_error: "Can't be empty",
    })
    .min(1, { message: "Can't be empty" }),
  upvotes: z.number().optional(),
  status: z.string(),
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

export async function postComment(prevState: any, formData: FormData) {
  const validatedData = comment.safeParse({
    content: formData.get("comment"),
    image: "./assets/user-images/image-zena.jpg",
    name: "Zena Kelley",
    userName: "velvetround",
  });

  const id = formData.get("post_id");
  // console.log(validatedData.error);
  if (!validatedData.success) {
    return {
      errors: validatedData.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Invoice.",
    };
  }

  try {
    const { content, image, name, userName } = validatedData.data;
    const userComment = {
      content: content,
      user: {
        image: image,
        name: name,
        username: userName,
      },
    };
    await dbConnect();
    let post = await UserProduct.findById(id);

    if (post) {
      await post.comments.push(userComment);
      post.save();
    }
    revalidatePath("/feedback/details/" + id);
  } catch (error) {}
}

export async function createFeedback(prevState: any, formData: FormData) {
  const validatedData = feedback.safeParse({
    title: formData.get("title"),
    category: formData.get("cat"),
    description: formData.get("details"),
    upvotes: 0,
    status: "suggestion",
  });

  if (!validatedData.success) {
    return {
      errors: validatedData.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Invoice.",
    };
  }

  try {
    const { title, category, description, upvotes, status } =
      validatedData.data;
    const feedback = {
      title: title,
      category: category == "UI" || "UX" ? category : category.toLowerCase(),
      upvotes: upvotes,
      status: status,
      description: description,
    };
    await dbConnect();
    await UserProduct.create(feedback);
  } catch (error) {}

  revalidatePath("/");
  redirect("/");
}

export async function updatePost(prevState: any, formData: FormData) {
  const id = formData.get("post_id");

  const validatedData = feedback.safeParse({
    title: formData.get("title"),
    category: formData.get("cat"),
    description: formData.get("details"),
    status: formData.get("status"),
  });

  if (!validatedData.success) {
    return {
      errors: validatedData.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Invoice.",
    };
  }

  try {
    const { title, category, description, status } = validatedData.data;
    const updatedFeedback = {
      title: title,
      category: category == "UI" || "UX" ? category : category.toLowerCase(),
      status: status.toLowerCase(),
      description: description,
    };
    await UserProduct.findByIdAndUpdate({ _id: id }, updatedFeedback, {});
  } catch (error) {}
  revalidatePath("/");
  redirect("/");
}

export async function deletePost(id: string) {
  try {
    await UserProduct.findByIdAndDelete(id);
  } catch (error) {}
  revalidatePath("/");
  redirect("/");
}

export async function updateVote(id: string) {
  let post = await UserProduct.findById(id);
  await UserProduct.findByIdAndUpdate(
    { _id: id },
    { $inc: { upvotes: +1 } }, // Increment the upvotes by 1
    { new: true }
  );
  //  post.save();
  // if (post) {
  //   console.log(post.upvotes);
  //   await post.upvotes + 1;
  //   post.save();
  // }
  revalidatePath("/");
}
