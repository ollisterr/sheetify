import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

import repeatStart from "../assets/repeat-sign-start.svg";
import repeatEnd from "../assets/repeat-sign-end.svg";
import { BarModule } from "../store/BarModule";
import { observer } from "mobx-react-lite";
import { device } from "../utils/constants";

interface Bar {
  bar: BarModule,
  addBar: () => void;
  deleteBar?: () => void;
  addBarAfter?: () => void;
}

const Bar: React.FC<Bar> = observer(({ 
  bar, 
  addBar, 
  deleteBar
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

  return (
    <BarWrapper>
      <BarControls>
        <BarControlButton onClick={addBar}>
          <BarControlIcon
            icon={faPlus}
          />
        </BarControlButton>

        {deleteBar && (
          <BarControlButton onClick={() => deleteBar()}>
            <BarControlIcon
              icon={faMinus}
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

        {bar.repeat[1] && (
          <RepeatTag show={(bar.repeatTimes ?? 1) > 1}>
            <RepeatInput 
              value={bar.repeatTimes ?? 1}
              type="number" 
              min={1}
              dir="rtl"
              tabIndex={-1}
              onChange={(e) => 
                bar.setRepeatTimes(Math.max(1, parseInt(e.target.value)))
              } 
              onFocus={e => e.target.select()}
              placeholder="Repeat times" 
            />

            {bar.repeatTimes && <span>x</span>}
          </RepeatTag>
        )}
      </BarControls>
       
      <BarContent>
        <RepeatSign checked={!!bar.repeat[0]} dir="right">
          <img src={repeatStart} />

          <RepeatSignCheckbox onChange={() => bar.toggleRepeat(0)} />
        </RepeatSign>

        {bar.bar.map((chord: string, i: number) => (
          <BarBlock
            value={chord}
            key={i}
            onChange={e => updateBar(i, e.target.value)}
            autoFocus={i === 0}
          />
        ))}

        <RepeatSign checked={!!bar.repeat[1]} dir="left">
          <img src={repeatEnd} />

          <RepeatSignCheckbox onChange={() => bar.toggleRepeat(1)} />
        </RepeatSign>
      </BarContent>
    </BarWrapper>
  );
});

const BarControls = styled.div`
  display: flex;
  justify-content: stretch;
  align-items: center;
  gap: ${p => p.theme.spacing.small};

  height: 1rem;
  width: calc(100% - ${p => p.theme.spacing.small});
  margin-bottom: ${p => p.theme.spacing.xsmall};
  font-size: 0.9rem;
  transition: opacity 0.2s;

  > * {
    opacity: 0;
  }

  @media ${device.sm} {
    width: 100%;
  }
`;

const BarControlButton = styled.button`
  display: none;
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
    box-shadow: 0 0 0 ${p => p.theme.rem(3)} ${p => p.theme.colors.black};
  }
`;

const BarControlIcon = styled(FontAwesomeIcon)`
  font-size: 1rem;
  padding: 2px;
`;

const SectionGoal = styled.input<{ isDefined: boolean }>`
  flex: 1;
  padding-left: ${p => p.theme.spacing.xsmall};

  border: ${p => `solid ${p.theme.rem(2)} ${p.theme.colors.lightgrey}`};
  border-width: 2px 0 0 2px;
  visibility: hidden;
  transition: opacity 0.2s;

  ${p => p.isDefined &&`
    opacity: 1;
    visibility: visible; 
  `}
`;

const RepeatTag = styled.label<{ show: boolean }>`
  display: ${p => p.show ? "flex" : "none"};
  width: 3.5rem;
  font-size: 1.1rem;
  font-weight: bold;
  color: ${p => p.theme.colors.black};
  opacity: ${p => p.show ? 1 : 0};
`;

const RepeatInput = styled.input`
  padding: 0;
  padding-right: ${p => p.theme.spacing.xsmall};
  text-align: right;

  // hide number input arrows on print
  @media print {
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    &[type=number] {
      -moz-appearance: textfield;
    }
  }
`;

const RepeatSignCheckbox = styled.input.attrs({ type: "checkbox" })`
  display: none;
`;

const RepeatSign = styled.label<{ checked: boolean, dir: "left" | "right" }>` 
  height: 100%;
  opacity: ${p => p.checked ? 1 : 0};
  transition: opacity 0.2s;
  cursor: pointer;
  ${p => `padding-${p.dir}: ${p.theme.spacing.small};`}

  > img {
    height: 100%;
  }

  &:hover {
    opacity: 0.5;
  }
`;

const BarContent = styled.div`
  position: relative;
  display: flex;
  align-items: stretch;
  width: 100%;
  height: 3rem;
  box-sizing: border-box;
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
    ${BarControls} {
      grid-template-columns: auto auto 1fr auto;

      > * {
        opacity: 1;
      }

      ${`${BarControlButton}, ${RepeatTag}`} {
        display: flex;
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
