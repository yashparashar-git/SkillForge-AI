// // const { GoogleGenAI } = require("@google/genai");

// // const ai = new GoogleGenAI({
// //     apiKey: process.env.GEMINI_API_KEY,
// // });

// // const evaluateAnswer = async (question, answer) => {

// //     const prompt = `
// // You are a Senior Technical Interviewer.

// // Evaluate the candidate's answer carefully.

// // Interview Question:
// // ${question}

// // Candidate Answer:
// // ${answer}

// // Give scores from 0 to 10.

// // Evaluate:

// // 1. score = overall answer quality
// // 2. technical = technical knowledge and correctness
// // 3. communication = clarity and explanation
// // 4. confidence = confidence shown in the answer

// // Also provide:
// // 5. short professional feedback
// // 6. one strength
// // 7. one improvement

// // Return ONLY valid JSON.

// // Example:

// // {
// //     "score": 8,
// //     "technical": 8,
// //     "communication": 7,
// //     "confidence": 8,
// //     "feedback": "Good explanation with clear concepts.",
// //     "strength": "Good understanding of the topic.",
// //     "improvement": "Add more practical examples."
// // }

// // Important:
// // - All scores must be numbers from 0 to 10.
// // - Do not return percentages.
// // - Do not return markdown.
// // - Return ONLY JSON.
// // `;

// //     const response = await ai.models.generateContent({
// //         model: "gemini-flash-latest",
// //         contents: prompt,
// //     });

// //     const text =
// //         typeof response.text === "function"
// //             ? response.text()
// //             : response.text;

// //     const cleanText = text
// //         .replace(/```json/g, "")
// //         .replace(/```/g, "")
// //         .trim();

// //     return JSON.parse(cleanText);
// // };

// // module.exports = evaluateAnswer;
// const { GoogleGenAI } = require("@google/genai");

// const ai = new GoogleGenAI({
//     apiKey: process.env.GEMINI_API_KEY,
// });

// const PRIMARY_MODEL = "gemini-3.6-flash";
// const FALLBACK_MODEL = "gemini-3.5-flash-lite";

// const sleep = (ms) =>
//     new Promise(resolve => setTimeout(resolve, ms));


// /*
// ========================================
// EVALUATE INTERVIEW ANSWER
// ========================================
// */

// const evaluateAnswer = async (question, answer) => {

//     const prompt = `
// You are a Senior Technical Interviewer.

// Evaluate the candidate's answer carefully.

// Interview Question:
// ${question}

// Candidate Answer:
// ${answer}

// Give scores from 0 to 10.

// Evaluate:

// 1. score = overall answer quality
// 2. technical = technical knowledge and correctness
// 3. communication = clarity and explanation
// 4. confidence = confidence shown in the answer

// Also provide:

// 5. short professional feedback
// 6. one strength
// 7. one improvement

// Return ONLY valid JSON.

// Use exactly this structure:

// {
//     "score": 8,
//     "technical": 8,
//     "communication": 7,
//     "confidence": 8,
//     "feedback": "Good explanation with clear concepts.",
//     "strength": "Good understanding of the topic.",
//     "improvement": "Add more practical examples."
// }

// Important:

// - All scores must be numbers from 0 to 10.
// - Do not return percentages.
// - Do not return markdown.
// - Return ONLY JSON.
// `;


//     /*
//     ========================================
//     PRIMARY MODEL + RETRY
//     ========================================
//     */

//     for (let attempt = 1; attempt <= 3; attempt++) {

//         try {

//             console.log(
//                 `🤖 Interview Evaluation - Attempt ${attempt}`
//             );

//             const response =
//                 await ai.models.generateContent({

//                     model: PRIMARY_MODEL,

//                     contents: prompt,

//                 });


//             const text =
//                 typeof response.text === "function"
//                     ? response.text()
//                     : response.text;


//             const cleanText = text
//                 .replace(/```json/g, "")
//                 .replace(/```/g, "")
//                 .trim();


//             const result = JSON.parse(cleanText);


//             console.log(
//                 `✅ Interview Evaluation Successful - Attempt ${attempt}`
//             );


//             return result;


//         } catch (error) {

//             console.error(
//                 `❌ Interview Evaluation Error - Attempt ${attempt}:`,
//                 error.status,
//                 error.message
//             );


//             const retryable =
//                 error.status === 503 ||
//                 error.status === 429 ||
//                 error.status === 500;


//             /*
//             ========================================
//             NON-RETRYABLE ERROR
//             ========================================
//             */

//             if (!retryable) {

//                 throw error;

//             }


//             /*
//             ========================================
//             RETRY
//             ========================================
//             */

//             if (attempt < 3) {

//                 const delay =
//                     2000 * Math.pow(2, attempt - 1);


//                 console.log(
//                     `🔄 Retrying after ${delay}ms...`
//                 );


//                 await sleep(delay);

//             }

//         }

//     }


//     /*
//     ========================================
//     FALLBACK MODEL
//     ========================================
//     */

//     console.log(
//         `⚠️ Primary model unavailable. Trying fallback: ${FALLBACK_MODEL}`
//     );


//     try {

//         const response =
//             await ai.models.generateContent({

//                 model: FALLBACK_MODEL,

//                 contents: prompt,

//             });


//         const text =
//             typeof response.text === "function"
//                 ? response.text()
//                 : response.text;


//         const cleanText = text
//             .replace(/```json/g, "")
//             .replace(/```/g, "")
//             .trim();


//         const result = JSON.parse(cleanText);


//         console.log(
//             "✅ Interview Evaluation Fallback Successful"
//         );


//         return result;


//     } catch (error) {

//         console.error(
//             "❌ Interview Evaluation Fallback Error:",
//             error.status,
//             error.message
//         );


//         throw new Error(
//             "Interview AI is temporarily unavailable. Please try submitting the answer again."
//         );

//     }

// };


// module.exports = evaluateAnswer;
const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

const PRIMARY_MODEL = "gemini-3.6-flash";
const FALLBACK_MODEL = "gemini-3.5-flash-lite";

const sleep = (ms) =>
    new Promise(resolve => setTimeout(resolve, ms));


/*
========================================
EVALUATE INTERVIEW ANSWER
========================================
*/

const evaluateAnswer = async (question, answer) => {

    const prompt = `
You are a Senior Technical Interviewer.

Evaluate the candidate's answer carefully.

Interview Question:
${question}

Candidate Answer:
${answer}

Give scores from 0 to 10.

Evaluate:

1. score = overall answer quality
2. technical = technical knowledge and correctness
3. communication = clarity and explanation
4. confidence = confidence shown in the answer

Also provide:

5. short professional feedback
6. one strength
7. one improvement

Return ONLY valid JSON.

Use exactly this structure:

{
    "score": 8,
    "technical": 8,
    "communication": 7,
    "confidence": 8,
    "feedback": "Good explanation with clear concepts.",
    "strength": "Good understanding of the topic.",
    "improvement": "Add more practical examples."
}

Important:

- All scores must be numbers from 0 to 10.
- Do not return percentages.
- Do not return markdown.
- Return ONLY JSON.
`;


    /*
    ========================================
    PRIMARY MODEL
    ========================================
    */

    for (let attempt = 1; attempt <= 2; attempt++) {

        try {

            console.log(
                `🤖 Interview Evaluation - Attempt ${attempt}`
            );

            const response =
                await ai.models.generateContent({

                    model: PRIMARY_MODEL,
                    contents: prompt,

                });


            const text =
                typeof response.text === "function"
                    ? response.text()
                    : response.text;


            const cleanText = text
                .replace(/```json/g, "")
                .replace(/```/g, "")
                .trim();


            const result = JSON.parse(cleanText);


            console.log(
                `✅ Interview Evaluation Successful - Attempt ${attempt}`
            );


            return result;


        } catch (error) {

            console.error(
                `❌ Interview Evaluation Error - Attempt ${attempt}:`,
                error.status,
                error.message
            );


            /*
            ========================================
            429 = QUOTA EXCEEDED
            IMMEDIATELY FALLBACK
            ========================================
            */

            if (error.status === 429) {

                console.log(
                    "⚠️ Primary model quota exceeded."
                );

                console.log(
                    `⚠️ Switching immediately to ${FALLBACK_MODEL}`
                );

                break;
            }


            /*
            ========================================
            503 / 500 = TEMPORARY ERROR
            RETRY ONCE
            ========================================
            */

            if (
                error.status === 503 ||
                error.status === 500
            ) {

                if (attempt < 2) {

                    const delay = 3000;

                    console.log(
                        `🔄 Temporary Gemini error. Retrying after ${delay}ms...`
                    );

                    await sleep(delay);

                    continue;
                }

            } else {

                /*
                ========================================
                OTHER ERRORS
                ========================================
                */

                throw error;

            }

        }

    }


    /*
    ========================================
    FALLBACK MODEL
    ========================================
    */

    console.log(
        `⚠️ Trying fallback model: ${FALLBACK_MODEL}`
    );


    try {

        const response =
            await ai.models.generateContent({

                model: FALLBACK_MODEL,
                contents: prompt,

            });


        const text =
            typeof response.text === "function"
                ? response.text()
                : response.text;


        const cleanText = text
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();


        const result = JSON.parse(cleanText);


        console.log(
            "✅ Interview Evaluation Fallback Successful"
        );


        return result;


    } catch (error) {

        console.error(
            "❌ Interview Evaluation Fallback Error:",
            error.status,
            error.message
        );


        throw new Error(
            "Interview AI is temporarily unavailable. Please try submitting the answer again."
        );

    }

};


module.exports = evaluateAnswer;