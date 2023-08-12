import { NextApiHandler } from 'next';
import { MongoClient, ObjectId } from 'mongodb';

const getData = async (id: string) => {
  // eslint-disable-next-line max-len
  const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.mrysz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

  const client = new MongoClient(uri);

  try {
    await client.connect();

    const sheetInstance = await client
      .db(process.env.DB_NAME)
      .collection('sheets')
      .findOne({ _id: new ObjectId(id) });

    return sheetInstance;
  } catch (err) {
    throw new Error('Invalid sheet ID');
  } finally {
    await client.close();
  }
};

const handler: NextApiHandler = async (req, res) => {
  try {
    const sheetId = req.query.id;

    if (!sheetId || Array.isArray(sheetId))
      return res.status(403).send('Bad request');

    const data = await getData(sheetId);

    return res
      .status(200)
      .setHeader('content-type', 'application/json')
      .json(data);
  } catch (err: any) {
    console.log(err);

    return res.status(500).send(err.message);
  }
};

export default handler;
