// const { GoogleGenAI } = require("@google/genai");

// const ai = new GoogleGenAI({
//     apiKey: process.env.GEMINI_API_KEY
// });

// const PRIMARY_MODEL = "gemini-3.6-flash";
// const FALLBACK_MODEL = "gemini-3.5-flash-lite";

// const sleep = (ms) =>
//     new Promise(resolve => setTimeout(resolve, ms));

// /*
// ========================================
// COMMON AI RESPONSE
// ========================================
// */

// const getAIResponse = async (prompt) => {

//     const maxRetries = 3;

//     // ========================================
//     // PRIMARY MODEL
//     // ========================================

//     for (let attempt = 1; attempt <= maxRetries; attempt++) {

//         try {

//             console.log(
//                 `🤖 Interview AI - Attempt ${attempt}`
//             );

//             const response =
//                 await ai.models.generateContent({

//                     model: PRIMARY_MODEL,

//                     contents: prompt

//                 });

//             console.log(
//                 `✅ Interview AI Success - Attempt ${attempt}`
//             );

//             return typeof response.text === "function"
//                 ? response.text()
//                 : response.text;

//         } catch (error) {

//             console.error(
//                 `❌ Interview AI Error - Attempt ${attempt}:`,
//                 error.status,
//                 error.message
//             );

//             const retryable =
//                 error.status === 503 ||
//                 error.status === 429 ||
//                 error.status === 500;

//             if (!retryable) {
//                 throw error;
//             }

//             if (attempt < maxRetries) {

//                 const delay =
//                     2000 * Math.pow(2, attempt - 1);

//                 console.log(
//                     `🔄 Retrying after ${delay}ms...`
//                 );

//                 await sleep(delay);
//             }
//         }
//     }

//     // ========================================
//     // FALLBACK MODEL
//     // ========================================

//     console.log(
//         `⚠️ Switching to fallback model: ${FALLBACK_MODEL}`
//     );

//     try {

//         const response =
//             await ai.models.generateContent({

//                 model: FALLBACK_MODEL,

//                 contents: prompt

//             });

//         console.log(
//             "✅ Interview AI Fallback Success"
//         );

//         return typeof response.text === "function"
//             ? response.text()
//             : response.text;

//     } catch (error) {

//         console.error(
//             "❌ Interview AI Fallback Error:",
//             error.status,
//             error.message
//         );

//         throw new Error(
//             "Interview AI is temporarily unavailable. Please try again."
//         );
//     }
// };


// /*
// ========================================
// INTRODUCTION
// ========================================
// */

// const getIntroductionQuestion = () => {

//     return "Tell me about yourself.";

// };


// /*
// ========================================
// EDUCATION
// ========================================
// */

// const getEducationQuestion = () => {

//     return "Tell me about your educational background and why you chose this field.";

// };


// /*
// ========================================
// RESUME OVERVIEW
// ========================================
// */

// const getResumeQuestion = async (resumeText) => {

//     const prompt = `
// You are a Senior Software Engineering Interviewer.

// Candidate Resume:

// ${resumeText}

// Ask ONLY ONE resume overview question.

// Rules:

// - Do NOT ask project questions.
// - Do NOT ask technical questions.
// - Ask candidate to summarize resume.
// - Maximum 20 words.
// - Sound professional.

// Examples:

// Walk me through your resume.

// Can you briefly summarize your professional background?

// Tell me about your skills and experience.

// Return ONLY the question.
// `;

//     return await getAIResponse(prompt);
// };
// /*
// ========================================
// PROJECT OVERVIEW
// ========================================
// */

// const getProjectOverviewQuestion = async (resumeText) => {

//     const prompt = `
// You are a Senior Software Engineering Interviewer.

// Candidate Resume:

// ${resumeText}

// Ask ONLY ONE project overview question.

// Rules:

// - Ask about candidate's BEST project.
// - Do NOT ask technical implementation.
// - Do NOT ask follow-up.
// - Maximum 20 words.

// Examples:

// Can you explain your best project?

// Walk me through your SkillForge AI project.

// Tell me about your Instagram Clone project.

// Return ONLY the question.
// `;

//     const response = await ai.models.generateContent({
//         model: "gemini-flash-latest",
//         contents: prompt
//     });

//     return typeof response.text === "function"
//         ? response.text()
//         : response.text;
// };

// /*
// ========================================
// TECHNICAL ROUND
// ========================================
// */

// const getTechnicalQuestion = async (role, difficulty) => {

//     const prompt = `
// You are a FAANG Software Engineering Interviewer.

// Candidate Role:

// ${role}

// Difficulty:

// ${difficulty}

// Generate ONLY ONE technical interview question.

// Rules:

// - Role specific.
// - Don't repeat previous topics.
// - No project questions.
// - No HR questions.
// - No coding questions.
// - Maximum 25 words.
// - Company interview level.

// Examples:

// MERN:
// Explain React Virtual DOM.

// Java:
// Difference between HashMap and Hashtable.

// Frontend:
// Difference between Flexbox and Grid.

// Backend:
// Explain JWT Authentication.

// Return ONLY the question.
// `;

//     const response = await ai.models.generateContent({
//         model: "gemini-flash-latest",
//         contents: prompt
//     });

//     return typeof response.text === "function"
//         ? response.text()
//         : response.text;
// };

// module.exports = {
//     getIntroductionQuestion,
//     getEducationQuestion,
//     getResumeQuestion,
//     getProjectOverviewQuestion,
//     getTechnicalQuestion
// };
const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

const PRIMARY_MODEL = "gemini-3.6-flash";
const FALLBACK_MODEL = "gemini-3.5-flash-lite";

const sleep = (ms) =>
    new Promise(resolve => setTimeout(resolve, ms));


/*
========================================
COMMON AI RESPONSE
========================================
*/

const getAIResponse = async (prompt) => {

    const maxRetries = 2;

    // ========================================
    // PRIMARY MODEL
    // ========================================

    for (let attempt = 1; attempt <= maxRetries; attempt++) {

        try {

            console.log(
                `🤖 Interview AI - Attempt ${attempt}`
            );

            const response =
                await ai.models.generateContent({

                    model: PRIMARY_MODEL,
                    contents: prompt

                });

            console.log(
                `✅ Interview AI Success - Attempt ${attempt}`
            );

            return typeof response.text === "function"
                ? response.text()
                : response.text;

        } catch (error) {

            console.error(
                `❌ Interview AI Error - Attempt ${attempt}:`,
                error.status,
                error.message
            );

            // ========================================
            // 429 = QUOTA EXCEEDED
            // DON'T RETRY
            // ========================================

            if (error.status === 429) {

                console.log(
                    "⚠️ Gemini quota exceeded. Switching to fallback..."
                );

                break;
            }


            // ========================================
            // 503 / 500 = TEMPORARY ERROR
            // RETRY
            // ========================================

            if (
                error.status === 503 ||
                error.status === 500
            ) {

                if (attempt < maxRetries) {

                    const delay =
                        2000 * Math.pow(2, attempt - 1);

                    console.log(
                        `🔄 Retrying after ${delay}ms...`
                    );

                    await sleep(delay);

                    continue;
                }

            } else {

                // Other errors should not retry

                throw error;

            }

        }

    }


    // ========================================
    // FALLBACK MODEL
    // ========================================

    console.log(
        `⚠️ Switching to fallback model: ${FALLBACK_MODEL}`
    );

    try {

        const response =
            await ai.models.generateContent({

                model: FALLBACK_MODEL,
                contents: prompt

            });

        console.log(
            "✅ Interview AI Fallback Success"
        );

        return typeof response.text === "function"
            ? response.text()
            : response.text;

    } catch (error) {

        console.error(
            "❌ Interview AI Fallback Error:",
            error.status,
            error.message
        );

        throw new Error(
            "Interview AI is temporarily unavailable. Please try again."
        );

    }

};


/*
========================================
INTRODUCTION
========================================
*/

const getIntroductionQuestion = () => {

    return "Tell me about yourself.";

};


/*
========================================
EDUCATION
========================================
*/

const getEducationQuestion = () => {

    return "Tell me about your educational background and why you chose this field.";

};


/*
========================================
RESUME OVERVIEW
========================================
*/

const getResumeQuestion = async (resumeText) => {

    const prompt = `
You are a Senior Software Engineering Interviewer.

Candidate Resume:

${resumeText}

Ask ONLY ONE resume overview question.

Rules:

- Do NOT ask project questions.
- Do NOT ask technical questions.
- Ask candidate to summarize resume.
- Maximum 20 words.
- Sound professional.

Examples:

Walk me through your resume.

Can you briefly summarize your professional background?

Tell me about your skills and experience.

Return ONLY the question.
`;

    return await getAIResponse(prompt);

};


/*
========================================
PROJECT OVERVIEW
========================================
*/

const getProjectOverviewQuestion = async (resumeText) => {

    const prompt = `
You are a Senior Software Engineering Interviewer.

Candidate Resume:

${resumeText}

Ask ONLY ONE project overview question.

Rules:

- Ask about the candidate's BEST project.
- Do NOT ask technical implementation.
- Do NOT ask follow-up questions.
- Maximum 20 words.
- Sound professional.

Examples:

Can you explain your best project?

Walk me through your SkillForge AI project.

Tell me about your Instagram Clone project.

Return ONLY the question.
`;

    return await getAIResponse(prompt);

};


/*
========================================
TECHNICAL ROUND
========================================
*/

const getTechnicalQuestion = async (role, difficulty) => {

    const prompt = `
You are a Senior Software Engineering Interviewer.

Candidate Role:

${role}

Difficulty:

${difficulty}

Generate ONLY ONE technical interview question.

Rules:

- Role specific.
- Do not repeat previous topics.
- No project questions.
- No HR questions.
- No coding questions.
- Maximum 25 words.
- Professional interview level.

Examples:

MERN:
Explain React Virtual DOM.

Java:
Difference between HashMap and Hashtable.

Frontend:
Difference between Flexbox and Grid.

Backend:
Explain JWT Authentication.

Return ONLY the question.
`;

    return await getAIResponse(prompt);

};


module.exports = {

    getIntroductionQuestion,
    getEducationQuestion,
    getResumeQuestion,
    getProjectOverviewQuestion,
    getTechnicalQuestion

};