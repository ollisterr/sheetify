import React from "react";
import "./css/App.scss";
import { ContextProvider, reducer, initialState } from "./utils/state.js";
// import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ComposePage from "./components/ComposePage.js";

const App = () => {
  return (
    <div id='App'>
      <ContextProvider initialState={initialState} reducer={reducer}>
        <ComposePage />
      </ContextProvider>
    </div>
  );
};

export default App;

/*
<Router>
    <Route path='/' component={ComposePage}>
    <SheetSpecification />
    <SheetBody />
    </Route>
</Router>
*/
