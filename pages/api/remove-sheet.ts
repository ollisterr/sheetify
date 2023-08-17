import { isAxiosError } from 'axios';
import { NextApiHandler } from 'next';

import { ObjectId } from 'mongodb';
import { SetlistData } from './setlist';
import { dbClient } from '@utils/db.utils';

const removeSheet = async (sheetId: string, setlistId: string) => {
  try {
    await dbClient.connect();

    const id = new ObjectId(setlistId);

    await dbClient
      .db(process.env.DB_NAME)
      .collection<SetlistData>('setlists')
      .updateOne({ _id: new ObjectId(id) }, { $pull: { sheets: sheetId } });

    // return the object identifier
    return id.toString();
  } catch (err) {
    console.error(err);

    throw new Error('Saving failed');
  } finally {
    await dbClient.close();
  }
};

const handler: NextApiHandler = async (req, res) => {
  try {
    const { sheetId, setlistId } = req.body;
    const insertedId = await removeSheet(sheetId, setlistId);

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
