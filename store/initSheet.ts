import { enableStaticRendering } from 'mobx-react-lite';
import { SheetModule, SheetProperties } from './SheetModule';
import { isSSR } from '../utils/common.utils';

// we need to enable static rendering for prevent
// rerender on server side and leaking memory
// enable static rendering ONLY on server
enableStaticRendering(isSSR);

let sheet: SheetModule;

export const initSheet = (sheetData?: SheetProperties) => {
  const store = new SheetModule();

  // hydrate to store if receive initial data
  if (sheetData) store.read(sheetData);

  // Create a store on every server request
  if (isSSR) {
    return store;
  } else {
    // Otherwise it's client, remember this store and return
    if (!sheet) sheet = store;

    return sheet;
  }
};

export type Sheet = typeof sheet;
