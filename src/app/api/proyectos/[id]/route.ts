import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

interface paramsProps {
  id: string;
}

export async function GET(request: Request, { params }: { params: paramsProps }) {
  const idUser = request.headers.get("user-id");
  const { id } = params;



  const tareas = await prisma.tareas.findMany({
    where: {
      id_proyecto: Number(id),
    },
  });

  return NextResponse.json(tareas);
}
