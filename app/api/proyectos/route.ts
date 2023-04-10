import { NextRequest, NextResponse } from "next/server";
import prisma  from '../../../lib/prismadb'
import getCurrentUser from "../../../actions/getCurrentUser";

export async function POST(
  request: Request
){

  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.error();
  }
  
  const body = await request.json();

  const {
    name,
    description,
    deadline,
  } = body;

  

  const newProject = await prisma.proyectos.create({
    data: {
      name: name,
      description: description,
      endDate: new Date(deadline),
      creationDate: new Date(),
    },
  });

  const newProjectUser = await prisma.asignaciones.create({
    data: {
      id_proyecto: newProject.id,
      id_usuario: parseInt(user),
      rol: "admin",
    },
  });


  return NextResponse.json(newProject);
}


