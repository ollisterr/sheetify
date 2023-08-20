import { SheetModule, SheetProperties } from '../store/SheetModule';
import { SetlistProperties } from '@store/SetlistModule';

export const baseUrl = process.env.NEXT_PUBLIC_HOST;

export const apiClient = {
  post: <ResponseT = any>(url: string, payload?: object) => {
    return fetch(baseUrl + '/api' + url, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json() as ResponseT);
  },
  get: <ResponseT = any>(url: string, payload?: Record<string, unknown>) => {
    const urlParams = new URLSearchParams();

    for (const key in payload) {
      const value = payload[key];

      if (!value) continue;

      urlParams.set(key, value.toString());
    }

    return fetch(baseUrl + `/api${url}?${urlParams.toString()}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json() as ResponseT);
  },
  delete: <ResponseT = any>(url: string, payload?: object) => {
    return fetch(baseUrl + '/api' + url, {
      method: 'DELETE',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },
};

export type SaveSetlistOrderPayload = { sheetIds: string[] };
export type SaveSetlistTitlePayload = { title: string };
export type SaveSheetToSetlistPayload = { sheetId: string };

export type SaveSetlistPayload =
  | SaveSheetToSetlistPayload
  | SaveSetlistTitlePayload
  | SaveSetlistOrderPayload;

export type SetlistPayload = Omit<SetlistProperties, 'sheets' | '_id'> & {
  sheets: string[];
};

export const api = {
  sheet: {
    load: (id: string) => apiClient.get<SheetProperties>(`/sheet/${id}`),
    save: ({ id, ...data }: SheetModule) =>
      apiClient.post<string>(`/sheet/${id}`, data),
  },
  setlist: {
    create: (payload: SetlistPayload) => apiClient.post('/setlist', payload),
    save: (id: string, payload: SaveSetlistPayload) =>
      apiClient.post<string>(`/setlist/${id}`, payload),
    load: (setlistId: string) =>
      apiClient.get<SetlistProperties>(`/setlist/${setlistId}`),
    remove: (sheetId: string, setlistId: string) =>
      apiClient.delete<string>('/setlist/remove', { sheetId, setlistId }),
  },
};
