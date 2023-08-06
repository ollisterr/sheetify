import React from 'react';
import { ThemeProvider } from 'styled-components';
import { HelmetProvider } from 'react-helmet-async';

import './index.css';
import ComposePage from './pages/ComposePage';
import theme from './styles/theme';

const App: React.FC = () => (
  <HelmetProvider>
    <ThemeProvider theme={theme}>
      <ComposePage />
    </ThemeProvider>
  </HelmetProvider>
);

export default App;
