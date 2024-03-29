'use client';

import styled, { css } from 'styled-components';
import { observer } from 'mobx-react-lite';

import { device } from '../utils/constants';
import { SectionModule } from '../store/SectionModule';
import { FaPlusSquare, FaTrash } from 'react-icons/fa';
import { useGlobalState } from 'providers/GlobalStateProvider';

const sectionTags = ['A', 'B', 'C', 'Bridge', 'Intro', 'Outro'];

interface SectionControls {
  section: SectionModule;
  sections: SectionModule[];
  addSection: () => void;
  removeSection: () => void;
}

export const SectionControls = observer(
  ({ section, sections, addSection, removeSection }: SectionControls) => {
    const { readMode } = useGlobalState();

    const customSectionName =
      (!sectionTags.includes(section.name ?? '') && section.name) || '';

    if (readMode && !section.name) return null;

    return (
      <SectionControlsWrapper>
        <SectionTags>
          {sectionTags.map((tag, i) => {
            // check running number for the tag
            const number =
              sections
                .filter((section) => section.name === tag)
                .indexOf(section) + 1;

            return (
              <SectionTag
                key={i}
                checked={tag === section.name}
                $readMode={readMode}
              >
                <SectionRadioButton
                  onClick={() =>
                    !readMode &&
                    section.setName(tag === section.name ? '' : tag)
                  }
                />

                {tag}
                {number > 1 && number}
              </SectionTag>
            );
          })}

          <CustomSectionTag
            as="input"
            value={customSectionName ?? ''}
            checked={!!customSectionName}
            placeholder="Section name..."
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              section.setName(e.target.value)
            }
            tabIndex={-1}
            $readMode={readMode}
          />
        </SectionTags>

        <SectionConfig>
          <ChordsPerBar>
            Chords:
            <ChordsPerBarInput
              className="chords-per-bar-input"
              type="number"
              min="1"
              value={section.chordsPerBar}
              onChange={(e) =>
                section.setChordsPerBar(parseInt(e.target.value) ?? 1)
              }
            />
          </ChordsPerBar>

          <SectionControl onClick={addSection}>
            <FaPlusSquare />
          </SectionControl>

          {sections.length > 1 && (
            <SectionControl onClick={removeSection}>
              <FaTrash />
            </SectionControl>
          )}
        </SectionConfig>
      </SectionControlsWrapper>
    );
  },
);

export const SectionControlsWrapper = styled.div`
  display: flex;
  gap: ${(p) => p.theme.spacing.default};
  flex-flow: row wrap;
  align-items: center;
  width: 100%;
  font-weight: bold;
  overflow: hidden;

  @media ${device.sm} {
    font-size: 0.8rem;
  }
`;

const SectionRadioButton = styled.input.attrs({ type: 'radio' })`
  display: none;
`;

const SectionTags = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  gap: ${(p) => p.theme.spacing.xsmall};

  @media ${device.sm} {
    width: 60%;
    overflow-x: scroll;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */

    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

export const SectionTag = styled.label<{
  checked: boolean;
  $readMode: boolean;
}>`
  display: flex;
  align-items: center;
  height: ${(p) => p.theme.rem(p.theme.readMode ? 1.6 : 2)};
  padding: ${(p) =>
    `${p.theme.rem(p.theme.readMode ? 0.3 : 0.4)} ${p.theme.rem(
      p.theme.readMode ? 0.5 : 0.6,
    )}`};
  font-size: ${(p) => p.theme.rem(p.theme.readMode ? 0.9 : 1.1)};
  border: solid 2px ${(p) => p.theme.colors[p.checked ? 'grey' : 'lightgrey']};
  color: ${(p) => p.theme.colors[p.checked ? 'grey' : 'lightgrey']};
  font-weight: bold;
  line-height: 1;
  opacity: 0;

  transition-property: opacity;
  transition-duration: 0.2s;
  ${(p) => !p.theme.readMode && 'cursor: pointer'};

  &::placeholder {
    color: ${(p) => p.theme.colors.lightgrey};
  }

  ${(p) =>
    !p.$readMode &&
    css`
      &:hover,
      &:focus {
        color: white;
        background-color: ${(p) => p.theme.colors.lightgrey};

        &::placeholder {
          color: white;
        }
      }
    `}

  @media ${device.sm} {
    padding: 0 0.5rem;
    ${(p) =>
      !p.theme.readMode &&
      css`
        opacity: 1;
      `}
  }

  @media print {
    opacity: ${(p) => (p.checked ? 1 : 0)};
  }

  ${(p) =>
    p.checked &&
    css`
      opacity: 1;
      order: -1;

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
  display: none;
  width: auto;
  height: 100%;
  margin-left: auto; // align right

  opacity: 0;
  transition-property: color, background-color, opacity;
  transition-duration: 0.2s;

  @media ${device.sm} {
    opacity: 1;
  }

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
  color: ${(p) => p.theme.colors.black};
  font-size: 1.5rem;
  transition-property: color, opacity;
  cursor: pointer;

  &:hover,
  &:focus {
    color: ${(p) => p.theme.colors.grey};
    background: none;
  }
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
