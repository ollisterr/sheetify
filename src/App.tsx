import React from "react";
import { ThemeProvider } from "styled-components";

import "./index.css";
import ComposePage from "./pages/ComposePage";
import theme from "./styles/theme";

const App: React.FC = () => (
  <ThemeProvider theme={theme}>
    <div id='App'>
      <ComposePage />
    </div>
  </ThemeProvider>
);

export default App;