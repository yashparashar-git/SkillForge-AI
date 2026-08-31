const Resume = require("../models/Resume");

const getAnalysisHistory = async (req, res) => {
    try {

        const analyses = await Resume.find({
            user: req.user._id
        }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: analyses.length,
            analyses
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

module.exports = {
    getAnalysisHistory
};