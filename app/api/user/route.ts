import { dbConnect } from "@/libs/dbConnect";
import CurrentUser from "@/models/user";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const req = await request.json();
  await dbConnect();
  cookies().set({
    name: "username",
    value: JSON.stringify(req.username),
  });

  await CurrentUser.create(req);
  return Response.json(
    { message: "Data Inserted Sucessfully" },
    { status: 200 }
  );
}
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");
  cookies().set({
    name: "username",
    value: JSON.stringify(query),
  });

  await dbConnect();
  let res = await CurrentUser.findOne({ username: query });
  return Response.json({ res }, { status: 200 });
}
