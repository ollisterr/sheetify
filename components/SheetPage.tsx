import { useRef, useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useReactToPrint } from 'react-to-print';
import { observer } from 'mobx-react-lite';
import { FaAndroid, FaEdit, FaEye } from 'react-icons/fa';
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
} from '@utils/common.utils';

export const SheetPage = observer(() => {
  const sheet = useSheet();
  const router = useRouter();
  const { readMode, setReadMode, zoomOut, zoomIn } = useGlobalState();

  const printRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  const printPDF = useReactToPrint({
    content: () => printRef.current,
    documentTitle: sheet.title,
  });

  if (isLoading) return <Loading />;

  const saveSheet = () => {
    const sheetId = router.query.slug;
    if (Array.isArray(sheetId)) return;

    setIsLoading(true);

    api
      .save(sheet, sheetId)
      .then((res) => {
        if (res.data && res.data !== sheetId) {
          router.replace(`/${res.data}`);
        }
      })
      .finally(() => setIsLoading(false));
  };

  const addToSetlist = () => {
    let sheetId: string | undefined;
    let setlistId: string | undefined;

    const routeParams = router.query.slug;

    if (router.pathname.includes('setlist')) {
      sheetId = getRouteParamFromUrl(prompt('Sheet URL') ?? '');
      setlistId = getRouteParamFromSlug(routeParams);
    } else {
      sheetId = getRouteParamFromSlug(routeParams);
      setlistId = getRouteParamFromUrl(prompt('Setlist URL') ?? '');
    }

    if (!sheetId) return;

    setIsLoading(true);

    api
      .addToSetlist(sheetId, setlistId)
      .then((res) => router.replace(`/setlist/${res.data}`))
      .finally(() => setIsLoading(false));
  };

  return (
    <PageWrapper>
      <ReadControlsWrapper>
        <IconButton onClick={addToSetlist}>
          <FaAndroid />
        </IconButton>

        <IconButton onClick={zoomIn}>
          <AiOutlineZoomIn />
        </IconButton>

        <IconButton onClick={zoomOut}>
          <AiOutlineZoomOut />
        </IconButton>

        <IconButton onClick={() => setReadMode(!readMode)}>
          {readMode ? <FaEdit /> : <FaEye />}
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

      {!readMode && <ControlBar saveSheet={saveSheet} printPDF={printPDF} />}
    </PageWrapper>
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
