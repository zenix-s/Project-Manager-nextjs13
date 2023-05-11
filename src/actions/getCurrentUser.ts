import prisma from "@/lib/prismadb";
import getSession from "./getSession";

const getCurrentUser = async () => {
  try {
    const session = await getSession();
    if (!session?.user?.email) {
      return null;
    }
    const User = await prisma.users.findUnique({
      where: {
        email: session?.user?.email,
      },
    });

    if (!User) {
      return null;
    }

    const CurrentUser = {
      id: User.id,
      email: User.email,
      name: User.username,
    };

    return CurrentUser;
  } catch (error) {
    return null;
  }
};

export const getPermissionsForProject = async (projectId: number) => {
  const user = await getCurrentUser();
  if (!user?.email) {
    return false;
  }

  const UserInPorject = await prisma.assignments.findMany({
    where: {
      AND: [
        {
          projectId: projectId,
        },
        {
          userId: user?.id,
        },
      ],
    },
  });

  if (UserInPorject[0]?.userId !== user?.id || !UserInPorject[0]?.id) {
    return false;
  }

  return true;
};

export default getCurrentUser;
