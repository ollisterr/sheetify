import styled, { css } from 'styled-components';

import { BarModule } from '../store/BarModule';
import { observer } from 'mobx-react-lite';
import { device } from '../utils/constants';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { RepeatSign } from './icons/RepeatSign';
import { useGlobalState } from 'providers/GlobalStateProvider';

interface BarProps {
  bar: BarModule;
  addBar: () => void;
  deleteBar?: () => void;
  addBarAfter?: () => void;
}

export const Bar = observer(({ bar, addBar, deleteBar }: BarProps) => {
  const { readMode, zoom } = useGlobalState();

  const updateBar = (index: number, value: string) => {
    // eslint-disable-next-line max-len
    const regex =
      /^\(?[a-gA-G]{1}(#|b)?(m|-)?[a-zA-Z1-9-+°]*(\/[a-gA-G]{1}(#|b)?)?\)?$/g;
    // match chords with allowed characters
    // add exception for / being the last character
    if (value.match(regex) || value[value.length - 1] === '/' || value === '') {
      const chord = value
        .split('/')
        .map((x) => x.charAt(0).toUpperCase() + x.slice(1))
        .join('/');
      const newBar = [...bar.bar];
      newBar[index] = chord;
      bar.setBar(newBar);
    }
  };

  return (
    <BarWrapper>
      {(bar.goal || !readMode) && (
        <BarControls>
          <BarControlButton onClick={addBar}>
            <FaPlus size="100%" />
          </BarControlButton>

          {deleteBar && (
            <BarControlButton onClick={() => deleteBar()}>
              <FaMinus />
            </BarControlButton>
          )}

          <SectionGoal
            value={bar.goal ?? ''}
            onChange={(e) => bar.setGoal(e.target.value)}
            placeholder="goal"
            tabIndex={-1}
            $isDefined={!!bar.goal}
            disabled={readMode}
          />

          {bar.repeat[1] && (
            <RepeatTag $show={(bar.repeatTimes ?? 1) > 1}>
              <RepeatInput
                value={bar.repeatTimes ?? 1}
                type="number"
                min={1}
                dir="rtl"
                tabIndex={-1}
                onChange={(e) =>
                  bar.setRepeatTimes(Math.max(1, parseInt(e.target.value)))
                }
                onFocus={(e) => e.target.select()}
                placeholder="Repeat times"
              />

              <span>x</span>
            </RepeatTag>
          )}
        </BarControls>
      )}

      <BarContent>
        <RepeatSignWrapper checked={!!bar.repeat[0]} dir="right">
          <RepeatSign />

          <RepeatSignCheckbox onChange={() => bar.toggleRepeat(0)} />
        </RepeatSignWrapper>

        {bar.bar.map((chord: string, i: number) => (
          <BarBlock
            value={chord}
            key={i}
            onChange={(e) => updateBar(i, e.target.value)}
            autoFocus={i === 0}
            // auto scale font for large inputs
            style={{
              fontSize:
                (chord?.length ?? 0) > 7
                  ? `${((1.5 * 8) / chord.length) * zoom}rem`
                  : undefined,
            }}
            disabled={readMode}
          />
        ))}

        <RepeatSignWrapper checked={!!bar.repeat[1]} dir="left">
          <RepeatSign end />

          <RepeatSignCheckbox onChange={() => bar.toggleRepeat(1)} />
        </RepeatSignWrapper>
      </BarContent>
    </BarWrapper>
  );
});

const BarControls = styled.div`
  display: flex;
  justify-content: stretch;
  align-items: center;
  gap: ${(p) => p.theme.spacing.small};

  height: 1rem;
  width: calc(100% - ${(p) => p.theme.spacing.small});
  margin-bottom: ${(p) => p.theme.spacing.xsmall};
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

  height: 1.1rem;
  width: 1.1rem;
  border-radius: 100%;

  > * {
    width: 100%;
    height: 100%;
  }

  color: white;
  background-color: ${(p) => p.theme.colors.lightgrey};
  overflow: hidden;
  cursor: pointer;

  transition: background-color 0.15s;

  &:hover {
    background-color: ${(p) => p.theme.colors.grey};
  }

  &:focus {
    box-shadow: 0 0 0 ${(p) => p.theme.px(3)} ${(p) => p.theme.colors.black};
  }
`;

const SectionGoal = styled.input<{ $isDefined: boolean }>`
  flex: 1;
  padding-left: ${(p) => p.theme.spacing.xsmall};

  border: ${(p) => `solid ${p.theme.px(2)} ${p.theme.colors.lightgrey}`};
  border-width: 2px 0 0 2px;
  visibility: hidden;
  transition: opacity 0.2s;

  ${(p) =>
    p.$isDefined &&
    `
    opacity: 1;
    visibility: visible; 
  `}
`;

const RepeatTag = styled.label<{ $show: boolean }>`
  display: ${(p) => (p.$show ? 'flex' : 'none')};
  width: 3.5rem;
  font-size: 1.1rem;
  font-weight: bold;
  color: ${(p) => p.theme.colors.black};
  opacity: ${(p) => (p.$show ? 1 : 0)};
`;

const RepeatInput = styled.input`
  padding: 0;
  padding-right: ${(p) => p.theme.spacing.xsmall};
  text-align: right;

  // hide number input arrows on print
  @media print {
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    &[type='number'] {
      -moz-appearance: textfield;
      appearance: textfield;
    }
  }
`;

const RepeatSignCheckbox = styled.input.attrs({ type: 'checkbox' })`
  display: none;
`;

const RepeatSignWrapper = styled.label<{
  checked: boolean;
  dir: 'left' | 'right';
}>`
  height: 100%;
  opacity: ${(p) => (p.checked ? 1 : 0)};
  transition: opacity 0.2s;
  cursor: pointer;
  ${(p) => `padding-${p.dir}: ${p.theme.spacing.xsmall};`}

  > * {
    height: 100%;
  }

  &:hover {
    opacity: 0.5;
  }

  @media print {
    ${(p) => `padding-${p.dir}: ${p.checked ? p.theme.spacing.xsmall : 0};`}
  }
`;

const BarContent = styled.div`
  position: relative;
  display: flex;
  align-items: stretch;
  gap: ${(p) => p.theme.spacing.xxsmall};
  width: 100%;
  height: ${(p) =>
    p.theme.readMode ? p.theme.spacing.xlarge : p.theme.spacing.xxlarge};
  box-shadow:
    -${(p) => p.theme.spacing.xsmall} 0 0 0 ${(p) => p.theme.colors.lightgrey},
    ${(p) => p.theme.spacing.xsmall} 0 0 0 ${(p) => p.theme.colors.lightgrey};
  font-size: min(${(p) => p.theme.rem(1.8)}, 1.5vw);

  @media ${device.sm} {
    font-size: ${(p) => p.theme.rem(1.5)};
  }

  @media print {
    font-size: ${(p) => p.theme.rem(1.2)};
    gap: 0;
  }
`;

const BarBlock = styled.input<{ disabled: boolean }>`
  position: relative;
  display: inline-block;
  flex: 1 1 auto;
  padding: 0;
  padding-left: ${(p) => p.theme.spacing.xsmall};
  margin: 0;
  background: none;
  transition: box-shadow 0.1s;

  ${(p) =>
    !p.disabled &&
    css`
      &:hover,
      &:focus {
        box-shadow:
          -${(p) => p.theme.px(3)} 0px 0px 0px rgba(0, 0, 0, 0.1),
          ${(p) => p.theme.px(3)} 0px 0px 0px rgba(0, 0, 0, 0.1);
      }
    `}
`;

const BarWrapper = styled.div`
  position: relative;
  padding-top: ${(p) => p.theme.spacing.small};
  font-size: 2rem;

  ${(p) =>
    !p.theme.readMode &&
    css`
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
    `}
`;
