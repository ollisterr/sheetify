import { isAxiosError } from 'axios';
import { NextApiHandler } from 'next';
import { SheetProperties } from '../../store/SheetModule';

import { MongoClient, ObjectId } from 'mongodb';
import { dbAction } from '@utils/db.utils';

export type SheetData = Omit<SheetProperties, '_id'>;

export type SavePayload = Omit<SheetProperties, 'id'> & { id?: string };

const postData = async ({ id, ...data }: SavePayload) =>
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

const handler: NextApiHandler = async (req, res) => {
  try {
    const data = req.body;
    const insertedId = await postData(data);

    return res.status(200).json(insertedId);
  } catch (err) {
    console.error(err);

    if (isAxiosError(err)) {
      return res.status(500).send(err.message);
    }

    return res.status(500).send('Internal error');
  }
};

export default handler;
