import { NextRequest, NextResponse } from 'next/server';

import setlistApi from '../setlist.api';
import { SetlistRouteParams } from 'types';
import { BadRequestResponse, revalidateSetlist } from '@api/api.utils';
import { SaveSetlistPayload } from '@utils/api.utils';

export async function GET(_: Request, { params }: SetlistRouteParams) {
  const setlistId = params.setlistId;

  if (!setlistId) return BadRequestResponse();

  const data = await setlistApi.load(setlistId);

  return NextResponse.json(data);
}

export async function POST(
  request: NextRequest,
  { params }: SetlistRouteParams,
) {
  const data: SaveSetlistPayload = await request.json();
  const insertedId = await setlistApi.save(params.setlistId, data);

  if (!insertedId) return BadRequestResponse();

  revalidateSetlist(params.setlistId);

  return NextResponse.json(insertedId);
}

export async function DELETE(req: Request, { params }: SetlistRouteParams) {
  const sheetId = await req.json();
  const insertedId = await setlistApi.remove(sheetId, params.setlistId);

  return NextResponse.json(insertedId);
}
