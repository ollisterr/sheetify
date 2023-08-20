import { isSSR } from './common.utils';

export enum StorageKey {
  ZOOM = 'sheet-zoom',
}

const setItem = (field: StorageKey, value: string) => {
  if (isSSR) return;

  window.localStorage.setItem(field, value);
};

const getItem = (field: StorageKey) => {
  if (isSSR) return;

  return window.localStorage.getItem(field) ?? undefined;
};

export const store = {
  setItem,
  getItem,
};
