'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { useRouter, usePathname } from 'next/navigation';
import { useReactToPrint } from 'react-to-print';
import { observer } from 'mobx-react-lite';
import { LuEdit3 } from 'react-icons/lu';
import { FaEye, FaRegEdit } from 'react-icons/fa';
import { AiOutlineZoomIn } from '@react-icons/all-files/ai/AiOutlineZoomIn';
import { AiOutlineZoomOut } from '@react-icons/all-files/ai/AiOutlineZoomOut';

import { useSetlist, useSheet } from '@store/SheetProvider';
import { api } from '@utils/api.utils';

import { ControlBar } from './ControlBar';
import { Section } from './Section';
import { SheetSpecification } from './SheetSpecification';
import { Loading } from './Loading';

import { IconButton, Row, Subtitle } from '../styles';
import { useGlobalState } from '../providers/GlobalStateProvider';
import { getRouteParamFromUrl, trimEditPathname } from '@utils/common.utils';
import { PageContainer } from './PageContainer';
import { MdPlaylistAdd } from 'react-icons/md';
import { device } from '@utils/constants';
import { isExistingSheet } from '@store/SheetModule';

export const Sheet = observer(() => {
  const setlist = useSetlist();
  const sheet = useSheet();

  const router = useRouter();
  const pathname = usePathname();

  const { readMode, setReadMode, zoomOut, zoomIn } = useGlobalState();

  const printRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  const printPDF = useReactToPrint({
    content: () => printRef.current,
    documentTitle: sheet?.title || 'Untitled sheet',
  });

  const isSetlist = !!setlist;

  useEffect(() => {
    // reset loading on page open, i.e. after navigating
    // to page after API call
    setIsLoading(false);
  }, []);

  if (isLoading) return <Loading />;

  const saveSheet = () => {
    setIsLoading(true);

    if (isExistingSheet(sheet)) {
      api.sheet
        .save(sheet)
        .then((res) => {
          if (sheet.id === res) return;

          // sheet ID was updated (should not happen)
          router.replace(`/${res}${readMode ? '' : '/edit'}`);
        })
        .finally(() => setIsLoading(false));
    } else {
      api.sheet.create(sheet).then((res) => router.replace(`/${res}/edit`));
    }
  };

  const addToSetlist = () => {
    let sheetId: string | undefined;
    let setlistId: string | undefined;

    if (isSetlist) {
      sheetId = getRouteParamFromUrl(prompt('Sheet URL') ?? '');
    } else {
      setlistId = getRouteParamFromUrl(prompt('Setlist URL') ?? '');
      if (!setlistId) return;
    }

    if (!sheetId || !setlistId) return;

    setIsLoading(true);

    api.setlist
      .save(setlistId, { sheetId })
      .then((res) => router.replace(`/setlist/${res}`))
      .finally(() => setIsLoading(false));
  };

  return (
    <PageContainer>
      <ReadControlsWrapper>
        {isSetlist && (
          <SetlistControls $gap="default" $align="right">
            <Subtitle>{setlist?.title}</Subtitle>

            <Link href={`/setlist/${setlist.id}/edit`} prefetch>
              <IconButton>
                <FaRegEdit />
              </IconButton>
            </Link>
          </SetlistControls>
        )}

        {!isSetlist && (
          <IconButton onClick={addToSetlist}>
            <MdPlaylistAdd />
          </IconButton>
        )}

        {readMode && (
          <>
            <IconButton onClick={zoomIn}>
              <AiOutlineZoomIn />
            </IconButton>

            <IconButton onClick={zoomOut}>
              <AiOutlineZoomOut />
            </IconButton>
          </>
        )}

        {!!sheet.id && (
          <IconButton
            onClick={() => {
              if (readMode && isSetlist) {
                router.push(`/${sheet.id}/edit`);
              } else {
                setReadMode(!readMode);
                router.replace(
                  trimEditPathname(pathname ?? '') + (readMode ? '/edit' : ''),
                );
              }
            }}
          >
            {readMode ? <LuEdit3 /> : <FaEye />}
          </IconButton>
        )}
      </ReadControlsWrapper>

      <SheetPaper ref={printRef}>
        <SheetSpecification />

        <div>
          {sheet.sections.map((section, i) => (
            <Section
              key={i}
              section={section}
              sections={sheet.sections}
              addSection={() => sheet.addSection(i)}
              removeSection={() => sheet.removeSection(i)}
            />
          ))}
        </div>
      </SheetPaper>

      {!readMode && !isSetlist && (
        <ControlBar saveSheet={saveSheet} printPDF={printPDF} />
      )}
    </PageContainer>
  );
});

const SheetPaper = styled.section`
  @media print {
    padding: 1rem 2rem;
    width: 210mm;
  }
`;

const SetlistControls = styled(Row)`
  max-width: 50%;
`;

const ReadControlsWrapper = styled(Row)`
  justify-content: flex-end;
  gap: ${(p) => p.theme.spacing.absolute.default};
  overflow: visible;

  @media ${device.sm} {
    gap: ${(p) => p.theme.spacing.small};
  }
`;
