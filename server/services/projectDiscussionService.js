const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

const generateProjectQuestion = async (

    resumeText,

    conversationHistory

) => {

    const prompt = `

You are a Senior Software Engineering Interviewer.

Candidate Resume:

${resumeText}

Previous Conversation:

${conversationHistory}

Your task:

Continue discussing ONLY the candidate's BEST project.

Rules:

• Ask ONE follow-up question.

• Never repeat previous questions.

• Ask naturally like a real interviewer.

Topics you may cover:

- Architecture

- Database Design

- JWT Authentication

- API Design

- Challenges

- Deployment

- Security

- Optimization

- Future Improvements

- Scalability

Maximum 25 words.

Return ONLY the next question.

`;
let response;

let retries = 3;

while (retries > 0) {

    try {

        response = await ai.models.generateContent({

            model: "gemini-flash-latest",

            contents: prompt

        });

        break;

    }

    catch (err) {

        retries--;

        if (retries === 0) {

            throw err;

        }

        console.log("Gemini busy... retrying in 3 seconds");

        await new Promise(resolve => setTimeout(resolve, 3000));

    }

}

return typeof response.text === "function"
    ? response.text()
    : response.text;
}

module.exports = {

    generateProjectQuestion

};