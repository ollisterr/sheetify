import { isEditPathname, trimEditPathname } from '@utils/common.utils';
import { useRouter } from 'next/router';
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
  readMode: readModeProp,
}: {
  children: ReactNode | ((state: GlobalStateContext) => ReactNode);
  readMode?: boolean;
}) => {
  const router = useRouter();

  const [readMode, setReadMode] = useState(
    readModeProp ?? isEditPathname(router.pathname),
  );
  const [zoom, setZoom] = useState(1);

  const globalState = useMemo<GlobalStateContext>(() => {
    return {
      readMode,
      setReadMode: (x: boolean) => {
        router.replace(
          trimEditPathname(router.asPath) + (!x ? '/edit' : ''),
          undefined,
          { shallow: true },
        );
        setReadMode(x);
      },
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
