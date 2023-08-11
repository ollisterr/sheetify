import { useEffect } from 'react';
import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { observer } from 'mobx-react-lite';

import { Loading } from '../components';
import { SheetPage } from '../components/SheetPage';
import { useSheet } from '../store/SheetProvider';

const Page: NextPage = observer((props) => {
  const router = useRouter();
  const sheet = useSheet();

  useEffect(() => {
    if ('notFound' in props) {
      router?.replace('/');
    }
  }, []);

  if ('notFound' in props) return <Loading />;

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
  { sheet: any },
  { slug: string }
> = async ({ params, preview = process.env.NODE_ENV === 'development' }) => {
  try {
    return { props: { sheet: {} } };
  } catch (err) {
    // Redirects and renders to 404
    return { notFound: true };
  }
};

export default Page;
