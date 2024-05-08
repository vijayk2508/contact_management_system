const express = require("express");
const cors = require("cors");
const path = require("path");
const router = require("./routes");
const bodyParser = require("body-parser");

const { getConnection } = require("./db/connection");
const logRequests = require("./config/middlewares/logRequests");

const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

async function run() {
  const conn = await getConnection();

  if (!conn) {
    console.log("You failed to connect to MongoDB!");
    return;
  }

  try {
    // Connect the client to the server	(optional starting in v4.7)
    console.log("You successfully connected to MongoDB!");
    // Middleware function to log API requests
  

    // Add middleware to log requests before routing
    app.use(logRequests);
    app.use("/", router);
    app.use(express.static(path.join(__dirname, "public")));
    app.listen(8080, () => {
      console.log(`Server is running on port 8080`);
      console.log(`http://localhost:${8080}`);
    });
  } catch (e) {
    console.log(e);
  }
}

run().catch(console.dir);
