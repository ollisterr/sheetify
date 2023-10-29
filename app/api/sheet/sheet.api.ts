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
        .findOne<SheetProperties & { _id: ObjectId }>({
          _id: new ObjectId(id),
        });

      if (!sheetInstance) throw `Invalid sheet ID: ${id}`;

      const { _id: sheetId, ...sheetData } = sheetInstance;
      return { ...sheetData, id: sheetId.toString() };
    },
  });

export type SavePayload = Omit<SheetProperties, 'id'> & { id?: string };

export const save = async ({ id, ...data }: SavePayload) =>
  dbAction({
    action: async (dbClient) => {
      // update existing sheet
      if (id) {
        await dbClient
          .db(process.env.DB_NAME)
          .collection<SheetProperties>('sheets')
          .updateOne(
            { _id: new ObjectId(id) },
            { $set: data },
            { upsert: true },
          );

        return id;
      }
      // create new sheet
      else {
        const sheetInstance = await dbClient
          .db(process.env.DB_NAME)
          .collection<Omit<SheetProperties, 'id'>>('sheets')
          .insertOne(data);

        return sheetInstance.insertedId.toString();
      }
    },
    errorMsg: 'Saving failed',
  });
