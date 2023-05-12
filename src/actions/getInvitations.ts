import getCurrentUser from "./getCurrentUser";
import prisma from "@/lib/prismadb";
import { InvitationProps } from "@/types";

const getInvitations = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return null;
  }

  const invitations = await prisma.invitations.findMany({
    where: {
      receiverEmail: currentUser.email,
    },
  });

  return invitations;
};

export default getInvitations;
