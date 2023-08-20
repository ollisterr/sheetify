'use client';

import type { NextPage } from 'next';
import Head from 'next/head';
import { observer } from 'mobx-react-lite';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { styled } from 'styled-components';
import { useEffect } from 'react';

import { Sheet } from '@components/Sheet';
import { useSetSheet, useSetlist, useSheet } from '@store/SheetProvider';
import { Button } from 'styles';
import { redirect } from 'next/navigation';

export const ViewSetlist: NextPage = observer(() => {
  const setlist = useSetlist();
  const sheet = useSheet();
  const setSheet = useSetSheet();

  useEffect(() => {
    const onKeyPress = (key: KeyboardEvent) => {
      switch (key.key) {
        case 'ArrowRight':
          return setlist?.nextSheet?.onClick();
        case 'ArrowLeft':
          return setlist?.previousSheet?.onClick();
      }
    };

    document.addEventListener('keydown', onKeyPress);

    return () => {
      document.removeEventListener('keydown', onKeyPress);
    };
  }, []);

  useEffect(() => {
    if (!setlist || setlist.sheet.id === sheet.id) return;

    setSheet(setlist.sheet);
  }, [setlist?.sheet.id]);

  if (!setlist) return redirect('/setlist');

  return (
    <>
      <Sheet setlistId={setlist.id} />

      <div style={{ height: '8rem' }} />

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
  padding: ${(p) => p.theme.spacing.absolute.small};
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
