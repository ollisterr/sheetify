import { NextResponse } from 'next/server';

import { sheetApi } from '../';
import { SheetProperties } from '@store/SheetModule';
import { RouteParams } from 'types';

export async function GET(
  req: Request,
  { params }: RouteParams<{ sheetId: string }>,
) {
  const sheetId = params.sheetId;

  if (!sheetId || Array.isArray(sheetId)) {
    return new Response('Bad request', { status: 400 });
  }

  const data = await sheetApi.load(sheetId);

  if (!data) return new Response('Not found', { status: 404 });

  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const data: SheetProperties = await req.json();
  const insertedId = await sheetApi.save(data);

  return NextResponse.json(insertedId);
}
