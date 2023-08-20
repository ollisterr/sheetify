import { NextResponse } from 'next/server';
import setlistApi from '../api.utils';
import { SetlistRouteParams } from 'types';
import { BadRequestResponse } from 'app/api/api.utils';
import { SaveSetlistPayload } from '@utils/api.utils';

export async function GET(_: Request, { params }: SetlistRouteParams) {
  const setlistId = params.setlistId;

  if (!setlistId) {
    return BadRequestResponse();
  }

  const data = await setlistApi.load(setlistId);

  return NextResponse.json(data);
}

export async function POST(request: Request, { params }: SetlistRouteParams) {
  const data: SaveSetlistPayload = await request.json();
  const insertedId = await setlistApi.save(params.setlistId, data);

  if (!insertedId) return BadRequestResponse();

  return NextResponse.json(insertedId);
}

export async function DELETE(req: Request, { params }: SetlistRouteParams) {
  const sheetId = await req.json();
  const insertedId = await setlistApi.remove(sheetId, params.setlistId);

  return NextResponse.json(insertedId);
}
