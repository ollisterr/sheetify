import { observer } from "mobx-react-lite";
import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";

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
    <>
      <div ref={printRef}>
        <SheetSpecification />

        <SheetBody />
      </div>

      <ControlBar printPDF={printPDF} />
    </>
  );
});

export default ComposePage;
