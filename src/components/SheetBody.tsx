import React from "react";
import useStore from "../store";
import Section from "./Section";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import "../css/SheetBody.scss";
import { savePDF } from "../utils/pdf.utils";
import { saveTxt } from "../utils/txt.utils";

const SheetBody: React.FC = () => {
  const { title, sheetData, addSection } = useStore(state => state);

  return (
    <div className='sheetbody'>
      {sheetData.map((section, i) => (
        <Section key={i} section={section} />
      ))}

      <div className='control-bar' data-html2canvas-ignore='true'>
        <div className='add-section' onClick={() => addSection()}>
          <FontAwesomeIcon icon={faPlus} className='add-section-icon' />
          Add Section
        </div>
        <div className="print" onClick={() => saveTxt(sheetData)}>
          Save .txt
        </div>
        <div className="print" onClick={() => savePDF(title)}>
          Save .pdf
        </div>
      </div>
    </div>
  );
};

export default SheetBody;
