import React, { useContext } from "react";
import { SheetContext } from "../store.js";
import "../css/Specs.scss";
import logo from "../assets/sheetify-logo.png";

const SheetSpecification = () => {
  const [{ timeSignature, sheetData, tempo }, dispatch] = useContext(
    SheetContext
  );

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
            tabIndex='-1'
          />{" "}
          /
          <select
            className='time-signature-input'
            onChange={setTimeSignatureBase}
            tabIndex='-1'
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
            tabIndex='-1'
          />{" "}
          BPM
        </div>
        <div className='key'>
          Key:{" "}
          <input className='key' name='key' placeholder='C' tabIndex='-1' />
        </div>
      </div>
    </div>
  );
};

export default SheetSpecification;
