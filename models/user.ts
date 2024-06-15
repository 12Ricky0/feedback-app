import mongoose, { Model } from "mongoose";
import { User } from "@/libs/definitions";

export const userSchema = new mongoose.Schema<User>({
  image: String,
  name: String,
  username: String,
});

const CurrentUser: Model<User> =
  mongoose.models.CurrentUser ||
  mongoose.model<User>("CurrentUser", userSchema);

export default CurrentUser;
