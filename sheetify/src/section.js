import React, { useContext } from "react";
import { SheetContext } from "./state.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import "./css/section.scss";

export const Bar = ({ sectionID, barID }) => {
  const [{ sheetData }, dispatch] = useContext(SheetContext);

  function updateBar(index, value) {
    sheetData.sections[sectionID].bars[barID].bar[index] = value;
    console.log("Adding: " + sectionID + " | " + barID);
    dispatch({ type: "setSheetData", newSheetData: sheetData });
  }

  function addBar() {
    const bars = sheetData.sections[sectionID].bars;
    sheetData.sections[sectionID].bars = bars
      .slice(0, barID)
      .concat([{ bar: ["", "", "", ""] }])
      .concat(bars.slice(barID, bars.length));
    dispatch({ type: "setSheetData", newSheetData: sheetData });
    console.log("Adding after bar: " + barID);
  }

  function removeBar() {
    const bars = sheetData.sections[sectionID].bars;
    sheetData.sections[sectionID].bars = bars
      .slice(0, barID)
      .concat(bars.slice(barID + 1, bars.length));
    dispatch({ type: "setSheetData", newSheetData: sheetData });
    console.log("Removing: " + sectionID + " | " + barID);
  }

  return (
    <div className="bar">
      <div className="bar-controls">
        <FontAwesomeIcon
          icon={faPlus}
          className="add-bar-inbetween"
          onClick={addBar}
        />
        <FontAwesomeIcon
          icon={faMinus}
          className="remove-bar"
          onClick={removeBar}
        />
      </div>
      <div className="bar-content">
        {sheetData.sections[sectionID].bars[barID].bar.map((chord, i) => {
          return (
            <input
              value={chord}
              key={(sectionID, barID, i)}
              className="bar-block"
              onChange={e => updateBar(i, e.target.value)}
            />
          );
        })}
      </div>
    </div>
  );
};

export const Section = ({ sectionID }) => {
  const [{ sheetData }, dispatch] = useContext(SheetContext);

  function newBar() {
    sheetData.sections[sectionID].bars = [
      ...sheetData.sections[sectionID].bars,
      { bar: ["", "", "", ""] }
    ];
    dispatch({ type: "setSheetData", newSheetData: sheetData });
  }

  return (
    <div className="section">
      {sheetData.sections[sectionID].bars.map((bar, i) => {
        return <Bar key={[sectionID, i]} sectionID={sectionID} barID={i} />;
      })}
      <div className="add-bar" onClick={newBar}>
        <FontAwesomeIcon icon={faPlus} className="add-bar-icon" />
      </div>
    </div>
  );
};
