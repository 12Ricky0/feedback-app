export interface User {
  image: string;
  name: string;
  username: string;
}

export interface Comment {
  id: number;
  content: string;
  user: User;
}

export interface ProductRequest {
  _id: string;
  id: number;
  title: string;
  category: string;
  upvotes: number;
  status: string;
  description: string;
  comments: Comment[];
}
