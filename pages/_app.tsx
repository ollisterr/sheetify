import type { AppProps } from 'next/app';

import { SheetProvider } from '../store/SheetProvider';
import '../styles/index.css';
import { SheetProperties } from '../store/SheetModule';
import { GlobalStateProvider } from 'providers/GlobalStateProvider';
import { ThemeProvider } from 'providers/ThemeProvider';
import { SetlistProperties } from '@store/SetlistModule';

const App = ({
  Component,
  pageProps,
}: AppProps<{ sheet: SheetProperties; setlist: SetlistProperties }>) => {
  return (
    <SheetProvider sheetData={pageProps.sheet} setlistData={pageProps.setlist}>
      <GlobalStateProvider>
        <ThemeProvider>
          <Component {...pageProps} />
        </ThemeProvider>
      </GlobalStateProvider>
    </SheetProvider>
  );
};

export default App;
