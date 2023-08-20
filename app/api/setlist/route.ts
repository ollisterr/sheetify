import { NextResponse } from 'next/server';

import { SetlistProperties } from '@store/SetlistModule';
import setlistApi from './api.utils';
import { SetlistPayload } from '@utils/api.utils';

export async function POST(request: Request) {
  const setlistData: SetlistPayload = await request.json();
  const setlistId = await setlistApi.create(setlistData);

  return NextResponse.json(setlistId);
}
