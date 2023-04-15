import { getServerSession } from "next-auth";

import { authOptions } from "../pages/api/auth/[...nextauth]";

interface UserProps {
  id: string;
  name: string;
  email: string;
}



const getSession = async () => {
  const session = await getServerSession(authOptions);
  return session;
};



const getCurrentUser = async () => {
  const session = await getSession();
  if (!session) return null;
  const user = session?.user as UserProps;

  if (!user.id) return null;

  return user.id;
};

export default getCurrentUser;