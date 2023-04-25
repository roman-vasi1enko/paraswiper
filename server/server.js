const express = require("express");
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");
const cors = require("cors");
const session = require("express-session");
const methodOverride = require("method-override");
const flash = require("express-flash");
const logger = require("morgan");
const MongoStore = require("connect-mongo");
const port = process.env.PORT || 5000;
const mainRoutes = require("./routes/main");
const bodyParser = require('body-parser');


// Set JSX as a view engine\
app.set('views', '../' + __dirname + 'client/src');
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());

//Use .env file in config folder
require("dotenv").config({ path: "./config/.env" });

// Passport config
require("./config/passport")(passport);

//Body Parsing
app.use(bodyParser.json());
app.use(express.json());
app.use(express.static('client'));
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));
app.use(logger('dev'));
// app.use(require("./routes/record"));

// get DB connection
const connectDB = require("./config/conn");
connectDB();

//Logging
app.use(logger("dev"));

//Use forms for put / delete
app.use(methodOverride("_method"));

// Setup Sessions - stored in MongoDB
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    dbName: 'sessions',
    cookie: { maxAge: 604800016 },
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ client: mongoose.connection.getClient() }),
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Use flash messages for errors, info, ect...
app.use(flash());

//Setup Routes For Which The Server Is Listening
app.use("/", mainRoutes);

//Server Running
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port: ${port}`);
});