import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { Sheet } from '../../components/Sheet';
import { RouteParams } from 'types';
import { Providers } from 'providers/Providers';
import { api } from '@utils/api.utils';

interface Props {
  sheetId: string;
}

export async function generateMetadata({
  params,
}: RouteParams<Props>): Promise<Metadata> {
  const sheet = await api.sheet.load(params.sheetId);

  return {
    title: sheet.title,
  };
}

const SheetPage = ({ params }: RouteParams<Props>) => {
  if (!params.sheetId) redirect('/');

  return (
    <Providers sheetId={params.sheetId} readMode={true}>
      <Sheet />
    </Providers>
  );
};

export default SheetPage;
