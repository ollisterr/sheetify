import React, { useRef, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useReactToPrint } from "react-to-print";
import styled from "styled-components";
import axios from "axios";

import ControlBar from "../components/ControlBar";
import Section from "../components/Section";
import Loading from "../components/Loading";
import SheetSpecification from "../components/Specs";
import { sheet } from "../store";
import { Page } from "../styles";
import { device } from "../utils/constants";

const ComposePage: React.FC = observer(() => {
  const [loading, setLoading] = useState(true);
  const printRef = useRef(null);

  useEffect(() => {
    const path = window.location.pathname.replace("/", "");

    if (path.length > 0) {
      axios.post("/.netlify/functions/load", { id: path }).then((res) => {
        if (res.data) {
          sheet.read(res.data);
        }
      }).finally(() => {
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, []);

  const printPDF = useReactToPrint({
    content: () => printRef.current,
    documentTitle: sheet.title
  });

  const saveSheet = () => {
    const path = window.location.pathname.replace("/", "");
    setLoading(true);

    axios.post(
      "/.netlify/functions/save", 
      { data: sheet, id: path.length ? path : undefined }
    ).then((res) => {
      const { id } = res.data;

      if (id && id !== path) {
        window.location.replace(`${window.location.origin}/${id}`);
      }
    }).finally(() => {
      setLoading(false);
    });
  };

  return loading ? <Loading /> : (
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