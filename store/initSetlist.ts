import { enableStaticRendering } from 'mobx-react-lite';

import { isSSR } from '../utils/common.utils';
import { SetlistModule, SetlistProperties } from './SetlistModule';

// we need to enable static rendering to
// prevent rerender on server side and leaking memory
// enable static rendering ONLY on server
enableStaticRendering(isSSR);

let setlist: SetlistModule;

const initSetlist = (setlistData?: SetlistProperties) => {
  let store: SetlistModule | undefined;

  // hydrate to store if receive initial data
  if (setlistData) store = new SetlistModule(setlistData);

  // Create a store on every server request
  if (isSSR) {
    return store;
  } else {
    // Otherwise it's client, remember this store and return
    if (!setlist && store) setlist = store;

    return setlist;
  }
};

export const useInitSetlist = (setlist?: SetlistProperties) => {
  return initSetlist(setlist);
};
