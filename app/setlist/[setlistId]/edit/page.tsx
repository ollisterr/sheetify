import { EditSetlist } from '@components/EditSetlist';
import { Providers } from 'providers/Providers';
import { SetlistRouteParams } from 'types';

export { generateMetadata } from '../page';

export default async function EditSetlistPage({ params }: SetlistRouteParams) {
  return (
    <Providers setlistId={params.setlistId} readMode>
      <EditSetlist />
    </Providers>
  );
}
