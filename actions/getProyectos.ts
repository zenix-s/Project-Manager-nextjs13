import getCurrentUser from "./getCurrentUser";
import prisma from "../lib/prismadb";
export async function getProyectos() {
  const iduser = await getCurrentUser();

  if (iduser == null) {
    return [];
  }

  // const asignaciones = await prisma.asignaciones.findMany({
  //   where: {
  //     id_usuario: parseInt(iduser),
  //   },
  // });

  // const proyectos = await prisma.proyectos.findMany({
  //   where: {
  //     id: {
  //       in: asignaciones.map((asignacion) => asignacion.id_proyecto),
  //     },
  //   },
  // });

  // return proyectos;

  // to the above code i need that proyectos also have the rol of the user that is present in asignaciones

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
