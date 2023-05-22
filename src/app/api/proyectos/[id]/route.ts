import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import getCurrentUser from "@/actions/getCurrentUser";

interface paramsProps {
  id: string;
}

export async function GET(request: Request, { params }: { params: paramsProps }) {
  const user = await getCurrentUser();
  
  const { id } = params;



  const tareas = await prisma.tasks.findMany({
    where: {
      projectId: Number(id),
    },
  });

  return NextResponse.json(tareas);
}