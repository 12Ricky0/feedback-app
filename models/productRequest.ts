import mongoose from "mongoose";
import { ProductRequest } from "@/libs/definitions";
import { userSchema } from "./user";

const replySchema = new mongoose.Schema({
  content: String,
  replyingTo: String,
  user: userSchema,
});

const commentSchema = new mongoose.Schema({
  id: Number,
  content: String,
  user: userSchema,
  replies: [replySchema],
});

const productSchema = new mongoose.Schema<ProductRequest>({
  userId: String,
  currentUser: userSchema,
  id: Number,
  title: String,
  category: String,
  upvotes: Number,
  voted: Boolean,
  status: String,
  description: String,
  comments: [commentSchema],
});

const UserProduct =
  mongoose.models.UserProduct ||
  mongoose.model<ProductRequest>("UserProduct", productSchema);

export default UserProduct;
