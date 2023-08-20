import { SheetProperties } from '@store/SheetModule';
import { dbAction } from '@utils/db.utils';
import { ObjectId } from 'mongodb';

export const load = async (id: string) =>
  dbAction({
    action: async (dbClient) => {
      if (!id) throw 'No sheet ID given';

      const sheetInstance = await dbClient
        .db(process.env.DB_NAME)
        .collection('sheets')
        .findOne<SheetProperties>({ _id: new ObjectId(id) });

      if (!sheetInstance) throw `Invalid sheet ID: ${id}`;

      return { ...sheetInstance, _id: sheetInstance._id.toString() };
    },
  });

export type SheetData = Omit<SheetProperties, '_id'>;
export type SavePayload = Omit<SheetProperties, 'id'> & { id?: string };

export const save = async ({ id, ...data }: SavePayload) =>
  dbAction({
    action: async (dbClient) => {
      const sheetInstance = await dbClient
        .db(process.env.DB_NAME)
        .collection<SheetData>('sheets')
        .updateOne({ _id: new ObjectId(id) }, { $set: data }, { upsert: true });

      if (!id) {
        // return the object identifier
        return sheetInstance.upsertedId?.toString();
      } else {
        return id;
      }
    },
    errorMsg: 'Saving failed',
  });
