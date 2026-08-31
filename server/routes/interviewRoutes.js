const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    startInterview,
    submitAnswer,
    getInterviewReport,
    downloadInterviewReport,
        getInterviewStats,
         endInterview,
    skipInterviewQuestion
} = require("../controllers/interviewController");


// ==============================
// START INTERVIEW
// ==============================

router.post(
    "/start",
    protect,
    startInterview
);


// ==============================
// SUBMIT ANSWER
// ==============================

router.post(
    "/answer",
    protect,
    submitAnswer
);
// ==============================
// END INTERVIEW
// ==============================

router.post(
    "/end/:interviewId",
    protect,
    endInterview
);


// ==============================
// SKIP QUESTION
// ==============================

router.post(
    "/skip",
    protect,
    skipInterviewQuestion
);


// ==============================
// GET INTERVIEW REPORT
// ==============================

router.get(
    "/report/:interviewId",
    protect,
    getInterviewReport
);


// ==============================
// DOWNLOAD INTERVIEW REPORT
// ==============================

router.get(
    "/report/:interviewId/download",
    protect,
    downloadInterviewReport
);
// ==============================
// INTERVIEW DASHBOARD STATS
// ==============================

router.get(
    "/dashboard-stats",
    protect,
    getInterviewStats
);


module.exports = router;