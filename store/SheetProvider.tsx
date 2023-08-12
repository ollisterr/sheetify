import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import { useInitSheet } from './initSheet';
import { SheetModule, SheetProperties } from './SheetModule';
import { SetlistModule, SetlistProperties } from './SetlistModule';
import { useInitSetlist } from './initSetlist';

const SheetContext = createContext<{
  sheet: SheetModule;
  setSheet: (sheet: SheetModule) => void;
  setlist: SetlistModule | undefined;
} | null>(null);

export const SheetProvider = ({
  children,
  sheetData,
  setlistData,
}: {
  children: ReactNode;
  sheetData: SheetProperties;
  setlistData: SetlistProperties;
}) => {
  const setlist = useInitSetlist(setlistData);
  const [sheet, setSheet] = useState(
    useInitSheet(setlistData?.sheets[0] ?? sheetData),
  );

  return (
    <SheetContext.Provider
      value={{ sheet: setlist?.sheet ?? sheet, setlist, setSheet }}
    >
      {children}
    </SheetContext.Provider>
  );
};

export const useSheet = () => {
  const props = useContext(SheetContext);

  if (!props) throw 'useSheet was used outside SheetProvider';

  return props.sheet;
};

export const useSetSheet = () => {
  const props = useContext(SheetContext);

  if (!props) throw 'useSheet was used outside SheetProvider';

  return props.setSheet;
};

export const useSetlist = () => {
  const props = useContext(SheetContext);

  if (!props) throw 'useSetlist was used outside SheetProvider';

  return props.setlist;
};
