const express = require("express");

const router = express.Router();

const {
    sendMessage
} = require("../controllers/contactController");

// SEND CONTACT MESSAGE

router.post(
    "/",
    sendMessage
);

module.exports = router;