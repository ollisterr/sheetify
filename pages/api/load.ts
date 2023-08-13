import { NextApiHandler } from 'next';
import { MongoClient, ObjectId } from 'mongodb';
import { SheetProperties } from '@store/SheetModule';

export const loadSheet = async (id: string) => {
  // eslint-disable-next-line max-len
  const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.mrysz.mongodb.net/?retryWrites=true&w=majority`;

  const client = new MongoClient(uri);

  try {
    await client.connect();

    const sheetInstance = await client
      .db(process.env.DB_NAME)
      .collection('sheets')
      .findOne<SheetProperties>({ _id: new ObjectId(id) });

    if (!sheetInstance) return null;

    return { ...sheetInstance, _id: sheetInstance._id.toString() };
  } catch (err) {
    throw `Invalid sheet ID: ${id}`;
  } finally {
    await client.close();
  }
};

const handler: NextApiHandler = async (req, res) => {
  try {
    const sheetId = req.body?.id;

    if (!sheetId || Array.isArray(sheetId)) {
      return res.status(400).send('Bad request');
    }

    const data = await loadSheet(sheetId);

    if (!data) res.status(404);

    return res
      .status(200)
      .setHeader('content-type', 'application/json')
      .json(data);
  } catch (err: any) {
    return res.status(500);
  }
};

export default handler;
