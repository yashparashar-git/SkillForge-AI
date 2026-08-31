const Resume = require("../models/Resume");
const readPDF = require("../utils/pdfReader");
const askResumeAI = require("../services/chatService");

const askQuestion = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({
        success: false,
        message: "Question is required",
      });
    }

    // Latest uploaded resume
    const resume = await Resume.findOne({
      user: req.user._id,
    }).sort({ createdAt: -1 });

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Please upload a resume first.",
      });
    }

    const resumeText = await readPDF(resume.filePath);

    const answer = await askResumeAI(resumeText, question);

    res.status(200).json({
      success: true,
      answer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  askQuestion,
};