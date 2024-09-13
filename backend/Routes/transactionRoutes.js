const express = require("express");
const {
  addTransaction,
  getTransactions,
  getTransactionsByUserId,
  setSalary,
  deleteTransaction,
  editTransaction,
} = require("../Controllers/TransactionsController");
const { verifyToken, isAdmin } = require("../middlewares/verifeyToken");

const router = express.Router();
router.post("/addtransaction", verifyToken, addTransaction);
router.get("/transactions", verifyToken, getTransactions);
router.get("/transactionsbyuserid", verifyToken, getTransactionsByUserId);
router.post("/setsalary", verifyToken, setSalary);
router.delete("/deletetransaction/:id", verifyToken, deleteTransaction);
router.put("/updatetransaction/:id", verifyToken, editTransaction);
module.exports = router;
