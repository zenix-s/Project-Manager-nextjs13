import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";



export async function GET(){
  const prisma = new PrismaClient()
  const proyectos = await prisma.proyectos.findMany()
  return NextResponse.json(proyectos)
}