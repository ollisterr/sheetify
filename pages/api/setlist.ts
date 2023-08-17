import { NextApiHandler } from 'next';
import { ObjectId } from 'mongodb';
import { SetlistProperties } from '@store/SetlistModule';
import { SheetProperties } from '@store/SheetModule';
import { loadSheet } from './load';
import { dbAction } from '@utils/db.utils';

export interface SetlistData extends Omit<SetlistProperties, 'sheets' | '_id'> {
  sheets: string[];
}

export const loadSetlist = async (id: string): Promise<SetlistProperties> =>
  dbAction({
    action: async (dbClient) => {
      const setlistInstance = await dbClient
        .db(process.env.DB_NAME)
        .collection<SetlistData>('setlists')
        .findOne({ _id: new ObjectId(id) });

      if (!setlistInstance) throw 'Non existent set list';

      const sheets: SheetProperties[] = [];

      for (const sheetId of setlistInstance.sheets) {
        const sheetData = await loadSheet(sheetId);

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

export const orderSetlist = (id: string, sheetIds: string[]) =>
  dbAction({
    errorMsg: 'Invalid data',
    action: async (dbClient) => {
      console.log('Updating', id, sheetIds);

      const setlistInstance = await dbClient
        .db(process.env.DB_NAME)
        .collection<SetlistData>('setlists')
        .updateOne({ _id: new ObjectId(id) }, { $set: { sheets: sheetIds } });

      return id;
    },
  });

const handler: NextApiHandler = async (req, res) => {
  try {
    if (req.method === 'GET') {
      const setlistId = req.query.id;

      if (!setlistId || Array.isArray(setlistId)) {
        return res.status(400).send('Bad request');
      }

      const data = await loadSetlist(setlistId);

      return res
        .status(200)
        .setHeader('content-type', 'application/json')
        .json(data);
    } else if (req.method === 'POST') {
      const { setlistId, sheetIds } = req.body;

      const data = await orderSetlist(setlistId, sheetIds);

      if (!data) {
        return res.status(400).send('Non-existent setlist');
      }

      return res
        .status(200)
        .setHeader('content-type', 'application/json')
        .json(data);
    }
  } catch (err: any) {
    console.error(err);

    return res.status(500).send(err.message);
  }
};

export default handler;
