import { NextResponse } from 'next/server';

import setlistApi from './setlist.api';
import { SetlistPayload } from '@utils/api.utils';

export async function POST(request: Request) {
  const setlistData: SetlistPayload = await request.json();
  const setlistId = await setlistApi.create(setlistData);

  return NextResponse.json(setlistId);
}
