import prisma from "../lib/prismadb";

const getTeamMembers = async (id_proyecto: any) => {



  if (!id_proyecto) {
    return [];
  }


  const TeamMembers = await prisma.asignaciones.findMany({
    where: {
      id_proyecto: parseInt(id_proyecto),
    },
  });
  return TeamMembers;
}

export default getTeamMembers;