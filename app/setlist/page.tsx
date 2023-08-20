import { Metadata } from 'next';
import { EditSetlist } from '@components/EditSetlist';
import { Providers } from 'providers/Providers';

export const metadata: Metadata = { title: 'Create new setlist' };

export default function CreateSetlist() {
  return (
    <Providers readMode>
      <EditSetlist />
    </Providers>
  );
}
