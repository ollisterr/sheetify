import { Metadata } from 'next';

import { ViewSetlist } from '@components/ViewSetlist';
import { Providers } from 'providers/Providers';
import { SetlistRouteParams } from 'types';
import { api } from '@utils/api.utils';

export async function generateMetadata({
  params,
}: SetlistRouteParams): Promise<Metadata> {
  const setlist = await api.setlist.load(params.setlistId);

  return {
    title: setlist.title,
  };
}

export default async function SetlistPage({ params }: SetlistRouteParams) {
  return (
    <Providers setlistId={params.setlistId} readMode>
      <ViewSetlist />
    </Providers>
  );
}
