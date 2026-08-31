const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

const generateInterviewReport = async (

    conversationHistory,

    role

) => {

    const prompt = `

You are a Senior Technical Interview Evaluator.

Candidate Role:

${role}

Interview Conversation:

${conversationHistory}

Analyze the complete interview.

Return ONLY valid JSON.

Format:

{
    "technical": 9,
    "communication": 8,
    "confidence": 7,
    "projects": 9,
    "coding": 8,
    "hr": 9,
    "overall": 8.5,

    "strengths":[
        "...",
        "...",
        "..."
    ],

    "weaknesses":[
        "...",
        "...",
        "..."
    ],

    "recommendations":[
        "...",
        "...",
        "..."
    ]
}

Rules:

Technical score out of 10.

Communication out of 10.

Confidence out of 10.

Projects out of 10.

Coding out of 10.

HR out of 10.

Overall score should be decimal.

Return ONLY JSON.

`;

    const response = await ai.models.generateContent({

        model: "gemini-flash-latest",

        contents: prompt

    });

    const text =

        typeof response.text === "function"

            ? response.text()

            : response.text;

    return JSON.parse(text);

};

module.exports = {

    generateInterviewReport

};