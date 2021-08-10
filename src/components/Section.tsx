import React, { useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faTrash,
  faPlusSquare
} from "@fortawesome/free-solid-svg-icons";
import { observer } from "mobx-react-lite";

import "../css/Section.scss";
import Bar from "./Bar";
import { SectionModule } from "../store/SectionModule";

const sectionTags = ["A", "B", "C", "Bridge", "Intro", "Outro"];

interface Section {
  section: SectionModule;
  sections: SectionModule[];
  addSection: () => void;
  removeSection: () => void;
}

const Section = observer(({ 
  section, 
  sections,
  addSection,
  removeSection 
}: Section) => {
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

  return (
    <div className='section'>
      <div className='section-controls'>
        {sectionTags.map((tag, i) => {
          const number = sections.filter((section, index) => 
            section.name === tag && index <= i
          ).length;

          return (
            <div
              key={i}
              className={"section-tag " + 
              (tag === section.name ? "selected" : "")}
              {...tag !== section.name && {"data-html2canvas-ignore": true}}
              onClick={() => section.setName(tag)}
            >
              {tag}
              {number > 1 && number}
            </div>
          );
        })}

        <input
          className={
            "section-tag " +
            (!sectionTags.includes(section.name ?? "") &&
            section.name ?
              "selected" : "")
          }
          {...!sectionTags.includes(section.name ?? "") &&
            section.name && { "data-html2canvas-ignore": true }}
          placeholder='Section name'
          onChange={(e) => section.setName(e.target.value)}
          tabIndex={-1}
          data-html2canvas-ignore="true"
        />
        
        <div className='section-config' data-html2canvas-ignore="true">
          <div className='chords-per-bar'>
            Chords:
            <input
              className='chords-per-bar-input'
              type='number'
              min='1'
              value={section.chordsPerBar}
              onChange={(e) => 
                section.setChordsPerBar(parseInt(e.target.value) ?? 1)}
              tabIndex={-1}
            />
          </div>

          <div className='add-section' onClick={addSection}>
            <FontAwesomeIcon icon={faPlusSquare} className='add-section-icon' />
          </div>

          {sections.length > 1 && (
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
          <div key={i} style={{ position: "relative" }}>
            <Bar 
              bar={bar}
              // Make copies of the functions 
              // for them to remain observable in the parent
              addBar={() => section.addBar(i)} 
              deleteBar={(sections.length > 1 || section.bars.length > 1) 
                ? (() => section.deleteBar(i)) : undefined} 
              // eslint-disable-next-line max-len
              addBarAfter={i === section.bars.length - 1 ? (() => section.addBar()) : undefined} 
            />

            {i === section.bars.length - 1 && (
              <div
                className='add-bar'
                data-html2canvas-ignore='true'
                onClick={() => section.addBar(section.bars.length)}
              >
                <FontAwesomeIcon icon={faPlus} className='add-bar-icon' />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
});

export default Section;
