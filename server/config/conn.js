import { set, connect } from "mongoose";

set('strictQuery', false);

const connectDB = async () => {
  try {
    const conn = await connect(process.env.DB_STRING);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

export default connectDB
