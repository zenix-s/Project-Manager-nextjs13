import getCurrentUser from "./getCurrentUser";
import prisma from "../lib/prismadb";
export async function getProyectos() {
  const iduser = await getCurrentUser();

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
