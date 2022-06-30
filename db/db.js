import mongoose from "mongoose";

const connectionDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/google-docs-clone");
    console.log("connection successfully");
  } catch (error) {
    console.log("connection not successfully");
  }
};

export default connectionDB;
