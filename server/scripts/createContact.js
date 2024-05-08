const { default: mongoose } = require("mongoose");
const getConnection = require("../db/connection").getConnection;

async function run() {
  const conn = await getConnection();
  if (conn) {
    const ContactDetailModel = require("../model/contactDetailModel");

    function generateRandomMobileNumber() {
      const min = 1000000000; // minimum 10-digit number
      const max = 9999999999; // maximum 10-digit number
      const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
      return randomNumber.toString(); // Convert to string to ensure leading zeros are preserved
    }

    async function bulkCreateContacts() {
      console.time("bulkCreateContacts"); // Start the timer

      const batchSize = 10; // Adjust batch size as needed
      const totalContacts = 100;
      let contactsToInsert = [];

      for (let index = 1; index <= totalContacts; index++) {
        let objContactDetail = {
          name: `Test ${index}`,
          email: `test${index}@email.com`,
          phone_number: generateRandomMobileNumber(),
          phone_number_prefix: "+1",
        };

        objContactDetail[
          "phone_number_with_prefix"
        ] = `${objContactDetail.phone_number_prefix}${objContactDetail.phone_number}`;
        contactsToInsert.push(objContactDetail);

        // Insert batch when batch size reached or at the end of the loop
        if (contactsToInsert.length === batchSize || index === totalContacts) {
          try {
            await ContactDetailModel.insertMany(contactsToInsert);
            console.log(
              `Batch ${Math.ceil(index / batchSize)} inserted successfully`
            );
            contactsToInsert = []; // Clear batch for next iteration
          } catch (err) {
            console.error("Error inserting batch:", err);
            // Handle retry logic or other error handling if needed
          }
        }
      }

      console.timeEnd("bulkCreateContacts"); // End the timer and log the duration
    }

    try {
      await bulkCreateContacts();
    } catch (e) {
      console.log(e);
    } finally {
      // Close the connection to the database
      await mongoose.connection.close();
      // Exit the process
      process.exit(0);
    }
  } else {
    console.log(
      "Please provide the mongodb connection string in the .env file"
    );
  }
}

run();
