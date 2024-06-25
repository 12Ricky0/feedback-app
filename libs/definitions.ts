// import { CurrentUser } from '@/models/user';
import mongoose, { Document, Model } from "mongoose";

export interface User extends Document {
  image: string;
  name: string;
  username: string;
}

export interface Replies {
  content: string;
  replyingTo: string;
  user: User;
}

export interface Comment {
  id: number;
  content: string;
  user: User;
  replies?: Replies[];
  _id: string;
}

export interface ProductRequest {
  // currentUser: User;
  _id: string;
  id: number;
  title: string;
  category: string;
  upvotes: number;
  status: string;
  description: string;
  comments: Comment[];
}
