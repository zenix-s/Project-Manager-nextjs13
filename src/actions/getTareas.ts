import prisma from "../lib/prismadb";

const getTareas = async (id_proyecto: any) => {



  if (!id_proyecto) {
    return [];
  }


  const tareas = await prisma.tareas.findMany({
    where: {
      id_proyecto: parseInt(id_proyecto),
    },
  });
  return tareas;
}

export default getTareas;