import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import {
  faPlus,
  faTrash,
  faPlusSquare
} from "@fortawesome/free-solid-svg-icons";
import { observer } from "mobx-react-lite";

import "../css/Section.scss";
import Bar from "./Bar";
import { SectionModule } from "../store/SectionModule";
import { device } from "../utils/constants";

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

      <Bars chordsPerBar={section.chordsPerBar}>
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
              <AddBarButton onClick={() => section.addBar(section.bars.length)}>
                <AddBarIcon icon={faPlus} />
              </AddBarButton>
            )}
          </div>
        ))}
      </Bars>
    </div>
  );
});

const calculateBarsGrid = (chordsPerBar: number) => {
  if (chordsPerBar <= 2) {
    return "1fr ".repeat(4);
  } else if (chordsPerBar === 3) {
    return "1fr ".repeat(3);
  } else {
    return "1fr ".repeat(2);
  }
};

const Bars = styled.div<{ chordsPerBar: number }>`
  display: grid;
  grid-template-columns: ${p => calculateBarsGrid(p.chordsPerBar)};
  width: 100%;

  @media ${device("sm")} {
    grid-template-columns: 1fr;
  }
`;

const AddBarButton = styled.div`
  position: absolute;
  bottom: 0;
  right: -${p => p.theme.spacing.small};
  transform: translateX(100%);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 3rem;
  cursor: pointer;

  @media ${device("sm")} {
    right: 0;
    width: 2rem;
    transform: translateX(43%);
  }

  @media print {
    visibility: hidden;
  }
`;

const AddBarIcon = styled(FontAwesomeIcon)`
  width: 2.4rem !important;
  height: 2.4rem !important;
  padding: ${p => p.theme.spacing.xsmall};
  font-size: 3rem;
  border-radius: 100%;

  color: white;
  background-color: lightgrey;
  transition: 0.2s background-color;

  @media ${device("sm")} {
    height: 2rem !important;
    border: solid 2px white;
  }

  &:hover {
    background-color: darkgrey;
  }
`;

export default Section;
