import { SheetProvider } from '../store/SheetProvider';
import { GlobalStateProvider } from 'providers/GlobalStateProvider';
import { ThemeProvider } from 'providers/ThemeProvider';

import '../styles/index.css';
import { AppPageProps } from 'types';
import { PropsWithChildren } from 'react';

const App = ({ children, params }: PropsWithChildren<AppPageProps>) => {
  return (
    <SheetProvider {...params}>
      <GlobalStateProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </GlobalStateProvider>
    </SheetProvider>
  );
};

export default App;
