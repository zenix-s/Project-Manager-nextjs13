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

export default getCurrentUser;
