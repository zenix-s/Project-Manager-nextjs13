import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import getCurrentUser from "@/actions/getCurrentUser";

export async function GET(request: NextRequest) {
  const id = request.headers.get("projectId");
  const user = await getCurrentUser();

  if (!id) {
    return NextResponse.json({
      status: 400,
      message: "Faltan Parametros",
    });
  }

  // if (!user?.id || !user?.email) {
  //   return NextResponse.json({
  //     status: 401,
  //     message: "No Autorizado",
  //   });
  // }

  // const permisos = await prisma.assignments.findFirst({
  //   where: {
  //     userId: user.id,
  //     projectId: Number(id),
  //   },
  // });

  // if (
  //   permisos?.role !== "owner" &&
  //   permisos?.role !== "admin" &&
  //   permisos?.role !== "member"
  // ) {
  //   return NextResponse.json({
  //     status: 401,
  //     message: "No Autorizado",
  //   });
  // }

  const tareas = await prisma.tasks.findMany({
    where: {
      projectId: Number(id),
    },
    include: {
      states: true,
      projects: true,
      users: true,
    },
  });

  return NextResponse.json({
    tasks: tareas,
    status: 200,
    message: "Tareas Obtenidas",
  });
}

export async function POST(request: NextRequest) {
  const res = await request.json();

  const { name, projectId, stateId, priority, description, endDate, userId } =
    res;

  const nuevaTarea = await prisma.tasks.create({
    data: {
      name: name,
      projectId: projectId,
      stateId: stateId,
      priority: priority,
      description: description,
      endDate: endDate,
      archived: false,
      completed: false,
      userId: userId,
      createdDate: new Date(),
    },
  });

  return NextResponse.json({
    status: 200,
    message: "Tarea Creada",
    newTask: nuevaTarea,
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
    priority,
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
        priority: priority,
        stateId: stateId,
        completed: completed,
        archived: archived,
      },
    });
  } catch (e: any) {
    console.log(e);
    return NextResponse.json({
      status: 400,
      message: "Error al Actualizar Tarea",
    });
  }

  if (archived !== tarea?.archived) {
    if (archived) {
      return NextResponse.json({
        status: 200,
        message: "Tarea Archivada",
      });
    } else {
      return NextResponse.json({
        status: 200,
        message: "Tarea Desarchivada",
      });
    }
  }

  return NextResponse.json({
    status: 200,
    message: "Tarea Actualizada",
  });
}

export async function DELETE(request: NextRequest) {
  const id = request.headers.get("taskId");
  const user = await getCurrentUser();

  if (!id) {
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

  if (permisos?.role !== "owner" && permisos?.role !== "admin") {
    return NextResponse.json({
      status: 401,
      message: "No Autorizado",
    });
  }

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
