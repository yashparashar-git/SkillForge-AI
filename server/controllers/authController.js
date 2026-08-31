const User = require("../models/User");
const generateToken = require("../utils/generateToken");
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validation
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        // Check existing user
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
      const user = await User.create({
    name,
    email,
    password: hashedPassword
});

res.status(201).json({
    success: true,
    message: "User Registered Successfully",
    data: {
        id: user._id,
        name: user.name,
        email: user.email
    }
});
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
//login user
const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;

        if (!email || !password) {

            return res.status(400).json({
                success:false,
                message:"All fields are required"
            });

        }

        const user = await User.findOne({ email });

        if (!user) {

            return res.status(404).json({
                success:false,
                message:"User not found"
            });

        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {

            return res.status(401).json({
                success:false,
                message:"Invalid Password"
            });

        }

        const token = generateToken(user._id);

        // res.status(200).json({

        //     success:true,

        //     message:"Login Successful",

        //     token

        // });
        res.status(200).json({

    success:true,

    message:"Login Successful",

    token,

    user:{
        id:user._id,
        name:user.name,
        email:user.email
    }

});

    }

    catch(error){

        res.status(500).json({

            success:false,

            message:error.message

        });

    }

};
//getting user profile
const getUserProfile = async (req, res) => {

    try {

        res.status(200).json({
            success: true,
            user: req.user
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};
module.exports = {
    registerUser,
    loginUser,
    getUserProfile
};