const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;
const mainRoutes = require("./routes/main");


app.use(cors());
app.use(express.json());
app.use(require("./routes/record"));
app.use(express.static('client'));

// get driver connection
const dbo = require("./config/conn");

//Setup Routes For Which The Server Is Listening
app.use("/", mainRoutes);
 
app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
 
  });
  console.log(`Server is running on port: ${port}`);
});