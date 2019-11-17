import React, { useContext, useMemo, useEffect } from "react";
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
  const [{ sheetData, timeSignature }, dispatch] = useContext(SheetContext);

  const section = useMemo(() => {
    return sheetData.sections[sectionID];
  }, [sheetData.sections[sectionID]]);

  const sectionTags = ["A", "B", "C", "Bridge", "Intro", "Outro"];

  function update() {
    dispatch({ type: "setSheetData", newSheetData: sheetData });
  }

  function newBar() {
    console.log(section.chordsPerBar);
    section.bars = [...section.bars, emptyBar(section.chordsPerBar)];
    update();
  }

  function setSectionTag(value) {
    if (section.name === value || !value) {
      delete section.name;
    } else {
      section.name = value;
    }
    update();
  }

  function setChordsPerBar(e) {
    section.chordsPerBar =
      e.target.value.length > 0 ? parseInt(e.target.value) : 1;
    section.bars = section.bars.map(bar => {
      const newBar = emptyBar(section.chordsPerBar);
      for (let i = 0; i < newBar.length; i++) {
        newBar[i] = bar.bar[i];
      }
      return newBar;
    });
    update();
  }

  function addSection() {
    const sections = sheetData.sections;
    sheetData.sections = sections
      .slice(0, sectionID)
      .concat([
        { bars: [emptyBar(timeSignature[0])], chordsPerBar: timeSignature[0] }
      ])
      .concat(sections.slice(sectionID, sections.length));
    update();
  }

  function removeSection() {
    if (sheetData.sections.length > 1) {
      sheetData.sections = sheetData.sections
        .slice(0, sectionID)
        .concat(
          sheetData.sections.slice(sectionID + 1, sheetData.sections.length)
        );
      update();
    }
  }

  return (
    <div className='section'>
      <div className='section-controls'>
        <div className='section-tags'>
          {sectionTags.map((tag, i) => {
            const number = sheetData.sections.filter((section, index) => {
              return section.name === tag && index <= sectionID;
            }).length;
            return (
              <div
                key={i}
                className={
                  "section-tag " + (tag === section.name && "selected")
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
              (!sectionTags.includes(section.name) &&
                !!section.name &&
                "selected")
            }
            placeholder='Section name'
            onChange={setSectionTag}
          />
        </div>
        <div className='section-config'>
          <input
            className='chords-per-bar'
            type='number'
            min='1'
            value={section.chordsPerBar}
            onChange={setChordsPerBar}
          />
          <div className='section-tag add-section' onClick={addSection}>
            <FontAwesomeIcon icon={faPlusSquare} className='add-section-icon' />
          </div>
          {sheetData.sections.length > 1 && (
            <div className='section-tag remove-section' onClick={removeSection}>
              <FontAwesomeIcon icon={faTrash} className='remove-section-icon' />
            </div>
          )}
        </div>
      </div>
      {section.bars.map((bar, i) => {
        return <Bar key={[sectionID, i]} sectionID={sectionID} barID={i} />;
      })}
      <div className='add-bar' data-html2canvas-ignore='true' onClick={newBar}>
        <FontAwesomeIcon icon={faPlus} className='add-bar-icon' />
      </div>
    </div>
  );
};

export default Section;
