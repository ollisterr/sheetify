import { Sheet } from '../components/Sheet';
import { Providers } from 'providers/Providers';

const IndexPage = () => {
  return (
    <Providers readMode={false}>
      <Sheet />
    </Providers>
  );
};

export default IndexPage;
