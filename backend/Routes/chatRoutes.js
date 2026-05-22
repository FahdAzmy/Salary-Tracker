const express = require("express");
const { chatWithAI } = require("../Controllers/chatController");
const { verifyToken } = require("../middlewares/verifeyToken");

const router = express.Router();

router.post("/chat", verifyToken, chatWithAI);

module.exports = router;
