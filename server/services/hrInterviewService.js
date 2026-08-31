const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

const generateHRQuestion = async (

    previousConversation

) => {

    const prompt = `

You are a Senior HR Interviewer.

Previous Interview Conversation:

${previousConversation}

Generate ONLY ONE HR interview question.

Rules:

• Ask only ONE question.

• Don't answer it.

• Don't explain.

• Don't repeat previous HR questions.

• Sound like Google, Microsoft or Amazon HR.

Possible Topics:

- Tell me about yourself
- Strengths
- Weaknesses
- Teamwork
- Leadership
- Conflict Resolution
- Handling Pressure
- Career Goals
- Why should we hire you?
- Why do you want to join our company?
- Biggest Achievement
- Biggest Failure
- Time Management
- Communication Skills
- Future Plans

Maximum 25 words.

Return ONLY the interview question.

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

    generateHRQuestion

};