import { api } from '@utils/api.utils';

export const getSetlist = async (setlistId: string | undefined) => {
  if (!setlistId) return undefined;

  const setlistData = await api.setlist.load(setlistId);

  return setlistData;
};
