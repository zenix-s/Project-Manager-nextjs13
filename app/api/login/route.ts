import { NextRequest, NextResponse } from 'next/server';
import {headers } from 'next/headers';

export async function POST(req: Request){
  const headerlist = headers();
  const username = headerlist.get('username');
  const password = headerlist.get('password');
  if (username === 'admin' && password === 'admin'){
    return NextResponse.json(true);
  }
  return NextResponse.json(false);
}