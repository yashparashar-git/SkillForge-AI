const Resume = require("../models/Resume");
const readPDF = require("../utils/pdfReader");
const analyzeResume = require("../services/geminiService");


const uploadResume = async (req, res) => {

    try {

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Please upload a resume"
            });
        }

        const resume = await Resume.create({

            user: req.user._id,

            originalName: req.file.originalname,

            fileName: req.file.filename,

            filePath: req.file.path,

            fileType: req.file.mimetype,

            fileSize: req.file.size

        });
        // Read uploaded PDF
const resumeText = await readPDF(req.file.path);

// Analyze Resume using Gemini
// const aiAnalysis = await analyzeResume(resumeText);
//save 
//   resume.aiAnalysis = aiAnalysis;
//         await resume.save();
// const aiResponse = await analyzeResume(resumeText);

// // Convert JSON string into JavaScript object
// const aiAnalysis = JSON.parse(aiResponse);

// resume.aiAnalysis = aiAnalysis;

// await resume.save();
const aiResponse = await analyzeResume(resumeText);

let aiAnalysis;

try {

    aiAnalysis = JSON.parse(aiResponse);

} catch {

    return res.status(500).json({

        success: false,

        message: "AI returned invalid response"

    });

}

resume.aiAnalysis = aiAnalysis;

await resume.save();

        res.status(201).json({

    success: true,

    message: "Resume uploaded and analyzed successfully",

    resume,

    aiAnalysis

});

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }
};
// Get All Reports

const getResumeHistory = async (req, res) => {

    try {

        const reports = await Resume.find({

            user: req.user._id

        }).sort({

            createdAt: -1

        });

        res.status(200).json({

            success: true,

            reports

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

module.exports = {
    uploadResume,
     getResumeHistory
};