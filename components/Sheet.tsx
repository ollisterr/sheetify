import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useReactToPrint } from 'react-to-print';
import { observer } from 'mobx-react-lite';
import { LuEdit3 } from 'react-icons/lu';
import { FaAndroid, FaEye, FaRegEdit } from 'react-icons/fa';
import { AiOutlineZoomIn } from '@react-icons/all-files/ai/AiOutlineZoomIn';
import { AiOutlineZoomOut } from '@react-icons/all-files/ai/AiOutlineZoomOut';

import { useSheet } from '@store/SheetProvider';
import { api } from '@utils/api.utils';

import { ControlBar } from './ControlBar';
import { Section } from './Section';
import { SheetSpecification } from './SheetSpecification';
import { Loading } from './Loading';

import { IconButton, PageWrapper } from '../styles';
import { useGlobalState } from '../providers/GlobalStateProvider';
import {
  getRouteParamFromSlug,
  getRouteParamFromUrl,
  trimEditPathname,
} from '@utils/common.utils';
import { PageContainer } from './PageContainer';

interface SheetProps {
  showSetlistControls?: boolean;
}

export const Sheet = observer(({}: SheetProps) => {
  const sheet = useSheet();
  const router = useRouter();
  const { readMode, setReadMode, zoomOut, zoomIn } = useGlobalState();

  const isSetlist = !!router.query.setlistId;

  const printRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  const printPDF = useReactToPrint({
    content: () => printRef.current,
    documentTitle: sheet.title,
  });

  if (isLoading) return <Loading />;

  const saveSheet = () => {
    const sheetId = router.query.sheetId;
    if (Array.isArray(sheetId)) return;

    setIsLoading(true);

    api
      .save(sheet, sheetId)
      .then((res) => {
        if (res && res !== sheetId) {
          router.replace(`/${res}`, undefined, { shallow: true });
        }
      })
      .finally(() => setIsLoading(false));
  };

  const addToSetlist = () => {
    let sheetId: string | undefined;
    let setlistId: string | undefined;

    const routeParams = router.query.sheetId;

    if (router.pathname.includes('setlist')) {
      sheetId = getRouteParamFromUrl(prompt('Sheet URL') ?? '');
      setlistId = getRouteParamFromSlug(routeParams);
    } else {
      sheetId = getRouteParamFromSlug(routeParams);
      setlistId = getRouteParamFromUrl(prompt('Setlist URL') ?? '');
      if (!setlistId) return;
    }

    if (!sheetId) return;

    setIsLoading(true);

    api
      .addToSetlist(sheetId, setlistId)
      .then((res) => router.replace(`/setlist/${res}`))
      .finally(() => setIsLoading(false));
  };

  const editSetlist = isSetlist
    ? () =>
        router.push(`/setlist/${router.query.setlistId}/edit`, undefined, {
          shallow: true,
        })
    : undefined;

  return (
    <PageContainer>
      <ReadControlsWrapper>
        {editSetlist && (
          <IconButton onClick={editSetlist} $align="right">
            <FaRegEdit />
          </IconButton>
        )}

        {!editSetlist && (
          <IconButton onClick={addToSetlist}>
            <FaAndroid />
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
                trimEditPathname(router.asPath) + (readMode ? '/edit' : ''),
                undefined,
                { shallow: true },
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

const ReadControlsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: ${(p) => p.theme.absoluteRem(1)};
`;
