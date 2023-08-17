import { SheetModule, SheetProperties } from '../store/SheetModule';
import { SetlistProperties } from '@store/SetlistModule';

export const apiClient = {
  post: <ResponseT = any>(url: string, payload: object) => {
    return fetch('/api' + url, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json() as ResponseT);
  },
  get: <ResponseT = any>(url: string, payload: Record<string, unknown>) => {
    const urlParams = new URLSearchParams();

    for (const key in payload) {
      const value = payload[key];

      if (!value) continue;

      urlParams.set(key, value.toString());
    }

    return fetch(`/api${url}?${urlParams.toString()}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json() as ResponseT);
  },
};

export const api = {
  save: ({ id, ...data }: SheetModule) =>
    apiClient.post<string>('/save', { id: id || undefined, ...data }),
  load: (id: string) => apiClient.get<SheetProperties>('/load', { id }),
  addToSetlist: (sheetId: string, setlistId?: string) =>
    apiClient.post<string>('/add-to-setlist', { sheetId, setlistId }),
  loadSetlist: (setlistId: string) =>
    apiClient.get<SetlistProperties>('/setlist', { id: setlistId }),
  orderSetlist: (setlistId: string, sheetIds: string[]) =>
    apiClient.post<string>('/setlist', { setlistId, sheetIds }),
  removeFromSetlist: (sheetId: string, setlistId: string) =>
    apiClient.post<string>('/remove-sheet', { sheetId, setlistId }),
};
