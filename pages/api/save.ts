import { isAxiosError } from 'axios';
import { NextApiHandler } from 'next';
import { SheetProperties } from '../../store/SheetModule';

import { MongoClient, ObjectId } from 'mongodb';

export type SheetData = Omit<SheetProperties, '_id'>;

export type SavePayload = Omit<SheetProperties, 'id'> & { id?: string };

const postData = async ({ id, ...data }: SavePayload) => {
  // eslint-disable-next-line max-len
  const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.mrysz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

  const client = new MongoClient(uri);

  try {
    await client.connect();
    const sheetInstance = await client
      .db(process.env.DB_NAME)
      .collection<SheetData>('sheets')
      .updateOne({ _id: new ObjectId(id) }, { $set: data }, { upsert: true });

    if (!id) {
      // return the object identifier
      return sheetInstance.upsertedId?.toString();
    } else {
      return id;
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
