const mongoose = require("mongoose");
require("dotenv").config();

const uri = process.env.MONGO_URI;

async function connectMongo() {
  if (!uri) {
    throw new Error("MONGO_URI is not set");
  }

  await mongoose.connect(uri);
  console.log("Connected to MongoDB");
}

module.exports = { connectMongo, mongoose };
