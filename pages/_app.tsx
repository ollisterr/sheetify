import type { AppProps as NextAppProps } from 'next/app';

import { SheetProvider } from '../store/SheetProvider';
import '../styles/index.css';
import { GlobalStateProvider } from 'providers/GlobalStateProvider';
import { ThemeProvider } from 'providers/ThemeProvider';
import { SheetPageProps } from './[sheetId]';
import { SetlistPageProps } from './setlist/[setlistId]';

export interface AppProps {
  readMode: boolean;
}

type RouteProps = AppProps & Partial<SetlistPageProps> & SheetPageProps;

const App = ({ Component, pageProps }: NextAppProps<RouteProps>) => {
  return (
    <SheetProvider sheetData={pageProps.sheet} setlistData={pageProps.setlist}>
      <GlobalStateProvider readMode={pageProps.readMode}>
        <ThemeProvider>
          <Component {...pageProps} />
        </ThemeProvider>
      </GlobalStateProvider>
    </SheetProvider>
  );
};

export default App;
