import { isAxiosError } from 'axios';
import { NextApiHandler } from 'next';

import { ObjectId } from 'mongodb';
import { SetlistData } from './setlist';
import { dbAction, dbClient } from '@utils/db.utils';

const addToSetlist = async (sheetId: string, setlistId?: string) =>
  dbAction({
    errorMsg: 'Removing failed',
    action: async (dbClient) => {
      const setlistInstance = await dbClient
        .db(process.env.DB_NAME)
        .collection<SetlistData>('setlists')
        .updateOne(
          { _id: new ObjectId(setlistId) },
          { $addToSet: { sheets: sheetId } },
          { upsert: true },
        );

      // return the object identifier
      return setlistInstance.upsertedId?.toString() ?? setlistId;
    },
  });

const handler: NextApiHandler = async (req, res) => {
  try {
    const { sheetId, setlistId } = req.body;
    const insertedId = await addToSetlist(sheetId, setlistId);

    if (!insertedId) return res.status(400).send('Non-existent setlist');

    return res.status(200).json(insertedId);
  } catch (err) {
    console.error(err);

    if (isAxiosError(err)) {
      return res.status(500).send(err.message);
    }

    return res.status(500);
  }
};

export default handler;
