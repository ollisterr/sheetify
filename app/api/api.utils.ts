import { createSetlistTag, createSheetTag } from '@utils/api.utils';
import { revalidateTag } from 'next/cache';

export const NotFoundResponse = () =>
  new Response('Not found', { status: 404 });

export const BadRequestResponse = () =>
  new Response('Bad request', { status: 400 });

export const revalidateSheet = (sheetId: string) => {
  console.info('REVALIDATING', sheetId);
  revalidateTag(createSheetTag(sheetId));
};

export const revalidateSetlist = (setlistId: string) => {
  console.info('REVALIDATING', setlistId);
  revalidateTag(createSetlistTag(setlistId));
};
