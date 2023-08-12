import { useRef, useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useReactToPrint } from 'react-to-print';
import { observer } from 'mobx-react-lite';

import { PageWrapper } from '../styles';
import { ControlBar } from './ControlBar';
import { Section } from './Section';
import { SheetSpecification } from './SheetSpecification';
import { Loading } from './Loading';
import { useSheet } from '../store/SheetProvider';
import { api } from '../utils/api.utils';
import { redirect } from 'next/navigation';

export const SheetPage = observer(() => {
  const sheet = useSheet();
  const router = useRouter();

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

      <ControlBar saveSheet={saveSheet} printPDF={printPDF} />
    </PageWrapper>
  );
});

const SheetPaper = styled.section`
  @media print {
    padding: 1rem 2rem;
    width: 210mm;
  }
`;
