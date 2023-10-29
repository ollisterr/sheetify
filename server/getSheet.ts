import { api } from '@utils/api.utils';

export const getSheet = async (sheetId: string | undefined) => {
  if (!sheetId) return undefined;

  const sheetData = await api.sheet.load(sheetId);

  if (!sheetData) return undefined;

  return sheetData;
};
