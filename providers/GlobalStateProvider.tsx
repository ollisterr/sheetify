import { ReactNode, createContext, useContext, useMemo, useState } from 'react';

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
}: {
  children: ReactNode | ((state: GlobalStateContext) => ReactNode);
}) => {
  const [readMode, setReadMode] = useState(true);
  const [zoom, setZoom] = useState(1);

  const globalState = useMemo<GlobalStateContext>(() => {
    return {
      readMode,
      setReadMode,
      zoom,
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
