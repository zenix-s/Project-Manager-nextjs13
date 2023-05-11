import getCurrentUser from "./getCurrentUser";
import prisma from "@/lib/prismadb";
import { ProjectProps } from "@/types";

const getProyectos = async () => {
  const user = await getCurrentUser();

  if (!user?.id) {
    return [];
  }

  const proyectos = await prisma.projects.findMany({
    where: {
      assignments: {
        some: {
          userId: parseInt(user.id.toString()),
        },
      },
    },
    include: {
      assignments: {
        where: {
          userId: parseInt(user.id.toString()),
        },
      },
    },
  });

  const proyectosConRol = proyectos.map((proyecto) => {
    const rol = proyecto.assignments[0].role;

    const proyectoConRol: ProjectProps = {
      ...proyecto,
      role: rol,
    };

    return proyectoConRol;
  });

  return proyectosConRol;
};

export default getProyectos;
