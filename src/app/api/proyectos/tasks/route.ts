import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import getCurrentUser from "@/actions/getCurrentUser";

export async function POST(request: NextRequest) {
  const res = await request.json();

  const { nombre, id_proyecto, id_estado } = res;

  const nuevaTarea = await prisma.tasks.create({
    data: {
      name: nombre,
      projectId: id_proyecto,
      stateId: id_estado,
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

  return NextResponse.json({
    tareaActualizada,
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

  if (permisos?.role !== "owner" && permisos?.role !== "admin" && permisos?.role !== "member") {
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
