const { MongoClient } = require("mongodb");
const data = require("../data.json");

const url = process.env.Mongo_URL;
const client = new MongoClient(url);
const dbName = "UsersDB";
let db;
const connectDB = async () => {
  await client.connect();
  console.log("Connected successfully to server");
  db = client.db(dbName);

  const userCollection = db.collection("Users");
  const userProfileCollection = db.collection("UsersProfile");

  return { userCollection, userProfileCollection, client };
};

module.exports = { connectDB };
