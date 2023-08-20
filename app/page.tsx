import { Sheet } from '../components/Sheet';
import { NextPageProps } from 'types';
import { Providers } from 'providers/Providers';

const IndexPage = (_: NextPageProps<{ sheetId?: string }>) => {
  return (
    <Providers readMode={false}>
      <Sheet />
    </Providers>
  );
};

export default IndexPage;
