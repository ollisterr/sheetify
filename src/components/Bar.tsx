import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

import { RepeatSignStart, RepeatSignEnd } from "./RepeatSigns";
import "../css/Bar.scss";
import { BarModule } from "../store/BarModule";
import { observer } from "mobx-react-lite";

interface Bar {
  bar: BarModule,
  addBar: () => void;
  deleteBar?: () => void;
  addBarAfter?: () => void;
}

const Bar: React.FC<Bar> = observer(({ 
  bar, 
  addBar, 
  deleteBar,
  addBarAfter
}) => {
  function updateBar(index: number, value: string) {
    const chord = value
      .replace(/ /g, "")
      .split("/")
      .map(x => x.charAt(0).toUpperCase() + x.slice(1))
      .join("/");
    const newBar = [...bar.bar];
    newBar[index] = chord;
    bar.setBar(newBar);
  }

  function addBarOnTab(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Tab" && addBarAfter) {
      e.preventDefault();
      addBarAfter();
    }
  }

  return (
    <BarWrapper>
      <BarControls>
        <BarControlButton>
          <FontAwesomeIcon
            icon={faPlus}
            onClick={addBar}
          />
        </BarControlButton>

        {deleteBar && (
          <BarControlButton>
            <FontAwesomeIcon
              icon={faMinus}
              className='remove-bar'
              onClick={() => deleteBar()}
            />
          </BarControlButton>
        )}

        <SectionGoal
          value={bar.goal ?? ""}
          onChange={e => bar.setGoal(e.target.value)}
          placeholder='goal'
          tabIndex={-1}
          isDefined={!!bar.goal}
        />
      </BarControls>
       
      <BarContent>
        <RepeatSignStart repeat={bar.repeat} />

        {bar.bar.map((chord: string, i: number, array: string[]) => (
          <BarBlock
            value={chord}
            key={i}
            onChange={e => updateBar(i, e.target.value)}
            autoFocus={i === 0}
            onKeyDown={
              i === array.length - 1 && addBarAfter
                ? addBarOnTab
                : undefined
            }
          />
        ))}

        <RepeatSignEnd repeat={bar.repeat} />
      </BarContent>
    </BarWrapper>
  );
});

const BarControls = styled.div`
  display: grid;
  grid-template-columns: 0 0 1fr;
  gap: 0;
  align-items: center;

  width: calc(100% - ${p => p.theme.spacing.small});
  padding-bottom: ${p => p.theme.spacing.xsmall};
  transition: opacity 0.2s;

  > * {
    opacity: 0;
  }
`;

const BarControlButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 1rem;
  width: 1rem;
  border-radius: 100%;

  color: white;
  background-color: ${p => p.theme.colors.lightgrey};
  cursor: pointer;
  overflow: hidden;

  transition: background-color 0.15s;

  &:hover {
    background-color: ${p => p.theme.colors.grey};
  }

  &:focus {
    outline: solid 2px black;
  }
`;

const SectionGoal = styled.input<{ isDefined: boolean }>`
  flex: 1;
  width: 100%;
  margin-right: ${p => p.theme.spacing.small};
  padding-left: ${p => p.theme.spacing.xsmall};
  

  border: ${p => `solid ${p.theme.rem(2)} ${p.theme.colors.lightgrey}`};
  border-width: 2px 0 0 2px;
  border-radius: 0;
  visibility: hidden;
  font-size: 0.9rem;
  transition: opacity 0.2s;

  ${p => p.isDefined &&`
    opacity: 1;
    visibility: visible; 
  `}
`;

const BarContent = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 3rem;
  box-sizing: border-box;
  padding: 0 ${p => p.theme.spacing.default};
  border-width: 0 ${p => p.theme.spacing.xsmall};
  border-color: ${p => p.theme.colors.lightgrey};
  border-style: solid;
  font-size: 1.6rem;
`;

const BarBlock = styled.input`
  position: relative;
  display: inline-block;
  flex: 1 1 auto;
  padding-left: ${p => p.theme.spacing.xsmall};
  border-width: 0px 3px;
  border-color: white;
  border-style: solid;
  border-radius: 0;

  &:hover, &:focus {
    border-color: whitesmoke;
  }
`;

const BarWrapper = styled.div`
  position: relative;
  padding-top: ${p => p.theme.spacing.small};
  margin-left: -${p => p.theme.spacing.xsmall};
  font-size: 2rem;

  &:hover {
    .repeat-sign-start,
    .repeat-sign-end {
      visibility: visible;
    }

    ${BarControls} {
      grid-template-columns: auto auto 1fr;
      gap: ${p => p.theme.spacing.small};

      > * {
        opacity: 1;
      }

      ${SectionGoal} {
        visibility: visible;
      }

      @media (max-width: $small) {
        max-height: $barControlHeight;
      }
    }
  }
`;
  

export default Bar;
