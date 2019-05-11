import React, { useContext, useEffect } from "react";
import "./css/App.css";
import { ContextProvider, SheetContext, reducer, initialState } from "./state.js";
import SheetSpecification from "./specs.js";
import SheetBody from "./sheetbody.js";
import "html2canvas";

const App = () => {
	console.log("Running");
	return (
		<div className="App">
			<ContextProvider initialState={initialState} reducer={reducer}>
				<SheetSpecification />
				<SheetBody />
			</ContextProvider>
		</div>
	);
};

/*

*/
export default App;