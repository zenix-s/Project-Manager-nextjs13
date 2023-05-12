import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb"
import getCurrentUser from "@/actions/getCurrentUser";


export async function POST(request: Request) {

  const user = await getCurrentUser();

  if (!user?.email) {
    return NextResponse.error();
  }

  const body = await request.json();

  const { 
    email, 
    projectId,
  } = body;

  console.log(email, projectId);
  

  const newInvitation = await prisma.invitations.create({
    data: {
      receiverEmail: email,
      projectId: projectId,
      createdDate: new Date(),
      status: "Pendiente",
      senderId: user.id,
    },
  });

  return NextResponse.json(
    "ok"
  );

}


export async function PUT(request: Request) {

  const user = await getCurrentUser();

  if (!user?.email) {
    return NextResponse.error();
  }

  const body = await request.json();

  const { 
    id,
    status,
  } = body;

  const invitation = await prisma.invitations.update({
    where: {
      id: id,
    },
    data: {
      status: status,
    }
  });

  return NextResponse.json(
    "ok"
  );


}