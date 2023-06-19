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

  const username = user.name;
  const amountOfAsignedTasks = asignedTasks.filter((task) => task.completed == false && task.archived == false).length;
  const amountOfCompletedTasks = asignedTasks.filter((task) => task.completed == true && task.archived == false).length;
  const archivedTasks = asignedTasks.filter((task) => task.archived == true).length;


  const averageTime = asignedTasks.reduce((acc, task) => {
    if (task.endDate && task.createdDate) {
      const time = task.endDate.getTime() - task.createdDate.getTime();
      return acc + time;
    }
    return acc;
  }, 0) / asignedTasks.length;

  const tasksPerPriority = await prisma.tasks.findMany({
    where: {
      userId: parseInt(user.id.toString()),
    },
    select: {
      priority: true,
    },
  });

  const noPriority = tasksPerPriority.filter((task) => task.priority == 0).length;
  const lowPriority = tasksPerPriority.filter((task) => task.priority == 1).length;
  const mediumPriority = tasksPerPriority.filter((task) => task.priority == 2).length;
  const highPriority = tasksPerPriority.filter((task) => task.priority == 3).length;
  const urgentPriority = tasksPerPriority.filter((task) => task.priority == 4).length;







  return NextResponse.json({
    username,
    amountOfAsignedTasks,
    amountOfCompletedTasks,
    archivedTasks,
    averageTime,
    noPriority,
    lowPriority,
    mediumPriority,
    highPriority,
    urgentPriority,

  });


}