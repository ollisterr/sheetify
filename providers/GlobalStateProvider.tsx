import { isEditPathname, trimEditPathname } from '@utils/common.utils';
import { useRouter } from 'next/router';
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

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
}: {
  children: ReactNode | ((state: GlobalStateContext) => ReactNode);
  readMode?: boolean;
}) => {
  const router = useRouter();

  const isSetlistPath = !!router.query.setlistId;
  const isSheetPath = !!router.query.sheetId;

  const [readMode, setReadMode] = useState(
    readModeProp ??
      ((isEditPathname(router.pathname) || !isSheetPath) && !isSetlistPath),
  );
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    // update readmode on route change
    setReadMode(
      readModeProp ?? (isEditPathname(router.pathname) && !isSetlistPath),
    );
  }, [readModeProp, isEditPathname(router.pathname) && !isSetlistPath]);

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
