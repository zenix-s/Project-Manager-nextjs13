import { NextRequest, NextResponse } from "next/server";
import prisma  from '../../../lib/prismadb'
import getCurrentUser from "../../../actions/getCurrentUser";

export async function POST(
  request: Request
){

  const user = await getCurrentUser();

  if (!user?.id) {
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
      id_usuario: parseInt(user.id),
      rol: "admin",
    },
  });


  return NextResponse.json(newProject);
}


export async function DELETE(
  request: Request
){

  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.error();
  }
  
  const body = await request.json();

  const {
    idProyecto,
  } = body;

  // TODO: check if user is admin of the project

  const deleteAsignaciones = await prisma.asignaciones.deleteMany({
    where: {
      id_proyecto: parseInt(idProyecto),
    },
  })

  const deleteProyecto = await prisma.proyectos.delete({
    where: {
      id: parseInt(idProyecto),
    },
  })



  return NextResponse.json({
    message: "ok",
  });
}