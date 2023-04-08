import { NextResponse } from "next/server";
import prisma from "../../libs/prismadb";


export async function GET(){
  const proyectos = await prisma.proyectos.findMany()
  console.log(proyectos)
  return NextResponse.json(proyectos)
}