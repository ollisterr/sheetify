/* eslint-disable */
const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();

async function postData(data, id) {
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
      .updateOne(
        { _id: ObjectId(id) },
        { $set: data },
        { upsert: true }
      )

    // return the object identifier
    return sheetInstance.insertedId;
  } catch (err) {
    console.log(err); // output to netlify function log
  } finally {
    await client.close();
  }
}

exports.handler = async function (event) {
  try {
    const { data, id } = JSON.parse(event.body);
    const insertedId = await postData(data, id);

    return {
      statusCode: 200,
      body: JSON.stringify({ id: insertedId })
    };
  } catch (err) {
    console.log(err); // output to netlify function log

    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message })
    };
  }
};