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
    const chord = value
      .replace(/ /g, "")
      .split("/")
      .map(x => x.charAt(0).toUpperCase() + x.slice(1))
      .join("/");
    sheetData.sections[sectionID].bars[barID].bar[index] = chord;
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

  function setGoalName(e) {
    sheetData.sections[sectionID].bars[barID].goal = e.target.value;
    dispatch({ type: "setSheetData", newSheetData: sheetData });
  }

  function addBarOnTab(e) {
    if (e.key === "Tab") {
      e.preventDefault();
      const bars = sheetData.sections[sectionID].bars;
      sheetData.sections[sectionID].bars = [...bars, emptyBar()];
      dispatch({ type: "setSheetData", newSheetData: sheetData });
    }
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
          onChange={setGoalName}
          placeholder="goal"
          tabIndex="-1"
        />
      </div>
      <div className="bar-content">
        <RepeatSignStartRaster
          repeat={sheetData.sections[sectionID].bars[barID].repeat}
        />
        {sheetData.sections[sectionID].bars[barID].bar.map(
          (chord, i, array) => {
            return (
              <input
                value={chord}
                key={(sectionID, barID, i)}
                className="bar-block"
                onChange={e => updateBar(i, e.target.value)}
                autoFocus={i === 0}
                onKeyDown={
                  i === array.length - 1 &&
                  barID === sheetData.sections[sectionID].bars.length - 1
                    ? addBarOnTab
                    : null
                }
              />
            );
          }
        )}
        <RepeatSignEndRaster
          repeat={sheetData.sections[sectionID].bars[barID].repeat}
        />
      </div>
    </div>
  );
};

export default Bar;
