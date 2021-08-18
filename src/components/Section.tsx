import React from "react";
import styled from "styled-components";
import {
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { observer } from "mobx-react-lite";

import Bar from "./Bar";
import { SectionModule } from "../store/SectionModule";
import { device } from "../utils/constants";
import SectionControls, { SectionConfig, SectionTag } from "./SectionControls";


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
    <SectionWrapper>
      <SectionControls 
        section={section} 
        sections={sections} 
        addSection={addSection} 
        removeSection={removeSection} 
      />

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
    </SectionWrapper>
  );
});

const calculateBarsGrid = (chordsPerBar: number) => {
  if (chordsPerBar === 1) {
    return "1fr ".repeat(8);
  } else if (chordsPerBar === 2) {
    return "1fr ".repeat(4);
  } else if (chordsPerBar === 3) {
    return "1fr ".repeat(3);
  } else if (chordsPerBar >= 8) {
    return "1fr";
  } else {
    return "1fr ".repeat(2);
  }
};

const SectionWrapper = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  margin-top: 30px;
  padding-left: $barBorder;
  color: lightgrey;
  page-break-before: auto;

  &:hover ${SectionTag}, &:hover ${SectionConfig} {
    opacity: 1;
  }
`;



const Bars = styled.div<{ chordsPerBar: number }>`
  display: grid;
  grid-template-columns: ${p => calculateBarsGrid(p.chordsPerBar)};
  width: 100%;

  @media ${device.sm} {
    grid-template-columns: 1fr;
  }

  @media print {
    grid-template-columns: ${p => calculateBarsGrid(p.chordsPerBar)};
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

  @media ${device.sm} {
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
  
  &:hover {
    background-color: darkgrey;
  }

  @media ${device.sm} {
    height: 2rem !important;
    border: solid 2px white;
  }
`;

export default Section;
