const asyncHandler = require("../middlewares/asyncHandler");
const AppError = require("../utils/AppError");
const User = require("../Models/userModel");
const bcrypt = require("bcryptjs");
const { generateTokenAndSetCookie } = require("../utils/generateToken");
const SALT_ROUNDS = 12;
// Create User
exports.createUser = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !password || !email) {
    return next(new AppError("All Fields are required", 404));
  }
  const emailExist = await User.findOne({ email });
  if (emailExist) return next(new AppError("Email is already Exist", 400));
  const hashedPasword = await bcrypt.hash(password, SALT_ROUNDS);
  const user = await User.create({ name, email, password: hashedPasword });
  res.status(200).json({ Message: "User created successfully", user });
});
// Get All Users
exports.getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find().select("name email _id");
  res.status(200).json({ Message: "All Users", users: users });
});
exports.getUser = asyncHandler(async (req, res, next) => {
  const userId = req.user.userId;
  const user = await User.findById(userId);
  if (!user) return next(new AppError("User not Found", 404));
  res.status(200).json({ Message: "Succes", user });
});
//Update User
exports.updateUser = asyncHandler(async (req, res, next) => {
  const userId = req.params.id;
  const { name, email } = req.body;
  const user = await User.findByIdAndUpdate(
    userId,
    { name, email },
    { new: true }
  ).select("name email _id");
  if (!user) return next(new AppError("User not Found", 404));

  res.status(200).json({ Message: "User Update Succefully", user });
});
//Delete user
exports.deleteUser = asyncHandler(async (req, res, next) => {
  const userId = req.params.id;
  const { name, email } = req.body;
  const user = await User.findByIdAndDelete(userId);
  if (!user) return next(new AppError("User not Found", 404));

  res.status(200).json({ Message: "User Deleted Succefully" });
});
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("name email _id password");
  if (!user) return next(new AppError("Invalid Email or Password", 404));
  const isPassword = await bcrypt.compare(password, user.password);
  if (!isPassword) return next(new AppError("Invalid Email or Password", 404));
  generateTokenAndSetCookie(res, user._id);
  res
    .status(200)
    .json({ message: "Login Successfully", ...user._doc, password: undefined });
});
exports.logout = asyncHandler(async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ Succes: true, Message: "Logout Successfully" });
});
//getUserSalary
exports.getUserSalary = asyncHandler(async (req, res, next) => {
  const userId = req.user.userId;
  const user = await User.findById(userId).select("salary");
  if (!user) return next(new AppError("User not Found", 404));
  res.status(200).json({ Message: "Succes", user });
});
