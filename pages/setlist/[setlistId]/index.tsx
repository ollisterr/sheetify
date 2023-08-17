import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { redirect } from 'next/navigation';
import { observer } from 'mobx-react-lite';

import { Sheet } from '@components/Sheet';
import { SetlistProperties } from '@store/SetlistModule';
import { useSetSheet, useSetlist, useSheet } from '@store/SheetProvider';
import { Button, IconButton } from 'styles';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { styled } from 'styled-components';
import { useEffect } from 'react';
import { loadSetlist } from 'pages/api/setlist';

export interface SetlistPageProps {
  setlist: SetlistProperties;
}

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
        <title>{`${setlist.title || 'Untitled'} | Sheetify`}</title>
        <meta name="description" content="Sheet music" />
      </Head>

      <Sheet />

      <SetlistControls>
        {setlist.previousSheet && (
          <SheetControl
            disabled={!setlist.previousSheet}
            onClick={setlist.previousSheet.onClick}
            style={{ maxWidth: '40%' }}
          >
            <FaChevronLeft />{' '}
            <SheetLabel>{setlist.previousSheet.title}</SheetLabel>
          </SheetControl>
        )}

        {setlist.nextSheet && (
          <SheetControl
            onClick={setlist.nextSheet.onClick}
            style={{ marginLeft: 'auto', maxWidth: '40%' }}
          >
            <SheetLabel>{setlist.nextSheet.title}</SheetLabel>{' '}
            <FaChevronRight />
          </SheetControl>
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
  padding: ${(p) => p.theme.spacing.small};
  background-color: #fff;
  z-index: 10;
  max-width: 100%;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
`;

const SheetControl = styled(Button)`
  max-width: 40%;
`;

const SheetLabel = styled.label`
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const getServerSideProps: GetServerSideProps<
  { setlist: SetlistProperties },
  { setlistId: string }
> = async ({ params }) => {
  try {
    const setlistId = params?.setlistId;

    if (!setlistId) return { notFound: true };

    const setlistData = await loadSetlist(setlistId);
    console.log('OPENING SETLIST', setlistData);

    return { props: { setlist: setlistData, readMode: true } };
  } catch (err) {
    // Redirects and renders to 404
    return { notFound: true };
  }
};

export default SetListPage;
