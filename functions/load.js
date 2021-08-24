/* eslint-disable */
const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();

async function getData(id) {
  // eslint-disable-next-line max-len
  const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.mrysz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  try {
    await client.connect();
    const sheetInstance = await client
      .db(process.env.DB_NAME)
      .collection("sheets")
      .findOne({ _id: ObjectId(id) });
    return sheetInstance;
  } catch (err) {
    console.log(err); // output to netlify function log

    throw new Error("Invalid object ID");
  } finally {
    await client.close();
  }
}

exports.handler = async function (event) {
  try {
    const { id } = JSON.parse(event.body);
    const data = await getData(id);

    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch (err) {
    console.log(err); // output to netlify function log

    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message })
    };
  }
};