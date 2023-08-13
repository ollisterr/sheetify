import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { redirect } from 'next/navigation';
import { observer } from 'mobx-react-lite';

import { Sheet } from '../../components/Sheet';
import { useSheet } from '../../store/SheetProvider';
import { SheetProperties } from '../../store/SheetModule';
import { loadSheet } from '../api/load';
import { AppProps } from '../_app';

export interface SheetPageProps extends AppProps {
  sheet: SheetProperties;
}

const SheetPage: NextPage<SheetPageProps> = observer((props) => {
  const { title } = useSheet();

  if ('notFound' in props) redirect('/');

  return (
    <>
      <Head>
        <title>{title ?? 'Untitled'} | Sheetify</title>
        <meta name="description" content="Sheet music" />
      </Head>

      <Sheet />
    </>
  );
});

export type SheetPageServerSideProps = GetServerSideProps<
  SheetPageProps,
  { sheetId: string }
>;

export const getServerSideProps: SheetPageServerSideProps = async ({
  params,
}) => {
  try {
    const sheetId = params?.sheetId;
    if (!sheetId) return { notFound: true };

    const sheetData = await loadSheet(sheetId);

    if (!sheetData) return { notFound: true };

    console.log('OPENING SHEET', sheetId, sheetData);
    return { props: { sheet: sheetData, readMode: true } };
  } catch (err) {
    console.error('ERROR rendering page', err);

    // Redirects and renders to 404
    return { notFound: true };
  }
};

export default SheetPage;
