import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MONGODB SUCCESSFULLY CONNECTED!");
  } catch (error) {
    console.log("MONGODB SUCCESSFULLY CONNECTED!");
    console.log(error.message);
  }
};

export default connectDB;
