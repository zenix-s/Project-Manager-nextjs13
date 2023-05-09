import prisma from "../lib/prismadb";

const getTeamMembers = async (id_proyecto: any) => {
  if (!id_proyecto) {
    return [];
  }

  // get the teamMembers from the asignaciones table and also include the username from the users table just the users.username

  const TeamMembers = await prisma.asignaciones.findMany({
    where: {
      id_proyecto: parseInt(id_proyecto),
    },
    include: {
      users: {
        select: {
          username: true,
        },
      },
    },
  });

  return TeamMembers;
};

export default getTeamMembers;
