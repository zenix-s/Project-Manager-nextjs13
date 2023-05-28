import { NextResponse, NextRequest } from "next/server";
import getCurrentUser from "@/actions/getCurrentUser";

//   id: number;
//   projectId: number;
//   userId: number;
//   // role: "owner" | "admin" | "member" | "viewer";
//   role: string;

export async function PUT(request: NextRequest) {
  const res = await request.json();
  const user = await getCurrentUser();

  if (!user?.id || !user?.email) {
    return NextResponse.json({ 
      status: 401, 
      message: "No autorizado" 
    });
  }
  const { id, role, projectId } = res;

  const permiso = await prisma?.assignments.findFirst({

    where: {
      userId: user.id,
      projectId: projectId,
    },
  });

  if ( permiso?.role !== "owner" && permiso?.role !== "admin" ) {
    return NextResponse.json({
      status: 401,
      message: "No autorizado",
    });
  }


  const miembroActualizado = await prisma?.assignments.update({
    where: {
      id: id,
    },
    data: {
      role: role,
    },
  });

  return NextResponse.json({
    status: 200,
    message: "Miembro actualizado correctamente",
  });
}
