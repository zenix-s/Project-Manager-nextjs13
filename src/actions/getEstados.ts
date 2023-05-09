import prisma from "../lib/prismadb";

const getEstados = async (id_proyecto: Number) => {
  if (!id_proyecto) {
    return [];
  }

  const id = parseInt(id_proyecto.toString());
  const estados = await prisma.estados.findMany({
    where: {
      id_proyecto: id,
    },
    orderBy: {
      order: "asc",      
    },
  });
  
  return estados;
};

export default getEstados;
