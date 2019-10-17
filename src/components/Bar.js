import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import React, { useContext } from "react";
import { SheetContext, emptyBar } from "../utils/state.js";
import {
  RepeatSignStart,
  RepeatSignEnd,
  RepeatSignStartRaster,
  RepeatSignEndRaster
} from "./RepeatSigns.js";
import "../css/Bar.scss";

const Bar = ({ sectionID, barID }) => {
  const [{ sheetData }, dispatch] = useContext(SheetContext);

  function updateBar(index, value) {
    sheetData.sections[sectionID].bars[barID].bar[index] = value;
    dispatch({ type: "setSheetData", newSheetData: sheetData });
  }

  function addBar() {
    const bars = sheetData.sections[sectionID].bars;
    sheetData.sections[sectionID].bars = bars
      .slice(0, barID)
      .concat([emptyBar()])
      .concat(bars.slice(barID, bars.length));
    dispatch({ type: "setSheetData", newSheetData: sheetData });
  }

  function removeBar() {
    const bars = sheetData.sections[sectionID].bars;
    // Delete bar if it's not the only bar in the sheet
    if (sheetData.sections.length > 1 || bars.length > 1) {
      // If only bar in the section, remove section
      if (sheetData.sections[sectionID].bars.length === 1) {
        sheetData.sections = sheetData.sections
          .slice(0, sectionID)
          .concat(
            sheetData.sections.slice(sectionID + 1, sheetData.sections.length)
          );
        dispatch({ type: "setSheetData", newSheetData: sheetData });
      } else {
        sheetData.sections[sectionID].bars = bars
          .slice(0, barID)
          .concat(bars.slice(barID + 1, bars.length));
        dispatch({ type: "setSheetData", newSheetData: sheetData });
      }
    }
  }

  function setGoalName(value) {
    sheetData.sections[sectionID].bars[barID].goal = value;
    dispatch({ type: "setSheetData", newSheetData: sheetData });
  }

  return (
    <div className="bar">
      <div className="bar-controls">
        <FontAwesomeIcon
          icon={faPlus}
          className="add-bar-inbetween"
          onClick={addBar}
        />
        {(sheetData.sections.length > 1 ||
          sheetData.sections[sectionID].bars.length > 1) && (
          <FontAwesomeIcon
            icon={faMinus}
            className="remove-bar"
            onClick={removeBar}
          />
        )}
        <input
          className={
            "section-goal " +
            (sheetData.sections[sectionID].bars[barID].goal
              ? "defined-goal"
              : "")
          }
          value={sheetData.sections[sectionID].bars[barID].goal}
          onChange={e => setGoalName(e.target.value)}
          placeholder="goal"
          tabIndex="-1"
        />
      </div>
      <div className="bar-content">
        <RepeatSignStartRaster
          repeat={sheetData.sections[sectionID].bars[barID].repeat}
        />
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
        <RepeatSignEndRaster
          repeat={sheetData.sections[sectionID].bars[barID].repeat}
        />
      </div>
    </div>
  );
};

export default Bar;