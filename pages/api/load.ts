import { NextApiHandler } from 'next';
import { ObjectId } from 'mongodb';
import { SheetProperties } from '@store/SheetModule';
import { dbAction } from '@utils/db.utils';

export const loadSheet = async (id: string) =>
  dbAction({
    action: async (dbClient) => {
      const sheetInstance = await dbClient
        .db(process.env.DB_NAME)
        .collection('sheets')
        .findOne<SheetProperties>({ _id: new ObjectId(id) });

      if (!sheetInstance) throw `Invalid sheet ID: ${id}`;

      return { ...sheetInstance, _id: sheetInstance._id.toString() };
    },
  });

const handler: NextApiHandler = async (req, res) => {
  try {
    const sheetId = req.query?.id;

    if (!sheetId || Array.isArray(sheetId)) {
      return res.status(400).send('Bad request');
    }

    const data = await loadSheet(sheetId);

    if (!data) return res.status(404);

    return res
      .status(200)
      .setHeader('content-type', 'application/json')
      .json(data);
  } catch (err: any) {
    return res.status(500);
  }
};

export default handler;
