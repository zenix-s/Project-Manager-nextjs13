import { NextResponse } from "next/server";
import prisma  from '../../../../lib/prismadb'
import getCurrentUser from "../../../../actions/getCurrentUser";

export async function GET(request: Request){
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.error();
  }

  const body = await request.json();

  
}