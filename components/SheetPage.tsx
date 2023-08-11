import { useRef, useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useReactToPrint } from 'react-to-print';
import { observer } from 'mobx-react-lite';

import { PageWrapper } from '../styles';
import { ControlBar } from './ControlBar';
import { Section } from './Section';
import { SheetSpecification } from './SheetSpecification';
import { Loading } from './Loading';
import { useSheet } from '../store/SheetProvider';

export const SheetPage = observer(() => {
  const sheet = useSheet();
  const router = useRouter();

  const printRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  if (isLoading) return <Loading />;

  const printPDF = useReactToPrint({
    content: () => printRef.current,
    documentTitle: sheet.title,
  });

  const saveSheet = () => {
    const path = router.asPath;

    setIsLoading(true);

    axios
      .post('/.netlify/functions/save', {
        data: sheet,
        id: path.length ? path : undefined,
      })
      .then((res) => {
        const { id } = res.data;

        if (id && id !== path) {
          window.location.replace(`${window.location.origin}/${id}`);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
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
