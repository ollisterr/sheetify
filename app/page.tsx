import { Metadata } from 'next';
import { Sheet } from '../components/Sheet';
import { Providers } from 'providers/Providers';
import { formatSheetifyTitle } from '@utils/common.utils';

export const metadata: Metadata = {
  title: formatSheetifyTitle('New sheet music'),
};

const IndexPage = () => {
  return (
    <Providers readMode={false}>
      <Sheet />
    </Providers>
  );
};

export default IndexPage;
