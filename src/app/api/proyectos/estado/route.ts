import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import getCurrentUser from "@/actions/getCurrentUser";

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
  console.log(res);

  const { 
    id, 
    projectId, 
    name, 
    color,
    autoComplete 
  } = res;

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

  




  return NextResponse.json(
    {
      status: 200,
      message: "Estado actualizado correctamente",
    }
  );
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
