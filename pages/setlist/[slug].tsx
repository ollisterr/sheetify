import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { redirect } from 'next/navigation';
import { observer } from 'mobx-react-lite';

import { SheetPage } from '@components/SheetPage';
import { api } from '@utils/api.utils';
import { SetlistProperties } from '@store/SetlistModule';
import { useSetSheet, useSetlist, useSheet } from '@store/SheetProvider';
import { IconButton } from 'styles';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { styled } from 'styled-components';
import { useEffect } from 'react';

const SetListPage: NextPage = observer((props) => {
  const setlist = useSetlist();
  const sheet = useSheet();
  const setSheet = useSetSheet();

  useEffect(() => {
    if (!setlist || setlist.sheet.id === sheet.id) return;

    setSheet(setlist.sheet);
  }, [setlist?.sheet.id]);

  if ('notFound' in props || !setlist) redirect('/');

  return (
    <>
      <Head>
        <title>{setlist.title} | Sheetify</title>
        <meta name="description" content="Sheet music" />
      </Head>

      <SheetPage />

      <SetlistControls>
        {setlist.previousSheet && (
          <IconButton
            disabled={!setlist.previousSheet}
            onClick={setlist.previousSheet.onClick}
          >
            <FaChevronLeft /> <label>{setlist.previousSheet.title}</label>
          </IconButton>
        )}

        {setlist.nextSheet && (
          <IconButton
            disabled={!setlist.nextSheet}
            onClick={setlist.nextSheet.onClick}
            style={{ marginLeft: 'auto' }}
          >
            <label>{setlist.nextSheet.title}</label> <FaChevronRight />
          </IconButton>
        )}
      </SetlistControls>
    </>
  );
});

const SetlistControls = styled.section`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: ${(p) => p.theme.spacing.default};
  background-color: #fff;
  z-index: 10;
`;

export const getServerSideProps: GetServerSideProps<
  { setlist: SetlistProperties },
  { slug: string }
> = async ({ params }) => {
  try {
    if (!params?.slug) {
      return { notFound: true };
    }

    const { data: setlistData } = await api.loadSetlist(params.slug);
    console.log('OPENING SETLIST', setlistData);

    return { props: { setlist: setlistData } };
  } catch (err) {
    // Redirects and renders to 404
    return { notFound: true };
  }
};

export default SetListPage;
