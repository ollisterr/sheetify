import { isAxiosError } from 'axios';
import { NextApiHandler } from 'next';

import { ObjectId } from 'mongodb';
import { SetlistData } from './load';
import { dbAction, dbClient } from '@utils/db.utils';
import {
  SaveSetlistOrderPayload,
  SaveSetlistPayload,
  SaveSetlistTitlePayload,
} from '@utils/api.utils';

const isTitleUpdate = (
  payload: SaveSetlistPayload,
): payload is SaveSetlistTitlePayload => 'title' in payload;

const isSetlistOrderUpdate = (
  payload: SaveSetlistPayload,
): payload is SaveSetlistOrderPayload => 'sheetIds' in payload;

const saveSetlist = async (payload: SaveSetlistPayload) =>
  dbAction({
    errorMsg: 'Updating setlist failed',
    action: async (dbClient) => {
      const setlistInstance = await dbClient
        .db(process.env.DB_NAME)
        .collection<SetlistData>('setlists')
        .updateOne(
          { _id: new ObjectId(payload.id) },
          isTitleUpdate(payload)
            ? { $set: { title: payload.title } }
            : isSetlistOrderUpdate(payload)
            ? { $set: { sheets: payload.sheetIds } }
            : { $addToSet: { sheets: payload.sheetId } },
          { upsert: true },
        );

      // return the object identifier
      return setlistInstance.upsertedId?.toString() ?? payload.id;
    },
  });

const handler: NextApiHandler = async (req, res) => {
  try {
    const insertedId = await saveSetlist(req.body);

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
