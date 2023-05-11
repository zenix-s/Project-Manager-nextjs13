import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prismadb";
import getCurrentUser from "../../../actions/getCurrentUser";
export async function GET(request: Request) {


  const idUser = request.headers.get("user-id");

  if (!idUser) {
    return [];
  }

  const proyectos = await prisma.projects.findMany({
    where: {
      assignments: {
        some: {
          userId: parseInt(idUser),
        },
      },
    },
    include: {
      assignments: {
        where: {
          userId: parseInt(idUser),
        },
      },
    },
  });

  return NextResponse.json(proyectos);
}

export async function POST(request: Request) {
  const user = await getCurrentUser();

  if (!user?.id) {
    return NextResponse.error();
  }

  const body = await request.json();

  const { name, description, deadline } = body;

  const newProject = await prisma.projects.create({
    data: {
      name: name,
      description: description,
      endDate: new Date(deadline),
      creationDate: new Date(),
    },
  });

  const newProjectUser = await prisma.assignments.create({
    data: {
      projectId: newProject.id,
      userId: parseInt(user.id.toString()),
      role: "owner",
    },
  });

  return NextResponse.json(newProject);
}

export async function DELETE(request: Request) {

  const idProyecto = request.headers.get("id-proyecto");

  if (!idProyecto) {
    return NextResponse.error();
  }

  const deleteAsignaciones = await prisma.assignments.deleteMany({
    where: {
      projectId: parseInt(idProyecto),
    },
  });

  const deleteProyecto = await prisma.projects.delete({
    where: {
      id: parseInt(idProyecto),
    },
  });

  return NextResponse.json({
    message: "ok",
    idProyecto,
  });
}
