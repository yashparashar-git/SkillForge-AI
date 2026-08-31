const Interview = require("../models/Interview");
const Resume = require("../models/Resume");

const readPDF = require("../utils/pdfReader");

const evaluateAnswer = require("../services/evaluationService");
const generateReportPDF =
    require("../services/reportPDFService");

const {
    getIntroductionQuestion,
    getEducationQuestion,
    getResumeQuestion,
    getProjectOverviewQuestion
} = require("../services/interviewService");

const {
    generateProjectQuestion
} = require("../services/projectDiscussionService");

const {
    generateTechnicalQuestion
} = require("../services/technicalInterviewService");

const {
    generateCodingQuestion
} = require("../services/codingInterviewService");

const {
    generateHRQuestion
} = require("../services/hrInterviewService");

const {
    generateInterviewReport
} = require("../services/reportGenerationService");

const technicalTopics = require("../config/technicalTopics");

/*
======================================================
START INTERVIEW
======================================================
*/

const startInterview = async (req, res) => {

    try {

        const {

            role,
            difficulty,
            totalQuestions

        } = req.body;

        const firstQuestion = getIntroductionQuestion();

        const interview = await Interview.create({

            user: req.user._id,

            role,

            difficulty,

            totalQuestions,

            currentQuestion: 1,

            stage: "Introduction",

            stageQuestionCount: 1,

            projectQuestionsAsked: 0,

            technicalTopicIndex: 0,

            technicalQuestionCount: 0,

            currentTechnicalTopic: "",

            status: "In Progress",

            questions: [

                {

                    question: firstQuestion,

                    category: "Introduction"

                }

            ],

            conversationHistory: [

                {

                    role: "Interviewer",

                    content: firstQuestion

                }

            ]

        });

        return res.status(201).json({

            success: true,

            interviewId: interview._id,

            stage: interview.stage,

            currentQuestion: interview.currentQuestion,

            totalQuestions,

            question: firstQuestion

        });

    }

    catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

/*
======================================================
SUBMIT ANSWER
======================================================
*/

    const submitAnswer = async (req, res) => {

        try {

            const {

                interviewId,
                answer

            } = req.body;

            const interview = await Interview.findById(interviewId);

            if (!interview) {

                return res.status(404).json({

                    success: false,

                    message: "Interview not found"

                });

            }

            const currentQuestion = interview.questions[
                interview.currentQuestion - 1
            ];

            const evaluation =
                await evaluateAnswer(

                    currentQuestion.question,

                    answer

                );

            currentQuestion.answer = answer;

            currentQuestion.feedback =
                evaluation.feedback;

            currentQuestion.score =
                evaluation.score;

            interview.finalScore +=
                evaluation.score;
                // ==============================
    // CATEGORY SCORES
    // ==============================

    const technicalScore =
        evaluation.technical || 0;

    const communicationScore =
        evaluation.communication || 0;

    const confidenceScore =
        evaluation.confidence || 0;
                // ==============================
    // CALCULATE OVERALL LIVE SCORE
    // ==============================

    const answeredQuestions = interview.questions.filter(
        (q) => q.answer && q.answer.trim() !== ""
    ).length;

    const liveScore =
        answeredQuestions > 0
            ? Math.round(
                (interview.finalScore / answeredQuestions) * 10
            )
            : 0;

            interview.conversationHistory.push({

                role: "Interviewer",

                content: currentQuestion.question

            });

            interview.conversationHistory.push({

                role: "Candidate",

                content: answer

            });
            await interview.save();
    // return res.status(200).json({
    //     success: true,

    //     score: evaluation.score,

    //     liveScore: liveScore,

    //     feedback: evaluation.feedback,

    //     strength: evaluation.strength,

    //     improvement: evaluation.improvement,

    //     currentQuestion: interview.currentQuestion,

    //     stage: interview.stage
    // });
            

            

            let resumeText = "";

            let history = "";

            let currentTopic = "";
            let nextQuestion = "";

    let nextCategory = "";


if (interview.currentQuestion >= interview.totalQuestions) {

    interview.stage = "Completed";

    interview.status = "Completed";


    await interview.save();

    return res.json({

        success:true,

        completed:true,

        stage:"Completed",

        score: evaluation.score,

        feedback: evaluation.feedback,

        message:"Interview Completed Successfully"

    });

}
// -------- Smart Interview Flow --------


        /*
        ======================================================
        INTRODUCTION
        ======================================================
        */

        if (interview.stage === "Introduction") {

            interview.stage = "Education";

            interview.stageQuestionCount = 1;

            nextQuestion = getEducationQuestion();

            nextCategory = "Education";

        }

        /*
        ======================================================
        EDUCATION
        ======================================================
        */

        else if (interview.stage === "Education") {

            interview.stage = "Resume";

            interview.stageQuestionCount = 1;

            const resume = await Resume.findOne({

                user: interview.user

            }).sort({

                createdAt: -1

            });

            if (!resume) {

                return res.status(404).json({

                    success: false,

                    message: "Resume not found"

                });

            }

            resumeText = await readPDF(

                resume.filePath

            );

            nextQuestion = await getResumeQuestion(

                resumeText

            );

            nextCategory = "Resume";

        }

      /*
======================================================
RESUME
======================================================
*/





else if (interview.stage === "Resume") {

    // 5 Questions -> Resume ke baad direct Technical
    if (interview.totalQuestions <= 5) {

        interview.stage = "Technical";

        interview.stageQuestionCount = 1;
        interview.technicalTopicIndex = 0;
        interview.technicalQuestionCount = 0;

        // const topics =
        //     technicalTopics[interview.role] ||
        //     technicalTopics["MERN Developer"];
        const topics =
    technicalTopics[interview.role] ||
    technicalTopics["MERN Developer"] ||
    [];
    if (!topics.length) {

    return res.status(400).json({
        success: false,
        message: `No technical topics found for role: ${interview.role}`
    });

}

        currentTopic = topics[0];

        interview.currentTechnicalTopic = currentTopic;

        history = interview.conversationHistory
            .map(item => `${item.role}: ${item.content}`)
            .join("\n");

        nextQuestion = await generateTechnicalQuestion(

            interview.role,
            interview.difficulty,
            currentTopic,
            history

        );

        nextCategory = "Technical";

    }

    // 10 & 15 Questions -> Resume ke baad Project
    else {

        interview.stage = "Project";
        interview.projectQuestionsAsked = 0;

        const resume = await Resume.findOne({

            user: interview.user

        }).sort({

            createdAt: -1

        });

        resumeText = await readPDF(

            resume.filePath

        );

        nextQuestion = await getProjectOverviewQuestion(

            resumeText

        );

        nextCategory = "Project";

    }

}


/*
======================================================
PROJECT DISCUSSION
======================================================
*/

else if (interview.stage === "Project") {

    // 10 Questions -> 2 Project Questions
    let maxProjectQuestions = 2;

    // 15 Questions -> 4 Project Questions
    if (interview.totalQuestions >= 15) {

        maxProjectQuestions = 3;

    }

    if (interview.projectQuestionsAsked < maxProjectQuestions) {

        const resume = await Resume.findOne({

            user: interview.user

        }).sort({

            createdAt: -1

        });

        resumeText = await readPDF(

            resume.filePath

        );

        history = interview.conversationHistory
            .map(item => `${item.role}: ${item.content}`)
            .join("\n");

        nextQuestion = await generateProjectQuestion(

            resumeText,
            history

        );

        nextCategory = "Project";

        interview.projectQuestionsAsked++;

    }

    else {

        interview.stage = "Technical";

        interview.stageQuestionCount = 1;
        interview.technicalTopicIndex = 0;
        interview.technicalQuestionCount = 0;

        const topics =
            technicalTopics[interview.role] ||
            technicalTopics["MERN Developer"];

        currentTopic = topics[0];

        interview.currentTechnicalTopic = currentTopic;

        history = interview.conversationHistory
            .map(item => `${item.role}: ${item.content}`)
            .join("\n");

        nextQuestion = await generateTechnicalQuestion(

            interview.role,
            interview.difficulty,
            currentTopic,
            history

        );

        nextCategory = "Technical";

    }

}

       /*
======================================================
TECHNICAL ROUND
======================================================
*/

else if (interview.stage === "Technical") {

    const topics =
        technicalTopics[interview.role] ||
        technicalTopics["MERN Developer"];

    history = interview.conversationHistory
        .map(item => `${item.role}: ${item.content}`)
        .join("\n");

    // Dynamic Technical Questions
    let maxTechnicalQuestions = 2;

    if (interview.totalQuestions === 10) {

        maxTechnicalQuestions = 3;

    }

    else if (interview.totalQuestions >= 15) {

        maxTechnicalQuestions = 5;

    }

    if (interview.technicalQuestionCount < maxTechnicalQuestions) {

        currentTopic =
            topics[
                interview.technicalTopicIndex %
                topics.length
            ];

        interview.currentTechnicalTopic = currentTopic;

        nextQuestion =
            await generateTechnicalQuestion(

                interview.role,

                interview.difficulty,

                currentTopic,

                history

            );

        nextCategory = "Technical";

        interview.technicalQuestionCount++;

        // Move to next topic after every question
        interview.technicalTopicIndex++;

    }

   else {

    interview.stage = "Coding";

    interview.stageQuestionCount = 1;

    nextQuestion = await generateCodingQuestion(

        interview.role,

        interview.difficulty,

        history

    );

    nextCategory = "Coding";

}
}
           /*
======================================================
CODING ROUND
======================================================
*/

else if (interview.stage === "Coding") {

    history = interview.conversationHistory
        .map(item => `${item.role}: ${item.content}`)
        .join("\n");

    // Only 15-question interviews get Coding Round
    if (interview.totalQuestions >= 15) {

        if (interview.stageQuestionCount <= 2) {

            nextQuestion = await generateCodingQuestion(

                interview.role,
                interview.difficulty,
                history

            );

            nextCategory = "Coding";

            interview.stageQuestionCount++;

        }

        else {

            interview.stage = "HR";

            interview.stageQuestionCount = 1;

            nextQuestion = await generateHRQuestion(

                history

            );

            nextCategory = "HR";

        }

    }

    else {

        // Skip Coding for 5 & 10 question interviews
        interview.stage = "HR";

        interview.stageQuestionCount = 1;

        nextQuestion = await generateHRQuestion(

            history

        );

        nextCategory = "HR";

    }

}


                
// ======================================================
// HR ROUND
// ======================================================


else if (interview.stage === "HR") {

    history = interview.conversationHistory
        .map(item => `${item.role}: ${item.content}`)
        .join("\n");

    // Dynamic HR Questions
    let maxHRQuestions = 0;

    // 10 Question Interview
    if (interview.totalQuestions === 10) {

        maxHRQuestions = 2;

    }

    // 15 Question Interview
    else if (interview.totalQuestions >= 15) {

        maxHRQuestions = 3;

    }

    // 5 Question Interview
    else {

        maxHRQuestions = 1;

    }

    if (interview.stageQuestionCount <= maxHRQuestions) {

        nextQuestion = await generateHRQuestion(

            history

        );

        nextCategory = "HR";

        interview.stageQuestionCount++;

    }

    else {

        interview.stage = "Completed";

        interview.status = "Completed";

        nextCategory = "Completed";

    }

}

        

      
        
                /*
        ======================================================
        INTERVIEW COMPLETED
        ======================================================
        */

        if (interview.stage === "Completed") {

            history = interview.conversationHistory

                .map(item => `${item.role}: ${item.content}`)

                .join("\n");

            const report = await generateInterviewReport(

                history,

                interview.role

            );

            interview.report = {

                technical: report.technical,

                communication: report.communication,

                confidence: report.confidence,

                projectKnowledge: report.projects,

                problemSolving: report.coding,

                overallScore: report.overall,

                strengths: report.strengths,

                weaknesses: report.weaknesses,

                recommendations: report.recommendations

            };

            interview.status = "Completed";

            await interview.save();

            return res.json({

                success: true,

                interviewCompleted: true,

                report

            });

        }

        /*
        ======================================================
        SAVE NEXT QUESTION
        ======================================================
        */

        interview.currentQuestion++;
        // Stop interview when selected number of questions are completed

if (interview.currentQuestion > interview.totalQuestions) {

    interview.stage = "Completed";

    interview.status = "Completed";

    await interview.save();

    return res.json({

        success: true,

        completed: true,

        stage: "Completed",

        score: evaluation.score,

        feedback: evaluation.feedback,

        message: "Interview Completed Successfully"

    });

}

        interview.questions.push({

            question: nextQuestion,

            category: nextCategory

        });

        interview.conversationHistory.push({

            role: "Interviewer",

            content: nextQuestion

        });

        await interview.save();

return res.json({
    success: true,

    stage: interview.stage,

    currentQuestion:
        interview.currentQuestion,

    category: nextCategory,

    // Current answer
    score: evaluation.score,

    // Overall score
    liveScore: liveScore,

    // Category scores
    technicalScore: technicalScore,

    communicationScore:
        communicationScore,

    confidenceScore:
        confidenceScore,

    feedback: evaluation.feedback,

    strength: evaluation.strength,

    improvement:
        evaluation.improvement,

    nextQuestion
});

    }

    catch (err) {

        return res.status(500).json({

            success: false,

            message: err.message

        });

    }

};
/*
======================================================
GET INTERVIEW REPORT
======================================================
*/

const getInterviewReport = async (req, res) => {

    try {

        const { interviewId } = req.params;

        const interview = await Interview.findById(interviewId)
            .populate("user", "name email");

        if (!interview) {

            return res.status(404).json({
                success: false,
                message: "Interview not found"
            });

        }

        // Security check:
        // Only interview owner can see the report
        if (
            interview.user._id.toString() !==
            req.user._id.toString()
        ) {

            return res.status(403).json({
                success: false,
                message: "Unauthorized access"
            });

        }

        return res.status(200).json({

            success: true,

            candidate: {
                name: interview.user.name,
                email: interview.user.email
            },

            interview: {
                role: interview.role,
                difficulty: interview.difficulty,
                totalQuestions: interview.totalQuestions,
                status: interview.status,
                createdAt: interview.createdAt
            },

            report: interview.report,

            questions: interview.questions

        });

    } catch (error) {

        console.error(
            "Get Interview Report Error:",
            error
        );

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};
const downloadInterviewReport = async (req, res) => {

    try {

        const { interviewId } = req.params;

        const interview =
            await Interview.findById(interviewId)
                .populate("user", "name email");

        if (!interview) {

            return res.status(404).json({
                success: false,
                message: "Interview not found"
            });

        }

        if (
            interview.user._id.toString() !==
            req.user._id.toString()
        ) {

            return res.status(403).json({
                success: false,
                message: "Unauthorized access"
            });

        }

        if (interview.status !== "Completed") {

            return res.status(400).json({
                success: false,
                message:
                    "Complete the interview before downloading the report."
            });

        }

        const reportData = {

            candidate: {
                name: interview.user.name,
                email: interview.user.email
            },

            interview: {
                role: interview.role,
                difficulty: interview.difficulty,
                totalQuestions: interview.totalQuestions,
                status: interview.status
            },

            report: interview.report,

            questions: interview.questions

        };

        generateReportPDF(
            reportData,
            res
        );

    } catch (error) {

        console.error(
            "Download Report Error:",
            error
        );

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};
/*
======================================================
GET INTERVIEW STATS FOR DASHBOARD
======================================================
*/

const getInterviewStats = async (req, res) => {

    try {

        const totalInterviews = await Interview.countDocuments({
            user: req.user._id
        });

        return res.status(200).json({

            success: true,

            totalInterviews

        });

    } catch (error) {

        console.error(
            "Interview Stats Error:",
            error
        );

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

const skipInterviewQuestion = async (req, res) => {
    try {
        const { interviewId } = req.body;

        if (!interviewId) {
            return res.status(400).json({
                message: "Interview ID is required"
            });
        }

        // your skip logic here

    } catch (error) {
        console.error("Skip Question Error:", error);

        res.status(500).json({
            message: "Failed to skip question"
        });
    }
};
// ======================================================
// END INTERVIEW
// ======================================================

const endInterview = async (req, res) => {

    try {

        const { interviewId } = req.params;

        const interview =
            await Interview.findById(interviewId);

        if (!interview) {

            return res.status(404).json({
                success: false,
                message: "Interview not found"
            });

        }

        // Security check
        if (
            interview.user.toString() !==
            req.user._id.toString()
        ) {

            return res.status(403).json({
                success: false,
                message: "Unauthorized access"
            });

        }

        interview.stage = "Completed";

        interview.status = "Completed";

        await interview.save();

        return res.status(200).json({

            success: true,

            completed: true,

            message:
                "Interview ended successfully"

        });

    } catch (error) {

        console.error(
            "End Interview Error:",
            error
        );

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};
module.exports = {

    startInterview,

    submitAnswer,
     getInterviewReport,
      downloadInterviewReport,
      getInterviewStats,
      endInterview,
      skipInterviewQuestion
};

        
        
        
       
        
    // part4
    

        