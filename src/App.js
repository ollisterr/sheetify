import React from "react";
import "./css/App.scss";
import { ContextProvider, reducer, initialState } from "./utils/state.js";
import SheetSpecification from "./components/Specs.js";
import SheetBody from "./components/SheetBody.js";

const App = () => {
  return (
    <div id="App">
      <ContextProvider initialState={initialState} reducer={reducer}>
        <SheetSpecification />
        <SheetBody />
      </ContextProvider>
    </div>
  );
};

export default App;
