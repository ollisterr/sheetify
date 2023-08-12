import type { AppProps } from 'next/app';

import { SheetProvider } from '../store/SheetProvider';
import '../styles/index.css';
import { SheetProperties } from '../store/SheetModule';
import { GlobalStateProvider } from 'providers/GlobalStateProvider';
import { ThemeProvider } from 'providers/ThemeProvider';

const App = ({
  Component,
  pageProps,
}: AppProps<{ sheet: SheetProperties }>) => {
  return (
    <SheetProvider sheetData={pageProps.sheet}>
      <GlobalStateProvider>
        <ThemeProvider>
          <Component {...pageProps} />
        </ThemeProvider>
      </GlobalStateProvider>
    </SheetProvider>
  );
};

export default App;
