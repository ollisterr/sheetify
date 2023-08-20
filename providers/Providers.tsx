import { ReactNode } from 'react';

import { getSetlist } from 'server/getSetlist';
import { getSheet } from 'server/getSheet';

import { SheetProvider } from '../store/SheetProvider';
import { GlobalStateProvider } from './GlobalStateProvider';
import { ThemeProvider } from './ThemeProvider';

export interface ProviderProps {
  readMode?: boolean;
  children: ReactNode;
  setlistId?: string;
  sheetId?: string;
}

export const Providers = async ({
  children,
  readMode,
  setlistId,
  sheetId,
}: ProviderProps) => {
  console.log({ setlistId, sheetId });
  const [sheetData, setlistData] = await Promise.all([
    getSheet(sheetId),
    getSetlist(setlistId),
  ]);

  console.log('SELIST DATA', setlistId, setlistData);

  return (
    <SheetProvider sheetData={sheetData} setlistData={setlistData}>
      <GlobalStateProvider readMode={readMode}>
        <ThemeProvider>{children}</ThemeProvider>
      </GlobalStateProvider>
    </SheetProvider>
  );
};
