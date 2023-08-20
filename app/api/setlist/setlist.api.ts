import { SetlistProperties } from '@store/SetlistModule';
import { SheetProperties } from '@store/SheetModule';
import { dbAction } from '@utils/db.utils';
import { ObjectId } from 'mongodb';
import { sheetApi } from '../sheet';
import {
  SaveSetlistOrderPayload,
  SaveSetlistPayload,
  SaveSetlistTitlePayload,
  SetlistPayload,
  api,
} from '@utils/api.utils';

interface SetlistData extends Omit<SetlistProperties, 'sheets' | '_id'> {
  sheets: string[];
}

const loadSetlist = async (id: string): Promise<SetlistProperties> =>
  dbAction({
    action: async (dbClient) => {
      const setlistInstance = await dbClient
        .db(process.env.DB_NAME)
        .collection<SetlistData>('setlists')
        .findOne({ _id: new ObjectId(id) });

      if (!setlistInstance) throw 'Non-existent set list';

      const sheets: SheetProperties[] = [];

      for (const sheetId of setlistInstance.sheets) {
        if (!sheetId) continue;

        // use shared API so that a cached/revalidated data is fetched on sheet open
        const sheetData = await api.sheet.load(sheetId);

        if (!sheetData) continue;

        sheets.push(sheetData);
      }

      return {
        ...setlistInstance,
        sheets,
        _id: setlistInstance._id.toString(),
      };
    },
  });

const isTitleUpdate = (
  payload: SaveSetlistPayload,
): payload is SaveSetlistTitlePayload => 'title' in payload;

const isSetlistOrderUpdate = (
  payload: SaveSetlistPayload,
): payload is SaveSetlistOrderPayload => 'sheetIds' in payload;

const saveSetlist = async (id: string, payload: SaveSetlistPayload) =>
  dbAction({
    errorMsg: 'Updating setlist failed',
    action: async (dbClient) => {
      const setlistInstance = await dbClient
        .db(process.env.DB_NAME)
        .collection<SetlistData>('setlists')
        .updateOne(
          { _id: new ObjectId(id) },
          isTitleUpdate(payload)
            ? { $set: { title: payload.title } }
            : isSetlistOrderUpdate(payload)
            ? { $set: { sheets: payload.sheetIds } }
            : { $addToSet: { sheets: payload.sheetId } },
          { upsert: true },
        );

      // return the object identifier
      return setlistInstance.upsertedId?.toString() ?? id;
    },
  });

const createSetlist = async (setlistData: SetlistPayload) =>
  dbAction({
    errorMsg: 'Creating failed',
    action: async (dbClient) => {
      const setlistInstance = await dbClient
        .db(process.env.DB_NAME)
        .collection<SetlistData>('setlists')
        .updateOne(
          { _id: new ObjectId() },
          { $set: setlistData },
          { upsert: true },
        );

      // return the object identifier
      return setlistInstance.upsertedId?.toString();
    },
  });

const removeSheet = async (sheetId: string, setlistId: string) =>
  dbAction({
    action: async (dbClient) => {
      const id = new ObjectId(setlistId);

      await dbClient
        .db(process.env.DB_NAME)
        .collection<SetlistData>('setlists')
        .updateOne({ _id: new ObjectId(id) }, { $pull: { sheets: sheetId } });

      // return the object identifier
      return id.toString();
    },
    errorMsg: 'Removing failed',
  });

const setlistApi = {
  load: loadSetlist,
  save: saveSetlist,
  create: createSetlist,
  remove: removeSheet,
};

export default setlistApi;
