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
  save: (data: SheetModule, id?: string) =>
    apiClient.post<string>('/save', { data, id }),
  load: (id: string) => apiClient.get<SheetProperties>('/load', { id }),
  addToSetlist: (sheetId: string, setlistId?: string) =>
    apiClient.post<string>('/add-to-setlist', { sheetId, setlistId }),
  loadSetlist: (setlistId: string) =>
    apiClient.get<SetlistProperties>('/setlist', { id: setlistId }),
  removeFromSetlist: (sheetId: string, setlistId: string) =>
    apiClient.post<string>('/remove-sheet', { sheetId, setlistId }),
};
