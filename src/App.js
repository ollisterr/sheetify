import React from "react";
import "./css/App.scss";
import { ContextProvider, reducer, initialState } from "./store.js";
import ComposePage from "./components/ComposePage.js";

const App = () => (
  <div id='App'>
    <ContextProvider initialState={initialState} reducer={reducer}>
      <ComposePage />
    </ContextProvider>
  </div>
);

export default App;
