import React, { useContext } from "react";
import { SheetContext } from "./state.js";
import "./css/specs.scss";

const SheetSpecification = () => {
  const [{ timeSignature }, dispatch] = useContext(SheetContext);

  return (
    <div className="container">
      <p className="trademark">Made with Sheetify</p>
      <input className="title" name="title" placeholder="Sheet title" />
      <div className="basic-info">
        <div>
          <input
            type="number"
            min="2"
            className="time-signature-input"
            placeholder={timeSignature[0]}
            onChange={e =>
              dispatch({
                type: "setTimeSignature",
                newTimeSignature: [e.target.value, timeSignature[1]]
              })
            }
          />{" "}
          /
          <select
            className="time-signature-input"
            onChange={e =>
              dispatch({
                type: "setTimeSignature",
                newTimeSignature: [timeSignature[0], e.target.value]
              })
            }
          >
            <option value="4">4</option>
            <option value="8">8</option>
            <option value="16">16</option>
            <option value="32">32</option>
            <option value="64">64</option>
          </select>
        </div>
        <div>
          Tempo: <input className="tempo" name="tempo" placeholder="120" /> BPM
        </div>
        <div>
          Key: <input className="key" name="key" placeholder="C" />
        </div>
      </div>
    </div>
  );
};

export default SheetSpecification;
