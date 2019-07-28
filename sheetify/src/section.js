import React, { useContext } from "react";
import { SheetContext } from "./state.js";
import "./css/sheetbody.css";

export const Bar = ({ sectionID, barID }) => {
  const [{ sheetData }, dispatch] = useContext(SheetContext);

  return (
    <div className="bar">
      <div className="bar-controls">
        <div
          className="add-bar-inbetween"
          onClick={() => {
            sheetData[sectionID] = sheetData[sectionID]
              .slice(0, barID)
              .concat([["", "", "", ""]])
              .concat(
                sheetData[sectionID].slice(barID, sheetData[sectionID].length)
              );
            dispatch({ type: "setSheetData", newSheetData: sheetData });
            console.log("Adding after bar: " + barID);
            console.log(sheetData);
          }}
        >
          +
        </div>
        <div
          className="remove-bar"
          onClick={() => {
            sheetData[sectionID] = sheetData[sectionID].filter(
              (_, i) => i !== barID
            );
            dispatch({ type: "setSheetData", newSheetData: sheetData });
            console.log("Removing: " + sectionID + " | " + barID);
          }}
        >
          -
        </div>
      </div>
      <div className="bar-content">
        {barID}
        {sheetData[sectionID][barID].map((chord, i) => {
          return (
            <input
              value={chord}
              key={(sectionID, barID, i)}
              className="bar-block"
              onChange={e => {
                sheetData[sectionID][barID][i] = e.target.value;
                console.log("Adding: " + sectionID + " | " + barID);
                dispatch({ type: "setSheetData", newSheetData: sheetData });
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export const Section = ({ sectionID }) => {
  const [{ sheetData }, dispatch] = useContext(SheetContext);

  return (
    <div className="section">
      {sheetData[sectionID].map((bar, i) => {
        return <Bar key={[sectionID, i]} sectionID={sectionID} barID={i} />;
      })}
      <div
        className="bar"
        onClick={() => {
          sheetData[sectionID] = [...sheetData[sectionID], ["", "", "", ""]];
          dispatch({ type: "setSheetData", newSheetData: sheetData });
        }}
      >
        +
      </div>
    </div>
  );
};
