const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require('fs');
const path = require('path');
require("dotenv")

const app = express();

const db = require("./app/models");
db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

const routerDir = path.join(__dirname, 'app', 'routes');
// Read all files in the router directory
const routerFiles = fs.readdirSync(routerDir);
// Loop through each file and dynamically require it
routerFiles.forEach((file) => {
  if (file.endsWith('.js')) {
    const router = require(path.join(routerDir, file));
    router(app);
  }
});


// set port, listen for requests
const PORT = process.env.APP_PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


