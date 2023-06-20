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

  const endDate = () => {
    
    if (deadline) {
      return new Date(deadline);
    }
    return null;

  };

  const newProject = await prisma.projects.create({
    data: {
      name: name,
      description: description || null,
      endDate: endDate(),
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

  return NextResponse.json({
    status: 200,
    message: "El proyecto ha sido creado",

  });
}

export async function DELETE(request: Request) {
  const user = await getCurrentUser();

  const idProyecto = request.headers.get("id-proyecto");
  const action = request.headers.get("action");

  if (!idProyecto) {
    return NextResponse.error();
  }

  if (!user?.id) {
    return NextResponse.error();
  }

  const permisoProyecto = await prisma.assignments.findFirst({
    where: {
      projectId: parseInt(idProyecto),
      userId: parseInt(user.id.toString()),
    },
  });

  if (permisoProyecto?.role !== "owner") {
    return NextResponse.json({
      status: 403,
      message: "No tienes permisos para realizar esta acción",
    });

  }

  if (action === "unarchive"){
    const updateProyecto = await prisma.projects.update({
      where: {
        id: parseInt(idProyecto),
      },
      data: {
        archived: false,
      },
    });

    return NextResponse.json({
      status: 200,
      message: "El proyecto ha sido desarchivado",
    });

  }

  if (action === "delete") {
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
      status: 200,
      message: "El proyecto ha sido eliminado",
    });
  }

  if (action === "archive") {
    const updateProyecto = await prisma.projects.update({
      where: {
        id: parseInt(idProyecto),
      },
      data: {
        archived: true,
      },
    });

    return NextResponse.json({
      status: 200,
      message: "El proyecto ha sido archivado",
    });

  }

  return NextResponse.json({
    status: 200,
    message: "ok",
  });
}
