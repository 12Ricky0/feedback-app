import mongoose from "mongoose";

export interface User {
  image: string;
  name: string;
  username: string;
}

const userSchema = new mongoose.Schema<User>({
  image: String,
  name: String,
  username: String,
});

export default mongoose.models.CurrentUser ||
  mongoose.model<User>("CurrentUser", userSchema);
