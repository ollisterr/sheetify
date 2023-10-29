import { SheetProperties } from '@store/SheetModule';
import { save } from './sheet.api';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const data: SheetProperties = await req.json();
  const insertedId = await save(data);

  return NextResponse.json(insertedId);
}
