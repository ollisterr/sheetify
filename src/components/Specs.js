import React, { useContext } from "react";
import { SheetContext } from "../utils/state.js";
import "../css/Specs.scss";
import logo from "../assets/sheetify-logo.png";

const SheetSpecification = () => {
  const [
    { timeSignature, sheetData, chordsPerBar, tempo },
    dispatch
  ] = useContext(SheetContext);

  function setSheetTitle(e) {
    const title = e.target.value;
    sheetData["name"] = title;
    dispatch({ type: "setSheetData", newSheetData: sheetData });
  }

  function setTimeSignatureBase(e) {
    const value = e.target.value.length > 0 ? parseInt(e.target.value) : 1;
    dispatch({
      type: "setTimeSignature",
      newTimeSignature: [timeSignature[0], value]
    });
  }
  function setTimeSignature(e) {
    const value = e.target.value.length > 0 ? parseInt(e.target.value) : 1;
    dispatch({
      type: "setTimeSignature",
      newTimeSignature: [value, timeSignature[1]]
    });
  }

  function setTempo(e) {
    const value = e.target.value.length > 0 ? parseInt(e.target.value) : 20;
    dispatch({
      type: "setTempo",
      newTempo: value
    });
  }

  function setChordsPerBar(e) {
    const value = e.target.value.length > 0 ? parseInt(e.target.value) : 0;
    dispatch({
      type: "setChordsPerBar",
      newChordsPerBar: value
    });
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
        onChange={setSheetTitle}
      />
      <div className='basic-info'>
        <div>
          <input
            type='number'
            min='2'
            className='time-signature-input'
            value={timeSignature[0]}
            onChange={setTimeSignature}
          />{" "}
          /
          <select
            className='time-signature-input'
            onChange={setTimeSignatureBase}
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
            value={tempo}
            onChange={setTempo}
          />{" "}
          BPM
        </div>
        <div>
          Key: <input className='key' name='key' placeholder='C' />
        </div>
        <div>
          <input
            type='number'
            min='1'
            className='chords-per-bar'
            value={chordsPerBar}
            onChange={setChordsPerBar}
          />
        </div>
      </div>
    </div>
  );
};

export default SheetSpecification;
