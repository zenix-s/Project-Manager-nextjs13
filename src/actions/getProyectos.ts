import getCurrentUser from "./getCurrentUser";
import prisma from "../lib/prismadb";

const getProyectos = async () => {
  const user = await getCurrentUser();
  const iduser = user?.id;

  if (iduser == null) {
    return [];
  }

  const proyectos = await prisma.proyectos.findMany({
    where: {
      asignaciones: {
        some: {
          id_usuario: parseInt(iduser),
        },
      },
    },
    include: {
      asignaciones: {
        where: {
          id_usuario: parseInt(iduser),
        },
      },
    },
  });

  return proyectos;
}

export default getProyectos;