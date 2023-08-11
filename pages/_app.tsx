import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';

import theme from '../styles/theme';
import { SheetProvider } from '../store/SheetProvider';
import '../styles/index.css';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <SheetProvider sheetData={pageProps}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </SheetProvider>
  );
};

export default App;
