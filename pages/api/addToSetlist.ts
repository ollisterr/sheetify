import { isAxiosError } from 'axios';
import { NextApiHandler } from 'next';
import { SheetProperties } from '../../store/SheetModule';

import { MongoClient, ObjectId } from 'mongodb';

const postData = async (sheetId: string, setlistId: string) => {
  // eslint-disable-next-line max-len
  const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.mrysz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

  const client = new MongoClient(uri);

  try {
    await client.connect();

    const sheetInstance = await client
      .db(process.env.DB_NAME)
      .collection('setlists')
      .updateOne(
        { _id: new ObjectId(setlistId) },
        { $addToSet: sheetId },
        { upsert: true },
      );

    // return the object identifier
    if (sheetInstance.upsertedId) {
      return sheetInstance.upsertedId;
    } else {
      return setlistId;
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

    return res
      .status(200)
      .setHeader('content-type', 'application/json')
      .json({ id: insertedId });
  } catch (err) {
    console.error(err);

    if (isAxiosError(err)) {
      return res.status(500).send(err.message);
    }

    return res.status(500);
  }
};

export default handler;
