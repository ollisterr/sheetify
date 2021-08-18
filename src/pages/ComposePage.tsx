import { observer } from "mobx-react-lite";
import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import styled from "styled-components";

import ControlBar from "../components/ControlBar";
import Section from "../components/Section";
import SheetSpecification from "../components/Specs";
import { sheet } from "../store";
import { Page } from "../styles";
import { device } from "../utils/constants";

export const ComposePage: React.FC = observer(() => {
  const printRef = useRef(null);

  const printPDF = useReactToPrint({
    content: () => printRef.current,
    documentTitle: sheet.title
  });

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

      <ControlBar printPDF={printPDF} />
    </PageWrapper>
  );
});

const PageWrapper = styled(Page)`
  padding: 1rem;
  padding-right: 3.5rem; // for fitting add bar icon

  @media ${device.sm} {
    padding: 0.8rem;
    padding-right: 1.1rem;
  }
`;

const SheetPaper = styled.section`
  @media print {
    padding: 1rem 2rem;
    width: 210mm;
  }
`;

export default ComposePage;
