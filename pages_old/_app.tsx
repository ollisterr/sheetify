import type { AppProps as NextAppProps } from 'next/app';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';

import { SheetProvider } from '../store/SheetProvider';
import '../styles/index.css';
import { GlobalStateProvider } from 'providers/GlobalStateProvider';
import { ThemeProvider } from 'providers/ThemeProvider';
import { SheetPageProps } from './[sheetId]';
import { SetlistPageProps } from './setlist/[setlistId]';
import { PropsWithChildren } from 'react';

export interface AppProps {
  readMode: boolean;
}

type RouteProps = AppProps & Partial<SetlistPageProps> & SheetPageProps;

const App = ({ children }: PropsWithChildren<{}>) => {
  return (
    <GlobalStateProvider readMode={false}>
      <ThemeProvider>{children}</ThemeProvider>
    </GlobalStateProvider>
  );
};

export default App;
