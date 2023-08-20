import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { Sheet } from '../../components/Sheet';
import { RouteParams, SheetRouteParams } from 'types';
import { Providers } from 'providers/Providers';
import { api } from '@utils/api.utils';

export async function generateMetadata({
  params,
}: SheetRouteParams): Promise<Metadata> {
  const sheet = await api.sheet.load(params.sheetId);

  return {
    title: sheet.title,
  };
}

const SheetPage = ({ params, readMode = true }: SheetRouteParams) => {
  if (!params.sheetId) redirect('/');

  return (
    <Providers sheetId={params.sheetId} readMode={readMode}>
      <Sheet />
    </Providers>
  );
};

export default SheetPage;
