import React from "react";
import styled from "styled-components";
import {
  faTrash,
  faPlusSquare
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { observer } from "mobx-react-lite";

import { device } from "../utils/constants";
import { SectionModule } from "../store/SectionModule";

const sectionTags = ["A", "B", "C", "Bridge", "Intro", "Outro"];

interface SectionControls {
  section: SectionModule;
  sections: SectionModule[];
  addSection: () => void;
  removeSection: () => void;
}

const SectionControls = observer(({ 
  section, 
  sections, 
  addSection, 
  removeSection 
}: SectionControls) => {
  return <SectionControlsWrapper>
    {sectionTags.map((tag, i) => {
      const number = sections.filter((section, index) => 
        section.name === tag && index <= i
      ).length;

      return (
        <SectionTag
          key={i}
          checked={tag === section.name}
          onClick={() => section.setName(tag)}
        >
          <SectionRadioButton />

          {tag} {number > 1 && number}
        </SectionTag>
      );
    })}

    <CustomSectionTag
      as="input"
      checked={!sectionTags.includes(section.name ?? "") && !!section.name}
      placeholder='Section name...'
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
        section.setName(e.target.value)}
      tabIndex={-1}
    />
        
    <SectionConfig>
      <ChordsPerBar>
        Chords:
      
        <ChordsPerBarInput
          className='chords-per-bar-input'
          type='number'
          min='1'
          value={section.chordsPerBar}
          onChange={(e) => 
            section.setChordsPerBar(parseInt(e.target.value) ?? 1)}
          tabIndex={-1}
        />
      </ChordsPerBar>

      <SectionControl onClick={addSection}>
        <SectionControlIcon icon={faPlusSquare} />
      </SectionControl>

      {sections.length > 1 && (
        <SectionControl onClick={removeSection}>
          <SectionControlIcon icon={faTrash} />
        </SectionControl>
      )}
    </SectionConfig>
  </SectionControlsWrapper>;
});

export const SectionControlsWrapper = styled.div`
  display: flex;
  gap: ${p => p.theme.spacing.xsmall};
  flex-flow: row wrap;
  align-items: center;
  width: 100%;
  margin-left: -${p => p.theme.spacing.xsmall};
  font-weight: bold;
  overflow: hidden;
  transition: max-width 0.2s;

  @media ${device.sm} {
    max-height: calc(1.6rem + 8px);
  }
`;

const SectionRadioButton = styled.input.attrs({ type: "radio" })`
  display: none;
`;

export const SectionTag = styled.label<{ checked: boolean }>`
  box-sizing: content-box;
  display: block;
  width: auto;
  height: 1.2rem;
  padding: 0.3rem 0.6rem;
  border: solid 2px ${p => p.theme.colors.lightgrey};
  font-size: 1rem;
  font-weight: bold;
  color: ${p => p.theme.colors.lightgrey};

  opacity: 0;
  transition-property: color, background-color, opacity;
  transition-duration: 0.2s;
  cursor: pointer;

  &::placeholder {
    color: lightgrey;
  }

  &:hover {
    color: white;
    background-color: lightgrey;

    &::placeholder {
      color: white;
    }
  }

  @media ${device.sm} {
    margin-bottom: 2px;
  }

  ${p => p.checked && `
    color: darkgrey;
    border-color: darkgrey;
    order: -1;
    opacity: 1;

    @media ${device.lg} {
      &:hover {
        color: white;
        background-color: darkgrey;
      }
    }
  `}
`;

const CustomSectionTag = styled(SectionTag)``;

export const SectionConfig = styled.div`
  display: grid;
  grid-template-columns: 1fr auto auto;
  width: auto;
  height: 100%;
  margin-left: auto;

  opacity: 0;
  transition-property: color, background-color, opacity;
  transition-duration: 0.2s;

  @media print {
    display: none;
  }
`;

const SectionControl = styled.button`
  display: flex;
  align-items: center;
  height: 100%;
  margin-left: 1rem;
  font-size: 1.5rem;
  border: none;
  padding: 0;
  transition-property: color, opacity;
  cursor: pointer;

  &:hover {
    color: grey;
    background: none;
  }
`;

const SectionControlIcon = styled(FontAwesomeIcon)`

`;

const ChordsPerBar = styled.label`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const ChordsPerBarInput = styled.input`
  width: 4rem;
  text-align: right;
`;

export default SectionControls;