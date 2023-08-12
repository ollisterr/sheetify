import { useRef, useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useReactToPrint } from 'react-to-print';
import { observer } from 'mobx-react-lite';
import { FaEdit, FaEye } from 'react-icons/fa';
import { AiOutlineZoomIn } from '@react-icons/all-files/ai/AiOutlineZoomIn';
import { AiOutlineZoomOut } from '@react-icons/all-files/ai/AiOutlineZoomOut';

import { PageWrapper } from '../styles';
import { ControlBar } from './ControlBar';
import { Section } from './Section';
import { SheetSpecification } from './SheetSpecification';
import { Loading } from './Loading';
import { useSheet } from '../store/SheetProvider';
import { api } from '../utils/api.utils';
import { redirect } from 'next/navigation';
import { useGlobalState } from '../providers/GlobalStateProvider';

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
    if (!sheetId || Array.isArray(sheetId)) return;

    setIsLoading(true);

    api
      .save(sheet, sheetId)
      .then((res) => {
        const { id } = res.data;

        if (id && id !== sheetId) {
          redirect(`/${id}`);
        }
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <PageWrapper>
      <ReadControlsWrapper>
        <ReadControl onClick={zoomIn}>
          <AiOutlineZoomIn />
        </ReadControl>

        <ReadControl onClick={zoomOut}>
          <AiOutlineZoomOut />
        </ReadControl>

        <ReadControl onClick={() => setReadMode(!readMode)}>
          {readMode ? <FaEdit /> : <FaEye />}
        </ReadControl>
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

const ReadControl = styled.button`
  opacity: 0.5;
  padding: 0;
  transition: opacity 500ms;
  font-size: ${(p) => p.theme.absoluteRem(1.2)};

  &:hover {
    opacity: 1;
  }
`;
