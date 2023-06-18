import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prismadb";



export async function GET(Request: NextRequest) {
  

  const taskId = Request.headers.get("taskId");
  const porjectId = Request.headers.get("projectId");

  if (!taskId) {
    return NextResponse.json({
      status: 400,
      message: "Faltan Parametros",
    });
  }

  const task = await prisma.tasks.findUnique({
    where: {
      id: Number(taskId),
    },
  });

  if (!task) {
    return NextResponse.json({
      status: 404,
      message: "Tarea no encontrada",
    });
  }
  
  if (task.projectId !== Number(porjectId)) {
    return NextResponse.json({
      status: 401,
      message: "No Autorizado",
    })
  }

  const projectStates = await prisma.states.findMany({
    where: {
      projectId: task?.projectId,
    },
  });

  const projectUsers = await prisma.assignments.findMany({
    where: {
      projectId: Number(porjectId),
    },
    include: {
      users: true,
    },
  });






  




  return NextResponse.json({
    status: 200,
    message: "Tarea Obtenida",
    task: task,
    estados: projectStates,
    teamMembers: projectUsers,
  });
}
