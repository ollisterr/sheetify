import React, { useContext, useMemo } from "react";
import { SheetContext, emptyBar } from "../store.js";
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

  // Allow statical check of bar data change
  const sectionData = sheetData.sections[sectionID];
  const section = useMemo(() => {
    return sheetData.sections[sectionID];
  }, [sectionData]);

  const barsGrid = useMemo(() => {
    if (window.innerWidth > 500) {
      if (section.chordsPerBar <= 2) {
        return `${100 / 4}% `.repeat(4);
      } else if (section.chordsPerBar === 3) {
        return `${100 / 3}% `.repeat(3);
      } else {
        return `${100 / 2}% `.repeat(2);
      }
    } else {
      return "100%";
    }
  }, [section.chordsPerBar]);

  const sectionTags = ["A", "B", "C", "Bridge", "Intro", "Outro"];

  function update() {
    dispatch({ type: "setSheetData", newSheetData: sheetData });
  }

  function newBar() {
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
      for (let i = 0; i < newBar.bar.length; i++) {
        newBar.bar[i] = bar.bar[i];
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
        {sectionTags.map((tag, i) => {
          const number = sheetData.sections.filter((section, index) => 
            section.name === tag && index <= sectionID
          ).length;

          return (
            <div
              key={i}
              className={"section-tag " + (tag === section.name ? "selected" : "")}
              {...tag !== section.name && {"data-html2canvas-ignore": true}}
              onClick={() => setSectionTag(tag)}
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
          tabIndex='-1'
        />
        <div className='section-config'>
          <div className='chords-per-bar'>
            Chords:
            <input
              className='chords-per-bar-input'
              type='number'
              min='1'
              value={section.chordsPerBar}
              onChange={setChordsPerBar}
              tabIndex='-1'
            />
          </div>
          <div className='add-section' onClick={addSection}>
            <FontAwesomeIcon icon={faPlusSquare} className='add-section-icon' />
          </div>
          {sheetData.sections.length > 1 && (
            <div className='remove-section' onClick={removeSection}>
              <FontAwesomeIcon icon={faTrash} className='remove-section-icon' />
            </div>
          )}
        </div>
      </div>
      <div
        className='bars'
        style={{
          gridTemplateColumns: barsGrid
        }}
      >
        {section.bars.map((bar, i) => (
          <div key={[sectionID, i]} style={{ position: "relative" }}>
            <Bar sectionID={sectionID} barID={i} />
            {i === section.bars.length - 1 && (
              <div
                className='add-bar'
                data-html2canvas-ignore='true'
                onClick={newBar}
              >
                <FontAwesomeIcon icon={faPlus} className='add-bar-icon' />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Section;
