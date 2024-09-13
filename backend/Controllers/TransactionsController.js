const asyncHandler = require("../middlewares/asyncHandler");
const Transaction = require("../Models/TransactionModel");
const User = require("../Models/userModel");
const AppError = require("../utils/AppError");
const {
  startOfMonth,
  endOfMonth,
  startOfLastMonth,
  endOfLastMonth,
} = require("date-fns"); // إذا كنت تستخدم مكتبة date-fns

exports.addTransaction = asyncHandler(async (req, res) => {
  const { name, description, date, price } = req.body;
  const userId = req.user.userId;
  const user = await User.findById(userId);

  const transaction = await Transaction.create({
    name,
    description,
    date: date || new Date(),
    price,
    user: userId,
  });
  user.salary = user.salary - price;
  await user.save();
  res.status(200).json({ Succes: true, transaction, data: user.salary });
});

exports.getTransactionsByUserId = asyncHandler(async (req, res, next) => {
  const userId = req.user.userId;
  const { filter } = req.query; // استلام قيمة الفلتر من الاستعلام في URL

  let transactions;

  // تحديد نطاق التاريخ بناءً على الفلتر
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
    case "lastmonth":
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
  console.log(filter);
  res.status(200).json({ Success: true, transactions });
});

exports.getTransactions = asyncHandler(async (req, res, next) => {
  const transactions = await Transaction.find();
  res.status(200).json({ Succes: true, transactions });
});
exports.editTransaction = asyncHandler(async (req, res, next) => {
  const { name, description, date, price } = req.body;
  const userId = req.user.userId;
  const user = await User.findById(userId);
  if (!user) return new next(AppError("User Not Found", 401));
  const transactionid = req.params.id;
  const transaction = await Transaction.findById(transactionid);
  const priceDiffernce = price - transaction.price;
  const updatedTransaction = await Transaction.findByIdAndUpdate(
    transactionid,
    { name, description, date, price },
    { new: true, runValidators: true }
  );
  if (!transaction) return new next(AppError("NO Transactions by this ID"));
  user.salary = user.salary - priceDiffernce;
  await user.save();
  res
    .status(200)
    .json({ Succes: true, updatedTransaction, salary: user.salary });
});
exports.deleteTransaction = asyncHandler(async (req, res, next) => {
  const transactionid = req.params.id;
  const transaction = await Transaction.findByIdAndDelete(transactionid);
  const userId = req.user.userId;
  const user = await User.findById(userId);
  if (!user) return new next(AppError("User Not Found", 401));
  if (!transaction) return new next(AppError("NO Transactions by this ID"));
  user.salary = user.salary + transaction.price;
  await user.save();
  res.status(200).json({ message: "Transaction Deleted", salary: user.salary });
});
exports.setSalary = asyncHandler(async (req, res, next) => {
  const { salary } = req.body;
  const userId = req.user.userId;
  const user = await User.findById(userId);
  if (!user) return new next(AppError("User Not Found", 401));
  user.salary = salary;
  await user.save();
  res.status(200).json({ Succes: true, user });
});
