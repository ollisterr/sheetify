'use client';

import { isEditPathname } from '@utils/common.utils';
import { useRouter, usePathname } from 'next/navigation';
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { ProviderProps } from './Providers';

interface GlobalStateContext {
  readMode: boolean;
  setReadMode(x: boolean): void;
  zoom: number;
  zoomOut: () => void;
  zoomIn: () => void;
  resetZoom: () => void;
}

const GlobalStateContext = createContext<GlobalStateContext | null>(null);

export const GlobalStateProvider = ({
  children,
  readMode: readModeProp,
  setlistId,
  sheetId,
}: ProviderProps & {
  children: ReactNode | ((props: GlobalStateContext) => ReactNode);
}) => {
  const router = useRouter();
  const pathname = usePathname();

  const isSetlistPath = !!setlistId;
  const isSheetPath = !!sheetId;

  const [readMode, setReadMode] = useState(
    readModeProp ??
      ((isEditPathname(pathname) || !isSheetPath) && !isSetlistPath),
  );
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    // update readmode on route change
    setReadMode(readModeProp ?? (isEditPathname(pathname) && !isSetlistPath));
  }, [readModeProp, isEditPathname(pathname) && !isSetlistPath]);

  const globalState = useMemo<GlobalStateContext>(() => {
    return {
      readMode,
      setReadMode,
      // reset zoom in edit mode
      zoom: readMode ? zoom : 1,
      zoomOut: () => setZoom((x) => x * 0.75),
      zoomIn: () => setZoom((x) => x / 0.75),
      resetZoom: () => setZoom(1),
    };
  }, [readMode, zoom]);

  return (
    <GlobalStateContext.Provider value={globalState}>
      {typeof children === 'function' ? children(globalState) : children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => {
  const props = useContext(GlobalStateContext);

  if (!props) throw 'useGlobalState was used outside GlobalStateProvider';

  return props;
};
