import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import getCurrentUser from "@/actions/getCurrentUser";

export async function POST(request: NextRequest) {
  const res = await request.json();

  const { 
    name, 
    projectId, 
    stateId,
    description,
    endDate,
    userId,
  } = res;

  const nuevaTarea = await prisma.tasks.create({
    data: {
      name: name,
      projectId: projectId,
      stateId: stateId,
      description: description,
      endDate: endDate,
      archived: false,
      completed: false,
      userId: userId,
      createdDate: new Date(),
    },
  });

  return NextResponse.json({
    nuevaTarea,
  });
}

export async function PUT(request: NextRequest) {
  const res = await request.json();

  const {
    id,
    name,
    description,
    endDate,
    projectId,
    userId,
    stateId,
    completed,
    archived,
  } = res;

  const tarea = await prisma.tasks.findUnique({
    where: {
      id: id,
    },
  });

  const user = await getCurrentUser();

  if (!user?.id || !user?.email) {
    return NextResponse.json({
      status: 401,
      message: "No Autorizado",
    });
  }

  const permisos = await prisma.assignments.findFirst({
    where: {
      userId: user.id,
      projectId: tarea?.projectId,
    },
  });

  if (
    permisos?.role !== "owner" &&
    permisos?.role !== "admin" &&
    permisos?.role !== "member"
  ) {
    return NextResponse.json({
      status: 401,
      message: "No Autorizado",
    });
  }

  try {
    console.log(userId);
    const tareaActualizada = await prisma.tasks.update({
      where: {
        id: id,
      },
      data: {
        name: name,
        description: description,
        endDate: endDate,
        projectId: projectId,
        userId: userId,
        stateId: stateId,
        completed: completed,
      },
    });
  } catch (e) {
    return NextResponse.json({
      status: 400,
      message: "Error al Actualizar Tarea",
    });
  }

  return NextResponse.json({
    status: 200,
    message: "Tarea Actualizada",
  });
}

export async function DELETE(request: NextRequest) {
  const id = request.headers.get("id_task");
  const action = request.headers.get("action");
  const user = await getCurrentUser();

  if (!id || !action) {
    return NextResponse.json({
      status: 400,
      message: "Faltan Parametros",
    });
  }

  if (!user?.id || !user?.email) {
    return NextResponse.json({
      status: 401,
      message: "No Autorizado",
    });
  }

  const tarea = await prisma.tasks.findUnique({
    where: {
      id: Number(id),
    },
  });

  const permisos = await prisma.assignments.findFirst({
    where: {
      userId: user.id,
      projectId: tarea?.projectId,
    },
  });

  if (
    permisos?.role !== "owner" &&
    permisos?.role !== "admin" &&
    permisos?.role !== "member"
  ) {
    return NextResponse.json({
      status: 401,
      message: "No Autorizado",
    });
  }

  if (action === "archive") {
    const tareaArchivada = await prisma.tasks.update({
      where: {
        id: Number(id),
      },
      data: {
        archived: true,
      },
    });
    return NextResponse.json({
      status: 200,
      message: "Tarea Archivada",
    });
  }

  if (action === "unarchive") {
    const tareaArchivada = await prisma.tasks.update({
      where: {
        id: Number(id),
      },
      data: {
        archived: false,
      },
    });
    return NextResponse.json({
      status: 200,
      message: "Tarea Desarchivada",
    });
  }

  if (permisos?.role !== "owner" && permisos?.role !== "admin") {
    return NextResponse.json({
      status: 401,
      message: "No Autorizado",
    });
  }

  if (action === "delete") {
    const tareaEliminada = await prisma.tasks.delete({
      where: {
        id: Number(id),
      },
    });
    return NextResponse.json({
      status: 200,
      message: "Tarea Eliminada",
    });
  }

  return NextResponse.json({
    status: 200,
    message: "Endpoint Alcanzado",
  });
}
