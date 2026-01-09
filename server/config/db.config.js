import mongoose from "mongoose";

export const connectTomongoose = async () => {
  try {
    const connect = await mongoose.connect(process.env.DB_URL);
    console.log(`Mongo connected to ${connect.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
