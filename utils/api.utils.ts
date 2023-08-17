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

export type SaveSetlistOrderPayload = { id: string; sheetIds: string[] };
export type SaveSetlistTitlePayload = { id: string; title: string };
export type SaveSheetToSetlistPayload = { id?: string; sheetId: string };

export type SaveSetlistPayload =
  | SaveSheetToSetlistPayload
  | SaveSetlistTitlePayload
  | SaveSetlistOrderPayload;

export const api = {
  save: ({ id, ...data }: SheetModule) =>
    apiClient.post<string>('/save', { id: id || undefined, ...data }),
  load: (id: string) => apiClient.get<SheetProperties>('/load', { id }),
  saveSetlist: (payload: SaveSetlistPayload) =>
    apiClient.post<string>('/setlist/save', payload),
  loadSetlist: (setlistId: string) =>
    apiClient.get<SetlistProperties>('/setlist/load', { id: setlistId }),
  removeFromSetlist: (sheetId: string, setlistId: string) =>
    apiClient.post<string>('/setlist/remove', { sheetId, setlistId }),
};
