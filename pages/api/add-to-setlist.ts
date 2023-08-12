import { isAxiosError } from 'axios';
import { NextApiHandler } from 'next';

import { MongoClient, ObjectId } from 'mongodb';
import { SetlistData } from './setlist';

const postData = async (sheetId: string, setlistId?: string) => {
  // eslint-disable-next-line max-len
  const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.mrysz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

  const client = new MongoClient(uri);

  try {
    await client.connect();

    const sheetInstance = await client
      .db(process.env.DB_NAME)
      .collection<SetlistData>('setlists')
      .updateOne(
        { _id: new ObjectId(setlistId) },
        { $addToSet: { sheets: sheetId } },
        { upsert: true },
      );

    // return the object identifier
    if (setlistId) {
      return setlistId;
    } else {
      return sheetInstance.upsertedId?.toString();
    }
  } catch (err) {
    console.error(err);

    throw new Error('Saving failed');
  } finally {
    await client.close();
  }
};

const handler: NextApiHandler = async (req, res) => {
  try {
    const { sheetId, setlistId } = req.body;
    const insertedId = await postData(sheetId, setlistId);

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
