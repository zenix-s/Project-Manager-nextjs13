import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb"

export async function POST(request: Request) {

  const body = await request.json();

  const { 
    receiverEmail,
    senderId, 
    projectId,

  } = body;

  const newInvitation = await prisma.invitations.create({
    data: {
      receiverEmail: receiverEmail,
      projectId: parseInt(projectId),
      senderId: parseInt(senderId),
      status: "pending",
      createdDate: new Date(),
    },
  });

  return NextResponse.json(newInvitation);

}