import { observer } from "mobx-react-lite";
import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import styled from "styled-components";

import ControlBar from "../components/ControlBar";
import SheetBody from "../components/SheetBody";
import SheetSpecification from "../components/Specs";
import { sheet } from "../store";

export const ComposePage: React.FC = observer(() => {
  const printRef = useRef(null);

  const printPDF = useReactToPrint({
    content: () => printRef.current,
    documentTitle: sheet.title
  });

  return (
    <main>
      <SheetPaper ref={printRef}>
        <SheetSpecification />

        <SheetBody />
      </SheetPaper>

      <ControlBar printPDF={printPDF} />
    </main>
  );
});

const SheetPaper = styled.section`
  @media print {
    padding: 1rem 2rem;
  }
`;

export default ComposePage;
