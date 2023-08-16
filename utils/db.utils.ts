import { MongoClient } from 'mongodb';
import { isSSR } from './common.utils';

if (!isSSR) throw new Error('API should not be used client-side');

// eslint-disable-next-line max-len
const dbUri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.mrysz.mongodb.net/?retryWrites=true&w=majority`;

export const dbClient = new MongoClient(dbUri);
