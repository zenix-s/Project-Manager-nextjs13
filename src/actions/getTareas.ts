import prisma from "../lib/prismadb";
import getCurrentUser from "./getCurrentUser";

const getTareas = async (id_proyecto: any) => {
  const user = await getCurrentUser();

  if (!user?.id) {
    return [];
  }

  if (!id_proyecto) {
    return [];
  }

  const tareas = await prisma.tasks.findMany({
    where: {
      projectId: parseInt(id_proyecto),
    },
  });
  return tareas;
};

export const getTarea = async (taskId: number) => {
  const user = await getCurrentUser();

  if (!user?.id) {
    return null;
  }

  try {
    const tarea = await prisma.tasks.findUnique({
      where: {
        id: taskId,
      },
    });
    
    return (
      tarea || {
        id: 0,
      }
    );
  } catch (error) {
    return {
      id: 0,
    }
  }
};

export default getTareas;
