import prisma from "../lib/prismadb";

const getTareas = async (id_proyecto: any) => {



  if (!id_proyecto) {
    return [];
  }


  const tareas = await prisma.tasks.findMany({
    where: {
      projectId: parseInt(id_proyecto),
    },
  });
  return tareas;
}

export default getTareas;