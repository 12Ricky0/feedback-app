"use server";
import { z } from "zod";
import { Comment } from "./definitions";
import { notFound } from "next/navigation";
import UserProduct from "@/models/productRequest";
import CurrentUser from "@/models/user";
import { dbConnect } from "./dbConnect";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { unstable_noStore as noStore } from "next/cache";

export async function getSuggestions(id: string) {
  noStore();
  try {
    await dbConnect();
    let res = await UserProduct.find({
      status: "suggestion",
      "currentUser.username": id,
    });
    return Response.json(res);
  } catch (error) {
    console.error(error);
  }
  revalidatePath("/home");
}

export async function verifyDefaultUserPost(query: string) {
  try {
    await dbConnect();
    let res = await UserProduct.find({ "currentUser.username": query });
    return Response.json(res);
  } catch (error) {
    console.error(error);
    throw new Error(notFound());
  }
}

export async function getRoadMap(query: string) {
  try {
    await dbConnect();
    let res = await UserProduct.find({
      status: { $in: ["live", "planned", "in-progress"] },
      "currentUser.username": query,
    });
    return Response.json(res);
  } catch (error) {
    console.error(error);
  }
  revalidatePath("/home");
}

export async function getCurrentUser(query: string) {
  try {
    await dbConnect();
    let res = await CurrentUser.findOne({ username: String(query) });
    return Response.json(res);
  } catch (error) {
    console.error(error);
    throw new Error(notFound());
  }
}

export async function getProduct(query: string) {
  try {
    await dbConnect();
    let res = await UserProduct.findOne({ _id: query });
    return Response.json(res);
  } catch (error) {
    throw new Error(notFound());
  }
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
  const user = formData.get("user");
  const currentUser = await getCurrentUser(user?.toString()!);
  const res = await currentUser?.json();
  const validatedData = userReply.safeParse({
    content: formData.get("reply"),
    replyTo: formData.get("username")?.slice(1),
    image: res.image,
    name: res.name,
    userName: res.username,
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
  noStore();

  const user = formData.get("user");
  const currentUser = await getCurrentUser(user?.toString()!);
  const res = await currentUser?.json();

  const validatedData = comment.safeParse({
    content: formData.get("comment"),
    image: res.image,
    name: res.name,
    userName: res.username,
  });

  const id = formData.get("post_id");

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
  } catch (error) {
    throw new Error(notFound());
  }
}

export async function createFeedback(prevState: any, formData: FormData) {
  const user = formData.get("user");

  function formatCategory(category: string) {
    if (category == "UI" || category == "UX") {
      return category;
    } else {
      return category.toLowerCase();
    }
  }
  const currentUser = await getCurrentUser(user?.toString()!);
  const res = await currentUser?.json();
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
      currentUser: res,
      category: formatCategory(category),
      upvotes: upvotes,
      status: status,
      description: description,
    };
    await dbConnect();
    await UserProduct.create(feedback);
  } catch (error) {}

  revalidatePath("/home");
  redirect("/home");
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
  revalidatePath("/home");
  redirect("/home");
}

export async function deletePost(id: string) {
  try {
    await UserProduct.findByIdAndDelete(id);
  } catch (error) {}
  revalidatePath("/home");
  redirect("/home");
}

export async function updateVote(id: string, path: string, vote: number) {
  const data = await UserProduct.findById({ _id: id });
  await UserProduct.findByIdAndUpdate(
    { _id: id },
    { $set: { voted: !data.voted } }
  );
  await UserProduct.findByIdAndUpdate({ _id: id }, { $set: { upvotes: vote } });
  revalidatePath(path);
  redirect(path);
}
