const asyncHandler = require("../middlewares/asyncHandler");
const AppError = require("../utils/AppError");
const User = require("../Models/userModel");
const bcrypt = require("bcryptjs");
const { generateTokenAndSetCookie } = require("../utils/generateToken");
const SALT_ROUNDS = 12;

// Create User
/**
 * @desc Create a new user
 * @route POST /api/salarytracker/createuser
 * @access Public
 */
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
/**
 * @desc Retrieve all users
 * @route GET /api/salarytracker/getusers
 * @access Private (Admin only)
 * @middleware verifyToken, isAdmin
 */
exports.getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find().select("name email _id");
  res.status(200).json({ Message: "All Users", users });
});

// Get Current User
/**
 * @desc Get the authenticated user's details
 * @route GET /api/salarytracker/getuser
 * @access Private
 * @middleware verifyToken
 */
exports.getUser = asyncHandler(async (req, res, next) => {
  const userId = req.user.userId;
  const user = await User.findById(userId);
  if (!user) return next(new AppError("User not Found", 404));
  res.status(200).json({ Message: "Success", user });
});

// Update User
/**
 * @desc Update a user's details
 * @route PUT /api/salarytracker/updateuser/:id
 * @access Private
 * @middleware verifyToken
 */
exports.updateUser = asyncHandler(async (req, res, next) => {
  const userId = req.params.id;
  const { name, email } = req.body;
  const user = await User.findByIdAndUpdate(
    userId,
    { name, email },
    { new: true }
  ).select("name email _id");
  if (!user) return next(new AppError("User not Found", 404));

  res.status(200).json({ Message: "User Updated Successfully", user });
});

// Delete User
/**
 * @desc Delete a user
 * @route DELETE /api/salarytracker/deleteuser/:id
 * @access Private (Admin only)
 * @middleware verifyToken, isAdmin
 */
exports.deleteUser = asyncHandler(async (req, res, next) => {
  const userId = req.params.id;
  const user = await User.findByIdAndDelete(userId);
  if (!user) return next(new AppError("User not Found", 404));

  res.status(200).json({ Message: "User Deleted Successfully" });
});

// User Login
/**
 * @desc Login a user and set JWT token in cookie
 * @route POST /api/salarytracker/login
 * @access Public
 */
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

// User Logout
/**
 * @desc Logout a user and clear the JWT token cookie
 * @route POST /api/salarytracker/logout
 * @access Private
 * @middleware verifyToken
 */
exports.logout = asyncHandler(async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ Success: true, Message: "Logout Successfully" });
});

// Get User Salary
/**
 * @desc Get the authenticated user's salary
 * @route GET /api/salarytracker/getsalary
 * @access Private
 * @middleware verifyToken
 */
exports.getUserSalary = asyncHandler(async (req, res, next) => {
  const userId = req.user.userId;
  const user = await User.findById(userId).select("salary");
  if (!user) return next(new AppError("User not Found", 404));
  res.status(200).json({ Message: "Success", user });
});
// Update User Salary
/**
 * @desc Update the authenticated user's salary
 * @route PUT /api/salarytracker/updatesalary
 * @access Private
 * @middleware verifyToken
 */
exports.updateUserSalary = asyncHandler(async (req, res, next) => {
  const userId = req.user.userId;
  const { salary } = req.body;
  const user = await User.findByIdAndUpdate(
    userId,
    { salary },
    { new: true, runValidators: true }
  );
  if (!user) return next(new AppError("User not Found", 404));
  await user.save();

  res.status(200).json({ Message: "Success", salary: user.salary });
});
