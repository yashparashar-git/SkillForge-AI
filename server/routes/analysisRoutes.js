const express = require("express");

const router = express.Router();

const { getAnalysisHistory } = require("../controllers/analysisController");

const protect = require("../middleware/authMiddleware");

router.get("/history", protect, getAnalysisHistory);

module.exports = router;