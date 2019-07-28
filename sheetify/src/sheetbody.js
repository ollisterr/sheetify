import React, { useState, useContext } from "react";
import { SheetContext } from "./state.js";
import { Section } from "./section.js";
import "./css/sheetbody.css";


const SheetBody = () => {
  const [{ sheetData }, dispatch] = useContext(SheetContext);
  const [print, setPrint] = useState("No print");

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
      { sheetData.map((section, i) => (<Section key={i} sectionID={i} />)) }
      <div className="control-bar">
        <div className="add-section" 
          onClick={ 
            () => {
              dispatch({type: "setSheetData", newSheetData: [...sheetData, [["", "", "", ""]]]});
            } }
        >Add</div>
        <div className="print" onClick={ printAll }>Print</div>
      </div>
      { print }
    </div>
  );
};

export default SheetBody;