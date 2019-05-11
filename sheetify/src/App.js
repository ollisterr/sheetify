import React from "react";
import "./css/App.css";
import { ContextProvider } from "./state.js";
import SheetSpecification from "./specs.js";
import SheetBody from "./sheetbody.js";
import "html2canvas";

const App = () => {
	return (
		<div className="App">
			<ContextProvider>
				<SheetSpecification />
				<SheetBody />
			</ContextProvider>
		</div>
	);
};

export default App;