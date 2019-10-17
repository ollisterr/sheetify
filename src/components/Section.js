import React, { useContext } from "react";
import { SheetContext, emptyBar } from "../utils/state.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faTrash,
  faPlusSquare
} from "@fortawesome/free-solid-svg-icons";
import "../css/Section.scss";
import Bar from "./Bar.js";

const Section = ({ sectionID }) => {
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
      <div className="add-bar" data-html2canvas-ignore="true" onClick={newBar}>
        <FontAwesomeIcon icon={faPlus} className="add-bar-icon" />
      </div>
    </div>
  );
};

export default Section;
