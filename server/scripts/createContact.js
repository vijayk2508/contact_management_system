const fs = require("fs");
const path = require("path");
const { default: mongoose } = require("mongoose");
const getConnection = require("../db/connection").getConnection;
const ContactDetailModel = require("../model/contactDetailModel");

async function destroyTable() {
  try {
    await ContactDetailModel.deleteMany({}); // Drop the table by deleting all documents
    console.log("Table destroyed successfully");
  } catch (err) {
    console.error("Error destroying table:", err);
    // Handle error if table destruction fails
  }
}

async function run() {
  const conn = await getConnection();

  if (conn) {
    async function bulkCreateContacts() {
      console.time("bulkCreateContacts"); // Start the timer

      const batchSize = 10; // Adjust batch size as needed
      const filePath = path.resolve(__dirname, "./data/user.json"); // Path to your JSON file
      const jsonData = fs.readFileSync(filePath, "utf8");

      const contactsToInsert = JSON.parse(jsonData);

      for (let i = 0; i < contactsToInsert.length; i += batchSize) {
        const batch = contactsToInsert.slice(i, i + batchSize);
        try {
          await ContactDetailModel.insertMany(batch);
          console.log(`Batch ${i / batchSize + 1} inserted successfully`);
        } catch (err) {
          console.error("Error inserting batch:", err);
          // Handle retry logic or other error handling if needed
        }
      }

      console.timeEnd("bulkCreateContacts"); // End the timer and log the duration
    }

    try {
      await destroyTable();
      await bulkCreateContacts();
    } catch (e) {
      console.log(e);
    } finally {
      await mongoose.connection.close();
      process.exit(0);
    }
  } else {
    console.log(
      "Please provide the mongodb connection string in the .env file"
    );
  }
}

run();
