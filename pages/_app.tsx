import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';

import theme from '../styles/theme';
import { SheetProvider } from '../store/SheetProvider';
import '../styles/index.css';
import { SheetProperties } from '../store/SheetModule';

const App = ({
  Component,
  pageProps,
}: AppProps<{ sheet: SheetProperties }>) => {
  return (
    <SheetProvider sheetData={pageProps.sheet}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </SheetProvider>
  );
};

export default App;
