import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { redirect } from 'next/navigation';
import { observer } from 'mobx-react-lite';

import { SheetPage } from '@components/SheetPage';
import { useSheet } from '@store/SheetProvider';
import { api } from '@utils/api.utils';
import { SheetProperties } from '@store/SheetModule';

const SetListPage: NextPage = observer((props) => {
  const { title } = useSheet();

  if ('notFound' in props) redirect('/');

  return (
    <>
      <Head>
        <title>{title ?? 'Untitled'} | Sheetify</title>
        <meta name="description" content="Sheet music" />
      </Head>

      <SheetPage />
    </>
  );
});

export const getServerSideProps: GetServerSideProps<
  { sheet: SheetProperties },
  { slug: string }
> = async ({ params, res }) => {
  try {
    if (!params?.slug) return { notFound: true };

    const { data: sheetData } = await api.load(params.slug);
    console.log('OPENING SHEET', params.slug, sheetData);

    return { props: { sheet: sheetData } };
  } catch (err) {
    console.error('ERROR rendering page', err);

    // Redirects and renders to 404
    return { notFound: true };
  }
};

export default SetListPage;
