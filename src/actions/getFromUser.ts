import prisma from "@/lib/prismadb";
import { UserProps } from "@/types";

const getName = (id: number) => {
  let user = prisma.users.findUnique({
    where: {
      id: id,
    },
  });

  
  return user;
};
