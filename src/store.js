import React, { createContext, useReducer } from "react";

export const SheetContext = createContext();

export const reducer = (state, action) => {
  switch (action.type) {
  case "setTitle":
    return {
      ...state,
      title: action.newTitle
    };
  case "setTimeSignature":
    return {
      ...state,
      timeSignature: action.newTimeSignature
    };
  case "setSheetData":
    return {
      ...state,
      sheetData: action.newSheetData
    };
  case "setTempo":
    return {
      ...state,
      tempo: action.newTempo
    };
  case "initialize":
    return {
      ...state,
      title: action.newTitle,
      timeSignature: action.newTimeSignature,
      tempo: action.newTempo,
      sheetData: action.newSheetData
    };
  default:
    return state;
  }
};

export function emptyBar() {
  const obj = {};
  obj.bar = ["", "", "", ""];
  obj.repeat = [false, false];
  return obj;
}

export const initialState = {
  title: "",
  timeSignature: [4, 4],
  tempo: 120,
  sheetData: {
    sections: [{ bars: [emptyBar(4)], chordsPerBar: 4 }]
  }
};

export const ContextProvider = ({ reducer, initialState, children }) => (
  <SheetContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </SheetContext.Provider>
);
