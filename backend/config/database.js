import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connect = mongoose.connect(process.env.DB_URL);
    console.log(`Database connected successfully!`);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

export default connectDB;
