export * from '../page';

import { Sheet } from '@components/Sheet';
import { redirect } from 'next/navigation';
import { Providers } from 'providers/Providers';
import { SheetRouteParams } from 'types';

export default function EditSheetPage({ params }: SheetRouteParams) {
  if (!params.sheetId) redirect('/');

  return (
    <Providers sheetId={params.sheetId}>
      <Sheet />
    </Providers>
  );
}
