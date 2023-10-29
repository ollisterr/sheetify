import { NextResponse } from 'next/server';

import { SheetProperties } from '@store/SheetModule';
import {
  BadRequestResponse,
  NotFoundResponse,
  revalidateSheet,
} from '@api/api.utils';
import { sheetApi } from '@api/sheet';
import { RouteParams } from 'types';

export async function GET(
  _: Request,
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
  const updatedId = await sheetApi.save(data);

  if (!updatedId) return BadRequestResponse();

  // revalidate cache after updating sheet data
  revalidateSheet(updatedId);

  return NextResponse.json(updatedId);
}
