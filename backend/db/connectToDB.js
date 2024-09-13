const mongoose = require("mongoose");
const connecToDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB Connected: ^_^");
  } catch (error) {
    console.log("Error Connecting to MongoDB", error);
    process.exit(1);
  }
};
module.exports = connecToDB;
