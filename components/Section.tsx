import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import { FaPlus } from 'react-icons/fa';

import { SectionModule } from '../store/SectionModule';
import { device } from '../utils/constants';
import { SectionControls, SectionConfig, SectionTag } from './SectionControls';
import { Bar } from './Bar';

interface Section {
  section: SectionModule;
  sections: SectionModule[];
  addSection: () => void;
  removeSection: () => void;
}

export const Section = observer(
  ({ section, sections, addSection, removeSection }: Section) => {
    return (
      <SectionWrapper>
        <SectionControls
          section={section}
          sections={sections}
          addSection={addSection}
          removeSection={removeSection}
        />

        <Bars $chordsPerBar={section.chordsPerBar}>
          {section.bars.map((bar, i) => (
            <div key={i} style={{ position: 'relative' }}>
              <Bar
                bar={bar}
                // Make copies of the functions
                // for them to remain observable in the parent
                addBar={() => section.addBar(i)}
                deleteBar={
                  sections.length > 1 || section.bars.length > 1
                    ? () => section.deleteBar(i)
                    : undefined
                }
              />

              {i === section.bars.length - 1 && (
                <AddBarButton
                  onClick={() => section.addBar(section.bars.length)}
                >
                  <AddBarIcon />
                </AddBarButton>
              )}
            </div>
          ))}
        </Bars>
      </SectionWrapper>
    );
  },
);

const calculateBarsGrid = (chordsPerBar: number) => {
  if (chordsPerBar === 1) {
    return '1fr '.repeat(8);
  } else if (chordsPerBar === 2) {
    return '1fr '.repeat(4);
  } else if (chordsPerBar === 3) {
    return '1fr '.repeat(3);
  } else if (chordsPerBar >= 8) {
    return '1fr';
  } else {
    return '1fr '.repeat(2);
  }
};

const SectionWrapper = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  padding-top: ${(p) => p.theme.spacing.large};
  color: ${(p) => p.theme.colors.lightgrey};
  page-break-before: auto;

  &:hover ${SectionTag}, &:hover ${SectionConfig} {
    opacity: 1;
    display: flex;
  }

  @media ${device.sm} {
    padding-top: ${(p) => p.theme.spacing.default};
  }
`;

const Bars = styled.div<{ $chordsPerBar: number }>`
  display: grid;
  grid-template-columns: ${(p) => calculateBarsGrid(p.$chordsPerBar)};
  gap: 0 ${(p) => p.theme.spacing.xsmall};
  align-items: center;
  width: 100%;

  @media ${device.sm} {
    grid-template-columns: 1fr;
  }

  @media print {
    grid-template-columns: ${(p) => calculateBarsGrid(p.$chordsPerBar)};
  }
`;

const AddBarButton = styled.button`
  position: absolute;
  bottom: 0.3rem;
  right: -${(p) => p.theme.spacing.small};
  transform: translateX(100%);

  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.4rem !important;
  height: 2.4rem !important;
  border-radius: 100%;
  background-color: lightgrey;
  transition: 0.2s background-color;

  &:hover {
    background-color: darkgrey;
  }

  &:focus {
    box-shadow: 0 0 0 ${(p) => p.theme.rem(3)} ${(p) => p.theme.colors.black};
  }

  @media ${device.sm} {
    right: 0;
    width: 2rem;
    height: 2rem;
    border: solid 2px white;
    transform: translateX(43%);
  }

  @media print {
    visibility: hidden;
  }
`;

const AddBarIcon = styled(FaPlus)`
  width: 100% !important;
  height: 100% !important;
  font-size: 3rem;
  color: white;
`;