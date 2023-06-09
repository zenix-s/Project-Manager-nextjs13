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

  if (!user?.id || !user?.email) {
    return NextResponse.json({
      status: 401,
      message: "No Autorizado",
    });
  }

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

  const estados = await prisma.states.findMany({
    where: {
      projectId: Number(id),
    },
    orderBy: {
      order: "asc",
    },
  });

  return NextResponse.json({
    states: estados,
    status: 200,
    message: "Estados Obtenidos",
  });
}

export async function POST(request: NextRequest) {
  const res = await request.json();

  const { name, color, projectId } = res;

  const lastOrder = await prisma.states.findFirst({
    where: {
      projectId: projectId,
    },
    orderBy: {
      order: "desc",
    },
  });

  const newOrder = lastOrder ? lastOrder.order + 1 : 1;

  const newState = await prisma.states.create({
    data: {
      name: name,
      color: color,
      projectId: projectId,
      order: newOrder,
    },
  });

  return NextResponse.json({
    status: 200,
    message: "Estado creado correctamente",
    newState: newState,
  });
}

export async function PUT(request: NextRequest) {
  const res = await request.json();

  const { id, projectId, name, color, autoComplete } = res;

  const estadoActualizado = await prisma.states.update({
    where: {
      id: id,
    },
    data: {
      name: name,
      color: color,
      autoComplete: autoComplete,
    },
  });

  if (autoComplete === true) {
    const tasks = await prisma.tasks.updateMany({
      where: {
        stateId: id,
      },
      data: {
        completed: true,
      },
    });
  }

  return NextResponse.json({
    status: 200,
    message: "Estado actualizado correctamente",
  });
}

export async function DELETE(request: NextRequest) {
  const id = request.headers.get("stateId");
  const user = await getCurrentUser();

  if (!user?.id) {
    return NextResponse.json({
      status: 401,
      message: "No se ha podido obtener el usuario",
    });
  }

  const tareas = await prisma.tasks.findMany({
    where: {
      stateId: Number(id),
    },
  });

  if (tareas.length > 0) {
    return NextResponse.json({
      status: 400,
      message: "No se puede eliminar el estado porque tiene tareas asociadas",
    });
  }

  const estadoEliminado = await prisma.states.delete({
    where: {
      id: Number(id),
    },
  });

  return NextResponse.json({
    status: 200,
    message: "Estado eliminado correctamente",
  });
}
