import React, { useContext } from "react";
import { SheetContext, emptyBar } from "../store.js";
import Section from "./Section.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "../css/SheetBody.scss";
import { savePDF } from "../utils/pdfUtils";
import { saveTxt } from "../utils/txtUtils";

const SheetBody = () => {
  const [{ sheetData, timeSignature }, dispatch] = useContext(SheetContext);

  function addSection() {
    sheetData.sections = [
      ...sheetData.sections,
      { bars: [emptyBar(timeSignature[0])], chordsPerBar: timeSignature[0] }
    ];
    dispatch({
      type: "setSheetData",
      newSheetData: sheetData
    });
  }

  return (
    <div className='sheetbody'>
      {sheetData.sections.map((section, i) => (
        <Section key={i} sectionID={i} section={section} />
      ))}
      <div className='control-bar' data-html2canvas-ignore='true'>
        <div className='add-section' onClick={addSection}>
          <FontAwesomeIcon icon={faPlus} className='add-section-icon' />
          Add Section
        </div>
        <div className="print" onClick={() => saveTxt(sheetData)}>
          Save .txt
        </div>
        <div className="print" onClick={() => savePDF(sheetData.name)}>
          Save .pdf
        </div>
      </div>
    </div>
  );
};

export default SheetBody;
