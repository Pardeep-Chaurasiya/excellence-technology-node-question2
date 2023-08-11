const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const PORT = process.env.PORT;

// const db = require("./config/db");

const userProfile = require("./routes/userProfileRoute");

app.use("/", userProfile);
app.listen(PORT, async () => {
  console.log(`Server started on port ${PORT}`);
});
