import React, {createContext, useReducer} from "react";

export const SheetContext = createContext();

export const reducer = (state, action) => {
	switch (action.type) {
	case "setTimeSignature":
		return {
			...state,
			timeSignature: action.newTimeSignature
		};
	case "writeSheet":
		return {
			...state,
			sheetData: action.newSheetData
		};
          
	default:
		return state;
	}
};

export const initialState = {
	timeSignature: [4, 4],
	sheetData: [[["", "", "", ""]]]
};

export const ContextProvider = ({children}) => (
	<SheetContext.Provider value={useReducer(reducer, initialState)}>
		{children}
	</SheetContext.Provider>
);