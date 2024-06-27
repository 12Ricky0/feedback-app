import { dbConnect } from "@/libs/dbConnect";
import mongoose from "mongoose";
import CurrentUser from "@/models/user";
import UserProduct from "@/models/productRequest";

export async function POST(request: Request) {
  const res = await request.json();
  await dbConnect();
  await UserProduct.create(res);

  return Response.json(
    { message: "Data Inserted Sucessfully" },
    { status: 200 }
  );
}

export async function GET(request: Request) {
  // noStore();
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");
  await dbConnect();
  let res = await UserProduct.find({ "currentUser.username": query });
  // console.log("Query Received:", res);

  return Response.json({ res }, { status: 200 });
}
