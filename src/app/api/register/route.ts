import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
export async function POST(request: Request) {
  const body = await request.json();
  const { username, email, password } = body;

  const hashedPassword = await bcrypt.hash(password, 12);

  try {
    const user = await prisma.users.create({
      data: {
        username: username,
        email: email,
        password: hashedPassword,
      },
    });
    return NextResponse.json(user);
  } catch (err) {
    return NextResponse.error();
  }
}
