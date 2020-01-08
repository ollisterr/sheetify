import React, { useContext } from "react";
import { SheetContext, emptyBar } from "../utils/state.js";
import Section from "./Section.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "../css/SheetBody.scss";
import { longestChord, stringifySheet } from "../utils/utils";
import FileSaver from "file-saver";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

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

  function savePDF() {
    html2canvas(document.body, {
      windowWidth: 1080,
      width: 1080
    }).then(function(canvas) {
      // document.body.append(canvas);

      var title = sheetData.name ? sheetData.name : "Untitled song";
      var imgData = canvas.toDataURL("image/jpeg", 2.0);
      var image = document.createElement("img");
      image.src = imgData;
      var doc = new jsPDF("p", "mm", "a4");
      doc.setProperties({
        title: title,
        subject: "Music sheet for " + title
      });
      var width = doc.internal.pageSize.getWidth();

      doc.addImage(imgData, "JPEG", 0, 0, width, image.height);
      doc.save(title + ".pdf");
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
        <div className='print' onClick={saveTxt}>
          Save .txt
        </div>
        <div className='print' onClick={savePDF}>
          Save .pdf
        </div>
      </div>
    </div>
  );
};

export default SheetBody;
