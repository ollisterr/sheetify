'use client';

import { useRef, useState } from 'react';
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

interface SheetProps {
  sheetId?: string;
  setlistId?: string;
  readMode?: boolean;
}

export const Sheet = observer(({ sheetId, setlistId }: SheetProps) => {
  const setlist = useSetlist();
  const sheet = useSheet();

  const router = useRouter();
  const pathname = usePathname();

  const { readMode, setReadMode, zoomOut, zoomIn } = useGlobalState();

  const printRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  const printPDF = useReactToPrint({
    content: () => printRef.current,
    documentTitle: sheet.title,
  });

  const isSetlist = !!setlistId;

  if (isLoading) return <Loading />;

  const saveSheet = () => {
    if (Array.isArray(sheetId)) return;

    setIsLoading(true);

    api.sheet
      .save(sheet)
      .then((res) => {
        if (res && res !== sheetId) {
          router.replace(`/${res}`);
        }
      })
      .finally(() => setIsLoading(false));
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

  const editSetlist = isSetlist
    ? () => router.push(`/setlist/${setlistId}/edit`)
    : undefined;

  return (
    <PageContainer>
      <ReadControlsWrapper>
        {editSetlist && (
          <SetlistControls $gap="default" $align="right">
            <Subtitle>{setlist?.title}</Subtitle>

            <IconButton onClick={editSetlist}>
              <FaRegEdit />
            </IconButton>
          </SetlistControls>
        )}

        {!editSetlist && (
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
