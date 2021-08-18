import React from "react";
import "../css/Specs.scss";
import logo from "../assets/sheetify-logo.svg";
import { sheet } from "../store";
import { observer } from "mobx-react-lite";

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

  return (
    <div className='container'>
      <p className='trademark'>
        Made with <img className='logo' alt='Logo' src={logo} />
      </p>

      <input
        className='title'
        name='title'
        placeholder='Sheet title'
        onChange={(e) => sheet.setTitle(e.target.value)}
      />

      <div className='basic-info'>
        <div>
          <input
            type='number'
            min={2}
            className='time-signature-input'
            value={sheet.timeSignature[0]}
            onChange={setTimeSignatureBars}
            tabIndex={-1}
          />{" "}
          /
          <select
            className='time-signature-input'
            onChange={setTimeSignatureBase}
            tabIndex={-1}
          >
            <option value='4'>4</option>
            <option value='8'>8</option>
            <option value='16'>16</option>
            <option value='32'>32</option>
            <option value='64'>64</option>
          </select>
        </div>

        <div>
          Tempo:{" "}
          <input
            className='tempo'
            type='number'
            min='0'
            name='tempo'
            value={sheet.tempo}
            onChange={handleTempoChange}
            tabIndex={-1}
          />{" "}
          BPM
        </div>

        <div className='key'>
          Key:{" "}
          <input className='key' name='key' placeholder='C' tabIndex={-1} />
        </div>
      </div>
    </div>
  );
});

export default SheetSpecification;
