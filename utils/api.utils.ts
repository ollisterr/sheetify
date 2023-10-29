import { SheetModule, SheetProperties } from '../store/SheetModule';
import { SetlistProperties } from '@store/SetlistModule';

export const baseUrl = process.env.NEXT_PUBLIC_HOST;

export const createSheetTag = (sheetId: string) => `sheet-${sheetId}`;
export const createSetlistTag = (setlistId: string) => `setlist-${setlistId}`;

type CacheOptions = {
  tags?: string[];
  cache?: boolean;
};

const getCacheOptions = ({
  tags,
  cache = true,
}: CacheOptions): RequestInit => ({
  next: {
    tags,
    revalidate: cache ? 3600 : undefined,
  },
  cache: !cache ? 'no-store' : undefined,
});

export const apiClient = {
  post: <ResponseT>(
    url: string,
    payload?: object,
    cacheOptions: CacheOptions = {},
  ) => {
    return fetch(baseUrl + '/api' + url, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
      },
      ...getCacheOptions(cacheOptions),
    }).then((res) => res.json() as ResponseT);
  },
  get: <ResponseT>(
    url: string,
    payload?: Record<string, unknown>,
    cacheOptions: CacheOptions = {},
  ) => {
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
      ...getCacheOptions(cacheOptions),
    }).then((res) => res.json() as ResponseT);
  },
  delete: <ResponseT>(
    url: string,
    payload?: object,
    cacheOptions: CacheOptions = {},
  ) => {
    return fetch(baseUrl + '/api' + url, {
      method: 'DELETE',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
      },
      ...getCacheOptions(cacheOptions),
    }).then((res) => res.json() as ResponseT);
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
    load: (id: string) =>
      apiClient.get<SheetProperties>(`/sheet/${id}`, undefined, {
        tags: [createSheetTag(id)],
      }),
    save: (data: Omit<SheetModule, 'id'> & { id: string }) =>
      apiClient.post<string>(`/sheet/${data.id}`, data, {
        tags: [createSheetTag(data.id)],
      }),
    create: (data: Omit<SheetModule, 'id'>) =>
      apiClient.post<string>('/sheet', data),
  },
  setlist: {
    create: (payload: SetlistPayload) => apiClient.post('/setlist', payload),
    save: (id: string, payload: SaveSetlistPayload) =>
      apiClient.post<string>(`/setlist/${id}`, payload, {
        tags: [createSetlistTag(id)],
      }),
    load: (setlistId: string) =>
      apiClient.get<SetlistProperties>(`/setlist/${setlistId}`, undefined, {
        tags: [createSetlistTag(setlistId)],
      }),
    remove: (sheetId: string, setlistId: string) =>
      apiClient.delete<string>(
        `/setlist/${setlistId}`,
        { sheetId },
        { tags: [createSetlistTag(setlistId)] },
      ),
  },
};
