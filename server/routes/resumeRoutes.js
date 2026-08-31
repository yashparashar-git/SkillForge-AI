const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const {
    uploadResume, getResumeHistory
} = require("../controllers/resumeController");


// Upload Resume
router.post(
    "/upload",
    protect,
    upload.single("resume"),
    uploadResume
);
//get history  use for data fetch
router.get(

    "/history",

    protect,

    getResumeHistory

);

module.exports = router;