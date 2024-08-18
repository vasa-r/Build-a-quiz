const mongoose = require("mongoose");
const MONGO_URI = process.env.MONGO_URI;

const connectDb = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log(`Connected to DB`);
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDb;
