import { Metadata } from 'next';
import { EditSetlist } from '@components/EditSetlist';
import { Providers } from 'providers/Providers';
import { formatSheetifyTitle } from '@utils/common.utils';

export const metadata: Metadata = {
  title: formatSheetifyTitle('Create new setlist'),
};

export default function CreateSetlist() {
  return (
    <Providers readMode>
      <EditSetlist />
    </Providers>
  );
}
