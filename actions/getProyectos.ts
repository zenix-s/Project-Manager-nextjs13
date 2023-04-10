import getCurrentUser from "./getCurrentUser";
import prisma from "../lib/prismadb";
export async function getProyectos() {
  const iduser = await getCurrentUser();

  if (iduser == null) {
    return [];
  }

  const asignaciones = await prisma.asignaciones.findMany({
    where: {
      id_usuario: parseInt(iduser),
    },
  });

  const proyectos = await prisma.proyectos.findMany({
    where: {
      id: {
        in: asignaciones.map((asignacion) => asignacion.id_proyecto),
      },
    },
  });

  return proyectos;
}
