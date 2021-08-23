import React from "react";
import styled from "styled-components";
import { observer } from "mobx-react-lite";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

import logo from "../assets/sheetify-logo.svg";
import { sheet } from "../store";

const SheetSpecification: React.FC = observer(() => {
  function setTimeSignatureBase(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value.length > 0 ? parseInt(e.target.value) : 1;
    sheet.setTimeSignature([sheet.timeSignature[0], value]);
  }

  function setTimeSignatureBars(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value.length > 0 ? parseInt(e.target.value) : 1;
    sheet.setTimeSignature([value, sheet.timeSignature[1]]);
  }
 
  function handleTempoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value.length > 0 ? parseInt(e.target.value) : 120;
    sheet.setTempo(value);
  }

  function transpose(interval: -1 | 1) {
    sheet.transpose(interval);
  }

  return (
    <SpecsWrapper>
      <Trademark>
        Made with <Logo alt='Logo' src={logo} />
      </Trademark>

      <TitleInput
        name='title'
        placeholder='Sheet title'
        onChange={(e) => sheet.setTitle(e.target.value)}
        autoComplete="off"
      />

      <SettingsWrapper>
        <Setting>
          <TimeSignatureInput
            type='number'
            min={2}
            className='time-signature-input'
            value={sheet.timeSignature[0]}
            onChange={setTimeSignatureBars}
            onFocus={(e) => e.target.select()}
          />
          /
          <TimeSignatureSelect onChange={setTimeSignatureBase}>
            {[4, 8, 16, 32, 64].map((x) => 
              <option key={x} value={x}>{x}</option>)
            }
          </TimeSignatureSelect>
        </Setting>

        <Setting>
          Tempo:
          <TempoInput
            className='tempo'
            type='number'
            min='0'
            name='tempo'
            value={sheet.tempo}
            onChange={handleTempoChange}
            onFocus={(e) => e.target.select()}
          />
          BPM
        </Setting>

        <Setting>
          Key:
          <KeyInputname 
            name='key' 
            value={sheet.key} 
            onChange={(e) => sheet.setKey(e.target.value)} 
            autoComplete="off"
            onFocus={(e) => e.target.select()} 
          />
        </Setting>

        <Setting hide>
          <TransposeButton onClick={() => transpose(-1)}>
            <FontAwesomeIcon icon={faMinus} />
          </TransposeButton>
        
        Transpose

          <TransposeButton onClick={() => transpose(1)}>
            <FontAwesomeIcon icon={faPlus} />
          </TransposeButton>
          
        </Setting>
      </SettingsWrapper>
    </SpecsWrapper>
  );
});

const SpecsWrapper = styled.div`
  margin: ${p => p.theme.spacing.medium};
`;

const Trademark = styled.p`
  font-size: 0.8rem;
  text-align: center;
`;

const Logo = styled.img`
  width: ${p => p.theme.rem(70)};
  vertical-align: middle;
  margin-left: 10px;
  display: inline-block;
`;

const TitleInput = styled.input`
  font-size: 2.5rem;
  width: 100%;
  text-align: center;
  max-width: none;
  padding: 0px;
  margin: 10px auto;
`;

const SettingsWrapper = styled.div`
  display: flex;
  justify-content: stretch;
  gap: ${p => p.theme.spacing.default};
  width: 100%;
`;

const Setting = styled.div<{ hide?: boolean}>`
  flex: 1;
  display: flex;
  gap: ${p => p.theme.spacing.small};
  justify-content: center;

  @media print {
    ${p => p.hide && "display: none;"} // hide in print
  }
`;

const TimeSignatureInput = styled.input`
  max-width: 2rem;
  text-align: right;
  font-size: inherit;
  font-family: inherit;
  color: inherit;
  display: inline-block;
`;

const TimeSignatureSelect = styled.select`
  max-width: 2rem;
  margin-left: 0.5rem;
  border: none;
  font-family: inherit;
  font-size: inherit;
  appearance: none;
  cursor: pointer;

  &:focus {
    outline: solid 2px ${p => p.theme.colors.lightgrey};
  }
`;

const TempoInput = styled.input`
  text-align: right;
  max-width: 3rem !important;
`;

const KeyInputname = styled.input`
  width: 4rem;
`;

const TransposeButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 1.2rem;
  width: 1.2rem;
  border-radius: 100%;

  color: ${p => p.theme.colors.grey};
  cursor: pointer;
  overflow: hidden;

  transition: background-color 0.15s;

  &:hover {
    background-color: ${p => p.theme.colors.whitesmoke};
  }

  &:focus {
    box-shadow: 0 0 0 ${p => p.theme.rem(3)} ${p => p.theme.colors.black};
  }
`;

export default SheetSpecification;

