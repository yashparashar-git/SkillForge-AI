const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const { askQuestion } = require("../controllers/chatController");

// Ask Resume AI
router.post(
    "/resume",
    protect,
    askQuestion
);

module.exports = router;