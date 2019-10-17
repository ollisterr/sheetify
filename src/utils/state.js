import React, { createContext, useReducer } from "react";

export const SheetContext = createContext();

export const reducer = (state, action) => {
  switch (action.type) {
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
  default:
    return state;
  }
};

export function emptyBar() {
  const obj = {};
  obj.bar = ["", "", "", ""];
  obj.repeat = [false, false];
  obj.goal = "";
  return obj;
}

export const initialState = {
  timeSignature: [4, 4],
  sheetData: {
    sections: [{ bars: [emptyBar()] }]
  }
};

export const ContextProvider = ({ reducer, initialState, children }) => (
  <SheetContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </SheetContext.Provider>
);
