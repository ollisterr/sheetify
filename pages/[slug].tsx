import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { observer } from 'mobx-react-lite';

import { SheetPage } from '../components/SheetPage';
import { useSheet } from '../store/SheetProvider';
import { api } from '../utils/api.utils';
import { SheetProperties } from '../store/SheetModule';
import { redirect } from 'next/navigation';

const Page: NextPage = observer((props) => {
  const router = useRouter();
  const sheet = useSheet();

  if ('notFound' in props) redirect('/');

  return (
    <>
      <Head>
        <title>
          {sheet.title ?? (router.asPath ? 'Untitled' : 'New sheet')} | Sheetify
        </title>
        <meta name="description" content="Sheet music" />
        <link rel="icon" href="/favicon/favicon.png" />
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
    // console.error('ERROR rendering page', err);

    // Redirects and renders to 404
    return { notFound: true };
  }
};

export default Page;
