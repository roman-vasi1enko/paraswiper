<<<<<<< HEAD
import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config({ path: './../.env' })
=======
const mongoose = require("mongoose");
>>>>>>> main-holder

mongoose.set('strictQuery', false);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_STRING);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

<<<<<<< HEAD
export default connectDB
=======
module.exports = connectDB
>>>>>>> main-holder
