import React, { useState, useContext } from "react";
import { SheetContext, emptyBar } from "./state.js";
import { Section } from "./section.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "./css/sheetbody.scss";
import { longestChord, stringifySheet } from "./utils";
import FileSaver from "file-saver";

const SheetBody = () => {
  const [{ sheetData }, dispatch] = useContext(SheetContext);
  const [print, setPrint] = useState("No print");

  function addSection() {
    sheetData.sections = [...sheetData.sections, { bars: [emptyBar()] }];
    dispatch({
      type: "setSheetData",
      newSheetData: sheetData
    });
  }

  function printAll() {
    const longest = longestChord(sheetData);
    const output = stringifySheet(sheetData, longest);
    setPrint(output);
  }

  function saveTxt() {
    const longest = longestChord(sheetData);
    const output = stringifySheet(sheetData, longest);
    var blob = new Blob([output], {
      type: "text/plain;charset=utf-8"
    });
    FileSaver.saveAs(
      blob,
      sheetData.name ? sheetData.name + ".txt" : "song-sheet.txt"
    );
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
        <div className="print" onClick={saveTxt}>
          Print
        </div>
      </div>
      <div className="print-output">
        <pre
          dangerouslySetInnerHTML={{
            __html: print.replace(/(?:\r\n|\r|\n)/g, "<br />")
          }}
        />
      </div>
    </div>
  );
};

export default SheetBody;
