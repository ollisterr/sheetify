import Head from 'next/head';
import { observer } from 'mobx-react-lite';

import { SheetPage } from '../components/Sheet';
import { useSheet } from '../store/SheetProvider';

const IndexPage = observer(() => {
  const { title } = useSheet();

  return (
    <>
      <Head>
        <title>{title ?? 'New sheet'} | Sheetify</title>
        <meta name="description" content="Sheet music" />
      </Head>

      <SheetPage />
    </>
  );
});

export default IndexPage;
