import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import getCurrentUser from "@/actions/getCurrentUser";

export async function POST(request: Request) {
  const user = await getCurrentUser();

  if (!user?.email) {
    return NextResponse.error();
  }

  const body = await request.json();

  const { email, projectId } = body;

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

  return NextResponse.json("ok");
}

export async function PUT(request: Request) {
  const user = await getCurrentUser();

  if (!user?.email) {
    return NextResponse.error();
  }

  const body = await request.json();

  const { id, accept } = body;

  const status = accept ? "Aceptado" : "Rechazado";

  if (status !== "Aceptado" && status !== "Rechazado") {
    return NextResponse.error();
  }

  if (status === "Aceptado") {
    const invitation = await prisma.invitations.findUnique({
      where: {
        id: id,
      },
    });
    
    if (!invitation) {
      return NextResponse.error();
    }

    
    const teamMember = await prisma.assignments.create({
      data: {
        projectId: invitation.projectId,
        role: "viewer",
        userId: user.id,
      },
    });

  }

  if (status === "Rechazado") {
    const invitation = await prisma.invitations.findUnique({
      where: {
        id: id,
      },
    });
    
    if (!invitation) {
      return NextResponse.error();
    }

  }



  const invitation = await prisma.invitations.update({
    where: {
      id: id,
    },
    data: {
      status: status,
    },
  });

  return NextResponse.json(
    invitation
  );
}
