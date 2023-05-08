import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';
import cors from 'cors';
import session from 'express-session';
import methodOverride from 'method-override';
import flash from 'express-flash';
import logger from 'morgan';
import MongoStore from 'connect-mongo';
import path from 'path';
import { fileURLToPath } from 'url';
import mainRoutes from './routes/main.js';
import connectDB from './config/conn.js';
import passportConfig from './config/passport.js';
import dotenv from 'dotenv'
import { createEngine } from 'express-react-views';

const app = express();
const port = process.env.PORT || 5000;
const origin = process.env.CORS_ORIGIN;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set JSX as a view engine\
app.set('views', path.join(__dirname, "../client", "build"));
app.set('view engine', 'jsx');
app.engine('jsx', createEngine());

// Use .env file
dotenv.config()

// Passport config
passportConfig(passport);

// Body Parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin,
  credentials: true
}));

// React path
app.use(express.static(path.join(__dirname, "../client/build")))

// Logging
app.use(logger('dev'));

// Get DB connection
try {
  connectDB();
} catch (error) {
  console.error(`Error connecting to MongoDB: ${error.message}`);
};

// Logging
app.use(logger("dev"));

// Use forms for put / delete
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

// Flash messages for errors, info, etc...
app.use(flash());

// Routes For Which The Server Is Listening
app.use("/", mainRoutes);

// "catchall" route handler
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});

// Server Running
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
}); 
