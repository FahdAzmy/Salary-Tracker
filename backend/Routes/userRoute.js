const express = require("express");
const {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  login,
  logout,
  getUserSalary,
  updateUserSalary,
} = require("../Controllers/userController");
const { verifyToken, isAdmin } = require("../middlewares/verifeyToken");
const router = express.Router();
router.post("/createuser", createUser);
router.get("/getusers", verifyToken, isAdmin, getUsers);
router.get("/getuser", verifyToken, getUser);
router.put("/updateuser/:id", verifyToken, updateUser);
router.delete("/updateuser/:id", verifyToken, isAdmin, deleteUser);
router.post("/login", login);
router.post("/logout", verifyToken, logout);
router.get("/getsalary", verifyToken, getUserSalary);
router.put("/updatesalary", verifyToken, updateUserSalary);
module.exports = router;
