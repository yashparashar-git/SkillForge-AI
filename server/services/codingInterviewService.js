const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

const generateCodingQuestion = async (

    role,

    difficulty,

    previousConversation

) => {

    const prompt = `

You are a Senior Software Engineering Interviewer.

Candidate Role:

${role}

Difficulty:

${difficulty}

Previous Conversation:

${previousConversation}

Generate ONLY ONE coding interview question.

Rules:

• Ask only ONE coding question.

• Do NOT give solution.

• Do NOT explain.

• Company level question.

• Maximum 35 words.

Examples:

Reverse String

Two Sum

Palindrome

Merge Two Sorted Arrays

Binary Search

Linked List

Sliding Window

Dynamic Programming

Question should match the role.

Return ONLY the question.

`;

    const response = await ai.models.generateContent({

        model: "gemini-flash-latest",

        contents: prompt

    });

    return typeof response.text === "function"

        ? response.text()

        : response.text;

};

module.exports = {

    generateCodingQuestion

};