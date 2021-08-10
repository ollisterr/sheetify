import React from "react";
import Section from "./Section";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import "../css/SheetBody.scss";
import { savePDF } from "../utils/pdf.utils";
import { saveTxt } from "../utils/txt.utils";
import { observer } from "mobx-react-lite";
import { sheet } from "../store";

const SheetBody: React.FC = observer(() => 
  <div className='sheetbody'>
    {sheet.sections.map((section, i) => (
      <Section 
        key={i} 
        section={section} 
        sections={sheet.sections} 
        addSection={() => sheet.addSection(i)} 
        removeSection={() => sheet.removeSection(i)} 
      />
    ))}

    <div className='control-bar' data-html2canvas-ignore='true'>
      <div className='add-section' onClick={() => sheet.addSection()}>
        <FontAwesomeIcon icon={faPlus} className='add-section-icon' />
          Add Section
      </div>
      <div className="print" onClick={() => saveTxt(sheet.sections)}>
          Save .txt
      </div>
      <div className="print" onClick={() => savePDF(sheet.title)}>
          Save .pdf
      </div>
    </div>
  </div>
);

export default SheetBody;
