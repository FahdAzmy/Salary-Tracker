const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    res: "User",
    required: true,
  },
});

const transactionModel = mongoose.model("Transaction", transactionSchema);
module.exports = transactionModel;
