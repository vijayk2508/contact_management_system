"use strict";

const mongoose = require("mongoose");

const dbConfig = {
  username: "admin",
  password: "PG49jzNIqyHR9HYj",
  host: "cluster0.09ahukh.mongodb.net",
  db: "contactmanagementsystem",
  authSource: "admin",
};

//const url = `mongodb+srv://${dbConfig.username}:${dbConfig.password}@${dbConfig.host}/`;
const url=`mongodb+srv://${dbConfig.username}:${dbConfig.password}@${dbConfig.host}/${dbConfig.db}?retryWrites=true&w=majority&appName=Cluster0`
let isConnected = false;

async function disconnectMongoDb() {
  await mongoose
    .disconnect()
    .then(() => {
      console.log("Disconnected from MongoDB");
    })
    .catch((error) => {
      console.error("Error disconnecting from MongoDB:", error);
    });
}

async function getConnection() {
  try {
    if (isConnected) {
      console.log("=> Using existing database connection");
      return true;
    }

    const db = await mongoose.connect(url);
    isConnected = db?.connections?.[0]?.readyState === 1;
   
    return isConnected;
  } catch (error) {
    console.error("Error connecting to the database:", error);
    await disconnectMongoDb();
    return false;
  }
}

module.exports = {getConnection, disconnectMongoDb};
