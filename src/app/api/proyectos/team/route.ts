import { NextResponse, NextRequest } from "next/server";
import getCurrentUser from "@/actions/getCurrentUser";

//   id: number;
//   projectId: number;
//   userId: number;
//   // role: "owner" | "admin" | "member" | "viewer";
//   role: string;

export async function GET(request: NextRequest) {
  const id = request.headers.get("projectId");
  const user = await getCurrentUser();

  if (!id) {
    return NextResponse.json({
      status: 400,
      message: "Faltan Parametros",
    });
  }

  if (!user?.id || !user?.email) {
    return NextResponse.json({
      status: 401,
      message: "No Autorizado",
    });
  }

  // const permisos = await prisma?.assignments.findFirst({
  //   where: {
  //     userId: user.id,
  //     projectId: Number(id),
  //   },
  // });

  // if (
  //   permisos?.role !== "owner" &&
  //   permisos?.role !== "admin" &&
  //   permisos?.role !== "member"
  // ) {
  //   return NextResponse.json({
  //     status: 401,
  //     message: "No Autorizado",
  //   });
  // }

  const team = await prisma?.assignments.findMany({
    where: {
      projectId: Number(id),
    },
    include: {
      users: true,
    },
  });

  return NextResponse.json({
    team: team,
    status: 200,
    message: "Miembros Obtenidos",
  });
}

export async function PUT(request: NextRequest) {
  const res = await request.json();
  const user = await getCurrentUser();

  if (!user?.id || !user?.email) {
    return NextResponse.json({
      status: 401,
      message: "No autorizado",
    });
  }
  const { id, role, projectId } = res;

  const permiso = await prisma?.assignments.findFirst({
    where: {
      userId: user.id,
      projectId: projectId,
    },
  });

  if (permiso?.role !== "owner" && permiso?.role !== "admin") {
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

export async function DELETE(request: NextRequest) {
  const teamMemberId = request.headers.get("teamMemberId");
  const projectId = request.headers.get("projectId");
  const user = await getCurrentUser();


  

  if (!user?.id || !user?.email) {
    return NextResponse.json({
      status: 401,
      message: "No autorizado",
    });
  }

  const permiso = await prisma?.assignments.findFirst({
    where: {
      userId: user.id,
      projectId: Number(projectId),
    },
  });

  if (permiso?.role !== "owner" && permiso?.role !== "admin") {
    return NextResponse.json({
      status: 401,
      message: "No autorizado",
    });
  }

  const miembro = await prisma?.assignments.findFirst({
    where: {
      userId: Number(teamMemberId),
      projectId: Number(projectId),
    },
  });


  const miembroEliminado = await prisma?.assignments.delete({
    where: {
      id: miembro?.id,
    },
  });

  return NextResponse.json({
    status: 200,
    message: "Miembro eliminado correctamente",
  });
}
