import axios from 'axios';
import { SheetModule, SheetProperties } from '../store/SheetModule';
import { SetlistProperties } from '@store/SetlistModule';

export const apiClient = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_NODE_ENV !== 'production'
      ? 'http://localhost:3000/api'
      : '/api',
});

export const api = {
  save: (data: SheetModule, id?: string) =>
    apiClient.post<string>('/save', { data, id }),
  load: (id: string) =>
    apiClient.get<SheetProperties>('/load', { params: { id } }),
  addToSetlist: (sheetId: string, setlistId?: string) =>
    apiClient.post<string>('/add-to-setlist', { sheetId, setlistId }),
  loadSetlist: (setlistId: string) =>
    apiClient.get<SetlistProperties>('/setlist', { params: { id: setlistId } }),
};
