// const express = require("express");

// const router = express.Router();

// const protect = require("../middleware/authMiddleware");

// const {
//     getProfile,
//      updateProfile
// } = require("../controllers/profileController");


// // GET LOGGED-IN USER PROFILE

// router.get(
//     "/",
//     protect,
//     getProfile
// );


// module.exports = router;
const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    getProfile,
    updateProfile
} = require("../controllers/profileController");


// GET PROFILE
router.get(
    "/",
    protect,
    getProfile
);


// UPDATE PROFILE
router.put(
    "/",
    protect,
    updateProfile
);


module.exports = router;