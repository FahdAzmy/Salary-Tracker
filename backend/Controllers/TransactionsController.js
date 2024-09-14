const asyncHandler = require("../middlewares/asyncHandler");
const Transaction = require("../Models/TransactionModel");
const User = require("../Models/userModel");
const AppError = require("../utils/AppError");
const { startOfMonth, endOfMonth, subMonths } = require("date-fns");

// Helper function to get the start of the last month
function startOfLastMonth(date) {
  return startOfMonth(subMonths(date, 1));
}

// Helper function to get the end of the last month
function endOfLastMonth(date) {
  return endOfMonth(subMonths(date, 1));
}

/**
 * @desc Add a new transaction and update the user's salary
 * @route POST /api/salarytracker/addtransaction
 * @access Private
 */
exports.addTransaction = asyncHandler(async (req, res) => {
  const { name, description, date, price } = req.body;
  const userId = req.user.userId;

  // Find the user and create a new transaction
  const user = await User.findById(userId);
  const transaction = await Transaction.create({
    name,
    description,
    date: date || new Date(), // Default to current date if none provided
    price,
    user: userId,
  });

  // Update the user's salary and save
  user.salary -= price;
  await user.save();

  res.status(200).json({ Succes: true, transaction, data: user.salary });
});

/**
 * @desc Get transactions for a specific user based on filter criteria
 * @route GET /api/salarytracker/transactionsbyuserid
 * @access Private
 */
exports.getTransactionsByUserId = asyncHandler(async (req, res, next) => {
  const userId = req.user.userId;
  const { filter } = req.query;

  let transactions;

  // Filter transactions based on the query parameter
  switch (filter) {
    case "thisMonth":
      transactions = await Transaction.find({
        user: userId,
        date: {
          $gte: startOfMonth(new Date()),
          $lte: new Date(),
        },
      });
      break;
    case "lastMonth":
      transactions = await Transaction.find({
        user: userId,
        date: {
          $gte: startOfLastMonth(new Date()),
          $lte: endOfLastMonth(new Date()),
        },
      });
      break;
    case "all":
    default:
      transactions = await Transaction.find({ user: userId });
      break;
  }

  res.status(200).json({ Success: true, transactions });
});

/**
 * @desc Get all transactions
 * @route GET /api/salarytracker/transactions
 * @access Private
 */
exports.getTransactions = asyncHandler(async (req, res) => {
  const transactions = await Transaction.find();
  res.status(200).json({ Succes: true, transactions });
});

/**
 * @desc Edit an existing transaction and update the user's salary
 * @route PUT /api/salarytracker/updatetransaction/:id
 * @access Private
 */
exports.editTransaction = asyncHandler(async (req, res, next) => {
  const { name, description, date, price } = req.body;
  const userId = req.user.userId;
  const transactionId = req.params.id;

  // Find the user and the transaction to update
  const user = await User.findById(userId);
  if (!user) return next(new AppError("User Not Found", 401));

  const transaction = await Transaction.findById(transactionId);
  if (!transaction) return next(new AppError("NO Transactions by this ID"));

  const priceDifference = price - transaction.price;
  const updatedTransaction = await Transaction.findByIdAndUpdate(
    transactionId,
    { name, description, date, price },
    { new: true, runValidators: true }
  );

  // Update the user's salary and save
  user.salary -= priceDifference;
  await user.save();

  res
    .status(200)
    .json({ Succes: true, updatedTransaction, salary: user.salary });
});

/**
 * @desc Delete a transaction and update the user's salary
 * @route DELETE /api/salarytracker/deletetransaction/:id
 * @access Private
 */
exports.deleteTransaction = asyncHandler(async (req, res, next) => {
  const transactionId = req.params.id;

  // Find and delete the transaction
  const transaction = await Transaction.findByIdAndDelete(transactionId);
  if (!transaction) return next(new AppError("NO Transactions by this ID"));

  // Find the user and update their salary
  const userId = req.user.userId;
  const user = await User.findById(userId);
  if (!user) return next(new AppError("User Not Found", 401));

  user.salary += transaction.price;
  await user.save();

  res.status(200).json({ message: "Transaction Deleted", salary: user.salary });
});

/**
 * @desc Set a new salary for a user
 * @route PATCH /api/salarytracker/setsalary
 * @access Private
 */
exports.setSalary = asyncHandler(async (req, res, next) => {
  const { salary } = req.body;
  const userId = req.user.userId;

  // Find the user and update their salary
  const user = await User.findById(userId);
  if (!user) return next(new AppError("User Not Found", 401));

  user.salary = salary;
  await user.save();

  res.status(200).json({ Succes: true, user });
});
