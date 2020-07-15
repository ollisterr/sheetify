import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import React, { useContext, useMemo } from "react";
import { SheetContext, emptyBar } from "../store.js";
import { RepeatSignStartRaster, RepeatSignEndRaster } from "./RepeatSigns.js";
import "../css/Bar.scss";

const Bar = ({ sectionID, barID }) => {
  const [{ sheetData }, dispatch] = useContext(SheetContext);

  // Allow statical check of section data change
  const barData = sheetData.sections[sectionID].bars[barID];
  const { section, bar } = useMemo(() => {
    return {
      section: sheetData.sections[sectionID],
      bar: sheetData.sections[sectionID].bars[barID]
    };
  }, [sectionID, barID, barData]);

  function update() {
    dispatch({ type: "setSheetData", newSheetData: sheetData });
  }

  function updateBar(index, value) {
    const chord = value
      .replace(/ /g, "")
      .split("/")
      .map(x => x.charAt(0).toUpperCase() + x.slice(1))
      .join("/");
    bar.bar[index] = chord;
    update();
  }

  function addBar() {
    const bars = section.bars;
    section.bars = bars
      .slice(0, barID)
      .concat([emptyBar(section.chordsPerBar)])
      .concat(bars.slice(barID, bars.length));
    update();
  }

  function removeBar() {
    const bars = section.bars;
    // Delete bar if it's not the only bar in the sheet
    if (sheetData.sections.length > 1 || bars.length > 1) {
      // If only bar in the section, remove section
      if (section.bars.length === 1) {
        sheetData.sections = sheetData.sections
          .slice(0, sectionID)
          .concat(
            sheetData.sections.slice(sectionID + 1, sheetData.sections.length)
          );
        update();
      } else {
        section.bars = bars
          .slice(0, barID)
          .concat(bars.slice(barID + 1, bars.length));
        update();
      }
    }
  }

  function setGoalName(e) {
    bar.goal = e.target.value;
    update();
  }

  function addBarOnTab(e) {
    if (e.key === "Tab") {
      e.preventDefault();
      const bars = section.bars;
      section.bars = [...bars, emptyBar(section.chordsPerBar)];
      update();
    }
  }

  return (
    <div className='bar'>
      <div className='bar-controls'>
        <FontAwesomeIcon
          icon={faPlus}
          className='add-bar-inbetween'
          onClick={addBar}
        />
        {(sheetData.sections.length > 1 || section.bars.length > 1) && (
          <FontAwesomeIcon
            icon={faMinus}
            className='remove-bar'
            onClick={removeBar}
          />
        )}
        <input
          className={"section-goal " + (bar.goal ? "defined-goal" : "")}
          value={bar.goal}
          onChange={setGoalName}
          placeholder='goal'
          tabIndex='-1'
        />
      </div>
      <div className='bar-content'>
        <RepeatSignStartRaster repeat={bar.repeat} />
        {bar.bar.map((chord, i, array) => (
          <input
            value={chord}
            key={(sectionID, barID, i)}
            className='bar-block'
            onChange={e => updateBar(i, e.target.value)}
            autoFocus={i === 0}
            onKeyDown={
              i === array.length - 1 && barID === section.bars.length - 1
                ? addBarOnTab
                : null
            }
          />
        ))}
        <RepeatSignEndRaster repeat={bar.repeat} />
      </div>
    </div>
  );
};

export default Bar;
