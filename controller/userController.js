const data = require("../data.json");
const { connectDB } = require("../config/db");
const md5 = require("md5");
// gvjhb
const getData = async (req, res) => {
  const db = await connectDB();
  for (let i = 0; i < data.length; i++) {
    const userData = await db.userCollection.find({}).toArray();
    const userProfileData = await db.userProfileCollection.find({}).toArray();

    console.log("User data", userData);
    console.log("User Profile data", userProfileData);
  }
  return res.send("data show successfully");
};

const insertData = async (req, res) => {
  const db = await connectDB();
  for (let i = 0; i < data.length; i++) {
    const insertUser = await db.userCollection.insertOne({
      first_name: data[i].first_name,
      last_name: data[i].last_name,
      email: data[i].email,
      password: md5(data[i].password),
    });
    await db.userProfileCollection.insertOne({
      user_id: insertUser.insertedId.toString(),
      dob: data[i].dob,
      age: data[i].age,
      Mobile_no: data[i].mobile_no,
    });
  }
  res.send("Data Inserted !!!");
};

const getAverage = async (req, res) => {
  const db = await connectDB();

  const data = await db.userProfileCollection.find({}).toArray();

  let averageAge = 0;
  for (let i = 0; i < data.length; i++) {
    averageAge = data[i].age + averageAge;
  }
  averageAge = averageAge / data.length;
  console.log("Average Age ", averageAge);

  res.send(`Average Age : ${averageAge} `);
};

const deleteUser = async (req, res) => {
  const db = await connectDB();

  const userDeleted = await db.userProfileCollection
    .find({ age: { $gt: 25 } })
    .toArray();

  for (let i = 0; i < userDeleted.length; i++) {
    console.log(userDeleted[i]._id.toString());
    await db.userProfileCollection.deleteOne({ _id: userDeleted[i]._id });
  }

  res.send("User deleted successfully");
};

module.exports = { getAverage, insertData, deleteUser, getData };
