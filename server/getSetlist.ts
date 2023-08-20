import { api } from '@utils/api.utils';

export const getSetlist = async (setlistId: string | undefined) => {
  if (!setlistId) return undefined;

  const setlistData = await api.loadSetlist(setlistId);
  console.log('OPENING SETLIST', setlistData);

  return setlistData;
};
