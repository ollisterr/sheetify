import { NextResponse } from 'next/server';

import { sheetApi } from '../';
import { SheetProperties } from '@store/SheetModule';
import { RouteParams } from 'types';
import { BadRequestResponse, NotFoundResponse } from 'app/api/api.utils';

export async function GET(
  req: Request,
  { params }: RouteParams<{ sheetId: string }>,
) {
  const sheetId = params.sheetId;

  if (!sheetId) return BadRequestResponse();

  const data = await sheetApi.load(sheetId);

  if (!data) return NotFoundResponse();

  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const data: SheetProperties = await req.json();
  const insertedId = await sheetApi.save(data);

  return NextResponse.json(insertedId);
}
