import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

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

  const tareaEliminada = await prisma.tasks.delete({
    where: {
      id: Number(id),
    },
  });

  return NextResponse.json({
    tareaEliminada,
  });
}
