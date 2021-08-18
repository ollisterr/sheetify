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
  return (
    <SectionControlsWrapper>
      <SectionTags>
        {sectionTags.map((tag, i) => {
        // check running number for the tag
          const number = sections.filter((section) => 
            section.name === tag
          ).indexOf(section) + 1;

          return (
            <SectionTag
              key={i}
              checked={tag === section.name}
              onClick={() => section.setName(tag)}
            >
              <SectionRadioButton />

              {tag}{number > 1 && number}
            </SectionTag>
          );
        })}

        <CustomSectionTag
          as="input"
          checked={!sectionTags.includes(section.name ?? "") && !!section.name}
          placeholder='Section name...'
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
            section.setName(e.target.value)
          }
          tabIndex={-1}
        />
      </SectionTags>
        
      <SectionConfig>
        <ChordsPerBar>
        Chords:
      
          <ChordsPerBarInput
            className='chords-per-bar-input'
            type='number'
            min='1'
            value={section.chordsPerBar}
            onChange={(e) => 
              section.setChordsPerBar(parseInt(e.target.value) ?? 1)
            }
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
    </SectionControlsWrapper>
  );
});

export const SectionControlsWrapper = styled.div`
  display: flex;
  gap: ${p => p.theme.spacing.default};
  flex-flow: row wrap;
  align-items: center;
  width: 100%;
  margin-left: -${p => p.theme.spacing.xsmall};
  font-weight: bold;
  overflow: hidden;

  @media ${device.sm} {
    font-size: 0.8rem;
  }
`;

const SectionRadioButton = styled.input.attrs({ type: "radio" })`
  display: none;
`;

const SectionTags = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  gap: ${p => p.theme.spacing.xsmall};

  @media ${device.sm} {
    width: 60%;
    overflow-x: scroll;
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */

    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

export const SectionTag = styled.label<{ checked: boolean }>`
  display: flex;
  align-items: center;
  height: 2rem;
  padding: 0.3rem 0.6rem;
  border: solid 2px ${p => p.theme.colors.lightgrey};
  font-weight: bold;
  color: ${p => p.theme.colors.lightgrey};
  line-height: 1;

  opacity: 0;
  transition-property: color, background-color, opacity;
  transition-duration: 0.2s;
  cursor: pointer;

  &::placeholder {
    color: ${p => p.theme.colors.lightgrey};
  }

  &:hover, &:focus {
    color: white;
    background-color: ${p => p.theme.colors.lightgrey};

    &::placeholder {
      color: white;
    }
  }

  @media ${device.sm} {
    padding: 0 0.5rem;
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

const CustomSectionTag = styled(SectionTag)`
  width: 10rem;
`;

export const SectionConfig = styled.div`
  display: flex;
  width: auto;
  height: 100%;
  margin-left: auto; // align right

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
  padding: 0;
  border: none;
  margin-left: 1rem;
  color: ${p => p.theme.colors.black};
  font-size: 1.5rem;
  transition-property: color, opacity;
  cursor: pointer;

  &:hover, &:focus {
    color: ${p => p.theme.colors.grey};
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
  width: 2em;
  text-align: right;
`;

export default SectionControls;