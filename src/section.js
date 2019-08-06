import React, { useContext } from "react";
import { SheetContext, emptyBar } from "./state.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faMinus,
  faTrash,
  faPlusSquare
} from "@fortawesome/free-solid-svg-icons";
import "./css/section.scss";
import repeatStart from "./assets/repeat-sign-start.svg";
import repeatEnd from "./assets/repeat-sign-end.svg";

export const Bar = ({ sectionID, barID }) => {
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

  function setRepeat(value) {
    const repeat = sheetData.sections[sectionID].bars[barID].repeat;
    switch (value) {
    case "start":
      sheetData.sections[sectionID].bars[barID].repeat[0] = !repeat[0];
      dispatch({ type: "setSheetData", newSheetData: sheetData });
      break;
    case "end":
      sheetData.sections[sectionID].bars[barID].repeat[1] = !repeat[1];
      dispatch({ type: "setSheetData", newSheetData: sheetData });
      break;
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
            (!!sheetData.sections[sectionID].bars[barID].goal && "defined-goal")
          }
          value={sheetData.sections[sectionID].bars[barID].goal}
          onChange={e => setGoalName(e.target.value)}
          placeholder="goal"
          tabindex="-1"
        />
      </div>
      <div className="bar-content">
        <img
          src={repeatStart}
          className={
            "repeat-sign-start " +
            (sheetData.sections[sectionID].bars[barID].repeat[0] && "active")
          }
          onClick={() => setRepeat("start")}
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
        <img
          src={repeatEnd}
          className={
            "repeat-sign-end " +
            (sheetData.sections[sectionID].bars[barID].repeat[1] && "active")
          }
          onClick={() => setRepeat("end")}
        />
      </div>
    </div>
  );
};

export const Section = ({ sectionID }) => {
  const [{ sheetData }, dispatch] = useContext(SheetContext);
  const sectionTags = ["A", "B", "C", "Bridge", "Intro", "Outro"];

  function newBar() {
    sheetData.sections[sectionID].bars = [
      ...sheetData.sections[sectionID].bars,
      emptyBar()
    ];
    dispatch({ type: "setSheetData", newSheetData: sheetData });
  }

  function setSectionTag(value) {
    if (sheetData.sections[sectionID].name === value || !value) {
      delete sheetData.sections[sectionID].name;
    } else {
      sheetData.sections[sectionID].name = value;
    }
    dispatch({ type: "setSheetData", newSheetData: sheetData });
  }

  function addSection() {
    const sections = sheetData.sections;
    sheetData.sections = sections
      .slice(0, sectionID)
      .concat([{ bars: [emptyBar()] }])
      .concat(sections.slice(sectionID, sections.length));
    dispatch({ type: "setSheetData", newSheetData: sheetData });
  }

  function removeSection() {
    if (sheetData.sections.length > 1) {
      sheetData.sections = sheetData.sections
        .slice(0, sectionID)
        .concat(
          sheetData.sections.slice(sectionID + 1, sheetData.sections.length)
        );
      dispatch({ type: "setSheetData", newSheetData: sheetData });
    }
  }

  return (
    <div className="section">
      <div className="section-controls">
        <div className="section-tags">
          {sectionTags.map((tag, i) => {
            const number = sheetData.sections.filter((section, index) => {
              return section.name === tag && index <= sectionID;
            }).length;
            return (
              <div
                key={i}
                className={
                  "section-tag " +
                  (tag === sheetData.sections[sectionID].name && "selected")
                }
                onClick={e => setSectionTag(tag)}
              >
                {tag}
                {number > 1 && number}
              </div>
            );
          })}

          <input
            className={
              "section-tag " +
              (!sectionTags.includes(sheetData.sections[sectionID].name) &&
                !!sheetData.sections[sectionID].name &&
                "selected")
            }
            placeholder="Section name"
            onChange={e => setSectionTag(e.target.value)}
          />
        </div>
        <div className="add-remove-section">
          <div className="section-tag add-section" onClick={addSection}>
            <FontAwesomeIcon icon={faPlusSquare} className="add-section-icon" />
          </div>
          {sheetData.sections.length > 1 && (
            <div className="section-tag remove-section" onClick={removeSection}>
              <FontAwesomeIcon icon={faTrash} className="remove-section-icon" />
            </div>
          )}
        </div>
      </div>
      {sheetData.sections[sectionID].bars.map((bar, i) => {
        return <Bar key={[sectionID, i]} sectionID={sectionID} barID={i} />;
      })}
      <div className="add-bar" onClick={newBar}>
        <FontAwesomeIcon icon={faPlus} className="add-bar-icon" />
      </div>
    </div>
  );
};
