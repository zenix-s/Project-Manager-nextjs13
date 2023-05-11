import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function POST(request: NextRequest) {
  const res = await request.json();

  const { id_proyecto, nombre, color } = res;

  const lastOrder = await prisma.states.findFirst({
    where: {
      projectId: id_proyecto,
    },
    orderBy: {
      order: "desc",
    },
  });

  const newOrder = lastOrder ? lastOrder.order + 1 : 1;



  const nuevoEstado = await prisma.states.create({
    data: {
      name: nombre,
      color: color,
      projectId: id_proyecto,
      // new order must be the last one + 1
      order: newOrder,
    },
  });

  return NextResponse.json({
    nuevoEstado,
  });
}

export async function PUT(request: NextRequest) {
  const res = await request.json();

  const { id, id_proyecto, nombre, color } = res;

  const estadoActualizado = await prisma.states.update({
    where: {
      id: id,
    },
    data: {
      name: nombre,
      color: color,
    },
  });

  return NextResponse.json({
    estadoActualizado,
  });
}

export async function DELETE(request: NextRequest) {
  const id = request.headers.get("id_estado");


  const tareas = await prisma.tasks.findMany({
    where: {
      stateId: Number(id),
    },
  });

  if (tareas.length > 0) {
    return NextResponse.json({
      error: "No se puede eliminar el estado porque tiene tareas asociadas",
    });
  }

  const estadoEliminado = await prisma.states.delete({
    where: {
      id: Number(id),
    },
  });

  return NextResponse.json({
    estadoEliminado,
  });
}
