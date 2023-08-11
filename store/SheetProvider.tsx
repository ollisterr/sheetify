import { ReactNode, createContext, useContext, useState } from 'react';

import { useInitSheet } from '.';
import { SheetModule, SheetProperties } from './SheetModule';

const SheetContext = createContext<SheetModule | null>(null);

export const SheetProvider = ({
  children,
  sheetData,
}: {
  children: ReactNode;
  sheetData: SheetProperties;
}) => {
  const [sheet] = useState(useInitSheet(sheetData));

  return (
    <SheetContext.Provider value={sheet}>{children}</SheetContext.Provider>
  );
};

export const useSheet = () => {
  const props = useContext(SheetContext);

  if (!props) throw 'useSheet was used outside SheetProvider';

  return props;
};
