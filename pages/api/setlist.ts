import { NextApiHandler } from 'next';
import { ObjectId } from 'mongodb';
import { SetlistProperties } from '@store/SetlistModule';
import { SheetProperties } from '@store/SheetModule';
import { loadSheet } from './load';
import { MongoDbInstance } from 'types';
import { dbClient } from '@utils/db.utils';

export interface SetlistData
  extends Omit<SetlistProperties, 'sheets'>,
    MongoDbInstance {
  sheets: string[];
}

export const loadSetlist = async (id: string): Promise<SetlistProperties> => {
  try {
    await dbClient.connect();

    const setlistInstance = await dbClient
      .db(process.env.DB_NAME)
      .collection('setlists')
      .findOne<SetlistData>({ _id: new ObjectId(id) });

    if (!setlistInstance) throw 'Non existent set list';

    const sheets: SheetProperties[] = [];

    for (const sheetId of setlistInstance.sheets) {
      const sheetData = await loadSheet(sheetId);

      if (!sheetData) continue;

      sheets.push(sheetData);
    }

    // omit _id
    const { _id, ...setlist } = setlistInstance;

    return { ...setlist, sheets, id: _id.toString() };
  } catch (err) {
    console.error(err);
    throw `Invalid setlist ID: ${id}`;
  } finally {
    await dbClient.close();
  }
};

const handler: NextApiHandler = async (req, res) => {
  try {
    const setlistId = req.query.id;

    if (!setlistId || Array.isArray(setlistId)) {
      return res.status(400).send('Bad request');
    }

    const data = await loadSetlist(setlistId);

    return res
      .status(200)
      .setHeader('content-type', 'application/json')
      .json(data);
  } catch (err: any) {
    console.error(err);

    return res.status(500).send(err.message);
  }
};

export default handler;
