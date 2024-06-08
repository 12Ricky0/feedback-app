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
