import { NextRequest, NextResponse } from "next/server";
import getCurrentUser from "@/actions/getCurrentUser";
import prisma from "@/lib/prismadb";
export async function GET(){
  const user = await getCurrentUser();

  if (!user?.id) {
    return NextResponse.error();
  }

  const userAsignedProjects = await prisma.assignments.findMany({
    where: {
      userId: parseInt(user.id.toString()),
    },
    include: {
      projects: true,
    },
  });

  const asignedTasks = await prisma.tasks.findMany({
    where: {
      userId: parseInt(user.id.toString()),
    },
  });

  const amountOfAsignedTasks = asignedTasks.filter((task) => task.completed == false && task.archived == false).length;
  const amountOfCompletedTasks = asignedTasks.filter((task) => task.completed == true && task.archived == false).length;
  const archivedTasks = asignedTasks.filter((task) => task.archived == true).length;
  const username = user.name;


  const averageTime = asignedTasks.reduce((acc, task) => {
    if (task.endDate && task.createdDate) {
      const time = task.endDate.getTime() - task.createdDate.getTime();
      return acc + time;
    }
    return acc;
  }, 0) / asignedTasks.length;






  return NextResponse.json({
    amountOfAsignedTasks,
    amountOfCompletedTasks,
    archivedTasks,
    averageTime,
    username,

  });


}