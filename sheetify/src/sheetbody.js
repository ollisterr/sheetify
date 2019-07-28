import React, { useState, useContext } from "react";
import { SheetContext } from "./state.js";
import { Section } from "./section.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "./css/sheetbody.scss";

const SheetBody = () => {
  const [{ sheetData }, dispatch] = useContext(SheetContext);
  const [print, setPrint] = useState("No print");

  function addSection() {
    sheetData.sections = [
      ...sheetData.sections,
      { bars: [{ bar: ["", "", "", ""] }] }
    ];
    dispatch({
      type: "setSheetData",
      newSheetData: sheetData
    });
  }

  function printAll() {
    var output = "";
    sheetData.foreach((section, i) => {
      section.foreach(bar => {
        output += i.concat(" | ", bar.join(", "), " |\n");
      });
    });
    setPrint(output);
  }

  return (
    <div className="sheetbody">
      {sheetData.sections.map((section, i) => (
        <Section key={i} sectionID={i} />
      ))}
      <div className="control-bar">
        <div className="add-section" onClick={addSection}>
          <FontAwesomeIcon icon={faPlus} className="add-section-icon" />
          Add Section
        </div>
        <div className="print" onClick={printAll}>
          Print
        </div>
      </div>
    </div>
  );
};

export default SheetBody;
