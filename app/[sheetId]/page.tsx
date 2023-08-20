import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { Sheet } from '../../components/Sheet';
import { SheetRouteParams } from 'types';
import { Providers } from 'providers/Providers';
import { api } from '@utils/api.utils';
import { formatSheetifyTitle } from '@utils/common.utils';

export async function generateMetadata({
  params,
}: SheetRouteParams): Promise<Metadata> {
  const sheet = await api.sheet.load(params.sheetId);

  return {
    title: formatSheetifyTitle(sheet.title),
  };
}

export default function SheetPage({ params }: SheetRouteParams) {
  if (!params.sheetId) redirect('/');

  return (
    <Providers sheetId={params.sheetId} readMode>
      <Sheet />
    </Providers>
  );
}
