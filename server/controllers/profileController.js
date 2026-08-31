const User = require("../models/User");

// ==============================
// GET PROFILE
// ==============================

const getProfile = async (req, res) => {
    try {

        const user = await User.findById(
            req.user._id
        ).select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            user
        });

    } catch (error) {

        console.error("Get Profile Error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch profile"
        });

    }
};


// ==============================
// UPDATE PROFILE
// ==============================

const updateProfile = async (req, res) => {

    try {

        const {
            name,
            phone,
            degree,
            college,
            year,
            targetRole,
            skills
        } = req.body;

        const user = await User.findById(req.user._id);

        if (!user) {

            return res.status(404).json({
                success: false,
                message: "User not found"
            });

        }

        // Update fields

        user.name = name ?? user.name;
        user.phone = phone ?? user.phone;
        user.degree = degree ?? user.degree;
        user.college = college ?? user.college;
        user.year = year ?? user.year;
        user.targetRole = targetRole ?? user.targetRole;
        user.skills = skills ?? user.skills;

        const updatedUser = await user.save();

        res.status(200).json({

            success: true,

            message: "Profile updated successfully",

            user: {
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                phone: updatedUser.phone,
                degree: updatedUser.degree,
                college: updatedUser.college,
                year: updatedUser.year,
                targetRole: updatedUser.targetRole,
                skills: updatedUser.skills
            }

        });

    } catch (error) {

        console.error(
            "Update Profile Error:",
            error
        );

        res.status(500).json({
            success: false,
            message: "Failed to update profile"
        });

    }

};


module.exports = {
    getProfile,
    updateProfile
};