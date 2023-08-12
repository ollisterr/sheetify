import axios from 'axios';
import { SheetModule, SheetProperties } from '../store/SheetModule';

export const apiClient = axios.create({
  baseURL:
    process.env.NODE_ENV !== 'production'
      ? 'http://localhost:3000/api'
      : '/api',
});

export const api = {
  save: (data: SheetModule, id?: string) =>
    apiClient.post<{ id: string }>('/save', { data, id }),
  load: (id: string) =>
    apiClient.get<SheetProperties>('/load', { params: { id } }),
};
